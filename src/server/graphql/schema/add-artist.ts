import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType
} from 'graphql'

import { iArtistTag, iAddArtistDTO } from 'types/artists'
import ArtistHelper from '../../database/helpers/artist'
import { ArtistType } from './artist'

export const ArtistTagInputType = new GraphQLInputObjectType({
    name: 'ArtistTagInput',
    fields: {
        tag: { type: new GraphQLNonNull(GraphQLString) },
        strict: { type: GraphQLBoolean }
    }
})

export const ArtistInputType = new GraphQLInputObjectType({
    name: 'ArtistInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString, defaultValue: '' },
        artistImage: { type: GraphQLString, defaultValue: '' },
        tags: { type: new GraphQLList(ArtistTagInputType) }
    }
})

type ArtistDTO = {
    artist: iAddArtistDTO & iArtistTag
}

export const AddArtistSchema = {
    type: ArtistType,
    description: 'Add Artist',
    args: {
        artist: { type: ArtistInputType }
    },
    resolve: (root: unknown, { artist }: ArtistDTO) => {

        if (!artist) {
            throw 'Не указан артист'
        }

        return ArtistHelper.insertArtist(artist)
    }
}