import { type User, type Task, type File } from 'wasp/entities';
import { type GenerateGptResponse, type StripePayment, type UpdateCurrentUser, type UpdateUserById, type CreateTask, type DeleteTask, type UpdateTask, type CreateFile } from 'wasp/server/operations';
import type { GeneratedSchedule, StripePaymentResult } from '../shared/types';
export declare const stripePayment: StripePayment<string, StripePaymentResult>;
type GptPayload = {
    hours: string;
};
export declare const generateGptResponse: GenerateGptResponse<GptPayload, GeneratedSchedule>;
export declare const createTask: CreateTask<Pick<Task, 'description'>, Task>;
export declare const updateTask: UpdateTask<Partial<Task>, Task>;
export declare const deleteTask: DeleteTask<Pick<Task, 'id'>, Task>;
export declare const updateUserById: UpdateUserById<{
    id: number;
    data: Partial<User>;
}, User>;
type fileArgs = {
    fileType: string;
    name: string;
};
export declare const createFile: CreateFile<fileArgs, File>;
export declare const updateCurrentUser: UpdateCurrentUser<Partial<User>, User>;
export {};
