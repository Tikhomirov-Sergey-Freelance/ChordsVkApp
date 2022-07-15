import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } from 'graphql'

import { iChord, iGuitarString, iChordDataBase } from 'types/chord'
import ChordsHelper from '../../database/helpers/chords'
import ChordHelper from '../../database/helpers/chords'
import { requestDataArgs, RequestData, mapRequestDataArgs } from '../request-data'

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

type Filter = {
  query: string,
  note: string
}

export const ChordsSchema = {
  type: new GraphQLList(ChordType),
  description: 'List of all chords',
  args: {
    query: { type: GraphQLString },
    note: { type: GraphQLString },
    ...requestDataArgs
  },
  resolve: (root: unknown, chords: Filter & RequestData) => {

    const requestData = mapRequestDataArgs(chords)

    if (chords?.query) {
      return ChordsHelper.loadChordsByQuery(chords.query, requestData)
    }

    if (chords?.note) {
      return ChordsHelper.loadChordsByNote(chords.note, requestData)
    }

    return ChordsHelper.loadAllChords(requestData)
  }
}