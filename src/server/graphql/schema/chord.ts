import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'

import { iChord, iGuitarString, iChordDataBase } from 'types/chord'
import ChordsHelper from '../../database/helpers/chords'
import ChordHelper from '../../database/helpers/chords'

export const GuitarStringType = new GraphQLObjectType<iGuitarString>({
  name: 'GuitarString', 
  description: 'GuitarString',
  fields: {
    index: { type: GraphQLInt },
    fret: { type: GraphQLString },
  }
})

export const ChordType = new GraphQLObjectType<iChordDataBase, iChord>({
    name: 'Chord',
    description: 'Аккорд',
    fields: () => ({
      instrument: { type: new GraphQLNonNull(GraphQLString) },
      note: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      startFret: { type: GraphQLInt },
      barre: { type: GraphQLBoolean },
      guitarStrings: {
        type: new GraphQLList(GuitarStringType),
        resolve: (chord) => ChordHelper.getChordStrings(chord)
      },
      searchName: { type: new GraphQLNonNull(GraphQLString) }
    })
  })

  export const ChordsSchema = {
    type: new GraphQLList(ChordType),
    description: 'List of all chords',
    resolve: () => {
      
        return ChordsHelper.loadAllChords()
    }
}