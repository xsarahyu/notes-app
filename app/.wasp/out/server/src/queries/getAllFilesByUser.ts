import { prisma } from 'wasp/server'

import { getAllFilesByUser } from '../../../../../src/server/queries.js'


export default async function (args, context) {
  return (getAllFilesByUser as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file,
    },
  })
}

export type GetAllFilesByUser = typeof getAllFilesByUser 
