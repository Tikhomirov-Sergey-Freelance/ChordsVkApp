import { Schema, Types, model, SchemaTypeOptions } from 'mongoose'

export interface iArtist {
    id: string
    name: string
    
    description: string
    artistImage: string

    searchName: string
}

export const ArtistSchema = new Schema({

    id: {
        type: Number,
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

export const ShortArtistSchema = new Schema({
    vkId: {
        type: Number,
        unique: true,
        required: true
    },
    words: {
        type: String,
        unique: false,
        required: true
    }

}, { versionKey: false })

export interface iShortArtist {
    id: string
    name: string
    artistImage: string

    searchName: string
}

export interface iArtistTag {
    id: string
    artistId: string
    tag: string
    strict?: boolean
}

//export default model('admins', AdminSchema)