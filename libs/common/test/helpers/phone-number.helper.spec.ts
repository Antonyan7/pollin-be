import {formatPhoneNumber} from '@libs/common/helpers/phone-number.helper'

describe('Phone number helper', () => {
  it('should format Canadian phone number', () => {
    const rawNumber = '+14092841029'

    expect(formatPhoneNumber(rawNumber)).toMatch('(409) 284-1029')
  })

  it('should not format other international phone numbers', () => {
    const rawNumber = '+380555555555'
    expect(formatPhoneNumber(rawNumber)).toMatch(rawNumber)
  })

  it('should not format other random phone numbers', () => {
    const rawNumber = '140928410291'

    expect(formatPhoneNumber(rawNumber)).toMatch(rawNumber)
  })

  it('should not throw with bad input', () => {
    const rawNumber = undefined

    expect(formatPhoneNumber(rawNumber)).toBe(rawNumber)
  })
})
