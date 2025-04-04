import {Patient} from '@libs/data-layer/apps/users/entities/typeorm/patient.entity'
import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {patientUpdateHandler} from '@firebase-platform/functions/patients/src/handlers/patient-updated'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {PatientPartner} from '@libs/data-layer/apps/users/entities/typeorm'
import {PartnerStatusEnum} from '@libs/data-layer/apps/users/enum'
import {
  PatientSeed,
  PatientPartnerSeed,
  EmailTemplateSeed,
  PatientPlanSeed,
  PlanCategorySeed,
  PatientPlanStatusSeed,
  PlanTypeSeed,
} from '@seeds/typeorm'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {PatientStatusEnum, RelationshipEnum} from '@libs/services-common/enums'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  PatientUpdatePubSubPayload,
  PatientUpdateSchema,
} from '@libs/common/model/proto-schemas/patient-update.schema'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {updateEmailAndPhoneNumber} from '@firebase-platform/functions/patients/src/handlers/patient-updated/update-email-phone-number'
import {deactivatePatient} from '@firebase-platform/functions/patients/src/handlers/patient-updated/patient-deletion'
import {DateTimeUtil} from '@libs/common'
import {
  emailTemplatedPatientDeactivatedFixture,
  emailTemplatedPatientRestoredFixture,
} from '../fixtures/email-template.fixture'
import {restorePatient} from '@firebase-platform/functions/patients/src/handlers/patient-updated/patient-restoration'
import {
  PatientPlan,
  PatientPlanStatus,
  PlanCategory,
  PlanType,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {EmailAdapterProvider} from '@libs/services-common/emails/email-provider'

jest.mock('@google-cloud/logging-bunyan')
jest.mock('@libs/common/adapters/mailgun.adapter')
jest.mock('@libs/common/adapters/sendinblue.adapter')
jest.mock('@libs/common/adapters/firebase/firebase-auth.adapter')
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.setTimeout(10000)

const patientId = 100000001
const partnerId = 100000002
const invitationId = 100000003
const partnerSecondId = 100000004
const patientPartnerSecondId = 100000005
const secondPatientId = 100000006

const patientFixture: Patient = {
  id: patientId,
  authUserId: AuthUserFixture.authUserToUpdateEmailOnCF.uid,
  firstName: 'Test',
  lastName: 'Patient',
  sexAtBirth: SexAtBirth.Male,
  email: 'fhealthdev+old@gmail.com',
  phoneNumber: null,
  status: PatientStatusEnum.Active,
} as Patient

const secondPatient: Partial<Patient> = {
  id: secondPatientId,
  authUserId: 'authUserId',
  firstName: 'Test',
  lastName: 'Patient',
  sexAtBirth: SexAtBirth.Male,
  email: 'fhealthdev+old1@gmail.com',
  phoneNumber: null,
  hasSameSexPartner: true,
}

const partnerFixture: Patient = {
  id: partnerId,
  authUserId: 'TEST_USER_2',
  firstName: 'Test',
  lastName: 'Partner (Deleted)',
  sexAtBirth: SexAtBirth.Male,
} as Patient

const partnerSecondFixture: Partial<Patient> = {
  id: partnerSecondId,
  authUserId: 'TEST_USER_3',
  firstName: 'Test',
  lastName: 'Partner',
  sexAtBirth: SexAtBirth.Male,
}

const patientPartnerFixture: Partial<PatientPartner> = {
  id: invitationId,
  patientId: patientId,
  partnerId: partnerId,
  partnerEmail: AuthUserFixture.emailVerified.email,
  relationship: RelationshipEnum.Married,
  status: PartnerStatusEnum.Accepted,
}

const patientPartnerSecondFixture: Partial<PatientPartner> = {
  id: patientPartnerSecondId,
  patientId: patientId,
  partnerId: partnerSecondId,
  partnerEmail: AuthUserFixture.milestone.email,
  relationship: RelationshipEnum.Married,
  status: PartnerStatusEnum.Accepted,
}

const planCategoryFixture: Partial<PlanCategory> = {
  id: patientId,
  uuid: 'b9c29f5a-bb93-46b2-8b15-f51506f994c4',
  title: 'Category',
}
const patientPlanStatusFixture: Partial<PatientPlanStatus> = {
  id: patientId,
  uuid: '2f50fc0a-ba7e-4e61-8f04-86fb0193eb3f',
  patientStatusAbbreviation: 'ac',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 3,
}
const planTypeFixture: Partial<PlanType> = {
  id: patientId,
  planCategoryId: planCategoryFixture.id,
  patientPlanStatusId: patientPlanStatusFixture.id,
}
const patientPlanFixture: Partial<PatientPlan> = {
  id: patientId,
  uuid: 'b2b22f3c-cc13-46b1-8b15-a51503f994b2',
  planTypeId: planTypeFixture.id,
  patientId: patientFixture.id,
  status: PlanStatusEnum.Active,
}

const dateTimeUtil = new DateTimeUtil()

describe('Handler: patientUpdateHandler', () => {
  let dataSource: DataSource
  let patientPartnerSeed: PatientPartnerSeed
  let patientSeed: PatientSeed
  let emailTemplateSeed: EmailTemplateSeed
  let patientPlanSeed: PatientPlanSeed
  let planCategorySeed: PlanCategorySeed
  let patientPlanStatusSeed: PatientPlanStatusSeed
  let planTypeSeed: PlanTypeSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientPartnerSeed = new PatientPartnerSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)
    emailTemplateSeed = new EmailTemplateSeed(dataSource)
    patientPlanSeed = new PatientPlanSeed(dataSource)
    planCategorySeed = new PlanCategorySeed(dataSource)
    patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
    planTypeSeed = new PlanTypeSeed(dataSource)

    await patientSeed.createArray([
      patientFixture,
      partnerFixture,
      partnerSecondFixture,
      secondPatient,
    ])
    await patientPartnerSeed.createArray([patientPartnerFixture, patientPartnerSecondFixture])
    await emailTemplateSeed.createArray([
      emailTemplatedPatientDeactivatedFixture,
      emailTemplatedPatientRestoredFixture,
    ])
    await planCategorySeed.create(planCategoryFixture)
    await patientPlanStatusSeed.create(patientPlanStatusFixture)
    await planTypeSeed.create(planTypeFixture)
    await patientPlanSeed.create(patientPlanFixture)
  })

  test('should update patients hasSameSexPartner & firebase user email', async () => {
    const spyOnEmailUpdate = jest.spyOn(FirebaseAuthAdapter.prototype, 'updateAuthUserEmail')

    await patientSeed.updatePatient(patientId, {
      hasSameSexPartner: false,
    })
    await patientSeed.updatePatient(partnerId, {
      hasSameSexPartner: false,
    })
    const data: PatientUpdatePubSubPayload = {
      patientId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PatientUpdateSchema))

    await patientUpdateHandler(message)

    const updatedPartner = await patientSeed.findOneById(partnerId)
    const updatedPatient = await patientSeed.findOneById(patientId)
    expect(updatedPartner.hasSameSexPartner).toBe(true)
    expect(updatedPatient.hasSameSexPartner).toBe(true)

    expect(spyOnEmailUpdate).toHaveBeenCalledWith(
      patientFixture.authUserId,
      patientFixture.email,
      true,
    )
    spyOnEmailUpdate.mockRestore()
  })

  test('should update patients hasSameSexPartner failed', async () => {
    const spyOnEmailUpdate = jest.spyOn(FirebaseAuthAdapter.prototype, 'updateAuthUserEmail')

    await patientSeed.updatePatient(patientId, {
      hasSameSexPartner: false,
    })
    await patientSeed.updatePatient(partnerId, {
      hasSameSexPartner: false,
    })

    const data: PatientUpdatePubSubPayload = {
      patientId: 123456,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PatientUpdateSchema))

    await expect(patientUpdateHandler(message)).rejects.toThrow('Patient was not found')

    const updatedPartner = await patientSeed.findOneById(partnerId)
    const updatedPatient = await patientSeed.findOneById(patientId)
    expect(updatedPartner.hasSameSexPartner).toBe(false)
    expect(updatedPatient.hasSameSexPartner).toBe(false)

    expect(spyOnEmailUpdate).not.toBeCalled()
    spyOnEmailUpdate.mockRestore()
  })

  test('should update patients hasSameSexPartner false', async () => {
    const data: PatientUpdatePubSubPayload = {
      patientId: secondPatientId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PatientUpdateSchema))

    await patientUpdateHandler(message)

    const updatedPatient = await patientSeed.findOneById(secondPatientId)
    expect(updatedPatient.hasSameSexPartner).toBe(false)
  })

  test('should update partner hasSameSexPartner', async () => {
    const data: PatientUpdatePubSubPayload = {
      patientId: partnerId,
    }

    await patientSeed.updatePatient(patientId, {
      hasSameSexPartner: false,
    })
    await patientSeed.updatePatient(partnerId, {
      hasSameSexPartner: false,
    })

    const message = testPubSubEvent(encodePubSubMessage(data, PatientUpdateSchema))

    await patientUpdateHandler(message)

    const updatedPartner = await patientSeed.findOneById(partnerId)
    const updatedPatient = await patientSeed.findOneById(patientId)
    expect(updatedPartner.hasSameSexPartner).toBe(true)
    expect(updatedPatient.hasSameSexPartner).toBe(true)
  })

  test('should test all cases of updating email & phone number', async () => {
    const spyOnEmailUpdate = jest.spyOn(FirebaseAuthAdapter.prototype, 'updateAuthUserEmail')
    const spyOnPhoneNumberUpdate = jest.spyOn(
      FirebaseAuthAdapter.prototype,
      'updateAuthUserPhoneNumber',
    )

    const newEmail = 'fhealthdev+new@gmail.com'
    const newPhoneNumber = '5555'

    /**Email & phone number were updated */
    await updateEmailAndPhoneNumber({
      ...patientFixture,
      email: newEmail,
      phoneNumber: newPhoneNumber,
    })
    expect(spyOnEmailUpdate).toHaveBeenCalledWith(patientFixture.authUserId, newEmail, true)
    expect(spyOnPhoneNumberUpdate).toHaveBeenCalledWith(patientFixture.authUserId, newPhoneNumber)
    spyOnEmailUpdate.mockClear()
    spyOnPhoneNumberUpdate.mockClear()

    /**Email & phone number were not updated */
    await updateEmailAndPhoneNumber({
      ...patientFixture,
      email: 'fhealthdev+authUserToUpdateEmailOnCF@gmail.com',
      phoneNumber: '+15554443333',
    })
    expect(spyOnEmailUpdate).toHaveBeenCalledTimes(0)
    expect(spyOnPhoneNumberUpdate).toHaveBeenCalledTimes(0)

    /**New email is not valid & new phone number is null */
    await updateEmailAndPhoneNumber({
      ...patientFixture,
      email: 'not valid',
      phoneNumber: null,
    })
    expect(spyOnEmailUpdate).toHaveBeenCalledTimes(0)
    expect(spyOnPhoneNumberUpdate).toHaveBeenCalledTimes(0)

    /**Auth user was not found */
    await updateEmailAndPhoneNumber({
      ...patientFixture,
      authUserId: 'not found',
      email: 'fhealthdev+new2@gmail.com',
      phoneNumber: '1234',
    })
    expect(spyOnEmailUpdate).toHaveBeenCalledTimes(0)
    expect(spyOnPhoneNumberUpdate).toHaveBeenCalledTimes(0)
  })

  test('should deactivate patient - success', async () => {
    const spyOnAuthUserDeletion = jest.spyOn(FirebaseAuthAdapter.prototype, 'deleteUser')
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')

    // should not deacivate patient - deletedAt is null
    await deactivatePatient(patientFixture)
    expect(spyOnAuthUserDeletion).toHaveBeenCalledTimes(0)
    expect((await patientSeed.findOneSoftDeleted(patientId)).status).toBe(PatientStatusEnum.Active)

    expect(spyOnEmailSending).toBeCalledTimes(0)

    // should deacivate partner and patient_partner using partnerId
    await deactivatePatient({
      ...partnerFixture,
      status: PatientStatusEnum.Active,
      deletedAt: new DateTimeUtil().now(),
      authUserId: 'not found',
    })

    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnAuthUserDeletion).toHaveBeenCalledTimes(0)
    expect(await patientSeed.findOneSoftDeleted(patientPartnerFixture.partnerId)).toMatchObject({
      status: PatientStatusEnum.Deactivated,
      lastName: partnerFixture.lastName,
    })
    expect(await patientPartnerSeed.findOneByIdWithDeleted(patientPartnerFixture.id)).toMatchObject(
      {
        restorable: true,
        deletedAt: expect.any(Date),
      },
    )

    const patientEmail = 'patientEmai'

    // should deacivate patient and patient_partner using patientId
    await deactivatePatient({
      ...patientFixture,
      deletedAt: new DateTimeUtil().now(),
      email: patientEmail,
      authUserId: AuthUserFixture.authUserToUpdateEmailOnCF.uid,
    })
    expect(spyOnAuthUserDeletion).toHaveBeenCalledTimes(1)
    expect(await patientSeed.findOneSoftDeleted(patientId)).toMatchObject({
      status: PatientStatusEnum.Deactivated,
      lastName: patientFixture.lastName + ' (Deleted)',
    })

    expect(
      await patientPartnerSeed.findOneByIdWithDeleted(patientPartnerSecondFixture.id),
    ).toMatchObject({
      restorable: true,
      deletedAt: expect.any(Date),
    })

    expect(spyOnEmailSending).toBeCalledTimes(2)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: patientEmail}],
        subject: emailTemplatedPatientDeactivatedFixture.subject,
        html: emailTemplatedPatientDeactivatedFixture.body
          .replace('<%= params.firstName %>', patientFixture.firstName)
          .replace('<%= params.email %>', patientEmail),
      }),
    )
    spyOnEmailSending.mockClear()

    spyOnAuthUserDeletion.mockClear()
  })

  test('should restore patients - success', async () => {
    const spyOnEmailSending = jest.spyOn(EmailAdapterProvider.prototype, 'sendEmail')
    const spyOnGetAuthUser = jest.spyOn(FirebaseAuthAdapter.prototype, 'getAuthUserByEmail')
    const spyOnCreateAuthUser = jest.spyOn(FirebaseAuthAdapter.prototype, 'createAuthUser')

    await patientSeed.updatePatient(patientFixture.id, {deletedAt: dateTimeUtil.now()})

    // should not restore patient - deletedAt is not null
    await restorePatient({
      ...patientFixture,
      deletedAt: dateTimeUtil.now(),
      status: PatientStatusEnum.Deactivated,
    })
    expect((await patientSeed.findOneSoftDeleted(patientId)).status).toBe(
      PatientStatusEnum.Deactivated,
    )
    expect(spyOnEmailSending).toBeCalledTimes(0)

    // should not restore patient - patient is not Deactivated
    await restorePatient({
      ...patientFixture,
      deletedAt: null,
      status: PatientStatusEnum.Active,
    })
    expect((await patientSeed.findOneSoftDeleted(patientId)).status).toBe(
      PatientStatusEnum.Deactivated,
    )
    expect(spyOnEmailSending).toBeCalledTimes(0)

    // should restore partner and not restore patient_partner because main patient is soft deleted + link existing authUserId
    await restorePatient({
      ...partnerFixture,
      deletedAt: null,
      status: PatientStatusEnum.Deactivated,
      email: AuthUserFixture.emailVerifiedWithoutMFA.email,
    })
    expect(spyOnEmailSending).toBeCalledTimes(1)
    expect(spyOnGetAuthUser).toBeCalledTimes(1)
    expect(spyOnCreateAuthUser).toBeCalledTimes(0)
    expect(await patientSeed.findOneSoftDeleted(patientPartnerFixture.partnerId)).toMatchObject({
      status: PatientStatusEnum.NotActive,
      lastName: 'Partner',
      authUserId: AuthUserFixture.emailVerifiedWithoutMFA.uid,
    })
    //main patient is stil soft deleted
    expect(await patientPartnerSeed.findOneByIdWithDeleted(patientPartnerFixture.id)).toMatchObject(
      {
        restorable: true,
        deletedAt: expect.any(Date),
      },
    )

    await patientSeed.updatePatient(patientFixture.id, {deletedAt: null})

    // should restore patient and patient_partner using patientId + create auth user
    const patientEmail = 'patientEmail532453'

    await restorePatient({
      ...patientFixture,
      lastName: patientFixture.lastName + '    (Deleted)',
      deletedAt: null,
      email: patientEmail,
      status: PatientStatusEnum.Deactivated,
    })
    expect(await patientSeed.findOneSoftDeleted(patientId)).toMatchObject({
      status: PatientStatusEnum.PlanType,
      lastName: patientFixture.lastName,
      authUserId: patientEmail + '_mocked',
    })

    // all patients were restored
    expect(
      await patientPartnerSeed.findOneByIdWithDeleted(patientPartnerSecondFixture.id),
    ).toMatchObject({
      restorable: false,
      deletedAt: null,
    })
    expect(await patientPartnerSeed.findOneByIdWithDeleted(patientPartnerFixture.id)).toMatchObject(
      {
        restorable: false,
        deletedAt: null,
      },
    )

    expect(spyOnEmailSending).toBeCalledTimes(2)
    expect(spyOnEmailSending).toBeCalledWith(
      expect.objectContaining({
        from: {email: expect.any(String)},
        to: [{email: patientEmail}],
        subject: emailTemplatedPatientRestoredFixture.subject,
        html: emailTemplatedPatientRestoredFixture.body
          .replace('<%= params.firstName %>', patientFixture.firstName)
          .replace('<%= params.email %>', patientEmail),
      }),
    )
    expect(spyOnGetAuthUser).toBeCalledTimes(2)
    expect(spyOnCreateAuthUser).toBeCalledWith({
      email: patientEmail,
      emailVerified: true,
    })
    spyOnEmailSending.mockClear()
  })

  afterAll(async () => {
    await planCategorySeed.removeById(planCategoryFixture.id)
    await patientPlanStatusSeed.removeById(patientPlanStatusFixture.id)
    await planTypeSeed.removeById(planTypeFixture.id)
    await patientPlanSeed.removeById(patientPlanFixture.id)
    await emailTemplateSeed.deleteByIds([
      emailTemplatedPatientDeactivatedFixture.id,
      emailTemplatedPatientRestoredFixture.id,
    ])
    await patientSeed.removeByIds([patientId, partnerId, partnerSecondId, secondPatientId])
    await patientPartnerSeed.removePatientPartnerByIds([invitationId, patientPartnerSecondId])
    await dataSource.destroy()
  })
})
