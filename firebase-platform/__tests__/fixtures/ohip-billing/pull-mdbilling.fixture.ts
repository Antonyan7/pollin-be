import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {AppointmentStatus} from '@libs/common/enums'
import {
  MdBillingDiagnosticCode,
  MdBillingServiceCode,
  OhipClaim,
} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {ClaimStatus} from '@libs/data-layer/apps/clinic-billing/enum/ohip-claim.enum'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceCategoryInputSeed} from '@seeds/typeorm'

const dateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))

export const patientForAppointmentForPullOhipClaimFixture: Partial<Patient> = {
  id: 1,
  uuid: '9811b279-e147-4200-8de1-3cdf2b2kkcab',
  authUserId: 'pull-ohip-claim-user',
}

export const serviceProviderForForPullOhipClaimFixture: Partial<ServiceProvider> = {
  id: 1,
}

export const serviceCategoryForForPullOhipClaimFixture: ServiceCategoryInputSeed = {
  id: 1,
  uuid: 'e3743b90-a71e-4151-85c1-0d57a25c95a0',
}

export const serviceTypeForForPullOhipClaimFixture: Partial<ServiceType> = {
  id: 1,
  serviceCategoryId: serviceCategoryForForPullOhipClaimFixture.id,
}

export const staffWithBillingNumberFixture: Partial<Staff> = {
  id: 1,
  uuid: 'c5da591b-9181-456f-82bb-16b0e0526537',
  email: 'Nestproject+staff+with+billing+number@test+com',
  firstName: 'Staff',
  lastName: 'With Billing number',
  active: true,
  billingNumberForMdBilling: '00001',
}

export const mdBillingServiceCodeFixture: Partial<MdBillingServiceCode> = {
  id: 1,
  uuid: 'f565a780-e486-434d-980c-ce7200c45abc',
  serviceCodeId: 1,
  serviceCode: 'S0000',
  serviceCodeSearchDescription: 'Description for billing service code',
}

export const mdBillingDiagnosticCodeFixture: Partial<MdBillingDiagnosticCode> = {
  id: 1,
  uuid: '976f60a6-6deb-4171-868b-c896b35eaf8a',
  diagnosticCodeId: 1,
  diagnosticCode: 'D0000',
  diagnosticCodeDescription: 'Description for MdBilling diagnostic code',
  diagnosticCodeSearchDescription: 'Description for search MdBilling diagnostic code',
}

export const appointmentForPullOhipClaimsFixture: Partial<Appointment> = {
  id: 1,
  uuid: '49e9076f-64dc-49e6-9efb-2cb049f0be8f',
  patientId: patientForAppointmentForPullOhipClaimFixture.id,
  serviceProviderId: serviceProviderForForPullOhipClaimFixture.id,
  serviceTypeId: serviceTypeForForPullOhipClaimFixture.id,
  status: AppointmentStatus.Booked,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
}

export const appointmentForPullOhipClaimsTwoFixture: Partial<Appointment> = {
  id: 2,
  uuid: '56e9076f-64dc-49e6-9efb-2cb049f0be8f',
  patientId: patientForAppointmentForPullOhipClaimFixture.id,
  serviceProviderId: serviceProviderForForPullOhipClaimFixture.id,
  serviceTypeId: serviceTypeForForPullOhipClaimFixture.id,
  status: AppointmentStatus.Booked,
  start: dateTimeUtil.subHours(dateTimeUtil.now(), 10),
  end: dateTimeUtil.subHours(dateTimeUtil.now(), 9),
}

export const ohipClaimForPullClaimStatusesCFFixture: Partial<OhipClaim> = {
  id: 1,
  uuid: '888f60a6-6d67-4171-868b-5196b35eaf98',
  appointmentId: appointmentForPullOhipClaimsFixture.id,
  claimStatus: ClaimStatus.Submitted,
  mdBillingClaimId: 3333333, // value the same as returned from md-billing adapter mock getClaimDetails() for ClaimId: 3333333 from ClaimDetailItems
}

export const ohipClaimWithUnknownStatusForPullClaimStatusesCFFixture: Partial<OhipClaim> = {
  id: 2,
  uuid: '338f60a6-6d67-4171-868b-5196b35eaf98',
  appointmentId: appointmentForPullOhipClaimsTwoFixture.id,
  claimStatus: ClaimStatus.Rejected,
  mdBillingClaimId: 4444444, // value the same as returned from md-billing adapter mock getClaimDetails() for ClaimId: 4444444 from ClaimDetailItems
}
