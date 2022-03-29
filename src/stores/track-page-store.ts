import { makeAutoObservable, reaction } from 'mobx'
import { iTrackView } from 'types/track'
import { iArtist } from 'types/artists'
import { loadArtistById } from 'code/firebase/artists'
import { loadTrackById, loadTracksByArtist } from 'code/firebase/tracks'
import { iChord } from 'types/chord'
import { loadChordsByKeys } from 'code/firebase/chords'
import GlobalStore from './global-store'
import { incrementTrackView } from 'code/firebase/track-analytics'
import { changeFavorite, getFavoriteTracks, isFavoriteTrack } from 'code/firebase/favorite'

export class TrackPageStore {

    loading: boolean

    track: iTrackView
    chords: iChord[] = []
    isFavorite: boolean

    constructor(trackId: string) {
        
        if(!trackId) {
            GlobalStore.modal.closeModal()
            return
        }

        this.loadTrack(trackId)

        makeAutoObservable(this) 
    }

    async loadTrack(trackId: string) {
        this.loading = true
        this.track = await loadTrackById(trackId)
        this.isFavorite = await isFavoriteTrack(trackId)
        this.loading = false
        this.loadChords()
        incrementTrackView(this.track.id)
        return this.track
    }

    async loadChords() {

        let chordsKeys = this.getChordsKeys()
        const chords = await loadChordsByKeys(chordsKeys)
        this.chords = chords || []

        return this.chords
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
       const result = await changeFavorite(this.track.id, this.isFavorite ? 'delete' : 'add')
       if(result) {
           this.isFavorite = !this.isFavorite
       }
    }
}

export default TrackPageStore