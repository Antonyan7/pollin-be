export function machineResultValueRound(value: string): string {
  if (!value) {
    return null
  }

  const trimmed = value.trim()

  // Check if the trimmed string is a plain numeric value
  if (!/^[-+]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(trimmed)) {
    return value
  }

  const n = Number(trimmed)

  if (n >= 1) {
    return Math.round(n).toString()
  }

  if (n === 0) {
    return '0'
  }

  // For numbers less than 1, we work with the fractional part
  const dotIndex = trimmed.indexOf('.')
  if (dotIndex === -1) {
    // Should not happen for n < 1, but return the original if no dot is found
    return trimmed
  }
  const fractional = trimmed.substring(dotIndex + 1)

  // Find the index of the first nonzero digit in the fractional part
  const firstNonZeroIndex = fractional.search(/[1-9]/)
  if (firstNonZeroIndex === -1) {
    // If no nonzero digit is found (e.g. "0.000"), return the original
    return trimmed
  }

  // If there is no extra digit beyond the first nonzero, no rounding is done
  if (fractional.length <= firstNonZeroIndex + 1) {
    return trimmed
  }

  // Determine the number of decimals to round to
  // (Round to one decimal place beyond the first nonzero digit)
  const decimals = firstNonZeroIndex + 1
  const factor = Math.pow(10, decimals)
  const rounded = Math.round(n * factor) / factor

  // Use toFixed to format the number with the fixed number of decimals,
  // then remove any unnecessary trailing zeros
  let fixedStr = rounded.toFixed(decimals)
  fixedStr = fixedStr.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')

  return fixedStr
}
