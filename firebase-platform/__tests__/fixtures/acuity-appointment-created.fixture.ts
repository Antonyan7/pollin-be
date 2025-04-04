import {
  Appointment,
  SchedulingSlot,
  SchedulingTimeOffBlock,
  SchedulingTimeOffBlockPeriod,
  ServiceProvider,
  SlotStatus,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  MockAcuityPatientFirstNameForAlreadyExistPatient,
  MockAcuityPatientLastNameForAlreadyExistPatient,
  MockAppointmentAcuityResponse,
  MockPatAndAcuityAppointmentAlreadyExist,
} from '@libs/common/adapters/__mocks__/acuity.adapter'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {Patient, PriorityStatus} from '@libs/data-layer/apps/users/entities/typeorm'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {getAcuityAppointmentDateOfBirth} from '@libs/common/helpers/date.helper'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {ServiceCategoryInputSeed} from '@seeds/typeorm'
import {GoogleAdConversion} from '@libs/data-layer/apps/google-ads/entities/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {QuestionnaireJourneyMilestone} from '@libs/data-layer/apps/questionnaires/enums/questionnaire-enums'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const serviceProviderId = 438800105
export const serviceCategoryId = 438800109
export const serviceTypeId = 438800110
export const appointmentIdForAlreadyExistAcuityApp = 438800113
export const patientIdForAlreadyExistApp = 438800115
export const patientIdNotMatchName = 438800116
export const schedulingTimeOffBlockId = 438800116
export const acuityId = 345459798
export const priorityStatusId = 345459798
export const schedulingTimeOffBlockPeriodId = 345459798

export const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  externalProviderIDForAcuity: MockAppointmentAcuityResponse.calendarID,
}

export const priorityStatusData: Partial<PriorityStatus> = {
  id: priorityStatusId,
  name: 'priorityStatusData',
  abbreviation: 'abbreviation',
  textColor: 'textColor',
  borderColor: 'borderColor',
  isSelectable: true,
  isPrimaryDefault: true,
  isPartnerDefault: false,
  sequence: 1,
}

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

export const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  price: 33,
  serviceCategoryId,
  externalServiceTypeIDForAcuity: MockAppointmentAcuityResponse.appointmentTypeID,
  durationInMinutes: 30,
}

export const googleAdConversionData: Partial<GoogleAdConversion> = {
  id: 444666,
  acuityId,
  googleClickId: 'googleClickId',
}

//used for a few test cases:
// 1. just patient exist
// 2. patient exist but app not exist
// 3.And maybe pat exist and ap already has ExternalAcuityAppId
export const patientDataForAlreadyExistApp: Partial<Patient> = {
  id: patientIdForAlreadyExistApp,
  authUserId: AuthUserFixture.acuityPatientAlreadyExist.uid,
  patientIdentifier: 'PID123145',
  firstName: MockAcuityPatientFirstNameForAlreadyExistPatient,
  lastName: MockAcuityPatientLastNameForAlreadyExistPatient,
  dateOfBirth: getAcuityAppointmentDateOfBirth(MockAppointmentAcuityResponse),
}

export const patientDataNotMatchName: Partial<Patient> = {
  id: patientIdNotMatchName,
  authUserId: AuthUserFixture.acuityWebhookPatientExistDiffName.uid,
  patientIdentifier: 'PID1233145',
  firstName: 'AcuityFirstNamedd',
  lastName: 'AcuityLastNameDD',
  dateOfBirth: getAcuityAppointmentDateOfBirth(MockAppointmentAcuityResponse),
}

export const schedulingTimeOffBlockPeriodData: Partial<SchedulingTimeOffBlockPeriod> = {
  id: schedulingTimeOffBlockPeriodId,
  uuid: '7b52fcd8-22d3-11ed-84f7-0242ac110002',
  serviceProviderId,
  placeHolder: 'schedulingTimeOffBlockPeriodData',
  repeatWeeksCount: 0,
  isActiveOnSunday: false,
  isActiveOnMonday: false,
  isActiveOnTuesday: false,
  isActiveOnWednesday: false,
  isActiveOnThursday: false,
  isActiveOnFriday: false,
  isActiveOnSaturday: false,
  startDay: '2029-05-04',
  endDay: '2029-05-07',
  startTime: dateTimeUtil.toDate('2029-05-04'),
  endTime: dateTimeUtil.toDate('2029-05-04'),
}

export const schedulingTimeOffBlockData: Partial<SchedulingTimeOffBlock> = {
  id: schedulingTimeOffBlockId,
  uuid: '7b52fcd8-22d3-11ed-84f7-0242ac110002',
  startDate: dateTimeUtil.toDate(MockAppointmentAcuityResponse.datetime),
  endDate: dateTimeUtil.addMinutes(
    dateTimeUtil.toDate(MockAppointmentAcuityResponse.datetime),
    serviceTypeData.durationInMinutes,
  ),
  serviceProviderId,
  schedulingTimeOffBlockPeriodId,
}

export const appointmentDataForAlreadyExistAcuityApp: Partial<Appointment> = {
  id: appointmentIdForAlreadyExistAcuityApp,
  status: AppointmentStatus.Booked,
  patientId: patientIdForAlreadyExistApp,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  identifier: 'A123123155',
  externalAppointmentIDForAcuity: MockPatAndAcuityAppointmentAlreadyExist,
}

//needed in main case - when we creating IC app where need to get journeyMilestone
export const questionnaireWithPatientIntakeFemaleCompletedData: Partial<Questionnaire> = {
  id: 538850109,
  uuid: '3ceaddfa-9048-11ee-b9d1-0242ac120002',
  journeyMilestone: QuestionnaireJourneyMilestone.PatientIntakeFemale,
}
export const appStart = dateTimeUtil.toDate(MockAppointmentAcuityResponse.datetime)
export const appEnd = dateTimeUtil.addMinutes(
  dateTimeUtil.toDate(MockAppointmentAcuityResponse.datetime),
  serviceTypeData.durationInMinutes,
)
export const schedulingSlotData: Partial<SchedulingSlot> = {
  id: 1,
  uuid: '12c01d0f-4914-48a2-86df-715d0d711e61',
  serviceProviderId,
  startTime: appStart,
  endTime: appEnd,
  status: SlotStatus.Busy,
  serviceTypeId,
}
