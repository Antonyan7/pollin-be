import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export function timeToSendReminder(lastIntakeReminderSentOn: Date): boolean {
  if (!lastIntakeReminderSentOn) {
    return true
  }

  return (
    dateTimeUtil.getHoursDuration(lastIntakeReminderSentOn, dateTimeUtil.now()) >=
    configService.get<number>('INTAKE_REMINDER_HOURS')
  )
}
