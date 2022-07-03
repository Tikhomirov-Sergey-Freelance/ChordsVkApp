import { makeAutoObservable, reaction } from 'mobx'
import { MusicalInstrument } from '../../types/global-types'
import { notes } from '../../code/data/notes'

import ChordCanvas from '../../code/canvas/chord'
import { Global, Router } from 'stores/root-store'
import { snackbar } from '../../code/common/alerts'
import { iChord, iGuitarString } from 'types/chord'
import { addChord } from 'code/database/chords'

type Mode = 'add' | 'edit'

const defauiltParams: iChord = {
    instrument: Global.currentInstrument,
    note: notes[0],
    name: notes[0],
    startFret: 0,
    barre: false,
    guitarStrings: [],
    searchName: ''
}

export class AddChordsStore {

    mode: Mode = 'add'
    note: string 
    name: string
    startFret: number
    barre: boolean

    get instrument() {
        return Global.currentInstrument
    }

    set instrument(value) {
        Global.changeInstrument(value)
    }

    canvas: ChordCanvas

    guitarStrings!: iGuitarString[]

    constructor(params: iChord = defauiltParams) {

        this.fillParams(params)
        makeAutoObservable(this, undefined, { deep: true })

        this.saveChord = this.saveChord.bind(this)
        this.changeNote = this.changeNote.bind(this)

        reaction(() => Global.currentInstrument,
            () => {
                if(Router.activePanel === 'addChords') {
                    this.fillStrings()
                }
            }
        )  
    }

    fillParams(params: iChord) {
        
        for (const prop in params) {
            this[prop as keyof this] = params[prop]
        }

        if (!this.guitarStrings.length) {
            this.fillStrings()
        }
    }

    changeProperty(property: keyof iChord, value: unknown) {
        this[property] = value
    }

    changeNote(note: string) {
        this.note = note
        this.name = this.note
    }

    changeString(index: number, fret: string | number) {

        const string = this.guitarStrings.find(string => string.index === index)

        if (string) {
            string.fret = isNaN(+fret) ? fret : +fret
        }

        this.guitarStrings = [...this.guitarStrings]
    }

    changeInstrtument(instrument: MusicalInstrument) {

        Global.changeInstrument(instrument)

        this.fillStrings()  
    }

    fillStrings() {

        const guitarStringsCount = this.instrument === 'guitar' ? 6 : 4
        this.guitarStrings = []

        for (let i = 1; i <= guitarStringsCount; i++) {
            this.guitarStrings.push({ index: i, fret: 0 })
        }
    }

    async saveChord() { 

        await addChord(this.chordParams)
        
        snackbar('Добавили аккорд')

        const newParams = { 
            ...defauiltParams, 
            note: this.chordParams.note, 
            name: this.chordParams.note, 
            instrument: Global.currentInstrument }

        this.fillParams(newParams) 
    }

    get chordParams(): iChord {

        const params: iChord = {
            instrument: this.instrument,
            note: this.note,
            name: this.name,
            startFret: this.startFret,
            barre: this.barre,
            guitarStrings: [...this.guitarStrings],
            searchName: this.name.toUpperCase()
        }

        return params
    }
}

const store = new AddChordsStore()
export default store