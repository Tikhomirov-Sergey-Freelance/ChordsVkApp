import { __String } from 'typescript'
import { iShortArtist } from './artists'
import { StrummingType } from './strumming'
import { iChordsText } from './track'

export interface iTrackCandidateDataBase {
    id: string
    name: string
    artist: string
    riff: string
    riffNote: string
    strumming?: string
    strummingNote: string
    intro?: string
    introNote?: string
    outro?: string
    outroNote?: string
    chordsText?: string
    chordsNote?: string
    trackVideoSrc?: string
    pageLink?: string

    state: TrackCandidateState
    userId?: string
    trackId?: __String
}

export interface iTrackCandidate {
    id: string
    name: string
    artist: string
    riff: string
    riffNote: string
    strumming?: StrummingType[]
    strummingNote: string
    intro?: string[]
    introNote?: string
    outro?: string[]
    outroNote?: string
    chordText?: iChordsText
    chordsNote?: string
    trackVideoSrc?: string
    pageLink?: string

    state: TrackCandidateState
    userId?: string
    trackId?: __String
}

export type TrackCandidateState = 'active' | 'added' | 'cancel'

export interface iTrackCandidatesView extends iTrackCandidate {
    foundArtist: iShortArtist
}