import { prisma } from 'wasp/server'

import { updateTask } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (updateTask as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type UpdateTask = typeof updateTask 
