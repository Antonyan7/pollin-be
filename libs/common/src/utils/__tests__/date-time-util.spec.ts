/* eslint date/no-new-date-without-args: 0 */
/* eslint date/no-new-date-with-args: 0 */

import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {Timestamp} from 'firebase-admin/firestore'
import {dateTimeRegex} from '@libs/common/utils/regex.utils'
// eslint-disable-next-line no-restricted-imports
import {ConfigService} from '@nestjs/config'
import {TimeFormat} from '@libs/common/enums'
import {NestprojectConfigService} from '@libs/common/services'

jest.mock('@libs/common/services/open-telemetry.service.ts')
const string1 = '2022-07-07T00:00:00.000Z'
const string2 = '2022-06-07T00:00:00.000Z'
const date1 = new Date(string1)
const date2 = new Date(string2)
const hours = 3
const config = new NestprojectConfigService(new ConfigService())
const clinicTimeZone = config.get<string>('CLINIC_TIMEZONE')

const defaultTimeZone = config.get<string>('DEFAULT_TIME_ZONE')
const dateTimeUtil = new DateTimeUtil(defaultTimeZone)

// eslint-disable-next-line max-lines-per-function
describe('DateTime Util', () => {
  it('add hours', () => {
    expect(dateTimeUtil.addHours(date1, hours)).toEqual(new Date('2022-07-07T03:00:00.000Z'))
  })

  it('is after return true', () => {
    expect(dateTimeUtil.isAfter(date1, date2)).toBe(true)
  })

  it('is after return false', () => {
    expect(dateTimeUtil.isAfter(date2, date1)).toBe(false)
  })

  it('to date', () => {
    expect(dateTimeUtil.toDate('2022-07-07T00:00:00.000Z')).toEqual(date1)
  })

  it('get firestore timestamp now date', () => {
    expect(dateTimeUtil.getFirestoreTimeStampNowDate()).toBeInstanceOf(Timestamp)
  })

  it('should get dateTimeUtil from YMD with zero time', () => {
    expect(dateTimeUtil.getDateFromYMD({year: 1970, month: 1, day: 1})).toEqual(
      new Date('1970-01-01T00:00:00.000Z'),
    )
  })

  it('should get time from date in PM', () => {
    expect(
      dateTimeUtil.extractSlotTime(new Date('1970-01-01T01:02:00.000Z'), defaultTimeZone),
    ).toEqual('8:02PM')
  })

  it('should get time from date in AM', () => {
    expect(
      dateTimeUtil.extractSlotTime(new Date('1970-01-01T13:02:00.000Z'), defaultTimeZone),
    ).toEqual('8:02AM')
  })

  it('should get time from date in 24H', () => {
    expect(
      dateTimeUtil.extractSlotTimeWithTimeFormat(
        new Date('1970-01-01T18:02:00.000Z'),
        TimeFormat.H24,
        defaultTimeZone,
      ),
    ).toEqual('13:02')
  })

  it('should get time from date in 12H', () => {
    expect(
      dateTimeUtil.extractSlotTimeWithTimeFormat(
        new Date('1970-01-01T18:02:00.000Z'),
        TimeFormat.H12,
        defaultTimeZone,
      ),
    ).toEqual('1:02PM')
  })

  it('should be true for the same dates (isEqual)', () => {
    const date = '2022-12-01T00:00:00.000Z'
    expect(dateTimeUtil.isEqual(new Date(date), new Date(date))).toBe(true)
  })

  it('should format date in ISO', () => {
    expect(dateTimeUtil.formatDateYMD(new Date('2022-12-01T00:00:00.000Z'))).toBe('2022-12-01')
  })

  it('should match tz format', () => {
    const date = '2022-12-01T00:00:00-04:00'
    expect(date).toMatch(dateTimeRegex.rfc3339)
  })

  it('should not match non-tz format', () => {
    const date = '2022-10-13 17:42:27.639391000'
    expect(date).not.toMatch(dateTimeRegex.rfc3339)
  })

  it('should extract UTC time from Date in EDT timezone', () => {
    const dateTimeEDT = '2022-01-01T07:00:00-04:00'
    const timeUTC = '11:00:00'
    expect(dateTimeUtil.extractTimeUTC(dateTimeUtil.toDate(dateTimeEDT))).toBe(timeUTC)
  })

  it(`should format time with current date in ISO 8601 with zoned mark`, () => {
    const time = '07:00:00'
    const currentDate = dateTimeUtil.formatIsoDate()
    expect(dateTimeUtil.formatTimeToISO(time)).toBe(`${currentDate}T07:00:00Z`)
  })

  it(`should format time with current date in ISO 8601 without zoned mark`, () => {
    const time = '07:00:00'
    const currentDate = dateTimeUtil.formatIsoDate()
    expect(dateTimeUtil.formatTimeToISONoZoned(time)).toBe(`${currentDate}T07:00:00`)
  })

  it('should extract EST timezone offset in digits', () => {
    const dateTimeEDT = '2022-01-01T13:00:00-05:00'
    expect(dateTimeUtil.extractInDigitsTimeZoneOffset(dateTimeEDT, clinicTimeZone)).toBe('-05:00')
  })

  it('should extract EDT timezone offset in digits', () => {
    const dateTimeEDT = '2022-06-01T13:00:00-04:00'
    expect(dateTimeUtil.extractInDigitsTimeZoneOffset(dateTimeEDT, clinicTimeZone)).toBe('-04:00')
  })

  it('should format utc date in RFC3339', () => {
    const date = dateTimeUtil.toDate('2022-01-01T10:00:00.000Z')
    expect(dateTimeUtil.formatUTCDateInRFC3339Tz(date)).toBe('2022-01-01T05:00:00-05:00')
  })

  it('should format 24 hours', () => {
    const date = dateTimeUtil.toDate('2022-11-10T05:23:00.000Z')
    expect(dateTimeUtil.formatUTCDateInRFC3339Tz(date)).toBe('2022-11-10T00:23:00-05:00')
  })

  it('should format utc string in RFC3339', () => {
    const date = '2022-01-01T10:00:00.000Z'
    expect(dateTimeUtil.formatUTCStringInRFC3339Tz(date)).toBe('2022-01-01T05:00:00-05:00')
  })

  it('should parse and return UTC', () => {
    const date = '2022-01-01T10:00:00.000Z'
    expect(dateTimeUtil.parseISO(date).toISOString()).toBe(date)
    expect(dateTimeUtil.parseISO('2022-01-01T05:00:00-05:00').toISOString()).toBe(date)
  })

  it('should convert to Date or null', () => {
    const date = '2022-01-01T10:00:00.000Z'
    expect(dateTimeUtil.toDateOrNull(date)).toBeInstanceOf(Date)
    expect(dateTimeUtil.toDateOrNull('some string')).toBe(null)
    expect(dateTimeUtil.toDateOrNull(null)).toBe(null)
  })

  it('should get month name shorted and day without zero number', () => {
    const date = dateTimeUtil.toDate('2022-01-01')
    const monthAndDayExpected = 'Jan 1'
    expect(dateTimeUtil.formatMonthAndDay(date)).toBe(monthAndDayExpected)
  })

  it('should get datetime formatted like "May 20 @ 3:30 PM EST"', () => {
    const date = dateTimeUtil.toDate('2022-01-01T13:30:00.000Z')

    const formattedDate = dateTimeUtil.formatToRelativeWithDateToZoned(date)
    expect(formattedDate).toMatch(/Jan 1 @ .*:30 AM .../)
  })

  it('should get datetime formatted like "1 Jan 2022 8:30 AM"', () => {
    const date = dateTimeUtil.toDate('2022-01-01T13:30:00.000Z')

    const formattedDate = dateTimeUtil.formatDateToRelativeWithDateToZoned(date)
    expect(formattedDate).toMatch(/1 Jan 2022 8:30 AM/)
  })

  it(`Should get datetime formatted like "
  Today, May 20 2021
  3:30 PM EST
  "`, () => {
    //convert to TZ to have today when time is after 7 pm EST
    // 2 Jan 01:00 UTC -> 1 Jan 20:00 EST
    const nowTz = dateTimeUtil.UTCToTz(dateTimeUtil.now())
    const date = dateTimeUtil.setHours(nowTz, 12)
    const formattedDate = dateTimeUtil.formatToRelativeWithDateToZoned(date)
    expect(formattedDate).toMatch(/Today, ... .* ....\n.*:.. .M .../)
  })

  it('should get datetime formatted like "May 20 @ 15:30 EST"', () => {
    const date = dateTimeUtil.toDate('2022-01-01T13:30:00.000Z')

    const formattedDate = dateTimeUtil.formatToRelativeWithDateToZoned(date, TimeFormat.H24)
    expect(formattedDate).toMatch(/Jan 1 @ .*:30 .../)
  })

  it('Should return today for EST when it is already tomorrow UTC', () => {
    //convert to TZ to have today when time is after 7 pm EST
    // 2 Jan 01:00 UTC -> 1 Jan 20:00 EST

    // eq.: now 11 Feb 01:00 UTC
    const nowTz = dateTimeUtil.UTCToTz(dateTimeUtil.now()) // -> 10 Feb 20:00
    const todayWithZeroTimeUTC = dateTimeUtil.removeTime(nowTz) // -> 10 Feb 00:00
    const tomorrowUtcWhichIsTodayForEst = dateTimeUtil.addHours(
      dateTimeUtil.addDays(todayWithZeroTimeUTC, 1),
      2,
    ) // -> 11 Feb 02:00 UTC - which is still 10 Feb 21 EST (today)

    expect(dateTimeUtil.isToday(tomorrowUtcWhichIsTodayForEst)).toBe(true)
  })

  it('should format date to format like February 17, 2009', () => {
    const date = dateTimeUtil.toDate('2009-02-17')

    expect(dateTimeUtil.formatBirthDateWithFullMonth(date)).toBe('February 17, 2009')
  })

  it('should format tz date with time and timezone', () => {
    const date = dateTimeUtil.toDate('2009-02-17T13:00:00')

    expect(dateTimeUtil.formatToMonthsDayYearWithTime(date)).toMatch(
      new RegExp('Feb 17, 2009 @ .*[EST]'),
    )
  })

  it('should get utc datetime adjusted for selected day', () => {
    const dateWithoutDaylightSavings = dateTimeUtil.toDate('2009-02-17T13:00:00')

    /**for day with daylight savings */
    expect(dateTimeUtil.getUTCAdjustedByTzDay('2009-07-17', dateWithoutDaylightSavings)).toEqual(
      dateTimeUtil.toDate('2009-07-17T12:00:00'),
    )

    /**for day without daylight savings */
    expect(dateTimeUtil.getUTCAdjustedByTzDay('2009-02-20', dateWithoutDaylightSavings)).toEqual(
      dateTimeUtil.toDate('2009-02-20T13:00:00'),
    )

    const dateAfterDaylightSavings = dateTimeUtil.toDate('2009-07-17T15:00:00')

    /**for day after daylight savings */
    expect(dateTimeUtil.getUTCAdjustedByTzDay('2009-12-17', dateAfterDaylightSavings)).toEqual(
      dateTimeUtil.toDate('2009-12-17T16:00:00'),
    )
    /**for day before daylight savings */
    expect(dateTimeUtil.getUTCAdjustedByTzDay('2009-07-20', dateAfterDaylightSavings)).toEqual(
      dateTimeUtil.toDate('2009-07-20T15:00:00'),
    )
  })
})
