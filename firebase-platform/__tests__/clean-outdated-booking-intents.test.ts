import {cleanOutdatedBookingIntentsHandler} from '@codebase/cache/handlers'
import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {BookingIntentSeed} from '@seeds/firestore/booking-intent.seed'
import {BookingIntent} from '@libs/data-layer/apps/scheduling/entities/fireorm/booking-intent'
import {Timestamp} from 'firebase-admin/firestore'

jest.setTimeout(10000)
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')

let bookingIntentSeed: BookingIntentSeed

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

const outdatedBookingIntentId = 'outdatedBookingIntentId'
const newBookingIntentId = 'newBookingIntentId'

const outdatedBookingIntent: Partial<BookingIntent> = {
  createdAt: Timestamp.fromDate(dateTimeUtil.addDays(dateTimeUtil.now(), -40)),
  updatedAt: Timestamp.fromDate(dateTimeUtil.addDays(dateTimeUtil.now(), -40)),
  id: outdatedBookingIntentId,
  serviceCategoryId: 1,
  authUserId: null,
}

const newBookingIntent: Partial<BookingIntent> = {
  id: newBookingIntentId,
  serviceCategoryId: 1,
  authUserId: null,
}

describe('Firebase Function: clean-outdated-booking-intents', () => {
  beforeAll(async () => {
    bookingIntentSeed = new BookingIntentSeed()

    await bookingIntentSeed.create(outdatedBookingIntent)
    await bookingIntentSeed.create(newBookingIntent)
  })

  test('should clean outdated booking intent', async () => {
    await cleanOutdatedBookingIntentsHandler()

    //outdated
    const outDatedBookingIntent = await bookingIntentSeed.getBookingIntent(outdatedBookingIntentId)
    expect(outDatedBookingIntent.docs[0]).toBeFalsy()

    //new
    const bookingIntent = await bookingIntentSeed.getBookingIntent(newBookingIntentId)
    expect(bookingIntent.docs[0].data().id).toBe(newBookingIntentId)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await Promise.all(
      [outdatedBookingIntentId, newBookingIntentId].map((id) => bookingIntentSeed.deleteById(id)),
    )
  })
})
