import {ValidationOptions, ValidateIf} from 'class-validator'

export function IsNullable(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateIf((_object, value) => value !== null, validationOptions)
}
