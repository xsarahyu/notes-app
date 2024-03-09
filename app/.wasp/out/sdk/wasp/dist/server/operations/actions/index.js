import { prisma } from 'wasp/server';
import { generateGptResponse as generateGptResponse_ext } from 'wasp/ext-src/server/actions.js';
import { createTask as createTask_ext } from 'wasp/ext-src/server/actions.js';
import { deleteTask as deleteTask_ext } from 'wasp/ext-src/server/actions.js';
import { updateTask as updateTask_ext } from 'wasp/ext-src/server/actions.js';
import { stripePayment as stripePayment_ext } from 'wasp/ext-src/server/actions.js';
import { updateCurrentUser as updateCurrentUser_ext } from 'wasp/ext-src/server/actions.js';
import { updateUserById as updateUserById_ext } from 'wasp/ext-src/server/actions.js';
import { createFile as createFile_ext } from 'wasp/ext-src/server/actions.js';
// PUBLIC API
export const generateGptResponse = async (args, context) => {
    return generateGptResponse_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            Task: prisma.task,
            GptResponse: prisma.gptResponse,
        } }));
};
// PUBLIC API
export const createTask = async (args, context) => {
    return createTask_ext(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
};
// PUBLIC API
export const deleteTask = async (args, context) => {
    return deleteTask_ext(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
};
// PUBLIC API
export const updateTask = async (args, context) => {
    return updateTask_ext(args, Object.assign(Object.assign({}, context), { entities: {
            Task: prisma.task,
        } }));
};
// PUBLIC API
export const stripePayment = async (args, context) => {
    return stripePayment_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
};
// PUBLIC API
export const updateCurrentUser = async (args, context) => {
    return updateCurrentUser_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
};
// PUBLIC API
export const updateUserById = async (args, context) => {
    return updateUserById_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
        } }));
};
// PUBLIC API
export const createFile = async (args, context) => {
    return createFile_ext(args, Object.assign(Object.assign({}, context), { entities: {
            User: prisma.user,
            File: prisma.file,
        } }));
};
//# sourceMappingURL=index.js.map