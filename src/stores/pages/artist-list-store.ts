import { makeAutoObservable } from 'mobx'

import { loadAllArtists } from 'code/database/artists'
import { iShortArtist } from 'types/artists'

export class ArtistListStore {

    loaded: boolean
    artists: iShortArtist[]

    constructor() {
        makeAutoObservable(this)
    }

    async loadArtists() {
        this.artists = await loadAllArtists()
        this.loaded = true
    }    
}

const store = new ArtistListStore()
export default store