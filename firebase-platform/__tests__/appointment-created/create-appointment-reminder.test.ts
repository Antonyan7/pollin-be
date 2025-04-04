import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {DataSource} from 'typeorm'
import {PatientSeed, SuperTypeSeed} from '@seeds/typeorm'
import {CloudTaskSeed} from '@seeds/firestore/cloud-task.seed'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {AppointmentSeed} from '@seeds/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceType} from '@libs/data-layer/apps/scheduling/entities/typeorm/'
import {MockAppointmentAcuityResponse} from '@libs/common/adapters/__mocks__/acuity.adapter'
import {ServiceProviderSeed, ServiceTypeSeed} from '@seeds/typeorm'
import {testPubSubEvent} from '@functions-types'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {CloudTaskAdapter} from '@libs/common/adapters'
import {SendAppointmentReminderSchema} from '@libs/common/model/proto-schemas/send-virtual-appointment-reminder.schema'
import {manageCloudTasksOnAppointmentCreatedHandler} from '@firebase-platform/functions/appointments/src/handlers/appointments-created/manage-cloud-tasks-on-appointment-created'
import {
  AppointmentsCreatedPubSubPayload,
  AppointmentsCreatedSchema,
} from '@libs/common/model/proto-schemas/appointment-created.schema'
import {CloudTaskType} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'

jest.setTimeout(10000)
jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('@libs/common/adapters/cloud-task.adapter')
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

const dateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))
const dateNow = dateTimeUtil.now()

const testId = 2345216

const patientFixture: Partial<Patient> = {
  id: testId,
  authUserId: String(testId),
}

const serviceProviderFixture: Partial<ServiceProvider> = {
  id: testId,
  externalProviderIDForAcuity: MockAppointmentAcuityResponse.calendarID,
}

const virtualServiceTypeFixture: Partial<ServiceType> = {
  id: testId,
  uuid: '87368bc7-a25d-3ee6-a5e9-92e995c1e856',
  type: ServiceTypeMethod.Virtual,
  superTypeId: superTypeOtherFixture.id,
}

const serviceTypeFixture: Partial<ServiceType> = {
  id: testId + 1,
  uuid: '87368bc7-a25d-4ee6-a2e9-92e995c1e856',
  type: ServiceTypeMethod.InClinic,
  superTypeId: superTypeOtherFixture.id,
}

const serviceTypeTentativeFixture: Partial<ServiceType> = {
  id: testId + 2,
  uuid: '87368bcA-a35d-1ee6-a2e9-92e995c1e856',
  type: ServiceTypeMethod.InClinic,
  superTypeId: superTypeOtherFixture.id,
  isTentative: true,
}

const appointmentInClinicFixture: Partial<Appointment> = {
  id: testId,
  status: AppointmentStatus.Booked,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.addDays(dateNow, 4),
}

const appointmentVirtualFixture: Partial<Appointment> = {
  id: testId + 1,
  status: AppointmentStatus.Booked,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: virtualServiceTypeFixture.id,
  start: dateTimeUtil.toDate(`2500-06-17T03:24:00`),
}

const appointmentVirtualPastFixture: Partial<Appointment> = {
  id: testId + 2,
  status: AppointmentStatus.Booked,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: virtualServiceTypeFixture.id,
  start: dateTimeUtil.toDate(`2020-06-17T03:24:00`),
}

const appointmentTentativeFixture: Partial<Appointment> = {
  id: testId + 3,
  status: AppointmentStatus.Booked,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeTentativeFixture.id,
  start: dateTimeUtil.addDays(dateNow, 4),
}

describe('Create Cloud task for appointment reminder', () => {
  let cloudTaskSeed: CloudTaskSeed
  let dataSource: DataSource

  let patientSeed: PatientSeed
  let appointmentSeed: AppointmentSeed
  let serviceProviderSeed: ServiceProviderSeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    cloudTaskSeed = new CloudTaskSeed()
    patientSeed = new PatientSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.createArray([
      serviceTypeFixture,
      virtualServiceTypeFixture,
      serviceTypeTentativeFixture,
    ])
    await patientSeed.create(patientFixture)
  })

  it('Should create cloud task for virtual appointment (start is in more than 30 days)', async () => {
    await appointmentSeed.create(appointmentVirtualFixture)

    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')

    const payload: Partial<AppointmentsCreatedPubSubPayload> = {
      appointmentIds: [appointmentVirtualFixture.id],
    }
    await manageCloudTasksOnAppointmentCreatedHandler(
      testPubSubEvent(encodePubSubMessage(payload, AppointmentsCreatedSchema)),
    )

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentVirtualFixture.id,
    )
    expect(cloudTasks.length).toBe(1)
    expect(cloudTasks[0].appointmentId).toBe(appointmentVirtualFixture.id)

    expect(spyOnTaskCreation).toBeCalledWith({
      data: {
        patientId: patientFixture.id,
        appointmentId: appointmentVirtualFixture.id,
      },
      schemaType: SendAppointmentReminderSchema,
      targetURL: expect.any(String),
      targetDate: expect.anything(),
      allowImmediateExecution: true,
    })

    /**Create cloud task for 30 days from now (appointment date is in more than 100 years) */
    const targetDate = spyOnTaskCreation.mock.calls[0][0].targetDate
    expect(
      dateTimeUtil.isWithinInterval(targetDate, {
        start: dateTimeUtil.addDays(dateNow, 29),
        end: dateTimeUtil.addDays(dateNow, 31),
      }),
    )

    spyOnTaskCreation.mockRestore()
  })

  it('Should create cloud task for virtual appointment (in past)', async () => {
    await appointmentSeed.create(appointmentVirtualPastFixture)

    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')

    const payload: Partial<AppointmentsCreatedPubSubPayload> = {
      appointmentIds: [appointmentVirtualPastFixture.id],
    }
    await manageCloudTasksOnAppointmentCreatedHandler(
      testPubSubEvent(encodePubSubMessage(payload, AppointmentsCreatedSchema)),
    )

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentVirtualPastFixture.id,
    )
    expect(cloudTasks.length).toBe(1)
    expect(cloudTasks[0].appointmentId).toBe(appointmentVirtualPastFixture.id)

    expect(spyOnTaskCreation).toBeCalledWith({
      data: {
        patientId: patientFixture.id,
        appointmentId: appointmentVirtualPastFixture.id,
      },
      schemaType: SendAppointmentReminderSchema,
      targetURL: expect.any(String),
      targetDate: expect.anything(),
      allowImmediateExecution: true,
    })

    const targetDate = spyOnTaskCreation.mock.calls[0][0].targetDate
    expect(
      dateTimeUtil.isWithinInterval(targetDate, {
        start: dateTimeUtil.subtractMinutes(dateNow, 1),
        end: dateTimeUtil.addMinutes(dateNow, 1),
      }),
    )

    spyOnTaskCreation.mockRestore()
  })

  it('Should create cloud task for inclinic appointment', async () => {
    await appointmentSeed.create(appointmentInClinicFixture)

    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')

    const payload: Partial<AppointmentsCreatedPubSubPayload> = {
      appointmentIds: [appointmentInClinicFixture.id],
    }
    await manageCloudTasksOnAppointmentCreatedHandler(
      testPubSubEvent(encodePubSubMessage(payload, AppointmentsCreatedSchema)),
    )

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentInClinicFixture.id,
    )

    expect(spyOnTaskCreation).toBeCalledWith({
      data: {
        patientId: patientFixture.id,
        appointmentId: appointmentInClinicFixture.id,
      },
      schemaType: SendAppointmentReminderSchema,
      targetURL: expect.any(String),
      targetDate: expect.anything(),
      allowImmediateExecution: true,
    })

    const targetDate = spyOnTaskCreation.mock.calls[0][0].targetDate
    expect(
      dateTimeUtil.isWithinInterval(targetDate, {
        start: dateTimeUtil.subtractMinutes(appointmentInClinicFixture.start, 1),
        end: dateTimeUtil.addMinutes(appointmentInClinicFixture.start, 1),
      }),
    )

    expect(cloudTasks.length).toBe(1)

    spyOnTaskCreation.mockRestore()
  })

  it('Should not create cloud task for tentative appointment + create for non tentative', async () => {
    await appointmentSeed.create(appointmentTentativeFixture)

    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')

    const payload: Partial<AppointmentsCreatedPubSubPayload> = {
      appointmentIds: [appointmentTentativeFixture.id],
    }

    await manageCloudTasksOnAppointmentCreatedHandler(
      testPubSubEvent(encodePubSubMessage(payload, AppointmentsCreatedSchema)),
    )

    expect(spyOnTaskCreation).toBeCalledTimes(0)

    await serviceTypeSeed.updateIsTentative(serviceTypeTentativeFixture.id, false)

    await manageCloudTasksOnAppointmentCreatedHandler(
      testPubSubEvent(encodePubSubMessage(payload, AppointmentsCreatedSchema)),
    )

    expect(spyOnTaskCreation).toBeCalledTimes(1)

    spyOnTaskCreation.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await cloudTaskSeed.deleteAllByFieldValue('appointmentId', appointmentVirtualFixture.id)
    await cloudTaskSeed.deleteAllByFieldValue('appointmentId', appointmentInClinicFixture.id)
    await cloudTaskSeed.deleteAllByFieldValue('appointmentId', appointmentVirtualPastFixture.id)
    await appointmentSeed.removeByIds([
      appointmentInClinicFixture.id,
      appointmentVirtualFixture.id,
      appointmentVirtualPastFixture.id,
      appointmentTentativeFixture.id,
    ])
    await serviceProviderSeed.removeById(serviceProviderFixture.id)
    await serviceTypeSeed.removeByIds([
      serviceTypeFixture.id,
      virtualServiceTypeFixture.id,
      serviceTypeTentativeFixture.id,
    ])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await patientSeed.removeByIds([patientFixture.id])

    await dataSource.destroy()
  })
})
