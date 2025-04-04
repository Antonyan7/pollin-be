import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  SpecimenSeed,
  TestPanelSeed,
  TestOrderItemSeed,
  TestOrderSeed,
  SpecimenGroupSeed,
  LabInfoSeed,
  LabMachineSeed,
  PatientSeed,
  ServiceProviderGroupSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  TestTypeSeed,
  AppointmentSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  labInfoFixture,
  labMachineFixture,
  patientFixture,
  patientForProcedureFixture,
  serviceProviderFixture,
  serviceProviderGroupDoctor,
  serviceTypeFixture,
  serviceTypeSemenFixture,
  serviceTypeSwabFixture,
  serviceTypeUrineFixture,
  specimenGroupFixture,
  specimenOfTestOrderCancelFixture,
  testOrderFixture,
  testOrderItemFixture,
  testOrderItemForSemenFixture,
  testOrderItemForSwabFixture,
  testOrderItemForUrineFixture,
  testOrderItemProcedureFixture,
  testOrderProcedureFixture,
  testOrderToCancelFixture,
  testPanelFixture,
  testPanelProcedureFixture,
  testTypeSemenFixture,
  testTypeSwabFixture,
  testPanelUrineFixture,
  testOrderItemCMBloodFixture,
  testOrderItemDropoffSemenFixture,
  serviceTypeCMBloodFixture,
  testTypeCMBloodFixture,
  testTypeSemenDropoffFixture,
  serviceTypeSemenDropoffFixture,
  testOrderWithOrderActionFixture,
  testOrderItemOrderActionBloodFixture,
  testOrderItemOrderActionSwabFixture,
  testOrderItemOrderActionUrineFixture,
  testOrderItemOrderActionSemenFixture,
  appointmentUrineFixture,
  appointmentBloodFixture,
  appointmentSemenFixture,
  appointmentSwabFixture,
  superTypeBlood,
  superTypeSemen,
  superTypeSwab,
  superTypeUrine,
  appointmentOrderFixture,
  testTypeCervicalSwabFixture,
  testOrderItemForCervicalSwabFixture,
  appointmentBiopsyFixture,
  serviceTypeBiopsyFixture,
  superTypeBiopsy,
  testOrderItemOrderActionBiopsyFixture,
  testPanelBiopsyFixture,
} from './fixtures/manage-test-orders-crud-collateral.fixture'
import {mockedAuditMetadata} from './fixtures/audit.fixture'
import {
  handlerGenerateSpecimenForOrderAppointment,
  handlerGenerateSpecimensForBookedAppointments,
} from '../functions/test-orders-and-results/src/appointment-to-specimen/handler'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {GenerateSpecimenSchema} from '@libs/common/model/proto-schemas/generata-specimen.schema'
import {GenerateTestResultSchema} from '@libs/common/model/proto-schemas/generate-test-result.schema'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {handlerGenerateTestResultForOrderAppointment} from '../functions/test-orders-and-results/src/create-results-for-appointment/handler'

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')

let superTypeSeed: SuperTypeSeed
let specimenSeed: SpecimenSeed
let testPanelSeed: TestPanelSeed
let testTypeSeed: TestTypeSeed
let testOrderItemSeed: TestOrderItemSeed
let testOrderSeed: TestOrderSeed

let specimenGroupSeed: SpecimenGroupSeed
let labInfoSeed: LabInfoSeed
let labMachineSeed: LabMachineSeed
let patientSeed: PatientSeed
let serviceTypeSeed: ServiceTypeSeed
let serviceProviderSeed: ServiceProviderSeed
let serviceProviderGroupSeed: ServiceProviderGroupSeed

let appointmentSeed: AppointmentSeed

describe('Firebase Function: Manage test orders crud collateral', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    superTypeSeed = new SuperTypeSeed(dataSource)

    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    specimenSeed = new SpecimenSeed(dataSource)
    testPanelSeed = new TestPanelSeed(dataSource)
    testTypeSeed = new TestTypeSeed(dataSource)
    testOrderItemSeed = new TestOrderItemSeed(dataSource)
    testOrderSeed = new TestOrderSeed(dataSource)

    labInfoSeed = new LabInfoSeed(dataSource)
    specimenGroupSeed = new SpecimenGroupSeed(dataSource)
    labMachineSeed = new LabMachineSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceProviderGroupSeed = new ServiceProviderGroupSeed(dataSource)

    appointmentSeed = new AppointmentSeed(dataSource)

    await superTypeSeed.create(superTypeOtherFixture)
    await superTypeSeed.create(superTypeBlood)
    await superTypeSeed.create(superTypeSemen)
    await superTypeSeed.create(superTypeSwab)
    await superTypeSeed.create(superTypeUrine)
    await superTypeSeed.create(superTypeBiopsy)

    await serviceTypeSeed.create(serviceTypeFixture)
    await serviceTypeSeed.create(serviceTypeSemenFixture)
    await serviceTypeSeed.create(serviceTypeSwabFixture)
    await serviceTypeSeed.create(serviceTypeUrineFixture)
    await serviceTypeSeed.create(serviceTypeCMBloodFixture)
    await serviceTypeSeed.create(serviceTypeSemenDropoffFixture)
    await serviceTypeSeed.create(serviceTypeBiopsyFixture)

    await serviceTypeSeed.setSuperType(serviceTypeFixture.id, superTypeBlood.id)
    await serviceTypeSeed.setSuperType(serviceTypeSemenFixture.id, superTypeSemen.id)
    await serviceTypeSeed.setSuperType(serviceTypeSwabFixture.id, superTypeSwab.id)
    await serviceTypeSeed.setSuperType(serviceTypeUrineFixture.id, superTypeUrine.id)
    await serviceTypeSeed.setSuperType(serviceTypeBiopsyFixture.id, superTypeBiopsy.id)

    await labInfoSeed.create(labInfoFixture)
    await specimenGroupSeed.create(specimenGroupFixture)

    await testPanelSeed.create(testPanelFixture)
    await testPanelSeed.create(testPanelProcedureFixture)
    await testPanelSeed.create(testPanelUrineFixture)
    await testPanelSeed.create(testPanelBiopsyFixture)

    await testTypeSeed.create(testTypeSemenFixture)
    await testTypeSeed.create(testTypeSwabFixture)
    await testTypeSeed.create(testTypeCervicalSwabFixture)
    await testTypeSeed.create(testTypeCMBloodFixture)
    await testTypeSeed.create(testTypeSemenDropoffFixture)

    await labMachineSeed.create(labMachineFixture)
    await serviceProviderGroupSeed.create(serviceProviderGroupDoctor)
    await serviceProviderSeed.create(serviceProviderFixture)
    await Promise.all([
      patientSeed.create(patientFixture),
      patientSeed.create(patientForProcedureFixture),
    ])

    await testOrderSeed.create(testOrderFixture)
    await testOrderSeed.create(testOrderProcedureFixture)
    await testOrderSeed.create(testOrderToCancelFixture)
    await testOrderSeed.create(testOrderWithOrderActionFixture)

    await testOrderItemSeed.create(testOrderItemFixture)
    await testOrderItemSeed.create(testOrderItemForSemenFixture)
    await testOrderItemSeed.create(testOrderItemForSwabFixture)
    await testOrderItemSeed.create(testOrderItemForUrineFixture)
    await testOrderItemSeed.create(testOrderItemProcedureFixture)
    await testOrderItemSeed.create(testOrderItemCMBloodFixture)
    await testOrderItemSeed.create(testOrderItemDropoffSemenFixture)
    // Order Action Items
    await testOrderItemSeed.create(testOrderItemOrderActionBloodFixture)
    await testOrderItemSeed.create(testOrderItemOrderActionUrineFixture)
    await testOrderItemSeed.create(testOrderItemOrderActionSwabFixture)
    await testOrderItemSeed.create(testOrderItemForCervicalSwabFixture)
    await testOrderItemSeed.create(testOrderItemOrderActionSemenFixture)
    await testOrderItemSeed.create(testOrderItemOrderActionBiopsyFixture)

    await specimenSeed.create(specimenOfTestOrderCancelFixture)

    await appointmentSeed.create(appointmentBloodFixture)
    await appointmentSeed.create(appointmentUrineFixture)
    await appointmentSeed.create(appointmentSemenFixture)
    await appointmentSeed.create(appointmentSwabFixture)
    await appointmentSeed.create(appointmentBiopsyFixture)
    await appointmentSeed.create(appointmentOrderFixture)
  })

  test('should generate specimens for Appointment with Super Type', async () => {
    const data = {
      appointmentIds: [
        appointmentBloodFixture.id,
        appointmentSemenFixture.id,
        appointmentUrineFixture.id,
        appointmentSwabFixture.id,
        appointmentBiopsyFixture.id,
      ],
      ...mockedAuditMetadata,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    const results = await handlerGenerateSpecimensForBookedAppointments(message)

    expect(results.every((result) => !!result)).toBe(true)

    const specimenBlood = await specimenSeed.getByAppointmentId(appointmentBloodFixture.id)
    const specimenBiopsy = await specimenSeed.getByAppointmentId(appointmentBiopsyFixture.id)

    expect(specimenBlood.serviceTypeId).toBe(appointmentBloodFixture.serviceTypeId)
    expect(specimenBiopsy.serviceTypeId).toBe(appointmentBiopsyFixture.serviceTypeId)
  })

  test('should generate or link specimens for Appointment ForOrderAppointment', async () => {
    const data = {
      appointmentId: appointmentOrderFixture.id,
      ...mockedAuditMetadata,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, GenerateSpecimenSchema))

    await handlerGenerateSpecimenForOrderAppointment(message)
    const specimen = await specimenSeed.getByAppointmentId(appointmentOrderFixture.id)
    expect(specimen.appointmentId).toEqual(appointmentOrderFixture.id)

    const relatedAppointment = await appointmentSeed.findById(appointmentOrderFixture.id)
    expect(relatedAppointment.specimenGenerationInProgress).toBe(false)
    expect(relatedAppointment.lastSpecimenGenerationFailedOn).toBe(null)
  })

  test('should generate test results for Appointment ForOrderAppointment and keep them consistent', async () => {
    const data = {
      appointmentId: appointmentOrderFixture.id,
      ...mockedAuditMetadata,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, GenerateTestResultSchema))

    await handlerGenerateTestResultForOrderAppointment(message)

    const initialAppointment = await appointmentSeed.findById(appointmentOrderFixture.id)
    const initialTestResults = initialAppointment.testResults

    expect(initialTestResults).toBeDefined()
    expect(initialTestResults.length).toBeGreaterThan(0)

    expect(initialAppointment.testResultGenerationInProgress).toBe(false)
    expect(initialAppointment.lastTestResultGenerationFailedOn).toBeNull()

    await handlerGenerateTestResultForOrderAppointment(message)

    const updatedAppointment = await appointmentSeed.findById(appointmentOrderFixture.id)
    const updatedTestResults = updatedAppointment.testResults

    expect(updatedTestResults).toBeDefined()
    expect(updatedTestResults.length).toBeGreaterThan(0)

    expect(updatedTestResults.length).toEqual(initialTestResults.length)

    expect(updatedAppointment.testResultGenerationInProgress).toBe(false)
    expect(updatedAppointment.lastTestResultGenerationFailedOn).toBeNull()
  })

  afterAll(async () => {
    await serviceProviderGroupSeed.removeByIds([serviceProviderGroupDoctor.id])
    await specimenGroupSeed.removeByIds([specimenGroupFixture.id])
    await testPanelSeed.removeByIds([
      testPanelFixture.id,
      testPanelProcedureFixture.id,
      testPanelUrineFixture.id,
      testPanelBiopsyFixture.id,
    ])
    await testTypeSeed.removeByIds([
      testTypeSemenFixture.id,
      testTypeSwabFixture.id,
      testTypeCervicalSwabFixture.id,
    ])

    await testOrderItemSeed.removeByIds([
      testOrderItemFixture.id,
      testOrderItemProcedureFixture.id,
      testOrderItemOrderActionBiopsyFixture.id,
      testOrderItemForSemenFixture.id,
      testOrderItemForSwabFixture.id,
      testOrderItemForUrineFixture.id,
      testOrderItemOrderActionBloodFixture.id,
      testOrderItemOrderActionUrineFixture.id,
      testOrderItemOrderActionSwabFixture.id,
      testOrderItemOrderActionSemenFixture.id,
      testOrderItemForCervicalSwabFixture.id,
    ])
    await testOrderSeed.removeByIds([
      testOrderFixture.id,
      testOrderProcedureFixture.id,
      testOrderToCancelFixture.id,
      testOrderWithOrderActionFixture.id,
    ])
    await specimenSeed.removeByPatientId(patientForProcedureFixture.id)
    await labInfoSeed.removeByIds([labInfoFixture.id])
    await labMachineSeed.removeByIds([labMachineFixture.id])
    await patientSeed.removeByIds([patientFixture.id, patientForProcedureFixture.id])
    await appointmentSeed.removeByIds([
      appointmentBloodFixture.id,
      appointmentUrineFixture.id,
      appointmentSemenFixture.id,
      appointmentSwabFixture.id,
      appointmentBiopsyFixture.id,
      appointmentOrderFixture.id,
    ])

    await serviceTypeSeed.removeByIds([
      serviceTypeFixture.id,
      serviceTypeSemenFixture.id,
      serviceTypeSwabFixture.id,
      serviceTypeUrineFixture.id,
      serviceTypeBiopsyFixture.id,
    ])

    await superTypeSeed.removeByIds([
      superTypeOtherFixture.id,
      superTypeBlood.id,
      superTypeSemen.id,
      superTypeUrine.id,
      superTypeSwab.id,
      superTypeBiopsy.id,
    ])
    await serviceProviderSeed.removeByIds([serviceProviderFixture.id])

    jest.clearAllMocks()
  })
})
