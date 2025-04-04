import {handleOptionalNumberValues, handleOptionalStringValues} from '../util'

const stringValue = 'stringValue'
const numberValue = 1

describe('Util tests', () => {
  it('should run handleOptionalStringValues() for defined value', () => {
    expect(handleOptionalStringValues(stringValue)).toBe(stringValue)
  })

  it('should run handleOptionalStringValues() for undefined', () => {
    expect(handleOptionalStringValues(undefined)).toBeNull()
  })

  it('should run handleOptionalNumberValues() for defined value', () => {
    expect(handleOptionalNumberValues(numberValue)).toBe(numberValue)
  })

  it('should run handleOptionalNumberValues() for undefined', () => {
    expect(handleOptionalNumberValues(undefined)).toBeNull()
  })

  it(`should run handleOptionalStringValues() for empty string ('') and return null`, () => {
    expect(handleOptionalStringValues('')).toBeNull()
  })
})
