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

type DeleteArtistDTO = {
    artistId: string
}

export const AddArtistSchema = {
    type: ArtistType,
    description: 'Add Artist',
    args: {
        artist: { type: ArtistInputType }
    },
    resolve: (root: unknown, dto: AddArtistDTO, { isAdmin }: Context) => {

        if (!isAdmin) {
            throw 'Только администраторы могу добавлять артистов'
        }

        if (!dto.artist) {
            throw 'Не указан артист'
        }

        return ArtistHelper.insertArtist(dto.artist)
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

        if (!isAdmin) {
            throw 'Только администраторы могу изменять артиста'
        }

        if (!artistId) {
            throw 'Не указан артист'
        }

        return ArtistHelper.updateAdtist(artistId, artist)
    }
}

export const DeleteArtistSchema = {
    type: GraphQLBoolean,
    description: 'Delete Artist',
    args: {
        artistId: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root: unknown, { artistId }: DeleteArtistDTO, { isAdmin }: Context) => {

        if (!isAdmin) {
            throw 'Только администраторы могу удалять артиста'
        }

        if (!artistId) {
            throw 'Не указан артист'
        }

        return ArtistHelper.deleteArtist(artistId)
    }
}

export default {
    addArtist: AddArtistSchema,
    updateArtist: UpdateArtistSchema,
    deleteArtist: DeleteArtistSchema
}