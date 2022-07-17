import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql'
import { iArtist, iArtistTag } from 'types/artists'
import ArtistTagHelper from '../../database/helpers/atrist-tags'

export const ArtistTagType = new GraphQLObjectType<iArtistTag>({
    name: 'ArtistTag',
    description: 'Артист теги',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        artistId: { type: new GraphQLNonNull(GraphQLString) },
        tag: { type: new GraphQLNonNull(GraphQLString) },
        strict: { type: GraphQLBoolean }
    })
})

export const ArtistTagDTOType = new GraphQLObjectType<iArtistTag>({
    name: 'ArtistTagDTO',
    description: 'Артист тег для добавления',
    fields: () => ({
        tag: { type: new GraphQLNonNull(GraphQLString) },
        strict: { type: GraphQLBoolean }
    })
})


type Filter = {
    artistId: string
}

export const ArtistTagSchema = {
    type: new GraphQLList(ArtistTagType),
    description: 'List of all atrist tags',
    resolve: (artist: iArtist, args?: Filter) => {
        
        if(artist) {
            return ArtistTagHelper.loadTagsByArtist(artist.id)
        }
        
        if(args?.artistId) {
            return ArtistTagHelper.loadTagsByArtist(args.artistId)
        }

        return ArtistTagHelper.loadAllTags()
    }
}