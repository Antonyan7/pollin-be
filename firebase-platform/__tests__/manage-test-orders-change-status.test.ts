/* eslint-disable max-lines */
import {FirebaseAdminProvider, initFireORM, StructuredLogger} from '@libs/common'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  SpecimenSeed,
  TestResultSeed,
  TestPanelSeed,
  TestTypeSeed,
  TestOrderItemSeed,
  TestOrderSeed,
  SpecimenGroupSeed,
  LabInfoSeed,
  LabMachineSeed,
  PatientSeed,
  ServiceProviderGroupSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  AppointmentSeed,
  PatientMilestoneSeed,
  PatientMilestoneToAppointmentSeed,
  SuperTypeSeed,
  MilestoneToTestTypeOrPanelSeed,
} from '@seeds/typeorm'
import {
  handlerAppointmentDoneOrderStatusChangeToCompleted,
  handlerSpecimenRejectedOrderStatusChangeToCompleted,
  handlerStatusChangeCollected,
  handlerStatusChangeInProgress,
  handlerStatusChangeResultUpdated,
  handlerUpdateOrderStatusForCreatedAppointment,
} from '../functions/test-orders-and-results/src/order-status/handler'
import {SpecimenUUIDSchema} from '@libs/common/model/proto-schemas/specimen-uuid.schema'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  appointmentFixture,
  appointmentForProcedurePartiallyBookedFixture,
  appointmentForRelationToMilestoneFixture,
  appointmentForSwabCollectionFixture,
  labInfoFixture,
  labMachineFixture,
  orderItemProcedureFixture,
  orderItemProcedureWithoutAppointmentFixture,
  patientFixture,
  patientMilestoneFixture,
  patientMilestoneForPartiallyBookedApptFixture,
  patientMilestonePastFixture,
  patientMilestoneToAppointmentOneFixture,
  patientMilestoneToAppointmentThreeFixture,
  patientMilestoneToAppointmentTwoFixture,
  patientMilestoneUpcomingFixture,
  serviceProviderFixture,
  serviceProviderGroupDoctor,
  serviceTypeFixture,
  serviceTypeForProcedureFixture,
  serviceTypeProcedureFixture,
  specimenCollectedForRejectionFlowFixture,
  specimenFixture,
  specimenGroupFixture,
  specimenInProgressForRejectionFlowFixture,
  specimenRejectedFixture,
  specimenRejectedForRejectedFlowFixture,
  specimenRejectedForRejectionFlowFixture,
  testOrderFixture,
  testOrderItemFixture,
  testOrderToBeBookedFixture,
  testOrderToBePartiallyBookedForProceduresFixture,
  testOrderToBePartiallyBookedFixture,
  testOrderWillBecomeAwaitingResultsFixture,
  testOrderWillBeCompletedFixture,
  testOrderWillNotBecomeCompletedFixture,
  testPanelFixtureFirebase,
  testPanelForProcedureFixture,
  testPanelWithProcedureFixture,
  testResultFixture,
  testTypeFixtureFirebase,
  testTypeLabInfoFixture,
  testTypeLabMachineFixture,
  testTypePatientFixture,
  testTypeServiceProviderFixture,
  testTypeServiceProviderGroupDoctor,
  testTypeSpecimenFixture,
  testTypeSpecimenGroupFixture,
  testTypeTestOrderFixture,
  testTypeTestOrderItemFixture,
  testTypeTestResultFixture,
  serviceTypeForProcedureBookedFixture,
  orderItemProcedureBookedWithApptFixture,
  testOrderToBeBookedForProceduresFixture,
  appointmentForProcedureBookedFixture,
  testPanelWithProcedureForBookedFixture,
  testOrderToBeCompletedForProceduresAppointmentsDoneFixture,
  appointmentForProcedureDoneFixture,
  appointmentProcedureDoneFixture,
  appointmentProcedureNotDoneFixture,
  testOrderToBeNotUpdatedForProceduresAppointmentsNotDoneFixture,
  testOrderItemToBeNotUpdatedForProceduresAppointmentsNotDoneFixture,
  testOrderItemToBeCompletedForProceduresAppointmentsDoneFixture,
  testOrderUltrasoundFixture,
  testTypeUltrasoundFixture,
  appointmentUltrasoundFixture,
  testOrderItemToForUltrasoundOrderFixture,
  testResultUltrasoundFixture,
  serviceTypeForUltrasoundFixture,
  testOrderNotCollectedFixture,
  appointmentStatusNoShowFixture,
  appointmentStatusCancelledFixture,
  appointmentBookedForCancelNoShowFixture,
  milestoneToWorkseetHormoneTestTypeFixture,
  patientMilestoneWorksheetUltrasoundFixture,
  milestoneToWorkseetUltrasoundTypeFixture,
  milestoneToTestTypeForWorksheetPendingResultsFixture,
} from './util'
import {AppointmentsCreatedSchema} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {AppointmentUpdatedSchema} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {mockedAuditMetadata} from './fixtures/audit.fixture'
import {TestResultUpdatedSchema} from '@libs/common/model/proto-schemas/test-result-updated.schema'
import {Config} from '@config/config.util'
import {TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums/test-order.enum'
import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums/test-result.enum'
import {
  AppointmentPlanSheetResultsStatus,
  AppointmentStatus,
  HistoryUserType,
} from '@libs/common/enums'
import {OrderCompletionService} from '../functions/test-orders-and-results/src/common/services/order-completion.service'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {SpecimensCollectedSchema} from '@libs/common/model/proto-schemas/specimens-collected.schema'
import {PlanSheetResultsService} from '../functions/test-orders-and-results/src/common/services/plan-sheet-results.service'
import {TestOrderHistorySeed} from '@seeds/firestore/test-order-history.seed'
import {
  orderActionNameMap,
  TestOrderHistoryAction,
  TestOrderHistoryComponentEnum,
} from '@libs/data-layer/apps/clinic-test/entities/fireorm'
import {getTestOrderStatusTitle} from '@libs/services-common/enums'

FirebaseAdminProvider.init()
initFireORM()
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
jest.mock('@libs/common/adapters/pubsub.adapter')

let specimenSeed: SpecimenSeed
let testResultSeed: TestResultSeed
let testPanelSeed: TestPanelSeed
let testTypeSeed: TestTypeSeed
let testOrderItemSeed: TestOrderItemSeed
let testOrderSeed: TestOrderSeed

let specimenGroupSeed: SpecimenGroupSeed
let labInfoSeed: LabInfoSeed
let labMachineSeed: LabMachineSeed
let patientSeed: PatientSeed
let serviceProviderSeed: ServiceProviderSeed
let serviceProviderGroupSeed: ServiceProviderGroupSeed
let superTypeSeed: SuperTypeSeed
let serviceTypeSeed: ServiceTypeSeed
let appointmentSeed: AppointmentSeed
let patientMilestoneSeed: PatientMilestoneSeed
let patientMilestoneToAppointmentSeed: PatientMilestoneToAppointmentSeed
let milestoneToTestTypeOrPanelSeed: MilestoneToTestTypeOrPanelSeed
let testOrderHistorySeed: TestOrderHistorySeed

describe('Firebase Function: Manage test orders', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    specimenSeed = new SpecimenSeed(dataSource)
    testResultSeed = new TestResultSeed(dataSource)
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
    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
    patientMilestoneToAppointmentSeed = new PatientMilestoneToAppointmentSeed(dataSource)
    milestoneToTestTypeOrPanelSeed = new MilestoneToTestTypeOrPanelSeed(dataSource)
    testOrderHistorySeed = new TestOrderHistorySeed()

    await superTypeSeed.create(superTypeOtherFixture)

    await serviceTypeSeed.create(serviceTypeFixture)
    await serviceTypeSeed.create(serviceTypeProcedureFixture)
    await serviceTypeSeed.create(serviceTypeForProcedureFixture)
    await serviceTypeSeed.create(serviceTypeForProcedureBookedFixture)
    await serviceTypeSeed.create(serviceTypeForUltrasoundFixture)

    //panel
    await labInfoSeed.create(labInfoFixture)
    await specimenGroupSeed.create(specimenGroupFixture)
    await testPanelSeed.create(testPanelFixtureFirebase)
    await testPanelSeed.create(testPanelForProcedureFixture)
    await testPanelSeed.create(testPanelWithProcedureFixture)
    await testPanelSeed.create(testPanelWithProcedureForBookedFixture)

    //test type
    await labInfoSeed.create(testTypeLabInfoFixture)
    await specimenGroupSeed.create(testTypeSpecimenGroupFixture)
    await testTypeSeed.create(testTypeFixtureFirebase)
    await testTypeSeed.create(testTypeUltrasoundFixture)

    //panel
    await labMachineSeed.create(labMachineFixture)
    await serviceProviderGroupSeed.create(serviceProviderGroupDoctor)
    await serviceProviderSeed.create(serviceProviderFixture)
    await patientSeed.create(patientFixture)

    //test type
    await labMachineSeed.create(testTypeLabMachineFixture)
    await serviceProviderGroupSeed.create(testTypeServiceProviderGroupDoctor)
    await serviceProviderSeed.create(testTypeServiceProviderFixture)
    await patientSeed.create(testTypePatientFixture)
    await patientSeed.create(testTypeUltrasoundFixture)

    //test order
    await testOrderSeed.create(testOrderFixture)
    await testOrderSeed.create(testOrderNotCollectedFixture)
    await testOrderSeed.create(testTypeTestOrderFixture)
    await testOrderSeed.create(testOrderWillBeCompletedFixture)
    await testOrderSeed.create(testOrderWillNotBecomeCompletedFixture)
    await testOrderSeed.create(testOrderWillBecomeAwaitingResultsFixture)
    await testOrderSeed.create(testOrderToBePartiallyBookedFixture)
    await testOrderSeed.create(testOrderToBeBookedFixture)
    await testOrderSeed.create(testOrderToBePartiallyBookedForProceduresFixture)
    await testOrderSeed.create(testOrderToBeBookedForProceduresFixture)
    await testOrderSeed.create(testOrderToBeCompletedForProceduresAppointmentsDoneFixture)
    await testOrderSeed.create(testOrderToBeNotUpdatedForProceduresAppointmentsNotDoneFixture)
    await testOrderSeed.create(testOrderUltrasoundFixture)

    await testOrderItemSeed.create(
      testOrderItemToBeNotUpdatedForProceduresAppointmentsNotDoneFixture,
    )
    await testOrderItemSeed.create(testOrderItemToBeCompletedForProceduresAppointmentsDoneFixture)

    await appointmentSeed.create(appointmentFixture)
    await appointmentSeed.create(appointmentBookedForCancelNoShowFixture)
    await appointmentSeed.create(appointmentStatusNoShowFixture)
    await appointmentSeed.create(appointmentStatusCancelledFixture)
    await appointmentSeed.create(appointmentForSwabCollectionFixture)
    await appointmentSeed.create(appointmentForRelationToMilestoneFixture)
    await appointmentSeed.create(appointmentForProcedurePartiallyBookedFixture)
    await appointmentSeed.create(appointmentForProcedureBookedFixture)
    await appointmentSeed.create(appointmentForProcedureDoneFixture)
    await appointmentSeed.create(appointmentProcedureDoneFixture)
    await appointmentSeed.create(appointmentProcedureNotDoneFixture)
    await appointmentSeed.create(appointmentUltrasoundFixture)

    await patientMilestoneSeed.create(patientMilestonePastFixture)
    await patientMilestoneSeed.create(patientMilestoneForPartiallyBookedApptFixture)
    await patientMilestoneSeed.create(patientMilestoneUpcomingFixture)
    await patientMilestoneSeed.create(patientMilestoneFixture)
    await patientMilestoneSeed.create(patientMilestoneWorksheetUltrasoundFixture)

    await patientMilestoneToAppointmentSeed.create(patientMilestoneToAppointmentOneFixture)
    await patientMilestoneToAppointmentSeed.create(patientMilestoneToAppointmentTwoFixture)
    await patientMilestoneToAppointmentSeed.create(patientMilestoneToAppointmentThreeFixture)

    await milestoneToTestTypeOrPanelSeed.createArray([
      milestoneToWorkseetHormoneTestTypeFixture,
      milestoneToWorkseetUltrasoundTypeFixture,
      milestoneToTestTypeForWorksheetPendingResultsFixture,
    ])

    await specimenSeed.create(specimenFixture)
    await specimenSeed.create(specimenRejectedFixture)
    await specimenSeed.create(specimenRejectedForRejectedFlowFixture)
    await specimenSeed.create(specimenInProgressForRejectionFlowFixture)
    await specimenSeed.create(specimenRejectedForRejectionFlowFixture)
    await specimenSeed.create(specimenCollectedForRejectionFlowFixture)
    await testResultSeed.create(testResultFixture)

    await specimenSeed.create(testTypeSpecimenFixture)
    await testResultSeed.create(testTypeTestResultFixture)
    await testResultSeed.create(testResultUltrasoundFixture)

    await testOrderItemSeed.create(testTypeTestOrderItemFixture)
    await testOrderItemSeed.create(testOrderItemFixture)
    await testOrderItemSeed.create(orderItemProcedureFixture)
    await testOrderItemSeed.create(orderItemProcedureWithoutAppointmentFixture)
    await testOrderItemSeed.create(orderItemProcedureBookedWithApptFixture)
    await testOrderItemSeed.create(testOrderItemToForUltrasoundOrderFixture)
  })

  test('Change appointmentsplan worksheet results status to completed', async () => {
    await PlanSheetResultsService.updateAppointmentPlanSheetResultsStatus(
      {testResultId: testResultUltrasoundFixture.id},
      mockedAuditMetadata,
    )

    expect(await appointmentSeed.findById(appointmentUltrasoundFixture.id)).toMatchObject({
      planSheetResultsStatus: AppointmentPlanSheetResultsStatus.Pending,
    })

    await milestoneToTestTypeOrPanelSeed.removeByIds([
      milestoneToTestTypeForWorksheetPendingResultsFixture.id,
    ])

    await PlanSheetResultsService.updateAppointmentPlanSheetResultsStatus(
      {testResultId: testResultUltrasoundFixture.id},
      mockedAuditMetadata,
    )

    expect(await appointmentSeed.findById(appointmentUltrasoundFixture.id)).toMatchObject({
      planSheetResultsStatus: AppointmentPlanSheetResultsStatus.Completed,
    })
  })

  test('Change order status to Collecting on specimen status change to InProgress(Test panel)', async () => {
    const data = {specimenUUID: specimenFixture.uuid, ...mockedAuditMetadata}

    const testOrderBefore = await testOrderSeed.findById(testOrderFixture.id)
    expect(testOrderBefore.status).toBe(TestOrderStatusEnum.NotCollected)

    const message = testPubSubEvent(encodePubSubMessage(data, SpecimenUUIDSchema))
    await handlerStatusChangeInProgress(message)

    const testOrderAfter = await testOrderSeed.findById(testOrderFixture.id)
    expect(testOrderAfter.status).toBe(TestOrderStatusEnum.Collecting)
  })

  test('Change order status to Collecting on specimen status change to InProgress(Test type)', async () => {
    const data = {specimenUUID: testTypeSpecimenFixture.uuid, ...mockedAuditMetadata}

    const testOrderBefore = await testOrderSeed.findById(testTypeTestOrderFixture.id)
    expect(testOrderBefore.status).toBe(TestOrderStatusEnum.NotCollected)

    const message = testPubSubEvent(encodePubSubMessage(data, SpecimenUUIDSchema))

    await handlerStatusChangeInProgress(message)

    const testOrderAfter = await testOrderSeed.findById(testTypeTestOrderFixture.id)
    expect(testOrderAfter.status).toBe(TestOrderStatusEnum.Collecting)
  })

  test('Change order status to Awaiting Result on specimen status change to Collected(Test panel)', async () => {
    const data = {
      specimens: [
        {
          uuid: specimenFixture.uuid,
          appointmentUUID: null,
        },
      ],
      ...mockedAuditMetadata,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, SpecimensCollectedSchema))

    await handlerStatusChangeCollected(message)

    const testOrder = await testOrderSeed.findById(testOrderFixture.id)
    expect(testOrder.status).toBe(TestOrderStatusEnum.AwaitingResults)
  })

  test('Should fail to change order status to Awaiting Result on specimen status change to Collected(Test type) because there is a specimen with lower status within that test order', async () => {
    const data = {
      specimens: [
        {
          uuid: testTypeSpecimenFixture.uuid,
          appointmentUUID: null,
        },
      ],
      ...mockedAuditMetadata,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, SpecimensCollectedSchema))

    await handlerStatusChangeCollected(message)

    const testOrder = await testOrderSeed.findById(testTypeTestOrderFixture.id)
    expect(testOrder.status).not.toBe(TestOrderStatusEnum.AwaitingResults)
  })

  test('Change order status to Completed on result status change (Test panel)', async () => {
    const data = {
      testResultId: testResultFixture.id,
      testResultNewStatus: TestResultStatus.Completed,
      testResultPrevStatus: TestResultStatus.Pending,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultUpdatedSchema))

    await handlerStatusChangeResultUpdated(message)

    const testOrder = await testOrderSeed.findById(testOrderFixture.id)
    expect(testOrder.status).toBe(TestOrderStatusEnum.Completed)
  })

  test('Change order status to Completed on Ultrasound test result status change to Reviewed from Completed', async () => {
    const completionSpy = jest.spyOn(OrderCompletionService, 'isAllOrderActionBooked')
    completionSpy.mockResolvedValueOnce(true)

    const spyOnPlanWorksheetStatusChange = jest.spyOn(
      PlanSheetResultsService,
      'updateAppointmentPlanSheetResultsStatus',
    )

    const data = {
      testResultId: testResultUltrasoundFixture.id,
      testResultPrevStatus: TestResultStatus.Completed,
      testResultNewStatus: TestResultStatus.Reviewed,
      ...mockedAuditMetadata,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, TestResultUpdatedSchema))
    await handlerStatusChangeResultUpdated(message)

    const testOrder = await testOrderSeed.findById(testOrderUltrasoundFixture.id)
    expect(testOrder.status).toBe(TestOrderStatusEnum.Completed)

    expect(spyOnPlanWorksheetStatusChange).toHaveBeenCalledTimes(0)

    completionSpy.mockRestore()
    spyOnPlanWorksheetStatusChange.mockRestore()
  })

  test('Will not change order status to Completed because there is a specimen not completed', async () => {
    const spyOnPlanWorksheetStatusChange = jest.spyOn(
      PlanSheetResultsService,
      'updateAppointmentPlanSheetResultsStatus',
    )

    const data = {
      testResultId: testTypeTestOrderFixture.id,
      testResultNewStatus: TestResultStatus.Completed,
      testResultPrevStatus: TestResultStatus.Pending,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, TestResultUpdatedSchema))

    await handlerStatusChangeResultUpdated(message)

    const testOrder = await testOrderSeed.findById(testTypeTestOrderFixture.id)
    expect(testOrder.status).not.toBe(TestOrderStatusEnum.Completed)

    expect(spyOnPlanWorksheetStatusChange).toHaveBeenCalledTimes(1)

    spyOnPlanWorksheetStatusChange.mockRestore()
  })

  test('Will not change order status because it is cancelled', async () => {
    {
      await testOrderSeed.updateStatus(testTypeTestOrderFixture.id, TestOrderStatusEnum.Cancelled)
      const data = {
        testResultId: testTypeTestOrderFixture.id,
        testResultNewStatus: TestResultStatus.Completed,
        testResultPrevStatus: TestResultStatus.Pending,
      }

      const requestContext = {
        requestId: 'ManageTestOrdersChangeStatusRequestId',
        authUserId: 'ManageTestOrdersChangeStatusAuthUserId',
        deviceId: 'ManageTestOrdersChangeStatusDeviceId',
        ipAddress: 'ManageTestOrdersChangeStatusIpAddress',
      }

      const spyOnLogger = jest.spyOn(StructuredLogger, 'setRequestContext')

      const message = testPubSubEvent(
        encodePubSubMessage({...data, ...requestContext}, TestResultUpdatedSchema),
      )
      await handlerStatusChangeResultUpdated(message)

      expect(spyOnLogger).toBeCalledWith(requestContext)
      spyOnLogger.mockRestore()

      const testOrderAfter = await testOrderSeed.findById(testTypeTestOrderFixture.id)
      expect(testOrderAfter.status).toBe(TestOrderStatusEnum.Cancelled)
    }
  })

  test('Should change order status to Completed when specimen status is Rejected', async () => {
    const data = {specimenUUID: specimenRejectedFixture.uuid, ...mockedAuditMetadata}

    const message = testPubSubEvent(encodePubSubMessage(data, SpecimenUUIDSchema))

    await handlerSpecimenRejectedOrderStatusChangeToCompleted(message)

    const testOrder = await testOrderSeed.findById(testOrderWillBeCompletedFixture.id)
    expect(testOrder.status).toBe(TestOrderStatusEnum.Completed)
  })

  test('Should not change order status to Completed when all specimens status is NOT Rejected', async () => {
    const data = {specimenUUID: specimenRejectedForRejectedFlowFixture.uuid, ...mockedAuditMetadata}

    const message = testPubSubEvent(encodePubSubMessage(data, SpecimenUUIDSchema))

    await handlerSpecimenRejectedOrderStatusChangeToCompleted(message)

    const testOrder = await testOrderSeed.findById(testOrderWillNotBecomeCompletedFixture.id)
    expect(testOrder.status).not.toBe(TestOrderStatusEnum.Completed)
  })

  test('Should change order status to AwaitingResults when at least one specimen is Collected', async () => {
    const data = {
      specimenUUID: specimenRejectedForRejectionFlowFixture.uuid,
      ...mockedAuditMetadata,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, SpecimenUUIDSchema))

    await handlerSpecimenRejectedOrderStatusChangeToCompleted(message)

    const testOrder = await testOrderSeed.findById(testOrderWillBecomeAwaitingResultsFixture.id)
    expect(testOrder.status).toBe(TestOrderStatusEnum.AwaitingResults)
  })

  test(`Should change order status to PartiallyBooked based on patient Milestone To Appointments
        Should update appointment worksheet result status to Pending`, async () => {
    const data = {appointmentIds: [appointmentFixture.id], ...mockedAuditMetadata}

    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    await handlerUpdateOrderStatusForCreatedAppointment(message)

    const testOrder = await testOrderSeed.findById(testOrderToBePartiallyBookedFixture.id)
    expect(testOrder.status).toBe(TestOrderStatusEnum.PartiallyBooked)

    const appointment = await appointmentSeed.findById(appointmentFixture.id)
    expect(appointment.planSheetResultsStatus).toBe(AppointmentPlanSheetResultsStatus.Pending)
  })

  // order has 2 orderItems, one of orderItems has appointment Booked, another - doesn't
  test('Should change order status to PartiallyBooked based on ordered Procedures', async () => {
    const completionSpy = jest.spyOn(OrderCompletionService, 'isAllOrderActionBooked')
    completionSpy.mockResolvedValueOnce(false)

    const data = {
      appointmentIds: [appointmentForProcedurePartiallyBookedFixture.id],
      ...mockedAuditMetadata,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentsCreatedSchema))

    await handlerUpdateOrderStatusForCreatedAppointment(message)

    const testOrder = await testOrderSeed.findById(
      testOrderToBePartiallyBookedForProceduresFixture.id,
    )
    expect(testOrder.status).toBe(TestOrderStatusEnum.PartiallyBooked)

    completionSpy.mockRestore()
  })

  test('Should not change order status to Completed because not all appointments is Done', async () => {
    const data = {
      appointmentId: appointmentProcedureNotDoneFixture.id,
      oldAppointment: {status: null},
      newAppointment: {status: null},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
      ...mockedAuditMetadata,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    const configSpy = jest.spyOn(Config, 'getBool')
    configSpy.mockReturnValueOnce(false)
    await handlerAppointmentDoneOrderStatusChangeToCompleted(message)

    const testOrder = await testOrderSeed.findById(
      testOrderToBeNotUpdatedForProceduresAppointmentsNotDoneFixture.id,
    )

    expect(testOrder.status).toBe(TestOrderStatusEnum.AwaitingResults)
    configSpy.mockClear()
  })

  // User has 1 Booked, 1 No Show, 1 Cancelled
  test('should change order status to PartiallyBooked on appointment cancellation. Patient has another appointment Booked', async () => {
    const data = {
      appointmentId: appointmentStatusCancelledFixture.id,
      oldAppointment: {status: AppointmentStatus.InProgress},
      newAppointment: {status: AppointmentStatus.Cancelled},
      ...mockedAuditMetadata,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentDoneOrderStatusChangeToCompleted(message)

    const testOrder = await testOrderSeed.findById(testOrderNotCollectedFixture.id)

    expect(testOrder.status).toBe(TestOrderStatusEnum.PartiallyBooked)

    const orderHistory = await testOrderHistorySeed.findByTestOrderId(testOrder.id)

    const historyItem = orderHistory[orderHistory.length - 1]

    expect(historyItem.testOrderId).toBe(testOrder.id)
    expect(historyItem.action).toBe(orderActionNameMap.get(TestOrderHistoryAction.StatusUpdated))
    expect(historyItem.changes[0].from).toBe(
      getTestOrderStatusTitle.get(testOrderNotCollectedFixture.status),
    )
    expect(historyItem.changes[0].to).toBe(getTestOrderStatusTitle.get(testOrder.status))
    expect(historyItem.changes[0].propertyName).toBe(TestOrderHistoryComponentEnum.Status)

    // should change order status to Not Collected. Last remaining Booked appointment was marked as No Show
    appointmentSeed.appointmentRepository.update(appointmentBookedForCancelNoShowFixture.id, {
      status: AppointmentStatus.NoShow,
    })

    const noShowEvent = {
      appointmentId: appointmentBookedForCancelNoShowFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.NoShow},
      ...mockedAuditMetadata,
    }
    const noShowMessage = testPubSubEvent(
      encodePubSubMessage(noShowEvent, AppointmentUpdatedSchema),
    )

    await handlerAppointmentDoneOrderStatusChangeToCompleted(noShowMessage)

    const testOrderAfter = await testOrderSeed.findById(testOrderNotCollectedFixture.id)

    expect(testOrderAfter.status).toBe(TestOrderStatusEnum.NotCollected)
  })

  afterAll(async () => {
    await serviceProviderGroupSeed.removeByIds([
      serviceProviderGroupDoctor.id,
      testTypeServiceProviderGroupDoctor.id,
    ])
    await specimenGroupSeed.removeByIds([specimenGroupFixture.id, testTypeSpecimenGroupFixture.id])
    await specimenSeed.removeByIds([
      specimenFixture.id,
      testTypeSpecimenFixture.id,
      specimenRejectedFixture.id,
      specimenRejectedForRejectedFlowFixture.id,
      specimenInProgressForRejectionFlowFixture.id,
      specimenRejectedForRejectionFlowFixture.id,
      specimenCollectedForRejectionFlowFixture.id,
    ])
    await testResultSeed.removeByIds([
      testResultFixture.id,
      testTypeTestResultFixture.id,
      testResultUltrasoundFixture.id,
    ])
    await testPanelSeed.removeByIds([
      testPanelFixtureFirebase.id,
      testPanelForProcedureFixture.id,
      testPanelWithProcedureFixture.id,
      testPanelWithProcedureForBookedFixture.id,
    ])
    await testTypeSeed.removeByIds([testTypeFixtureFirebase.id, testTypeUltrasoundFixture.id])

    await milestoneToTestTypeOrPanelSeed.removeByIds([
      milestoneToWorkseetHormoneTestTypeFixture.id,
      milestoneToWorkseetUltrasoundTypeFixture.id,
      milestoneToTestTypeForWorksheetPendingResultsFixture.id,
    ])

    await patientMilestoneToAppointmentSeed.removeByIds([
      patientMilestoneToAppointmentOneFixture.id,
      patientMilestoneToAppointmentTwoFixture.id,
      patientMilestoneToAppointmentThreeFixture.id,
    ])

    await patientMilestoneSeed.removeByIds([
      patientMilestonePastFixture.id,
      patientMilestoneForPartiallyBookedApptFixture.id,
      patientMilestoneUpcomingFixture.id,
      patientMilestoneFixture.id,
    ])
    await appointmentSeed.removeByIds([
      appointmentFixture.id,
      appointmentBookedForCancelNoShowFixture.id,
      appointmentStatusNoShowFixture.id,
      appointmentStatusCancelledFixture.id,
      appointmentForSwabCollectionFixture.id,
      appointmentForRelationToMilestoneFixture.id,
      appointmentForProcedurePartiallyBookedFixture.id,
      appointmentForProcedureBookedFixture.id,
      appointmentForProcedureDoneFixture.id,
      appointmentProcedureDoneFixture.id,
      appointmentProcedureNotDoneFixture.id,
      appointmentUltrasoundFixture.id,
    ])

    await testOrderItemSeed.removeByIds([
      testOrderItemFixture.id,
      testTypeTestOrderItemFixture.id,
      orderItemProcedureFixture.id,
      orderItemProcedureWithoutAppointmentFixture.id,
      orderItemProcedureBookedWithApptFixture.id,
      testOrderItemToBeNotUpdatedForProceduresAppointmentsNotDoneFixture.id,
      testOrderItemToForUltrasoundOrderFixture.id,
    ])

    await testOrderSeed.removeByIds([
      testOrderFixture.id,
      testOrderNotCollectedFixture.id,
      testTypeTestOrderFixture.id,
      testOrderWillBeCompletedFixture.id,
      testOrderWillNotBecomeCompletedFixture.id,
      testOrderWillBecomeAwaitingResultsFixture.id,
      testOrderToBePartiallyBookedFixture.id,
      testOrderToBeBookedFixture.id,
      testOrderToBePartiallyBookedForProceduresFixture.id,
      testOrderToBeBookedForProceduresFixture.id,
      testOrderToBeCompletedForProceduresAppointmentsDoneFixture.id,
      testOrderToBeNotUpdatedForProceduresAppointmentsNotDoneFixture.id,
      testOrderUltrasoundFixture.id,
    ])
    await labInfoSeed.removeByIds([labInfoFixture.id, testTypeLabInfoFixture.id])
    await labMachineSeed.removeByIds([labMachineFixture.id, testTypeLabMachineFixture.id])
    await patientSeed.removeByIds([patientFixture.id, testTypePatientFixture.id])

    await serviceTypeSeed.removeByIds([
      serviceTypeFixture.id,
      serviceTypeProcedureFixture.id,
      serviceTypeForProcedureFixture.id,
      serviceTypeForProcedureBookedFixture.id,
      serviceTypeForUltrasoundFixture.id,
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await serviceProviderSeed.removeByIds([
      serviceProviderFixture.id,
      testTypeServiceProviderFixture.id,
    ])

    jest.clearAllMocks()
    await dataSource.destroy()
  })
})
