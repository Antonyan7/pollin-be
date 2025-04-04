import {validate, ValidationError} from 'class-validator'

const composeMessage = (message: string, value: string): string => {
  return `${message}. Value: ${value}`
}

/**
 * ValidationError from class-validator could include N level of errors.
 * We need recursive function to grab error from each level
 * Each level contains either childen or constraint.
 */
const processValidationMessage = (error: ValidationError): string[] => {
  if (!error) {
    return []
  }

  if (error?.children?.length) {
    // recursive call
    return error.children.flatMap((child) => processValidationMessage(child))
  }

  if (error.constraints) {
    return Object.values(error.constraints).map((message) => composeMessage(message, error?.value))
  }

  return []
}

export const processClassValidatorMessages = (validationErrors: ValidationError[]): string[] => {
  if (validationErrors?.length == 0) {
    return []
  }

  return validationErrors.flatMap((error) => processValidationMessage(error))
}

/**
 * Validate model and read all messages associated with object
 * @param data Instance of class with class-validator Decorators
 * @returns isValid flag and array of errors
 */
export async function validateModel<T>(
  data: Partial<T>,
): Promise<{isValid: boolean; errors?: string[]}> {
  const validationErrors = await validate(data)
  const errors = processClassValidatorMessages(validationErrors)

  return {isValid: errors.length == 0, errors}
}
