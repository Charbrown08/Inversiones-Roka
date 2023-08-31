import middyAdapter from '@/adapters/middy'
import httpResponses from '../utils/httpResponses'
import { CLIENT } from '../constant/modelClient'
import saveClientDb from '../database/DbCreateUser'

const eventSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      additionalProperties: false,
      required: [
        CLIENT.NAME,
        CLIENT.LAST_NAME,
        CLIENT.IDENTITY,
        CLIENT.PHONE_NUMBER,
        CLIENT.COMPANY_WORK,
        // CLIENT.LOAN_DATE,
        CLIENT.INTEREST_RATE,
        CLIENT.AMOUNT_LOANED
        // CLIENT.LOCATION,
        // CLIENT.CITY,
        // CLIENT.NAME_REFERENCE,
        // CLIENT.LOCATION_REFERENCE,
        // CLIENT.PHONE_NUMBER_REFERENCE
      ],
      properties: {
        [CLIENT.NAME]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-ZñÑ ]+$'
        },
        [CLIENT.LAST_NAME]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-ZñÑ ]+$'
        },
        [CLIENT.IDENTITY]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 15,
          pattern: '^[0-9]+$'
        },
        [CLIENT.COUNTRY]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-Z]+$'
        },
        [CLIENT.DEPARTMENT]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-Z]+$'
        },
        [CLIENT.CITY]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-Z]+$'
        },
        [CLIENT.LOCATION]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 100,
          pattern: '^[a-zA-Z]+$'
        },
        [CLIENT.PHONE_NUMBER]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 10,
          pattern: '^[0-9]+$'
        },
        [CLIENT.COMPANY_WORK]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 35,
          pattern: '^[a-zA-Z0-9]+$'
        },
        [CLIENT.ESTRATUM]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 2,
          pattern: '^[0-9]+$'
        },

        [CLIENT.AMOUNT_LOANED]: {
          type: 'string',
          minLength: 1,
          maxLength: 12,
          transform: ['trim', 'toUpperCase'],
          pattern: '^[0-9]+$'
        },
        [CLIENT.INTEREST_RATE]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 2,
          pattern: '^[0-9]+$'
        },
        [CLIENT.LOAN_DATE]: {
          type: 'string',
          format: 'date',
          minLength: 1,
          maxLength: 24
        },
        [CLIENT.PAYMENT]: {
          type: 'string',
          minLength: 1,
          maxLength: 12,
          transform: ['trim', 'toUpperCase'],
          pattern: '^[0-9]+$'
        },
        [CLIENT.PAYMENT_DATE]: {
          type: 'string',
          format: 'date',
          minLength: 1,
          maxLength: 24
        },
        [CLIENT.TOTAL_DEBT]: {
          type: 'string',
          minLength: 1,
          maxLength: 12,
          transform: ['trim', 'toUpperCase'],
          pattern: '^[0-9]+$'
        },
        [CLIENT.EMAIL]: {
          type: 'string',
          format: 'email',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 100
        },
        [CLIENT.NAME_REFERENCE]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-ZñÑ ]+$'
        },
        [CLIENT.LASTNAME_REFERENCE]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 50,
          pattern: '^[a-zA-ZñÑ ]+$'
        },
        [CLIENT.LOCATION_REFERENCE]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 100,
          pattern: '^[a-zA-Z]+$'
        },
        [CLIENT.PHONE_NUMBER_REFERENCE]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 10,
          pattern: '^[0-9]+$'
        },
        [CLIENT.STATUS_CLIENT]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          enum: ['LOW', 'ACTIVE', 'SLOW'],
          minLength: 1,
          maxLength: 10,
          pattern: '^[a-zA-Z]+$'
        },
        [CLIENT.DATE_ENTRY_API]: {
          type: 'string',
          format: 'date',
          minLength: 1,
          maxLength: 24
        },
        [CLIENT.DATE_DEPARTURE]: {
          type: 'string',
          format: 'date',
          minLength: 1,
          maxLength: 24
        },
        [CLIENT.DATE_LAST_REACTIVATION]: {
          type: 'string',
          format: 'date',
          minLength: 1,
          maxLength: 24
        },
        [CLIENT.DATE_LAST_UPDATE]: {
          type: 'string',
          format: 'date',
          minLength: 1,
          maxLength: 24
        },
        [CLIENT.ARREARS]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 10,
          pattern: '^[0-9]+$'
        },
        [CLIENT.PAY_DATE]: {
          type: 'string',
          minLength: 1,
          maxLength: 12,
          transform: ['trim', 'toUpperCase'],
          pattern: '^[0-9]+$'
        },
        [CLIENT.INTEREST_FEE]: {
          type: 'string',
          minLength: 1,
          maxLength: 12,
          transform: ['trim', 'toUpperCase'],
          pattern: '^[0-9]+$'
        },
        [CLIENT.MONTHS_PAY]: {
          type: 'string',
          transform: ['trim', 'toUpperCase'],
          minLength: 1,
          maxLength: 10,
          pattern: '^[0-9]+$'
        }
      }
    }
  }
}

const controller = async (event) => {
  const PATH = event.path
  const { body } = event

  try {
    const result = await saveClientDb(body)
    return httpResponses.created(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.statusCode === 400) {
        return httpResponses.badRequest(new Error(error.message))(PATH)
      } else if (error.statusCode === 409) {
        return httpResponses.conflict(new Error(error.message))(PATH)
      } else if (error.statusCode === 404) {
        return httpResponses.notFound(new Error(error.message))(PATH)
      } else {
        return httpResponses.serverError(new Error(error.message))
      }
    } else {
      console.log('ERROR MENSAJE ', error)
      console.log('ERROR MENSAJE COMPLETO ', error.message)
      return httpResponses.serverError(new Error(error.message))
    }
  }
}

export const handler = middyAdapter(controller, eventSchema)
