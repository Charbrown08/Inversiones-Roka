import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addCustomErrors from 'ajv-errors'
import addKeywords from 'ajv-keywords'

import { BadRequestError } from '@/utils/errors'

const ajv = new Ajv({ allErrors: true, removeAdditional: true, keywords: true, verbose: true })
addFormats(ajv)
addCustomErrors(ajv)
addKeywords(ajv, 'transform')

const beforeValidator =
  ({ eventSchema, contextSchema }) =>
  async (req) => {
    if (eventSchema) {
      const validateEvent = ajv.compile(eventSchema)
      const isValid = validateEvent(req.event)

      if (!isValid) throw new BadRequestError(validateEvent.errors[0].message)
    }

    if (contextSchema) {
      const validateContext = ajv.compile(contextSchema)
      const isValid = validateContext(req.context)

      if (!isValid) throw new BadRequestError(validateContext.errors[0].message)
    }
  }

const validatorMiddleware = (schemas) => ({
  before: beforeValidator(schemas)
})

export default validatorMiddleware
