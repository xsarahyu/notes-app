import { prisma } from 'wasp/server';
import { getGptResponses as getGptResponses_ext } from 'wasp/ext-src/server/queries.js';
import { getAllTasksByUser as getAllTasksByUser_ext } from 'wasp/ext-src/server/queries.js';
import { getAllFilesByUser as getAllFilesByUser_ext } from 'wasp/ext-src/server/queries.js';
import { getDownloadFileSignedURL as getDownloadFileSignedURL_ext } from 'wasp/ext-src/server/queries.js';
import { getDailyStats as getDailyStats_ext } from 'wasp/ext-src/server/queries.js';
import { getPaginatedUsers as getPaginatedUsers_ext } from 'wasp/ext-src/server/queries.js';
// PUBLIC API
export const getGptResponses = async (args, context) => {
    return getGptResponses_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            GptResponse: prisma.gptResponse,
        } }));
};
// PUBLIC API
export const getAllTasksByUser = async (args, context) => {
    return getAllTasksByUser_ext(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
};
// PUBLIC API
export const getAllFilesByUser = async (args, context) => {
    return getAllFilesByUser_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            File: prisma.file,
        } }));
};
// PUBLIC API
export const getDownloadFileSignedURL = async (args, context) => {
    return getDownloadFileSignedURL_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            File: prisma.file,
        } }));
};
// PUBLIC API
export const getDailyStats = async (args, context) => {
    return getDailyStats_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            DailyStats: prisma.dailyStats,
        } }));
};
// PUBLIC API
export const getPaginatedUsers = async (args, context) => {
    return getPaginatedUsers_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
};
//# sourceMappingURL=index.js.map