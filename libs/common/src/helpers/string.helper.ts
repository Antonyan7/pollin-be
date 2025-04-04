import {basename, extname} from 'path'
import {DefaultValue} from '../enums'

export const removeSpecialCharacters = (data: string): string => {
  if (!data) {
    return data
  }

  return data.replace(/[-\s~`!@#$%^&*()_+=[\]{}|\\:;"'<>,.?/]/g, '')
}

export const getJustDigitsFromString = (str: string): string => {
  if (!str) {
    return ''
  }

  return str.replace(/\D/g, '')
}

export const getTrimmedAndNotEmptyStrings = (strings: string[]): string[] => {
  const trimmedStrings = strings.map((str) => str.trim())
  return trimmedStrings.filter((str) => str)
}

export const toUpperCaseFirstLetter = (value: string): string =>
  value[0].toUpperCase() + value.slice(1)

export const replaceNonASCIIChars = (value: string): string =>
  value.replace(/[^\x00-\x7F]/g, (match) => match.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))

export const extractFilename = (inputString: string): string => {
  return basename(inputString, extname(inputString))
}

export const replaceSlashToDash = (text: string): string => {
  return text.replace(/\//g, DefaultValue.Dash)
}
