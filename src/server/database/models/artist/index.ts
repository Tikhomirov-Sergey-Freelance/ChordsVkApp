import { Schema, model } from 'mongoose'
import { iArtist, iArtistTag, iShortArtist } from 'types/artists'

export const ArtistSchema = new Schema<iArtist>({

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

    description: {
        type: String,
        unique: false
    },
    artistImage: {
        type: String,
        unique: false
    },
    
    searchName: {
        type: String,
        unique: false
    }

}, { versionKey: false })

export const ShortArtistSchema = new Schema<iShortArtist>({
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
    
    searchName: {
        type: String,
        unique: false
    }

}, { versionKey: false })

export const ArtistTagSchema = new Schema<iArtistTag>({
    id: {
        type: String,
        unique: true,
        required: true
    },
    artistId: {
        type: String,
        unique: false,
        required: true
    },
    
    tag: {
        type: String,
        unique: false,
        required: true
    },

    strict: {
        type: Boolean,
        unique: false,
    },

}, { versionKey: false })

export const artistModel = model('artist', ArtistSchema)
export const shortArtistModel = model('short-artist', ShortArtistSchema)
export const artistTagModel = model('artist-tag', ArtistTagSchema)