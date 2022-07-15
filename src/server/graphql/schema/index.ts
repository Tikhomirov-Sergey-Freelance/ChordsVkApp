import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { ChordsSchema } from './chord'
import { ArtistSchema } from './artist'
import { TrackSchema } from './track'
import { TrackCandidateSchema } from './track-candidate'

export const RootType = new GraphQLObjectType({
    name: 'AllChordsSchema',
    description: 'AllChordsSchema',
    fields: {
        chords: ChordsSchema,
        artists: ArtistSchema,
        tracks: TrackSchema,     
        trackCandidates: TrackCandidateSchema  
    }
})

export const RootAppSchema = new GraphQLSchema({
    query: RootType
})