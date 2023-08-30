import saveLog from '../../utils/logs'
import decode from '../../utils/getJwtClient'
// middleware
const LogsMiddleware = () => {
  let clientId = ''
  let globalId = '0'
  let log = {}
  let IPclient = ''

  const LogsMiddlewareBefore = async (request) => {
    const { event } = request
    const { queryStringParameters } = event
    IPclient = event.requestContext.identity.sourceIp
    log = { method: event.httpMethod }
    try {
      let error = false
      const token = event.headers.Authorization.split(' ')[1]
      const { client_id: ID } = decode(token)
      clientId = ID
      log = { ...log, client: clientId }
      let { body } = event
      if (!body) {
        if (queryStringParameters) {
          body = queryStringParameters
        } else {
          body = {}
          error = true
        }
      }
      try {
        body = JSON.parse(body)
      } catch (e) {
        if (e instanceof SyntaxError) body = {}
      }
      globalId = body['global_user_id'] ? body['global_user_id'] : '0'
      globalId = globalId.trim().slice(0, 8)
      log = { ...log, gId: globalId, error, data: { action: 'START', ip: IPclient, info: body } }
      await saveLog(log)
    } catch (error) {
      let { body } = event
      if (!body) {
        if (queryStringParameters) {
          body = queryStringParameters
        } else {
          body = {}
        }
      }
      log = { ...log, error: true, data: { msg: error.message, body, ip: IPclient } }
      await saveLog(log)
    }
  }

  const LogsMiddlewareAfter = async (request) => {
    let error = false
    let data = {}
    const { event } = request
    const { response } = request
    try {
      if (response && response.body) {
        if (response.body) {
          const gid = JSON.parse(response.body)['global_user_id']
          if (globalId === '0' && gid) {
            globalId = gid
          }
        }
        if ([400, 401, 403, 404, 409, 500].includes(response.statusCode)) error = true
        data = {
          action: 'END',
          ip: IPclient,
          info: { statusCode: response.statusCode, body: JSON.parse(response.body) }
        }
      }
      log = { client: clientId, gId: globalId, method: event.httpMethod, error, data }
      await saveLog(log)
    } catch (err) {
      log = {
        ...log,
        error: true,
        data: { msg: err.message, body: event.body ?? {}, ip: IPclient }
      }
      await saveLog(log)
    }
  }

  const LogsMiddlewareOnError = async (request) => {
    log = {
      ...log,
      error: true,
      data: {
        msg: request?.error.title ?? 'error',
        body: request?.response.body ?? {},
        ip: IPclient
      }
    }
    await saveLog(log)
  }

  return {
    before: LogsMiddlewareBefore,
    after: LogsMiddlewareAfter,
    onError: LogsMiddlewareOnError
  }
}

export default LogsMiddleware
