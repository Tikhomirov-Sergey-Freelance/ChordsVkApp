import { makeAutoObservable } from 'mobx'
import { iChord } from 'types/chord'
import { loadChordsByNote } from 'code/database/chords'
import { Global } from 'stores/root-store'
import { notes } from 'code/data/notes'

export class ChordsListStore {

    loading = false

    guitarChords: Map<string, iChord[]> = new Map<string, iChord[]>()
    ukuleleChords: Map<string, iChord[]> = new Map<string, iChord[]>()

    note: string = notes[0]

    constructor() {
        makeAutoObservable(this)
        this.changeNote = this.changeNote.bind(this)
    }

    get currentNoteChords() {
        if(!this.note) return []
        const chords = Global.currentInstrument === 'guitar' ? this.guitarChords : this.ukuleleChords
        
        if(!chords || !chords.has(this.note)) return []
        return chords.get(this.note)
    }

    async loadChords() {
        
        if(this.guitarChords.has(this.note)) return
        
        this.loading = true

        const chords = await loadChordsByNote(this.note)

        const guitarChords: iChord[] = []
        const ukuleleChords: iChord[] = []

        chords.forEach(chord => {
            const source = chord.instrument === 'guitar' ? guitarChords : ukuleleChords
            source.push(chord)
        })

        this.guitarChords.set(this.note, guitarChords)
        this.ukuleleChords.set(this.note, ukuleleChords)

        this.loading = false 
    }

    changeNote(note: string) {

        this.note = note
        this.loadChords()
    }
} 

const store = new ChordsListStore()
export default store