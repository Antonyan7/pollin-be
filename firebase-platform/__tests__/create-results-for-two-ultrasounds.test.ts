import {testPubSubEvent} from '@functions-types'

import {
  PatientSeed,
  TestTypeSeed,
  LabInfoSeed,
  TestResultSeed,
  ServiceProviderSeed,
  TestOrderSeed,
  ServiceCategoryInputSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  TestOrderItemSeed,
  SuperTypeSeed,
  MilestoneToTestTypeOrPanelSeed,
  PatientMilestoneSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  LabInfo,
  TestType,
  TestOrder,
  TestOrderItem,
  TestResult,
  SuperType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {MilestoneToTestTypeOrPanel, Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus, SystemAuthUserId} from '@libs/common/enums'

import {
  LabInfoType,
  TestOrderStatusEnum,
  TestResultStatus,
  ResultStatusForPatient,
} from '@libs/data-layer/apps/clinic-test/enums'
import {v4} from 'uuid'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {handlerCreateTestResultForUltrasound} from '../functions/test-orders-and-results/src/create-results-for-ultrasound/handler'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {
  AppointmentsCreatedPubSubPayload,
  AppointmentsCreatedSchema,
} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

jest.setTimeout(10000)

jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('@google-cloud/logging-bunyan')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const patientId = 988800101
const testTypeFollMonId = 988800102
const testTypeDay3Id = 988800103
const labId = 988800105
const serviceProviderId = 988800106
const testOrderId = 988800107
const testOrderItemFollMonId = 988800108
const testOrderItemDay3Id = 988800109
const appointmentFollMonId = 988800111
const appointmentDay3Id = 988800112
const serviceCategoryId = 988800113
const serviceTypeFollMonId = 988800114
const serviceTypeDay3Id = 988800115
const appointmentFollMonUUID = v4()
const appointmentDay3UUID = v4()

export const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: 'CF_TEST_AUTH_ID_ULTRASOUNDTWO',
  firstName: 'CF_TEST_NAME_ULTRASOUNDTWO',
  lastName: 'CF_TEST_LAST_NAME_ULTRASOUNDTWO',
  middleName: 'CF_TEST_MIDDLE_NAME_ULTRASOUNDTWO',
  serviceProviderId,
}

const testOrderData: Partial<TestOrder> = {
  id: testOrderId,
  uuid: v4(),
  patientId: patientId,
  status: TestOrderStatusEnum.NotCollected,
}

// 1 testOrder has 2 diff ultrasounds
const testOrderItemFollMonData: Partial<TestOrderItem> = {
  id: testOrderItemFollMonId,
  testOrderId: testOrderId,
  testTypeId: testTypeFollMonId,
}

const testOrderItemFollDay3Data: Partial<TestOrderItem> = {
  id: testOrderItemDay3Id,
  testOrderId: testOrderId,
  testTypeId: testTypeDay3Id,
}

const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  uuid: v4(),
  title: 'title',
  imageURL: 'IMG',
  description: 'description',
  designation: 'designation',
}

export const labInfoData: Partial<LabInfo> = {
  id: labId,
  uuid: v4(),
  name: 'Laboratory Name',
  location: 'Address',
  phone: '+454545454545',
  type: LabInfoType.Internal,
}

export const testTypeFollMonData: Partial<TestType> = {
  id: testTypeFollMonId,
  uuid: v4(),
  title: 'Foll Monitoring',
  unit: 'ml',
  labId: labId,
  serviceTypeId: serviceTypeFollMonId,
}

export const testTypeDay3Data: Partial<TestType> = {
  id: testTypeDay3Id,
  uuid: v4(),
  title: 'Day 3',
  unit: 'ml',
  labId: labId,
  serviceTypeId: serviceTypeDay3Id,
}

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

export const serviceTypeFollMonData: Partial<ServiceType> = {
  id: serviceTypeFollMonId,
  serviceCategoryId: serviceCategoryId,
}

export const serviceTypeDay3Data: Partial<ServiceType> = {
  id: serviceTypeDay3Id,
  serviceCategoryId: serviceCategoryId,
}

export const superTypeDI: Partial<SuperType> = {
  id: 50,
  name: 'DI Super Type',
  specialWorkflow: ServiceTypeWorkflow.DiagnosticImaging,
}

export const appointmentFollMonData: Partial<Appointment> = {
  id: appointmentFollMonId,
  uuid: appointmentFollMonUUID,
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeFollMonId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  testOrderId: testOrderId,
}

export const appointmentDay3Data: Partial<Appointment> = {
  id: appointmentDay3Id,
  uuid: appointmentDay3UUID,
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeDay3Id,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  testOrderId: testOrderId,
}

const milestoneFollMon: Partial<PatientMilestone> = {
  id: 40001,
  patientId,
  testOrderId,
  dominantAppointmentId: appointmentFollMonData.id,
}

const milestoneFollMonTests: Partial<MilestoneToTestTypeOrPanel> = {
  id: 501,
  patientMilestoneId: milestoneFollMon.id,
  testTypeId: testTypeFollMonData.id,
}

const milestoneDay3: Partial<PatientMilestone> = {
  id: 40002,
  patientId,
  testOrderId,
  dominantAppointmentId: appointmentDay3Data.id,
}

const milestoneDay3Tests: Partial<MilestoneToTestTypeOrPanel> = {
  id: 502,
  patientMilestoneId: milestoneDay3.id,
  testTypeId: testTypeDay3Data.id,
}

describe('Firebase Function: create-results-for-specimen', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let labInfoSeed: LabInfoSeed
  let testTypeSeed: TestTypeSeed
  let serviceProviderSeed: ServiceProviderSeed
  let testResultSeed: TestResultSeed
  let testOrderSeed: TestOrderSeed
  let testOrderItemSeed: TestOrderItemSeed
  let serviceCategorySeed: ServiceCategorySeed
  let serviceTypeSeed: ServiceTypeSeed
  let superTypeSeed: SuperTypeSeed
  let milestoneSeed: PatientMilestoneSeed
  let milestoneTestSeed: MilestoneToTestTypeOrPanelSeed
  let appointmentSeed: AppointmentSeed
  let testResultFollMonId = null
  let testResultDay3Id = null

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    labInfoSeed = new LabInfoSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    testOrderItemSeed = new TestOrderItemSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    milestoneSeed = new PatientMilestoneSeed(dataSource)
    milestoneTestSeed = new MilestoneToTestTypeOrPanelSeed(dataSource)

    await serviceCategorySeed.createArray([serviceCategoryData])
    await superTypeSeed.create(superTypeOtherFixture)
    await superTypeSeed.create(superTypeDI)
    await serviceTypeSeed.createArray([serviceTypeFollMonData, serviceTypeDay3Data])

    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.create(patientData)

    await labInfoSeed.create(labInfoData)
    await testTypeSeed.createArray([testTypeFollMonData, testTypeDay3Data])

    await testOrderSeed.create(testOrderData)
    await testOrderItemSeed.createArray([testOrderItemFollMonData, testOrderItemFollDay3Data])

    await appointmentSeed.createArray([appointmentFollMonData, appointmentDay3Data])

    await milestoneSeed.createArray([milestoneFollMon, milestoneDay3])
    await milestoneTestSeed.createArray([milestoneFollMonTests, milestoneDay3Tests])

    await serviceTypeSeed.setSuperType(serviceTypeDay3Data.id, superTypeDI.id)
    await serviceTypeSeed.setSuperType(serviceTypeFollMonData.id, superTypeDI.id)
  })

  // 2 tests for 1 testOrder - for each app it should create proper testResult.testType
  test('Should create Pending test results for Foll Monitoring (when there are 2 orderItems in 1 testOrder)', async () => {
    const data: AppointmentsCreatedPubSubPayload = {
      appointmentIds: [appointmentFollMonId],
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    await handlerCreateTestResultForUltrasound(message)

    /**
     * Checking created testResult in db
     */
    const patientTestResults = await testResultSeed.findByPatientId(patientId)
    const testResultForApp = patientTestResults.find(
      (testResult) => testResult.appointmentId == appointmentFollMonId,
    )
    testResultFollMonId = testResultForApp.id //to delete later

    expect(testResultForApp).toMatchObject({
      status: TestResultStatus.Pending,
      statusForPatient: ResultStatusForPatient.Pending,
      testTypeId: testTypeFollMonId,
      patientId,
      orderingPhysicianId: serviceProviderId,
      appointmentId: appointmentFollMonId,
      updatedBy: SystemAuthUserId.UltrasoundResultCreator,
    } as TestResult)
  })

  test('Should create Pending test results for Day 3 (when there are 2 orderItems in 1 testOrder)', async () => {
    const data: AppointmentsCreatedPubSubPayload = {
      appointmentIds: [appointmentDay3Id],
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    await handlerCreateTestResultForUltrasound(message)

    /**
     * Checking created testResult in db
     */
    const patientTestResults = await testResultSeed.findByPatientId(patientId)
    const testResultForApp = patientTestResults.find(
      (testResult) => testResult.appointmentId == appointmentDay3Id,
    )
    testResultDay3Id = testResultForApp.id //to delete later

    expect(testResultForApp).toMatchObject({
      status: TestResultStatus.Pending,
      statusForPatient: ResultStatusForPatient.Pending,
      testTypeId: testTypeDay3Id, //should be proper testTypeId
      patientId,
      orderingPhysicianId: serviceProviderId,
      appointmentId: appointmentDay3Id,
      updatedBy: SystemAuthUserId.UltrasoundResultCreator,
    } as TestResult)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await testResultSeed.removeByIds([testResultFollMonId, testResultDay3Id])
    await appointmentSeed.removeByIds([appointmentFollMonId, appointmentDay3Id])
    await serviceTypeSeed.removeByIds([serviceTypeFollMonId, serviceTypeDay3Id])
    await superTypeSeed.removeByIds([superTypeDI.id, superTypeOtherFixture.id])
    await serviceCategorySeed.removeById(serviceCategoryId)
    await serviceProviderSeed.removeById(serviceProviderId)
    await patientSeed.removePatientByAuthUserId(patientData.authUserId)
    await testOrderSeed.removeByIds([testOrderId])
    await testOrderItemSeed.removeByIds([testOrderItemFollMonId, testOrderItemDay3Id])
    await labInfoSeed.removeByIds([labId])
    await testTypeSeed.removeByIds([testTypeFollMonId, testTypeDay3Id])
  })
})
