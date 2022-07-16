import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { ChordsSchema } from './chord'
import { ArtistSchema } from './artist'
import { TrackSchema } from './track'
import { TrackMetricsSchema } from './track-metrics'
import { TrackErrorSchema } from './track-error'
import { TrackCandidateSchema } from './track-candidate'

export const RootType = new GraphQLObjectType({
    name: 'AllChordsSchema',
    description: 'AllChordsSchema',
    fields: {
        chords: ChordsSchema,
        artists: ArtistSchema,
        tracks: TrackSchema,    
        trackMetrics: TrackMetricsSchema,
        trackErrors: TrackErrorSchema, 
        trackCandidates: TrackCandidateSchema
    }
})

export const RootAppSchema = new GraphQLSchema({
    query: RootType
})