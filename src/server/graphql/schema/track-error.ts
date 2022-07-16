import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { iTrackError } from 'types/track-error'

import { TrackType } from './track'

import TrackErrorHelper from '../../database/helpers/track-errors'
import TrackHelper from '../../database/helpers/track'
import { RequestData } from '../request-data'
import { iTrackDataBase } from 'types/track'

export const TrackErrorType = new GraphQLObjectType<iTrackError>({
    name: 'TrackError',
    description: 'Ошибки в треках',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        trackId: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
        track: {
            type: TrackType,
            resolve: async (error: iTrackError) => {
                const track = await TrackHelper.loadTrackById(error.trackId)
                return track[0]
            }
        }
    })
})

type Filter = {
    trackId: string
}

export const TrackErrorSchema = {
    type: new GraphQLList(TrackErrorType),
    description: 'List of all track error',
    resolve: (track: iTrackDataBase, filter: Filter & RequestData) => {
        
        if(filter?.trackId || track) {
            return TrackErrorHelper.loadTrackErrorsByTrackId(filter.trackId || track.id)
        }

        return TrackErrorHelper.loadAllTrackErrors()
    }
}