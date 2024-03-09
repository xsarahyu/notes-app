import { createAction } from './core';
// PUBLIC API
export const generateGptResponse = createAction('operations/generate-gpt-response', ['User', 'Task', 'GptResponse']);
// PUBLIC API
export const createTask = createAction('operations/create-task', ['Task']);
// PUBLIC API
export const deleteTask = createAction('operations/delete-task', ['Task']);
// PUBLIC API
export const updateTask = createAction('operations/update-task', ['Task']);
// PUBLIC API
export const stripePayment = createAction('operations/stripe-payment', ['User']);
// PUBLIC API
export const updateCurrentUser = createAction('operations/update-current-user', ['User']);
// PUBLIC API
export const updateUserById = createAction('operations/update-user-by-id', ['User']);
// PUBLIC API
export const createFile = createAction('operations/create-file', ['User', 'File']);
//# sourceMappingURL=index.js.map