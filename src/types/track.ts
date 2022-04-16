import { iShortArtist } from './artists'
import { defaultStrumming, StrummingType } from './strumming'

export interface iShortTrack {
    id: string
    index: number
    name: string
    artistId: string

    addedDate?: Date
    randomIndex: number

    searchNameStartArtist?: string
    searchNameEndArtist?: string
}

export interface iTrack {
    id: string
    index: number
    name: string
    artistId: string
    riff: string
    riffNote: string
    strumming: StrummingType[]
    strummingNote: string
    intro: string[]
    introNote: string
    outro: string[]
    outroNote: string
    chordsText?: iChordsText
    chordsNote: string
    trackVideoSrc: string

    addedDate?: Date
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
    words?: ChordRowWord[]
    space?: boolean
    instrumental?: iInstrumentalRow
}

export interface iChordsWord {
    word: string
    chord: iChordWordPosition
}

export interface iInstrumentalRow {
    chords?: string[]
    note?: string
}

export interface iChordWordPosition {
    key: string
    pos: number
}

export type ChordRowWord = iChordsWord | string

export const defaultTrack: iTrack = {
    id: '',
    index: 0,
    name: '',
    artistId: '',
    riff: '',
    riffNote: '',
    strumming: defaultStrumming,
    strummingNote: '',
    intro: [],
    introNote: '',
    outro: [],
    outroNote: '',
    chordsText: null,
    chordsNote: '',
    trackVideoSrc: ''
}

export const defaultShortTrack: iShortTrack = {
    id: '',
    index: 0,
    name: '',
    artistId: '',

    addedDate: null,
    randomIndex: 0
}

