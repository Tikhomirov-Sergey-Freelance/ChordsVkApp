import { makeAutoObservable } from 'mobx'
import { iShortTrackView } from 'types/track'
import { iArtist } from 'types/artists'
import { loadArtistById } from 'code/database/artists'
import { loadTracksByArtist } from 'code/database/tracks'
import { Modal, Router } from '../../root-store'

export class ArtistPageStore {

    loading: boolean

    artist: iArtist = null
    tracks: iShortTrackView[]

    constructor() {

        const routeData = Router.activePanelData
        const artistId = routeData?.['artistId']

        if(!artistId) {
            Router.goBack()
            return
        }

        this.loadArtist(artistId)
        makeAutoObservable(this) 
    }

    async loadArtist(artistId) {
        
        this.loading = true
        this.artist = await loadArtistById(artistId)

        if(!this.artist) {
            Modal.closeModal()
            return
        }

        await this.loadArtistTracks(artistId)
        this.loading = false

        return this.artist
    }

    async loadArtistTracks(artistId: string) {
        const tracks = await loadTracksByArtist(artistId)
        this.tracks = tracks.map(track => ({ ...track, artist: this.artist }) as iShortTrackView)
    }
}

export default ArtistPageStore