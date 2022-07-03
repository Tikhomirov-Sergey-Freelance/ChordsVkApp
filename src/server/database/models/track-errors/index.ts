import { Schema, model } from 'mongoose'
import { iTrackError } from 'types/track-error'

export const TrackErrorsSchema = new Schema<iTrackError>({
    id: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    trackId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }

}, { versionKey: false })

export const trackErrorModel = model('trackErrors', TrackErrorsSchema)

