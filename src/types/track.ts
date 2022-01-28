import { StrummingType } from "./strumming";

export interface iTrack {
    id: string
    name: string
    artistId: string
    strumming: StrummingType[]
    strummingNote: string
    chordsText: iChordsText
} 

export interface iChordsText {
    rows: iChordsRow[]
}

export interface iChordsRow {
    words: iChordsWord[]
}

export interface iChordsWord {
    word: string
    chord?: iChordWordPosition
}

export interface iChordWordPosition {
    key: string
    chordCharPosition: number
}

