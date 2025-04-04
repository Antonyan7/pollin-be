import {GetIvfCohortsResponseV3DTO} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {patientIdentifier} from '@apps/lis/test-result/helper/test-result.helper'
import {getPatientSubString} from '@apps/emr/patient/dto/patient.dto'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {abbreviatedName, getFullName} from '@libs/common/helpers/patient.helper'
import {getProfileImageUrl} from '@libs/services-common/helpers/patient-profile-image.helper'
import {IvfLabDayEnumLabels, getIvfLabDayLabels, IvfLabDayEnum} from '@libs/services-common/enums'
import {PatientPlanCohort} from '@libs/data-layer/apps/clinic-ivf/entities'
import {buildProfileAlertResponse} from '@libs/common/helpers/profile-alert.helper'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const getActivePlan = (patient: Patient): PatientPlan => {
  if (patient?.patientPlans.length > 0) {
    StructuredLogger.warn(
      activityLogs.IvfPatientsHelperFunctions.GetIvfPatientsDTO,
      activityLogs.IvfPatientsHelperActions.MoreThanOneActive,
      {patientId: patient.id},
    )
  }

  const [activePatientPlan] = patient?.patientPlans

  if (!activePatientPlan) {
    StructuredLogger.warn(
      activityLogs.IvfPatientsHelperFunctions.GetIvfPatientsDTO,
      activityLogs.IvfPatientsHelperActions.NoActive,
      {patientId: patient.id},
    )
  }
  return activePatientPlan
}

export const getCohort = (patientPlan: PatientPlan): PatientPlanCohort => {
  if (patientPlan.cohorts.length > 0) {
    StructuredLogger.warn(
      activityLogs.IvfPatientsHelperFunctions.GetIvfPatientsDTO,
      activityLogs.IvfPatientsHelperActions.MoreThanOneOriginalCohort,
      {patientPlanId: patientPlan.id},
    )
  }

  const [originalCohort] = patientPlan.cohorts

  return originalCohort
}

export const getIvfCohortsV3DTO = async (
  cohorts: PatientPlanCohort[],
  errorMessage: string,
): Promise<GetIvfCohortsResponseV3DTO> => {
  const patientsFormatted = cohorts.map(async (cohort) => {
    const patient = cohort.patientPlan.patient
    const activePatientPlan = cohort.patientPlan

    const hasPlansWithSheet = !!activePatientPlan.planType?.sheets?.some(
      ({type}) => type === PlanSheetType.Stimulation,
    )
    const cohortAppointment = cohort?.appointment
    const imageURL = await getProfileImageUrl(patient, errorMessage)
    return {
      id: cohort.uuid,
      patient: {
        id: patient.uuid,
        identifier: patientIdentifier(patient),
        subString: getPatientSubString(patient),
        fullName: getFullName(patient.firstName, patient.lastName),
        avatarURL: imageURL,
        alerts: buildProfileAlertResponse(patient.patientProfileAlerts, {addPartnerName: true}),
      },
      plan: {
        id: activePatientPlan.uuid,
        planTypeName: activePatientPlan.planType.title,
        hasStimSheet: hasPlansWithSheet,
      },
      cohortStartDate: {
        label:
          getIvfLabDayLabels.get(activePatientPlan.planType.ivfLabCohortStartDay) ??
          IvfLabDayEnumLabels.PrepDay,
        date: cohort?.cohortDate
          ? dateTimeUtil.formatDateYMD(
              dateTimeUtil.addDays(
                dateTimeUtil.toDate(cohort.cohortDate),
                activePatientPlan.planType.ivfLabCohortStartDay ?? IvfLabDayEnum.DayZero,
              ),
            )
          : null,
        isEditable: !activePatientPlan.planType.serviceTypeIdToSetCohortStartDate,
        lastCohortUpdateDate: getLastCohortUpdateDetails(cohort),
      },
      procedures: cohortAppointment
        ? [
            {
              id: cohortAppointment.uuid,
              title: cohortAppointment.serviceType.name,
              date: dateTimeUtil.formatUTCDateInRFC3339Tz(cohortAppointment.start),
            },
          ]
        : [],
      ivfStatus: cohort.patientPlan.ivfLabStatus,
    }
  })
  return {
    cohorts: (await Promise.all(patientsFormatted)).filter((patient) => !!patient),
  }
}

export const getLastCohortUpdateDetails = (patientPlanCohort: PatientPlanCohort): string => {
  if (patientPlanCohort?.updatedByStaffAt && patientPlanCohort?.updatedByStaffId) {
    return `Last updated by ${abbreviatedName(patientPlanCohort.updatedByStaff)} on ${dateTimeUtil.formatToMonthsDayYearWithTime(
      patientPlanCohort.updatedByStaffAt,
    )}`
  }
  return null
}
