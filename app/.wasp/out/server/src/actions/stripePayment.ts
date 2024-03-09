import { prisma } from 'wasp/server'

import { stripePayment } from '../../../../../src/server/actions.js'


export default async function (args, context) {
  return (stripePayment as any)(args, {
    ...context,
    entities: {
      User: prisma.user,
    },
  })
}

export type StripePayment = typeof stripePayment 
