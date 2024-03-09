import { type ParamsDictionary as ExpressParams, type Query as ExpressQuery } from 'express-serve-static-core';
import { type _User, type AuthenticatedApi } from '../_types';
export type StripeWebhook<P extends ExpressParams = ExpressParams, ResBody = any, ReqBody = any, ReqQuery extends ExpressQuery = ExpressQuery, Locals extends Record<string, any> = Record<string, any>> = AuthenticatedApi<[
    _User
], P, ResBody, ReqBody, ReqQuery, Locals>;
