import { prisma } from 'wasp/server'

import { getPaginatedUsers } from '../../../../../src/server/queries.js'


export default async function (args, context) {
  return (getPaginatedUsers as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type GetPaginatedUsers = typeof getPaginatedUsers 
