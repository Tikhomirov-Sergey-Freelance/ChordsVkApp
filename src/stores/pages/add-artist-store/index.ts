import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../../../code/common/guid'
import { Global, Router } from 'stores/root-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'

import { snackbar } from '../../../code/common/alerts'
import { defaultArtist, iArtist, iArtistTag, iShortArtist } from 'types/artists'
import { saveArtistLogo } from 'code/database/images'
import { addArtist, updateArtist } from 'code/database/artists'
import { loadTracksByArtist, updateTracksSearchName } from 'code/database/tracks'
import { iTrack } from 'types/track'
import { addTrackFromCandidate } from 'code/tracks/add-track'
import { loadArtistTagsById, updateArtistTags } from 'code/database/artist-tags'
import { artistTagId } from 'code/artist/common'

type StoreMode = 'add' | 'edit' | 'from-track-candidate'

export class AddArtistStore {

    mode: StoreMode

    name: string
    id: string
    imageData: File
    imageDataSrc: any
    artistImage: string

    description: string
    tags: string[] = []

    queryArtist

    origArtist: iArtist
    origTags: iArtistTag[] 

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
            this.saveTags(artist) 
            console.log(result)
            snackbar('Добавили артиста')
        } else {
            const result = await updateArtist(artist)
            console.log(result)
            await Promise.all([this.recalcTracksNames(artist), this.saveTags(artist)])
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
            artistImage: this.artistImage,
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

    changeTags(tags: string[]) {
        this.tags = tags
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
            const artistData = routeData && routeData.artist

            const artist = { ...defaultArtist, ...(artistData || {})  }

            this.id = artist.id
            this.name = artist.name
            this.description = artist.description
            this.artistImage = artist.artistImage
            
            this.origArtist = artist

            this.loadTags()
        }
    }

    async loadTags() {
        this.origTags = await loadArtistTagsById(this.id)
        this.tags = this.origTags.map(tag => tag.tag)
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

    async saveTags(artist: iArtist) {

        const lastTags = this.origTags || []

        const tags: iArtistTag[] = this.tags.map(tag => ({
            id: artistTagId(artist.id, tag),
            artistId: artist.id,
            tag: tag.toLocaleUpperCase()
        }))

        tags.push({
            id: artistTagId(artist.id, artist.searchName),
            artistId: artist.id,
            tag: artist.searchName
        })

        const needAdd = tags.filter(tag => !lastTags.some(lastTag => tag.tag === lastTag.tag))
        const needDelete = lastTags.filter(lastTag => !tags.some(tag => tag.tag === lastTag.tag))

        const result = await updateArtistTags(needAdd, needDelete)

        if(!result) {
            snackbar('Ошибка при обновлении тегов')
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

    get tagsOptions() {
        return this.tags.map(tag => ({ value: tag, label: tag }))
    }
}

export default AddArtistStore