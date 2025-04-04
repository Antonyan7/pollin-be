import {AuthUserFixture} from '@libs/common/test/fixtures'
import {
  Patient,
  PatientContactForm,
  PatientFeedbackForm,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  PatientContactFormSeed,
  PatientSeed,
  StaffSeed,
  StaffFeedbackSeed,
  ServiceProviderSeed,
  ServiceCategoryInputSeed,
  PatientFeedbackFormSeed,
  AppointmentSeed,
  ServiceTypeSeed,
  ServiceCategorySeed,
  SuperTypeSeed,
  EmailTemplateSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {v4} from 'uuid'
import {handlerPatientFeedbackEmail} from '../functions/email-notification/src/send-patient-feedback-to-clinic-team/handler'
import {SendFeedbackToClinicTeamPayloadSchema} from '@libs/common/model/proto-schemas/send-patient-feedback.schema'
import {AppointmentStatus} from '@libs/common/enums'
import {PatientFeedbackFormSatisfactionLevelEnum} from '@libs/services-common/enums/patient-feedback-form-satisfaction-level.enum'
import {SuperType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {EmailTemplate} from '@libs/data-layer/apps/email/entities/typeorm'
import {EmailTemplateType} from '@libs/data-layer/apps/email/enums/email-type.enum'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

const configService = NestprojectConfigService.getInstance()

const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
const noReplyEmail = configService.get<string>('Nestproject_EMAIL_FROM_NO_REPLY_ADDRESS')

jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('../../libs/common/src/adapters/firebase/firebase-auth.adapter')
jest.mock('../../libs/common/src/adapters/mailgun.adapter.ts')
jest.mock('../../libs/common/src/adapters/sendinblue.adapter.ts')
jest.mock('@google-cloud/logging-bunyan')
jest.setTimeout(10000)

const commonId = 111333
const commonProviderId = 11133322
const serviceProviderId = 555100000

export const serviceCategoryData: ServiceCategoryInputSeed = {
  id: 55510001,
}

export const superTypeFixture: Partial<SuperType> = {
  id: 33553,
  uuid: 33553 + '2ef-f169-4850-b37b-42e1ee67d695',
  name: 'superTypeFixture',
  groupOrderActionsByWorkflow: true,
}

export const serviceTypeData: Partial<ServiceType> = {
  id: 55510002,
  serviceCategoryId: serviceCategoryData.id,
  superTypeId: superTypeFixture.id,
  name: 'serviceTypeName',
}
export const serviceTypeTentativeData: Partial<ServiceType> = {
  id: 55510003,
  serviceCategoryId: serviceCategoryData.id,
  superTypeId: superTypeFixture.id,
  isTentative: true,
  name: 'tentative',
}

const serviceProviderData: Partial<ServiceProvider> = {
  id: 55510003,
  uuid: v4(),
  title: 'title',
  imageURL: 'IMG',
  description: 'description',
  designation: 'designation',
}

const patient: Partial<Patient> = {
  id: 111333232,
  authUserId: AuthUserFixture.emailVerifiedWithoutMFA.uid,
  firstName: 'Firstnamedfd',
  lastName: 'Firstnamedfdd',
  patientIdentifier: 'PID12312312sd3',
  serviceProviderId: serviceProviderData.id,
}

export const appointmentData: Partial<Appointment> = {
  id: 33554,
  uuid: 33554 + '2ef-f169-4850-b37b-42e1ee67d695',
  status: AppointmentStatus.Done,
  patientId: patient.id,
  serviceProviderId: serviceProviderData.id,
  serviceTypeId: serviceTypeData.id,
  start: dateTimeUtil.subtractDays(dateTimeUtil.now(), 1),
  end: dateTimeUtil.addMinutes(dateTimeUtil.subtractDays(dateTimeUtil.now(), 1), 30),
}
export const appointmentCanceledData: Partial<Appointment> = {
  id: 33577,
  uuid: 33577 + '2ef-f169-4850-b37b-42e1ee67d695',
  status: AppointmentStatus.Cancelled,
  patientId: patient.id,
  serviceProviderId: serviceProviderData.id,
  serviceTypeId: serviceTypeData.id,
  start: dateTimeUtil.subtractDays(dateTimeUtil.now(), 1),
  end: dateTimeUtil.addMinutes(dateTimeUtil.subtractDays(dateTimeUtil.now(), 1), 30),
}
export const appointmentTentativeData: Partial<Appointment> = {
  id: 33578,
  uuid: 33578 + '2ef-f169-4850-b37b-42e1ee67d695',
  status: AppointmentStatus.Done,
  patientId: patient.id,
  serviceProviderId: serviceProviderData.id,
  serviceTypeId: serviceTypeTentativeData.id,
  start: dateTimeUtil.subtractDays(dateTimeUtil.now(), 1),
  end: dateTimeUtil.addMinutes(dateTimeUtil.subtractDays(dateTimeUtil.now(), 1), 30),
}

export const patientFeedbackFormFixtureCF: Partial<PatientFeedbackForm> = {
  id: 33555,
  uuid: 33555 + '2ef-f169-4850-b37b-42e1ee67d695',
  appointmentId: appointmentData.id,
  feedback: '',
  satisfactionLevel: PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel5,
}

const patientWithoutFirebaseUser: Partial<Patient> = {
  id: 1244,
  authUserId: 'patient_without_authUser',
  firstName: 'Firstname',
  lastName: 'Firstname',
}

const patientContactForm: Partial<PatientContactForm> = {
  id: commonId,
  patientId: patient.id,
  message: 'message',
  subject: 'subject',
}

export const emailTemplateData: Partial<EmailTemplate> = {
  id: 33557,
  type: EmailTemplateType.PatientProvidedFeedback,
  body: `exampleOfStringFOrPatientProvidedFeedback <% params.appointments.forEach(function(appointment) { %>
    <div style="margin-bottom: 12px;">
     <p style="color: #526366; padding: 0; margin: 0;"><%= appointment.serviceTypeName %> (<%= appointment.durationInMin %> minutes) @ <%= appointment.startTime %> (EST) <%= appointment.canceledOrNoShowStatusInBrackets %></p>
    </div>
    <% }); %>`,
  subject: 'exampleForemailTemplateData',
}

describe('Firebase Function: email notifications for patient feedback based on appointment', () => {
  let dataSource: DataSource
  let patientContactFormSeed: PatientContactFormSeed
  let staffSeed: StaffSeed
  let patientSeed: PatientSeed
  let serviceCategorySeed: ServiceCategorySeed
  let serviceTypeSeed: ServiceTypeSeed
  let serviceProviderSeed: ServiceProviderSeed
  let appointmentSeed: AppointmentSeed
  let superTypeSeed: SuperTypeSeed
  let emailTemplateSeed: EmailTemplateSeed

  let patientFeedbackFormSeed: PatientFeedbackFormSeed

  let staffFeedbackSeed: StaffFeedbackSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientContactFormSeed = new PatientContactFormSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    staffFeedbackSeed = new StaffFeedbackSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)
    serviceCategorySeed = new ServiceCategorySeed(dataSource)
    serviceTypeSeed = new ServiceTypeSeed(dataSource)
    appointmentSeed = new AppointmentSeed(dataSource)
    patientFeedbackFormSeed = new PatientFeedbackFormSeed(dataSource)
    superTypeSeed = new SuperTypeSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.createArray([patient, patientWithoutFirebaseUser])
    await patientContactFormSeed.create(patientContactForm)

    await superTypeSeed.create(superTypeFixture)
    await serviceCategorySeed.create(serviceCategoryData)
    await serviceTypeSeed.createArray([serviceTypeData, serviceTypeTentativeData])
    await appointmentSeed.createArray([
      appointmentData,
      appointmentCanceledData,
      appointmentTentativeData,
    ])

    await patientFeedbackFormSeed.create(patientFeedbackFormFixtureCF)

    await emailTemplateSeed.create(emailTemplateData)
  })

  it('Should not send email if feedback without comment and good satisfied levels ', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {patientFeedbackId: patientFeedbackFormFixtureCF.id},
        SendFeedbackToClinicTeamPayloadSchema,
      ),
    )

    await handlerPatientFeedbackEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('Should send email for feedback based on appointment data', async () => {
    await patientFeedbackFormSeed.update(patientFeedbackFormFixtureCF.id, {
      feedback: 'testing feedback form fixture',
      satisfactionLevel: PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel1,
    })

    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {patientFeedbackId: patientFeedbackFormFixtureCF.id},
        SendFeedbackToClinicTeamPayloadSchema,
      ),
    )

    await handlerPatientFeedbackEmail(message)

    expect(spyOnEmailSending.mock.calls[0][0].html).not.toContain(serviceTypeTentativeData.name)
    expect(spyOnEmailSending.mock.calls[0][0].html).toContain(serviceTypeData.name)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: noReplyEmail},
        to: [{email: expect.any(String)}],
        subject: emailTemplateData.subject,
        html: expect.stringContaining('(Cancelled)'),
      }),
    )
    spyOnEmailSending.mockClear()

    await serviceTypeSeed.updateIsTentative(serviceTypeTentativeData.id, false)
    await handlerPatientFeedbackEmail(message)

    expect(spyOnEmailSending.mock.calls[0][0].html).toContain(serviceTypeTentativeData.name)
    spyOnEmailSending.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await patientContactFormSeed.deleteByPatientId(patient.id)
    await patientSeed.removeByIds([patient.id, patientWithoutFirebaseUser.id])
    await staffFeedbackSeed.removeByIds([commonId])
    await staffSeed.removeByIds([commonId, commonProviderId])
    await serviceProviderSeed.removeById(serviceProviderId)
    await appointmentSeed.removeByIds([
      appointmentData.id,
      appointmentCanceledData.id,
      appointmentTentativeData.id,
    ])
    await serviceTypeSeed.removeByIds([serviceTypeData.id, serviceTypeTentativeData.id])
    await dataSource.destroy()
  })
})
