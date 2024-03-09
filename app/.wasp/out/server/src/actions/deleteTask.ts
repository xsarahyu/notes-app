import { prisma } from 'wasp/server'

import { deleteTask } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (deleteTask as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

export type DeleteTask = typeof deleteTask 
