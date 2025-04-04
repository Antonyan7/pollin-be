import {validate} from 'class-validator'
import {NestprojectConfigService} from '../services'
import {cleanClassValidatorError} from './logger.helper'
import {ValidationActions, ValidationEvent} from '../enums'
import {StructuredLogger} from '../utils'
import {BadRequestException} from '@libs/services-common/exceptions'
import * as i18Messages from '@libs/common/i18n/en/message.json'

export const validatePayload = async (payload: object): Promise<void> => {
  const errors = await validate(payload, {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  })

  if (errors?.length) {
    const configService = NestprojectConfigService.getInstance()
    const showDetailedValidationMessage = configService.getBool('SHOW_DETAILED_VALIDATION_MESSAGE')
    const cleanErrors = cleanClassValidatorError(errors)

    StructuredLogger.error(ValidationActions.DtoValidation, ValidationEvent.Failure, {
      validationErrors: cleanErrors,
    })

    throw new BadRequestException(
      showDetailedValidationMessage
        ? JSON.stringify(cleanErrors)
        : i18Messages.COMPONENT_VALIDATION_FAILED,
    )
  }
}
