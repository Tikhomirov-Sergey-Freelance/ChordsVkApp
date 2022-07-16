import { graphqlHTTP } from 'express-graphql'
import { Request } from 'express'

import { RootAppSchema } from './schema'
import { getContext } from './context'

export default (app) => {
  app.use('/graphql', graphqlHTTP(async (request: Request) => ({
    schema: RootAppSchema,
    graphiql: true,
    context: await getContext(request)
  }))
  )
}