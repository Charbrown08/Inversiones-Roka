import middyAdapter from '@/adapters/middy'
import httpResponses from '../utils/httpResponses'
import { searchByDNI, searchByIdERP, searchByUserId } from '../database/dynamoDb/searchUserGlobalID'
import { KEYS } from '../constants/keys'
import { searchExistingUserDniCountry } from '../database/dynamoDb/dniCountryExistUser'
import { searchExistingUserIdErpCountry } from '../database/dynamoDb/idErpCountryExistUser'

const eventSchema = {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        [KEYS.GLOBAL_USER_ID]: {
          type: 'string',
          minLength: 1,
          maxLength: 8,
          transform: ['trim', 'toUpperCase'],
          pattern: '^[a-zA-Z0-9]+$'
        },
        [KEYS.IDENTITY]: {
          type: 'string',
          minLength: 1,
          maxLength: 35,
          pattern: '^[a-zA-Z0-9-_]+$'
        },
        [KEYS.ID_ERP]: {
          type: 'string',
          minLength: 1,
          maxLength: 35,
          transform: ['trim', 'toLowerCase'],
          pattern: '^[a-zA-Z0-9-_]+$'
        },
        [KEYS.COUNTRY]: {
          type: 'string',
          minLength: 1,
          maxLength: 2,
          transform: ['trim', 'toUpperCase'],
          pattern: '^[a-zA-Z]+$'
        }
      },
      oneOf: [
        { $ref: '#/definitions/' + KEYS.GLOBAL_USER_ID },
        { $ref: '#/definitions/' + KEYS.IDENTITY },
        { $ref: '#/definitions/' + KEYS.ID_ERP }
      ]
    }
  },
  definitions: {
    [KEYS.GLOBAL_USER_ID]: {
      type: 'object',
      required: [KEYS.GLOBAL_USER_ID]
    },
    [KEYS.IDENTITY]: {
      type: 'object',
      required: [KEYS.IDENTITY]
    },
    [KEYS.ID_ERP]: {
      type: 'object',
      required: [KEYS.ID_ERP]
    }
  }
}

const controller = async (event) => {
  const PATH = event.path
  const { queryStringParameters } = event
  try {
    let user
    let errorMessage
    if (queryStringParameters[KEYS.GLOBAL_USER_ID]) {
      const globalUserId = queryStringParameters[KEYS.GLOBAL_USER_ID]
      user = await searchByUserId(globalUserId)
      errorMessage = `user ${globalUserId} not found.`
    } else if (queryStringParameters[KEYS.IDENTITY]) {
      const dni = queryStringParameters[KEYS.IDENTITY]
      user = await searchByDNI(dni)
      errorMessage = `user ${dni} not found.`
      if (queryStringParameters[KEYS.COUNTRY]) {
        const country = queryStringParameters[KEYS.COUNTRY]
        user = await searchExistingUserDniCountry(dni, country)
        errorMessage = `user wit dni  ${dni} not found in this country`
      }
    } else if (queryStringParameters[KEYS.ID_ERP]) {
      const idErp = queryStringParameters[KEYS.ID_ERP]
      if (idErp === '0') {
        errorMessage = `user ${idErp} not found.`
      } else {
        user = await searchByIdERP(idErp)
        errorMessage = `user ${idErp} not found.`
        if (queryStringParameters[KEYS.COUNTRY]) {
          const country = queryStringParameters[KEYS.COUNTRY]
          user = await searchExistingUserIdErpCountry(idErp, country)
          errorMessage = `user wit id_erp  ${idErp} not found in this country`
        }
      }
    } else {
      return httpResponses.badRequest(new Error('Required parameters to search are not found'))(
        PATH
      )
    }
    if (!user) {
      return httpResponses.notFound(new Error(errorMessage))(PATH)
    }
    return httpResponses.ok(user)
  } catch (error) {
    if (error instanceof Error) {
      return httpResponses.conflict(new Error(error.message))(PATH)
    } else {
      return httpResponses.serverError()
    }
  }
}

export const handler = middyAdapter(controller, eventSchema)
