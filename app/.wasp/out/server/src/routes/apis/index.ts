import express from 'express'
import { prisma } from 'wasp/server'
import { handleRejection } from 'wasp/server/utils'
import { MiddlewareConfigFn, globalMiddlewareConfigForExpress } from '../../middleware/index.js'
import auth from 'wasp/core/auth'
import { type AuthUser } from 'wasp/auth'


import { stripeWebhook as _waspstripeWebhookfn } from '../../../../../../src/server/webhooks/stripe.js'
import { stripeMiddlewareFn as _waspstripeWebhookmiddlewareConfigFn } from '../../../../../../src/server/webhooks/stripe.js'

const idFn: MiddlewareConfigFn = x => x


const router = express.Router()


const stripeWebhookMiddleware = globalMiddlewareConfigForExpress(_waspstripeWebhookmiddlewareConfigFn)
router.post(
  '/stripe-webhook',
  [auth, ...stripeWebhookMiddleware],
  handleRejection(
    (
      req: Parameters<typeof _waspstripeWebhookfn>[0] & { user: AuthUser },
      res: Parameters<typeof _waspstripeWebhookfn>[1],
    ) => {
      const context = {
        user: req.user,
        entities: {
          User: prisma.user,
        },
      }
      return _waspstripeWebhookfn(req, res, context)
    }
  )
)

export default router
