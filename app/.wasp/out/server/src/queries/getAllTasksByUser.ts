import { prisma } from 'wasp/server'

import { getAllTasksByUser } from '../../../../../src/server/queries.js'


export default async function (args, context) {
  return (getAllTasksByUser as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type GetAllTasksByUser = typeof getAllTasksByUser 
