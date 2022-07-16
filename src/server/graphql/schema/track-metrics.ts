import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'

import { iTrackMetrics } from 'types/track-metrics'
import { TrackType } from './track'

import TrackMetricsHelper from '../../database/helpers/track-metrics'
import TrackHelper from '../../database/helpers/track'
import { RequestData } from '../request-data'
import { iTrackDataBase } from 'types/track'

export const TrackMetricsType = new GraphQLObjectType<iTrackMetrics>({
    name: 'TrackMetrics',
    description: 'Метрики',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        views: { type: GraphQLInt },
        inFavorites: { type: GraphQLInt },
        track: {
            type: TrackType,
            resolve: async (metric: iTrackMetrics) => {
                const track = await TrackHelper.loadTrackById(metric.id)
                return track[0]
            }
        }
    })
})

type Filter = {
    trackId: string
}
 
export const TrackMetricsSchema = {
    type: new GraphQLList(TrackMetricsType),
    description: 'List of all track error',
    resolve: (track: iTrackDataBase, filter: Filter & RequestData) => {
        
        if(filter?.trackId || track) {
            return TrackMetricsHelper.loadTrackMetricsByTrackId(filter.trackId || track.id)
        }

        return TrackMetricsHelper.loadAllMetrics()
    }
}