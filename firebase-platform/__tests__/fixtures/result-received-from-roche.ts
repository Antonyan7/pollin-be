import {DateTimeUtil} from '@libs/common'
import {
  LabInfo,
  Specimen,
  TestOrder,
  TestResult,
  TestResultMeasurement,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  FinalResultType,
  ResultStatusForPatient,
  SpecimenProcessingLocation,
  SpecimenStatus,
  TestOrderStatusEnum,
  TestResultKind,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {ServiceProvider, ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {UserType} from '@libs/services-common/enums'

const dateTimeUtil = new DateTimeUtil()

export const rochePatientFixture: Partial<Patient> = {
  id: 100567,
  uuid: '1651cf57-2a3f-47f0-8790-c776ha1e1009',
  authUserId: 'authUserId-c776fa1e1009',
  firstName: 'Roche',
  lastName: 'Patient',
  middleName: 'Roche',
  stripeCustomerId: 'stripeCustomerId',
  userType: UserType.Patient,
}

export const rocheLabInfoFixture: Partial<LabInfo> = {
  id: 200436,
  uuid: '6d7bg20b-1117-4cdc-8705-63f1fecd1006',
  name: 'Roche',
  location: 'Roche Street',
  phone: '+454545441015',
}

export const rocheTestOrderFixture: Partial<TestOrder> = {
  id: 1003425,
  uuid: 'testOrder132d-11ed-811e-024wac121005',
  patientId: rochePatientFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
}

export const rocheServiceTypeFixture: Partial<ServiceType> = {
  id: 1043088,
  uuid: 'uuid-222-333-444-953',
  name: 'Roche Service',
  durationInMinutes: 30,
  price: 100,
  milestoneSummary: 'Rohce',
  longDescription: 'Roche',
  shortDescription: 'Roche',
}

export const rocheSpecimenFixture: Partial<Specimen> = {
  id: 2001,
  uuid: 'testSpFix132d-11ed-811e-0242tp121005',
  specimenIdentifier: 'S0000007005',
  patientId: rochePatientFixture.id,
  specimenGroupId: null,
  machineId: null,
  status: SpecimenStatus.InProgress,
  collectedOn: dateTimeUtil.now(),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: rocheTestOrderFixture.id,
  serviceTypeId: rocheServiceTypeFixture.id,
}

export const rocheCollectedSpecimenFixture: Partial<Specimen> = {
  id: 20022,
  uuid: 'testSpFix132d-11ed-811e-0242tp121022',
  specimenIdentifier: 'S0000007022',
  patientId: rochePatientFixture.id,
  specimenGroupId: null,
  machineId: null,
  status: SpecimenStatus.Collected,
  collectedOn: dateTimeUtil.now(),
  processingLocation: SpecimenProcessingLocation.TransportOutside,
  testOrderId: rocheTestOrderFixture.id,
  serviceTypeId: rocheServiceTypeFixture.id,
}

export const rocheTestTypeFixture: Partial<TestType> = {
  id: 24303,
  title: 'Roche',
  uuid: 'some-uuid-0242tt121005',
  labId: rocheLabInfoFixture.id,
  specimenGroupId: null,
  hostCode: 750,
}

export const rocheServiceProvider: Partial<ServiceProvider> = {
  id: 145010,
  uuid: 'c6c908f5-132d-11ed-814e-0256ac110002',
  title: 'Dr. Roche',
  imageURL: 'IMG',
  description: 'Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: null,
}

export const rocheTestResultFixture: Partial<TestResult> = {
  id: 143202,
  patientId: rochePatientFixture.id,
  labId: rocheLabInfoFixture.id,
  status: TestResultStatus.Pending,
  finalResult: FinalResultType.Normal,
  specimenId: rocheSpecimenFixture.id,
  testResultKind: TestResultKind.TestPanel,
  testTypeId: rocheTestTypeFixture.id,
  comment: 'MTO Test Result comment',
  statusForPatient: ResultStatusForPatient.Pending,
  orderingPhysicianId: rocheServiceProvider.id,
  completedOn: null,
}

export const rocheMeasurement: Partial<TestResultMeasurement> = {
  id: 5558,
  testResultId: rocheTestResultFixture.id,
  testTypeId: rocheTestTypeFixture.id,
  result: null,
}
