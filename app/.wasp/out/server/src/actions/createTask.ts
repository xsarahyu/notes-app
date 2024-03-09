import { prisma } from 'wasp/server'

import { createTask } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (createTask as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type CreateTask = typeof createTask 
