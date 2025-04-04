import {PatientPlanHistorySeed} from '@seeds/firestore/patient-plan-history.seed'
import {patientPlanStatusChangeHistoryHandler} from '@firebase-platform/functions/plans/src/handlers/patient-plan-status-change-history.handler'
import {testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  PatientPlanStatusUpdatedPubSubPayload,
  PatientPlanStatusUpdatedSchema,
} from '@libs/common/model/proto-schemas/patient-plan-status-updated.schema'
import {PlanStatusEnumTitles} from '@libs/services-common/enums'
import {HistoryUserType} from '@libs/common/enums'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

jest.setTimeout(20000)
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

const payload: PatientPlanStatusUpdatedPubSubPayload = {
  authUserId: 'patient-plan-status-history',
  patientPlanId: 2,
  authUserFullname: 'fullname - test',
  authUserType: HistoryUserType.ClinicUser,
  date: '2024-07-04T12:56:29+00:00',

  oldStatus: PlanStatusEnum.ReadyToOrder,
  newStatus: PlanStatusEnum.ReadyForActivation,
}

describe('Firebase Function: patient plan status change history', () => {
  let patientPlanHistorySeed: PatientPlanHistorySeed

  beforeAll(async () => {
    patientPlanHistorySeed = new PatientPlanHistorySeed()

    await patientPlanHistorySeed.deleteByAuthUserId(payload.authUserId)
  })

  it('Should not create history - status was not changed', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage(
        {...payload, newStatus: PlanStatusEnum.ReadyToOrder},
        PatientPlanStatusUpdatedSchema,
      ),
    )

    await patientPlanStatusChangeHistoryHandler(message)

    const history = await patientPlanHistorySeed.findByPatientPlanId(payload.patientPlanId)
    expect(history.length).toBe(0)
  })

  it('Should not create history - date in wrong format', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage({...payload, date: 'wrong'}, PatientPlanStatusUpdatedSchema),
    )

    await patientPlanStatusChangeHistoryHandler(message)

    const history = await patientPlanHistorySeed.findByPatientPlanId(payload.patientPlanId)
    expect(history.length).toBe(0)
  })

  it('Should not create history - data is missing', async () => {
    const message = testPubSubEvent(
      encodePubSubMessage({...payload, authUserType: null}, PatientPlanStatusUpdatedSchema),
    )

    await patientPlanStatusChangeHistoryHandler(message)

    const history = await patientPlanHistorySeed.findByPatientPlanId(payload.patientPlanId)
    expect(history.length).toBe(0)
  })

  it('Should create history - success', async () => {
    const message = testPubSubEvent(encodePubSubMessage(payload, PatientPlanStatusUpdatedSchema))

    await patientPlanStatusChangeHistoryHandler(message)

    const history = await patientPlanHistorySeed.findByPatientPlanId(payload.patientPlanId)
    expect(history[0]).toMatchObject({
      authUserId: payload.authUserId,
      authUserFullName: payload.authUserFullname,
      authUserType: payload.authUserType,
      component: 'Status',
      patientPlanId: payload.patientPlanId,
      changes: [
        {
          from: PlanStatusEnumTitles.get(payload.oldStatus),
          to: PlanStatusEnumTitles.get(payload.newStatus),
          propertyName: 'Status',
        },
      ],
    })
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await patientPlanHistorySeed.deleteByAuthUserId(payload.authUserId)
  })
})
