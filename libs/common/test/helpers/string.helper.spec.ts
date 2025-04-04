import {removeSpecialCharacters, replaceNonASCIIChars} from '@libs/common/helpers/string.helper'

describe('removeSpecialCharacters utility function', () => {
  it('should remove special characters from ohip not formatted number', () => {
    const ohipNumberToSanitize = '1234- 567   890'
    expect(removeSpecialCharacters(ohipNumberToSanitize)).toBe('1234567890')
  })

  it('should replace non ascii chars in string', () => {
    expect(replaceNonASCIIChars('Règlements à respecter (2022) (5).pdf')).toBe(
      'Reglements a respecter (2022) (5).pdf',
    )
  })
})
