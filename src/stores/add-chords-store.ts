import { makeAutoObservable, reaction } from 'mobx'
import { iPageKey, pages } from '../pages'
import { MusicalInstrument } from '../types/global-types'
import { notes } from '../code/data/notes'

import ChordCanvas from '../code/canvas/chord'
import GlobalStore from './global-store'
import { collection, addDoc, doc, setDoc } from '@firebase/firestore'
import { snackbar } from '../code/common/alerts'
import { iChord, iGuitarString } from 'types/chord'

type Mode = 'add' | 'edit'

const defauiltParams: iChord = {
    instrument: GlobalStore.currentInstrument,
    note: notes[0],
    name: notes[0],
    startFret: 0,
    barre: false,
    guitarStrings: []
}

export class AddChordsStore implements iChord {

    mode: Mode = 'add'
    note: string 
    name: string
    startFret: number
    barre: boolean

    get instrument() {
        return GlobalStore.currentInstrument
    }

    set instrument(value) {
        GlobalStore.changeInstrument(value)
    }

    canvas: ChordCanvas

    guitarStrings!: iGuitarString[]

    constructor(params: iChord = defauiltParams) {

        this.fillParams(params)
        makeAutoObservable(this, undefined, { deep: true })

        this.saveChord = this.saveChord.bind(this)

        reaction(() => GlobalStore.currentInstrument,
            () => {
                if(GlobalStore.activePanel === 'addChords') {
                    this.fillStrings()
                }
            }
        )  
    }

    fillParams(params: iChord) {

        for (let prop in params) {
            this[prop as keyof this] = params[prop as keyof iChord] as any
        }

        if (!this.guitarStrings.length) {
            this.fillStrings()
        }
    }

    changeProperty(property: keyof iChord, value: any) {
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

        //this.instrument = instrument
        GlobalStore.changeInstrument(instrument)

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
        
        const firestore = await GlobalStore.firebase.getFirestore()

        const result = await setDoc(doc(firestore, `chords/${this.name}`), this.chordParams)
        console.log(result)
        
        snackbar('Добавили аккорд')

        const newParams = { ...defauiltParams, note: this.chordParams.note, name: this.chordParams.note }

        this.fillParams(newParams) 
    }

    get chordParams(): iChord {

        const params: iChord = {
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

const store = new AddChordsStore()
export default store