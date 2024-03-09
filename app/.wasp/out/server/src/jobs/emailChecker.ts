import { registerJob } from 'wasp/server/jobs/core/pgBoss'
import { checkAndQueueEmails } from '../../../../../src/server/workers/checkAndQueueEmails.js'
import { emailChecker as _waspJobDefinition } from 'wasp/server/jobs'

registerJob({
  job: _waspJobDefinition,
  jobFn: checkAndQueueEmails,
})
