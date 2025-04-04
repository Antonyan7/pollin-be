/**
 * Mocking Staff Auth
 * Firebase auth data is controlled by function: getStaffAuthUser in ~/__mocks__/firebase-auth.adapter.ts
 */
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  roleEmbryologistFixture,
  roleFixture,
  rolePhysicianFixture,
} from '@libs/common/test/fixtures/role.fixture'
import {AuthUserFixture} from './auth.fixture'
import {
  serviceProviderAppointmentsFixtureId,
  serviceProviderBilling,
  serviceProviderFixtureId,
  serviceProviderForMobileFixture,
  serviceProviderWithCareTeamEmailFixture,
} from '@libs/common/test/fixtures/service-provider.fixture'

export const invalidStaffUUid: string = '69760745-de86-45cd-808f-f3980a0437d6'

export const staffClinicManagerFixture: Partial<Staff> = {
  id: 1,
  uuid: '2f92f1fe-3149-4fe5-a289-b84aaefa45d7',
  firstName: 'Doe',
  lastName: 'Jones',
  email: 'fhealthdev+staff+clinicManager@gmail.com',
  active: true,
  cpso: '01000007',
  signatureURL: 'signature_url',
}

export const staffManagerRoleFixture: Partial<Staff> = {
  id: 2,
  uuid: '62bdbc33-e753-490d-91f2-7fbe62612ec7',
  firstName: 'Clinic',
  lastName: 'Manager',
  email: 'fhealthdev+clinicManager@gmail.com',
  active: true,
  cpso: '10000777',
}

export const staffWithMockedAssignorIdFixture: Partial<Staff> = {
  id: 3,
  uuid: 'staff-uuid-000-000-000',
  firstName: 'User',
  lastName: 'With Permissions',
  email: 'fhealthdev+userWithPermissions@gmail.com',
  active: true,
  cpso: '77777777',
  roleId: roleFixture.id,
  authUserId: AuthUserFixture.emailVerified.uid,
  serviceProviderId: serviceProviderFixtureId,
  signatureURL: 'signature_url',
}

export const staffUserFixture: Partial<Staff> = {
  id: 4,
  uuid: '5bbb4c85-c0a5-4c22-a8db-54355b1b346a',
  firstName: 'Additional',
  lastName: 'Staff',
  email: 'fhealthdev+staff+user@gmail.com',
  active: true,
  authUserId: AuthUserFixture.cart.uid,
  roleId: roleFixture.id,
}

export const staffAuthorOfEncounterAndAddendumFixture: Partial<Staff> = {
  id: 5,
  uuid: 'c5211113-b9b4-48fe-94c9-f1b1e7fc1d63',
  firstName: 'Wellknown',
  lastName: 'Author',
  email: 'fhealthdev+staff+author@gmail.com',
  active: true,
  authUserId: AuthUserFixture.plans.uid,
  roleId: roleFixture.id,
}

export const staffJourneyFixture: Partial<Staff> = {
  id: 6,
  uuid: 'c5211113-b9b4-48fe-94c9-f1b1e7fc1d44',
  firstName: 'Wellknown',
  lastName: 'With Permissions',
  email: 'fhealthdev+emailJourney@gmail.com',
  active: true,
  authUserId: AuthUserFixture.clinicScheduling.uid,
  roleId: roleFixture.id,
  serviceProviderId: serviceProviderAppointmentsFixtureId,
}

export const staffForUltrasoundFolliclesFixture: Partial<Staff> = {
  id: 8,
  uuid: 'c5211113-b9b4-48fe-94c9-f1b1e7fggdg4',
  firstName: 'UltrasoundFolliclesFixture',
  lastName: 'UltrasoundFolliclesFixture',
  email: 'fhealthdev+ultrasoundFollicles@gmail.com',
  active: true,
  authUserId: AuthUserFixture.ultrasound.uid,
  roleId: roleFixture.id,
}

export const staffForUltrasoundFolliclesWIthNotActivePlanFixture: Partial<Staff> = {
  id: 9,
  uuid: 'c5211113-b9b4-48fe-94c9-f1b1etttgdg4',
  firstName: 'UltrasoundFolliclesFixtured',
  lastName: 'UltrasoundFolliclesFixtured',
  email: 'fhealthdev+ultrasoundFollicleds@gmail.com',
  active: true,
  authUserId: AuthUserFixture.ultrasoundWithNotActivePlan.uid,
  roleId: roleFixture.id,
}

export const stafForUnreadTasksBadgeFixture: Partial<Staff> = {
  id: 10,
  uuid: '28b04f46-7565-4455-abcb-bfb3c8252aa8',
  authUserId: AuthUserFixture.unreadTasksCount.uid,
  email: 'fhealthdev+stafForUnreadTasksBadgeFixture@gmail.com',
  roleId: roleFixture.id,
}

export const staffForUltrasoundInlatestTestResultFixture: Partial<Staff> = {
  id: 11,
  uuid: 'c52111f3-b9b4-48fe-94c9-f1b1etttgdg4',
  firstName: 'UltrasoundFolliclesFixtured2',
  lastName: 'UltrasoundFolliclesFixtured2',
  email: 'fhealthdev+ultrasoundFollicleds2@gmail.com',
  active: true,
  authUserId: AuthUserFixture.ultrasoundInlatestTestResult.uid,
  roleId: roleFixture.id,
}

export const staffForUltrasoundSIgnOffFixture: Partial<Staff> = {
  id: 12,
  uuid: 'c52111f3-b9b4-48fe-94c9-f1b1egttggg4',
  firstName: 'UltrasoundFolliclesFixtured23',
  lastName: 'UltrasoundFolliclesFixtured23',
  email: 'fhealthdev+ultrasoundFollicleds23@gmail.com',
  active: true,
  authUserId: AuthUserFixture.ultrasoundSignOffInStimSHeet.uid,
  roleId: roleFixture.id,
}

export const staffForReassignTaskFixture: Partial<Staff> = {
  id: 13,
  uuid: '2590628a-6760-4feb-9f35-a35223cc79ca',
  firstName: 'reassignTaskStaff',
  lastName: 'reassignTaskStaff',
  email: 'fhealthdev+reassigntask@gmail.com',
  active: true,
  authUserId: AuthUserFixture.taskReassign.uid,
  roleId: roleFixture.id,
}

export const staffForCreatePatientAndAppointmentFixture: Partial<Staff> = {
  id: 15,
  uuid: 15 + '211113-b9b4-48fe-94c9-f1b1e7fggdg4',
  firstName: 'CreatePatientAndAppointment',
  lastName: 'CreatePatientAndAppointment',
  email: 'fhealthdev+CreatePatAndApp@gmail.com',
  active: true,
  authUserId: AuthUserFixture.createPatientAndAppointmentWeb.uid,
  roleId: roleFixture.id,
}

export const staffBillingRoleFixture: Partial<Staff> = {
  id: 16,
  uuid: '62bdbc33-e753-490d-91f2-7fbe62618888',
  firstName: 'MR',
  lastName: 'Billing',
  email: 'fhealthdev+billing@gmail.com',
  active: true,
  cpso: '48364',
  billingNumberForMdBilling: '1111',
  serviceProviderId: serviceProviderBilling.id,
}

export const staffSpecimenListFixture: Partial<Staff> = {
  id: 17,
  uuid: '9f47f17e-b8e8-48c5-8a27-140ef46a7a69',
  firstName: 'User',
  lastName: 'With Permissions',
  email: 'fhealthdev+getspecimenlist@gmail.com',
  active: true,
  cpso: '77777777',
  roleId: roleFixture.id,
  authUserId: AuthUserFixture.getSpecimenList.uid,
}

export const staffForUltrasoundFolliclesDay3Fixture: Partial<Staff> = {
  id: 18,
  uuid: '07a154c2-c2dc-4bbc-96da-30b298c0860a',
  firstName: 'UltrasoundFolliclesDay3',
  lastName: 'UltrasoundFolliclesDay3',
  email: 'fhealthdev+ultrasoundday3@gmail.com',
  active: true,
  authUserId: AuthUserFixture.ultrasoundDay3.uid,
  roleId: roleFixture.id,
}

export const staffAuthorOfStaffNoteAndAddendumFixture: Partial<Staff> = {
  id: 23,
  uuid: 'c5211113-b5b4-48fe-44c9-f1b1e7fc1d63',
  firstName: 'Wellknown',
  lastName: 'Author',
  email: 'fhealthdev+staff+author2@gmail.com',
  active: true,
  authUserId: AuthUserFixture.updatedPatientContactInformationForAcuity.uid,
  roleId: roleFixture.id,
}

export const staffForPatientContactFixture: Partial<Staff> = {
  id: 25,
  uuid: 25 + 'staff-uuid-000-000-000',
  firstName: 'staffForPatientContactFixture',
  lastName: 'With Permissions',
  email: 'fhealthdev+staffForPatientContactFixture@gmail.com',
  active: true,
  roleId: roleFixture.id,
  authUserId: AuthUserFixture.authContactInformation.uid,
  signatureURL: 'signature_url',
}

export const staffUserMobileFixture: Partial<Staff> = {
  id: 27,
  uuid: 27 + 'staff-uuid-000-000-000',
  firstName: 'User',
  lastName: 'Mobile',
  email: 'fhealthdev+mobile@gmail.com',
  active: true,
  cpso: '77777777',
  roleId: roleFixture.id,
  authUserId: AuthUserFixture.mobileIvfPatient.uid,
  serviceProviderId: serviceProviderForMobileFixture.id,
  signatureURL: 'signature_url',
  chatTeamIdentifier: 'doctor',
}

export const staffEmbryologistFixture: Partial<Staff> = {
  id: 28,
  uuid: '28b04f46-2365-4455-abcb-bfb3c8252aa8',
  authUserId: 'embryologist',
  email: 'fhealthdev+embryologist@gmail.com',
  firstName: 'Embryo',
  lastName: 'Logist',
  roleId: roleEmbryologistFixture.id,
}
export const staffPhysicianFixture: Partial<Staff> = {
  id: 32,
  uuid: 'e2d67327-d570-417b-ad5f-40997539ac1f',
  authUserId: 'Physician',
  email: 'fhealthdev+Physician@gmail.com',
  firstName: 'Physician',
  lastName: 'Logist',
  roleId: rolePhysicianFixture.id,
}

export const staffUserDeactivatedFixture: Partial<Staff> = {
  id: 29,
  uuid: 'm3b04f46-m465-4455-abcb-bfb3c8252mm1',
  authUserId: 'staffUserDeactivatedFixture',
  email: 'fhealthdev+deactivated@gmail.com',
  firstName: 'Staff',
  lastName: 'Deactivated',
  roleId: roleFixture.id,
  active: false,
}

export const staffForConsentMobileFixture: Partial<Staff> = {
  id: 31,
  uuid: 'ce37f192-a35c-47e1-bdf4-af5579cae371',
  authUserId: AuthUserFixture.authForConsentMobile.uid,
  email: AuthUserFixture.authForConsentMobile.email,
  firstName: 'staffForConsentMobileFixtureFirst',
  lastName: 'staffForConsentMobileFixtureLast',
  roleId: roleFixture.id,
}

export const staffForAppointmentCancellationFixture: Partial<Staff> = {
  id: 33,
  uuid: '7abf2bf2-3eb4-43c6-a0b1-a92f6e553ec7',
  firstName: 'staffForAppointmentCancellationFixtureFirst',
  lastName: 'staffForAppointmentCancellationFixtureLast',
  roleId: roleFixture.id,
  careTeamGroupEmail: 'fhealthdev+staffForAppointmentCancellationFixture@gmail.com',
  serviceProviderId: serviceProviderWithCareTeamEmailFixture.id,
}

export const staffEmbryologistHistoryFixture: Partial<Staff> = {
  id: 34,
  uuid: '9bb60a88-6040-4433-a885-ae3c75d8cc1f',
  authUserId: 'embryologistHistory',
  email: 'fhealthdev+embryologistHistory@gmail.com',
  firstName: 'Embryo',
  lastName: 'LogistHistory',
  roleId: roleEmbryologistFixture.id,
}
