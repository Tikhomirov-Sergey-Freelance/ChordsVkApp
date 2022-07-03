import { Schema, model } from 'mongoose'
import { iTrackCandidate } from 'types/track-candidate'

export const TrackCandidateSchema = new Schema<iTrackCandidate>({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    artist: {
        type: String,
        unique: false,
        required: true
    },

    riff: {
        type: String
    },
    riffNote: {
        type: String
    },

    strumming: {
        type: [Number]
    },
    strummingNote: {
        type: String
    },

    intro: {
        type: [String]
    },
    introNote: {
        type: String
    },

    outro: {
        type: [String]
    },
    outroNote: {
        type: String
    },

    chordText: {
        type: Object
    },
    chordsNote: {
        type: String
    },

    trackVideoSrc: {
        type: String
    },

    state: {
        type: String
    },

    userId: {
        type: String
    },

    trackId: {
        type: String
    }

}, { versionKey: false })

export default model('trackCandidate', TrackCandidateSchema)