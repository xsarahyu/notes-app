import { prisma } from 'wasp/server'
import type { JSONValue, JSONObject } from 'wasp/server/_types/serialization'
import { type JobFn, createJobDefinition } from 'wasp/server/jobs/core/pgBoss'

const entities = {
  User: prisma.user,
  DailyStats: prisma.dailyStats,
  Logs: prisma.logs,
  PageViewSource: prisma.pageViewSource,
}

// PUBLIC API
export type DailyStatsJob<Input extends JSONObject, Output extends JSONValue | void> = JobFn<Input, Output, typeof entities>

// PUBLIC API
export const dailyStatsJob = createJobDefinition({
  jobName: 'dailyStatsJob',
  defaultJobOptions: {},
  jobSchedule: {"cron":"0 * * * *","options":{},"args":null},
  entities,
})
