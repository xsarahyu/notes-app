import { prisma } from 'wasp/server';
import { createJobDefinition } from 'wasp/server/jobs/core/pgBoss';
const entities = {
    User: prisma.user,
    DailyStats: prisma.dailyStats,
    Logs: prisma.logs,
    PageViewSource: prisma.pageViewSource,
};
// PUBLIC API
export const dailyStatsJob = createJobDefinition({
    jobName: 'dailyStatsJob',
    defaultJobOptions: {},
    jobSchedule: { "cron": "0 * * * *", "options": {}, "args": null },
    entities,
});
//# sourceMappingURL=dailyStatsJob.js.map