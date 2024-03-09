import { type DailyStats, type GptResponse, type User, type PageViewSource, type Task, type File } from 'wasp/entities';
import { type GetGptResponses, type GetDailyStats, type GetPaginatedUsers, type GetAllTasksByUser, type GetAllFilesByUser, type GetDownloadFileSignedURL } from 'wasp/server/operations';
type DailyStatsWithSources = DailyStats & {
    sources: PageViewSource[];
};
type DailyStatsValues = {
    dailyStats: DailyStatsWithSources;
    weeklyStats: DailyStatsWithSources[];
};
export declare const getGptResponses: GetGptResponses<void, GptResponse[]>;
export declare const getAllTasksByUser: GetAllTasksByUser<void, Task[]>;
export declare const getAllFilesByUser: GetAllFilesByUser<void, File[]>;
export declare const getDownloadFileSignedURL: GetDownloadFileSignedURL<{
    key: string;
}, string>;
export declare const getDailyStats: GetDailyStats<void, DailyStatsValues>;
type GetPaginatedUsersInput = {
    skip: number;
    cursor?: number | undefined;
    hasPaidFilter: boolean | undefined;
    emailContains?: string;
    subscriptionStatus?: string[];
};
type GetPaginatedUsersOutput = {
    users: Pick<User, 'id' | 'email' | 'username' | 'lastActiveTimestamp' | 'hasPaid' | 'subscriptionStatus' | 'stripeId'>[];
    totalPages: number;
};
export declare const getPaginatedUsers: GetPaginatedUsers<GetPaginatedUsersInput, GetPaginatedUsersOutput>;
export {};
