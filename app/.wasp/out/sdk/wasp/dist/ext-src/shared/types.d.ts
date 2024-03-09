export type StripePaymentResult = {
    sessionUrl: string | null;
    sessionId: string;
};
export type Subtask = {
    description: string;
    time: number;
    mainTaskName: string;
};
export type MainTask = {
    name: string;
    priority: 'low' | 'medium' | 'high';
};
export type GeneratedSchedule = {
    mainTasks: MainTask[];
    subtasks: Subtask[];
};
export type FunctionCallResponse = {
    schedule: GeneratedSchedule[];
};
