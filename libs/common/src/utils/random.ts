import * as crypto from 'crypto'

export const randomNumber = (min: number, max: number, commaNumbers = 0): number => {
  const r = Math.random() * (max - min + 1) + min
  if (commaNumbers) {
    return Math.floor(r * 10 ** commaNumbers) / 10 ** commaNumbers
  } else {
    return Math.floor(r)
  }
}

/**
 * Picks random item from array
 */
export const arrayRandomPick = <T = unknown>(arr: T[]): T => arr[randomNumber(0, arr.length - 1)]

export const randomCharacters = (length: number): string =>
  crypto.randomBytes(length).toString('hex').substring(length)
