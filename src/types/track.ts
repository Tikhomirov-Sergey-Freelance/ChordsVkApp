import { iShortArtist } from './artists'
import { defaultStrumming, StrummingType } from './strumming'

export interface iShortTrack {
    id: string
    name: string
    artistId: string

    addedDate?: Date
    searchName?: string[]
}

export interface iTrack {
    id: string
    name: string
    artistId: string
    strumming: StrummingType[]
    strummingNote: string
    chordsText: iChordsText
    chordsNote: string
    trackVideoSrc: string

    addedDate?: Date
    searchName?: string[]
} 

export interface iShortTrackView extends iShortTrack {
    artist: iShortArtist
}

export interface iTrackView extends iTrack {
    artist: iShortArtist
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

export const defaultTrack: iTrack = {
    id: '',
    name: '',
    artistId: '',
    strumming: defaultStrumming,
    strummingNote: '',
    chordsText: null,
    chordsNote: '',
    trackVideoSrc: ''
}

export const defaultShortTrack: iShortTrack = {
    id: '',
    name: '',
    artistId: '',

    searchName: [],
    addedDate: null
}

