import {PatientProfileAlert} from '@libs/data-layer/apps/users/entities/typeorm'
import {ProfileAlertType, ProfileAlertTypeTitle} from '@libs/data-layer/apps/users/enum'
import {ProfileAlertDTO} from '@libs/services-common/dto/profile-alert.dto'
import {DefaultValue} from '../enums'
import {getFullName} from './patient.helper'
import {TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

type ProfileAlertOptions = {
  addPartnerName?: boolean
}

const buildProfileAlertMessage = (
  patientProfileAlert: PatientProfileAlert,
  options?: ProfileAlertOptions,
): string => {
  const alertText = patientProfileAlert.profileAlert.text ?? DefaultValue.Dash
  const profileAlert = patientProfileAlert.profileAlert

  switch (profileAlert.type) {
    case ProfileAlertType.AbnormalPartnerResult:
      return options?.addPartnerName && patientProfileAlert.partner
        ? `${alertText} for ${getFullName(patientProfileAlert.partner.firstName, patientProfileAlert.partner.lastName)} (partner)`
        : alertText

    default:
      return alertText
  }
}

export const buildProfileAlertResponse = (
  patientProfileAlerts: PatientProfileAlert[],
  options?: ProfileAlertOptions,
): ProfileAlertDTO[] => {
  return patientProfileAlerts.map((patientAlert) => ({
    id: patientAlert.uuid,
    typeId: patientAlert.profileAlert.type,
    typeTitle: ProfileAlertTypeTitle[patientAlert.profileAlert.type],
    message: buildProfileAlertMessage(patientAlert, options),
  }))
}

export const defineRegularAndProcessTestTypeIds = (
  testTypes: TestType[],
): {
  regularTestTypesIds: number[]
  processTestTypesIds: number[]
} =>
  testTypes.reduce(
    (result, testType) => {
      if (!testType) {
        return
      }

      const targetArray = testType.processType
        ? result.processTestTypesIds
        : result.regularTestTypesIds

      targetArray.push(testType.id)

      return result
    },
    {
      regularTestTypesIds: [],
      processTestTypesIds: [],
    },
  )
