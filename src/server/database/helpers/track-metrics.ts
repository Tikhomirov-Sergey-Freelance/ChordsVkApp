import EntityHelper from './abstract-helper'
import { iTrackMetrics } from 'types/track-metrics'

class TrackMetricsHelper extends EntityHelper {

    static entityName = 'TrackMetrics'

    static mapKey = [
        'id',
        'views',
        'inFavorites'
    ]

    protected static insertMapper(data: iTrackMetrics) {
        return {
            ...data,
            views: data.views || 0,
            inFavorites: data.inFavorites || 0
        }
    }
}

export default TrackMetricsHelper