import gql from 'graphql-tag'

export const AddArtistMutation = gql(`

mutation addArtist($artist: ArtistInput!) { 
    addArtist(artist: $artist) {
        id
    }
}
`) 