/* eslint-disable @typescript-eslint/typedef */
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {PatientPartner} from '@libs/data-layer/apps/users/entities/typeorm'
import {PartnerStatusEnum} from '@libs/data-layer/apps/users/enum/partner.enum'
import {
  ContributionEnum,
  RelationshipEnum,
} from '@libs/services-common/enums/partner-invitation.enum'
import {AuthUserFixture} from './auth.fixture'
import {cartConfirmThreeCasesFixture} from './patient-detail.fixture'
import {
  ivfPatientFemaleFixture,
  ivfPatientMalePartnerFixture,
  mainPatientForSpermCryoFixture,
  partnerIntakeJourneyTypeFixture,
  partnerPatientForProfileTestResultsFixture,
  patientAppointmentFixture,
  patientEmailVerifiedFixture,
  patientFemaleFixture,
  patientForGetSpecimenDetailsFixture,
  patientForPartnerAcceptedForPartnerIntakeUpdateFixture,
  patientForPartnerDeclinedForPartnerIntakeUpdateFixture,
  patientForPartnersCountFixture,
  patientForPartnerUserTypeFixture,
  patientForPlanPartnerFixture,
  patientForPlansCreationFixture,
  patientForPlansV2Fixture,
  patientForPlansV2PartnerFemaleFixture,
  patientForPlansV2PartnerMaleFixture,
  patientForPlansV3Fixture,
  patientForPlansV3PartnerFemaleFixture,
  patientForPlansV3PartnerMaleFixture,
  patientForPlanTypesFixture,
  patientForProfileHighlightFixture,
  patientForProfileOverviewTransgenderMaleFixture,
  patientForProfileTestResultsFixture,
  patientForProfileWithoutHighlightFixture,
  patientForSpermCryoPartnerFixture,
  patientForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture,
  patientJourneyFixture,
  patientPartnerForGetSpecimenDetailsFixture,
  patientPartnerForProfileFixture,
  patientPendingInvitationFixture,
  patientQuestionnaireControllerFixture,
  patientForQuestionnaireFixture,
  patientForIVFTasks2Fixture,
  patientForPartnerManageFixture,
  patientForEncounterTypePartnerFixture,
  patientForEncounterTypeFixture,
  patientClinicEmrKimLeFixture,
  patientForDocumentGenerationFixture,
  patientForPlanGenerationPartnerFixture,
  patientForPlanGenerationFixture,
  patientForPlanGenerationPartnerMaleFixture,
} from './patient.fixture'

export const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const patientPartnerFixture: Partial<PatientPartner> = {
  id: 1,
  patientId: patientForProfileHighlightFixture.id,
  partnerId: patientPartnerForProfileFixture.id,
  partnerEmail: AuthUserFixture.partnerIcForm.email,
  contribution: ContributionEnum.EggUterus,
  relationship: RelationshipEnum.Committed,
  status: PartnerStatusEnum.Accepted,
  code: '333666',
}

export const patientPartnerForProfileTestResultsFixture: Partial<PatientPartner> = {
  id: 2,
  patientId: patientForProfileTestResultsFixture.id,
  partnerId: partnerPatientForProfileTestResultsFixture.id,
  partnerEmail: 'fhealthdev+patientPartnerForProfileTestResults@gmail.com',
  contribution: ContributionEnum.Egg,
  relationship: RelationshipEnum.CommonLaw,
  status: PartnerStatusEnum.Accepted,
  code: '443666',
}

export const patientPartnerWithOtherRelationshipFixture: Partial<PatientPartner> = {
  id: 3,
  patientId: patientForProfileTestResultsFixture.id,
  partnerId: patientForProfileWithoutHighlightFixture.id,
  partnerEmail: 'fhealthdev+patientPartnerWithOtherRelationship@gmail.com',
  partnerName: 'To Replace',
  contribution: ContributionEnum.EggUterus,
  relationship: RelationshipEnum.Other,
  status: PartnerStatusEnum.Accepted,
  code: '118633',
}

export const patientPartnerForProfileTestResultsWithEmptyTestsFixture: Partial<PatientPartner> = {
  id: 4,
  patientId: patientForProfileTestResultsFixture.id,
  partnerId: patientPartnerForProfileFixture.id,
  partnerEmail: 'fhealthdev+patientPartnerForProfileTestResultsWithEmptyTests@gmail.com',
  partnerName: 'To Replace',
  contribution: ContributionEnum.Egg,
  relationship: RelationshipEnum.Committed,
  status: PartnerStatusEnum.Accepted,
  code: '288677',
}

export const patientPartnerForAcceptanceMetadataFixture: Partial<PatientPartner> = {
  id: 5,
  patientId: partnerIntakeJourneyTypeFixture.id,
  partnerId: patientEmailVerifiedFixture.id,
  partnerEmail: AuthUserFixture.emailVerified.email,
  contribution: ContributionEnum.Uterus,
  relationship: RelationshipEnum.Married,
  status: PartnerStatusEnum.Accepted,
  code: '388667',
}

export const patientPartnersForPartnersCountFixture: Partial<PatientPartner> = {
  id: 6,
  patientId: patientForPartnersCountFixture.id,
  partnerId: patientFemaleFixture.id,
  partnerEmail: null,
  status: PartnerStatusEnum.Pending,
  contribution: ContributionEnum.Uterus,
  relationship: RelationshipEnum.Married,
  code: '86676',
}

export const patientPartnersForPartnersHighlightFixture: Partial<PatientPartner> = {
  id: 7,
  patientId: patientAppointmentFixture.id,
  partnerId: patientForPartnerUserTypeFixture.id,
  partnerEmail: null,
  contribution: ContributionEnum.Uterus,
  relationship: RelationshipEnum.Married,
  code: '898663',
  status: PartnerStatusEnum.Accepted,
}

export const patientPartnerForPlanFixture: Partial<PatientPartner> = {
  id: 8,
  patientId: patientForPlansCreationFixture.id,
  partnerId: patientForPlanPartnerFixture.id,
  status: PartnerStatusEnum.Accepted,
  contribution: ContributionEnum.Egg,
  code: '83668',
}

export const patientPartnerForSpecimenDetailFixture: Partial<PatientPartner> = {
  id: 9,
  patientId: patientPartnerForGetSpecimenDetailsFixture.id,
  partnerId: patientForGetSpecimenDetailsFixture.id,
  partnerEmail: AuthUserFixture.specimenDetails.email,
  partnerName: 'SpecimenPartner Name',
  contribution: ContributionEnum.Egg,
  status: PartnerStatusEnum.Accepted,
  code: '878767',
}

export const patientPartnersForSpermCryoFixture: Partial<PatientPartner> = {
  id: 10,
  patientId: mainPatientForSpermCryoFixture.id,
  partnerId: patientForSpermCryoPartnerFixture.id,
  contribution: ContributionEnum.Egg,
  partnerName: 'PartnersForSpermCryo Fixture',
  status: PartnerStatusEnum.Accepted,
  code: '188866',
}

export const partnerInvitationFixture: Partial<PatientPartner> = {
  id: 11,
  uuid: '8e9b5042-031b-45b2-b749-56d8821ab284',
  patientId: patientJourneyFixture.id,
  partnerName: 'name',
  partnerEmail: AuthUserFixture.emailVerified.email,
  code: '123456',
  contribution: ContributionEnum.Egg,
  relationship: RelationshipEnum.Committed,
  status: PartnerStatusEnum.Pending,
}

export const partnerInvitationForMaleCompletedFixture: Partial<PatientPartner> = {
  id: 12,
  uuid: '1f694215-3f29-4632-b68e-5d7976e17e98',
  patientId: patientJourneyFixture.id,
  partnerName: 'name',
  partnerEmail: AuthUserFixture.emailVerified.email,
  status: PartnerStatusEnum.Accepted,
  code: '123556',
}

export const partnerInvitationForRejectFixture: Partial<PatientPartner> = {
  id: 13,
  uuid: 'ca4d9110-b979-4b8e-9d43-3a0953557c0b',
  patientId: partnerIntakeJourneyTypeFixture.id,
  partnerName: 'name',
  partnerEmail: 'fhealthdev+toTest@gmail.com',
  code: '635782',
}

export const partnerInvitationSuccessFixture: Partial<PatientPartner> = {
  id: 14,
  uuid: '2f0ead05-f02f-47d4-8476-7e0fd83bd5b2',
  patientId: partnerIntakeJourneyTypeFixture.id,
  partnerEmail: AuthUserFixture.basic.email,
  contribution: ContributionEnum.Egg,
  relationship: RelationshipEnum.Committed,
  code: '634482',
}

export const partnerInvitationNotificationAcceptFixture: Partial<PatientPartner> = {
  id: 15,
  uuid: 'dd2ec600-6526-48a4-bc5d-755b39d787fa',
  patientId: patientForQuestionnaireFixture.id,
  partnerName: 'name',
  partnerEmail: AuthUserFixture.partnerInvitationAccept.email,
  contribution: ContributionEnum.Uterus,
  code: '121212',
}

export const partnerInvitationNotificationRejectFixture: Partial<PatientPartner> = {
  id: 16,
  uuid: '937cbeb4-2070-4c69-a140-b23ba21adfc2',
  patientId: patientQuestionnaireControllerFixture.id,
  partnerName: 'name',
  partnerEmail: AuthUserFixture.questionnaireController.email,
  code: '232323',
}

export const partnerInvitationsTwoInvitesFirstFixture: Partial<PatientPartner> = {
  id: 17,
  uuid: '8ca054da-333d-49f0-8d61-fee09a82291e',
  patientId: partnerIntakeJourneyTypeFixture.id,
  partnerEmail: AuthUserFixture.twoPartnerInvintations.email,
  code: '931212',
}

export const partnerInvitationsTwoInvitesSecondFixture: Partial<PatientPartner> = {
  id: 18,
  uuid: '957920e8-9137-4586-b9e2-e85cf21f4544',
  patientId: partnerIntakeJourneyTypeFixture.id,
  partnerEmail: AuthUserFixture.twoPartnerInvintations.email,
  code: '331212',
}

export const partnerInvitationForPartnersCountFixture: Partial<PatientPartner> = {
  id: 19,
  uuid: 'de944207-6a16-4542-90b5-a7b011b8312b',
  patientId: patientForPartnersCountFixture.id,
  status: PartnerStatusEnum.Pending,
  code: '551212',
}

export const partnerInvitationsForPatientUserFixture: Partial<PatientPartner> = {
  id: 20,
  uuid: '5e45f299-dd68-44c5-a05a-885a9df92199',
  patientId: partnerIntakeJourneyTypeFixture.id,
  partnerEmail: AuthUserFixture.patientPendingInvitation.email,
  code: '661212',
}

export const patientPartnerInvitationToBeExpiredFixture: Partial<PatientPartner> = {
  id: 21,
  uuid: '2375f299-dd68-44c5-a05a-885a9df92779',
  patientId: patientForProfileHighlightFixture.id,
  partnerId: patientPendingInvitationFixture.id,
  partnerName: 'Bruce Wane',
  partnerEmail: AuthUserFixture.patientPendingInvitation.email,
  code: '33333',
  status: PartnerStatusEnum.Pending, // must remain Pending
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 33),
}

export const patientPartnerInvitationDeclinedFixture: Partial<PatientPartner> = {
  id: 22,
  uuid: '3bc71824-a32a-4ee9-acf9-90c1bf4dd299',
  patientId: patientForProfileHighlightFixture.id,
  partnerId: cartConfirmThreeCasesFixture.id,
  partnerName: 'Declined Partner',
  partnerEmail: 'fhealthdev+emailOfDeclinedInvitation@gmail.com',
  code: '33333',
  status: PartnerStatusEnum.Declined,
  relationship: RelationshipEnum.Committed,
}

export const patientPartnerForPlansV2Fixture: Partial<PatientPartner> = {
  id: 23,
  uuid: '3bc72824-a32a-4ee9-acf9-90c1bf4dd299',
  patientId: patientForPlansV2Fixture.id,
  partnerId: patientForPlansV2PartnerFemaleFixture.id,
  partnerName: 'Accepted',
  partnerEmail: 'fhealthdev+emailOfDeclinedInvitation@gmail.com',
  code: '33333',
  status: PartnerStatusEnum.Accepted,
}

export const patientPartnerInvitedForPlansV2Fixture: Partial<PatientPartner> = {
  id: 24,
  uuid: '4bc72824-a32a-4ee9-acf9-90c1bf4dd299',
  patientId: patientForPlansV2Fixture.id,
  partnerId: patientForPlanTypesFixture.id,
  partnerName: 'Accepted',
  partnerEmail: 'fhealthdev+emailOfDeclinedInvitation@gmail.com',
  code: '33333',
  status: PartnerStatusEnum.Accepted,
}

export const patientPartnerForPlansV2MaleFixture: Partial<PatientPartner> = {
  id: 25,
  uuid: '3bc72833-a32a-4ee9-acf9-90c1bf4dd299',
  patientId: patientForPlansV2Fixture.id,
  partnerId: patientForPlansV2PartnerMaleFixture.id,
  partnerName: 'Accepted',
  partnerEmail: 'fhealthdev+emailOfDeclinedInvitation@gmail.com',
  code: '33333',
  status: PartnerStatusEnum.Accepted,
}

export const patientPartnerPendingForProfileFixture: Partial<PatientPartner> = {
  id: 26,
  uuid: '2375a299-dd68-44c5-a05a-885a9df92779',
  patientId: patientPartnerForProfileFixture.id,
  partnerName: 'Bruce Wane',
  partnerEmail: AuthUserFixture.patientPendingInvitation.email,
  code: '33333',
  status: PartnerStatusEnum.Pending,
}

export const patientPartnerPendingForPlansV2Fixture: Partial<PatientPartner> = {
  id: 27,
  uuid: '2375a299-dd68-44c5-a05a-825a9af92779',
  patientId: patientForPlansV2Fixture.id,
  partnerName: 'Bruce Wane',
  partnerEmail: AuthUserFixture.plansV2.email,
  code: '33333',
  status: PartnerStatusEnum.Pending,
}

export const patientPartnerIVFFixture: Partial<PatientPartner> = {
  id: 28,
  uuid: 'f90d9ebe-240a-46ec-a334-64f0724d4281',
  patientId: ivfPatientFemaleFixture.id,
  partnerId: ivfPatientMalePartnerFixture.id,
  partnerName: 'Bruce Wane',
  partnerEmail: AuthUserFixture.ivfPatientMale.email,
  code: '33333',
  status: PartnerStatusEnum.Accepted,
}

export const patientPartnerAcceptedForUpdatingPatientIntakeStatusBasedOnPrimaryPatientFixture: Partial<PatientPartner> =
  {
    id: 30,
    uuid: 30 + '0d9ebe-240a-46ec-a334-64f0724d4281',
    patientId: patientForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture.id,
    partnerId: patientForPartnerAcceptedForPartnerIntakeUpdateFixture.id,
    partnerEmail: AuthUserFixture.authPatientForPartnerAcceptedForPartnerIntakeUpdateFixture.email,
    status: PartnerStatusEnum.Accepted,
  }

export const patientPartnerDeclinedForUpdatingPatientIntakeStatusBasedOnPrimaryPatientFixture: Partial<PatientPartner> =
  {
    id: 31,
    uuid: 31 + '0d9ebe-240a-46ec-a334-64f0724d4281',
    patientId: patientForUpdatedStatusShouldUpdatePatientIntakeStatusTooFixture.id,
    partnerId: patientForPartnerDeclinedForPartnerIntakeUpdateFixture.id,
    partnerEmail: AuthUserFixture.authPatientForPartnerDeclinedForPartnerIntakeUpdateFixture.email,
    status: PartnerStatusEnum.Declined,
  }

export const patientPartnerForPlansV3Fixture: Partial<PatientPartner> = {
  id: 32,
  uuid: '4bc72824-a32a-4ea2-acf9-90c1bf4dd299',
  patientId: patientForPlansV3Fixture.id,
  partnerId: patientForPlansV3PartnerFemaleFixture.id,
  partnerName: 'Accepted',
  partnerEmail: 'fhealthdev+patientPartnerForPlansV3Fixture@gmail.com',
  code: '33333',
  status: PartnerStatusEnum.Accepted,
}

export const patientPartnerForPlansV3MaleFixture: Partial<PatientPartner> = {
  id: 33,
  uuid: '3bc72833-a32a-4ea4-acf9-90c1bf4dd299',
  patientId: patientForPlansV3Fixture.id,
  partnerId: patientForPlansV3PartnerMaleFixture.id,
  partnerName: 'Accepted',
  partnerEmail: 'fhealthdev+patientPartnerForPlansV3MaleFixture@gmail.com',
  code: '33333',
  status: PartnerStatusEnum.Accepted,
}

export const patientPartnerPendingForPlansV3Fixture: Partial<PatientPartner> = {
  id: 34,
  uuid: '2375a299-dd68-44a5-a05a-825a9af92779',
  patientId: patientForPlansV3Fixture.id,
  partnerName: 'Bruce Wane',
  partnerEmail: AuthUserFixture.plansV3.email,
  code: '33333',
  status: PartnerStatusEnum.Pending,
}

export const patientPartnerUpdateMrpFixture: Partial<PatientPartner> = {
  id: 35,
  uuid: '8a9d5334-a65a-4a1f-a895-65e07752f3c2',
  patientId: patientForProfileOverviewTransgenderMaleFixture.id,
  partnerId: patientForPlansV3PartnerMaleFixture.id,
  partnerName: 'Accepted',
  partnerEmail: 'fhealthdev+patientForProfileOverviewTransgenderMaleFixture@gmail.com',
  code: '33333',
  status: PartnerStatusEnum.Accepted,
}

//no link to partnerId
export const patientPartnerNotAcceptedYetFixture: Partial<PatientPartner> = {
  id: 38,
  uuid: 38 + 'c71824-a32a-4ee9-acf9-90c1bf4dd299',
  patientId: patientForProfileHighlightFixture.id,
  partnerName: 'JustInvited Partner',
  partnerEmail: 'fhealthdev+emailOfDecslinedInvitation@gmail.com',
  code: '33333d',
  status: PartnerStatusEnum.Pending,
  relationship: RelationshipEnum.Committed,
}

export const patientPartnerForNotAcceptanceMetadataFixture: Partial<PatientPartner> = {
  id: 40,
  patientId: partnerIntakeJourneyTypeFixture.id,
  partnerId: patientEmailVerifiedFixture.id,
  partnerEmail: AuthUserFixture.emailVerified.email,
  contribution: ContributionEnum.EggUterus,
  relationship: RelationshipEnum.CommonLaw,
  status: PartnerStatusEnum.Pending,
  code: '388664',
}

export const patientPartnerForScanBarcodeFixture: Partial<PatientPartner> = {
  id: 41,
  uuid: '4ca74fdc-722d-4e64-97d0-4131499bc851',
  patientId: patientForIVFTasks2Fixture.id,
  partnerId: patientEmailVerifiedFixture.id,
  partnerEmail: AuthUserFixture.emailVerified.email,
  contribution: ContributionEnum.EggUterus,
  relationship: RelationshipEnum.CommonLaw,
  status: PartnerStatusEnum.Accepted,
  code: '388664',
}

export const patientPartnerForPartnerManageFixture: Partial<PatientPartner> = {
  id: 45,
  uuid: 54 + 'a74fdc-722d-4e64-97d0-4131499bc851',
  patientId: patientForPartnerManageFixture.id,
  partnerEmail: 'emailForpatientPartnerForPartnerManageFixture',
  contribution: ContributionEnum.EggUterus,
  relationship: RelationshipEnum.CommonLaw,
  status: PartnerStatusEnum.Pending,
  code: '388664',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 33),
  updatedAt: dateTimeUtil.subDays(dateTimeUtil.now(), 33),
}

export const patientPartnerForEncounterTypeFixture: Partial<PatientPartner> = {
  id: 42,
  uuid: '4ca12fda-722d-4e64-97d0-4131499bc851',
  patientId: patientForEncounterTypeFixture.id,
  partnerId: patientForEncounterTypePartnerFixture.id,
  partnerEmail: AuthUserFixture.emailVerified.email,
  contribution: ContributionEnum.EggUterus,
  relationship: RelationshipEnum.CommonLaw,
  status: PartnerStatusEnum.Accepted,
  code: '388664',
}

export const patientPartnerForBarcodeFixture: Partial<PatientPartner> = {
  id: 43,
  uuid: '455cafd1-e511-4c14-b4bb-7c76a6f51713',
  patientId: patientClinicEmrKimLeFixture.id,
  partnerId: patientForEncounterTypePartnerFixture.id,
  partnerEmail: AuthUserFixture.emailVerified.email,
  contribution: ContributionEnum.EggUterus,
  relationship: RelationshipEnum.CommonLaw,
  status: PartnerStatusEnum.Accepted,
  code: '388664',
}

export const patientPartnerForPlanCanceledFixture: Partial<PatientPartner> = {
  id: 44,
  patientId: patientForPlansCreationFixture.id,
  partnerId: patientForDocumentGenerationFixture.id,
  status: PartnerStatusEnum.Canceled,
  contribution: ContributionEnum.Egg,
  code: '83668',
}

export const patientPartnerForConsentGenerationFixture: Partial<PatientPartner> = {
  id: 46,
  patientId: patientForPlanGenerationPartnerFixture.id,
  partnerId: patientForPlanGenerationFixture.id,
  status: PartnerStatusEnum.Accepted,
  contribution: ContributionEnum.Egg,
}

export const patientPartnerForConsentGenerationMaleFixture: Partial<PatientPartner> = {
  id: 47,
  patientId: patientForPlanGenerationFixture.id,
  partnerId: patientForPlanGenerationPartnerMaleFixture.id,
  status: PartnerStatusEnum.Accepted,
  contribution: ContributionEnum.Sperm,
}
