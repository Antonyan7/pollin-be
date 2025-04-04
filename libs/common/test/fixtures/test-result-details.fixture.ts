import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  patientForGetSpermCryoListFixture,
  patientForMaleIcFormFixture,
  patientForPlanPartnerFixture,
  patientForPlanTypesFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {
  specimenCollectedWithSemenFormFixture,
  specimenForHCGWorkSheetFixture,
  specimenForPlanCreationFixture,
  specimenForPrimingFixture,
  specimenForPrimingOlderFixture,
  specimenForSpermCryoWithCryoVialsFixture,
  specimenForStimSheetFixture,
  specimenForStimSheetLatestFixture,
  specimenWithRejectedFixture,
} from '@libs/common/test/fixtures/specimen.fixture'
import {
  testTypeAntiSpermFixture,
  testTypeBloodGroupScreenFixture,
  testTypeE2Fixture,
  testTypeForUltrasoundDay3Fixture,
  testTypeForUltrasoundFolliclesFixture,
  testTypeSemenCultureFixture,
  testTypeSpermCryoFixture,
} from '@libs/common/test/fixtures/test-type.fixture'
import {labInfoFixture} from '@libs/common/test/fixtures/lab-info.fixture'
import {serviceProviderFixture} from '@libs/common/test/fixtures/service-provider.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  appointmentForHCGSheetHormoneFixture,
  appointmentForStimSheetForNotCompletedResultFixture,
  appointmentForStimSheetHormoneFixture,
  appointmentForStimSheetLatestFixture,
  appointmentForStimSheetLatestHormoneFixture,
  appointmentForStimSheetUltrasoundFixture,
  appointmentWithSameStimSheetDateFixture,
  appointmentWithTestResultsFixture,
} from './appointment.fixture'
import {
  FinalResultType,
  ResultStatusForPatient,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

const patientForTestResultId: number = 25
//ids should start from 71
export const testResultWithRejectedStatusFixture: Partial<TestResult> = {
  id: 71,
  uuid: '57a27260-1bcc-4b52-bf20-308ce00f83be',
  patientId: patientForTestResultId,
  status: TestResultStatus.Rejected,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenWithRejectedFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: null,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForPlanPartnerFixture: Partial<TestResult> = {
  id: 72,
  uuid: '11b31dd9-4c5b-400e-acc8-5df509f9f7db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Normal,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenForPlanCreationFixture.id,
  testTypeId: testTypeAntiSpermFixture.id,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForSemenSpecimenCollectedFixture: Partial<TestResult> = {
  id: 73,
  uuid: '10b31dd9-4c5a-400e-acc8-5df509f9f7db',
  patientId: patientForMaleIcFormFixture.id,
  status: TestResultStatus.Pending,
  testResultKind: TestResultKind.TestType,
  specimenId: specimenCollectedWithSemenFormFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForStimSheetLatestFixture: Partial<TestResult> = {
  id: 74,
  uuid: '10b31dd9-4c5a-400e-acc8-5df509f9f1db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Completed,
  specimenId: specimenForStimSheetLatestFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForStimSheetLatestHormoneFixture.id,
}

export const testResultForStimSheetFixture: Partial<TestResult> = {
  id: 75,
  uuid: '10b31dd9-4c5a-400e-acc8-5df509f9f2db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Completed,
  specimenId: specimenForStimSheetFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForStimSheetHormoneFixture.id,
}

export const testResultStimSheetUterusFixture: Partial<TestResult> = {
  id: 78,
  uuid: '10b31dd9-4c5a-400e-acc8-5df519f9f2db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Released,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForStimSheetUltrasoundFixture.id,
  createdAt: dateTimeUtil.toDate('2020-01-05T13:00:00'),
  testTypeId: testTypeForUltrasoundDay3Fixture.id,
}

export const testResultStimSheetUterusLatestFixture: Partial<TestResult> = {
  id: 79,
  uuid: '10b31dd9-4c5a-220e-acc8-5df519f9f2db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Reviewed,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForStimSheetLatestFixture.id,
  createdAt: dateTimeUtil.toDate('2020-01-05T13:10:00'),
  testTypeId: testTypeForUltrasoundFolliclesFixture.id,
}

export const testResultForSpermCryoReleasedFixture: Partial<TestResult> = {
  id: 80,
  uuid: '50246d8e-7a56-442a-8078-0f5b3317a3fc',
  patientId: patientForGetSpermCryoListFixture.id,
  specimenId: specimenForSpermCryoWithCryoVialsFixture.id,
  labId: labInfoFixture.id,
  testTypeId: testTypeSpermCryoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  releasedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  appointmentId: appointmentWithTestResultsFixture.id,
}

export const testResultForHCGWorkSheetFixture: Partial<TestResult> = {
  id: 81,
  uuid: '10b31dd9-5c5b-200e-acc8-5df509f9f2db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Completed,
  specimenId: specimenForHCGWorkSheetFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForHCGSheetHormoneFixture.id,
}

export const testResultWithSameStimSheetDateFixture: Partial<TestResult> = {
  id: 82,
  uuid: '10b31dd9-5c5a-400e-acb8-5df509f9f1db',
  patientId: patientForPlanTypesFixture.id,
  status: TestResultStatus.Completed,
  specimenId: specimenForStimSheetLatestFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentWithSameStimSheetDateFixture.id,
}

export const testResultForStimSheetToReleaseFixture: Partial<TestResult> = {
  id: 83,
  uuid: '11b31dd9-4c5a-400e-acc8-5df509f9f2db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Reviewed,
  specimenId: specimenForStimSheetFixture.id,
  testTypeId: testTypeBloodGroupScreenFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForStimSheetHormoneFixture.id,
}

export const testResultForPrimingFixture: Partial<TestResult> = {
  id: 10084,
  uuid: '12b31dd9-4c5a-302e-acc8-5df509f9f2db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Reviewed,
  specimenId: specimenForPrimingFixture.id,
  testTypeId: testTypeSemenCultureFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
}

export const testResultForPrimingOlderFixture: Partial<TestResult> = {
  id: 10085,
  uuid: '12331dd9-4c5a-302e-acc8-5df509f9f2db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.Reviewed,
  specimenId: specimenForPrimingOlderFixture.id,
  testTypeId: testTypeSemenCultureFixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  completedOn: dateTimeUtil.toDate('2020-01-05T13:10:00'),
}

export const testResultForStimSheetNotCompletedFixture: Partial<TestResult> = {
  id: 10086,
  uuid: '10b31dd2-3c5b-400e-acc8-5df509f9f1db',
  patientId: patientForPlanPartnerFixture.id,
  status: TestResultStatus.WaitingCompletion,
  specimenId: specimenForStimSheetLatestFixture.id,
  testTypeId: testTypeE2Fixture.id,
  labId: labInfoFixture.id,
  orderingPhysicianId: serviceProviderFixture.id,
  appointmentId: appointmentForStimSheetForNotCompletedResultFixture.id,
}
