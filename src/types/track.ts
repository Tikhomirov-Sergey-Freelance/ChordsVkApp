import { iArtist } from './artists'
import { StrummingType } from './strumming'

export interface iTrack {
    id: string
    name: string
    artistId: string
    strumming: StrummingType[]
    strummingNote: string
    chordsText: iChordsText
    chordsNote: string

    addedDate?: Date
    searchName?: string
} 

export interface iTrackView extends iTrack {
    artist: iArtist
}

export interface iChordsText {
    rows: iChordsRow[]
}

export interface iChordsRow {
    words: iChordsWord[]
    spaceRow?: boolean
}

export interface iChordsWord {
    word: string
    chord?: iChordWordPosition
}

export interface iChordWordPosition {
    key: string
    chordCharPosition: number
}

