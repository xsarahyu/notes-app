export declare const getGptResponses: (queryCacheKey: string[], args: void) => Promise<(import("@prisma/client/runtime").GetResult<{
    id: string;
    content: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}, unknown> & {})[]>;
export declare const getAllTasksByUser: (queryCacheKey: string[], args: void) => Promise<(import("@prisma/client/runtime").GetResult<{
    id: string;
    description: string;
    time: string;
    isDone: boolean;
    userId: number;
    createdAt: Date;
}, unknown> & {})[]>;
export declare const getAllFilesByUser: (queryCacheKey: string[], args: void) => Promise<(import("@prisma/client/runtime").GetResult<{
    id: string;
    name: string;
    type: string;
    key: string;
    uploadUrl: string;
    userId: number;
    createdAt: Date;
}, unknown> & {})[]>;
export declare const getDownloadFileSignedURL: (queryCacheKey: string[], args: {
    key: string;
}) => Promise<string>;
export declare const getDailyStats: (queryCacheKey: string[], args: void) => Promise<{
    dailyStats: import("@prisma/client/runtime").GetResult<{
        id: number;
        date: Date;
        totalViews: number;
        prevDayViewsChangePercent: string;
        userCount: number;
        paidUserCount: number;
        userDelta: number;
        paidUserDelta: number;
        totalRevenue: number;
        totalProfit: number;
    }, unknown> & {} & {
        sources: (import("@prisma/client/runtime").GetResult<{
            date: Date;
            name: string;
            visitors: number;
            dailyStatsId: number;
        }, unknown> & {})[];
    };
    weeklyStats: (import("@prisma/client/runtime").GetResult<{
        id: number;
        date: Date;
        totalViews: number;
        prevDayViewsChangePercent: string;
        userCount: number;
        paidUserCount: number;
        userDelta: number;
        paidUserDelta: number;
        totalRevenue: number;
        totalProfit: number;
    }, unknown> & {} & {
        sources: (import("@prisma/client/runtime").GetResult<{
            date: Date;
            name: string;
            visitors: number;
            dailyStatsId: number;
        }, unknown> & {})[];
    })[];
}>;
export declare const getPaginatedUsers: (queryCacheKey: string[], args: {
    skip: number;
    cursor?: number;
    hasPaidFilter: boolean;
    emailContains?: string;
    subscriptionStatus?: string[];
}) => Promise<{
    users: Pick<import("@prisma/client/runtime").GetResult<{
        id: number;
        email: string;
        username: string;
        createdAt: Date;
        lastActiveTimestamp: Date;
        isAdmin: boolean;
        stripeId: string;
        checkoutSessionId: string;
        hasPaid: boolean;
        subscriptionTier: string;
        subscriptionStatus: string;
        sendEmail: boolean;
        datePaid: Date;
        credits: number;
    }, unknown> & {}, "id" | "email" | "username" | "lastActiveTimestamp" | "stripeId" | "hasPaid" | "subscriptionStatus">[];
    totalPages: number;
}>;
export { addMetadataToQuery } from './core';
