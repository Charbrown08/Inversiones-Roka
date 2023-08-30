const headers = {
  'Content-Type': 'application/json',
  'content-security-policy': "default-src 'self'",
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Access-Control-Allow-Origin': 'https://8kd6jkn964.execute-api.us-east-1.amazonaws.com',
  'Cache-Control': 'max-age=0, must-revalidate, no-cache, no-store, private'
}

const serverError = (path = '/') => ({
  statusCode: 500,
  body: JSON.stringify({
    type: 'urn:problem:server-error',
    title: 'Server Error',
    detail: 'An unexpected error has occurred, contact the administrator.',
    status: 500,
    instance: path
  }),
  headers
})

const ok = (body) => ({
  statusCode: 200,
  headers,
  body: JSON.stringify(body)
})

const created = (body) => ({
  statusCode: 201,
  body: JSON.stringify(body),
  headers
})

const badRequest =
  (error) =>
  (path = '/') => ({
    statusCode: 400,
    body: JSON.stringify({
      type: 'urn:problem:bad-request',
      title: 'Bad Request',
      detail: error.message,
      status: 400,
      instance: path
    }),
    headers
  })

const notFound =
  (error) =>
  (path = '/') => ({
    statusCode: 404,
    body: JSON.stringify({
      type: 'urn:problem:not-found',
      title: 'Not Found',
      detail: error.message,
      status: 404,
      instance: path
    }),
    headers
  })

const conflict =
  (error) =>
  (path = '/') => ({
    statusCode: 409,
    body: JSON.stringify({
      type: 'urn:problem:conflict',
      title: 'Conflict',
      detail: error.message,
      status: 409,
      instance: path
    }),
    headers
  })

const tooManyRequest =
  (error) =>
  (path = '/') => ({
    statusCode: 429,
    body: JSON.stringify({
      type: 'urn:problem:too-many-requests',
      title: 'Too Many Requests',
      detail: error.message,
      status: 429,
      instance: path
    }),
    headers
  })

const forbidden =
  (error) =>
  (path = '/') => ({
    statusCode: 403,
    body: JSON.stringify({
      type: 'urn:problem:forbidden',
      title: 'Forbidden',
      detail: error.message,
      status: 403,
      instance: path
    }),
    headers
  })

const unauthorized =
  (error) =>
  (path = '/') => ({
    statusCode: 401,
    body: JSON.stringify({
      type: 'urn:problem:unauthorized',
      title: 'Unauthorized',
      detail: error.message,
      status: 401,
      instance: path
    }),
    headers
  })

const generic =
  (err, code) =>
  (path = '/') => ({
    statusCode: code,
    body: JSON.stringify({
      type: `urn:problem:${err.replace(' ', '-').toLowerCase()}`,
      title: err,
      detail: err,
      status: code,
      instance: path
    }),
    headers
  })

export default {
  serverError,
  ok,
  badRequest,
  generic,
  notFound,
  conflict,
  tooManyRequest,
  created,
  forbidden,
  unauthorized
}
