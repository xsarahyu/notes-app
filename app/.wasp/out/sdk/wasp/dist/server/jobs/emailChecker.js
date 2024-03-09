import { prisma } from 'wasp/server';
import { createJobDefinition } from 'wasp/server/jobs/core/pgBoss';
const entities = {
    User: prisma.user,
};
// PUBLIC API
export const emailChecker = createJobDefinition({
    jobName: 'emailChecker',
    defaultJobOptions: {},
    jobSchedule: { "cron": "0 7 * * 1", "options": {}, "args": null },
    entities,
});
//# sourceMappingURL=emailChecker.js.map