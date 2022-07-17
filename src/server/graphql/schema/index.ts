import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { ChordsSchema } from './chord'
import { ArtistSchema } from './artist'
import { TrackSchema, TrackFavouritesSchema } from './track'
import { TrackMetricsSchema } from './track-metrics'
import { TrackErrorSchema } from './track-error'
import { TrackCandidateSchema } from './track-candidate'

import { AddArtistSchema, UpdateArtistSchema } from './artist-mutations'

export const RootQueryType = new GraphQLObjectType({
    name: 'AllChordsSchema',
    description: 'AllChordsSchema',
    fields: {
        chords: ChordsSchema,
        artists: ArtistSchema,
        tracks: TrackSchema,  
        trackMetrics: TrackMetricsSchema,
        trackErrors: TrackErrorSchema, 
        trackCandidates: TrackCandidateSchema,

        getFavourites: TrackFavouritesSchema
    }
})

export const RootMutationType = new GraphQLObjectType({
    name: 'AllChordsSchemaMutations',
    description: 'AllChordsSchemaMutations',
    fields: {
        addArtist: AddArtistSchema,
        updateArtist: UpdateArtistSchema
    }
})

export const RootAppSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})