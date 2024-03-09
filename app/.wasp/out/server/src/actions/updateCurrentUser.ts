import { prisma } from 'wasp/server'

import { updateCurrentUser } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (updateCurrentUser as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type UpdateCurrentUser = typeof updateCurrentUser 
