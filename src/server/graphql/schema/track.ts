import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import { iTrackDataBase } from 'types/track'

import TrackHelper from '../../database/helpers/track'
import ArtistHelper from '../../database/helpers/artist'
import FavouritesHelper from '../../database/helpers/favourites'

import { requestDataArgs, RequestData, mapRequestDataArgs } from '../request-data'

import { ArtistType } from './artist'
import { TrackMetricsSchema } from './track-metrics'
import { TrackErrorSchema } from './track-error'
import { Context } from '../context'

export const TrackType = new GraphQLObjectType<iTrackDataBase>({
    name: 'Tracks',
    description: 'Кандидаты в треки',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        artistId: { type: new GraphQLNonNull(GraphQLString) },
        riff: { type: GraphQLString },
        riffNote: { type: GraphQLString },
        strumming: {
            type: new GraphQLList(GraphQLString),
            resolve: (candidate) => TrackHelper.getStrummingByDatabase(candidate)
        },
        strummingNote: { type: GraphQLString },
        intro: {
            type: new GraphQLList(GraphQLString),
            resolve: (candidate) => TrackHelper.getIntroByDatabase(candidate)
        },
        introNote: { type: GraphQLString },
        outro: {
            type: new GraphQLList(GraphQLString),
            resolve: (candidate) => TrackHelper.getOutroByDatabase(candidate)
        },
        outroNote: { type: GraphQLString },
        chordsText: {
            type: new GraphQLList(GraphQLString),
            resolve: (candidate) => TrackHelper.getChordTextByDatabase(candidate)
        },
        chordsNote: { type: GraphQLString },
        trackVideoSrc: { type: GraphQLString },
        userId: { type: GraphQLString },
        addedDate: { type: GraphQLString },
        searchNameStartArtist: { type: GraphQLString },
        searchNameEndArtist: { type: GraphQLString },
        artist: {
            type: ArtistType,
            resolve: async (track: iTrackDataBase) => {
                const artist = await ArtistHelper.loadArtistById(track.artistId)
                return artist[0]
            }
        },
        metrics: TrackMetricsSchema,
        errors: TrackErrorSchema
    })
})

type Filter = {
    id: string,
    artistId: string,
    query: string
}

export const TrackSchema = {
    type: new GraphQLList(TrackType),
    description: 'List of tracks',
    args: {
        id: { type: GraphQLString },
        artistId: { type: GraphQLString },
        query: { type: GraphQLString },
        ...requestDataArgs
    },
    resolve: async (root: unknown, filter: Filter & RequestData) => {

        const requestData = mapRequestDataArgs(filter)

        if (filter?.id) {
            return TrackHelper.loadTrackById(filter.id, requestData)
        }

        if (filter?.artistId) {
            return TrackHelper.loadTracksByArtistId(filter.artistId, requestData)
        }

        if (filter?.query) {
            return TrackHelper.loadTrackByQuery(filter.query, requestData)
        }

        return TrackHelper.loadAllTracks(requestData)
    }
}

export const TrackFavouritesSchema = {
    type: new GraphQLList(TrackType),
    description: 'Favourite tracks',
    resolve: async (root: unknown, filter: RequestData, context: Context) => {

        const { userId } = context
        const requestData = mapRequestDataArgs(filter)

        return FavouritesHelper.loadFavouiritesTracks(userId, requestData)
    }
} 