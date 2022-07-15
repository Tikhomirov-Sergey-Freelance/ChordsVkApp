import { GraphQLString, GraphQLInt } from 'graphql'

export type RequestData = {
    limit?: number
    offset?: number
    orderby?: string
}

export const requestDataArgs = {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    orderby: { type: GraphQLString },
}

export const mapRequestDataArgs = (args: unknown = {}) => {

    const requestData: RequestData = {}

    requestData.limit = args['limit']
    requestData.offset = args['offset']
    requestData.orderby = args['orderby']

    return requestData
}