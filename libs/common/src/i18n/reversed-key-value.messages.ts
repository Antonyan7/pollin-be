import * as i18Messages from './en/message.json'
const iMessages: {[value: string]: string} = i18Messages

export const reversedKeyValueMessages: {[value: string]: string} = {}
Object.keys(iMessages).forEach((key: string) => {
  const reverseKey = `${iMessages[key]}`
  reversedKeyValueMessages[reverseKey] = key
})
