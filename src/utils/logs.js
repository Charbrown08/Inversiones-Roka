import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import dynamoDB from '../database/dynamoDb/dynamoDbLocalConfig'

const saveLog = async ({ client, gId = '0', method, error, data }) => {
  try {
    const now = new Date().toISOString()
    let err = ''

    if (
      typeof method !== 'string' ||
      method === '' ||
      !['PUT', 'POST', 'GET'].includes(method.toUpperCase())
    ) {
      err = 'method is not valid'
    }
    if (typeof error !== 'boolean') err = 'value of error is not valid'
    // This regular expression is flagged as a vulnerability in SonarQube, but it doesn't actually pose a significant risk
    if (typeof gId !== 'string' && gId.length === 8 && !gId.match('^[A-Z]{3}\\d{5}$')) {
      err = 'globalId is not valid'
    }
    if (err === '') {
      const newdata = JSON.stringify(data).slice(0, 650)
      const log = {
        globalId: { S: gId },
        method: { S: method.toUpperCase() },
        error: { BOOL: error },
        data: { S: newdata }
      }
      const params = {
        TableName: 'Audit',
        Item: {
          clientId: { S: client },
          create: { S: now },
          info: { M: log }
        }
      }

      const command = new PutItemCommand(params)
      const { $metadata } = await dynamoDB.send(command)

      return $metadata.httpStatusCode === 200
    }
  } catch (e) {}
  return false
}

export default saveLog
