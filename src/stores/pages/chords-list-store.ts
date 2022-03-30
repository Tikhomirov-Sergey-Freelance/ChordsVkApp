import { makeAutoObservable, observable } from 'mobx'
import { iChord } from 'types/chord'
import { loadAllChords } from 'code/database/chords'

export class ChordsListStore {

    loading = false
    loaded = false

    guitarChords: Map<string, iChord[]> = new Map<string, iChord[]>()
    ukuleleChords: Map<string, iChord[]> = new Map<string, iChord[]>()

    constructor() {
        makeAutoObservable(this)
    }

    async loadChords() {

        if(this.loaded) return
        
        this.loading = true

        const chords = await loadAllChords()

        const guitarChordsByGroup = new Map<string, iChord[]>([])
        const ukuleleChordsByGroup = new Map<string, iChord[]>([])

        this.guitarChords = null 
        this.ukuleleChords = null

        chords.forEach(chord => {

            const source = chord.instrument === 'guitar' ? guitarChordsByGroup : ukuleleChordsByGroup

            if(source.has(chord.note)) {
                source.get(chord.note).push(chord)
            } else {
                source.set(chord.note, [chord])
            }
        })
        
        this.guitarChords = guitarChordsByGroup 
        this.ukuleleChords = ukuleleChordsByGroup

        this.loaded = true
        this.loading = false 
    }
} 

const store = new ChordsListStore()
export default store