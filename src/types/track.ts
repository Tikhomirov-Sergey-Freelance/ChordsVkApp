import { iShortArtist } from './artists'
import { defaultStrumming, StrummingType } from './strumming'

export interface iShortTrack {
    id: string
    index: number
    name: string
    artistId: string

    addedDate?: Date
    searchName?: string[]
    randomIndex: number
}

export interface iTrack {
    id: string
    index: number
    name: string
    artistId: string
    strumming: StrummingType[]
    strummingNote: string
    intro: string[]
    introNote: string
    chordsText: iChordsText
    chordsNote: string
    trackVideoSrc: string

    addedDate?: Date
    searchName?: string[]
    randomIndex: number
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
    index: 0,
    name: '',
    artistId: '',
    strumming: defaultStrumming,
    strummingNote: '',
    intro: [],
    introNote: '',
    chordsText: null,
    chordsNote: '',
    trackVideoSrc: '',

    randomIndex: 0
}

export const defaultShortTrack: iShortTrack = {
    id: '',
    index: 0,
    name: '',
    artistId: '',

    searchName: [],
    addedDate: null,
    randomIndex: 0
}

