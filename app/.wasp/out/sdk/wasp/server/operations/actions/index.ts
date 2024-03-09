import { prisma } from 'wasp/server'

import { generateGptResponse as generateGptResponse_ext } from 'wasp/ext-src/server/actions.js'
import { createTask as createTask_ext } from 'wasp/ext-src/server/actions.js'
import { deleteTask as deleteTask_ext } from 'wasp/ext-src/server/actions.js'
import { updateTask as updateTask_ext } from 'wasp/ext-src/server/actions.js'
import { stripePayment as stripePayment_ext } from 'wasp/ext-src/server/actions.js'
import { updateCurrentUser as updateCurrentUser_ext } from 'wasp/ext-src/server/actions.js'
import { updateUserById as updateUserById_ext } from 'wasp/ext-src/server/actions.js'
import { createFile as createFile_ext } from 'wasp/ext-src/server/actions.js'

// PRIVATE API
export type GenerateGptResponse = typeof generateGptResponse_ext 

// PUBLIC API
export const generateGptResponse = async (args, context) => {
  return (generateGptResponse_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      Task: prisma.task,
      GptResponse: prisma.gptResponse,
    },
  })
}

// PRIVATE API
export type CreateTask = typeof createTask_ext 

// PUBLIC API
export const createTask = async (args, context) => {
  return (createTask_ext as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

// PRIVATE API
export type DeleteTask = typeof deleteTask_ext 

// PUBLIC API
export const deleteTask = async (args, context) => {
  return (deleteTask_ext as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

// PRIVATE API
export type UpdateTask = typeof updateTask_ext 

// PUBLIC API
export const updateTask = async (args, context) => {
  return (updateTask_ext as any)(args, {
    ...context,
    entities: {
      Task: prisma.task,
    },
  })
}

// PRIVATE API
export type StripePayment = typeof stripePayment_ext 

// PUBLIC API
export const stripePayment = async (args, context) => {
  return (stripePayment_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

// PRIVATE API
export type UpdateCurrentUser = typeof updateCurrentUser_ext 

// PUBLIC API
export const updateCurrentUser = async (args, context) => {
  return (updateCurrentUser_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

// PRIVATE API
export type UpdateUserById = typeof updateUserById_ext 

// PUBLIC API
export const updateUserById = async (args, context) => {
  return (updateUserById_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

// PRIVATE API
export type CreateFile = typeof createFile_ext 

// PUBLIC API
export const createFile = async (args, context) => {
  return (createFile_ext as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
      File: prisma.file,
    },
  })
}
