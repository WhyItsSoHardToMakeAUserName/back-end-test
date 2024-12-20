import Express from 'express'
import { IHandler } from './types'
import { DeliveryParams } from '@/delivery/types'
import { buildExampleHandler } from './example'
import { buildAuthHandler } from './auth'
import { buildFeedbackPostHandler } from './feedbackPost'
import { buildFeedbackPostCategoryHandler } from './feedbackPost/category'
import { buildFeedbackPostUpvoteHandler } from './feedbackPost/upvote'

export const buildHandler = (params: DeliveryParams): Express.Router => {
  const router = Express.Router()

  const handlers: Array<IHandler> = [
    buildAuthHandler(params),
    buildExampleHandler(params),
    buildFeedbackPostHandler(params),
    buildFeedbackPostCategoryHandler(params),
    buildFeedbackPostUpvoteHandler(params)
  ]

  for (let i = 0; i < handlers.length; i++){
    const handler = handlers[i]

    handler.registerRoutes(router)
  }

  return router
}
