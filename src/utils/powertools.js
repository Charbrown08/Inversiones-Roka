import { Logger } from '@aws-lambda-powertools/logger'
import { Metrics } from '@aws-lambda-powertools/metrics'

export const logger = new Logger({
  serviceName: 'global-user-id'
})
export const metrics = new Metrics({
  namespace: 'global-user-id'
})
