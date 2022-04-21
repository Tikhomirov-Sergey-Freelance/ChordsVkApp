import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../../../code/common/guid'
import { Global, Router } from 'stores/root-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'

import { snackbar } from '../../../code/common/alerts'
import { iArtist, iShortArtist } from 'types/artists'
import { saveArtistLogo } from 'code/database/images'
import { addArtist, updateArtist } from 'code/database/artists'
import { loadTracksByArtist, updateTracksSearchName } from 'code/database/tracks'
import { iTrack } from 'types/track'
import { addTrackFromCandidate } from 'code/tracks/add-track'

type StoreMode = 'add' | 'edit' | 'from-track-candidate'

export class AddArtistStore {

    mode: StoreMode

    name: string
    id: string
    imageData: File
    imageDataSrc: any
    artistImage: string

    description: string

    queryArtist

    origArtist: iArtist

    constructor() {

        const routeData = Router.activePanelData

        this.fillArtistData(routeData)

        makeAutoObservable(this)
    }

    async save() {

        const artist = this.artistToSave
        await this.saveLogo(artist)

        if (this.mode === 'add' || this.mode === 'from-track-candidate') {
            const result = await addArtist(artist)
            console.log(result)
            snackbar('Добавили артиста')
        } else {
            const result = await updateArtist(artist)
            console.log(result)
            await this.recalcTracksNames(artist)
            snackbar('Изменили артиста')
        }

        if(this.mode === 'from-track-candidate') {
            
            const trackCandidate = Router.activePanelData && Router.activePanelData.trackCandidate
            if(trackCandidate) {
                addTrackFromCandidate(trackCandidate)
            }
        }
    }

    get artistToSave(): iArtist {
        return {
            id: this.id,
            name: this.name,
            description: this.description || '',
            artistImage: '',
            searchName: this.name.toLocaleUpperCase()
        }
    }

    changeProperty(property: keyof iArtist, value: any) {
        this[property as keyof this] = value
    }

    changeImage(file: File) {

        this.imageData = file

        const fileReader = new FileReader()
        fileReader.onload = () => {
            this.imageDataSrc = fileReader.result
        }
        fileReader.readAsDataURL(this.imageData)
    }

    async saveLogo(artist: iArtist) {

        if (!this.imageData) return

        const logo = await saveArtistLogo(artist.id, this.imageData)

        if (!logo) {
            snackbar('Ошибка при сохранении логотипа.')
            return
        }

        this.artistImage = logo
        artist.artistImage = logo
    }

    fillArtistData(routeData) {

        this.mode = this.getMode(routeData)

        if (this.mode === 'add') {
            this.id = createGuid()
        }

        if (this.mode === 'from-track-candidate') {
            const trackCandidate = routeData && routeData.trackCandidate
            this.id = createGuid()
            this.name = trackCandidate.artist.trim()
        }

        if (this.mode === 'edit') {
            const artist = routeData && routeData.artist

            this.id = artist.id
            this.name = artist.name
            this.description = artist.description
            this.artistImage = artist.artistImage

            this.origArtist = artist
        }
    }

    async recalcTracksNames(artist: iArtist) {

        if (this.mode === 'add') return

        try {

            const tracks = await loadTracksByArtist(this.id)

            const requests = tracks.map(track => {
                return updateTracksSearchName(track, artist as iShortArtist)
            })

            Promise.all(requests)

        } catch (error) {

            console.error(error)
            snackbar('Ошибка при пересчете названий треков')
        }
    }

    getMode(routeData): StoreMode {

        const artist = routeData && routeData.artist
        const trackCandidate = routeData && routeData.trackCandidate

        if (artist) {
            return 'edit'
        }

        if (trackCandidate) {
            return 'from-track-candidate'
        }

        return 'add'
    }
}

export default AddArtistStore