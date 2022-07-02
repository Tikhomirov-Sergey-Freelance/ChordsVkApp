import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";

import { ChordType } from './chord'

export const RootType = new GraphQLObjectType({
    name: 'AllChordsSchema',
    description: "AllChordsSchema",
    fields: {
        chords: {
            type: new GraphQLList(ChordType),
            description: "List of all chords",
            resolve: () => {
                return []
            }
        },
    }
});

export const RootAppSchema = new GraphQLSchema({
    query: RootType
});