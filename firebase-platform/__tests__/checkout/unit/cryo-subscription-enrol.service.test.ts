import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {calculateRenewalDate} from '@firebase-platform/functions/checkout/src/enrol-cryo-subscriptions/helpers/renewal.helper'

const dateUtil = new DateTimeUtil()

describe('Calculates renewal date based on freeze date', () => {
  it('should return date 2 weeks from today if renewal is in past', () => {
    const freezeDate = '2020-01-01'
    const result = calculateRenewalDate(dateUtil.toDate(freezeDate))

    expect(dateUtil.formatDateYMD(result)).toBe(
      dateUtil.formatDateYMD(dateUtil.addDays(dateUtil.now(), 14)),
    )
  })

  it('should return renewal date if date is in future', () => {
    const freezeDate = '2070-01-01'
    const result = calculateRenewalDate(dateUtil.toDate(freezeDate))

    expect(dateUtil.formatDateYMD(result)).toBe('2071-01-01')
  })
})
