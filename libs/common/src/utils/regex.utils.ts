export const dateTimeRegex = {
  /**
   * Allows any XXXX number
   */
  year: '\\d{4}',
  /**
   * Allows a number between 00 and 12
   */
  month: '([1-9]|0[1-9]|1[0-2])',
  /**
   * Allows any string value
   */
  monthStr: '([^s]+)',
  /**
   * Allows a number between 00 and 31
   */
  day: '([0-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])',
  /**
   * Allows a number between 00 and 24
   */
  hour: '([0-9]|[0-1][0-9]|2[0-3])',
  /**
   * Allows a number between 00 and 59
   */
  min: '([0-9]|[0-5][0-9])',
  /**
   * Allows am|AM|pm|PM
   */
  AmPm: '(am|AM|pm|PM)',
  /**
   * Allows edt or edt values
   */
  tz: '(edt|EDT|EST|est)',
  /**
   * checks datetime format
   */
  rfc3339: /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[\+-]\d{2}:\d{2})?)$/gm,
}

export const regexUUID = /^[a-z,A-Z,0-9,-]{36,36}$/
