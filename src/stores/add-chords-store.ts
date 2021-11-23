import { makeAutoObservable } from 'mobx'
import { iPageKey, pages } from '../pages'
import { MusicalInstrument } from '../types/global-types'
import { notes } from '../code/data/notes'
import { getOuterBindingIdentifiers } from '@babel/types'

import ChordCanvas from '../code/canvas/chord'
import GlobalStore from './global-store'
import { collection, addDoc } from '@firebase/firestore'
import { snackbar } from '../code/common/alerts'

type Mode = 'add' | 'edit'

export interface iParams {
    mode: Mode
    instrument: MusicalInstrument
    note: string
    name: string
    startFret: number
    barre: boolean
    guitarStrings: iGuitarString[]
}

export interface iGuitarString {
    index: number,
    fret: number | string
}

const defauiltParams: iParams = {
    mode: 'add',
    instrument: 'guitar',
    note: notes[0],
    name: notes[0],
    startFret: 0,
    barre: false,
    guitarStrings: []
}

export class AddChordsStore implements iParams {

    mode: Mode
    instrument: MusicalInstrument
    note: string 
    name: string
    startFret: number
    barre: boolean

    canvas: ChordCanvas

    guitarStrings!: iGuitarString[]

    constructor(params: iParams = defauiltParams) {

        this.fillParams(params)
        makeAutoObservable(this, undefined, { deep: true })

        this.saveChord = this.saveChord.bind(this)
    }

    fillParams(params: iParams) {

        for (let prop in params) {
            this[prop as keyof this] = params[prop as keyof iParams] as any
        }

        if (!this.guitarStrings?.length) {
            this.fillStrings()
        }
    }

    changeProperty(property: keyof iParams, value: any) {
        this[property as keyof this] = value
    }

    changeNote(note: string) {
        this.note = note
        this.name = this.note
    }

    changeString(index: number, fret: string) {

        const string = this.guitarStrings.find(string => string.index === index)

        if (string) {
            string.fret = isNaN(fret as any) ? fret : +fret
        }

        this.guitarStrings = [...this.guitarStrings]
    }

    changeInstrtument(instrument: MusicalInstrument) {
        this.instrument = instrument
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
        
        const firestore = GlobalStore.firestore

        const result = await addDoc(collection(firestore, `chords/${this.note}/${this.name}`), this.chordParams)
        console.log(result)
        
        snackbar('Добавили аккорд')
        this.fillParams(defauiltParams) 
    }

    get chordParams(): iParams {

        const params: iParams = {
            mode: this.mode,
            instrument: this.instrument,
            note: this.note,
            name: this.name,
            startFret: this.startFret,
            barre: this.barre,
            guitarStrings: [...this.guitarStrings]
        }

        return params
    }
}

const store = (window as any).addChordsStore = new AddChordsStore()
export default store