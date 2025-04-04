/* eslint-disable max-lines */
import {testPubSubEvent} from '@functions-types'
import {handler} from '@firebase-platform/functions/questionnaire-to-profile-info/src/handler'
import {
  PatientAbortionHistorySeed,
  PatientDetailFemaleSeed,
  PatientDetailMaleSeed,
  PatientDetailSeed,
  PatientEctopicPregnancyHistorySeed,
  PatientFamilyHealthProblemSeed,
  PatientFullTermDeliveryHistorySeed,
  PatientMedicationSeed,
  PatientMiscarriageHistorySeed,
  PatientPastSurgerySeed,
  PatientPreTermDeliveryHistorySeed,
  PatientPreviousFertilityTreatmentSeed,
  PatientSeed,
  QuestionInputSeed,
  QuestionnaireSeed,
  QuestionnaireToQuestionSeed,
  PatientDoctorSeed,
  QuestionSeed,
  PatientNoteSeed,
} from '@seeds/typeorm'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {DataSource} from 'typeorm'
import {questionnaireIntentWithoutQuestionnaireFixture} from '@libs/common/test/fixtures/questionnaire-intent.fixture'
import {QuestionnaireIntentSeed} from '@seeds/firestore/questionnaire-intent.seed'
import {AuthUserFixture, serviceCategoryFixture} from '@libs/common/test/fixtures'
import {QuestionnaireIntent} from '@libs/data-layer/apps/questionnaires/entities/fireorm/questionnaire-intent'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  DaysOfBleedingEnum,
  PatientAnswers,
  PatientDoctorType,
} from '@libs/services-common/enums/patient.enum'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {
  abortionYearId,
  detailCurrentOccupationId,
  detailCurrentStressLevelId,
  detailDateOfBirthId,
  detailDrinkAlcoholId,
  detailExerciseRegularlyId,
  detailFamilyDoctorId,
  detailGenderId,
  detailHeightInInchesId,
  detailPreferredPronounsId,
  detailProblemWithAnestheticsId,
  detailRecreationalDrugsId,
  detailReferringDoctorId,
  detailSeeCounsellorForStressId,
  detailSexualOrientationId,
  detailSmokeCigarettesId,
  detailUseMarijuanaId,
  detailWeightInLbsId,
  dosageQuestionId,
  ectopicPregnanciesLocationId,
  ectopicPregnanciesMonthstoConceiveId,
  ectopicPregnanciesTypeId,
  ectopicPregnanciesYearId,
  foodAllergiesQuestionId,
  frequencyQuestionId,
  fullTermDeliveryMonthsToConceiveId,
  hasPeriodQuestionId,
  iodineAllergyQuestionId,
  isOvulatingQuestionId,
  latexAlergyQuestionId,
  menstrualDaysOfBleedingId,
  menstrualFlowQuestionId,
  menstrualPainId,
  miscarriageMountsToConceiveId,
  miscarriageTypeId,
  miscarriageYearId,
  numberOfLiveBirthQuestionId,
  ohipCardQuestionId,
  ohipCartQuestion,
  ohipGroupQuestion,
  ohipQuestionId,
  ohipVersionCodeQuestionId,
  ohipVersionQuestion,
  papTestLastDateId,
  patientPreviousFertilityTreatmentCycled,
  patientPreviousFertilityTreatmentTypeId,
  prescriptionMedicationListQuestionId,
  prescriptionMedicationNoAnswerQuestionId,
  preTermDeliveryBirthOutcomeId,
  preTermDeliveryMonthsToConceiveId,
  preTermDeliveryTypeId,
  preTermDeliveryYearId,
  previousPapTestId,
  questionAbortionYear,
  questionDaysBetweenPeriods,
  questionDaysBetweenPeriodsId,
  questionDaysOfBleeding,
  questionDetailCurrentOccupation,
  questionDetailCurrentStressLevel,
  questionDetailDateOfBirth,
  questionDetailDrinkAlcohol,
  questionDetailExerciseRegularly,
  questionDetailFamilyDoctor,
  questionDetailGender,
  questionDetailHeightInFeet,
  questionDetailHeightInInches,
  questionDetailPreferredPronouns,
  questionDetailProblemWithAnesthetics,
  questionDetailRecreationalDrugs,
  questionDetailReferringDoctor,
  questionDetailSeeCounsellorForStress,
  questionDetailSexualOrientation,
  questionDetailSmokeCigarettes,
  questionDetailUseMarijuana,
  questionDetailWeightInLbs,
  questionDiagnosedConditions,
  questionDiagnosedConditionsId,
  questionDosage,
  questionEctopicPregnanciesLocation,
  questionEctopicPregnanciesMonthsToConceive,
  questionEctopicPregnanciesType,
  questionEctopicPregnanciesYear,
  questionErectionDifficulties,
  questionErectionDifficultiesId,
  questionFamilyDoctor,
  questionFamilyDoctorDuplicate,
  questionFirstDayOfLastPeriod,
  questionFirstDayOfLastPeriodId,
  questionFoodAllergies,
  questionFrequency,
  questionFullTermDeliveryBirthOutcome,
  questionFullTermDeliveryMonthsToConceive,
  questionFullTermDeliveryType,
  questionFullTermDeliveryYear,
  questionGynaecologicalConditions,
  questionGynaecologicalConditionsId,
  questionHadSemenAnalysis,
  questionHadSemenAnalysisId,
  questionHasPeriod,
  questionHaveBeenReferredByPhysician,
  questionHaveBiologicalChildren,
  questionHaveBiologicalChildrenId,
  questionHaveBiologicalChildrenWithCurrentPartner,
  questionHaveBiologicalChildrenWithCurrentPartnerId,
  questionIodineAllergy,
  questionIsOvulating,
  questionLatexAllergy,
  questionMenstrualFlow,
  questionMenstrualPain,
  questionMiscarriageMountsToConceive,
  questionMiscarriageType,
  questionMiscarriageYear,
  questionnaireFixture,
  questionNumberOfLiveBirth,
  questionPapTestLastDate,
  questionPatientDetailFemaleHasProceduresDueAbnormalPAP,
  questionPatientDetailFemaleSeenFertilitySpecialist,
  questionPatientDetailFemaleSeenFertilitySpecialistId,
  questionPatientDetailFemaleUsingAppToTrackOvulation,
  questionPatientDetailFemaleUsingAppToTrackOvulationId,
  questionPatientDetailFemaleUsingLubricants,
  questionPatientDetailFemaleUsingLubricantsId,
  questionPatientDetailFemaleUsingOvulationKits,
  questionPatientDetailFemaleUsingOvulationKitsId,
  questionPatientDetailMaleAbnormalPapProcedures,
  questionPatientFamilyHealthProblemFamilyName,
  questionPatientFamilyHealthProblemFamilyNameId,
  questionPatientFamilyHealthProblemProblem,
  questionPatientFamilyHealthProblemProblemId,
  questionPatientPastSurgery,
  questionPatientPastSurgeryDate,
  questionPatientPastSurgeryDateId,
  questionPatientPastSurgeryType,
  questionPatientPastSurgeryTypeId,
  questionPatientPreviousFertilityTreatmentCycle,
  questionPatientPreviousFertilityTreatmentType,
  questionPatientSecondPastSurgeryDate,
  questionPatientSecondPastSurgeryType,
  questionPrescriptionMedicationList,
  questionPrescriptionMedicationListNullAnswer,
  questionPreTermDeliveryBirthOutcome,
  questionPreTermDeliveryMonthsToConceive,
  questionPreTermDeliveryType,
  questionPreTermDeliveryYear,
  questionPreviousPapTest,
  questionReferringDoctor,
  questionSecondAbortionYear,
  questionSecondPatientPastSurgeryId,
  questionSemenAnalysisIsNormal,
  questionSemenAnalysisIsNormalId,
  questionSexAtBirth,
  questionUsingAppToTrackOvulation,
  questionVasectomy,
  questionVasectomyId,
  questionVasectomyReversal,
  questionVasectomyReversalId,
  repeatGroupParentQuestionQuestion,
  secondAbortionYearId,
  sexAtBirthQuestionId,
  usingAppToTrackOvulationId,
} from './fixtures/question.fixture'
import {
  medicationDosage,
  medicationFrequency,
  medicationName,
  ohipCardNumber,
  ohipCardVersionCode,
  patientDateOfBirth,
  patientFamilyDoctorAuthUserId,
  patientPastSecondSurgeryType,
  patientPastSurgeryType,
  patientReferringDoctorAuthUserId,
  questionnaireIntentFixture,
  questionnaireIntentWithDoctorFixture,
  questionnaireIntentWithReferringDoctorFixture,
  questionnaireWithoutDoctorIntentFixture,
} from './fixtures/questionnaire.fixture'
import {questionnaireToQuestions} from './fixtures/questionnaire-to-questions.fixture'
import {PatientProfileSeed} from '@seeds/firestore/patient-profile.seed'
import {patientDetailFixture} from '@libs/common/test/fixtures/patient-detail.fixture'
import {patientProfileFixture} from './fixtures/patient-profile.fixture'
import {encodePubSubMessage} from '@libs/common/utils/proto-schema.utils'
import {
  QuestionnaireSubmittedPubSubPayload,
  QuestionnaireSubmittedSchema,
} from '@libs/common/model/proto-schemas/questionnare-submitted.schema'
import {
  createPatientDetailAndMedicationAuditTrailData,
  updatePatientDetailAndMedicationAuditTrailData,
} from './fixtures/audit-trail-data.fixture'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import {SystemAuthUserId} from '@libs/common/enums'
import {getCleanOhipNumber, getCleanOhipVersionCode} from '@libs/common/helpers/patient-ohip.helper'
import {createOrUpdatePatientDetailMale} from '../functions/questionnaire-to-profile-info/src/common/create-update-data.helpers'
import {PatientDetailMale, PatientDoctor} from '@libs/data-layer/apps/users/entities/typeorm'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {StructuredLogger} from '@libs/common'
import {PatientNoteTypeEnum} from '@libs/services-common/enums'

jest.setTimeout(20000)
jest.mock('bunyan', () => {
  return {
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }),
  }
})
jest.mock('@google-cloud/logging-bunyan')
jest.mock('../../libs/common/src/adapters/pubsub.adapter.ts')

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

let patientSeed: PatientSeed
let questionnaireSeed: QuestionnaireSeed
let questionnaireToQuestionSeed: QuestionnaireToQuestionSeed
let questionnaireIntentSeed: QuestionnaireIntentSeed
let questionSeed: QuestionSeed
let patientDetailSeed: PatientDetailSeed
let patientDoctorSeed: PatientDoctorSeed
let patientMedicationSeed: PatientMedicationSeed
let patientDetailFemaleSeed: PatientDetailFemaleSeed
let patientDetailMaleSeed: PatientDetailMaleSeed
let patientPreviousFertilityTreatmentSeed: PatientPreviousFertilityTreatmentSeed
let patientPastSurgerySeed: PatientPastSurgerySeed
let patientFamilyHealthProblemSeed: PatientFamilyHealthProblemSeed
let patientFullTermDeliveryHistorySeed: PatientFullTermDeliveryHistorySeed
let patientPreTermDeliveryHistorySeed: PatientPreTermDeliveryHistorySeed
let patientAbortionHistorySeed: PatientAbortionHistorySeed
let patientMiscarriageHistorySeed: PatientMiscarriageHistorySeed
let patientEctopicPregnancyHistorySeed: PatientEctopicPregnancyHistorySeed
let patientProfileSeed: PatientProfileSeed
let patientNoteSeed: PatientNoteSeed

const questionnaireUUID = '98b83e1d-a71b-4df7-8c9f-219c7404378f'
const authUserId = 'CF_AuthUserId'
const patientId = patientDetailFixture.id
const patientMaleId = patientId + 1
const maleAuthUserId = `Male${authUserId}`

const patientNotFoundQuestionnaireIntentFixture: Partial<QuestionnaireIntent> = {
  id: 'patient_not_found_questionnaire',
  questionnaireId: questionnaireFixture.id,
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: 8954783,
  updatedBy: AuthUserFixture.emailVerified.uid,
  isCompleted: false,
  questions: [],
}

const patientSeedData = {
  id: patientId,
  authUserId: authUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  sexAtBirth: SexAtBirth.Male,
}

const questionnaireNotFoundQuestionnaireIntentFixture: Partial<QuestionnaireIntent> = {
  id: 'questionnaire_not_found_questionnaire',
  questionnaireId: 99999, //not found id
  serviceCategoryId: serviceCategoryFixture.id,
  patientId: patientSeedData.id,
  updatedBy: AuthUserFixture.emailVerified.uid,
  isCompleted: false,
  questions: [],
}

const questionSeedData: QuestionInputSeed[] = [
  questionLatexAllergy,
  questionIodineAllergy,
  questionSexAtBirth,
  questionFoodAllergies,
  questionDosage,
  questionFrequency,
  questionPrescriptionMedicationList,
  questionPrescriptionMedicationListNullAnswer,
  ohipGroupQuestion,
  ohipVersionQuestion,
  ohipCartQuestion,
  repeatGroupParentQuestionQuestion,
  questionUsingAppToTrackOvulation,
  questionEctopicPregnanciesLocation,
  questionPreTermDeliveryYear,
  questionAbortionYear,
  questionSecondAbortionYear,
  questionMiscarriageYear,
  questionMiscarriageType,
  questionMiscarriageMountsToConceive,
  questionEctopicPregnanciesType,
  questionEctopicPregnanciesYear,
  questionEctopicPregnanciesMonthsToConceive,
  questionPreTermDeliveryType,
  questionPreTermDeliveryMonthsToConceive,
  questionPreTermDeliveryBirthOutcome,
  questionFullTermDeliveryMonthsToConceive,
  questionFullTermDeliveryYear,
  questionFullTermDeliveryType,
  questionFullTermDeliveryBirthOutcome,
  questionDetailCurrentStressLevel,
  questionDetailCurrentOccupation,
  questionDetailDateOfBirth,
  questionDetailDrinkAlcohol,
  questionDetailExerciseRegularly,
  questionDetailHeightInInches,
  questionDetailProblemWithAnesthetics,
  questionDetailPreferredPronouns,
  questionDetailGender,
  questionDetailSexualOrientation,
  questionDetailRecreationalDrugs,
  questionDetailSeeCounsellorForStress,
  questionDetailSmokeCigarettes,
  questionDetailUseMarijuana,
  questionDetailWeightInLbs,
  questionDetailFamilyDoctor,
  questionDetailReferringDoctor,
  questionNumberOfLiveBirth,
  questionIsOvulating,
  questionHasPeriod,
  questionMenstrualFlow,
  questionDaysOfBleeding,
  questionDaysBetweenPeriods,
  questionFirstDayOfLastPeriod,
  questionMenstrualPain,
  questionPreviousPapTest,
  questionPapTestLastDate,
  questionPatientPreviousFertilityTreatmentType,
  questionPatientPreviousFertilityTreatmentCycle,
  questionHaveBiologicalChildren,
  questionHaveBiologicalChildrenWithCurrentPartner,
  questionHadSemenAnalysis,
  questionSemenAnalysisIsNormal,
  questionDiagnosedConditions,
  questionVasectomy,
  questionVasectomyReversal,
  questionErectionDifficulties,
  questionPatientPastSurgeryType,
  questionPatientPastSurgeryDate,
  questionPatientFamilyHealthProblemProblem,
  questionPatientFamilyHealthProblemFamilyName,
  questionPatientDetailFemaleUsingOvulationKits,
  questionPatientDetailFemaleUsingAppToTrackOvulation,
  questionPatientDetailFemaleUsingLubricants,
  questionPatientDetailFemaleSeenFertilitySpecialist,
  questionGynaecologicalConditions,
  questionDetailHeightInFeet,
  questionPatientDetailFemaleHasProceduresDueAbnormalPAP,
  questionPatientDetailMaleAbnormalPapProcedures,
  questionHaveBeenReferredByPhysician,
  questionPatientSecondPastSurgeryType,
  questionPatientSecondPastSurgeryDate,
  questionFamilyDoctor,
  questionFamilyDoctorDuplicate,
  questionReferringDoctor,
]

const referringDoctorPatientId = 147
const patientReferringDoctorSeedData = {
  id: referringDoctorPatientId,
  authUserId: patientReferringDoctorAuthUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  sexAtBirth: SexAtBirth.Male,
}

const familyDoctorPatientId = 294
const patientFamilyDoctorSeedData = {
  id: familyDoctorPatientId,
  authUserId: patientFamilyDoctorAuthUserId,
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  sexAtBirth: SexAtBirth.Male,
}

export const patientReferringDbDuplicateFixture: Partial<PatientDoctor> = {
  id: 9,
  patientId: referringDoctorPatientId,
  type: PatientDoctorType.Referring,
  phoneNumber: 'testPhoneNumberRef',
  name: 'Judd Trump Db',
  billingNumberForMdBilling: '1',
}

const patientMaleSeedData = {
  id: patientMaleId,
  authUserId: maleAuthUserId,
  firstName: 'maleFirstName',
  lastName: 'maleLastName',
  middleName: 'maleMiddleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
  sexAtBirth: SexAtBirth.Male,
}

const patientDetailSeedData = {
  id: 33,
}

const patientWithDuplicateNameSeedData = {
  id: 50,
  authUserId: 'authUser2Id',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  dateOfBirth: dateTimeUtil.toDate(patientDateOfBirth),
}

const patientDetailWithDuplicateNameSeedData = {
  id: 50,
}

const questionnaire1 = {
  id: questionnaireIntentFixture.questionnaireId,
  uuid: questionnaireUUID,
  title: 'questionnaire-fixture',
}

const removeQuestionIds = [
  iodineAllergyQuestionId,
  ectopicPregnanciesLocationId,
  ectopicPregnanciesTypeId,
  ectopicPregnanciesYearId,
  ectopicPregnanciesMonthstoConceiveId,
  preTermDeliveryYearId,
  preTermDeliveryTypeId,
  preTermDeliveryMonthsToConceiveId,
  preTermDeliveryBirthOutcomeId,
  latexAlergyQuestionId,
  sexAtBirthQuestionId,
  foodAllergiesQuestionId,
  dosageQuestionId,
  frequencyQuestionId,
  ohipQuestionId,
  ohipVersionCodeQuestionId,
  ohipCardQuestionId,
  prescriptionMedicationListQuestionId,
  prescriptionMedicationNoAnswerQuestionId,
  usingAppToTrackOvulationId,
  abortionYearId,
  secondAbortionYearId,
  miscarriageMountsToConceiveId,
  miscarriageTypeId,
  miscarriageYearId,
  fullTermDeliveryMonthsToConceiveId,
  detailCurrentStressLevelId,
  detailCurrentOccupationId,
  detailDateOfBirthId,
  detailDrinkAlcoholId,
  detailExerciseRegularlyId,
  detailHeightInInchesId,
  detailProblemWithAnestheticsId,
  detailPreferredPronounsId,
  detailGenderId,
  detailSexualOrientationId,
  detailRecreationalDrugsId,
  detailSeeCounsellorForStressId,
  detailSmokeCigarettesId,
  detailUseMarijuanaId,
  detailWeightInLbsId,
  detailFamilyDoctorId,
  detailReferringDoctorId,
  numberOfLiveBirthQuestionId,
  isOvulatingQuestionId,
  hasPeriodQuestionId,
  menstrualFlowQuestionId,
  menstrualDaysOfBleedingId,
  menstrualPainId,
  previousPapTestId,
  papTestLastDateId,
  patientPreviousFertilityTreatmentTypeId,
  patientPreviousFertilityTreatmentCycled,
  questionHaveBiologicalChildrenId,
  questionHaveBiologicalChildrenWithCurrentPartnerId,
  questionHadSemenAnalysisId,
  questionSemenAnalysisIsNormalId,
  questionDiagnosedConditionsId,
  questionVasectomyId,
  questionVasectomyReversalId,
  questionErectionDifficultiesId,
  questionPatientPastSurgeryTypeId,
  questionPatientPastSurgeryDateId,
  questionPatientFamilyHealthProblemProblemId,
  questionPatientFamilyHealthProblemFamilyNameId,
  questionPatientDetailFemaleUsingOvulationKitsId,
  questionPatientDetailFemaleUsingAppToTrackOvulationId,
  questionPatientDetailFemaleUsingLubricantsId,
  questionPatientDetailFemaleSeenFertilitySpecialistId,
  questionDaysBetweenPeriodsId,
  questionFirstDayOfLastPeriodId,
  questionGynaecologicalConditionsId,
]

describe('Firebase Function: questionnaire-to-profile-info success cases', () => {
  let dataSource: DataSource
  beforeAll(async () => {
    dataSource = await getCreateDatabaseConnection()
    patientSeed = new PatientSeed(dataSource)
    questionnaireSeed = new QuestionnaireSeed(dataSource)
    questionnaireToQuestionSeed = new QuestionnaireToQuestionSeed(dataSource)
    questionSeed = new QuestionSeed(dataSource)
    questionnaireIntentSeed = new QuestionnaireIntentSeed()
    patientDetailSeed = new PatientDetailSeed(dataSource)
    patientDoctorSeed = new PatientDoctorSeed(dataSource)
    patientMedicationSeed = new PatientMedicationSeed(dataSource)
    patientDetailFemaleSeed = new PatientDetailFemaleSeed(dataSource)
    patientDetailMaleSeed = new PatientDetailMaleSeed(dataSource)
    patientPreviousFertilityTreatmentSeed = new PatientPreviousFertilityTreatmentSeed(dataSource)
    patientPastSurgerySeed = new PatientPastSurgerySeed(dataSource)
    patientFamilyHealthProblemSeed = new PatientFamilyHealthProblemSeed(dataSource)
    patientFullTermDeliveryHistorySeed = new PatientFullTermDeliveryHistorySeed(dataSource)
    patientPreTermDeliveryHistorySeed = new PatientPreTermDeliveryHistorySeed(dataSource)
    patientAbortionHistorySeed = new PatientAbortionHistorySeed(dataSource)
    patientMiscarriageHistorySeed = new PatientMiscarriageHistorySeed(dataSource)
    patientEctopicPregnancyHistorySeed = new PatientEctopicPregnancyHistorySeed(dataSource)
    patientNoteSeed = new PatientNoteSeed(dataSource)
    patientProfileSeed = new PatientProfileSeed()

    await Promise.all([
      patientSeed.create(patientWithDuplicateNameSeedData),
      patientSeed.create(patientSeedData),
      patientSeed.create(patientReferringDoctorSeedData),
      patientSeed.create(patientFamilyDoctorSeedData),
      patientSeed.create(patientMaleSeedData),
    ])

    await Promise.all([
      questionnaireIntentSeed.create(patientNotFoundQuestionnaireIntentFixture),
      questionnaireIntentSeed.create(questionnaireIntentFixture),
      questionnaireIntentSeed.create(questionnaireIntentWithoutQuestionnaireFixture),
      questionnaireSeed.create(questionnaire1),
      patientDetailSeed.create(patientDetailWithDuplicateNameSeedData),
      patientDetailSeed.create(patientDetailSeedData),
      patientDoctorSeed.create(patientReferringDbDuplicateFixture),
      questionSeed.createArray([questionPatientPastSurgery]),
      questionSeed.createArray(questionSeedData),
      patientProfileSeed.create(patientProfileFixture),
    ])

    await patientSeed.updatePatient(patientSeedData.id, {
      detailId: patientDetailSeedData.id,
    })

    await patientSeed.updatePatient(patientWithDuplicateNameSeedData.id, {
      detailId: patientDetailWithDuplicateNameSeedData.id,
    })
    await Promise.all([questionnaireToQuestionSeed.createArray(questionnaireToQuestions)])
  })

  test.only('Should create patientDetail and patientMedication successfully', async () => {
    const spyPublishEmrDataChanged = jest.spyOn(PubSubHelpers, 'publishEmrDataChanged')
    const spyPublishQuestionSubmitted = jest.spyOn(PubSubHelpers, 'publishQuestionAnswerSubmitted')

    const data: QuestionnaireSubmittedPubSubPayload = {
      questionnaireIntentId: questionnaireIntentFixture.id,
      ...createPatientDetailAndMedicationAuditTrailData,
      containsMobilePatientProfileQuestions: true,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    const result = await handler(message)
    const patient = await patientSeed.findOneWithDetailById(patientSeedData.id)
    const patientDetail = await patientDetailSeed.findOneById(patient.detailId)
    const patientDoctors = await patientDoctorSeed.findByPatientId(patient.id)
    const patientMedication = await patientMedicationSeed.findByPatientId(patientSeedData.id)
    const patientFemaleDetail = await patientDetailFemaleSeed.findOneById(patient.detailFemaleId)
    const patientDetailMale = await patientDetailMaleSeed.findOneById(patient.detailMaleId)
    const patientPastSurgeries = await patientPastSurgerySeed.findByPatientId(patientSeedData.id)
    const patientFamilyHealthProblem = await patientFamilyHealthProblemSeed.findByPatientId(
      patientSeedData.id,
    )
    const patientPreviousFertilityTreatment =
      await patientPreviousFertilityTreatmentSeed.findByPatientId(patientSeedData.id)
    const patientProfile = await patientProfileSeed.findOneByPatientId(patientId)
    const patientFullTermDeliveryHistories =
      await patientFullTermDeliveryHistorySeed.getByPatientId(patient.id)
    const patientPreTermDeliveryHistories = await patientPreTermDeliveryHistorySeed.getByPatientId(
      patient.id,
    )
    const previousAbortions = await patientAbortionHistorySeed.getByPatientId(patient.id)
    const previousMiscarriage = await patientMiscarriageHistorySeed.getByPatientId(patient.id)
    const ectopicPregnancies = await patientEctopicPregnancyHistorySeed.getByPatientId(patient.id)

    const patientNotes = await patientNoteSeed.findByPatientId(patient.id)

    const patientNote = patientNotes.find((item) => item.type === PatientNoteTypeEnum.MenstrualFlow)

    const familyDoctor = patientDoctors.find((item) => item.type === PatientDoctorType.Family)
    const referringDoctor = patientDoctors.find((item) => item.type === PatientDoctorType.Referring)
    const patientFirstPastSurgery = patientPastSurgeries.find(
      (item) => item.type === patientPastSurgeryType,
    )
    const secondPastSurgery = patientPastSurgeries.find(
      (item) => item.type === patientPastSecondSurgeryType,
    )

    expect(patientNote).toMatchObject({
      type: PatientNoteTypeEnum.MenstrualFlow,
      patientId: patient.id,
    })

    expect(familyDoctor.name).toBe('Paul Walker')
    expect(referringDoctor.name).toBe('Vin Diesel')
    expect(patient.sexAtBirth).toBe(SexAtBirth.Male)
    expect(patient.updatedBy).toBe(SystemAuthUserId.QuestionnaireAnswersMapper)
    expect(patientDetail).toBeTruthy()
    expect(patientDetail.updatedBy).toBe(SystemAuthUserId.QuestionnaireAnswersMapper)
    expect(JSON.stringify(patientDetail.foodAllergies)).toBe('["tomatoes","potato"]')
    expect(patient).toBeTruthy()
    expect(patient.ohipCardNumber).toBe(getCleanOhipNumber(ohipCardNumber))
    expect(patient.ohipCardVersionCode).toBe(getCleanOhipVersionCode(ohipCardVersionCode))
    expect(patientFemaleDetail.daysOfBleeding).toBe(DaysOfBleedingEnum.MoreThanEleven)
    expect(patientFemaleDetail.previousPapTest).toBe(false)
    expect(patientFemaleDetail.numberOfLiveBirth).toBe(3)
    expect(patientFemaleDetail.hasPeriod).toBe(true)
    expect(patientFemaleDetail.hasProceduresDueAbnormalPAP).toBe(true)
    expect(patientFemaleDetail.gynaecologicalConditions.length).toBe(10)
    expect(patientFemaleDetail.updatedBy).toBe(SystemAuthUserId.QuestionnaireAnswersMapper)
    expect(patientDetailMale.haveBiologicalChildren).toBe(true)
    expect(patientDetailMale.haveBiologicalChildrenWithCurrentPartner).toBe(true)
    expect(patientDetailMale.semenAnalysisIsNormal).toBe(true)
    expect(patientDetailMale.vasectomy).toBe(true)
    expect(patientDetailMale.vasectomyReversal).toBe(true)
    expect(patientDetailMale.erectionDifficulties).toBe(true)
    expect(patientDetail.heightInInches).toBe(68)
    expect(patient.dateOfBirth).toBe(patientDateOfBirth)
    expect(patientFamilyHealthProblem.length).toBe(5)
    expect(patientFirstPastSurgery.date).toBe(dateTimeUtil.formatIsoDate())
    expect(patientFirstPastSurgery.type).toBe(patientPastSurgeryType)
    expect(secondPastSurgery.date).toBe(dateTimeUtil.formatIsoDate())
    expect(secondPastSurgery.type).toBe(patientPastSecondSurgeryType)
    expect(patientMedication.length).toBe(2)
    const patientMedicationData = patientMedication.find((medicationData) => {
      return (
        medicationData.nameFromIntake === medicationName &&
        medicationData.dosage === medicationDosage &&
        medicationData.frequency === medicationFrequency
      )
    })
    expect(patientMedicationData).toBeTruthy()
    expect(result).toBeUndefined()
    expect(patientProfile.questionnaires.length).toBe(1)
    expect(patientPreTermDeliveryHistories.length).toBe(2)
    expect(patientPreTermDeliveryHistories[0].updatedBy).toBe(
      SystemAuthUserId.QuestionnaireAnswersMapper,
    )
    expect(patientFullTermDeliveryHistories.length).toBe(2)
    expect(previousAbortions.length).toBe(2)
    expect(previousMiscarriage.length).toBe(2)
    expect(ectopicPregnancies.length).toBe(2)
    expect(patientPreviousFertilityTreatment.length).toBe(3)
    expect(patientPreviousFertilityTreatment[0].updatedBy).toBe(
      SystemAuthUserId.QuestionnaireAnswersMapper,
    )
    expect(spyPublishEmrDataChanged).toBeCalled()
    spyPublishEmrDataChanged.mockRestore()
    expect(spyPublishQuestionSubmitted).toBeCalledWith(
      {patientId: patient.id, answers: [PatientAnswers.Yes]},
      'TOPIC_ROI_QUESTION_ANSWER_SUBMITTED',
    )
    expect(spyPublishQuestionSubmitted).toBeCalledTimes(2)
    spyPublishQuestionSubmitted.mockRestore()
  })

  test('Should log that patient detail male validation failed', async () => {
    const spyOnLogger = jest.spyOn(StructuredLogger, 'info')
    const patientDetailMale = new PatientDetailMale()
    patientDetailMale.id = 147
    patientDetailMale.hadSemenAnalysis = false
    await createOrUpdatePatientDetailMale(patientMaleSeedData.id, patientDetailMale, {
      authUserId: 'authUserId147.0',
      requestId: 'requestId147.0',
      revisionId: 'revisionId147.0',
      ipAddress: 'ipAddress147.0',
      deviceId: 'deviceId147.0',
    })
    expect(spyOnLogger).toBeCalledWith(
      activityLogs.QuestionnaireToProfileInfoFunctions.CreateOrUpdatePatientDetailMale,
      activityLogs.QuestionnaireToProfileInfoActions.ValidationFailed,
      {
        message: `Validation Failed for data, patientDetailMaleId: ${patientDetailMale.id}`,
      },
    )
    spyOnLogger.mockRestore()
  })

  test('Should update patientDetail and create patientMedication successfully', async () => {
    await questionnaireIntentSeed.create(questionnaireWithoutDoctorIntentFixture)
    const data = {
      questionnaireIntentId: questionnaireWithoutDoctorIntentFixture.id,
      ...updatePatientDetailAndMedicationAuditTrailData,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    const result = await handler(message)
    const patient = await patientSeed.findOneWithDetailById(patientSeedData.id)
    const patientDetail = await patientDetailSeed.findOneById(patient.detailId)

    const patientMedication = await patientMedicationSeed.findByPatientId(patientSeedData.id)
    expect(patient.hasDuplicateName).toBe(true)
    expect(patientDetail.iodineAllergy).toBe(true)
    expect(patientMedication.length).toBe(4)
    expect(patientMedication[0].lockedPrice).toBe(Number(0).toFixed(2))
    expect(result).toBeUndefined()
  })

  test('Should create 1 patient doctor successfully | duplicate patient family doctor data', async () => {
    await questionnaireIntentSeed.create(questionnaireIntentWithDoctorFixture)
    const spyPublishQuestionSubmitted = jest.spyOn(PubSubHelpers, 'publishQuestionAnswerSubmitted')

    const data: QuestionnaireSubmittedPubSubPayload = {
      questionnaireIntentId: questionnaireIntentWithDoctorFixture.id,
      ...createPatientDetailAndMedicationAuditTrailData,
      containsMobilePatientProfileQuestions: true,
    }

    const patientDoctorsBefore = await patientDoctorSeed.findByPatientId(familyDoctorPatientId)
    expect(patientDoctorsBefore.length).toBe(0)
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    await handler(message)
    const patientDoctors = await patientDoctorSeed.findByPatientId(familyDoctorPatientId)
    expect(patientDoctors.length).toBe(1)
    const familyDoctor = patientDoctors.find((item) => item.type === PatientDoctorType.Family)
    expect(familyDoctor.name).toBe('Shaun Murphy')
    spyPublishQuestionSubmitted.mockRestore()
  })

  test('Should create 1 patient doctor successfully | duplicate patient referring doctor in db', async () => {
    await questionnaireIntentSeed.create(questionnaireIntentWithReferringDoctorFixture)
    const spyPublishQuestionSubmitted = jest.spyOn(PubSubHelpers, 'publishQuestionAnswerSubmitted')

    const data: QuestionnaireSubmittedPubSubPayload = {
      questionnaireIntentId: questionnaireIntentWithReferringDoctorFixture.id,
      ...createPatientDetailAndMedicationAuditTrailData,
      containsMobilePatientProfileQuestions: true,
    }

    const patientDoctorsBefore = await patientDoctorSeed.findByPatientId(referringDoctorPatientId)
    const referringDoctorBefore = patientDoctorsBefore.find(
      (item) => item.type === PatientDoctorType.Referring,
    )
    expect(referringDoctorBefore).toBeTruthy()

    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    await handler(message)

    const patientDoctorsAfter = await patientDoctorSeed.findByPatientId(referringDoctorPatientId)
    const referringDoctorAfter = patientDoctorsAfter.find(
      (item) => item.type === PatientDoctorType.Referring,
    )
    expect(patientDoctorsAfter.length).toBe(patientDoctorsBefore.length)
    expect(referringDoctorAfter.id).toBe(referringDoctorBefore.id)
    spyPublishQuestionSubmitted.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    const patient = await patientSeed.findOneWithDetailById(patientSeedData.id)
    await patientNoteSeed.removeByPatientId(patient.id)
    await patientSeed.removePatientByAuthUserId(patientWithDuplicateNameSeedData.authUserId)
    await patientSeed.removePatientByAuthUserId(authUserId)
    await patientSeed.removePatientByAuthUserId(patientMaleSeedData.authUserId)
    await patientSeed.removePatientByAuthUserId(patientReferringDoctorSeedData.authUserId)
    await patientSeed.removePatientByAuthUserId(patientFamilyDoctorSeedData.authUserId)
    await patientDoctorSeed.removeByPatientIds([patientId, referringDoctorPatientId])
    await Promise.all([
      patientDetailSeed.removePatientDetailByIds([
        patientDetailWithDuplicateNameSeedData.id,
        patient.detailId,
      ]),
      patientMedicationSeed.removePatientMedicationsByPatientId(patientId),
      patientDetailFemaleSeed.removeByIds([patient.detailFemaleId]),
      patientDetailMaleSeed.removeByIds([patient.detailMaleId]),
    ])
    await questionnaireSeed.removeQuestionnaireByUUID(questionnaireUUID)
    await questionSeed.removeByIds(removeQuestionIds)
    await questionSeed.removeByIds([questionSecondPatientPastSurgeryId])
    await Promise.all([
      questionnaireIntentSeed.deleteById(questionnaireIntentFixture.id),
      questionnaireIntentSeed.deleteById(questionnaireIntentWithoutQuestionnaireFixture.id),
      questionnaireIntentSeed.deleteById(questionnaireWithoutDoctorIntentFixture.id),
      questionnaireToQuestionSeed.removeByQuestionnaireId(
        questionnaireIntentFixture.questionnaireId,
      ),
    ])
  })
})

describe('Firebase Function: questionnaire-to-profile-info Fail cases', () => {
  questionnaireIntentSeed = new QuestionnaireIntentSeed()
  beforeAll(async () => {
    await Promise.all([
      questionnaireIntentSeed.create(patientNotFoundQuestionnaireIntentFixture),
      questionnaireIntentSeed.create(questionnaireNotFoundQuestionnaireIntentFixture),
    ])
  })

  test('Should fail: Questionnaire not found', async () => {
    const data = {
      questionnaireIntentId: questionnaireNotFoundQuestionnaireIntentFixture.id,
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    const result = await handler(message)
    expect(result).toBeNull()
  })

  test('Should fail: Questionnaire Intent not found', async () => {
    const data = {
      questionnaireIntentId: 'not_found_id',
    }
    const message = testPubSubEvent(encodePubSubMessage(data, QuestionnaireSubmittedSchema))

    const result = await handler(message)
    await expect(result).toBeNull()
  })

  test('Should throw error', async () => {
    await questionnaireIntentSeed.create(questionnaireIntentFixture)
    const data = null
    expect(() => encodePubSubMessage(data, QuestionnaireSubmittedSchema)).toThrow()
  })

  test('Should fail: Patient not found', async () => {
    const spyPublishEmrDataChanged = jest.spyOn(PubSubHelpers, 'publishEmrDataChanged')
    const patientNotFoundData: QuestionnaireSubmittedPubSubPayload = {
      questionnaireIntentId: patientNotFoundQuestionnaireIntentFixture.id,
      ...updatePatientDetailAndMedicationAuditTrailData,
    }
    const message = testPubSubEvent(
      encodePubSubMessage(patientNotFoundData, QuestionnaireSubmittedSchema),
    )

    const result = await handler(message)
    await expect(result).toBeNull()
    expect(spyPublishEmrDataChanged).not.toBeCalled()
    spyPublishEmrDataChanged.mockRestore()
  })

  afterAll(async () => {
    jest.clearAllMocks()
    await Promise.all([
      questionnaireIntentSeed.deleteById(patientNotFoundQuestionnaireIntentFixture.id),
      questionnaireIntentSeed.deleteById(questionnaireNotFoundQuestionnaireIntentFixture.id),
      patientProfileSeed.deleteByPatientId(patientId),
    ])
  })
})
