import { makeAutoObservable, reaction } from 'mobx'
import { iTrackView } from 'types/track'
import { iArtist } from 'types/artists'
import { loadArtistById } from 'code/database/artists'
import { loadTrackById, loadTracksByArtist } from 'code/database/tracks'
import { iChord } from 'types/chord'
import { loadChordsByKeys } from 'code/database/chords'
import GlobalStore from '../root/global-store'
import { incrementTrackView } from 'code/database/track-metrics'
import { changeFavorite, getFavoriteTracks, isFavoriteTrack } from 'code/database/favorite'
import { Modal, Favorites, Global, VK } from '../root-store'
import { getTrackLink } from 'code/tracks/track-link'
import { snackbar } from 'code/common/alerts'
import { sendTrackError } from 'code/database/track-error'
import { iTrackError } from 'types/track-error'
import { createGuid } from 'code/common/guid'
import { openTrackByStore } from 'code/tracks/open-track'

export class TrackPageStore {

    loading: boolean
    loadingChords: boolean

    track: iTrackView
    chords: iChord[] = []

    constructor(trackId: string) {
        
        if(!trackId) {
            Modal.closeModal()
            return
        }

        this.loadTrack(trackId)

        makeAutoObservable(this) 
    }

    async loadTrack(trackId: string) {
        this.loading = true
        this.track = await loadTrackById(trackId)

        if(!this.track) {
            Modal.closeModal()
            return
        }

        Global.saveLastViewedTrack(this.track.id)

        this.loading = false
        this.loadChords()
        incrementTrackView(this.track.id)
        return this.track
    }

    async loadChords() {
        this.loadingChords = true

        let chordsKeys = this.getChordsKeys()
        const chords = await loadChordsByKeys(chordsKeys)
        this.chords = chords || []

        this.loadingChords = false

        return this.chords
    }

    get isFavorite() {
        return this.track && Favorites.favorites.includes(this.track.id)
    }

    get instrumentChords() {
        return this.chords.filter(chord => Global.currentInstrument === chord.instrument);
    }

    getChordsKeys() {

        let chordsKey = []

        this.track.chordsText.rows.forEach(row => 
            row.words.forEach(word => {

                if(typeof word === 'string') return

                if(word.chord && !chordsKey.includes(word.chord.key)) {
                    chordsKey.push(word.chord.key)
                }
            }))

        if(this.track.intro) {
            this.track.intro.forEach(key => {
                if(!chordsKey.includes(key)) {
                    chordsKey.push(key)
                }
            })
        }

        return chordsKey
    }

    async sendError(error: string) {

        if(!error) return this.openTrackPage()

        const trackError: iTrackError = {
            id: createGuid(),
            userId: VK.vkId,
            trackId: this.track.id,
            message: error
        }

        await sendTrackError(trackError)
        this.openTrackPage()

        setTimeout(() => snackbar('Сообщение отправлено. Благодарим за помощь'), 100)
    }

    openTrackPage() {
        openTrackByStore(this.track.id, this)
    }

    async changeFavourite() {
        Favorites.changeFavourite(this.track.id, this.isFavorite ? 'delete' : 'add')
    }

    async share() {
        VK.shareLink(getTrackLink(this.track.id))
    }
}

export default TrackPageStore