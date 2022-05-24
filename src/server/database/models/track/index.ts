import { Schema, Types, model, SchemaTypeOptions } from 'mongoose'
import { iShortTrack, iTrack } from 'types/track'

export const TrackSchema = new Schema<iTrack>({

    id: {
        type: String,
        unique: true,
        required: true
    },
    index: {
        type: Number
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    artistId: {
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

    chordsText: {
        type: Object
    },
    chordsNote: {
        type: String
    },

    trackVideoSrc: {
        type: String
    },

    addedDate: {
        type: Date
    }

}, { versionKey: false })

export const ShortTrackSchema = new Schema<iShortTrack>({
    id: {
        type: String,
        unique: true,
        required: true
    },
    index: {
        type: Number
    },
    name: {
        type: String,
        unique: false,
        required: true
    },
    artistId: {
        type: String,
        unique: false,
        required: true
    },

    addedDate: {
        type: Date
    },
    randomIndex: {
        type: Number
    },

    searchNameStartArtist: {
        type: String
    },
    searchNameEndArtist: {
        type: String
    }

}, { versionKey: false })

export const trackModel = model('track', TrackSchema)
//export const shortTrackModel = model('shortTrack', ShortTrackSchema)