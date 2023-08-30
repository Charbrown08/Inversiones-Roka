// import middyAdapter from '@/adapters/middy'
// import saveUserToDb from '../database/dynamoDb/saveUserGlobalId'
// import httpResponses from '../utils/httpResponses'
// import { KEYS } from '../constants/keys'
// import decode from '../utils/getJwtClient'
// import saveLog from '../utils/logs'

// const eventSchema = {
//   type: 'object',
//   required: ['body'],
//   properties: {
//     body: {
//       type: 'object',
//       additionalProperties: false,
//       required: [
//         KEYS.COUNTRY,
//         KEYS.IDENTITY,
//         KEYS.NAME,
//         KEYS.LAST_NAME,
//         KEYS.ORIGIN,
//         KEYS.DATE_DISCHARGE
//       ],
//       properties: {
//         [KEYS.COUNTRY]: {
//           type: 'string',
//           transform: ['trim', 'toUpperCase'],
//           minLength: 1,
//           maxLength: 2,
//           pattern: '^[a-zA-Z]+$'
//         },
//         [KEYS.IDENTITY]: {
//           type: 'string',
//           transform: ['trim'],
//           minLength: 1,
//           maxLength: 35,
//           pattern: '^[a-zA-Z0-9-_]+$'
//         },
//         [KEYS.NAME]: {
//           type: 'string',
//           transform: ['trim', 'toUpperCase'],
//           minLength: 1,
//           maxLength: 50,
//           pattern: '^[a-zA-ZñÑ ]+$'
//         },
//         [KEYS.LAST_NAME]: {
//           type: 'string',
//           transform: ['trim', 'toUpperCase'],
//           minLength: 1,
//           maxLength: 50,
//           pattern: '^[a-zA-ZñÑ ]+$'
//         },
//         [KEYS.DOMAIN]: {
//           type: 'string',
//           minLength: 1,
//           maxLength: 50,
//           pattern: '^[a-z]+.[a-z]+.[a-z]+$'
//         },
//         [KEYS.ORIGIN]: {
//           type: 'string',
//           minLength: 1,
//           maxLength: 35,
//           pattern: '^[a-zA-Z0-9]+$'
//         },
//         [KEYS.DATE_DISCHARGE]: {
//           type: 'string',
//           format: 'date',
//           minLength: 1,
//           maxLength: 10
//         },

//         [KEYS.ID_ERP]: {
//           type: 'string',
//           minLength: 1,
//           maxLength: 35,
//           transform: ['trim', 'toLowerCase'],
//           pattern: '^[a-zA-Z0-9-_]+$'
//         },
//         [KEYS.EMAIL_BUSINESS]: {
//           type: 'string',
//           format: 'email',
//           transform: ['trim'],
//           minLength: 1,
//           maxLength: 50
//         },
//         [KEYS.CECO]: {
//           type: 'string',
//           minLength: 1,
//           maxLength: 35,
//           pattern: '^[_a-zA-Z0-9]+$'
//         },
//         [KEYS.STATUS_GLOBAL_USER]: {
//           transform: ['trim', 'toUpperCase'],
//           enum: ['LOW', 'ACTIVE']
//         },
//         [KEYS.DATE_DEPARTURE]: {
//           type: 'string',
//           format: 'date',
//           minLength: 1,
//           maxLength: 24
//         },
//         [KEYS.DATE_LAST_REACTIVATION]: {
//           type: 'string',
//           format: 'date',
//           minLength: 1,
//           maxLength: 24
//         },
//         [KEYS.DATE_LAST_UPDATE]: {
//           type: 'string',
//           format: 'date',
//           minLength: 1,
//           maxLength: 24
//         }
//       }
//     }
//   }
// }

// const controller = async (event) => {
//   const PATH = event.path
//   const { body } = event
//   const token = event.headers.Authorization.split(' ')[1]
//   const { client_id } = decode(token)
//   const clientId = client_id
//   let log = { client: clientId, gId: '0', method: 'POST', error: false, data: {} }

//   try {
//     const result = await saveUserToDb(body)
//     log = {
//       ...log,
//       gId: result.global_user_id,
//       data: { action: 'PROC', body: JSON.stringify(event.body) }
//     }
//     await saveLog(log)
//     return httpResponses.created({ global_user_id: result.global_user_id })
//   } catch (error) {
//     if (error instanceof Error) {
//       if (error.statusCode === 400) {
//         return httpResponses.badRequest(new Error(error.message))(PATH)
//       } else if (error.statusCode === 409) {
//         return httpResponses.conflict(new Error(error.message))(PATH)
//       } else if (error.statusCode === 404) {
//         return httpResponses.notFound(new Error(error.message))(PATH)
//       } else {
//         return httpResponses.serverError(new Error(error.message))
//       }
//     } else {
//       return httpResponses.serverError(new Error(error.message))
//     }
//   }
// }

// export const handler = middyAdapter(controller, eventSchema)
