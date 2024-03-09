import { type User, type GptResponse, type Task, type File, type ContactFormMessage, type DailyStats, type PageViewSource, type Logs } from "@prisma/client";
export { type User, type GptResponse, type Task, type File, type ContactFormMessage, type DailyStats, type PageViewSource, type Logs, type Auth, type AuthIdentity, } from "@prisma/client";
export type Entity = User | GptResponse | Task | File | ContactFormMessage | DailyStats | PageViewSource | Logs | never;
export type EntityName = "User" | "GptResponse" | "Task" | "File" | "ContactFormMessage" | "DailyStats" | "PageViewSource" | "Logs" | never;
