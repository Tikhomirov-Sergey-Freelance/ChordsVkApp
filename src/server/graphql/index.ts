import { graphqlHTTP } from 'express-graphql'

import { RootAppSchema } from './schema'

export default (app) => {
    app.use('/graphql', graphqlHTTP({
        schema: RootAppSchema,
        graphiql: true
      }))
}