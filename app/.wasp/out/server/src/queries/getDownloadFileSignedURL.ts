import { prisma } from 'wasp/server'

import { getDownloadFileSignedURL } from '../../../../../src/server/queries.js'


export default async function (args, context) {
  return (getDownloadFileSignedURL as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file,
    },
  })
}

export type GetDownloadFileSignedURL = typeof getDownloadFileSignedURL 
