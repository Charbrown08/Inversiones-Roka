import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'

const generateUserId = async (countryCode) => {
  const alpha2CountryCode = countryCode.substring(0, 2)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ'

  let lastNumericPart = 1
  let lastLetterIndex = 0

  const dynamoDBClient = new DynamoDBClient({ region: 'us-east-1' })

  const getItemCommand = new GetItemCommand({
    TableName: 'Country',
    Key: {
      country_code: { S: countryCode }
    }
  })

  const result = await dynamoDBClient.send(getItemCommand)

  if (result.Item) {
    lastNumericPart = result.Item.lastNumericPart.N ? parseInt(result.Item.lastNumericPart.N) : 1
    lastLetterIndex = result.Item.lastLetterIndex.N ? parseInt(result.Item.lastLetterIndex.N) : 0
  }
  const letter = alphabet[lastLetterIndex]

  const numericPart = lastNumericPart.toString().padStart(5, '0')

  lastNumericPart += 1

  // 99999
  if (lastNumericPart > 99999) {
    lastNumericPart = 1
    lastLetterIndex = (lastLetterIndex + 1) % alphabet.length
  }

  const updateItemCommand = new UpdateItemCommand({
    TableName: 'Country',
    Key: {
      country_code: { S: countryCode }
    },
    UpdateExpression: 'SET lastNumericPart = :n, lastLetterIndex = :l',
    ExpressionAttributeValues: {
      ':n': { N: lastNumericPart.toString() },
      ':l': { N: lastLetterIndex.toString() }
    },
    ReturnValues: 'ALL_NEW'
  })

  await dynamoDBClient.send(updateItemCommand)

  return `${alpha2CountryCode}${letter}${numericPart}`
}

export default generateUserId
