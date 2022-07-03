import { Schema, model } from 'mongoose'
import { iAllTracksInfo, iTrackMetrics } from 'types/track-metrics'

export const TrackMetricsSchema = new Schema<iTrackMetrics>({
    id: {
        type: String,
        unique: true,
        required: true
    },
    views: {
        type: Number
    },
    inFavorites: {
        type: Number
    }

}, { versionKey: false })

export const AllInfoTrackMetricsSchema = new Schema<iAllTracksInfo>({
    count: {
        type: Number
    },
    nextRandomIndex: {
        type: Number
    },

}, { versionKey: false })

export const trackMetrics = model('trackMetrics', TrackMetricsSchema)
//export const allTrackMetrics = model('trackMetrics', AllInfoTrackMetricsSchema)

