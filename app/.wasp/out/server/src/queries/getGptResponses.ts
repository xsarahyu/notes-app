import { prisma } from 'wasp/server'

import { getGptResponses } from '../../../../../src/server/queries.js'


export default async function (args, context) {
  return (getGptResponses as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      GptResponse: prisma.gptResponse,
    },
  })
}

export type GetGptResponses = typeof getGptResponses 
