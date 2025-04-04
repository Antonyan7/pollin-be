import {testPubSubEvent} from '@functions-types'
import {
  PatientSeed,
  SpecimenSeed,
  SpecimenTestSeed,
  TestTypeSeed,
  LabInfoSeed,
  SpecimenGroupSeed,
  TestResultSeed,
  ServiceProviderSeed,
  TestOrderSeed,
  ServiceCategoryInputSeed,
  AppointmentSeed,
  ServiceCategorySeed,
  ServiceTypeSeed,
  StaffSeed,
  CryoInventoryCardSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  Specimen,
  SpecimenTest,
  LabInfo,
  TestType,
  SpecimenGroup,
  TestOrder,
  SuperType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus} from '@libs/common/enums'

import {
  SpecimenStatus,
  LabInfoType,
  TestOrderStatusEnum,
} from '@libs/data-layer/apps/clinic-test/enums'
import {v4} from 'uuid'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {SpecimensCollectedSchema} from '@libs/common/model/proto-schemas/specimens-collected.schema'
import {handlerCreatePendingResultForSpecimen} from '@firebase-platform/functions/test-orders-and-results/src/create-results-for-specimen/handler'
import {mockedAuditMetadata} from './fixtures/audit.fixture'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {CryoSampleType} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

jest.setTimeout(10000)

jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})

const specimenForSpermCryoId = 111100000
const patientId = 111100000
const specimenTestForSpermCryoId = 111100001
const testTypeForSpermCryoId = 1111100001
const labId = 111100000
const specimenGroupId = 111100000
const serviceProviderId = 111100000
const testOrderId = 1111100000
const appointmentId = 1111100000
const serviceCategoryId = 111100000
const serviceTypeId = 111100000
const appointmentUUID = v4()
const staffUUID = v4()

export const patientData: Partial<Patient> = {
  id: patientId,
  authUserId: 'CF_TEST_AUTH_ID_SPECIMEN_SPERMCRYO',
  firstName: 'CF_TEST_NAME_SPECIMEN',
  lastName: 'CF_TEST_LAST_NAME_SPECIMEN',
  middleName: 'CF_TEST_MIDDLE_NAME_SPECIMEN',
  serviceProviderId,
}
const testOrderData: Partial<TestOrder> = {
  id: testOrderId,
  uuid: v4(),
  patientId: patientId,
  status: TestOrderStatusEnum.NotCollected,
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
const specimenGroupData: Partial<SpecimenGroup> = {
  id: specimenGroupId,
  title: 'title',
  color: 'color',
}

export const testTypeForSpermCryoData: Partial<TestType> = {
  id: testTypeForSpermCryoId,
  uuid: v4(),
  title: 'SpermCryo',
  labId: labId,
  specimenGroupId: specimenGroupId,
  processType: ProcessType.SpermCryo,
}

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: serviceCategoryId,
}

export const superTypeData: Partial<SuperType> = {
  id: 33333,
  name: 'For Sperm Cryo',
  specialWorkflow: ServiceTypeWorkflow.Semen,
}

export const serviceTypeData: Partial<ServiceType> = {
  id: serviceTypeId,
  serviceCategoryId: serviceCategoryId,
  superTypeId: superTypeData.id,
}
export const appointmentData: Partial<Appointment> = {
  id: appointmentId,
  uuid: appointmentUUID,
  status: AppointmentStatus.Done,
  patientId: patientId,
  serviceProviderId: serviceProviderId,
  serviceTypeId: serviceTypeId,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
}

export const staffForResults: Partial<Staff> = {
  id: 5424,
  uuid: staffUUID,
  authUserId: 'MockStaffForCF',
  email: 'fhealthdev+test@gmail.com',
}

const specimenForSpermCryoUUID = 'ac30a8ff-f4a0-4cf6-a914-b0d92c63387d'
export const specimenForSpermCryoData: Partial<Specimen> = {
  id: specimenForSpermCryoId,
  uuid: specimenForSpermCryoUUID,
  specimenIdentifier: 'S0000000666',
  patientId,
  serviceTypeId,
  specimenGroupId: specimenGroupId,
  status: SpecimenStatus.Collected,
  testOrderId,
}

export const specimenTestForSpermCryoData: Partial<SpecimenTest> = {
  id: specimenTestForSpermCryoId,
  specimenId: specimenForSpermCryoId,
  testTypeId: testTypeForSpermCryoData.id,
}

jest.mock('@google-cloud/logging-bunyan')

describe('Firebase Function: create-results-for-specimen', () => {
  let dataSource: DataSource
  let patientSeed: PatientSeed
  let specimenSeed: SpecimenSeed
  let specimenTestSeed: SpecimenTestSeed
  let labInfoSeed: LabInfoSeed
  let testTypeSeed: TestTypeSeed
  let specimenGroupSeed: SpecimenGroupSeed
  let serviceProviderSeed: ServiceProviderSeed
  let testResultSeed: TestResultSeed
  let testOrderSeed: TestOrderSeed
  let serviceCategorySeed: ServiceCategorySeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let appointmentSeed: AppointmentSeed
  let staffSeed: StaffSeed = null
  let cryoInventoryCardSeed: CryoInventoryCardSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    specimenSeed = new SpecimenSeed(dataSource)
    specimenTestSeed = new SpecimenTestSeed(dataSource)
    labInfoSeed = new LabInfoSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    specimenGroupSeed = new SpecimenGroupSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    cryoInventoryCardSeed = new CryoInventoryCardSeed(dataSource)

    await serviceCategorySeed.createArray([serviceCategoryData])
    await superTypeSeed.createArray([superTypeData])
    await serviceTypeSeed.createArray([serviceTypeData])
    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.create(patientData)
    await appointmentSeed.createArray([appointmentData])
    await labInfoSeed.create(labInfoData)
    await specimenGroupSeed.create(specimenGroupData)
    await testTypeSeed.create(testTypeForSpermCryoData)
    await testOrderSeed.create(testOrderData)
    await specimenSeed.create(specimenForSpermCryoData)
    await specimenTestSeed.create(specimenTestForSpermCryoData)
    await staffSeed.create(staffForResults)
  })

  test('Should generate Cryo Card after test result generation is finished', async () => {
    const data = {
      specimens: [
        {
          uuid: specimenForSpermCryoUUID,
          appointmentUUID,
        },
      ],
      ...mockedAuditMetadata,
      authUserId: staffForResults.authUserId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, SpecimensCollectedSchema))

    await handlerCreatePendingResultForSpecimen(message)

    const testResult = await testResultSeed.findOneByPatientId(patientId)
    expect(testResult.appointmentId).toBeTruthy()

    const cryoCardCreated = await cryoInventoryCardSeed.findOneByAppointmentId(appointmentId)

    expect(cryoCardCreated).toBeTruthy()
    expect(cryoCardCreated.sampleType).toBe(CryoSampleType.Sperm)

    // deleting after test finished
    await cryoInventoryCardSeed.removeByIds([cryoCardCreated.id])
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await staffSeed.removeByIds([staffForResults.id])
    await specimenSeed.removeByIds([specimenForSpermCryoId])
    await specimenTestSeed.removeByIds([specimenTestForSpermCryoId])
    await appointmentSeed.removeByIds([appointmentId])
    await serviceTypeSeed.removeById(serviceTypeId)
    await superTypeSeed.removeByIds([superTypeData.id])
    await serviceCategorySeed.removeById(serviceCategoryId)
    await serviceProviderSeed.removeById(serviceProviderId)
    await patientSeed.removePatientByAuthUserId(patientData.authUserId)
    await testOrderSeed.removeByIds([testOrderId])
    await labInfoSeed.removeByIds([labId])
    await testTypeSeed.removeByIds([testTypeForSpermCryoId])
  })
})
