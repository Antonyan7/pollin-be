import {X2jOptions, XMLParser} from 'fast-xml-parser'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {parseError} from '@libs/services-common/helpers/error-handling'

export async function parseXML(data: string | Buffer, options: X2jOptions = {}): Promise<string> {
  const xmlParser = new XMLParser(options)
  try {
    const content = await xmlParser.parse(data)

    return content
  } catch (error) {
    StructuredLogger.error(
      activityLogs.XMLParserFunctions.ParseXML,
      activityLogs.XMLParserActions.ParseXMLFailed,
      {message: 'XML parse failed', ...parseError(error)},
    )
    return null
  }
}

export async function parseLifeLabsXML(data: string | Buffer): Promise<string[]> {
  try {
    // this tag wraps hl7 message
    const cdataPropName = 'content'
    const content = await parseXML(data, {cdataPropName})

    const messages = content['HL7Messages']['Message']
    if (Array.isArray(messages)) {
      return messages.map((message) => message[cdataPropName])
    }

    return [messages[cdataPropName]]
  } catch (error) {
    StructuredLogger.error(
      activityLogs.XMLParserFunctions.ParseLifeLabsXML,
      activityLogs.XMLParserActions.ParseLifeLabsXMLFailed,
      {message: 'LifeLabs XML parse failed', ...parseError(error)},
    )
    return null
  }
}
