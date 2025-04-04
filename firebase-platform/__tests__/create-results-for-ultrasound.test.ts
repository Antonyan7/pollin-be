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
import {
  AppointmentsCreatedPubSubPayload,
  AppointmentsCreatedSchema,
} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

jest.setTimeout(15000)

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

const patientId = 888800101
const testTypeId = 888800102
const labId = 888800104
const serviceProviderId = 888800105
const testOrderId = 888800106
const testOrderItemId = 888800107
const appointmentId = 888800108
const serviceCategoryId = 888800109
const serviceTypeId = 888800110
const superTypeId = 111
const appointmentUUID = v4()

export const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: 'CF_TEST_AUTH_ID_ULTRASOUND',
  firstName: 'CF_TEST_NAME_ULTRASOUND',
  lastName: 'CF_TEST_LAST_NAME_ULTRASOUND',
  middleName: 'CF_TEST_MIDDLE_NAME_ULTRASOUND',
  serviceProviderId,
}

const testOrderData: Partial<TestOrder> = {
  id: testOrderId,
  uuid: v4(),
  patientId: patientId,
  status: TestOrderStatusEnum.NotCollected,
}

const testOrderItemData: Partial<TestOrderItem> = {
  id: testOrderItemId,
  testOrderId: testOrderId,
  testTypeId: testTypeId,
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

export const testTypeData: Partial<TestType> = {
  id: testTypeId,
  uuid: v4(),
  title: 'AMH',
  unit: 'ml',
  labId: labId,
  serviceTypeId: serviceTypeId,
}

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

export const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId: serviceCategoryId,
}
export const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  uuid: appointmentUUID,
  status: AppointmentStatus.Booked,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
  testOrderId: testOrderId,
}

export const superTypeData: Partial<SuperType> = {
  id: superTypeId,
  name: 'Diagnostic Imaging',
  groupOrderActionsByWorkflow: false,
  specialWorkflow: ServiceTypeWorkflow.DiagnosticImaging,
}

const milestoneUltrasound: Partial<PatientMilestone> = {
  id: 50001,
  patientId,
  testOrderId,
  dominantAppointmentId: appointmentData.id,
}

const milestoneTestsUltrasound: Partial<MilestoneToTestTypeOrPanel> = {
  id: 601,
  patientMilestoneId: milestoneUltrasound.id,
  testTypeId: testTypeData.id,
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
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let testResultId = null
  let milestoneSeed: PatientMilestoneSeed
  let milestoneTestSeed: MilestoneToTestTypeOrPanelSeed

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
    appointmentSeed = new AppointmentSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    milestoneSeed = new PatientMilestoneSeed(dataSource)
    milestoneTestSeed = new MilestoneToTestTypeOrPanelSeed(dataSource)

    await serviceCategorySeed.createArray([serviceCategoryData])

    await superTypeSeed.create(superTypeOtherFixture)
    await superTypeSeed.create(superTypeData)

    await serviceTypeSeed.createArray([serviceTypeData])
    await serviceTypeSeed.setSuperType(serviceTypeData.id, superTypeData.id)

    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.create(patientData)

    await labInfoSeed.create(labInfoData)
    await testTypeSeed.create(testTypeData)
    await testTypeSeed.setSuperType(testTypeData.id, superTypeData.id)

    await testOrderSeed.create(testOrderData)
    await testOrderItemSeed.create(testOrderItemData)

    await appointmentSeed.createArray([appointmentData])

    await milestoneSeed.createArray([milestoneUltrasound])
    await milestoneTestSeed.createArray([milestoneTestsUltrasound])
  })

  test('Should create Pending test result for ultrasound', async () => {
    const data: Partial<AppointmentsCreatedPubSubPayload> = {
      appointmentIds: [appointmentId],
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    await handlerCreateTestResultForUltrasound(message)

    /**
     * Checking created testResult in db
     */
    const testResult = await testResultSeed.findOneByPatientId(patientId)
    expect(testResult).toBeTruthy()
    testResultId = testResult.id //to delete later

    expect(testResult).toBeTruthy()
    expect(testResult.status).toBe(TestResultStatus.Pending)
    expect(testResult.statusForPatient).toBe(ResultStatusForPatient.Pending)
    expect(testResult.testTypeId).toBe(testTypeId)
    expect(testResult.patientId).toBe(patientId)
    expect(testResult.orderingPhysicianId).toBe(serviceProviderId)
    expect(testResult.appointmentId).toBe(appointmentId)
    expect(testResult.updatedBy).toBe(SystemAuthUserId.UltrasoundResultCreator)
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await testResultSeed.removeByIds([testResultId])
    await appointmentSeed.removeByIds([appointmentId])
    await testTypeSeed.setSuperType(testTypeData.id, null)
    await serviceTypeSeed.setSuperType(testTypeData.id, null)
    await serviceTypeSeed.removeById(serviceTypeId)
    await superTypeSeed.removeByIds([superTypeData.id])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceCategorySeed.removeById(serviceCategoryId)
    await serviceProviderSeed.removeById(serviceProviderId)
    await patientSeed.removePatientByAuthUserId(patientData.authUserId)
    await testOrderSeed.removeByIds([testOrderId])
    await testOrderItemSeed.removeByIds([testOrderItemId])
    await labInfoSeed.removeByIds([labId])
    await testTypeSeed.removeByIds([testTypeId])
  })
})
