import { createQuery } from './core'
import { GetGptResponses } from 'wasp/server/operations/queries'
import { GetAllTasksByUser } from 'wasp/server/operations/queries'
import { GetAllFilesByUser } from 'wasp/server/operations/queries'
import { GetDownloadFileSignedURL } from 'wasp/server/operations/queries'
import { GetDailyStats } from 'wasp/server/operations/queries'
import { GetPaginatedUsers } from 'wasp/server/operations/queries'

// PUBLIC API
export const getGptResponses = createQuery<GetGptResponses>(
  'operations/get-gpt-responses',
  ['User', 'GptResponse'],
)

// PUBLIC API
export const getAllTasksByUser = createQuery<GetAllTasksByUser>(
  'operations/get-all-tasks-by-user',
  ['Task'],
)

// PUBLIC API
export const getAllFilesByUser = createQuery<GetAllFilesByUser>(
  'operations/get-all-files-by-user',
  ['User', 'File'],
)

// PUBLIC API
export const getDownloadFileSignedURL = createQuery<GetDownloadFileSignedURL>(
  'operations/get-download-file-signed-url',
  ['User', 'File'],
)

// PUBLIC API
export const getDailyStats = createQuery<GetDailyStats>(
  'operations/get-daily-stats',
  ['User', 'DailyStats'],
)

// PUBLIC API
export const getPaginatedUsers = createQuery<GetPaginatedUsers>(
  'operations/get-paginated-users',
  ['User'],
)

// PRIVATE API
export { addMetadataToQuery } from './core'
