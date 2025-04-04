/* eslint date/no-new-date-without-args: 0 */
/* eslint date/no-new-date-with-args: 0 */
/* eslint-disable max-lines */
// eslint-disable-next-line no-restricted-imports
import {ConfigService} from '@nestjs/config'
import {NestprojectConfigService} from '@libs/common'

import {Timestamp} from 'firebase-admin/firestore'
import * as dateFns from 'date-fns'
import * as dateFnsTimezone from 'date-fns-tz'
import {DefaultValue, TimeFormat} from '@libs/common/enums'

export const iso8601RFC3339 = `yyyy-MM-dd'T'HH:mm:ssXXX`
export const timeFormatRFC3339 = 'HH:mm:ssXXX'

export enum DateFormat {
  YYYYMMddHHmmss = 'yyyyMMddHHmmss', // 20241225150409
  YYYYMMdd = 'yyyyMMdd', // 20241225
  MMMdyyyy = 'MMM d, yyyy', // Jan 3, 2024
  MMMddyyyy = 'MMM dd, yyyy', // Jan 03, 2024
  MMMMdyyyy = 'MMMM d, yyyy', // January 03, 2024
  MMMddyyyyWithTime = 'MMM dd, yyyy @ HH:mm', // Jan 03, 2024 @ 15:04
  EEEEMMMMdoWithTime12 = 'EEEE, MMMM do @ h:mm aa', // e.g. Thursday, December 19th at 2:00 PM
}

export class DateTimeUtil {
  private timeZone: string
  private configService: NestprojectConfigService
  private timeZoneOffsetAbbreviation: string

  constructor(timeZone?: string) {
    this.configService = new NestprojectConfigService(new ConfigService())
    this.timeZone = timeZone ?? this.configService.get<string>('DEFAULT_TIME_ZONE')
    this.timeZoneOffsetAbbreviation = this.configService.get<string>('TIMEZONE_OFFSET_ABBREVIATION')
  }

  parseISO(date: string): Date {
    return dateFns.parseISO(date)
  }

  parse(date: string, format: string): Date {
    return dateFns.parse(date, format, new Date())
  }

  /** 2 Sep 11:55:00 ->  2 Sep 11:00:00 */
  startOfHour(date: Date): Date {
    return dateFns.startOfHour(date)
  }

  startOfMonth(date: Date): Date {
    return dateFns.startOfMonth(date)
  }

  addHours(date: Date, hours: number): Date {
    return dateFns.addHours(date, hours)
  }

  addDays(date: Date, days: number): Date {
    return dateFns.addDays(date, days)
  }

  addYear(date: Date, years: number): Date {
    return dateFns.addYears(date, years)
  }

  addMonths(date: Date, months: number): Date {
    return dateFns.addMonths(date, months)
  }

  subHours(date: Date, hours: number): Date {
    return dateFns.subHours(date, hours)
  }

  subDays(date: Date, days: number): Date {
    return dateFns.subDays(date, days)
  }

  subMonths(date: Date, months: number): Date {
    return dateFns.subMonths(date, months)
  }

  subWeeks(date: Date, weeks: number): Date {
    return dateFns.subWeeks(date, weeks)
  }

  subYears(date: Date, years: number): Date {
    return dateFns.subYears(date, years)
  }

  addMinutes(date: Date, minutes: number): Date {
    return dateFns.addMinutes(date, minutes)
  }

  addSeconds(date: Date, seconds: number): Date {
    return dateFns.addSeconds(date, seconds)
  }

  subtractMinutes(date: Date, minutes: number): Date {
    return dateFns.subMinutes(date, minutes)
  }

  setHours(date: Date, hours: number): Date {
    return dateFns.setHours(date, hours)
  }

  setDay(date: Date, day: number): Date {
    return dateFns.setDay(date, day)
  }

  setMonth(date: Date, month: number): Date {
    return dateFns.setMonth(date, month)
  }

  getTimezoneAbbreviation(): string {
    return this.timeZoneOffsetAbbreviation
  }

  extractInDigitsTimeZoneOffset(time: string | Date, timezone: string): string {
    return dateFnsTimezone.formatInTimeZone(time, timezone, 'xxx')
  }

  /** eq.: -05:00 */
  getTimeZoneOffset(): string {
    return this.extractInDigitsTimeZoneOffset(this.now(), this.timeZone)
  }

  getTimezoneOffsetMin(): number {
    return dateFnsTimezone.getTimezoneOffset(this.timeZone) / 1000 / 60
  }

  eachDayOfInterval(interval: dateFns.Interval, step = 1): Date[] {
    return dateFns.eachDayOfInterval(interval, {step})
  }

  eachMinuteOfInterval(interval: dateFns.Interval, step = 1): Date[] {
    return dateFns.eachMinuteOfInterval(interval, {step})
  }

  eachWeekOfInterval(interval: dateFns.Interval): Date[] {
    return dateFns.eachWeekOfInterval(interval)
  }

  getHoursDuration(startTime: Date, endTime: Date): number {
    return dateFns.differenceInHours(endTime, startTime)
  }

  getMinutesDuration(startTime: Date, endTime: Date): number {
    return dateFns.differenceInMinutes(endTime, startTime)
  }

  differenceInMinutes(endTime: Date, startTime: Date): number {
    return dateFns.differenceInMinutes(endTime, startTime)
  }

  getHoursToMinutes(hours: number): number {
    return dateFns.hoursToMinutes(hours)
  }

  getDay(date?: Date): number {
    return Number(dateFns.format(date ?? this.now(), 'd'))
  }

  getMonth(date?: Date): number {
    return Number(dateFns.format(date ?? this.now(), 'MM'))
  }

  monthsInYear: string[] = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]

  /**
   * for 'January" will return 1
   */
  getMonthNumberFromMonthName(monthName: string): number {
    if (!monthName) {
      return null
    }

    if (!this.monthsInYear.includes(monthName.toLowerCase())) {
      return null
    }

    return dateFns.getMonth(new Date(`${monthName} 1`)) + 1
  }

  getMonthShort(date?: Date): string {
    return dateFns.format(date ?? this.now(), 'LLL')
  }

  getCurrentMonthAndDayString(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleString('default', {month: 'short'}) + this.getDay(date)
  }

  getYear(date?: Date): number {
    return Number(dateFns.format(date ?? this.now(), 'y'))
  }

  getDayOfYear(date: Date): number {
    return dateFns.getDayOfYear(date)
  }

  getWeekDay(date: string): number {
    return new Date(date).getDay()
  }

  differenceInDays(date: Date, toDate: Date): number {
    return dateFns.differenceInDays(date, toDate)
  }

  /**
   * be carefully - it will return 2 march for 32 february
   */
  getDateFromYMD({year, month, day}: {year: number; month: number; day: number}): Date {
    return dateFnsTimezone.zonedTimeToUtc(
      dateFns.set(this.now(), {
        year,
        month: month - 1, // month is 0-based
        date: day,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      'UTC',
    )
  }

  getDateFromYMDWithTz({year, month, day}: {year: number; month: number; day: number}): Date {
    return dateFnsTimezone.zonedTimeToUtc(
      dateFns.set(this.now(), {
        year,
        month: month - 1, // month is 0-based
        date: day,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      this.timeZone,
    )
  }

  /** return yyyy-MM-dd without time */
  formatIsoDate(date?: Date): string {
    return dateFns.format(date ?? this.now(), 'yyyy-MM-dd')
  }

  formatTzDate(date: Date): string {
    return dateFns.format(this.UTCToTz(this.toDate(date)), 'yyyy-MM-dd')
  }

  isEqual(date: Date, dateToCompare: Date): boolean {
    return dateFns.isEqual(date, dateToCompare)
  }

  /** Is the first date after the second one?  (date > dateToCompare) */
  isAfter(date: Date, dateToCompare: Date): boolean {
    return dateFns.isAfter(date, dateToCompare)
  }

  /** Is the first date after the second one?  (date >= dateToCompare) */
  isAfterOrEqual(date: Date, dateToCompare: Date): boolean {
    return this.isAfter(date, dateToCompare) || this.isEqual(date, dateToCompare)
  }

  /** Is the first date before the second one? (date < dateToCompare) */
  isBefore(date: Date, dateToCompare: Date): boolean {
    return dateFns.isBefore(date, dateToCompare)
  }

  /** Is the first date before the second one? (date <= dateToCompare) */
  isBeforeOrEqual(date: Date, dateToCompare: Date): boolean {
    return this.isBefore(date, dateToCompare) || this.isEqual(date, dateToCompare)
  }

  now(): Date {
    return new Date()
  }

  isInPastOrEqual(date: Date): boolean {
    return this.isBeforeOrEqual(date, this.now())
  }

  isInPastStr(date: string): boolean {
    return this.isBefore(this.toDate(date), this.now())
  }

  isInPast(date: Date): boolean {
    return this.isBefore(date, this.now())
  }

  isInFuture(date: Date): boolean {
    return this.isAfter(date, this.now())
  }

  // eslint-disable-next-line max-params
  customDate(
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number,
  ): Date {
    return new Date(year, month, day, hours, minutes, seconds)
  }

  toDate(arg: string | Date | number): Date {
    return new Date(arg)
  }

  toDateOrNull(arg: string | Date): Date | null {
    const date = arg ? new Date(arg) : null
    return dateFns.isValid(date) ? date : null
  }

  getAppointmentTimeDifference(startDate: Date, endDate: Date): number {
    return dateFns.differenceInMinutes(endDate, startDate)
  }

  subtractMilliseconds(date: Date, arg: number): Date {
    return dateFns.subMilliseconds(date, arg)
  }

  subtractDays(date: Date, arg: number): Date {
    return dateFns.subDays(date, arg)
  }

  subtractMillisecondsFromNow(arg: number): Date {
    return dateFns.subMilliseconds(this.now(), arg)
  }

  subtractDaysFromNow(arg: number): Date {
    return dateFns.subDays(this.now(), arg)
  }

  nowInISOString(): string {
    return this.now().toISOString()
  }

  toISOString(date: Date): string {
    return date.toISOString()
  }

  toISOStringFromString(date: Date): string {
    return this.toDate(date).toISOString()
  }

  getYearDifference(date: Date, dateToCompare: Date): number {
    return dateFns.differenceInYears(date, dateToCompare)
  }

  // Return patient age old in years.: eq: 30
  getAgeInYears(dateOfBirth: Date | string): number {
    return this.getYearDifference(this.now(), this.toDate(dateOfBirth))
  }

  getFirestoreTimeStampNowDate(): Timestamp {
    return Timestamp.fromDate(this.now())
  }

  getFirestoreTimeStampFromDate(date: Date): Timestamp {
    return Timestamp.fromDate(date)
  }

  getFirestoreTimeStampFromNumber(dateNumber: number): Timestamp {
    return Timestamp.fromDate(new Date(dateNumber))
  }

  firestoreTimeStampToDate(seconds: number, nanoseconds = 0): Date {
    return new Timestamp(seconds, nanoseconds).toDate()
  }

  timeStampToDate(timestamp: Timestamp): Date {
    return this.toDate(timestamp.valueOf())
  }

  nowToDate(second: number): number {
    return Math.round(this.now().getTime() / second)
  }

  extractTime(time: string | Date): string {
    return dateFnsTimezone.format(
      dateFnsTimezone.utcToZonedTime(new Date(time), this.timeZone),
      `HH:mm:ss`,
      {
        timeZone: this.timeZone,
      },
    )
  }

  extractTimeForUTF(date: string): string {
    return dateFnsTimezone.format(this.toDate(date), `HH:mm:ss`)
  }

  /** return eq.: 09:00 */
  extractTzTime(date: Date): string {
    return dateFns.format(this.UTCToTz(date), 'HH:mm')
  }

  extractTimeForUTC(date: string | Date): string {
    return dateFnsTimezone.format(this.toDate(date), 'HH:mm:ss')
  }

  /** return eq.: 09:00:00 */
  extractTzTimeWithSecond(date: Date): string {
    return dateFns.format(this.UTCToTz(date), 'HH:mm:ss')
  }

  extractTimeUTC(time: Date): string {
    return time.toLocaleTimeString('en', {hour12: false, timeZone: 'UTC'})
  }

  formatDateWithCurrentTime(date: string): string {
    const currentTime = dateFns.format(new Date(), `'T'HH:mm:ss'Z'`)
    return date + currentTime
  }

  formatTimeToISO(time: string): string {
    return dateFnsTimezone.format(
      dateFns.parseISO(`${this.formatIsoDate()}T`.concat(time)),
      `yyyy-MM-dd'T'kk:mm:ss'Z'`,
    )
  }

  formatTimeToISONoZoned(time: string): string {
    return dateFns.format(
      dateFns.parseISO(`${this.formatIsoDate()}T`.concat(time)),
      `yyyy-MM-dd'T'kk:mm:ss`,
    )
  }

  /**
   * Accepts date ISO string in UTC timezone and converts in TZ and formats in ISO 8601 RFC3339
   * @param date in UTC
   * @returns string formatted in ISO 8601 RFC3339
   */
  formatUTCStringInRFC3339Tz(time: string): string {
    return dateFnsTimezone.format(
      dateFnsTimezone.utcToZonedTime(dateFns.parseISO(time), this.timeZone),
      iso8601RFC3339,
      {timeZone: this.timeZone},
    )
  }

  /**
   * Accepts date object in UTC timezone and converts in TZ and formats in ISO 8601 RFC3339
   * return eq.: 2023-08-05T14:44:00-04:00
   *
   * Most common to return full dateTime for clinic portal without formatting. Adn FE formats it
   */
  formatUTCDateInRFC3339Tz(date: Date): string {
    if (!date) {
      return null
    }

    return dateFnsTimezone.format(
      dateFnsTimezone.utcToZonedTime(date, this.timeZone),
      iso8601RFC3339,
      {timeZone: this.timeZone},
    )
  }

  /**
   * Accepts date object in UTC timezone and converts in TZ and formats in ISO 8601 RFC3339 Date Time
   * return eq.: 14:44:00-04:00
   */
  formatUTCDateInRFC3339TzTime(date: Date): string {
    if (!date) {
      return null
    }

    return dateFnsTimezone.format(
      dateFnsTimezone.utcToZonedTime(date, this.timeZone),
      timeFormatRFC3339,
    )
  }

  getClinicTimeFormattedInDate(time: string): Date {
    return this.toDate(
      this.formatTimeToISONoZoned(time).concat(
        this.extractInDigitsTimeZoneOffset(this.getTimeAmericaToronto(time), this.timeZone),
      ),
    )
  }

  public getTimeAmericaToronto(time: string): Date {
    return this.toDate(this.formatUTCStringInRFC3339Tz(this.formatTimeToISO(time)))
  }

  extractSlotTime(time: Date, timezone?: string): string {
    // timezone is with parameter because can be different per clinic
    return dateFns.format(
      timezone ? dateFnsTimezone.utcToZonedTime(time, timezone) : time,
      `h:mmaa`,
    )
  }

  extractSlotTimeWithTimeFormat(time: Date, timeFormat: TimeFormat, timezone?: string): string {
    const format = timeFormat === TimeFormat.H24 ? 'HH:mm' : 'h:mmaa'
    return dateFns.format(timezone ? dateFnsTimezone.utcToZonedTime(time, timezone) : time, format)
  }

  /** 11:30 PM */
  formatTimePMWithSpaceOr24H(time: Date, timeFormat: TimeFormat): string {
    const format = timeFormat === TimeFormat.H24 ? 'HH:mm' : 'h:mm aa'
    return dateFns.format(time, format)
  }

  formatTimePMWithSpace(date: Date): string {
    return dateFns.format(this.UTCToTz(date), 'h:mm aa')
  }

  /** eg.: 12:15pm with Toronto timeZone*/
  formatTimeAmPm(date: Date): string {
    return this.replaceBigTimeAmPmToSmall(
      dateFns.format(dateFnsTimezone.utcToZonedTime(date, this.timeZone), `h:mmaa`),
    )
  }

  formatTimeUtzcToZoned24H(date: Date): string {
    return dateFns.format(dateFnsTimezone.utcToZonedTime(date, this.timeZone), `HH:mm`)
  }

  /** 1:12PM  ->  1:12pm */
  replaceBigTimeAmPmToSmall(alreadyFormattedTime: string): string {
    return alreadyFormattedTime.replace('AM', 'am').replace('PM', 'pm')
  }

  /**
   * Extracts string date
   * @returns date with format MMM dd, yyyy. eq.: Jan 24, 2024
   */
  extractDateTz(date: Date, timezone?: string): string {
    if (!date) {
      return null
    }

    if (!this.isValidDate(date)) {
      date = this.parseISO(date.toString())
    }

    return dateFns.format(
      timezone ? dateFnsTimezone.utcToZonedTime(date, timezone) : date,
      'MMM dd, yyyy',
    )
  }

  tzTimeToUTC(date: Date | string): Date {
    return dateFnsTimezone.zonedTimeToUtc(date, this.timeZone)
  }

  getUTCTimeFromString(date: string): Date {
    return this.tzTimeToUTC(this.parseISO(date))
  }

  //Use this functions When minus four suffix example 2022-10-25T16:24:00-04:00
  tzTimeToUTCWithSuffix(date: Date | string): string {
    return dateFnsTimezone.format(dateFnsTimezone.zonedTimeToUtc(date, 'UTC'), iso8601RFC3339, {
      timeZone: this.timeZone,
    })
  }

  UTCToTz(date: Date | string | number): Date {
    return dateFnsTimezone.utcToZonedTime(date, this.timeZone)
  }

  startOfDay(date: Date): Date {
    return dateFns.startOfDay(date)
  }

  endOfDay(date: Date): Date {
    return dateFns.endOfDay(date)
  }

  /**
   * Format date in ISO 8601.
   * Desn't work with string like: "2023-01-01", first need to convert into date by dateTimeUtil.toDate()
   */
  formatDateYMD(date: Date): string {
    return dateFns.format(date, 'yyyy-MM-dd')
  }

  formatDateYMDTime(date: Date): string {
    return dateFns.format(dateFnsTimezone.utcToZonedTime(date, this.timeZone), 'yyyy-MM-dd_HH-mm')
  }

  /**
   * Format date in full ISO 8601, eq.: yyyy-MM-dd'T'HH:mm:ss'Z
   */
  formatInISO(date: Date): string {
    return dateFns.format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'")
  }

  /**
   * Format date in full ISO 8601, eq.: yyyy-MM-dd'T'HH:mm:ss'Z
   */
  formatInISOWithoutTZ(date: Date): string {
    return dateFns.format(date, "yyyy-MM-dd'T'HH:mm:ss")
  }

  formatInRFC3339(date: Date): string {
    return dateFns.format(date, "yyyy-MM-dd'T'HH:mm:ssXXX")
  }

  /**
   * Get date in month name and day number without zero if day is < 10
   * e.g.: Jan 1
   * @returns month name in shorted variant and day number in format 'MMM d'
   */
  formatMonthAndDay(date: Date): string {
    return dateFns.format(date, 'MMM d')
  }

  /**
   *  Will return 'January'
   */
  formatFullMonth(date: Date): string {
    return dateFns.format(date, 'MMMM')
  }

  /**
   *  Will return '01'
   */
  formatDayNumberWithZero(date: Date): string {
    return dateFns.format(date, 'dd')
  }

  /**
   * returns: Jan 24, 2024
   */
  formatBirthDate(date: Date | string): string {
    if (date) {
      return dateFns.format(this.toDate(date.toString()), 'MMM dd, yyyy')
    }
    return DefaultValue.Dash
  }

  /**
   *  eq.: eq.: January 24, 2024,
   */
  formatBirthDateWithFullMonth(date: Date | string): string {
    if (date) {
      return dateFns.format(this.toDate(date.toString()), 'MMMM dd, yyyy')
    }
  }

  formatByShortMonthAndDay(date: Date | string): string {
    if (date) {
      return dateFns.format(this.toDate(date.toString()), 'MMM dd')
    }
  }

  /**
   * Format date into: yyyy-m-dd hh:mm:ss
   */
  formatToMySql(date: Date): string {
    return dateFns.format(date, 'yyyy-MM-dd HH:mm:ss')
  }

  formatToTemplateEmail(date: Date): string {
    return dateFns.format(
      dateFnsTimezone.utcToZonedTime(date, this.timeZone),
      'MMMM dd, yyyy @ hh:mm aa',
    )
  }

  formatToAppointmentBookedOn(date: Date): string {
    return dateFns.format(dateFnsTimezone.utcToZonedTime(date, this.timeZone), 'MMM d, yyyy @hh:mm')
  }

  formatToDateTime(date: Date): string {
    return dateFns.format(dateFnsTimezone.utcToZonedTime(date, this.timeZone), 'MMM d, yyyy hh:mm')
  }

  formatToDateTimeWithoutTZ(date: Date): string {
    return dateFns.format(date, 'MMM d, yyyy hh:mm')
  }

  /**
   * into: 2023/03/03
   */
  formatYMDWithSlashes(date: Date): string {
    return dateFns.format(date, 'yyyy/MM/dd')
  }

  formatToTime(date: Date): string {
    return dateFns.format(dateFnsTimezone.utcToZonedTime(date, this.timeZone), 'HH:mm:ss')
  }

  formatToTimeWithoutTZ(date: Date): string {
    return dateFns.format(date, 'HH:mm:ss')
  }

  formatToAppointmentSms(date: Date): string {
    // e.g. Thursday, December 19th at 2:00 PM
    return dateFns.format(
      dateFnsTimezone.utcToZonedTime(date, this.timeZone),
      'EEEE, MMMM do @ h:mm aa',
    )
  }

  removeTime(date: Date): Date {
    return new Date(date.toDateString())
  }

  /** For default TimeZone */
  /**
   * 08 Feb 15:00 for UTC -> returns 08 Feb 05:00.
   * 09 Feb 01:00 for UTC -> returns 08 Feb 05:00.
   */
  todayWithZeroTimeTZ(): Date {
    //convert to TZ to have today when time is after 7 pm EST
    // 9 Feb 01:00 UTC -> 8 Feb 20:00 EST

    //eq.: now = 09 Feb 01:00  for UTC
    const nowTz = this.UTCToTz(this.now()) // -> 08 Feb 20:00
    const todayZeroTimeTz = this.removeTime(nowTz) // -> 08 Feb 00:00
    const todayZeroTimeTzInUtc = this.tzTimeToUTC(todayZeroTimeTz) // -> 08 Feb 05:00 (for UTC it equals to 08 Feb 00:00 EST)
    return todayZeroTimeTzInUtc

    // above eq.: EST = -05:00  (could be -04:00 in summer )
  }

  isValidDate(date: Date): boolean {
    if (!date) {
      return false
    }
    if (!(date instanceof Date)) {
      return false
    }
    if (date.toString() == 'Invalid Date') {
      return false
    }

    return true
  }

  /**
   * checking does  days exist for month.
   * eq.: 31 of January not exist
   */
  isValidDateByYMD({year, month, day}: {year: number; month: number; day: number}): boolean {
    const parsedDate = this.parse(`${year}-${month}-${day}`, 'yyyy-MM-dd')
    if (parsedDate.toString() == 'Invalid Date') {
      // for 31 of January
      return false
    }

    return true
  }

  getDaysFromNow(date: Date): number {
    return dateFns.differenceInDays(this.now(), date)
  }

  getDateByGivenDateAndHours(data: {
    date: string
    hours?: number
    minutes?: number
    milliseconds?: number
  }): Date {
    return dateFns.set(this.toDate(data.date), {
      hours: data.hours ?? 0,
      minutes: data.minutes ?? 0,
      milliseconds: data.milliseconds ?? 0,
    })
  }

  setDateByGivenDateAndHours(
    date: Date,
    data: {
      hours?: number
      minutes?: number
      seconds?: number
    },
  ): Date {
    return dateFns.set(this.toDate(date), {
      hours: data.hours ?? 0,
      minutes: data.minutes ?? 0,
      seconds: data.seconds ?? 0,
    })
  }

  setDate(date: Date, hour: number): Date {
    return dateFns.set(date, {
      hours: hour,
    })
  }

  /** Eg.:
   * Today at 3:30pm EST;
   * Yesterday at 3:30pm EST;
   * Tomorrow at 3:30pm EST;
   * Tuesday at 3:30pm EST;
   * May 20, 2021 at 3:30pm EST;
   *
   * Possible day names:
   * 1: Today, Yesterday, Tomorrow;
   * 2. Day of week eg.: Monday, Tuesday (if it was less than 1 week ago);
   * 3. otherwise full date: May 20, 2021 at 3:30pm EST;
   */
  formatToRelativeWithDays(data: {date: Date; timeFormat?: TimeFormat; atSymbol?: string}): string {
    const {date, timeFormat = TimeFormat.H12, atSymbol = 'at'} = data
    const time =
      timeFormat === TimeFormat.H24
        ? this.formatTimeUtzcToZoned24H(date)
        : this.formatTimeAmPm(date)

    const isBeforeTomorrowNoon = this.isBeforeOrEqual(
      date,
      this.addDays(this.todayWithZeroTimeTZ(), 2),
    )

    const isAfter6DaysAgo = this.isAfterOrEqual(date, this.addDays(this.todayWithZeroTimeTZ(), -6))

    if (isBeforeTomorrowNoon && isAfter6DaysAgo) {
      const dayName: string = this.getRelativeDayName(date)

      return `${dayName} ${atSymbol} ${time} ${this.timeZoneOffsetAbbreviation}`
    }

    //May 20, 2021 at 3:30pm EST
    return (
      dateFns.format(date, 'MMM d, yyyy') +
      ` ${atSymbol} ${time} ${this.timeZoneOffsetAbbreviation}`
    )
  }

  /**Oct 22, 2023 - 15:31*/
  formatTzTimeWithMMMDate(date: Date): string {
    const tzDate = this.UTCToTz(date)
    return dateFns.format(tzDate, 'MMM dd, yyyy - HH:mm')
  }

  /**Oct 22, 2023 - 08:14 PM*/
  formatTzTimeWithMMMDate12H(date: Date): string {
    const tzDate = this.UTCToTz(date)
    return dateFns.format(tzDate, 'MMM dd, yyyy - hh:mm aa')
  }

  /**Oct 22, 2023*/
  formatTzTimeWithMMMDDYYYY(date: Date | string): string {
    if (!date) {
      return null
    }

    return dateFns.format(this.toDate(date), 'MMM dd, yyyy')
  }

  formatToRelative(data: {date: Date; timeFormat?: TimeFormat; atSymbol?: string}): string {
    const {date, timeFormat = TimeFormat.H12, atSymbol = 'at'} = data
    const time =
      timeFormat === TimeFormat.H24
        ? this.formatTimeUtzcToZoned24H(date)
        : this.formatTimeAmPm(date)
    return (
      dateFns.format(date, 'MMM d, yyyy') +
      ` ${atSymbol} ${time} ${this.timeZoneOffsetAbbreviation}`
    )
  }

  /** eq.: May 20, 2021 at 3:30pm EST */
  formatToZonedDateTime(data: {date: Date; timeFormat?: TimeFormat; atSymbol?: string}): string {
    const {timeFormat = TimeFormat.H12, atSymbol = 'at'} = data
    const date = this.toDate(data.date)
    const time =
      timeFormat === TimeFormat.H24
        ? this.formatTimeUtzcToZoned24H(date)
        : this.formatTimeAmPm(date)

    //May 20, 2021 at 3:30pm EST
    return (
      dateFns.format(date, 'MMM d, yyyy') +
      ` ${atSymbol} ${time} ${this.timeZoneOffsetAbbreviation}`
    )
  }

  formatToZonedDateTimeWithoutYear(data: {date: Date; timeFormat?: TimeFormat}): string {
    const {timeFormat = TimeFormat.H24} = data
    const date = this.toDate(data.date)
    const time =
      timeFormat === TimeFormat.H24
        ? this.formatTimeUtzcToZoned24H(date)
        : this.formatTimeAmPm(date)

    //May 20, 13:30 EST
    return dateFns.format(date, 'MMM d,') + ` ${time} ${this.timeZoneOffsetAbbreviation}`
  }

  formatToZonedDateTimeWithAbbreviation(data: {date: Date; timeFormat?: TimeFormat}): string {
    if (!data.date) {
      return null
    }

    const {timeFormat = TimeFormat.H24} = data
    const date = this.toDate(data.date)
    const time =
      timeFormat === TimeFormat.H24
        ? this.formatTimeUtzcToZoned24H(date)
        : this.formatTimeAmPm(date)

    // May 20, 2023 13:30 [EST]
    return dateFns.format(date, 'MMM d, yyyy') + ` ${time} [${this.timeZoneOffsetAbbreviation}]`
  }

  formatToRelativeWithDateToZoned(date: Date, timeFormat = TimeFormat.H12): string {
    const zonedDate = dateFnsTimezone.utcToZonedTime(date, this.timeZone)
    const time = this.formatTimePMWithSpaceOr24H(zonedDate, timeFormat)
    const dateString = dateFns.format(zonedDate, 'MMM d yyyy')
    const dateStringWithoutYear = dateFns.format(zonedDate, 'MMM d')

    const isBeforeTomorrowNoon = this.isBeforeOrEqual(
      date,
      this.addDays(this.todayWithZeroTimeTZ(), 2),
    )
    const isAfter6DaysAgo = this.isAfterOrEqual(date, this.addDays(this.todayWithZeroTimeTZ(), -6))

    if (isBeforeTomorrowNoon && isAfter6DaysAgo) {
      const dayName: string = this.getRelativeDayName(date)

      // Today, May 20 2021
      // 3:30 PM EST
      return `${dayName}, ${dateString}\n${time} ${this.timeZoneOffsetAbbreviation}`
    }

    //May 20, 2021 @ 3:30 PM EST
    return `${dateStringWithoutYear} @ ${time} ${this.timeZoneOffsetAbbreviation}`
  }

  // May 20, 2021 @ 11:30 [EST]
  // May 20, 2021 @ 11:30 EST
  formatToMonthsDayYearWithTime(date: Date, withBrackets = true): string {
    const tzDate = this.UTCToTz(this.toDate(date))
    const time = this.formatTimeUtzcToZoned24H(date)

    if (!withBrackets) {
      return (
        dateFns.format(tzDate, 'MMM d, yyyy') + ` @ ${time} [${this.timeZoneOffsetAbbreviation}]`
      )
    }

    return dateFns.format(tzDate, 'MMM d, yyyy') + ` @ ${time} ${this.timeZoneOffsetAbbreviation}`
  }

  formatToFullMonthsDayYear(date: Date): string {
    const tzDate = this.UTCToTz(this.toDate(date))
    const time = this.formatTimeAmPm(date)

    return dateFns.format(tzDate, 'MMMM d, yyyy') + `, ${time} [${this.timeZoneOffsetAbbreviation}]`
  }

  //will return date like 7 Jun 2023 3:34 AM
  formatDateToRelativeWithDateToZoned(date: Date, timeFormat = TimeFormat.H12): string {
    const zonedDate = dateFnsTimezone.utcToZonedTime(date, this.timeZone)
    const time = this.formatTimePMWithSpaceOr24H(zonedDate, timeFormat)
    const dateString = dateFns.format(zonedDate, 'd MMM yyyy')

    //May 20, 2021 3:30 PM
    return `${dateString} ${time}`
  }

  /** Today, Yesterday, Tomorrow or day of week   */
  private getRelativeDayName(date: Date): string {
    if (this.isToday(date)) {
      return 'Today'
    }

    if (this.isYesterday(date)) {
      return 'Yesterday'
    }

    if (this.isTomorrow(date)) {
      return 'Tomorrow'
    }

    return dateFns.format(date, 'EEEE') //day of week: Monday ...
  }

  isToday(date: Date): boolean {
    const todayWithZeroTime = this.todayWithZeroTimeTZ()
    const tomorrowZeroTime = this.addDays(todayWithZeroTime, 1)

    return (
      this.isAfterOrEqual(date, todayWithZeroTime) && this.isBeforeOrEqual(date, tomorrowZeroTime)
    )
  }

  isYesterday(date: Date): boolean {
    const yesterdayZeroTime = this.addDays(this.todayWithZeroTimeTZ(), -1)

    return (
      this.isAfterOrEqual(date, yesterdayZeroTime) &&
      this.isBeforeOrEqual(date, this.todayWithZeroTimeTZ())
    )
  }

  isTomorrow(date: Date): boolean {
    //noon = 00:00 at night
    const todayNoon = this.addDays(this.todayWithZeroTimeTZ(), 1)
    const tomorrowNoon = this.addDays(this.todayWithZeroTimeTZ(), 2)

    return this.isAfterOrEqual(date, todayNoon) && this.isBeforeOrEqual(date, tomorrowNoon)
  }

  isSameDay(date: Date | number, dateToCompare: Date | number): boolean {
    return dateFns.isSameDay(date, dateToCompare)
  }

  /** Is date Is bigger than now, but less than in N hours */
  isDateWillComeInLessThanNHours(date: Date, nHours: number): boolean {
    return this.isAfter(date, this.now()) && this.isBefore(date, this.addHours(this.now(), nHours))
  }

  isDateWillComeInNHours(date: Date, nHours: number): boolean {
    const start = this.subHours(this.UTCToTz(date), nHours)
    const end = this.getEndOfTheTZDayInUTC(date)

    return dateFns.isWithinInterval(this.UTCToTz(this.now()), {start, end})
  }

  getMinDateFromArray(dates: Date[]): Date {
    return this.toDateOrNull(Math.min.apply(null, dates))
  }

  getCurrentDateStringTz(timeZone?: string): string {
    return dateFnsTimezone.formatInTimeZone(this.now(), timeZone ?? this.timeZone, 'yyyy-MM-dd')
  }

  static isYmd(date: string): boolean {
    return !!date.match(/^\d{4}-\d{2}-\d{2}$/)
  }

  getStartOfTZDayInUTC(date: Date): Date {
    const tzDate = this.UTCToTz(date)
    const startOfDay = this.startOfDay(tzDate)

    return this.tzTimeToUTC(startOfDay)
  }

  getEndOfTheTZDayInUTC(date: Date): Date {
    const tzDate = this.UTCToTz(date)
    const endOfDay = this.endOfDay(tzDate)

    return this.tzTimeToUTC(endOfDay)
  }

  differenceInMonths(dateLeft: Date, dateRight: Date): number {
    return dateFns.differenceInMonths(dateLeft, dateRight)
  }

  isInRangeOfMinutes(date: Date, minutes: number): boolean {
    const start = this.subtractMinutes(date, minutes)
    const end = this.addMinutes(date, minutes)

    return dateFns.isWithinInterval(this.now(), {start, end})
  }

  compareStringDatesAsc(date1: string, date2: string): number {
    return dateFns.compareAsc(dateFns.parseISO(date1), dateFns.parseISO(date2))
  }

  getYearLastTwoDigits(): string {
    return this.now().toLocaleDateString('en', {year: '2-digit'})
  }

  getYearAndMonthFromISOString(dateString: string): {year: number; month: number} {
    const date = this.toDate(dateString)

    return {
      year: this.getYear(date),
      month: this.getMonth(date),
    }
  }

  sortDates(dates: string[]): string[] {
    return dates.sort((a, b) => dateFns.compareAsc(this.parseISO(a), this.parseISO(b)))
  }

  /**
   * Compares just times from dates, without checking date.
   * eq.: 1970-01-01T 20:00 == 2020-01-01T 20:00  -> true
   * Without converting to any TZ - get time as is
   */
  isTimeEqual(dateWithTime: Date, dateWithTimeToCompare: Date): boolean {
    return (
      this.formatToTimeWithoutTZ(dateWithTime) === this.formatToTimeWithoutTZ(dateWithTimeToCompare)
    )
  }

  getMax(dates: Date[]): Date | null {
    if (!dates?.length) {
      return null
    }

    return dateFns.max(dates.filter((date) => date))
  }

  hasTime(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/

    return this.isValidDate(this.toDate(dateString)) && !regex.test(dateString)
  }

  tzDateNow(): string {
    return this.formatTzDate(this.now())
  }

  isWithinInterval(date: Date, interval: {start: Date; end: Date}): boolean {
    return dateFns.isWithinInterval(date, interval)
  }

  getUnix(date: Date): number {
    return dateFns.getUnixTime(date)
  }

  getAge(date: string | Date): number {
    const now = this.now()
    return dateFns.differenceInYears(now, this.toDate(date))
  }

  /**@returns utc date with date from tzDate argument and time that is equal in tz to utcDateWithTime (daylight savings are taken into account)*/
  getUTCAdjustedByTzDay(tzDate: string, utcDateWithTime: Date | number): Date {
    const dateWithoutTime = this.toDate(tzDate)

    const tzDateTime = this.UTCToTz(utcDateWithTime)

    const combinedDate = new Date(
      dateWithoutTime.getFullYear(),
      dateWithoutTime.getMonth(),
      dateWithoutTime.getDate(),
      tzDateTime.getHours(),
      tzDateTime.getMinutes(),
      tzDateTime.getSeconds(),
    )

    return this.tzTimeToUTC(combinedDate)
  }

  getDateOrDateTime(format: DateFormat, date?: Date | string, convertToTz = false): string {
    if (typeof date === 'string') {
      date = this.toDate(date)
    }

    if (convertToTz) {
      date = this.UTCToTz(date)
    }

    return dateFns.format(date ?? this.now(), format)
  }
}
