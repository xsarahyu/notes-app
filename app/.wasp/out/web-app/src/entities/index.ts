import {
  User,
  GptResponse,
  Task,
  File,
  ContactFormMessage,
  DailyStats,
  PageViewSource,
  Logs,
} from '@prisma/client'
  
export type {
  User,
  GptResponse,
  Task,
  File,
  ContactFormMessage,
  DailyStats,
  PageViewSource,
  Logs,
  Auth,
  AuthIdentity,
} from '@prisma/client'

export type Entity = 
  | User
  | GptResponse
  | Task
  | File
  | ContactFormMessage
  | DailyStats
  | PageViewSource
  | Logs
  | never
