import { makeAutoObservable, reaction } from 'mobx'
import { iTrackView } from 'types/track'
import { iArtist } from 'types/artists'
import { loadArtistById } from 'code/database/artists'
import { loadTracksByArtist } from 'code/database/tracks'
import { Modal } from '../root-store'

export class ArtistPageStore {

    loading: boolean

    artist: iArtist = null
    tracks: iTrackView[]

    constructor(artistId) {

        if(!artistId) {
            Modal.closeModal()
            return
        }

        this.loadArtist(artistId)
        makeAutoObservable(this) 
    }

    async loadArtist(artistId) {
        
        this.loading = true
        this.artist = await loadArtistById(artistId)
        await this.loadArtistTracks(artistId)
        this.loading = false

        return this.artist
    }

    async loadArtistTracks(artistId: string) {
        const tracks = await loadTracksByArtist(artistId)
        this.tracks = tracks.map(track => ({ ...track, artist: this.artist }) as iTrackView)
    }
}

export default ArtistPageStore