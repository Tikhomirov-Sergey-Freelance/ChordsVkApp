import { MusicalInstrument } from './global-types'

export interface iChord {
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