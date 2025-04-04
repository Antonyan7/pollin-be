import {validate} from 'class-validator'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {cleanClassValidatorError} from '../helpers/logger.helper'

/**
 * Used for Firestore Schema
 * @param document firestore object to be saved in DB
 */
export async function schemaValidation(document: unknown): Promise<void> {
  const validationErrors = await validate(document as Record<string, unknown>)
  if (validationErrors.length > 0) {
    const cleanErrors = cleanClassValidatorError(validationErrors)

    StructuredLogger.error(
      activityLogs.ValidationActions.SchemaValidation,
      activityLogs.ValidationEvent.Failure,
      {validationErrors: cleanErrors},
    )

    throw new Error('Firestore schema validation failed')
  }
}
