import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {Injectable} from '@nestjs/common'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

@Injectable()
@ValidatorConstraint({name: 'IsAfter'})
export class IsAfterValidator implements ValidatorConstraintInterface {
  validate(propertyValue: string | Date, args: ValidationArguments): boolean {
    return dateTimeUtil.isAfterOrEqual(
      dateTimeUtil.toDate(propertyValue),
      dateTimeUtil.toDate(args.object[args.constraints[0]]),
    )
  }

  defaultMessage(args: ValidationArguments): string {
    return `"${args.property}" date must be before or equal "${args.constraints[0]} date"`
  }
}

export function IsAfter(
  targetValue: unknown,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      name: 'IsAfter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [targetValue],
      validator: IsAfterValidator,
    })
  }
}
