import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientNoteTypeEnum} from '@libs/services-common/enums/patient-note.enum'
import {
  ivfPatientFemaleFixture,
  patientEmailVerifiedFixture,
  patientForBackgroundInformationFixture,
  patientForGeneralHealthFixture,
  patientForGetContactInformation,
  patientForGynaecologicalHistoryFixture,
  patientForPlanPartnerFixture,
  patientForPlansV2Fixture,
  patientForPlansV3Fixture,
  patientForProfileOverviewFemaleFixture,
  patientForStimCycleDetailsFixture,
  patientForQuestionnaireFixture,
  patientToUpdatePlansFixture,
} from './patient.fixture'
import {
  patientPlanCancelledFixture,
  patientPlanFixture,
  patientPlanForEPLWorksheetFixture,
  patientPlanForHCGWorksheetFixture,
  patientPlanForOBWorksheetFixture,
  patientPlanForStimSheetFixture,
  patientPlanThirdOrderPatientFixture,
  patientPlanToUpdateFixture,
  patientPlanV2CancelledFixture,
  patientPlanV2CompletedFixture,
  patientPlanV2ForCycleDetailsFixture,
  patientPlanV2ToUpdateFixture,
  patientPlanV3CancelledFixture,
  patientPlanV3CompletedFixture,
  patientPlanV3ReadyToOrderFixture,
  patientPlanV3ToUpdateFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
import {staffWithMockedAssignorIdFixture} from './staff.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {
  patientDocumentForEditableNoteFixture,
  patientDocumentForEPLSheetFixture,
  patientDocumentForHCGSheetFixture,
  patientDocumentForOBWorkSheetFixture,
  patientDocumentForStimSheetFixture,
} from './patient-document.fixture'
import {appointmentFollowUpFixture} from '@libs/common/test/fixtures/appointment.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get('DEFAULT_TIME_ZONE'))

export const patientNoteId404: string = 'a5ab5b12-132b-2cba-843f-3b3d3c912b34'

export const patientNoteFixture: Partial<PatientNote> = {
  id: 1,
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: PatientNoteTypeEnum.TryingForPregnancy,
  content: 'PatientNote TryingForPregnancy',
}

export const patientNoteForGTPAETALSFixture: Partial<PatientNote> = {
  id: 2,
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: PatientNoteTypeEnum.PreviousPregnancies,
  content: 'PatientNote',
}

export const patientNoteGynaecologicalHistoryTakingBirthControlFixture: Partial<PatientNote> = {
  id: 3,
  patientId: patientForGynaecologicalHistoryFixture.id,
  type: PatientNoteTypeEnum.TakingBirthControl,
  content: 'PatientNote TakingBirthControl',
}

export const patientNoteynecologicalHistoryBreastfeedingFixture: Partial<PatientNote> = {
  id: 4,
  patientId: patientForGynaecologicalHistoryFixture.id,
  type: PatientNoteTypeEnum.Breastfeeding,
  content: 'PatientNote Breastfeeding',
}

export const patientNotePeriodFixture: Partial<PatientNote> = {
  id: 15,
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: PatientNoteTypeEnum.Period,
  content: 'PatientNote Period',
}

export const patientNoteCycleLengthFixture: Partial<PatientNote> = {
  id: 16,
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: PatientNoteTypeEnum.MenstrualCycleLength,
  content: 'PatientNote MenstrualCycleLength',
}

export const patientNoteFirstDayOfLastPeriodFixture: Partial<PatientNote> = {
  id: 17,
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: PatientNoteTypeEnum.FirstDayOfLastPeriod,
  content: 'PatientNote FirstDayOfLastPeriod',
}

export const patientNoteMenstrualFlowFixture: Partial<PatientNote> = {
  id: 18,
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: PatientNoteTypeEnum.MenstrualFlow,
  content: 'PatientNote MenstrualFlow',
}

export const patientNoteMenstrualSymptomsFixture: Partial<PatientNote> = {
  id: 19,
  patientId: patientForProfileOverviewFemaleFixture.id,
  type: PatientNoteTypeEnum.MenstrualSymptoms,
  content: 'PatientNote MenstrualSymptoms',
}

export const patientNoteAgeBackgroundInfoFixture: Partial<PatientNote> = {
  id: 49,
  patientId: patientForBackgroundInformationFixture.id,
  type: PatientNoteTypeEnum.Age,
  content: 'PatientNote Age',
}

export const patientNoteContactInfoFixture: Partial<PatientNote> = {
  id: 20,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.PatientID,
  content: 'PatientNote ContactInfo',
}

export const patientNoteContactInfoPhoneNumberFixture: Partial<PatientNote> = {
  id: 22,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.PhoneNumber,
  content: 'PatientNote ContactInfo PhoneNumber',
}

export const patientNoteContactInfoPatientNameFixture: Partial<PatientNote> = {
  id: 23,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.PatientName,
  content: 'PatientNote ContactInfo PatientName',
}

export const patientNoteContactInfoPreferredNameFixture: Partial<PatientNote> = {
  id: 24,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.PreferredName,
  content: 'PatientNote ContactInfo PreferredName',
}

export const patientNoteContactInfoPrimaryPatientContributionFixture: Partial<PatientNote> = {
  id: 25,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.PrimaryPatientContribution,
  content: 'PatientNote ContactInfo PrimaryPatientContribution',
}

export const patientNoteContactInfoPrimaryAddressFixture: Partial<PatientNote> = {
  id: 26,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.PrimaryAddress,
  content: 'PatientNote ContactInfo PrimaryAddress',
}

export const patientNoteContactInfoMailingAddressFixture: Partial<PatientNote> = {
  id: 27,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.MailingAddress,
  content: 'PatientNote ContactInfo MailingAddress',
}

export const patientNoteContactInfoEmailAddressFixture: Partial<PatientNote> = {
  id: 28,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.EmailAddress,
  content: 'PatientNote ContactInfo EmailAddress',
}

export const patientNoteContactInfoReferringPhysicanFixture: Partial<PatientNote> = {
  id: 29,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.ReferringPhysican,
  content: 'PatientNote ContactInfo ReferringPhysican',
}

export const patientNoteContactInfoOhipFixture: Partial<PatientNote> = {
  id: 30,
  patientId: patientForGetContactInformation.id,
  type: PatientNoteTypeEnum.Ohip,
  content: 'PatientNote ContactInfo Ohip',
}

export const patientNoteGeneralHealthFixture: Partial<PatientNote> = {
  id: 31,
  patientId: patientForGeneralHealthFixture.id,
  type: PatientNoteTypeEnum.Height,
  content: 'PatientNote General Health Height',
}

export const patientNotePlanCancellationReasonFixture: Partial<PatientNote> = {
  id: 32,
  patientId: patientEmailVerifiedFixture.id,
  type: PatientNoteTypeEnum.PlanCancellationReason,
  content: 'PatientNote Cancel',
  patientPlanId: patientPlanCancelledFixture.id,
}

export const patientNotePlanOutcomeFixture: Partial<PatientNote> = {
  id: 33,
  patientId: patientEmailVerifiedFixture.id,
  type: PatientNoteTypeEnum.PlanOutcome,
  content: 'PatientNote Outcome',
  patientPlanId: patientPlanFixture.id,
}

export const patientNoteForStimSheetSecondFixture: Partial<PatientNote> = {
  id: 34,
  uuid: 'b5fe5b05-660a-4cb0-843f-3b3d3c912b92',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanStimSheetDay,
  content: 'patientNoteForStimSheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  date: '2020-02-02',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForStimSheetFirstFixture: Partial<PatientNote> = {
  id: 35,
  uuid: 'b5fe5b05-660a-4cb0-843f-3b3d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanStimSheetDay,
  content: 'patientNoteForStimSheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  date: '2020-02-02',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
  updatedByStaffAt: dateTimeUtil.addDays(dateTimeUtil.now(), 1),
  patientDocumentId: patientDocumentForStimSheetFixture.id,
}

export const patientNoteBeforeStimSheetFixture: Partial<PatientNote> = {
  id: 36,
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanStimSheetDay,
  content: 'patientNoteBeforeStimSheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  date: '2020-02-01',
}

export const patientNoteAfterStimSheetFixture: Partial<PatientNote> = {
  id: 37,
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanStimSheetDay,
  content: 'patientNoteAfterStimSheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  date: '2020-03-04',
}

export const patientNoteGlobalStimSheetLatestFixture: Partial<PatientNote> = {
  id: 38,
  uuid: 'b5fe5b04-660a-4cb0-843f-3b3d3c912b92',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanStimSheet,
  content: 'patientNoteGlobalStimSheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteGlobalStimSheetFixture: Partial<PatientNote> = {
  id: 39,
  uuid: 'b5fe5b03-660a-4cb0-843f-3b3d3c912b92',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanStimSheet,
  content: 'patientNoteGlobalStimSheetLatestFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteProcedureDetailsFixture: Partial<PatientNote> = {
  id: 40,
  uuid: 'b5fe5b03-660a-4cb0-843f-3b3d3c912b93',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanProcedure,
  content: 'patientNoteProcedureDetailsFixture',
  patientPlanId: patientPlanFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNotePlanCycleNumberFixture: Partial<PatientNote> = {
  id: 41,
  patientId: patientForQuestionnaireFixture.id,
  type: PatientNoteTypeEnum.PlanCycleLength,
  content: '11',
  patientPlanId: patientPlanThirdOrderPatientFixture.id,
  date: '2020-03-04',
}

export const patientNoteForOBWorksheetDayFixture: Partial<PatientNote> = {
  id: 42,
  uuid: 'b5fe5b05-660a-4cb0-843f-4b2d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanOBSheetDay,
  content: 'patientNoteForOBWorksheetDayFixture',
  patientPlanId: patientPlanForOBWorksheetFixture.id,
  date: '2020-02-08',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForHCGWorksheetDayFixture: Partial<PatientNote> = {
  id: 43,
  uuid: 'b5fe5b06-660a-4cb0-843f-4b2d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanHCGSheetDay,
  content: 'patientNoteForHCGWorksheetDayFixture',
  patientPlanId: patientPlanForHCGWorksheetFixture.id,
  date: '2020-02-17',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForProceduresFixture: Partial<PatientNote> = {
  id: 44,
  uuid: 'b5fa5b06-660a-4cb0-843f-4b2d3c912b34',
  patientId: patientToUpdatePlansFixture.id,
  type: PatientNoteTypeEnum.PlanProcedure,
  content: 'oldNote',
  patientPlanId: patientPlanToUpdateFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNotePlanCycleNumberV2Fixture: Partial<PatientNote> = {
  id: 45,
  patientId: patientForPlansV2Fixture.id,
  type: PatientNoteTypeEnum.PlanFollicleNumber,
  content: 'old 45',
  patientPlanId: patientPlanV2ToUpdateFixture.id,
}

export const patientNotePlanLastMenstrualV2Fixture: Partial<PatientNote> = {
  id: 46,
  patientId: patientForPlansV2Fixture.id,
  type: PatientNoteTypeEnum.PlanLastMenstrualPeriod,
  content: 'old 46',
  patientPlanId: patientPlanV2ToUpdateFixture.id,
}

export const patientNoteForHCGWorksheetFixture: Partial<PatientNote> = {
  id: 47,
  uuid: 'b5fe5b06-660a-4cb0-243f-4b2d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanHCGSheet,
  content: 'patientNoteForHCGWorksheetFixture',
  patientDocumentId: patientDocumentForHCGSheetFixture.id,
  patientPlanId: patientPlanForHCGWorksheetFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForOBWorksheetFixture: Partial<PatientNote> = {
  id: 48,
  uuid: 'b5fe5b06-660a-4cb0-343f-4b2d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanOBSheet,
  content: 'patientNoteForOBWorksheetFixture',
  patientDocumentId: patientDocumentForOBWorkSheetFixture.id,
  patientPlanId: patientPlanForOBWorksheetFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForStimSheetOrderFixture: Partial<PatientNote> = {
  id: 50,
  uuid: 'abe422ea-c164-4544-aae5-be5ff7bc9890',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteForOBWorksheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
  date: '2020-02-05',
}

export const patientNoteForStimSheetOrder2Fixture: Partial<PatientNote> = {
  id: 51,
  uuid: '1d6b520d-a240-4aab-b662-65025542a470',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteForOBWorksheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
  date: '2020-02-05',
}

export const patientNoteForV2CancellationReasonsFixture: Partial<PatientNote> = {
  id: 52,
  uuid: '2d6b520d-b240-4aab-b662-65025542a470',
  patientId: patientForPlansV2Fixture.id,
  type: PatientNoteTypeEnum.PlanCancellationReason,
  content: 'patientNoteForV2CancellationReasongs',
  patientPlanId: patientPlanV2CancelledFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForV2CompletionDetailsFixture: Partial<PatientNote> = {
  id: 53,
  uuid: '2a6c520d-b240-4aab-b662-65025542a470',
  patientId: patientForPlansV2Fixture.id,
  type: PatientNoteTypeEnum.PlanOutcome,
  content: 'patientNoteForV2CompletionDetails',
  patientPlanId: patientPlanV2CompletedFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForCycleDetailsCycleLengthFixture: Partial<PatientNote> = {
  id: 54,
  uuid: '3b6c520d-b240-4aab-b662-65025532a470',
  patientId: patientForStimCycleDetailsFixture.id,
  type: PatientNoteTypeEnum.PlanCycleLength,
  content: '5',
  patientPlanId: patientPlanV2ForCycleDetailsFixture.id,
}

export const patientNotePlanCycleNumberV3Fixture: Partial<PatientNote> = {
  id: 55,
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanFollicleNumber,
  content: 'old 55',
  patientPlanId: patientPlanV3ToUpdateFixture.id,
}

export const patientNotePlanLastMenstrualV3Fixture: Partial<PatientNote> = {
  id: 56,
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanLastMenstrualPeriod,
  content: 'old 56',
  patientPlanId: patientPlanV3ToUpdateFixture.id,
}

export const patientNoteForV3CancellationReasonsFixture: Partial<PatientNote> = {
  id: 57,
  uuid: '2d6b520d-c240-4aab-b664-65025542a470',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanCancellationReason,
  content: 'patientNoteForV3CancellationReasongs',
  patientPlanId: patientPlanV3CancelledFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForV3CompletionDetailsFixture: Partial<PatientNote> = {
  id: 58,
  uuid: '2a6c520d-c240-4aab-b663-65025542a470',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanOutcome,
  content: 'patientNoteForV3CompletionDetails',
  patientPlanId: patientPlanV3CompletedFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteBeforeDay0OfStimSheetFixture: Partial<PatientNote> = {
  id: 59,
  uuid: 'b5fe5b05-120a-4cb0-843f-3b3d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanStimSheetDay,
  content: 'patientNoteBeforeDay0OfStimSheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  date: '2020-01-15',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteOrderBeforeStimSheetFixture: Partial<PatientNote> = {
  id: 60,
  uuid: 'b5fe5b05-130a-4cb0-843f-3b3d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteOrderBeforeStimSheetFixture',
  patientPlanId: patientPlanForStimSheetFixture.id,
  date: '2020-01-16',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteToEditStimDayFixture: Partial<PatientNote> = {
  id: 61,
  uuid: 'a5ab5b12-130a-4cb0-843f-3b3d3c912b34',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteToEditStimDayFixture',
  patientPlanId: patientPlanV3ReadyToOrderFixture.id,
  date: '2020-01-16',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
  patientDocumentId: patientDocumentForEditableNoteFixture.id,
}

export const patientNoteWithoutPlanLinkFixture: Partial<PatientNote> = {
  id: 62,
  uuid: 'a5ab5b12-130a-4cb0-843a-2b3d3c912b34',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteToEditStimDayFixture',
  date: '2020-01-16',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForHistoryListFixture: Partial<PatientNote> = {
  id: 63,
  uuid: 'a5ab5b13-220a-4cb0-843a-2b3d3c912b34',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteForHistoryListFixture',
  date: '2020-02-22',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForHistoryOnOtherDayFixture: Partial<PatientNote> = {
  id: 64,
  uuid: 'a2ac5b13-220a-4cb0-843a-2b3d2c912b34',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteForHistoryOnOtherDayFixture',
  date: '2020-02-23',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteToEditWithCompletedPlanFixture: Partial<PatientNote> = {
  id: 65,
  uuid: 'a5ab5b22-230a-4cb0-843f-3b3d3c912b34',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanOrderStimSheetDay,
  content: 'patientNoteToEditStimDayFixture',
  patientPlanId: patientPlanV3CompletedFixture.id,
  date: '2020-01-16',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteToEditPrimingDayFixture: Partial<PatientNote> = {
  id: 66,
  uuid: 'a5aa2b12-130a-4cb0-843f-3b3d3c912b34',
  patientId: patientForPlansV3Fixture.id,
  type: PatientNoteTypeEnum.PlanPrimingWorksheetDay,
  content: 'patientNoteToEditPrimingDayFixture',
  patientPlanId: patientPlanV3ReadyToOrderFixture.id,
  date: '2020-01-17',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForEPLWorksheetDayFixture: Partial<PatientNote> = {
  id: 67,
  uuid: 'b5fe5b06-260b-4cb0-843f-4b2d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanEPLSheetDay,
  content: 'patientNoteForEPLWorksheetDayFixture',
  patientPlanId: patientPlanForEPLWorksheetFixture.id,
  date: '2020-02-17',
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteForEPLWorksheetFixture: Partial<PatientNote> = {
  id: 68,
  uuid: 'c5fa5b06-660a-4cb0-243f-4b2d3c912b34',
  patientId: patientForPlanPartnerFixture.id,
  type: PatientNoteTypeEnum.PlanEPLSheet,
  content: 'patientNoteForEPLWorksheetFixture',
  patientDocumentId: patientDocumentForEPLSheetFixture.id,
  patientPlanId: patientPlanForEPLWorksheetFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientNoteVerifyHepBcHivFixture: Partial<PatientNote> = {
  id: 69,
  uuid: 'c2a5b06-660a-4cb0-243f-4b2d3c912b34',
  patientId: ivfPatientFemaleFixture.id,
  type: PatientNoteTypeEnum.VerifyHepBcHiv,
  content: 'patientNoteVerifyHepBcHivFixture',
  patientDocumentId: null,
}

export const patientNoteFollowUpFixture: Partial<PatientNote> = {
  id: 70,
  uuid: 'a358fa6c-d5d1-4620-863f-e3a1053cf66b',
  patientId: patientEmailVerifiedFixture.id,
  type: PatientNoteTypeEnum.FollowUpAppointment,
  content: 'patientNoteFollowUpFixture',
  patientDocumentId: null,
  appointmentId: appointmentFollowUpFixture.id,
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
  updatedByStaffAt: dateTimeUtil.addDays(dateTimeUtil.now(), 1),
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
}
