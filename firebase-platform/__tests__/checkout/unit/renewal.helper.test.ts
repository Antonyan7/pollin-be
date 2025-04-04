import {calculateRenewalDate} from '@firebase-platform/functions/checkout/src/enrol-cryo-subscriptions/helpers/renewal.helper'
import {DateTimeUtil} from '@libs/common'

const dateUtil = new DateTimeUtil()

describe('Renewal helper', () => {
  it('should calculate renewal date', () => {
    const renewalDate = calculateRenewalDate(dateUtil.toDate('2070-01-01'))

    expect(dateUtil.formatDateYMD(renewalDate)).toBe('2071-01-01')
  })
})
