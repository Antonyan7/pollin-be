import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import {Injectable} from '@nestjs/common'

@ValidatorConstraint({name: 'EqualsTo'})
@Injectable()
export class EqualsToValidator implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    return value === args.constraints[0]
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} should be equal to ${args.constraints[0]}`
  }
}

export function EqualsTo(targetValue: unknown, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      name: 'EqualsTo',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [targetValue],
      validator: EqualsToValidator,
    })
  }
}
