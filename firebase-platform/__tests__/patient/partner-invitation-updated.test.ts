import {DataSource} from 'typeorm'
import {testPubSubEvent} from '@functions-types'
import {
  PartnerInvitationUpdatedSchema,
  PartnerInvitationUpdatePubSubPayload,
} from '@libs/common/model/proto-schemas/partner-invitation-updated.schema'
import {partnerInvitationUpdateHandler} from '@firebase-platform/functions/patients/src/handlers/partner-invitation-updated/partner-invitation-updated'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {PatientPartner} from '@libs/data-layer/apps/users/entities/typeorm'
import {PartnerStatusEnum} from '@libs/data-layer/apps/users/enum'
import {PatientSeed, PatientPartnerSeed} from '@seeds/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {RelationshipEnum} from '@libs/services-common/enums'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'

jest.mock('@google-cloud/logging-bunyan')
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
const patientSecondId = 100000005
const partnerId = 100000002
const invitationId = 100000003
const invitationSecondId = 100000004
const invitationOtherId = 100000006
const patientOtherId = 100000007
const partnerOtherId = 100000008

const patientFixture: Partial<Patient> = {
  id: patientId,
  authUserId: 'TEST_USER_1',
  firstName: 'Test',
  lastName: 'Patient',
  sexAtBirth: SexAtBirth.Male,
}

const secondPatientFixture: Partial<Patient> = {
  id: patientSecondId,
  authUserId: 'TEST_USER_2',
  firstName: 'Test2',
  lastName: 'Patient2',
  sexAtBirth: SexAtBirth.Male,
}

const otherPatientFixture: Partial<Patient> = {
  id: patientOtherId,
  authUserId: 'TEST_USER_4',
  firstName: 'Test2',
  lastName: 'Patient2',
  sexAtBirth: SexAtBirth.Male,
}

const otherPartnerFixture: Partial<Patient> = {
  id: partnerOtherId,
  authUserId: 'TEST_USER_5',
  firstName: 'Test2',
  lastName: 'Patient2',
  sexAtBirth: SexAtBirth.Male,
}

const partnerFixture: Partial<Patient> = {
  id: partnerId,
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

const patientPartnerWithoutPartnerFixture: Partial<PatientPartner> = {
  id: invitationSecondId,
  patientId: patientSecondId,
  partnerEmail: AuthUserFixture.partnersCount.email,
  relationship: RelationshipEnum.Married,
  status: PartnerStatusEnum.Accepted,
}

const patientPartnerOtherFixture: Partial<PatientPartner> = {
  id: invitationOtherId,
  patientId: patientOtherId,
  partnerId: partnerOtherId,
  partnerEmail: AuthUserFixture.partnerIcForm.email,
  relationship: RelationshipEnum.Other,
  status: PartnerStatusEnum.Accepted,
}

describe('Handler: updateHasSameSexAtBirthHandler', () => {
  let dataSource: DataSource
  let patientPartnerSeed: PatientPartnerSeed
  let patientSeed: PatientSeed

  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientPartnerSeed = new PatientPartnerSeed(dataSource)
    patientSeed = new PatientSeed(dataSource)

    await patientSeed.createArray([
      patientFixture,
      partnerFixture,
      secondPatientFixture,
      otherPatientFixture,
      otherPartnerFixture,
    ])
    await patientPartnerSeed.createArray([
      patientPartnerFixture,
      patientPartnerWithoutPartnerFixture,
      patientPartnerOtherFixture,
    ])
  })

  test('should update hasSameSexPartner property for patient and partner', async () => {
    const data: PartnerInvitationUpdatePubSubPayload = {
      invitationId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PartnerInvitationUpdatedSchema))

    await partnerInvitationUpdateHandler(message)

    const updatedPartner = await patientSeed.findOneById(partnerId)
    const updatedPatient = await patientSeed.findOneById(patientId)
    expect(updatedPartner.hasSameSexPartner).toBe(true)
    expect(updatedPatient.hasSameSexPartner).toBe(true)
  })

  test('should update hasSameSexPartner property for patient partner does not exist', async () => {
    const data: PartnerInvitationUpdatePubSubPayload = {
      invitationId: invitationSecondId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PartnerInvitationUpdatedSchema))

    await partnerInvitationUpdateHandler(message)

    const updatedPatient = await patientSeed.findOneById(patientSecondId)
    expect(updatedPatient.hasSameSexPartner).toBe(false)
  })

  test('should update hasSameSexPartner other relationship', async () => {
    const data: PartnerInvitationUpdatePubSubPayload = {
      invitationId: invitationOtherId,
    }

    const message = testPubSubEvent(encodePubSubMessage(data, PartnerInvitationUpdatedSchema))

    await partnerInvitationUpdateHandler(message)

    const updatedPatient = await patientSeed.findOneById(patientOtherId)
    const updatedPartner = await patientSeed.findOneById(partnerOtherId)
    expect(updatedPatient.hasSameSexPartner).toBe(false)
    expect(updatedPartner.hasSameSexPartner).toBe(false)
  })

  afterAll(async () => {
    await patientSeed.removeByIds([
      patientId,
      partnerId,
      patientSecondId,
      patientOtherId,
      partnerOtherId,
    ])
    await patientPartnerSeed.removePatientPartnerByIds([
      invitationId,
      invitationSecondId,
      invitationOtherId,
    ])
    await dataSource.destroy()
  })
})
