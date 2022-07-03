import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'
import { iChord, iGuitarString } from 'types/chord'

export const GuitarStringType = new GraphQLObjectType<iGuitarString>({
  name: 'GuitarString', 
  description: 'GuitarString',
  fields: {
    index: { type: GraphQLInt },
    fret: { type: GraphQLString },
  }
})

export const ChordType = new GraphQLObjectType<iChord>({
    name: 'Chord',
    description: 'Аккорд',
    fields: () => ({
      instrument: { type: new GraphQLNonNull(GraphQLString) },
      note: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      startFret: { type: GraphQLInt },
      barre: { type: GraphQLBoolean },
      guitarStrings: {
        type: new GraphQLList(GuitarStringType)
      },
      searchName: { type: new GraphQLNonNull(GraphQLString) }
    })
  })