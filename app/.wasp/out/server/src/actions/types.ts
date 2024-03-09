import {
  type _User,
  type _Task,
  type _GptResponse,
  type _File,
  type AuthenticatedAction,
  type Payload,
} from 'wasp/server/_types'

export type GenerateGptResponse<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _User,
      _Task,
      _GptResponse,
    ],
    Input,
    Output
  >

export type CreateTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

export type DeleteTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

export type UpdateTask<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _Task,
    ],
    Input,
    Output
  >

export type StripePayment<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _User,
    ],
    Input,
    Output
  >

export type UpdateCurrentUser<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _User,
    ],
    Input,
    Output
  >

export type UpdateUserById<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _User,
    ],
    Input,
    Output
  >

export type CreateFile<Input extends Payload = never, Output extends Payload = Payload> = 
  AuthenticatedAction<
    [
      _User,
      _File,
    ],
    Input,
    Output
  >

