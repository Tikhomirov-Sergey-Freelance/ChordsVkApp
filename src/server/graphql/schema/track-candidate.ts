import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLEnumType } from 'graphql'

import { iTrackCandidate, iTrackCandidateDataBase, TrackCandidateState } from 'types/track-candidate'
import TrackCandidateHelper from '../../database/helpers/track-candidates'
import { requestDataArgs, RequestData, mapRequestDataArgs } from '../request-data'

const TrackCandidateStateEnum = new GraphQLEnumType({
    name: 'state',
    values: {
        active: { value: 'active' },
        added: { value: 'added' },
        cancel: { value: 'cancel' }
    }
})

export const TrackCandidateType = new GraphQLObjectType<iTrackCandidateDataBase, iTrackCandidate>({
  name: 'TrackCandidates',
  description: 'Кандидаты в треки',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    artist: { type: new GraphQLNonNull(GraphQLString) },

    riff: { type: GraphQLString },
    riffNote: { type: GraphQLString },
    strumming: {
        type: new GraphQLList(GraphQLString),
        resolve: (candidate) => TrackCandidateHelper.getStrummingByDatabase(candidate)
    },
    strummingNote: { type: GraphQLString },
    intro: {
        type: new GraphQLList(GraphQLString),
        resolve: (candidate) => TrackCandidateHelper.getIntroByDatabase(candidate)
    },
    introNote: { type: GraphQLString },
    outro: {
        type: new GraphQLList(GraphQLString),
        resolve: (candidate) => TrackCandidateHelper.getOutroByDatabase(candidate)
    },
    outroNote: { type: GraphQLString },
    chordsText: {
        type: new GraphQLList(GraphQLString),
        resolve: (candidate) => TrackCandidateHelper.getChordTextByDatabase(candidate)
    },
    chordsNote: { type: GraphQLString }, 
    trackVideoSrc: { type: GraphQLString }, 
    pageLink: { type: GraphQLString }, 
    state: { type: TrackCandidateStateEnum }, 
    userId: { type: GraphQLString }, 
    trackId: { type: GraphQLString }
  })
})

type Filter = {
  state: TrackCandidateState
}

export const TrackCandidateSchema = {
  type: new GraphQLList(TrackCandidateType),
  description: 'List of track candidates',
  args: {
    state: { type: TrackCandidateStateEnum },
    ...requestDataArgs
  },
  resolve: (root: unknown, filter: Filter & RequestData) => {
    const requestData = mapRequestDataArgs(filter)
    return TrackCandidateHelper.loadCandidatesByState(filter?.state, requestData)
  }
}