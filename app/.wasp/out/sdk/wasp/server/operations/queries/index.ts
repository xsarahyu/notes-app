import { prisma } from 'wasp/server'

import { getGptResponses as getGptResponses_ext } from 'wasp/ext-src/server/queries.js'
import { getAllTasksByUser as getAllTasksByUser_ext } from 'wasp/ext-src/server/queries.js'
import { getAllFilesByUser as getAllFilesByUser_ext } from 'wasp/ext-src/server/queries.js'
import { getDownloadFileSignedURL as getDownloadFileSignedURL_ext } from 'wasp/ext-src/server/queries.js'
import { getDailyStats as getDailyStats_ext } from 'wasp/ext-src/server/queries.js'
import { getPaginatedUsers as getPaginatedUsers_ext } from 'wasp/ext-src/server/queries.js'

// PRIVATE API
export type GetGptResponses = typeof getGptResponses_ext 

// PUBLIC API
export const getGptResponses = async (args, context) => {
  return (getGptResponses_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      GptResponse: prisma.gptResponse,
    },
  })
}

// PRIVATE API
export type GetAllTasksByUser = typeof getAllTasksByUser_ext 

// PUBLIC API
export const getAllTasksByUser = async (args, context) => {
  return (getAllTasksByUser_ext as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

// PRIVATE API
export type GetAllFilesByUser = typeof getAllFilesByUser_ext 

// PUBLIC API
export const getAllFilesByUser = async (args, context) => {
  return (getAllFilesByUser_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file,
    },
  })
}

// PRIVATE API
export type GetDownloadFileSignedURL = typeof getDownloadFileSignedURL_ext 

// PUBLIC API
export const getDownloadFileSignedURL = async (args, context) => {
  return (getDownloadFileSignedURL_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file,
    },
  })
}

// PRIVATE API
export type GetDailyStats = typeof getDailyStats_ext 

// PUBLIC API
export const getDailyStats = async (args, context) => {
  return (getDailyStats_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      DailyStats: prisma.dailyStats,
    },
  })
}

// PRIVATE API
export type GetPaginatedUsers = typeof getPaginatedUsers_ext 

// PUBLIC API
export const getPaginatedUsers = async (args, context) => {
  return (getPaginatedUsers_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}
