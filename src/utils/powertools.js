import { Logger } from '@aws-lambda-powertools/logger'
import { Metrics } from '@aws-lambda-powertools/metrics'

export const logger = new Logger({
  serviceName: 'inversiones-roka'
})
export const metrics = new Metrics({
  namespace: 'inversiones-roka'
})
