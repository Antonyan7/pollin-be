import {Transform} from 'class-transformer'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({name: 'IsQueryBoolean', async: false})
export class IsQueryBooleanValidator implements ValidatorConstraintInterface {
  validate(value: boolean): boolean {
    return value === true || value === false
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a boolean ('true' or 'false')`
  }
}

export function IsQueryBoolean(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: unknown, propertyName: string | symbol) {
    Transform(({value}) => {
      if (value === 'true' || value === true) {
        return true
      }

      if (value === 'false' || value === false) {
        return false
      }

      return
    })(object, propertyName)

    registerDecorator({
      name: 'IsQueryBoolean',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [],
      validator: IsQueryBooleanValidator,
    })
  }
}
