import { ApolloError, ForbiddenError } from 'apollo-server-express'
import { GraphQLError } from 'graphql'

export const formatError = (error: GraphQLError): ApolloError | GraphQLError => {
  if (error?.message === 'PersistedQueryNotFoundError') {
    return error
  }
  const code = error.extensions.exception.code
  if (code === 'FORBIDDEN') {
    return new ForbiddenError(error.message)
  }
  return error
}
