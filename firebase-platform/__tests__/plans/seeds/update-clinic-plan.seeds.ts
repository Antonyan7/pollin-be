/* eslint-disable max-lines */
import {
  IvfDishSeed,
  IvfDishToPlanAddonSeed,
  IvfDishToPlanTypeSeed,
  IvfTaskSummarySeed,
  PatientPlanAddonSeed,
  PatientPlanCohortIvfDishSeed,
  PatientPlanCohortIvfTaskGroupSeed,
  PatientPlanStatusSeed,
  PlanChecklistItemSeed,
  QuestionnaireSeed,
  SuperTypeSeed,
} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DataSource} from 'typeorm'
import {
  IvfDish,
  IvfDishToPlanAddon,
  IvfDishToPlanType,
  PatientPlanCohortIvfDish,
  PatientPlanCohortIvfTaskSummary,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {
  PlanAddonCode,
  PlanAddonType,
  PlanTypeGroup,
} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {
  PatientPlan,
  PatientPlanStatus,
  PlanCategory,
  PlanType,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {MilestoneStep, PatientStatusEnum} from '@libs/services-common/enums'
import {PatientPlanSeed} from '@seeds/typeorm'
import {
  IvfTaskToDay,
  PatientPlanCohort,
  PatientPlanCohortIvfTaskGroup,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DishOwner, IVFLabStatus, IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {
  Appointment,
  ServiceProvider,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {AppointmentStatus} from '@libs/common/enums'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'
import {PlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/plan-addons.entity'
import {appliedStartDate} from '@libs/common/test/fixtures/applied-scheduling-template-period.fixture'
import {
  AppointmentSeed,
  IvfTaskToDaySeed,
  PatientPlanCohortSeed,
  PatientSeed,
  PlanAddonSeed,
  PlanCategorySeed,
  PlanChecklistSeed,
  PlanTypeSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  PatientDetailSeed,
  IntroductionSeed,
  IntroductionSeedInput,
  PatientPlanDetailSeed,
} from '@seeds/typeorm'
import {PlanChecklist} from '@libs/data-layer/apps/plan/entities/typeorm/plan-checklist.entity'
import {PlanChecklistToItem} from '@libs/data-layer/apps/plan/entities/typeorm/plan-checklist-to-item.entity'
import {PlanChecklistItem} from '@libs/data-layer/apps/plan/entities/typeorm/plan-checklist-item.entity'
import {PlanChecklistItemType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientDetail} from '@libs/data-layer/apps/users/entities/typeorm'
import {ServiceProviderGroup} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {ServiceProviderPosition} from '@libs/services-common/enums'
import {
  ServiceCategoryInputSeed,
  ServiceCategorySeed,
  ServiceProviderGroupSeed,
} from '@seeds/typeorm'
import {Questionnaire} from '@libs/data-layer/apps/questionnaires/entities/typeorm'
import {PatientPlanDetail} from '@libs/data-layer/apps/plan/entities/typeorm'
import {superTypeOtherFixture} from '@libs/common/test/fixtures/super-type.fixture'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PatientPlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-addon.entity'

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

const getActivePeriod: (cohortDate: string | Date, daysCount: number) => string = (
  cohortDate: string | Date,
  daysCount: number,
): string => {
  return dateTimeUtil.formatDateYMD(
    dateTimeUtil.addDays(dateTimeUtil.toDate(cohortDate), daysCount),
  )
}

export const planAddonFixtureIcsiInjectionFixture: Partial<PlanAddon> = {
  id: 23,
  uuid: '4f67eceb-7db4-4a87-a7ff-3ebb51fd45c9',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFixtureIcsi',
  price: 0,
  sequence: 4,
  code: PlanAddonCode.ICSI,
}
export const planAddonFixtureInjectionFixture: Partial<PlanAddon> = {
  id: 24,
  uuid: '313e725c-a324-45f2-ba14-2fc1050a20d1',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFixtureIcsi',
  price: 0,
  sequence: 4,
  code: PlanAddonCode.IVF,
}

export const planAddonFixtureIVFFixture: Partial<PlanAddon> = {
  id: 30,
  uuid: '0eeee5f3-5217-4b2d-9c91-61573cbc8761',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFixtureIVF',
  price: 0,
  sequence: 100,
  code: PlanAddonCode.IVF,
}

const ivfTaskDayFertilizationICSIFixture: Partial<IvfTaskToDay> = {
  id: 27,
  day: 4,
  task: IVFTaskType.IcsiInjection,
  order: 24,
}

const ivfTaskDayFertilizationIVFFixture: Partial<IvfTaskToDay> = {
  id: 26,
  day: 3,
  task: IVFTaskType.InseminationIVF,
  order: 24,
}

export const ivfTaskToDay2Fixture: Partial<IvfTaskToDay> = {
  id: 2,
  day: 1,
  task: IVFTaskType.InjectionAssessment,
  order: 24,
}

const planCategoryV2Fixture: Partial<PlanCategory> = {
  id: 3,
  uuid: 'b9c69f5f-bb93-46b2-8b15-f51506f994c4',
  title: 'Category',
}

const patientDetailForPlansV3Fixture: Partial<PatientDetail> = {
  id: 126,
  weightInLbs: 200,
  heightInInches: 70,
}

const serviceProviderGroupFixture: Partial<ServiceProviderGroup> = {
  id: 1,
  title: 'Doctor',
  sequence: 0,
  showOnPatientFiltering: true,
  position: ServiceProviderPosition.Doctor,
}

const introductionForBookingFlowFixture: IntroductionSeedInput = {
  id: 1,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249c',
  name: 'introductionForBookingFlow',
  title: 'introductionForBookingFlow',
  heading: 'introductionForBookingFlow',
  description: 'introductionForBookingFlow',
}

const questionnaireForBookingFixture: Partial<Questionnaire> = {
  id: 1,
  uuid: 'b9c69f5f-bb93-46b2-8b15-f51506f994c5',
  introductionId: introductionForBookingFlowFixture.id,
}

const serviceCategoryFixture: ServiceCategoryInputSeed = {
  id: 10,
  uuid: 'service-category-for-qeustionnaire-validation-test',
  questionnaireId: questionnaireForBookingFixture.id,
  title: 'InitialConsultation',
  milestoneStep: MilestoneStep.InitialConsultation,
  imageURL: 'imageUrl',
  shortDescription: 'service category description',
  longDescription: 'service category long Description',
}

const patientPlanStatusV2Fixture: Partial<PatientPlanStatus> = {
  id: 3,
  uuid: '2f50fb0d-fa7e-4e61-8f04-86fb0193eb3f',
  patientStatusAbbreviation: 'patientPlanStatusV2',
  patientStatusColor: '#DDF1E4',
  patientStatusOrder: 3,
}

const planCheckllistItemDisplayFixture: Partial<PlanChecklistItem> = {
  id: 1,
  uuid: '216c619f-2d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemDisplayFixture',
  type: PlanChecklistItemType.Display,
}

const planCheckllistItemDateFixture: Partial<PlanChecklistItem> = {
  id: 2,
  uuid: '216c619f-1d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemDateFixture',
  type: PlanChecklistItemType.Date,
}

const planCheckllistItemFullDateFixture: Partial<PlanChecklistItem> = {
  id: 3,
  uuid: '216c619f-3d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemFullDateFixture',
  type: PlanChecklistItemType.FullDate,
}

const planCheckllistItemSoftDeletedFixture: Partial<PlanChecklistItem> = {
  id: 4,
  uuid: '216c612f-3d03-4660-a147-c4dcee193d79',
  title: 'planCheckllistItemSoftDeletedFixture',
  type: PlanChecklistItemType.FullDate,
  deletedAt: new DateTimeUtil().now(),
}

const planIVFChecklistFixture: Partial<PlanChecklist> = {
  id: 1,
  uuid: '216c619f-8d03-4660-a147-c4dcee193d79',
  internalName: 'planIVFChecklistFixture',
  itemsRelations: [
    {
      planChecklistItemId: planCheckllistItemDisplayFixture.id,
      sequence: 2,
    },
    {
      planChecklistItemId: planCheckllistItemDateFixture.id,
      sequence: 1,
    },
    {
      planChecklistItemId: planCheckllistItemFullDateFixture.id,
      sequence: 3,
    },
    {
      planChecklistItemId: planCheckllistItemSoftDeletedFixture.id,
      sequence: 4,
    },
  ] as PlanChecklistToItem[],
}

const planTypeFixture: Partial<PlanType> = {
  id: 1,
  uuid: 'b8b69f4f-bb93-46b2-8b15-f51506f994f6',
  title: 'planTypeFixtureV2',
  planCategoryId: planCategoryV2Fixture.id,
  shortDescription: 'shawty',
  longDescription: 'long desc',
  price: 5112,
  patientPlanStatusId: patientPlanStatusV2Fixture.id,
  heading: 'PLAN TYPE HEADING',
  planTypeGroup: PlanTypeGroup.IVF,
  alertDescription: 'alert desc',
  alertTitle: 'alert title',
  allowPushToMobile: true,
  automaticMilestoneToReportPeriod: true,
  preliminaryBloods: true,
  infectiousDiseaseScreen: true,
  ivfLabCohortStartDay: 2,
  sheets: [],
}

const patientForPlansV3Fixture: Partial<Patient> = {
  id: 266,
  uuid: '9be6c946-c5fb-41a3-9e41-8ef6a55f9dbc',
  authUserId: AuthUserFixture.plansV3.uid,
  firstName: 'Plans',
  lastName: 'V3',
  sexAtBirth: SexAtBirth.Female,
  detailId: patientDetailForPlansV3Fixture.id,
  status: PatientStatusEnum.Active,
  dateOfBirth: dateTimeUtil.toDate('1994-01-02'),
}

export const patientPlanV3ToUpdateFertilizationFixture: Partial<PatientPlan> = {
  id: 104,
  uuid: 'b2b62f4c-aa93-56b1-2b12-f51506f994b3',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Completed,
  addons: [
    {
      planAddonId: planAddonFixtureIcsiInjectionFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}
export const patientPlanV2ForInjectionAssignmentFixture: Partial<PatientPlan> = {
  id: 90,
  uuid: 'f7ed351b-98d1-4df7-8a1d-b865ee76eb1c',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
  ivfLabStatus: IVFLabStatus.Completed,
  addons: [
    {
      planAddonId: planAddonFixtureIVFFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}
const patientPlanV2ForCancelCohortFixture: Partial<PatientPlan> = {
  id: 89,
  uuid: 'fad6ce24-2f8c-408e-960c-fd0bdab9a05c',
  planTypeId: planTypeFixture.id,
  patientId: patientForPlansV3Fixture.id,
  status: PlanStatusEnum.Active,
  activatedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  lastStatusUpdateDate: dateTimeUtil.subDays(dateTimeUtil.now(), 100),
}

const serviceProviderFixture: Partial<ServiceProvider> = {
  id: 1,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac110002',
  title: 'Dr. John Doe',
  imageURL: 'IMG',
  videoURL: 'videoUrl',
  description: 'Provider Description Fixture',
  designation: 'MD',
  serviceProviderGroupId: serviceProviderGroupFixture.id,
  maxAppointmentCountPerSlot: 10,
  displayServiceProviderNameOnCheckout: true,
}

const serviceTypeFixture: Partial<ServiceType> = {
  id: 1,
  name: 'TEST_NAME',
  uuid: 'b131b3bf-132d-11ed-814e-0242ac110004',
  type: ServiceTypeMethod.InClinic,
  abbreviation: 'IC-V',
  color: '#F8B5C9',
  shortDescription: 'service type description',
  milestoneSummary: 'service type milestone Summary description',
  longDescription: 'service type long Description',
  serviceCategoryId: serviceCategoryFixture.id,
  durationInMinutes: 10,
  price: 100,
  hasUncomplicatedProcedure: true,
  hasCatheterSelection: true,
  hasLinkToEncounters: true,
  imageURL: 'imageUrlForPatientMilestoneUsedInMobileApp',
  showResultsOnStimSheet: true,
  sendReferringDoctorBillingNumber: true,
}

const appointmentInitialConsultation: Partial<Appointment> = {
  id: 119,
  uuid: '2226b893-560a-4359-a9af-551f2abd1daa',
  status: AppointmentStatus.Booked,
  patientId: patientForPlansV3Fixture.id,
  serviceProviderId: serviceProviderFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  start: dateTimeUtil.toDate(`${appliedStartDate}T13:24:00`),
  end: dateTimeUtil.toDate(`${appliedStartDate}T14:24:00`),
  milestoneStep: MilestoneStep.InitialConsultation,
}

const patientPlanCohortV3Fixture: Partial<PatientPlanCohort> = {
  id: 27,
  uuid: '019738e8-ce7e-4d47-ac4c-5cb6d350a2c9',
  patientPlanId: patientPlanV3ToUpdateFertilizationFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
  completionComment: 'Completed by fixture',
}

const patientPlanCohortForCancelFixture: Partial<PatientPlanCohort> = {
  id: 16,
  uuid: 'a7ab4c46-bfe0-46d9-bce7-fc8106ae30e1',
  patientPlanId: patientPlanV2ForCancelCohortFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}
const patientPlanCohortForInjectionAssignmentFixture: Partial<PatientPlanCohort> = {
  id: 17,
  uuid: 'a3bca882-442c-4999-aa50-7dfb9cdabc57',
  patientPlanId: patientPlanV2ForInjectionAssignmentFixture.id,
  appointmentId: appointmentInitialConsultation.id,
  cohortDate: dateTimeUtil.formatDateYMD(dateTimeUtil.now()),
  activePeriodStart: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), -1),
  activePeriodEnd: getActivePeriod(dateTimeUtil.formatDateYMD(dateTimeUtil.now()), 7),
}

const taskGroupForV3Fixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 65,
  uuid: '08b28d22-dfe3-4965-a06b-b60364569914',
  patientPlanCohortId: patientPlanCohortV3Fixture.id,
  date: patientPlanCohortForCancelFixture.cohortDate,
  completionPercentage: 50,
  day: 0,
}
const taskGroupForV3InjectionFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: 66,
  uuid: 'eb3a2344-7023-4271-a919-d950f35d90e2',
  patientPlanCohortId: patientPlanCohortForInjectionAssignmentFixture.id,
  date: patientPlanCohortForCancelFixture.cohortDate,
  completionPercentage: 50,
  day: 0,
}

export const ivfTaskSummaryForFertilizationICSIFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 53,
  uuid: 'ee6cac6a-1353-4663-8786-d761436ef380',
  IVFTaskToDayId: ivfTaskDayFertilizationICSIFixture.id,
  patientPlanCohortId: patientPlanCohortV3Fixture.id,
  patientPlanCohortIvfTaskGroupId: taskGroupForV3Fixture.id,
  disabledAt: dateTimeUtil.addDays(dateTimeUtil.now(), -2),
}

export const ivfTaskSummaryForFertilizationIVFFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: 54,
  uuid: 'ee6cac6a-1353-4663-8786-d761436ef381',
  IVFTaskToDayId: ivfTaskDayFertilizationIVFFixture.id,
  patientPlanCohortId: patientPlanCohortV3Fixture.id,
  patientPlanCohortIvfTaskGroupId: taskGroupForV3Fixture.id,
}
export const ivfTaskSummaryForInjectionAssignmentFertiDirectiveFixture: Partial<PatientPlanCohortIvfTaskSummary> =
  {
    id: 55,
    uuid: '38639817-0b62-4140-b014-cc17cae57de8',
    IVFTaskToDayId: ivfTaskToDay2Fixture.id,
    patientPlanCohortId: patientPlanCohortForInjectionAssignmentFixture.id,
    patientPlanCohortIvfTaskGroupId: taskGroupForV3InjectionFixture.id,
  }

export const patientPlanDetailToUpdateFixture: Partial<PatientPlanDetail> = {
  id: 3,
  patientPlanId: patientPlanV3ToUpdateFertilizationFixture.id,
  expectedDayOneOfPeriod: '2012-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2012-06-02'),
  follicleNumber: '1221',
  geneticTestingFileUrl: 'oldFileURL',
  geneticTestingFileName: 'oldFileName',
  lastMenstrualPeriodDate: '2012-12-12',
}
export const patientPlanDetailForInjectionAssignment: Partial<PatientPlanDetail> = {
  id: 5,
  patientPlanId: patientPlanV2ForInjectionAssignmentFixture.id,
  expectedDayOneOfPeriod: '2012-05-02',
  reportedDayOneOfPeriod: dateTimeUtil.toDate('2012-06-02'),
  follicleNumber: '1221',
  geneticTestingFileUrl: 'oldFileURL',
  geneticTestingFileName: 'oldFileName',
  lastMenstrualPeriodDate: '2012-12-12',
}

const ivfSharedDish: Partial<IvfDish> = {
  id: 1000,
  uuid: '1c67eceb-8db4-4a87-a7ff-3ebb51fd45a1',
  dishOwner: DishOwner.Patient,
  dishLabel: 'Shared Dish',
}

/** Plan Addon Dish */
// should exist on cohort
export const ivfAddonDishOld: Partial<IvfDish> = {
  id: 100,
  uuid: '5d67eceb-7db4-4a87-a7ff-3ebb51fd45c1',
  dishOwner: DishOwner.Patient,
  dishLabel: 'Add On Dish Old',
}

// should be created
export const ivfAddonDishNew: Partial<IvfDish> = {
  id: 1001,
  uuid: '6d67eceb-7db4-4a87-a7ff-3ebb51fd45q1',
  dishOwner: DishOwner.Patient,
  dishLabel: 'Add On Dish New',
}

const ivfAddonDishExistingButDisabled: Partial<IvfDish> = {
  id: 1002,
  uuid: '7d67eceb-7db4-4a87-a7ff-3ebb51fd45q2',
  dishOwner: DishOwner.Patient,
  dishLabel: 'Add On Dish Existing but Disabled',
}

const ivfDishToPlanAddonShared: Partial<IvfDishToPlanAddon> = {
  id: 301,
  uuid: '6e67eceb-7db4-5a87-a7ff-3ebb51fd45c3',
  day: 0,
  required: false,
  planAddonId: planAddonFixtureIcsiInjectionFixture.id,
  ivfDishId: ivfSharedDish.id,
}

// should be inserted on cohort
const ivfDishToPlanAddonNew: Partial<IvfDishToPlanAddon> = {
  id: 302,
  uuid: '7e67eceb-8db4-5a87-a7ff-3ebb51fd45c4',
  day: 0,
  required: false,
  planAddonId: planAddonFixtureIcsiInjectionFixture.id,
  ivfDishId: ivfAddonDishNew.id,
}

// should be enabled after update
const ivfDishToPlanAddonExistingButDisabled: Partial<IvfDishToPlanAddon> = {
  id: 303,
  uuid: '7e67eceb-8db4-5a87-a7ff-3ebb51fd45c5',
  day: 0,
  required: false,
  planAddonId: planAddonFixtureIcsiInjectionFixture.id,
  ivfDishId: ivfAddonDishExistingButDisabled.id,
}

/** Plan Type Dish
 * All Plan Type Dishes should be kept on cohort
 */
const ivfPlanTypeDishA: Partial<IvfDish> = {
  id: 101,
  uuid: '6c67eceb-7db4-4a87-a7ff-3ebb51fd45c2',
  dishOwner: DishOwner.Patient,
  dishLabel: 'Plan Type Dish A',
}

const ivfDishToPlanTypeA: Partial<IvfDishToPlanType> = {
  id: 200,
  uuid: '7e67eceb-2db4-4a87-a7ff-3ebb51fd45c3',
  day: 0,
  required: false,
  ivfDishId: ivfPlanTypeDishA.id,
  planTypeId: planTypeFixture.id,
}

const ivfDishToPlanTypeShared: Partial<IvfDishToPlanType> = {
  id: 201,
  uuid: '8e67eceb-2db4-4a87-a7ff-3ebb51fd45c4',
  day: 0,
  required: false,
  ivfDishId: ivfSharedDish.id,
  planTypeId: planTypeFixture.id,
}

/** Cohort dishes */

// Cohort existing Dishes
const cohortDish: Partial<PatientPlanCohortIvfDish> = {
  id: 1,
  uuid: '7e67eceb-7db4-4a87-g7ff-3ebb51fd45a1',
  ivfDishId: ivfAddonDishOld.id,
  patientPlanCohortId: patientPlanCohortV3Fixture.id,
}

const cohortDishIvfPlanTypeDishA: Partial<PatientPlanCohortIvfDish> = {
  id: 2,
  uuid: '8e67eceb-7db4-4a87-g7ff-3ebb51fd45a2',
  ivfDishId: ivfPlanTypeDishA.id,
  patientPlanCohortId: patientPlanCohortV3Fixture.id,
}

// update should enable since new addon has this Dish
const cohortDishExistingButDisabled: Partial<PatientPlanCohortIvfDish> = {
  id: 3,
  uuid: '9e67eceb-7db4-4a87-g7ff-3ebb51fd45a3',
  ivfDishId: ivfAddonDishExistingButDisabled.id,
  patientPlanCohortId: patientPlanCohortV3Fixture.id,
  disabledAt: dateTimeUtil.now(),
}

const cohortDishShared: Partial<PatientPlanCohortIvfDish> = {
  id: 4,
  uuid: '8e67eceb-7db4-4a87-g7ff-3ebb51fd45a4',
  ivfDishId: ivfSharedDish.id,
  patientPlanCohortId: patientPlanCohortV3Fixture.id,
}

export async function createClinicPlanFixtures(dataSource: DataSource): Promise<void> {
  const ivfTaskToDaySeed = new IvfTaskToDaySeed(dataSource)
  const ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const introductionSeed = new IntroductionSeed(dataSource)
  const questionnaireSeed = new QuestionnaireSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const patientPlanCohortIvfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(dataSource)
  const planAddonSeed = new PlanAddonSeed(dataSource)
  const planChecklistSeed = new PlanChecklistSeed(dataSource)
  const planChecklistItemSeed = new PlanChecklistItemSeed(dataSource)
  const patientDetailsSeed = new PatientDetailSeed(dataSource)
  const patientPlanDetailSeed = new PatientPlanDetailSeed(dataSource)
  const ivfDishSeed = new IvfDishSeed(dataSource)
  const ivfDishToPlanTypeSeed = new IvfDishToPlanTypeSeed(dataSource)
  const ivfDishToPlanAddonSeed = new IvfDishToPlanAddonSeed(dataSource)
  const patientPlanCohortIvfDishSeed = new PatientPlanCohortIvfDishSeed(dataSource)

  await planAddonSeed.createArray([
    planAddonFixtureIcsiInjectionFixture,
    planAddonFixtureInjectionFixture,
    planAddonFixtureIVFFixture,
  ])
  await Promise.all([
    ivfDishSeed.create(ivfAddonDishOld),
    ivfDishSeed.create(ivfPlanTypeDishA),
    ivfDishSeed.create(ivfSharedDish),
    ivfDishSeed.create(ivfAddonDishNew),
    ivfDishSeed.create(ivfAddonDishExistingButDisabled),
  ])
  await Promise.all([
    planChecklistItemSeed.create(planCheckllistItemDisplayFixture),
    planChecklistItemSeed.create(planCheckllistItemDateFixture),
    planChecklistItemSeed.create(planCheckllistItemFullDateFixture),
    planChecklistItemSeed.create(planCheckllistItemSoftDeletedFixture),
  ])
  await Promise.all([planChecklistSeed.create(planIVFChecklistFixture)])
  await Promise.all([
    ivfTaskToDaySeed.create(ivfTaskDayFertilizationICSIFixture),
    ivfTaskToDaySeed.create(ivfTaskDayFertilizationIVFFixture),
    ivfTaskToDaySeed.create(ivfTaskToDay2Fixture),
  ])
  await Promise.all([planCategorySeed.create(planCategoryV2Fixture)])
  await Promise.all([patientPlanStatusSeed.create(patientPlanStatusV2Fixture)])
  await Promise.all([planTypeSeed.create(planTypeFixture)])
  await Promise.all([patientDetailsSeed.create(patientDetailForPlansV3Fixture)])
  await Promise.all([patientDetailsSeed.create(patientPlanDetailForInjectionAssignment)])
  await Promise.all([patientSeed.create(patientForPlansV3Fixture)])
  await Promise.all([serviceProviderGroupSeed.create(serviceProviderGroupFixture)])
  await Promise.all([serviceProviderSeed.create(serviceProviderFixture)])
  await Promise.all([introductionSeed.create(introductionForBookingFlowFixture)])
  await Promise.all([questionnaireSeed.create(questionnaireForBookingFixture)])
  await Promise.all([serviceCategorySeed.create(serviceCategoryFixture)])
  await superTypeSeed.create(superTypeOtherFixture)
  await Promise.all([serviceTypeSeed.create(serviceTypeFixture)])
  await Promise.all([appointmentSeed.create(appointmentInitialConsultation)])
  await Promise.all([
    patientPlanSeed.create(patientPlanV3ToUpdateFertilizationFixture),
    patientPlanSeed.create(patientPlanV2ForCancelCohortFixture),
    patientPlanSeed.create(patientPlanV2ForInjectionAssignmentFixture),
  ])
  await Promise.all([
    patientPlanCohortSeed.create(patientPlanCohortV3Fixture),
    patientPlanCohortSeed.create(patientPlanCohortForCancelFixture),
    patientPlanCohortSeed.create(patientPlanCohortForInjectionAssignmentFixture),
  ])
  await Promise.all([patientPlanCohortIvfTaskGroupSeed.create(taskGroupForV3Fixture)])
  await Promise.all([patientPlanCohortIvfTaskGroupSeed.create(taskGroupForV3InjectionFixture)])
  await Promise.all([
    ivfTaskSummarySeed.create(ivfTaskSummaryForFertilizationICSIFixture),
    ivfTaskSummarySeed.create(ivfTaskSummaryForFertilizationIVFFixture),
    ivfTaskSummarySeed.create(ivfTaskSummaryForInjectionAssignmentFertiDirectiveFixture),
  ])
  await Promise.all([patientPlanDetailSeed.create(patientPlanDetailToUpdateFixture)])
  await Promise.all([patientPlanDetailSeed.create(patientPlanDetailForInjectionAssignment)])
  await ivfDishToPlanTypeSeed.createArray([ivfDishToPlanTypeA, ivfDishToPlanTypeShared])
  await ivfDishToPlanAddonSeed.createArray([
    ivfDishToPlanAddonShared,
    ivfDishToPlanAddonNew,
    ivfDishToPlanAddonExistingButDisabled,
  ])
  await patientPlanCohortIvfDishSeed.createArray([
    cohortDish,
    cohortDishIvfPlanTypeDishA,
    cohortDishExistingButDisabled,
    cohortDishShared,
  ])
}

export async function destroyClinicPlanFixtures(dataSource: DataSource): Promise<void> {
  const ivfTaskToDaySeed = new IvfTaskToDaySeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(dataSource)
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const serviceCategorySeed = new ServiceCategorySeed(dataSource)
  const questionnaireSeed = new QuestionnaireSeed(dataSource)
  const introductionSeed = new IntroductionSeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const patientPlanCohortIvfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(dataSource)
  const planAddonSeed = new PlanAddonSeed(dataSource)
  const planChecklistSeed = new PlanChecklistSeed(dataSource)
  const planChecklistItemSeed = new PlanChecklistItemSeed(dataSource)
  const ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const patientDetailsSeed = new PatientDetailSeed(dataSource)
  const patientPlanDetailSeed = new PatientPlanDetailSeed(dataSource)
  const ivfDishSeed = new IvfDishSeed(dataSource)
  const ivfDishToPlanTypeSeed = new IvfDishToPlanTypeSeed(dataSource)
  const ivfDishToPlanAddonSeed = new IvfDishToPlanAddonSeed(dataSource)
  const patientPlanAddonSeed = new PatientPlanAddonSeed(dataSource)

  await patientPlanAddonSeed.deleteByPlanAddonIds([
    planAddonFixtureIcsiInjectionFixture.id,
    planAddonFixtureInjectionFixture.id,
    planAddonFixtureIVFFixture.id,
  ])
  await ivfDishToPlanTypeSeed.removeByIds([ivfDishToPlanTypeA.id, ivfDishToPlanTypeShared.id])
  await ivfDishToPlanAddonSeed.removeByIds([
    ivfDishToPlanAddonExistingButDisabled.id,
    ivfDishToPlanAddonShared.id,
    ivfDishToPlanAddonNew.id,
  ])
  await patientPlanDetailSeed.removeByIds([patientPlanDetailToUpdateFixture.id])
  await ivfTaskToDaySeed.removeByIds([
    ivfTaskDayFertilizationICSIFixture.id,
    ivfTaskDayFertilizationIVFFixture.id,
    ivfTaskToDay2Fixture.id,
  ])
  await planCategorySeed.removeByIds([planCategoryV2Fixture.id])
  await patientPlanStatusSeed.removeByIds([patientPlanStatusV2Fixture.id])
  await planTypeSeed.removeByIds([planTypeFixture.id])
  await patientSeed.removeByIds([patientForPlansV3Fixture.id])
  await patientDetailsSeed.removePatientDetailByIds([
    patientDetailForPlansV3Fixture.id,
    patientPlanDetailForInjectionAssignment.id,
  ])
  await serviceProviderGroupSeed.removeByIds([serviceProviderGroupFixture.id])
  await serviceProviderSeed.removeByIds([serviceProviderFixture.id])
  await serviceTypeSeed.removeByIds([serviceTypeFixture.id])
  await superTypeSeed.removeByIds([superTypeOtherFixture.id])
  await serviceCategorySeed.removeByIds([serviceCategoryFixture.id])
  await questionnaireSeed.removeQuestionnaireByIds([questionnaireForBookingFixture.id])
  await introductionSeed.removeByUUIDs([introductionForBookingFlowFixture.uuid])
  await appointmentSeed.removeByIds([appointmentInitialConsultation.id])
  await patientPlanCohortSeed.removeByIds([
    patientPlanCohortV3Fixture.id,
    patientPlanCohortForCancelFixture.id,
    patientPlanCohortForInjectionAssignmentFixture.id,
  ])
  await patientPlanCohortIvfTaskGroupSeed.removeByIds([
    taskGroupForV3Fixture.id,
    taskGroupForV3InjectionFixture.id,
  ])
  await planAddonSeed.removeByIds([
    planAddonFixtureIcsiInjectionFixture.id,
    planAddonFixtureInjectionFixture.id,
  ])
  await planChecklistSeed.removeByIds([planIVFChecklistFixture.id])
  await planChecklistItemSeed.removeByIds([
    planCheckllistItemDisplayFixture.id,
    planCheckllistItemDateFixture.id,
    planCheckllistItemFullDateFixture.id,
    planCheckllistItemSoftDeletedFixture.id,
  ])
  await ivfTaskSummarySeed.removeByIds([
    ivfTaskSummaryForFertilizationICSIFixture.id,
    ivfTaskSummaryForFertilizationIVFFixture.id,
    ivfTaskSummaryForInjectionAssignmentFertiDirectiveFixture.id,
  ])
  await patientPlanSeed.removeByIds([
    patientPlanV3ToUpdateFertilizationFixture.id,
    patientPlanV2ForCancelCohortFixture.id,
    patientPlanV2ForInjectionAssignmentFixture.id,
  ])
  await ivfDishSeed.removeByIds([
    ivfAddonDishOld.id,
    ivfPlanTypeDishA.id,
    ivfSharedDish.id,
    ivfAddonDishNew.id,
    ivfAddonDishExistingButDisabled.id,
  ])
}
