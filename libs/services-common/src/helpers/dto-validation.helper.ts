import {ValidationError} from '@nestjs/common'

const checkIsObject = (value: unknown): boolean => {
  return !!(value && typeof value === 'object')
}

const constraintsErrors: ValidationError[] = []

export const findNestedValidationErrors = (object = {}, keyToMatch = ''): ValidationError[] => {
  if (Array.isArray(object)) {
    object.forEach((object) => {
      const entries = Object.entries(object)

      for (let i = 0; i < entries.length; i += 1) {
        const [objectKey, objectValue] = entries[i]

        if (objectKey === keyToMatch && !!objectValue) {
          constraintsErrors.push(object)
          return constraintsErrors
        }

        if (checkIsObject(objectValue)) {
          const child = findNestedValidationErrors(objectValue, keyToMatch)

          if (child !== null) {
            return child
          }
        }
      }
    })
  }

  return constraintsErrors
}
