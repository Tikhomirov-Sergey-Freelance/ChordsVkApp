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

    static async loadAllMetrics() {

        const data = await this.query<iTrackMetrics>(`
            SELECT * 
            FROM TrackMetrics
        `)

        if(data.error) {
            throw data.error
        }

        return data.result
    }

    static async loadTrackMetricsByTrackId(trackId: string) {

        const data = await this.query<iTrackMetrics>(`
            SELECT * 
            FROM TrackMetrics
            WHERE id = '${trackId}'
        `)

        if(data.error) {
            throw data.error
        }

        return data.result

    }
}

export default TrackMetricsHelper