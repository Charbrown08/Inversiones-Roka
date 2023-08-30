import { Unauthorized } from '@/utils/errors'

const beforeHandler = (groups) => async (req) => {
  const userGroups =
    req.event.requestContext?.authorizer?.claims['cognito:groups']?.split(',') || []

  if (!groups.some((group) => userGroups.includes(group))) {
    throw new Unauthorized('You are not authorized to access this resource')
  }
}

const middleware = (...groups) => ({
  before: beforeHandler(groups)
})

export default middleware
