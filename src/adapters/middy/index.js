import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import httpEventNormalizer from '@middy/http-event-normalizer'
import cors from '@middy/http-cors'
import { injectLambdaContext } from '@aws-lambda-powertools/logger'
import { logMetrics } from '@aws-lambda-powertools/metrics'

import { logger, metrics } from '@/utils/powertools'
import validatorMiddleware from './validatorMiddleware'
import errorHandlerMiddleware from './errorHandlerMiddleware'

const adapter = (handler, eventSchema = {}, contextSchema = {}) =>
  middy(handler)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(validatorMiddleware({ eventSchema, contextSchema }))
    .use(errorHandlerMiddleware())
    .use(injectLambdaContext(logger, { logEvent: false }))
    .use(logMetrics(metrics))
    .use(cors())

export default adapter
