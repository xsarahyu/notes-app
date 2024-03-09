import { prisma } from 'wasp/server'

import { updateUserById } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (updateUserById as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type UpdateUserById = typeof updateUserById 
