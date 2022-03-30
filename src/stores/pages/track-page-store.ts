import { makeAutoObservable, reaction } from 'mobx'
import { iTrackView } from 'types/track'
import { iArtist } from 'types/artists'
import { loadArtistById } from 'code/database/artists'
import { loadTrackById, loadTracksByArtist } from 'code/database/tracks'
import { iChord } from 'types/chord'
import { loadChordsByKeys } from 'code/database/chords'
import GlobalStore from '../root/global-store'
import { incrementTrackView } from 'code/database/track-analytics'
import { changeFavorite, getFavoriteTracks, isFavoriteTrack } from 'code/database/favorite'
import { Modal, Favorites, Global } from '../root-store'

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
                if(word.chord && !chordsKey.includes(word.chord.key)) {
                    chordsKey.push(word.chord.key)
                }
            }))

        return chordsKey
    }

    async changeFavourite() {
        Favorites.changeFavourite(this.track.id, this.isFavorite ? 'delete' : 'add')
    }
}

export default TrackPageStore