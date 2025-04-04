import {cleanClassValidatorError} from '@libs/common/helpers/logger.helper'
// eslint-disable-next-line no-restricted-imports
import {HttpException, HttpStatus} from '@nestjs/common'
import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {SOMETHING_WENT_WRONG} from '@libs/common/i18n/en/message.json'
import {StructuredLogger} from '@libs/common'
import {ValidationActions, ValidationEvent} from '@libs/common/enums/activity-logs'
import {ValidationError} from 'class-validator/types/validation/ValidationError'
import {findNestedValidationErrors} from '../helpers/dto-validation.helper'

export class DtoValidationException extends HttpException {
  constructor(
    validationErrors?: ValidationError[],
    showDetailedMessage?: boolean,
    error = 'Dto Validation Error',
  ) {
    const dtoValidationErrors = cleanClassValidatorError(validationErrors)

    StructuredLogger.error(ValidationActions.DtoValidation, ValidationEvent.Failure, {
      validationErrors: dtoValidationErrors,
    })

    const keyName = 'constraints'
    const constraintsErrors = findNestedValidationErrors(dtoValidationErrors, keyName)

    const message = constraintsErrors
      .map((error) => Object.values(error[keyName])[0] || SOMETHING_WENT_WRONG)
      .join(', ')

    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        error,
        message: showDetailedMessage ? message : SOMETHING_WENT_WRONG,
        code: ResponseStatusCodes.BadRequest,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
