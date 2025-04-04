import {OhipClaim} from '@libs/data-layer/apps/clinic-billing/entities/typeorm'
import {ClaimStatus} from '@libs/data-layer/apps/clinic-billing/enum/ohip-claim.enum'
import {
  appointmentForManualStatusUpdateFailedFixture,
  appointmentForManualStatusUpdateFixture,
  appointmentForOhipClaimActionsFixture,
  appointmentForOhipClaimDetailsFixture,
  appointmentForOhipClaimFixture,
  appointmentForOhipClaimSubmissionFixture,
  appointmentForPatientCartCompletedFixture,
  appointmentForPatientEmailVerifiedCompletedFixture,
  appointmentIUIForPlansTypesFixture,
  appointmentMilestoneListFixture,
} from '@libs/common/test/fixtures/appointment.fixture'
import {PatientStatusEnum} from '@libs/services-common/enums'

export const ohipClaimForGetListFixture: Partial<OhipClaim> = {
  id: 1,
  uuid: 'b241a966-3071-4fe9-86d6-1ef812fc1594',
  appointmentId: appointmentForOhipClaimFixture.id,
  claimStatus: ClaimStatus.Pending,
  patientStatusSnapshot: PatientStatusEnum.NotActive,
}

export const ohipClaimForSubmissionFixture: Partial<OhipClaim> = {
  id: 2,
  uuid: 'b0906cca-124f-11ed-861d-0242ac1200',
  appointmentId: appointmentForOhipClaimSubmissionFixture.id,
  claimStatus: ClaimStatus.ManuallyBilled,
}

export const ohipClaimForDetailFixture: Partial<OhipClaim> = {
  id: 3,
  uuid: '96c11d92-84fc-4092-816c-6d2ad78d64b8',
  appointmentId: appointmentForOhipClaimDetailsFixture.id,
  claimStatus: ClaimStatus.Pending,
  manualStatusChangeReason: 'reason',
  patientStatusSnapshot: 'IVF',
}

export const ohipClaimForTestCreateUpdateAndRemoveFixture: Partial<OhipClaim> = {
  id: 4,
  uuid: 'c4f30f50-0902-4484-8f04-4a1c112f5c48',
  appointmentId: appointmentForOhipClaimActionsFixture.id,
  claimStatus: ClaimStatus.Pending,
}

export const ohipClaimForSavedStatusFixture: Partial<OhipClaim> = {
  id: 5,
  uuid: '994822cc-602d-42d4-a80e-8c157ce83021',
  appointmentId: appointmentIUIForPlansTypesFixture.id,
  claimStatus: ClaimStatus.Saved,
}

export const ohipClaimForWriteOffStatusFixture: Partial<OhipClaim> = {
  id: 6,
  uuid: '994822cc-602d-42d4-a80e-8c157ce83045',
  appointmentId: appointmentMilestoneListFixture.id,
  claimStatus: ClaimStatus.WriteOff,
}

export const ohipClaimForPatientPlanTypeFixture: Partial<OhipClaim> = {
  id: 7,
  uuid: '994822cc-602d-42d4-a80e-8c157ce83033',
  appointmentId: appointmentForPatientCartCompletedFixture.id,
  claimStatus: ClaimStatus.Pending,
}

export const ohipClaimForApprovedFixture: Partial<OhipClaim> = {
  id: 8,
  uuid: '104822cc-602d-42d4-a80e-8c157ce83044',
  appointmentId: appointmentForPatientEmailVerifiedCompletedFixture.id,
  claimStatus: ClaimStatus.Approved,
}

export const ohipClaimForManualStatusUpdateFixture: Partial<OhipClaim> = {
  id: 9,
  uuid: 'n1906cca-924f-15ed-861d-5242ac1299',
  appointmentId: appointmentForManualStatusUpdateFixture.id,
  claimStatus: ClaimStatus.Pending,
}

export const ohipClaimForManualStatusUpdateFailedFixture: Partial<OhipClaim> = {
  id: 10,
  uuid: 'k4906cca-124f-11ed-891d-0242ac1200',
  appointmentId: appointmentForManualStatusUpdateFailedFixture.id,
  claimStatus: ClaimStatus.ManuallyBilled,
}
