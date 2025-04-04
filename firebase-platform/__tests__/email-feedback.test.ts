import {AuthUserFixture} from '@libs/common/test/fixtures'
import {Patient, PatientContactForm} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  PatientContactFormSeed,
  PatientSeed,
  StaffSeed,
  StaffFeedbackSeed,
  ServiceProviderSeed,
  PatientPlanSeed,
  PlanTypeSeed,
  PlanCategorySeed,
  PatientPlanStatusSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {StaffFeedback} from '@libs/data-layer/apps/core/entities/typeorm'
import {
  buildContactFormBody,
  handlerContactFormEmail,
} from '../functions/email-notification/src/patient-contact-form/handler'
import {ContactFormSubmittedSchema} from '@libs/common/model/proto-schemas/contact-form-submitted.schema'
import {StaffFeedbackSubmittedSchema} from '@libs/common/model/proto-schemas/staff-feedback-submitted.schema'
import {
  buildStaffFeedbackBody,
  buildStaffFeedbackSubject,
  handlerStaffFeedbackEmail,
} from '../functions/email-notification/src/staff-feedback/handler'
import {
  buildDeletionRequestBody,
  handlerAccountDeletionRequestEmail,
} from '../functions/email-notification/src/account-deletion-requested/handler'
import {AuthUserIdSchema} from '@libs/common/model/proto-schemas/auth-user-id.schema'
import {NestprojectConfigService} from '@libs/common'
import {ServiceProvider} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {v4} from 'uuid'
import {
  PatientPlan,
  PatientPlanStatus,
  PlanCategory,
  PlanType,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PlanTypeGroup} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

const configService = NestprojectConfigService.getInstance()
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

const patient: Partial<Patient> = {
  id: commonId,
  authUserId: AuthUserFixture.emailVerifiedWithoutMFA.uid,
  firstName: 'Firstname',
  lastName: 'Firstname',
  patientIdentifier: 'PID12312312',
  serviceProviderId: serviceProviderId,
  email: 'fhealthdev+patAndApp@gmail.com',
}

export const patientPlanStatusFixture: Partial<PatientPlanStatus> = {
  id: commonId,
  uuid: '2gg0fb0d-fa7e-4e61-8f04-86fb0193eb3f',
  patientStatusAbbreviation: 'patienddtPlanStatusForAppointmentsByDateFixture',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 10,
}

export const planCategoryFixture: Partial<PlanCategory> = {
  id: commonId,
  uuid: 'b9c69f5f-bb93-46b2-8b15-f51506f994c4',
  title: 'Category',
}

export const planTypeFixture: Partial<PlanType> = {
  id: commonId,
  uuid: '4tt871b6-df81-4fc1-b414-3088c73eebba',
  planCategoryId: planCategoryFixture.id,
  planTypeGroup: PlanTypeGroup.IUI,
  patientPlanStatusId: patientPlanStatusFixture.id,
  useCareTeamEmailForContactUs: true,
}

const patientPlanFixture: Partial<PatientPlan> = {
  id: commonId,
  uuid: 'gg760745-de86-45cd-808f-f3980a0437b7',
  patientId: patient.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
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

const staffData: Partial<Staff> = {
  id: commonId,
  uuid: 'c52111f3-b9b4-48fe-94c9-f1b1egtthyu1',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'fhealthdev+test2@gmail.com',
  active: true,
}

const staffProviderData: Partial<Staff> = {
  id: commonProviderId,
  uuid: 'c52111f3-f9b4-48fe-94c9-f1b1egtthyu2',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'fhealthdev+test3@gmail.com',
  active: true,
  serviceProviderId: serviceProviderId,
  careTeamGroupEmail: 'fhealthdev+test3@gmail.com',
}

const staffFeedbackData: Partial<StaffFeedback> = {
  id: commonId,
  problem: 'problem',
  suggestion: 'lastName',
  staffId: commonId,
}

const serviceProviderData: Partial<ServiceProvider> = {
  id: serviceProviderId,
  uuid: v4(),
  title: 'title',
  imageURL: 'IMG',
  description: 'description',
  designation: 'designation',
}

describe('Firebase Function: email notifications for user feedback', () => {
  let dataSource: DataSource
  let patientContactFormSeed: PatientContactFormSeed
  let staffSeed: StaffSeed
  let patientSeed: PatientSeed
  let staffFeedbackSeed: StaffFeedbackSeed
  let serviceProviderSeed: ServiceProviderSeed
  let patientPlanSeed: PatientPlanSeed
  let planTypeSeed: PlanTypeSeed
  let planCategorySeed: PlanCategorySeed
  let patientPlanStatusSeed: PatientPlanStatusSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()

    patientContactFormSeed = new PatientContactFormSeed(dataSource)
    staffSeed = new StaffSeed(dataSource)
    staffFeedbackSeed = new StaffFeedbackSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    serviceProviderSeed = new ServiceProviderSeed(dataSource)

    patientPlanSeed = new PatientPlanSeed(dataSource)
    planTypeSeed = new PlanTypeSeed(dataSource)
    planCategorySeed = new PlanCategorySeed(dataSource)
    patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)

    await serviceProviderSeed.create(serviceProviderData)
    await patientSeed.createArray([patient, patientWithoutFirebaseUser])
    await patientContactFormSeed.create(patientContactForm)
    await staffSeed.createArray([staffData, staffProviderData])
    await staffFeedbackSeed.create(staffFeedbackData)

    await patientPlanStatusSeed.create(patientPlanStatusFixture)
    await planCategorySeed.create(planCategoryFixture)
    await planTypeSeed.create(planTypeFixture)
  })

  it('should send email for contact form', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage({contactFormId: patientContactForm.id}, ContactFormSubmittedSchema),
    )

    await handlerContactFormEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: noReplyEmail},
        to: [{email: staffProviderData.careTeamGroupEmail}],
        subject: patientContactForm.subject + ' - ' + patient.patientIdentifier,
        html: buildContactFormBody(patientContactForm.message, patient as Patient),
      }),
    )
    spyOnEmailSending.mockClear()
  })

  it('should not send email for contact form - contact form was not found', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const message = testPubSubEvent(
      encodePubSubMessage({contactFormId: 1337}, ContactFormSubmittedSchema),
    )

    await handlerContactFormEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('should send email for staff feedback', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage(
        {staffId: staffData.uuid, staffFeedbackId: commonId},
        StaffFeedbackSubmittedSchema,
      ),
    )

    await handlerStaffFeedbackEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: staffData.email},
        to: [{email: expect.any(String)}],
        subject: buildStaffFeedbackSubject(staffData as Staff),
        html: buildStaffFeedbackBody(staffFeedbackData as StaffFeedback),
        replyTo: {
          email: expect.any(String),
        },
      }),
    )
    spyOnEmailSending.mockClear()
  })

  it('should not send email for staff feedback - feedback was not found', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage({staffFeedbackId: 1337}, StaffFeedbackSubmittedSchema),
    )

    await handlerStaffFeedbackEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('should send email for account deletion request', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage({authUserId: patient.authUserId}, AuthUserIdSchema),
    )

    await handlerAccountDeletionRequestEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: noReplyEmail},
        to: [{email: expect.any(String)}],
        subject: `Account Deletion Requested - ${patient.patientIdentifier}`,
        html: buildDeletionRequestBody(patient as Patient),
      }),
    )
    spyOnEmailSending.mockClear()
  })

  it('should not send email for account deletion request - patient was not found', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(encodePubSubMessage({authUserId: '1337'}, AuthUserIdSchema))

    await handlerAccountDeletionRequestEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('should not send email for account deletion request - patient doesnt have firebase user', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage({authUserId: patientWithoutFirebaseUser.authUserId}, AuthUserIdSchema),
    )

    await handlerAccountDeletionRequestEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(0)
    spyOnEmailSending.mockClear()
  })

  it('should send email for contact form to careTeamGroupEmail if PlanIs active and With flag:useCareTeamEmailForContactUs', async () => {
    await patientPlanSeed.create(patientPlanFixture)

    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    const message = testPubSubEvent(
      encodePubSubMessage({contactFormId: patientContactForm.id}, ContactFormSubmittedSchema),
    )

    await handlerContactFormEmail(message)

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        to: [{email: staffProviderData.careTeamGroupEmail}],
        replyTo: {email: patient.email},
      }),
    )
    spyOnEmailSending.mockClear()
  })

  afterAll(async () => {
    jest.clearAllMocks()

    await patientPlanSeed.removeById(patientPlanFixture.id)
    await planTypeSeed.removeById(planTypeFixture.id)
    await planCategorySeed.removeById(planCategoryFixture.id)
    await patientPlanStatusSeed.removeById(patientPlanStatusFixture.id)

    await patientContactFormSeed.deleteByPatientId(patient.id)
    await patientSeed.removeByIds([patient.id, patientWithoutFirebaseUser.id])
    await staffFeedbackSeed.removeByIds([commonId])
    await staffSeed.removeByIds([commonId, commonProviderId])
    await serviceProviderSeed.removeById(serviceProviderId), await dataSource.destroy()
  })
})
