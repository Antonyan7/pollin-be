import {ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator'
import {Injectable} from '@nestjs/common'

@Injectable()
@ValidatorConstraint()
export class IsNumberOrStringOrBoolean implements ValidatorConstraintInterface {
  validate(answers: Array<string | number | boolean>): boolean {
    let isValidate = true
    answers.forEach((item: string | number | boolean) => {
      if (!(typeof item === 'number' || typeof item === 'string' || typeof item === 'boolean')) {
        isValidate = false
      }
    })
    return isValidate
  }

  defaultMessage(): string {
    return 'must be a number or string or boolean'
  }
}
