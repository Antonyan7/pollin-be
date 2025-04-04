import {testPubSubEvent} from '@functions-types'
import {DataSource} from 'typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {WireTransferPaymentOrderPaidSchema} from '@libs/common/model/proto-schemas/payment-order-paid.schema'
import {PatientSeed, PaymentOrderSeed, PatientMilestoneSeed, PatientPlanSeed} from '@seeds/typeorm'
import {wireTransferPatientFixture} from '../fixtures/patient-profile.fixture'
import {wireTransferPaymentOrderFixture} from '../fixtures/payment-order.fixture'
import {PatientMilestoneStatus, PatientMilestoneType} from '@libs/services-common/enums'
import {patientMilestoneWireTransferPaidFixture} from '../fixtures/patient-milestone-fixture'
import {handlerProcessPaymentOrderForWireTransfer} from '@firebase-platform/functions/checkout/src/wire-transfer-payment-order-paid/handler-process-payment-order-for-wire-transfer'
import {patientPlanFixtureCF} from '../fixtures/plan-type-fixture'
import {
  createAppointmentStatusUpdatedFixtures,
  destroyAppointmentStatusUpdatedFixtures,
} from '../appointment-status-updated/seed'

// Mock PdfCreatorService
jest.mock('@libs/services-common/services/pdf-creator.service', () => {
  return {
    PdfCreatorService: jest.fn().mockImplementation(() => {
      return {
        generatePdfStream: jest.fn().mockResolvedValue({
          getStream: () => {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const stream = new (require('stream').PassThrough)()
            stream.end(Buffer.from('Mock PDF content'))
            return stream
          },
        }),
      }
    }),
  }
})

jest.setTimeout(10000)
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
let patientSeed: PatientSeed
let paymentOrderSeed: PaymentOrderSeed
let patientMilestoneSeed: PatientMilestoneSeed
let patientPlanSeed: PatientPlanSeed

// jest.mock('@libs/services-common/services/pdf-creator.service.ts')

describe('Firebase Function: update patient profile alerts', () => {
  let dataSource: DataSource

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    paymentOrderSeed = new PaymentOrderSeed(dataSource)
    patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)

    await createAppointmentStatusUpdatedFixtures(dataSource)

    await patientSeed.create(wireTransferPatientFixture)
    await paymentOrderSeed.createArray([wireTransferPaymentOrderFixture])
    await patientPlanSeed.create(patientPlanFixtureCF)

    await patientMilestoneSeed.create(patientMilestoneWireTransferPaidFixture)
  })

  it('Should fail, payment order not found: FAIL', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          paymentOrderId: 1123123, // Not found ID
        },
        WireTransferPaymentOrderPaidSchema,
      ),
    )

    await handlerProcessPaymentOrderForWireTransfer(message)
  })

  it('Should update payment order and milestone and send PlanDetails alert: SUCCESS', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {
          paymentOrderId: wireTransferPaymentOrderFixture.id,
        },
        WireTransferPaymentOrderPaidSchema,
      ),
    )

    await handlerProcessPaymentOrderForWireTransfer(message)
    const patientMilestone = await patientMilestoneSeed.findById(
      patientMilestoneWireTransferPaidFixture.id,
    )
    expect(patientMilestone.status).toBe(PatientMilestoneStatus.Past)
    expect(patientMilestone.dateMovedToPast).toBeTruthy()

    const patientMilestones = await patientMilestoneSeed.findPatientMilestones(
      wireTransferPatientFixture.id,
    )
    const reportPeriodMilestone = patientMilestones.find(
      (milestone) => milestone.type == PatientMilestoneType.PlanReportPeriod,
    )
    expect(reportPeriodMilestone).toBeTruthy()
  })

  afterAll(async () => {
    await patientMilestoneSeed.removeByIds([patientMilestoneWireTransferPaidFixture.id])
    await patientSeed.removeByIds([wireTransferPatientFixture.id])
    await paymentOrderSeed.removeByIds([wireTransferPaymentOrderFixture.id])

    await destroyAppointmentStatusUpdatedFixtures(dataSource)

    await dataSource.destroy()
  })
})
