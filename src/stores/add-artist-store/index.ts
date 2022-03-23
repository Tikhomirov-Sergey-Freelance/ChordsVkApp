import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../../code/common/guid'
import GlobalStore from '../global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'

import { snackbar } from '../../code/common/alerts'
import { iArtist } from 'types/artists'
import { saveArtistLogo } from 'code/firebase/images'
import { saveArtist, updateArtist } from 'code/firebase/artists'
import { loadTracksByArtist, updateTracksSearchName } from 'code/firebase/tracks'
import { iTrack } from 'types/track'

type StoreMode = 'add' | 'edit'

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

        const routData = GlobalStore.activePanelData
        const artist = routData && routData.artist

        if (artist) {
            this.mode = 'edit'
            this.origArtist = artist
        } else {
            this.mode = 'add'
            this.id = createGuid()
        }

        this.fillArtistData(artist)

        makeAutoObservable(this)
    }

    async save() {
        const firestore = await GlobalStore.firebase.getFirestore()

        const artist = this.artistToSave
        await this.saveLogo(artist)

        if (this.mode === 'add') {
            const result = await saveArtist(artist)
            console.log(result)
            snackbar('Добавили артиста')
        } else {
            const result = await updateArtist(artist)
            console.log(result)
            await this.recalcTracksNames()
            snackbar('Изменили артиста')
        }
    }

    get artistToSave(): iArtist {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            artistImage: '',
            searchName: this.name.toUpperCase()
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

    fillArtistData(artist: iArtist) {

        if (this.mode === 'add' || !artist) return

        this.id = artist.id
        this.name = artist.name
        this.description = artist.description
        this.artistImage = artist.artistImage
    }

    async recalcTracksNames() {

        if(this.mode === 'add') return

        try {

            const tracks: iTrack[] = await loadTracksByArtist(this.id) 

            const requests = tracks.map(track => {
                const searchName = [this.name.toLocaleUpperCase(), track.name.toLocaleUpperCase()]
                return updateTracksSearchName(searchName, track.id)
            })

            Promise.all(requests)

        } catch (error) {

            console.error(error)
            snackbar('Ошибка при пересчете названий треков')
        }
    }
}

export default AddArtistStore