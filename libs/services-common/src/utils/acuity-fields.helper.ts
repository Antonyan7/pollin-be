import {StructuredLogger} from '@libs/common'
import {basicFieldMapping} from './acuity-field-maps.helper'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {AppointmentAcuityResponse} from '@libs/common/model/acuity.model'

import {NestprojectConfigService} from '@libs/common/services/config/config-service'

const configService = NestprojectConfigService.getInstance()

export type AcuityFilter = {
  id: string | number
  value: string
}

export type AcuityPlainFieldsDTO = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

export type AcuityAppointmentCreatePlainFieldsDTO = {
  datetime: string
  appointmentTypeID: number
  calendarID: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type FieldMapData = {
  fieldIdMapping: Record<string, string>
  acuityFieldMapping: Record<string, string>
  acuityBooleanFields: Array<number>
  specialHandlersKeys: Array<number>
  specialHandlers: unknown
}

const logInfo = (event: string): void => {
  StructuredLogger.info(
    activityLogs.AcuityFieldHelperFunctions.Common,
    activityLogs.AcuityFieldHelperActions.Common,
    {message: `AcuityFieldsHelper:constructor, event: ${event}`},
  )
}

export class AcuityFieldsHelper {
  private static instance: AcuityFieldsHelper
  public acuityMap: FieldMapData = null

  private fieldMap

  /**
   * Singleton, all data preparations runs once on application server start when first instance of the helper class is created.
   */
  constructor() {
    if (AcuityFieldsHelper.instance) {
      return AcuityFieldsHelper.instance
    }

    logInfo('--- AcuityFieldsHelper Init Started ---')

    this.fieldMap = this.fieldMapBuilder(basicFieldMapping)

    logInfo('FieldMapFinished')

    // init instance data
    this.acuityMap = {
      fieldIdMapping: null,
      acuityFieldMapping: null,
      acuityBooleanFields: null,
      specialHandlersKeys: null,
      specialHandlers: null,
    }
    const instance = this.acuityMap

    // save fieldIdMapping based on clinic organization
    instance['fieldIdMapping'] = this.fieldMap
    const fieldIdMapping = instance['fieldIdMapping']

    // Acuity to Appointment field map, swaps key with value
    instance['acuityFieldMapping'] = Object.keys(fieldIdMapping).reduce((ret, key) => {
      ret[fieldIdMapping[key]] = key
      return ret
    }, {})

    // Array of boolean fields needed mapping to boolean
    instance['acuityBooleanFields'] = ((): number[] => {
      const field = fieldIdMapping

      // Find if any fieldId is duplicated
      const uniqueFieldIds = []
      const duplicatedField = []
      for (const key in field) {
        const value = field[key]
        if (value === undefined) {
          continue
        }
        if (uniqueFieldIds.includes(value)) {
          duplicatedField.push({key, value})
        } else {
          uniqueFieldIds.push(value)
        }
      }

      // Log as critical error if any is duplicated in the field mapping
      if (duplicatedField.length > 0) {
        StructuredLogger.error(
          activityLogs.AcuityFieldHelperFunctions.MapAppointmentFromForm,
          activityLogs.AcuityFieldHelperActions.DuplicatedField,
          {
            errMsg: `Duplicated acuity fieldID ${JSON.stringify(
              duplicatedField,
            )}, fieldIdMapping: ${JSON.stringify(fieldIdMapping)}`,
          },
        )
      }

      //for custom BOOLEAN fields
      return [
        field.hasReferral,
        field.bookAppointmentWithPhysician,
        field.addedToReadyWaitList,
        field.haveReferral,
        field.agreeTermsAndConditions,
        field.agreeReceivingCommunications,
      ]
        .filter(Boolean)
        .map((value) => Number(value))
    })()

    // Handles specific field in specific way
    const specialFields = [
      // 'organizationId',  //could be special field later
    ]
    // filter undefined keys for special handlers
    instance['specialHandlers'] = specialFields.reduce((specialHandlers, currentField) => {
      if (fieldIdMapping?.[currentField]) {
        // e.g. [fieldIdMapping.organizationId]: this.setOnlyIfSet
        specialHandlers[fieldIdMapping[currentField]] = this.setOnlyIfSet
      }

      return specialHandlers
    }, {})

    // Keys of handler for fast search
    instance['specialHandlersKeys'] = Object.keys(instance['specialHandlers']).map((value) =>
      Number(value),
    )

    logInfo(`AcuityMap Is Ready`)

    logInfo('AcuityFieldsHelperTasksFinished')

    AcuityFieldsHelper.instance = this
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setOnlyIfSet = (...args): any => {
    const value = args[0]
    if (!!value) {
      return value
    }
    return null
  }

  private getBooleanField(acuityValue: string): boolean {
    return acuityValue === 'yes'
  }

  /**
   * Transform basic map into clinic location prefixed map and pull Config value
   * e.g ACUITY_FIELD_ADDRESS -> ACUITY_FIELD_ADDRESS
   * @param basicFieldMap basic Appointment to Acuity field map
   * @param clinicOrganization
   */
  private fieldMapBuilder = (basicFieldMap: Record<string, string>): Record<string, string> => {
    return Object.entries(basicFieldMap).reduce((fullMap: Record<string, string>, currentEntry) => {
      const [name, value] = currentEntry
      fullMap[name] = configService.get(`${value}`)
      return fullMap
    }, {})
  }

  /**
   * Used to build acuity request payload
   * converting into -> fieldId : fieldValue
   */
  renameKeysToId(filters: Record<string, string | boolean | number[]> | unknown): AcuityFilter[] {
    StructuredLogger.info(
      activityLogs.AcuityFieldHelperFunctions.RenameKeysToId,
      activityLogs.AcuityFieldHelperActions.StartMethod,
      {
        message: `UpdateAppointmentOnAcuityService starts `,
      },
    )

    const acuityFilters = []
    const keys = Object.keys(filters)
    keys.forEach((key) => {
      const mapping = this.acuityMap['fieldIdMapping'][key]
      const newKey = mapping ? mapping : key
      acuityFilters.push({
        id: newKey,
        value: filters[key],
      })
    })

    return acuityFilters
  }

  handleBooleans(filters: AcuityFilter[]): AcuityFilter[] {
    return filters.map((filter) => {
      if (typeof filter.value === 'boolean') {
        return {
          ...filter,
          value: filter.value ? 'yes' : 'no',
        }
      }
      return filter
    })
  }

  /**
   * Used to map acuity fields from forms array to appointment fields
   */
  mapAppointmentFromForm(
    appointment: AppointmentAcuityResponse,
  ): Partial<AppointmentAcuityResponse> {
    const result: Partial<AppointmentAcuityResponse> = {}

    if (Array.isArray(appointment.forms)) {
      const {acuityFieldMapping, acuityBooleanFields, specialHandlersKeys, specialHandlers} =
        this.acuityMap

      appointment.forms.forEach((form) => {
        // For each field
        for (const field of form.values) {
          const {fieldID} = field
          // Check if field ID exist, handle it based on its type
          if (fieldID in acuityFieldMapping) {
            const appointmentKey = acuityFieldMapping[field.fieldID]
            if (acuityBooleanFields.includes(fieldID)) {
              // Boolean field
              result[appointmentKey] = this.getBooleanField(field.value)
            } else if (specialHandlersKeys.includes(fieldID)) {
              // Special handler
              const specialValue = specialHandlers[fieldID](field.value)
              if (specialValue !== null) {
                result[appointmentKey] = specialValue
              }
            } else {
              // String field
              result[appointmentKey] = field.value
            }
          } else {
            const fieldsToSkip = ['Internal Status', 'Terms & Conditions'] //there are a few filed which default from acuity and we don't care about them
            if (!fieldsToSkip.some((fieldToSkip) => form.name.includes(fieldToSkip))) {
              StructuredLogger.error(
                activityLogs.AcuityFieldHelperFunctions.MapAppointmentFromForm,
                activityLogs.AcuityFieldHelperActions.UnknownFieldFromAcuity,
                {
                  errMsg: `Field ${fieldID} in section ${form.name} doesn't exist in ${Object.keys(
                    acuityFieldMapping,
                  )}`,
                },
              )
            }
          }
        }
      })
    }

    return result
  }
}
