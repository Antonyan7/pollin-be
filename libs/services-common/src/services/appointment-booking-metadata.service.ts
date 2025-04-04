import {Equal} from 'typeorm'
import {
  PatientMilestoneRepository,
  MilestoneToTestTypeOrPanelRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {Injectable} from '@nestjs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {StructuredLogger} from '@libs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {
  AppointmentBookingMetadata,
  AppointmentBookingMetadataTypeEnum,
} from '@libs/services-common/dto/appointment-booking-metadata.dto'
import {
  TestOrderActionRepository,
  TestPanelRepository,
  TestTypeRepository,
} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {IdentifierModel} from '@libs/services-common/dto/order-action-identifier.dto'
import {MilestoneToTestTypeOrPanel} from '@libs/data-layer/apps/users/entities/typeorm'
import {TestOrder, TestOrderAction} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {AppointmentRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'

const logFunctions = activityLogs.BookingMetadataServiceFunctions
const logActions = activityLogs.BookingMetadataServiceActions

@Injectable()
export class AppointmentBookingMetadataService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientMilestoneRepository: PatientMilestoneRepository,
    private readonly milestoneToTestTypeOrPanelRepository: MilestoneToTestTypeOrPanelRepository,
    private readonly testOrderActionRepository: TestOrderActionRepository,
    private readonly testTypeRepository: TestTypeRepository,
    private readonly testPanelRepository: TestPanelRepository,
  ) {}

  async validateOrderMetadata(
    metadata: AppointmentBookingMetadata,
    testOrder: TestOrder,
    decodedIdentifier: IdentifierModel,
  ): Promise<{
    isOrderMetadataValid: boolean
    testTypes: {id: number; price: number}[]
    testPanels: {id: number; price: number}[]
  }> {
    const {type} = metadata

    const notValidPayload = {
      isOrderMetadataValid: false,
      testTypes: [],
      testPanels: [],
    }

    if (type !== AppointmentBookingMetadataTypeEnum.Order) {
      StructuredLogger.info(
        logFunctions.ValidateOrderMetadata,
        logActions.NoBookingOrderMetadataProvided,
        {
          message: `No order appointment booking metadata. AppointmentBookingMetadataTypeEnum: ${type}`,
        },
      )

      return notValidPayload
    }

    if (testOrder.id !== decodedIdentifier.testOrderId) {
      StructuredLogger.info(
        logFunctions.ValidateOrderMetadata,
        logActions.NoBookingOrderMetadataProvided,
        {
          message: `No order appointment booking metadata. AppointmentBookingMetadataTypeEnum: ${type}`,
        },
      )
      return notValidPayload
    }

    const testTypeIds = [...new Set(decodedIdentifier.testTypeIds)]
    const testPanelIds = [...new Set(decodedIdentifier.testPanelIds)]

    const [testTypes, testPanels] = await Promise.all([
      this.testTypeRepository.findByIds(testTypeIds),
      this.testPanelRepository.findByIds(testPanelIds),
    ])

    if (testTypes.length !== testTypeIds.length || testPanels.length !== testPanelIds.length) {
      StructuredLogger.warn(
        logFunctions.ValidateOrderMetadata,
        logActions.TestTypeOrPanelNotFound,
        {
          testTypeIds: testTypeIds,
          testPanelIds: testPanelIds,
          foundTestTypeIds: testTypes.map((t) => t.id),
          foundTestPanelIds: testPanels.map((p) => p.id),
        },
      )
      return notValidPayload
    }

    return {
      isOrderMetadataValid: true,
      testTypes: testTypes.map((testType) => ({id: testType.id, price: Number(testType.price)})),
      testPanels: testPanels.map((testPanel) => ({
        id: testPanel.id,
        price: Number(testPanel.price),
      })),
    }
  }

  async saveMilestoneToTestTypeOrPanel(
    milestoneId: number,
    testTypes: {id: number; price: number}[],
    testPanels: {id: number; price: number}[],
  ): Promise<void> {
    try {
      const entitiesWithTestType = testTypes.map(({id, price}) => ({
        patientMilestoneId: milestoneId,
        testTypeId: id,
        lockedPrice: String(price),
      }))
      const entitiesWithTestPanel = testPanels.map(({id, price}) => ({
        patientMilestoneId: milestoneId,
        testPanelId: id,
        lockedPrice: String(price),
      }))

      await this.milestoneToTestTypeOrPanelRepository.save<Partial<MilestoneToTestTypeOrPanel>>([
        ...entitiesWithTestType,
        ...entitiesWithTestPanel,
      ])
    } catch (error) {
      handleError(error, {
        functionName: logFunctions.SaveMilestoneToTestTypeOrPanel,
        eventName: logActions.SaveMilestoneToTestTypeOrPanelFailed,
      })
    }
  }

  async associatePatientMilestoneWithTestOrder(
    milestoneId: number,
    testOrderId: number,
  ): Promise<void> {
    try {
      await this.patientMilestoneRepository.update({id: milestoneId}, {testOrderId})
    } catch (error) {
      handleError(error, {
        functionName: logFunctions.AssociatePatientMilestoneWithTestOrder,
        eventName: logActions.AssociatePatientMilestoneWithTestOrderFailed,
      })
    }
  }

  async associateAppointmentWithTestOrder(
    appointmentId: number,
    testOrderId: number,
  ): Promise<void> {
    try {
      await this.appointmentRepository.update({id: appointmentId}, {testOrderId: testOrderId})
    } catch (error) {
      handleError(error, {
        functionName: logFunctions.AssociateAppointmentWithTestOrder,
        eventName: logActions.AssociateAppointmentWithTestOrderFailed,
      })
    }
  }

  async createOrUpdateTestOrderAction(
    encodedIdentifier: string,
    testOrderId: number,
    milestoneId: number,
  ): Promise<void> {
    try {
      const existingAction = await this.testOrderActionRepository.findOne({
        where: {encodedIdentifier: Equal(encodedIdentifier), testOrderId: Equal(testOrderId)},
      })

      if (existingAction) {
        await this.testOrderActionRepository.update({id: existingAction.id}, {milestoneId})
      } else {
        await this.testOrderActionRepository.save<Partial<TestOrderAction>>({
          encodedIdentifier,
          testOrderId,
          milestoneId,
        })
      }
    } catch (error) {
      handleError(error, {
        functionName: logFunctions.CreateTestOrderAction,
        eventName: logActions.CreateTestOrderActionFailed,
      })
    }
  }
}
