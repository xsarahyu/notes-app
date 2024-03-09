import { createAction } from './core'
import { GenerateGptResponse } from 'wasp/server/operations/actions'
import { CreateTask } from 'wasp/server/operations/actions'
import { DeleteTask } from 'wasp/server/operations/actions'
import { UpdateTask } from 'wasp/server/operations/actions'
import { StripePayment } from 'wasp/server/operations/actions'
import { UpdateCurrentUser } from 'wasp/server/operations/actions'
import { UpdateUserById } from 'wasp/server/operations/actions'
import { CreateFile } from 'wasp/server/operations/actions'

// PUBLIC API
export const generateGptResponse = createAction<GenerateGptResponse>(
  'operations/generate-gpt-response',
  ['User', 'Task', 'GptResponse'],
)

// PUBLIC API
export const createTask = createAction<CreateTask>(
  'operations/create-task',
  ['Task'],
)

// PUBLIC API
export const deleteTask = createAction<DeleteTask>(
  'operations/delete-task',
  ['Task'],
)

// PUBLIC API
export const updateTask = createAction<UpdateTask>(
  'operations/update-task',
  ['Task'],
)

// PUBLIC API
export const stripePayment = createAction<StripePayment>(
  'operations/stripe-payment',
  ['User'],
)

// PUBLIC API
export const updateCurrentUser = createAction<UpdateCurrentUser>(
  'operations/update-current-user',
  ['User'],
)

// PUBLIC API
export const updateUserById = createAction<UpdateUserById>(
  'operations/update-user-by-id',
  ['User'],
)

// PUBLIC API
export const createFile = createAction<CreateFile>(
  'operations/create-file',
  ['User', 'File'],
)
