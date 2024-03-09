import { registerJob } from 'wasp/server/jobs/core/pgBoss'
import { calculateDailyStats } from '../../../../../src/server/workers/calculateDailyStats.js'
import { dailyStatsJob as _waspJobDefinition } from 'wasp/server/jobs'

registerJob({
  job: _waspJobDefinition,
  jobFn: calculateDailyStats,
})
