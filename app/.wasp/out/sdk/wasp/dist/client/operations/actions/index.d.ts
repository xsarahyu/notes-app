export declare const generateGptResponse: (args: {
    hours: string;
}) => Promise<import("../../../ext-src/shared/types").GeneratedSchedule>;
export declare const createTask: (args: Pick<import("@prisma/client/runtime").GetResult<{
    id: string;
    description: string;
    time: string;
    isDone: boolean;
    userId: number;
    createdAt: Date;
}, unknown> & {}, "description">) => Promise<import("@prisma/client/runtime").GetResult<{
    id: string;
    description: string;
    time: string;
    isDone: boolean;
    userId: number;
    createdAt: Date;
}, unknown> & {}>;
export declare const deleteTask: (args: Pick<import("@prisma/client/runtime").GetResult<{
    id: string;
    description: string;
    time: string;
    isDone: boolean;
    userId: number;
    createdAt: Date;
}, unknown> & {}, "id">) => Promise<import("@prisma/client/runtime").GetResult<{
    id: string;
    description: string;
    time: string;
    isDone: boolean;
    userId: number;
    createdAt: Date;
}, unknown> & {}>;
export declare const updateTask: (args: Partial<import("@prisma/client/runtime").GetResult<{
    id: string;
    description: string;
    time: string;
    isDone: boolean;
    userId: number;
    createdAt: Date;
}, unknown> & {}>) => Promise<import("@prisma/client/runtime").GetResult<{
    id: string;
    description: string;
    time: string;
    isDone: boolean;
    userId: number;
    createdAt: Date;
}, unknown> & {}>;
export declare const stripePayment: (args: string) => Promise<import("../../../ext-src/shared/types").StripePaymentResult>;
export declare const updateCurrentUser: (args: Partial<import("@prisma/client/runtime").GetResult<{
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
}, unknown> & {}>) => Promise<import("@prisma/client/runtime").GetResult<{
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
}, unknown> & {}>;
export declare const updateUserById: (args: {
    id: number;
    data: Partial<import("@prisma/client/runtime").GetResult<{
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
    }, unknown> & {}>;
}) => Promise<import("@prisma/client/runtime").GetResult<{
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
}, unknown> & {}>;
export declare const createFile: (args: {
    fileType: string;
    name: string;
}) => Promise<import("@prisma/client/runtime").GetResult<{
    id: string;
    name: string;
    type: string;
    key: string;
    uploadUrl: string;
    userId: number;
    createdAt: Date;
}, unknown> & {}>;
