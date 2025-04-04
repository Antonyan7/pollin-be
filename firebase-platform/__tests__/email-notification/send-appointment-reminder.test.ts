import {DateTimeUtil, EmailProvider} from '@libs/common'
import {Config} from '@config/config.util'
import {DataSource} from 'typeorm'
import {EmailTemplateSeed, PatientSeed, SuperTypeSeed} from '@seeds/typeorm'
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
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {CloudTaskAdapter} from '@libs/common/adapters'
import {
  SendAppointmentReminderPubSubPayload,
  SendAppointmentReminderSchema,
} from '@libs/common/model/proto-schemas/send-virtual-appointment-reminder.schema'
import {CloudTaskType} from '@libs/data-layer/apps/users/entities/fireorm/cloud-task.entity'
import {EmailTemplate} from '@libs/data-layer/apps/email/entities/typeorm'
import {EmailTemplateType} from '@libs/data-layer/apps/email/enums/email-type.enum'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {AppointmentReminderHelpers} from '@libs/common/helpers/appointment-reminder.helper'
import {handlerSendAppointmentReminder} from '@firebase-platform/functions/email-notification/src/send-virtual-appointment-reminder/handler'
import {AppointmentEmailService} from '@firebase-platform/functions/email-notification/src/common/appointment-email.service'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

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

const testId = 2325216

const patientFixture: Partial<Patient> = {
  id: testId,
  authUserId: AuthUserFixture.emailNotVerified.uid,
  firstName: 'firstname for reminder',
}

const serviceProviderFixture: Partial<ServiceProvider> = {
  id: testId,
  externalProviderIDForAcuity: MockAppointmentAcuityResponse.calendarID,
  title: 'serviceProviderFixture',
}

const virtualServiceTypeFixture: Partial<ServiceType> = {
  id: testId,
  uuid: '87368bc7-a25d-3ee6-a5e9-92e995c1e856',
  type: ServiceTypeMethod.Virtual,
  superTypeId: superTypeOtherFixture.id,
  name: 'virtualServiceTypeFixture',
}

const serviceTypeFixture: Partial<ServiceType> = {
  id: testId + 1,
  uuid: '87368bc7-a25d-4ee6-a2e9-92e995c1e856',
  type: ServiceTypeMethod.InClinic,
  superTypeId: superTypeOtherFixture.id,
  name: 'inclinic',
}

const serviceTypeTentativeFixture: Partial<ServiceType> = {
  id: testId + 2,
  uuid: '87368ba7-a35d-2ee6-a2e9-92e995c1e856',
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
  virtualMeetingUrl: 'virtualMeetingUrl',
}

const appointmentTentativeFixture: Partial<Appointment> = {
  id: testId + 3,
  status: AppointmentStatus.Booked,
  patientId: patientFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeTentativeFixture.id,
  start: dateTimeUtil.toDate(`2020-06-17T03:24:00`),
  virtualMeetingUrl: 'virtualMeetingUrl',
}

const emailTemplateVirtualFixture: Partial<EmailTemplate> = {
  id: testId,
  type: EmailTemplateType.VirtualAppointmentReminder,
  disabled: false,
  subject: '<%= params.serviceTypeName %>',
  body: '<%= params.appointmentDateTime %> <%= params.serviceProviderName %> <%= params.meetingLink %> <%= params.serviceTypeName %> <%= params.firstName %>',
}

const emailTemplateFixture: Partial<EmailTemplate> = {
  id: testId + 1,
  type: EmailTemplateType.AppointmentReminder,
  disabled: false,
  subject: '<%= params.serviceTypeName %>',
  body: '<%= params.serviceProviderName %>',
}

describe('Create Cloud task for appointment reminder', () => {
  let cloudTaskSeed: CloudTaskSeed
  let dataSource: DataSource

  let patientSeed: PatientSeed
  let appointmentSeed: AppointmentSeed
  let serviceProviderSeed: ServiceProviderSeed
  let superTypeSeed: SuperTypeSeed
  let serviceTypeSeed: ServiceTypeSeed
  let emailTemplateSeed: EmailTemplateSeed

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
    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderFixture)
    await superTypeSeed.create(superTypeOtherFixture)
    await serviceTypeSeed.createArray([
      serviceTypeFixture,
      virtualServiceTypeFixture,
      serviceTypeTentativeFixture,
    ])
    await patientSeed.create(patientFixture)
    await emailTemplateSeed.createArray([emailTemplateVirtualFixture, emailTemplateFixture])
  })

  it('Should send virtual appointment reminder email', async () => {
    await appointmentSeed.create(appointmentVirtualPastFixture)

    const cloudTaskId = 'saghfdf34'

    await createCloudTask(appointmentVirtualPastFixture.id, cloudTaskId)

    const spyOnTaskRemoval = jest.spyOn(CloudTaskAdapter.prototype, 'deleteTask')
    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    const spyOnEmailServiceSending = jest.spyOn(
      AppointmentEmailService.prototype,
      'sendPatientEmail',
    )

    spyAdapterProvider.mockResolvedValue([
      {id: 'mailgun', name: 'mailgun', active: true, disabled: false} as EmailProvider,
    ])

    const payload: Partial<SendAppointmentReminderPubSubPayload> = {
      appointmentId: appointmentVirtualPastFixture.id,
      patientId: patientFixture.id,
    }

    await handlerSendAppointmentReminder(
      encodePubSubMessage(payload, SendAppointmentReminderSchema),
    )

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentVirtualPastFixture.id,
    )
    expect(cloudTasks.length).toBe(0)

    expect(spyOnTaskRemoval).toBeCalledWith(cloudTaskId)
    expect(spyOnTaskCreation).toBeCalledTimes(0)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: 'fhealthdev+emailNotVerified@gmail.com'}],
        subject: virtualServiceTypeFixture.name,
        html: expect.stringMatching(
          new RegExp(
            `Jun 16, 2020 - .* PM ${serviceProviderFixture.title} ${appointmentVirtualPastFixture.virtualMeetingUrl} ${virtualServiceTypeFixture.name} ${patientFixture.firstName}`,
          ),
        ),
      }),
    )
    expect(spyOnEmailServiceSending).toBeCalledTimes(1)

    spyAdapterProvider.mockRestore()
    spyOnTaskRemoval.mockClear()
    spyOnTaskCreation.mockClear()
    spyOnEmailSending.mockClear()
    spyOnEmailServiceSending.mockClear()
  })

  it('Should not send appointment reminder for tentative appointment', async () => {
    await appointmentSeed.create(appointmentTentativeFixture)

    const cloudTaskId = 'tentsaghfdf34'

    await createCloudTask(appointmentTentativeFixture.id, cloudTaskId)

    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const payload: Partial<SendAppointmentReminderPubSubPayload> = {
      appointmentId: appointmentTentativeFixture.id,
      patientId: patientFixture.id,
    }

    await handlerSendAppointmentReminder(
      encodePubSubMessage(payload, SendAppointmentReminderSchema),
    )

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentTentativeFixture.id,
    )
    expect(cloudTasks.length).toBe(0)

    expect(spyOnEmailSending).toBeCalledTimes(0)

    spyOnEmailSending.mockClear()
  })

  it('Should not send email but recreate virtual appointment reminder cloud task (appointment is far future)', async () => {
    await appointmentSeed.create(appointmentVirtualFixture)

    const cloudTaskId = 'sbasfdf34'

    await createCloudTask(appointmentVirtualFixture.id, cloudTaskId)

    const spyOnTaskRemoval = jest.spyOn(CloudTaskAdapter.prototype, 'deleteTask')
    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const payload: Partial<SendAppointmentReminderPubSubPayload> = {
      appointmentId: appointmentVirtualFixture.id,
      patientId: patientFixture.id,
    }

    await handlerSendAppointmentReminder(
      encodePubSubMessage(payload, SendAppointmentReminderSchema),
    )

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
    /**Create cloud task for 30 days from now (appointment date is in more than 100 years) */
    const targetDate = spyOnTaskCreation.mock.calls[0][0].targetDate
    expect(
      dateTimeUtil.isWithinInterval(targetDate, {
        start: dateTimeUtil.addDays(dateNow, 29),
        end: dateTimeUtil.addDays(dateNow, 31),
      }),
    )

    expect(spyOnEmailSending).toBeCalledTimes(0)

    spyOnTaskRemoval.mockClear()
    spyOnEmailSending.mockClear()
    spyOnTaskCreation.mockClear()
  })

  it('Should send appointment reminder email for inclinic appointment', async () => {
    await appointmentSeed.create(appointmentInClinicFixture)

    const cloudTaskId = 'sbghfdf34'

    await createCloudTask(appointmentInClinicFixture.id, cloudTaskId)

    const spyOnTaskRemoval = jest.spyOn(CloudTaskAdapter.prototype, 'deleteTask')
    const spyOnTaskCreation = jest.spyOn(CloudTaskAdapter.prototype, 'createTask')
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')
    spyAdapterProvider.mockResolvedValue([
      {id: 'mailgun', name: 'mailgun', active: true, disabled: false} as EmailProvider,
    ])

    const spyOnHelper = jest.spyOn(AppointmentReminderHelpers, 'requiresReminderEmail')

    const payload: Partial<SendAppointmentReminderPubSubPayload> = {
      appointmentId: appointmentInClinicFixture.id,
      patientId: patientFixture.id,
    }

    await handlerSendAppointmentReminder(
      encodePubSubMessage(payload, SendAppointmentReminderSchema),
    )

    expect(spyOnHelper).toReturnWith(true)

    const cloudTasks = await cloudTaskSeed.findByTypeAndAppointmentId(
      CloudTaskType.AppointmentReminder,
      appointmentInClinicFixture.id,
    )
    expect(cloudTasks.length).toBe(0)

    expect(spyOnTaskRemoval).toBeCalledWith(cloudTaskId)
    expect(spyOnTaskCreation).toBeCalledTimes(0)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: 'fhealthdev+emailNotVerified@gmail.com'}],
        subject: serviceTypeFixture.name,
        html: expect.stringMatching(new RegExp(`${serviceProviderFixture.title}`)),
      }),
    )

    spyAdapterProvider.mockClear()
    spyOnTaskRemoval.mockClear()
    spyOnTaskCreation.mockClear()
    spyOnEmailSending.mockClear()
  })

  it('Should check requiresReminderEmail helper', async () => {
    expect(
      AppointmentReminderHelpers.requiresReminderEmail({
        status: AppointmentStatus.NoShow,
        serviceType: {type: ServiceTypeMethod.Virtual},
      } as Appointment),
    ).toBeFalsy()

    expect(
      AppointmentReminderHelpers.requiresReminderEmail({
        status: AppointmentStatus.Booked,
        serviceType: {type: ServiceTypeMethod.Virtual},
      } as Appointment),
    ).toBeTruthy()

    expect(
      AppointmentReminderHelpers.requiresReminderEmail(
        {
          status: AppointmentStatus.Booked,
          serviceType: {type: ServiceTypeMethod.Virtual},
        } as Appointment,
        [],
      ),
    ).toBeFalsy()

    expect(
      AppointmentReminderHelpers.requiresReminderEmail(
        {
          status: AppointmentStatus.Booked,
          serviceType: {type: ServiceTypeMethod.InClinic},
        } as Appointment,
        ['1212'],
      ),
    ).toBeTruthy()

    expect(
      AppointmentReminderHelpers.requiresReminderEmail({
        status: AppointmentStatus.Cancelled,
        serviceType: {type: ServiceTypeMethod.Virtual},
      } as Appointment),
    ).toBeFalsy()
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
    await emailTemplateSeed.removeById(emailTemplateVirtualFixture.id)
    await emailTemplateSeed.removeById(emailTemplateFixture.id)

    await dataSource.destroy()
  })
})
