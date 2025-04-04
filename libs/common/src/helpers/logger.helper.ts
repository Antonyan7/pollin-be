import {ValidationError} from 'class-validator'

export const cleanClassValidatorError = (errors: ValidationError[]): ValidationError[] =>
  errors?.map((error) => ({
    property: error.property,
    constraints: error.constraints,
    children: cleanClassValidatorError(error.children),
  }))
