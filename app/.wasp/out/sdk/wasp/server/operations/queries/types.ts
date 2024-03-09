
import {
  type _User,
  type _GptResponse,
  type _Task,
  type _File,
  type _DailyStats,
  type AuthenticatedQuery,
  type Payload,
} from 'wasp/server/_types'

// PUBLIC API
export type GetGptResponses<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
      _GptResponse,
    ],
    Input,
    Output
  >

// PUBLIC API
export type GetAllTasksByUser<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _Task,
    ],
    Input,
    Output
  >

// PUBLIC API
export type GetAllFilesByUser<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
      _File,
    ],
    Input,
    Output
  >

// PUBLIC API
export type GetDownloadFileSignedURL<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
      _File,
    ],
    Input,
    Output
  >

// PUBLIC API
export type GetDailyStats<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
      _DailyStats,
    ],
    Input,
    Output
  >

// PUBLIC API
export type GetPaginatedUsers<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedQuery<
    [
      _User,
    ],
    Input,
    Output
  >

