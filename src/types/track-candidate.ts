import { iShortArtist } from './artists'
import { StrummingType } from './strumming'
import { iChordsText } from './track'

export interface iTrackCandidate {
    id: string
    name: string
    artist: string
    strumming: StrummingType[]
    intro: string[]
    introNote: string
    outro: string[]
    outroNote: string
    chordText: iChordsText
    trackVideoSrc: string
    pageLink: string
}

export interface iTrackCandidatesView extends iTrackCandidate {
    foundArtist: iShortArtist
}