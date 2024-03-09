import { prisma } from 'wasp/server'

import { createFile } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (createFile as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file,
    },
  })
}

export type CreateFile = typeof createFile 
