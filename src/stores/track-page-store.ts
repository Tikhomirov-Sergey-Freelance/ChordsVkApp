import { makeAutoObservable, reaction } from 'mobx'
import { iTrackView } from 'types/track'
import { iArtist } from 'types/artists'
import { loadArtistById } from 'code/firebase/artists'
import { loadTrackById, loadTracksByArtist } from 'code/firebase/tracks'
import { iChord } from 'types/chord'
import { loadChordsByKeys } from 'code/firebase/chords'

export class TrackPageStore {

    loading: boolean

    track: iTrackView
    chords: iChord[] = []

    constructor(track: iTrackView = null) {

        if(track) {
            this.track = track
            this.loadChords()
        }

        makeAutoObservable(this) 
    }

    async loadTrack(trackId) {
        this.loading = true
        this.track = await loadTrackById(trackId)
        this.loading = false
        this.loadChords()
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
}

export default TrackPageStore