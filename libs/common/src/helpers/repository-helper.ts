import {NestprojectConfigService, DateTimeUtil} from '@libs/common'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
/**
 * for Day(timeColumnName), Month(timeColumnName), Year, Date we should set TZ into mySql
 * otherwise it will cut data after 7 pm EST (00 UTC)
 */
export const convertTimeColumnToTimezone = (timeColumnName: string): string => {
  return `CONVERT_TZ(${timeColumnName}, "+00:00" ,"${dateTimeUtil.getTimeZoneOffset()}")`
}

export const sqlSeparator = '|~|~|'
export const sqlSeparatorForStimSheet = '<--*--~'
