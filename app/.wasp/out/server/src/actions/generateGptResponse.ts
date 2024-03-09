import { prisma } from 'wasp/server'

import { generateGptResponse } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (generateGptResponse as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      Task: prisma.task,
      GptResponse: prisma.gptResponse,
    },
  })
}

export type GenerateGptResponse = typeof generateGptResponse 
