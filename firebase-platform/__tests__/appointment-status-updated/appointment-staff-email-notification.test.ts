import {AppointmentStatus} from '@libs/common/enums'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  createAppointmentStatusUpdatedFixtures,
  appointmentFixture,
  destroyAppointmentStatusUpdatedFixtures,
  appointmentTentativeFixture,
} from './seed'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {
  AppointmentStatusUpdatedErrors,
  handlerAppointmentUpdatedEmail,
} from '@firebase-platform/functions/email-notification/src/appointment-updated/handler'
import {
  AppointmentUpdatedPubSubPayload,
  AppointmentUpdatedSchema,
} from '@libs/common/model/proto-schemas/appointment-updated.schema'
import {
  AppointmentRescheduledErrors,
  handlerAppointmentRescheduled,
} from '@firebase-platform/functions/email-notification/src/appointment-rescheduled/handler'
import {DateTimeUtil} from '@libs/common'
import {EmailTemplateSeed} from '@seeds/typeorm/email-template.seed'
import {
  appointmentCancelledTemplateFixture,
  appointmentNoShowTemplateFixture,
  staffAppointmentCancelledTemplateFixture,
  staffAppointmentRescheduledTemplateFixture,
} from '../fixtures/email-template.fixture'
import {HistoryUserType} from '@libs/common/enums'
import {AppointmentEmailService} from '@firebase-platform/functions/email-notification/src/common/appointment-email.service'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

const dateTimeUtil = new DateTimeUtil()

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('../../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../../libs/common/src/adapters/sendinblue.adapter.ts')

jest.mock('@google-cloud/logging-bunyan')
jest.setTimeout(10000)

describe('Email notifications on appointment-status updates', () => {
  let dataSource: DataSource
  let emailTemplateSeed: EmailTemplateSeed

  const spyAdapterProvider = jest.spyOn(EmailAdapterProvider.prototype, 'fetchActiveProviders')

  beforeAll(async () => {
    spyAdapterProvider.mockResolvedValue([
      {
        id: 'mailgun',
        name: 'mailgun',
        active: true,
        disabled: false,
        createdAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
        updatedBy: 'TEST',
      },
    ])

    dataSource = await getCreateDatabaseConnection()
    await createAppointmentStatusUpdatedFixtures(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)
    await emailTemplateSeed.createArray([
      staffAppointmentRescheduledTemplateFixture,
      appointmentCancelledTemplateFixture,
      appointmentNoShowTemplateFixture,
      staffAppointmentCancelledTemplateFixture,
    ])
  })

  it('should not send email for appointment with updated status - Booked', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Booked},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentUpdatedEmail(message)
    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('should not send email for appointment with updated status - appointment was not found', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data = {
      appointmentId: 113722,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Booked},
      authUserFullName: 'fullName',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    const result = await handlerAppointmentUpdatedEmail(message)
    expect(result).toBe(AppointmentStatusUpdatedErrors.AppointmentNotFound)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('should send email only for patient for appointment with updated status - NoShow', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyOnEmailServiceSending = jest.spyOn(
      AppointmentEmailService.prototype,
      'sendPatientEmail',
    )

    const data: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.NoShow},
      authUserFullName: 'full name',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentUpdatedEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailServiceSending).toBeCalledTimes(1)
    spyOnEmailSending.mockClear()
    spyOnEmailServiceSending.mockClear()
  })

  it('should not send email for tentative appointment', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyOnEmailServiceSending = jest.spyOn(
      AppointmentEmailService.prototype,
      'sendPatientEmail',
    )

    const data: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentTentativeFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.NoShow},
      authUserFullName: 'full name',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentUpdatedEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    expect(spyOnEmailServiceSending).toBeCalledTimes(1)
    spyOnEmailSending.mockClear()
    spyOnEmailServiceSending.mockClear()
  })

  it('should send email for patient and staff for appointment with updated status - Cancelled', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Cancelled},
      authUserFullName: 'full name',
      authUserType: HistoryUserType.ClinicUser,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentUpdatedEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(2)
    spyOnEmailSending.mockClear()
  })
  it('should send email for patient and staff for appointment with updated status - Cancelled', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {status: AppointmentStatus.Booked},
      newAppointment: {status: AppointmentStatus.Cancelled},
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentUpdatedEmail(message)

    const staffEmailPayload = spyOnEmailSending.mock.calls
    expect(staffEmailPayload.length).toBeGreaterThan(0)
    expect(staffEmailPayload).toBeDefined()
    const expectedSubject = `Appointment Cancelled - ${appointmentFixture.identifier}`
    const payloadSubjects = staffEmailPayload.map((call) => call[0].subject)

    expect(payloadSubjects[1]).toContain(expectedSubject)
    spyOnEmailSending.mockClear()
  })

  it('should send email for staff for rescheduled appointment', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {date: '2020-10-31T01:20:00Z'},
      newAppointment: {date: '2020-10-31T01:30:00Z'},
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentRescheduled(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({subject: expect.stringContaining(`Appointment Rescheduled - `)}),
    )
    spyOnEmailSending.mockClear()
  })

  it('should send email for staff for rescheduled appointment', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {date: '2020-10-31T01:30:00Z'},
      newAppointment: {date: '2020-11-31T01:30:00Z'},
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentRescheduled(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({subject: expect.stringContaining(`Appointment Rescheduled - `)}),
    )
    spyOnEmailSending.mockClear()
  })

  it('should disabled email template', async () => {
    await emailTemplateSeed.disable(staffAppointmentRescheduledTemplateFixture.id)
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {date: '2020-10-31T01:30:00Z'},
      newAppointment: {date: '2020-10-31T01:30:00Z'},
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    await handlerAppointmentRescheduled(message)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
    await emailTemplateSeed.enable(staffAppointmentRescheduledTemplateFixture.id)
  })

  it('should not send email for staff for rescheduled appointment with updated type', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const data: Partial<AppointmentUpdatedPubSubPayload> = {
      appointmentId: appointmentFixture.id,
      oldAppointment: {date: '2020-10-31T01:30:00Z'},
      newAppointment: {date: '2020-10-31T01:30:00Z'},
    }
    const message = testPubSubEvent(encodePubSubMessage(data, AppointmentUpdatedSchema))

    const result = await handlerAppointmentRescheduled(message)
    expect(result).toBe(AppointmentRescheduledErrors.AppointmentWasNotChanged)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  afterAll(async () => {
    spyAdapterProvider.mockRestore()
    jest.clearAllMocks()

    await destroyAppointmentStatusUpdatedFixtures(dataSource)
    await emailTemplateSeed.deleteByIds([
      appointmentNoShowTemplateFixture.id,
      appointmentCancelledTemplateFixture.id,
      staffAppointmentRescheduledTemplateFixture.id,
      staffAppointmentCancelledTemplateFixture.id,
    ])
    await dataSource.destroy()
  })
})
