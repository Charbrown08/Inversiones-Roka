const type = (type) => (key) => `The ${key} must be of type ${type}`
const typeString = type('string')
const typeNumber = type('number')
const typeObject = type('object')
const typeArray = type('array')
const minLength = (length) => (key) => `The ${key} must NOT be less than ${length} characters`
const maxLength = (length) => (key) => `The ${key} must NOT have more than ${length} characters`
const required = (key) => `The ${key} must be provided`
const empty = (key) => `The ${key} must NOT be empty`
const emptyList = (key) => `The ${key} list must NOT be empty`
const maxItems = (length) => (key) => `The ${key} list must NOT have more than ${length} items`
const uniqueItems = (key) => `The ${key} list must NOT have duplicate items`

export default {
  type,
  typeString,
  typeNumber,
  typeObject,
  typeArray,
  minLength,
  maxLength,
  required,
  empty,
  emptyList,
  maxItems,
  uniqueItems
}
