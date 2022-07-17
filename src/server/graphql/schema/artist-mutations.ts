import {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType
} from 'graphql'

import { iArtistTag, iAddArtistDTO } from 'types/artists'
import ArtistHelper from '../../database/helpers/artist'
import { Context } from '../context'
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

type AddArtistDTO = {
    artist: iAddArtistDTO & iArtistTag
}

type UpdateArtistDTO = {
    artistId: string
    artist: iAddArtistDTO & iArtistTag
}

export const AddArtistSchema = {
    type: ArtistType,
    description: 'Add Artist',
    args: {
        artist: { type: ArtistInputType }
    },
    resolve: (root: unknown, { artist }: AddArtistDTO, { isAdmin }: Context) => {

        if(!isAdmin) {
            throw 'Только администраторы могу добавлять артистов'
        }

        if (!artist) {
            throw 'Не указан артист'
        }

        return ArtistHelper.insertArtist(artist)
    }
}

export const UpdateArtistSchema = {
    type: ArtistType,
    description: 'Update Artist',
    args: {
        artistId: { type: new GraphQLNonNull(GraphQLString) },
        artist: { type: ArtistInputType }
    },
    resolve: (root: unknown, { artistId, artist }: UpdateArtistDTO, { isAdmin }: Context) => {

        if(!isAdmin) {
            throw 'Только администраторы могу изменять артиста'
        }

        if (!artistId) {
            throw 'Не указан артист'
        }
        console.log(artistId, artist)
        return ArtistHelper.updateAdtist(artistId, artist)
    }
}