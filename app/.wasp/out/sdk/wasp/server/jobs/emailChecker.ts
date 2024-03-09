import { prisma } from 'wasp/server'
import type { JSONValue, JSONObject } from 'wasp/server/_types/serialization'
import { type JobFn, createJobDefinition } from 'wasp/server/jobs/core/pgBoss'

const entities = {
  User: prisma.user,
}

// PUBLIC API
export type EmailChecker<Input extends JSONObject, Output extends JSONValue | void> = JobFn<Input, Output, typeof entities>

// PUBLIC API
export const emailChecker = createJobDefinition({
  jobName: 'emailChecker',
  defaultJobOptions: {},
  jobSchedule: {"cron":"0 7 * * 1","options":{},"args":null},
  entities,
})
