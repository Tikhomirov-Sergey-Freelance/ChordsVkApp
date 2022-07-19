import gql from 'graphql-tag'

export const AllShortArtistQuery = gql(`

query {
    artists {
      id,
      name,
      artistImage
    }
  }
`)
