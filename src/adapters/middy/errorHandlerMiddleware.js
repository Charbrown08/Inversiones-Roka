import { logger } from '@/utils/powertools'

const onError = async (req) => {
  if (req.response !== undefined || !req.error) return

  if (!req.error.statusCode || !req.error.expose) {
    logger.error(req.error)
    req.error = {
      type: 'urn:problem:server-error',
      title: 'Server Error',
      message: 'An unexpected error has occurred, contact the administrator.',
      statusCode: 500
    }
  }

  const { statusCode, type, title, name } = req.error
  let message = req.error.message

  if (statusCode === 400 && req.error.cause) message = req.error.cause[0].message

  req.response = {
    statusCode,
    body: JSON.stringify({
      type: type ?? 'about:blank',
      title: title ?? name,
      detail: message,
      instance: req.event.requestContext.path,
      status: statusCode
    }),
    headers: {
      'Content-Type': 'application/problem+json',
      'content-security-policy': "default-src 'self'",
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': 'https://8kd6jkn964.execute-api.us-east-1.amazonaws.com',
      'Cache-Control': 'max-age=0, must-revalidate, no-cache, no-store, private'
    }
  }
}

const errorHandler = () => ({
  onError
})

export default errorHandler
