import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import { iArtist } from 'types/artists'

import { ArtistTagSchema } from './artist-tag'
import ArtistHelper from '../../database/helpers/artist'

export const ArtistType = new GraphQLObjectType<iArtist>({
    name: 'Artist',
    description: 'Артисты',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        searchName: { type: new GraphQLNonNull(GraphQLString) },
        tags: ArtistTagSchema
    })
})

type Filter = {
    id: string,
    tag: string
}

export const ArtistSchema = {
    type: new GraphQLList(ArtistType),
    description: 'List of all atrists',
    args: {
        id: { type: GraphQLString },
        tag: { type: GraphQLString },
    },
    resolve: (root: unknown, args?: Filter) => {

        if(args?.tag) {
            return ArtistHelper.loadArtistByTag(args?.tag)
        }
        
        if(args?.id) {
            return ArtistHelper.loadArtistById(args.id)
        }

        return ArtistHelper.loadAllArtists()
    }
}