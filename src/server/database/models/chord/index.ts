import { Schema, model} from 'mongoose'
import { iChord } from 'types/chord'

export const ChordSchema = new Schema<iChord>({
    instrument: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    startFret: {
        type: Number,
        required: true
    },

    barre: {
        type: Boolean,
        required: true
    },

    guitarStrings: {
        type: [],
        required: true
    },

    searchName: {
        type: String,
        required: true
    }

}, { versionKey: false })

export default model('chords', ChordSchema)