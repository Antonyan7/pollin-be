import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {DataSource} from 'typeorm'
import {PatientSeed, SuperTypeSeed} from '@seeds/typeorm'
import {CloudTaskSeed} from '@seeds/firestore/cloud-task.seed'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {CloudTaskType} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {AppointmentSeed} from '@seeds/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  AppointmentUpdatedPubSubPayload,
  AppointmentUpdatedSchema,
} from '@libs/common/model/proto-schemas/appointment-updated.schema'
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
import {
  updateCloudTaskForAppointmentReminder,
  manageCloudTasksOnAppointmentUpdateHandler,
} from '@codebase/appointments/handlers/appointment-status-updated/manage-cloud-tasks-on-appointment-updated'
import {AppointmentReminderHelpers} from '@libs/common/helpers/appointment-reminder.helper'

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

const testId = 234521

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

const appointmentInClinicFixture: Partial<Appointment> = {
  id: testId,
  status: AppointmentStatus.NoShow,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
}

const appointmentVirtualFixture: Partial<Appointment> = {
  id: testId + 1,
  status: AppointmentStatus.Booked,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: virtualServiceTypeFixture.id,
}

describe('Update cloud task for appointment reminder', () => {
  let cloudTaskSeed: CloudTaskSeed
  let dataSource: DataSource

  let patientSeed: PatientSeed
  let appointmentSeed: AppointmentSeed
  let serviceProviderSeed: ServiceProviderSeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed

  const createCloudTask = (appointmentId: number, cloudTaskId: string): Promise<void> =>
    cloudTaskSeed.create({
      id: cloudTaskId + appointmentId,
      patientId: patientFixture.id,
      appointmentId,
      cloudTaskId,
      type: CloudTaskType.AppointmentReminder,
    })

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
    await serviceTypeSeed.createArray([serviceTypeFixture, virtualServiceTypeFixture])
    await patientSeed.create(patientFixture)
  })

  it('Should check requiresReminderChange helper', async () => {
    expect(
      AppointmentReminderHelpers.requiresReminderChange({
        oldAppointment: {
          date: dateTimeUtil.formatInISO(dateNow),
        },
        newAppointment: {
          date: dateTimeUtil.formatInISO(dateTimeUtil.addDays(dateNow, 1)),
        },
      } as AppointmentUpdatedPubSubPayload),
    ).toBeTruthy()

    expect(
      AppointmentReminderHelpers.requiresReminderChange({
        oldAppointment: {
          status: AppointmentStatus.Booked,
        },
        newAppointment: {
          date: AppointmentStatus.NoShow,
        },
      } as AppointmentUpdatedPubSubPayload),
    ).toBeTruthy()

    expect(
      AppointmentReminderHelpers.requiresReminderChange({
        oldAppointment: {
          status: AppointmentStatus.Booked,
        },
        newAppointment: {
          status: AppointmentStatus.Confirmed,
        },
      } as AppointmentUpdatedPubSubPayload),
    ).toBeFalsy()

    expect(
      AppointmentReminderHelpers.requiresReminderChange({
        oldAppointment: {
          serviceTypeId: '123',
        },
        newAppointment: {
          serviceTypeId: '132',
        },
      } as AppointmentUpdatedPubSubPayload),
    ).toBeTruthy()

    expect(
      AppointmentReminderHelpers.requiresReminderChange({
        oldAppointment: {
          serviceProviderId: 123,
        },
        newAppointment: {
          serviceProviderId: 132,
        },
      } as AppointmentUpdatedPubSubPayload),
    ).toBeTruthy()

    expect(
      AppointmentReminderHelpers.requiresReminderChange({
        oldAppointment: {
          serviceProviderId: 121,
        },
        newAppointment: {
          serviceProviderId: 121,
        },
      } as AppointmentUpdatedPubSubPayload),
    ).toBeFalsy()

    expect(
      AppointmentReminderHelpers.requiresReminderChange({
        oldAppointment: {
          serviceTypeId: '122',
          date: '232',
        },
        newAppointment: {
          serviceTypeId: '122',
        },
      } as AppointmentUpdatedPubSubPayload),
    ).toBeTruthy()
  })

  it('Should exit because appointment doesnt exists, check reminder helper execution', async () => {
    await appointmentSeed.create(appointmentVirtualFixture)
    const spyOnHelper = jest.spyOn(AppointmentReminderHelpers, 'requiresReminderChange')

    const payload: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentVirtualFixture.id,
      oldAppointment: {},
      newAppointment: {},
    }
    await manageCloudTasksOnAppointmentUpdateHandler(
      testPubSubEvent(encodePubSubMessage(payload, AppointmentUpdatedSchema)),
    )
    expect(spyOnHelper).toBeCalled()
  })

  it('Should remove cloud task and create new one for virtual appointment', async () => {
    const cloudTaskId = '12312asdsdad'

    await createCloudTask(appointmentVirtualFixture.id, cloudTaskId)

    const spyOnTaskRemoval = jest.spyOn(CloudTaskAdapter.prototype, 'deleteTask')
    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')

    const payload = {
      appointmentId: appointmentVirtualFixture.id,
      oldAppointment: {date: dateTimeUtil.formatInISO(dateNow)},
      newAppointment: {date: dateTimeUtil.formatInISO(dateTimeUtil.addDays(dateNow, 1))},
    } as AppointmentUpdatedPubSubPayload

    await updateCloudTaskForAppointmentReminder(payload)

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentVirtualFixture.id,
    )
    expect(cloudTasks.length).toBe(1)
    expect(cloudTasks[0].cloudTaskId).not.toBe(cloudTaskId)

    expect(spyOnTaskRemoval).toBeCalledWith(cloudTaskId)
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
    spyOnTaskRemoval.mockRestore()
    spyOnTaskCreation.mockRestore()
  })

  it('Should remove cloud task for InClinic appointment (NoShow)', async () => {
    const cloudTaskId = '123aa12asdsdad'

    await appointmentSeed.create(appointmentInClinicFixture)
    await createCloudTask(appointmentInClinicFixture.id, cloudTaskId)

    const spyOnTaskRemoval = jest.spyOn(CloudTaskAdapter.prototype, 'deleteTask')

    const payload = {
      appointmentId: appointmentInClinicFixture.id,
      oldAppointment: {date: dateTimeUtil.formatInISO(dateNow)},
      newAppointment: {
        date: dateTimeUtil.formatInISO(dateTimeUtil.addDays(dateNow, 1)),
        status: AppointmentStatus.NoShow,
      },
    } as AppointmentUpdatedPubSubPayload

    await updateCloudTaskForAppointmentReminder(payload)

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentInClinicFixture.id,
    )
    expect(cloudTasks.length).toBe(0)

    expect(spyOnTaskRemoval).toBeCalledWith(cloudTaskId)

    spyOnTaskRemoval.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await cloudTaskSeed.deleteAllByFieldValue('appointmentId', appointmentVirtualFixture.id)
    await cloudTaskSeed.deleteAllByFieldValue('appointmentId', appointmentInClinicFixture.id)
    await appointmentSeed.removeByIds([appointmentInClinicFixture.id, appointmentVirtualFixture.id])
    await serviceProviderSeed.removeById(serviceProviderFixture.id)
    await serviceTypeSeed.removeByIds([serviceTypeFixture.id, virtualServiceTypeFixture.id])
    await superTypeSeed.removeByIds([superTypeOtherFixture.id])
    await patientSeed.removeByIds([patientFixture.id])

    await dataSource.destroy()
  })
})
