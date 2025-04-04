/**
 *  Luhn (mod10) algorithm validation
 * to check does number (ohip) is valid, we can use: http://sqa.fyicenter.com/1000484_Mod_10_Luhn_Algorithm_Checksum_Validator.html#Result
 */
export const doesLuhnValidationPassing = (value: string): boolean => {
  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) {
    return false
  }

  // The Luhn Algorithm.
  let nCheck = 0
  let nDigit = 0
  let bEven = false

  value = value.replace(/\D/g, '')

  for (let n = value.length - 1; n >= 0; n--) {
    const cDigit = value.charAt(n)
    nDigit = parseInt(cDigit, 10)

    if (bEven) {
      if ((nDigit *= 2) > 9) {
        nDigit -= 9
      }
    }

    nCheck += nDigit
    bEven = !bEven
  }

  return nCheck % 10 == 0
}
