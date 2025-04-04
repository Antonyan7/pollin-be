/* eslint-disable max-lines */
import {
  AppointmentSeed,
  IvfDayTaskToPlanTypeSeed,
  IvfTaskDetailsSeed,
  IvfTaskSummarySeed,
  IvfTaskToDaySeed,
  PatientPlanCohortIvfTaskGroupSeed,
  PatientPlanCohortSeed,
  PatientPlanDetailSeed,
  PatientPlanSeed,
  PatientSeed,
  PlanAddonSeed,
  PlanCategorySeed,
  PlanTypeSeed,
  ServiceProviderGroupSeed,
  ServiceProviderSeed,
  ServiceTypeSeed,
  StaffSeed,
  IvfTaskDetailsHistorySeed,
  PatientPlanLabInstructionSeed,
  PlanLabInstructionSeed,
  PatientPlanStatusSeed,
  SuperTypeSeed,
  IvfDishSeed,
  IvfDishToPlanTypeSeed,
  IvfDishToPlanAddonSeed,
  PatientPlanAddonSeed,
} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DataSource} from 'typeorm'
import {ServiceProviderPosition} from '@libs/services-common/enums'
import {PatientPlan, PatientPlanDetail, PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  IvfTaskToDay,
  IvfTaskToDayToPlanType,
  PatientPlanCohort,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskGroup,
  PatientPlanCohortIvfTaskSummary,
  IvfDishToPlanType,
  IvfDishToPlanAddon,
  IvfDish,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {IVFLabStatus, IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {AppointmentStatus} from '@libs/common/enums'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {PlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/plan-addons.entity'
import {PlanAddonCode, PlanAddonType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PlanLabInstructionType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {patientPlanStatusFixture} from '@libs/common/test/fixtures/patient-plan-status.fixture'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {DishOwner} from '@libs/data-layer/apps/clinic-ivf/enums'
import {PatientPlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-addon.entity'

const id = 5551112
const addonId = 125551112
const icsiAddonId = 125551113
const dishToPlanTypeId = 1
const dishToPlanAddonId = 1
const dishId = 1

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

const staffFixture: Partial<Staff> = {
  id,
  email: 'staff-user-ivf',
}

const serviceTypeForIVFFixture = {
  id,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}

const serviceTypeForIVFWithDay5Fixture = {
  id: id + 3,
  name: 'TEST_NAME_DAY_5',
  durationInMinutes: 30,
  price: 150,
}

const serviceTypeForIVFWithPlanInstructionFixture = {
  id: id + 4,
  name: 'TEST_NAME_DAY_5',
  durationInMinutes: 30,
  price: 150,
}

const serviceTypeWithoutIVFRelationFixture = {
  id: id + 2,
  name: 'TEST_NAME',
  durationInMinutes: 20,
  price: 100,
}

const serviceProviderGroupFixture = {
  id,
  title: 'Care Navigator',
  imageURL: null,
  sequence: 1,
  position: ServiceProviderPosition.CareNavigator,
}

const serviceProviderFixture = {
  id,
}

export const patientForIVFFixture = {
  id,
  uuid: '465e9e0d-43c6-4074-a2d8-1465b7a5699b',
  authUserId: 'ivf-user',
  serviceProviderId: serviceProviderFixture.id,
}

export const patientToCancelCohortFixture = {
  id: id + 1,
  uuid: '465e9e0d-43c6-4074-b2d8-1465b7a5699b',
  authUserId: 'ivf-user-2',
  serviceProviderId: serviceProviderFixture.id,
}

export const patientToNotCancelCohortFixture = {
  id: id + 2,
  uuid: '465e9e0d-43c6-4074-a3d8-1465b7a5699b',
  authUserId: 'ivf-user-3',
  serviceProviderId: serviceProviderFixture.id,
}

export const appointmentFixture = {
  id,
  patientId: patientForIVFFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  serviceTypeId: serviceTypeWithoutIVFRelationFixture.id,
  serviceProviderId: serviceProviderFixture.id,
}

export const appointmentToSetCohortDateFixture = {
  id: id + 1,
  patientId: patientForIVFFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  serviceTypeId: serviceTypeForIVFFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}

export const appointmentToUpdateCohortDateFixture = {
  id: id + 2,
  patientId: patientForIVFFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 4),
  serviceTypeId: serviceTypeForIVFFixture.id,
  serviceProviderId: serviceProviderFixture.id,
}

export const appointmentToCancelCohortDateFixture: Partial<Appointment> = {
  id: id + 3,
  patientId: patientToCancelCohortFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 4),
  serviceTypeId: serviceTypeForIVFFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  status: AppointmentStatus.Cancelled,
}

export const appointmentToNotCancelCohortDateFixture: Partial<Appointment> = {
  id: id + 4,
  patientId: patientToNotCancelCohortFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 4),
  serviceTypeId: serviceTypeForIVFFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  status: AppointmentStatus.Cancelled,
}

export const appointmentToSetCohortDateFertilizationFixture = {
  id: id + 5,
  patientId: patientForIVFFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  serviceTypeId: serviceTypeForIVFFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}

export const appointmentToSetCohortDateDay5 = {
  id: id + 6,
  patientId: patientForIVFFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  serviceTypeId: serviceTypeForIVFWithDay5Fixture.id,
  serviceProviderId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}
export const appointmentToSetCohortDateWithPlanInstructionFixture = {
  id: id + 7,
  patientId: patientForIVFFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  serviceTypeId: serviceTypeForIVFWithPlanInstructionFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
}

export const planCategoryFixture = {
  id,
}

export const planLabInstruction = {
  id: id,
  uuid: 'c2ea516e-bc27-4113-b2ce-4220b16cbf70',
  text: 'Testing instruction connection',
  type: PlanLabInstructionType.EggFreeze,
}

export const planTypeFixture: Partial<PlanType> = {
  id: id + 1,
  title: 'planTypeFixture',
  planCategoryId: planCategoryFixture.id,
  serviceTypeIdToSetCohortStartDate: serviceTypeForIVFFixture.id,
  ivfLabCohortStartDay: 0,
  patientPlanStatusId: patientPlanStatusFixture.id,
}

export const planTypeFixtureWithDay5: Partial<PlanType> = {
  id: id + 2,
  title: 'planTypeFixture With day 5',
  planCategoryId: planCategoryFixture.id,
  serviceTypeIdToSetCohortStartDate: serviceTypeForIVFWithDay5Fixture.id,
  ivfLabCohortStartDay: 5,
  patientPlanStatusId: patientPlanStatusFixture.id,
}

export const planTypeWithPlanInstructionFixture: Partial<PlanType> = {
  id: id + 3,
  title: 'planTypeFixture With Plan Instruction',
  planCategoryId: planCategoryFixture.id,
  serviceTypeIdToSetCohortStartDate: serviceTypeForIVFWithPlanInstructionFixture.id,
  ivfLabCohortStartDay: 0,
  patientPlanStatusId: patientPlanStatusFixture.id,
}
export const ivfDishFixture: Partial<IvfDish> = {
  id: dishId,
  dishLabel: 'DishLabel',
  dishOwner: DishOwner.Patient,
}

export const ivfDishToPlanTypeFixture: Partial<IvfDishToPlanType> = {
  id: dishToPlanTypeId,
  planTypeId: planTypeFixture.id,
  ivfDishId: ivfDishFixture.id,
  day: 0,
  required: true,
}
export const patientPlanForIVFFixture: Partial<PatientPlan> = {
  id,
  patientId: patientForIVFFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Ordered,
  addons: [
    {
      planAddonId: addonId,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForICSIFixture = {
  id: id + 6,
  patientId: patientForIVFFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
  addons: [
    {
      planAddonId: icsiAddonId,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForDay5StartFixture = {
  id: id + 7,
  patientId: patientForIVFFixture.id,
  planTypeId: planTypeFixtureWithDay5.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanDetailForDay5StartFixture: Partial<PatientPlanDetail> = {
  id: id + 7,
  patientPlanId: patientPlanForDay5StartFixture.id,
  freshEmbryoTransferNumber: 1,
}

export const patientPlanWithPlanInstructionStartFixture = {
  id: id + 8,
  patientId: patientForIVFFixture.id,
  planTypeId: planTypeWithPlanInstructionFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanDetailWithPlanInstructionStartFixture: Partial<PatientPlanDetail> = {
  id: id + 8,
  patientPlanId: patientPlanWithPlanInstructionStartFixture.id,
  freshEmbryoTransferNumber: 1,
}

export const patientPlanLabInstructionFixture = {
  id: id,
  patientPlanId: patientPlanWithPlanInstructionStartFixture.id,
  planLabInstructionId: planLabInstruction.id,
  type: PlanLabInstructionType.EggFreeze,
}

export const patientPlanToCancelCohortFixture = {
  id: id + 1,
  patientId: patientToCancelCohortFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanToNotCancelCohortFixture = {
  id: id + 2,
  patientId: patientToNotCancelCohortFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientPlanDetailForIVFFixture: Partial<PatientPlanDetail> = {
  id,
  patientPlanId: patientPlanForIVFFixture.id,
  freshEmbryoTransferNumber: 1,
}

export const patientPlanDetailForIVFICSIFixture: Partial<PatientPlanDetail> = {
  id: id + 5,
  patientPlanId: patientPlanForICSIFixture.id,
  freshEmbryoTransferNumber: 1,
}
export const ivfDishToPlanAddonFixture: Partial<IvfDishToPlanAddon> = {
  id: dishToPlanAddonId,
  planAddonId: addonId,
  ivfDishId: ivfDishFixture.id,
  day: 0,
  required: true,
}
export const fertilisationDirectiveAddonCAIonophore: Partial<PlanAddon> = {
  id: addonId,
  uuid: '88bc27c2-5ceb-4e77-81a1-8d93d97c281f',
  addonType: PlanAddonType.FertilizationDirective,
  description: 'fertilisationDirectiveAddonCAIonophore',
  title: 'fertilisationDirectiveAddonCAIonophore',
  code: PlanAddonCode.ICSIAndCaIonophore,
  price: 0,
  sequence: 1,
}

export const fertilisationDirectiveAddonICSI: Partial<PlanAddon> = {
  id: icsiAddonId,
  uuid: '88bc27c2-5ceb-4e77-81a1-8d93d97c281e',
  addonType: PlanAddonType.FertilizationDirective,
  description: 'fertilisationDirectiveAddonICSI',
  title: 'fertilisationDirectiveAddonICSI',
  code: PlanAddonCode.ICSI,
  price: 0,
  sequence: 1,
}

export const ivfTaskToDayFixture: Partial<IvfTaskToDay> = {
  id,
  skipAllowed: false,
  task: IVFTaskType.LabelDishes,
  day: 1,
}

export const ivfTaskToDayCaIonophoreFixture: Partial<IvfTaskToDay> = {
  id: id + 1,
  skipAllowed: false,
  task: IVFTaskType.CaIonophore,
  day: 1,
}

export const ivfTaskToDayISCIFixture: Partial<IvfTaskToDay> = {
  id: id + 2,
  skipAllowed: false,
  task: IVFTaskType.IcsiInjection,
  day: 1,
}

export const ivfTaskToDayPISCIFixture: Partial<IvfTaskToDay> = {
  id: id + 4,
  skipAllowed: false,
  task: IVFTaskType.PICSI,
  day: 1,
}

export const ivfTaskToDayIcsiInjectionFixture: Partial<IvfTaskToDay> = {
  id: id + 3,
  skipAllowed: false,
  task: IVFTaskType.IcsiInjection,
  day: 0,
}

export const ivfTaskToDayDishInventoryFixture: Partial<IvfTaskToDay> = {
  id: id + 6,
  skipAllowed: false,
  task: IVFTaskType.DishInventory,
  day: 0,
}

export const ivfTaskToDayPartnerDishInventoryFixture: Partial<IvfTaskToDay> = {
  id: id + 7,
  skipAllowed: false,
  task: IVFTaskType.PartnerDishInventory,
  day: 0,
}
export const ivfTaskToDayInjectionAssignment: Partial<IvfTaskToDay> = {
  id: id + 62,
  skipAllowed: false,
  task: IVFTaskType.InjectionAssessment,
  day: 0,
}

export const ivfTaskToPlanTypeFixture: Partial<IvfTaskToDayToPlanType> = {
  id,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  planTypeId: planTypeFixture.id,
}

export const ivfTaskToPlanTypeCaIonophoreFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 1,
  IVFTaskToDayId: ivfTaskToDayCaIonophoreFixture.id,
  planTypeId: planTypeFixture.id,
}

export const ivfTaskToPlanTypeISCIFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 2,
  IVFTaskToDayId: ivfTaskToDayISCIFixture.id,
  planTypeId: planTypeFixture.id,
}

export const ivfTaskToPlanTypePISCIFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 4,
  IVFTaskToDayId: ivfTaskToDayPISCIFixture.id,
  planTypeId: planTypeFixture.id,
}

export const ivfTaskToPlanTypeIcsiInjectionFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 3,
  IVFTaskToDayId: ivfTaskToDayIcsiInjectionFixture.id,
  planTypeId: planTypeFixture.id,
}

export const ivfTaskToPlanTypeWithPlanInstructionFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 5,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  planTypeId: planTypeWithPlanInstructionFixture.id,
}

export const ivfTaskToPlanTypeInjectionAssignmentPlanInstructionFixture: Partial<IvfTaskToDayToPlanType> =
  {
    id: id + 72,
    IVFTaskToDayId: ivfTaskToDayInjectionAssignment.id,
    planTypeId: planTypeWithPlanInstructionFixture.id,
  }

export const ivfTaskToPlanTypeDishInventoryFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 7,
  IVFTaskToDayId: ivfTaskToDayDishInventoryFixture.id,
  planTypeId: planTypeFixture.id,
}

export const ivfTaskToPlanTypePartnerDishInventoryFixture: Partial<IvfTaskToDayToPlanType> = {
  id: id + 8,
  IVFTaskToDayId: ivfTaskToDayPartnerDishInventoryFixture.id,
  planTypeId: planTypeFixture.id,
}

export const patientPlanCohortToCancelFixture: Partial<PatientPlanCohort> = {
  id,
  patientPlanId: patientPlanToCancelCohortFixture.id,
  appointmentId: appointmentToCancelCohortDateFixture.id,
  cohortDate: '2023-02-02',
}

export const patientPlanCohortToNotCancelFixture: Partial<PatientPlanCohort> = {
  id: id + 1,
  patientPlanId: patientPlanToNotCancelCohortFixture.id,
  appointmentId: appointmentToNotCancelCohortDateFixture.id,
  cohortDate: '2023-02-02',
}

export const ivfTaskDetailsToNotCancelFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id,
  patientPlanCohortId: patientPlanCohortToNotCancelFixture.id,
  updatedAt: dateTimeUtil.now(),
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 1),
}

export const ivfTaskDetailsToCancelFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: id + 1,
  patientPlanCohortId: patientPlanCohortToCancelFixture.id,
}

export const ivfTaskGroupFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id,
  patientPlanCohortId: patientPlanCohortToCancelFixture.id,
  day: 1,
  uuid: '465e9e0d-43c6-4074-a2d8-1465b7a5699b',
}

export const ivfTaskSummaryFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id,
  patientPlanCohortId: patientPlanCohortToCancelFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupFixture.id,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  signedOffById: staffFixture.id,
}

//Fixtures for no-show-cohort handler
export const noShowId = 123
const upcomingCohortId = 1234
const nonViableUpcomingCohortId = 1235
const nonViableCancelledCohortId = 1236
export const patientForNoShowFixture: Partial<Patient> = {
  id: noShowId,
  uuid: '0da385bb-76a3-4fa6-88e0-96c91ca465cb',
  authUserId: 'ivf-user-no-show',
  serviceProviderId: serviceProviderFixture.id,
}
export const appointmentNoShowFixture: Partial<Appointment> = {
  id: noShowId,
  patientId: patientForNoShowFixture.id,
  start: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  serviceTypeId: serviceTypeForIVFFixture.id,
  serviceProviderId: serviceProviderFixture.id,
  status: AppointmentStatus.NoShow,
}
export const patientPlanNoShowFixture: Partial<PatientPlan> = {
  id: noShowId,
  patientId: patientForNoShowFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Upcoming,
}
export const patientPlanNoShowActiveFixture: Partial<PatientPlan> = {
  id: noShowId + 1,
  patientId: patientForNoShowFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}
export const patientPlanNoShowCancelledFixture: Partial<PatientPlan> = {
  id: noShowId + 2,
  patientId: patientForNoShowFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Cancelled,
}
export const patientPlanNoShowUpcomingFixture: Partial<PatientPlan> = {
  id: noShowId + 3,
  patientId: patientForNoShowFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Upcoming,
}
export const patientPlanCohortNoShowFixture: Partial<PatientPlanCohort> = {
  id: noShowId,
  patientPlanId: patientPlanNoShowActiveFixture.id,
  appointmentId: appointmentNoShowFixture.id,
  cohortDate: '2023-02-02',
}
export const patientPlanCohortForCheckUpcomingViableFixture: Partial<PatientPlanCohort> = {
  id: upcomingCohortId,
  patientPlanId: patientPlanNoShowFixture.id,
  appointmentId: appointmentNoShowFixture.id,
  cohortDate: '2023-02-02',
}
export const patientPlanCohortForCheckUpcomingNonViableFixture: Partial<PatientPlanCohort> = {
  id: nonViableUpcomingCohortId,
  patientPlanId: patientPlanNoShowUpcomingFixture.id,
  appointmentId: appointmentNoShowFixture.id,
  cohortDate: '2028-02-02',
}
export const patientPlanCohortForCheckCancelledNonViableFixture: Partial<PatientPlanCohort> = {
  id: nonViableCancelledCohortId,
  patientPlanId: patientPlanNoShowCancelledFixture.id,
  appointmentId: appointmentNoShowFixture.id,
  cohortDate: '2023-02-02',
}
export const ivfTaskDetailsNoShowFixture: Partial<PatientPlanCohortIvfTaskDetails> = {
  id: noShowId,
  patientPlanCohortId: patientPlanCohortNoShowFixture.id,
  day3EmbryosArrested: noShowId,
  spermWashInitialConcentration: noShowId,
}
export const ivfTaskGroupNoShowFixture: Partial<PatientPlanCohortIvfTaskGroup> = {
  id: noShowId,
  patientPlanCohortId: patientPlanCohortNoShowFixture.id,
  day: 1,
  uuid: 'a6f40e2c-e40d-42cb-8f3b-965f8c76ac6c',
}
export const ivfTaskSummaryNoShowFixture: Partial<PatientPlanCohortIvfTaskSummary> = {
  id: noShowId,
  patientPlanCohortId: patientPlanCohortNoShowFixture.id,
  patientPlanCohortIvfTaskGroupId: ivfTaskGroupNoShowFixture.id,
  IVFTaskToDayId: ivfTaskToDayFixture.id,
  signedOffById: staffFixture.id,
}

export async function createIVFLabSeeds(dataSource: DataSource): Promise<void> {
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(dataSource)
  const ivfTaskDayToPlanTypeSeed = new IvfDayTaskToPlanTypeSeed(dataSource)
  const ivfTaskToDaySeed = new IvfTaskToDaySeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const patientPlanCohortDetailsSeed = new IvfTaskDetailsSeed(dataSource)
  const staffSeed = new StaffSeed(dataSource)
  const ivfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(dataSource)
  const ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
  const patientPlanDetailSeed = new PatientPlanDetailSeed(dataSource)
  const planAddonSeed = new PlanAddonSeed(dataSource)
  const patientPlanLabInstructionSeed = new PatientPlanLabInstructionSeed(dataSource)
  const planLabInstructionSeed = new PlanLabInstructionSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const ivfDishToPlanTypeSeed = new IvfDishToPlanTypeSeed(dataSource)
  const ivfDishToPlanAddonSeed = new IvfDishToPlanAddonSeed(dataSource)
  const ivfDish = new IvfDishSeed(dataSource)

  await planAddonSeed.create(fertilisationDirectiveAddonCAIonophore)
  await planAddonSeed.create(fertilisationDirectiveAddonICSI)
  await patientPlanStatusSeed.create(patientPlanStatusFixture)
  await staffSeed.create(staffFixture)
  await ivfTaskToDaySeed.createArray([
    ivfTaskToDayFixture,
    ivfTaskToDayCaIonophoreFixture,
    ivfTaskToDayISCIFixture,
    ivfTaskToDayPISCIFixture,
    ivfTaskToDayIcsiInjectionFixture,
    ivfTaskToDayDishInventoryFixture,
    ivfTaskToDayPartnerDishInventoryFixture,
    ivfTaskToDayInjectionAssignment,
  ])
  await Promise.all([
    planCategorySeed.create(planCategoryFixture),
    serviceProviderGroupSeed.create(serviceProviderGroupFixture),
  ])
  await serviceProviderSeed.createArray([serviceProviderFixture])

  await superTypeSeed.createFixtures()
  await serviceTypeSeed.createArray([
    serviceTypeForIVFFixture,
    serviceTypeWithoutIVFRelationFixture,
    serviceTypeForIVFWithPlanInstructionFixture,
    serviceTypeForIVFWithDay5Fixture,
  ])
  await patientSeed.createArray([
    patientForIVFFixture,
    patientToCancelCohortFixture,
    patientToNotCancelCohortFixture,
    patientForNoShowFixture,
  ])
  await planTypeSeed.createArray([
    planTypeFixture,
    planTypeFixtureWithDay5,
    planTypeWithPlanInstructionFixture,
  ])
  await appointmentSeed.createArray([
    appointmentToSetCohortDateFixture,
    appointmentToSetCohortDateFertilizationFixture,
    appointmentToUpdateCohortDateFixture,
    appointmentFixture,
    appointmentToCancelCohortDateFixture,
    appointmentToNotCancelCohortDateFixture,
    appointmentNoShowFixture,
    appointmentToSetCohortDateWithPlanInstructionFixture,
    appointmentToSetCohortDateDay5,
  ])
  await Promise.all([
    patientPlanSeed.createArray([
      patientPlanForIVFFixture,
      patientPlanForICSIFixture,
      patientPlanToCancelCohortFixture,
      patientPlanToNotCancelCohortFixture,
      patientPlanNoShowFixture,
      patientPlanWithPlanInstructionStartFixture,
      patientPlanForDay5StartFixture,
      patientPlanNoShowActiveFixture,
      patientPlanNoShowCancelledFixture,
      patientPlanNoShowUpcomingFixture,
    ]),
    ivfTaskDayToPlanTypeSeed.createArray([
      ivfTaskToPlanTypeFixture,
      ivfTaskToPlanTypeCaIonophoreFixture,
      ivfTaskToPlanTypeISCIFixture,
      ivfTaskToPlanTypePISCIFixture,
      ivfTaskToPlanTypeIcsiInjectionFixture,
      ivfTaskToPlanTypeWithPlanInstructionFixture,
      ivfTaskToPlanTypeDishInventoryFixture,
      ivfTaskToPlanTypePartnerDishInventoryFixture,
      ivfTaskToPlanTypeInjectionAssignmentPlanInstructionFixture,
    ]),
  ])

  await planLabInstructionSeed.createArray([planLabInstruction])

  await patientPlanLabInstructionSeed.createArray([patientPlanLabInstructionFixture])

  await patientPlanCohortSeed.createArray([
    patientPlanCohortToCancelFixture,
    patientPlanCohortToNotCancelFixture,
    patientPlanCohortNoShowFixture,
    patientPlanCohortForCheckUpcomingViableFixture,
    patientPlanCohortForCheckUpcomingNonViableFixture,
    patientPlanCohortForCheckCancelledNonViableFixture,
  ])
  await patientPlanCohortDetailsSeed.createArray([
    ivfTaskDetailsToCancelFixture,
    ivfTaskDetailsToNotCancelFixture,
    ivfTaskDetailsNoShowFixture,
  ])
  await Promise.all([
    ivfTaskGroupSeed.create(ivfTaskGroupFixture),
    ivfTaskGroupSeed.create(ivfTaskGroupNoShowFixture),
  ])
  await Promise.all([
    ivfTaskSummarySeed.create(ivfTaskSummaryFixture),
    ivfTaskSummarySeed.create(ivfTaskSummaryNoShowFixture),
  ])
  await patientPlanDetailSeed.create(patientPlanDetailForIVFFixture)
  await patientPlanDetailSeed.create(patientPlanDetailForIVFICSIFixture)
  await patientPlanDetailSeed.create(patientPlanDetailWithPlanInstructionStartFixture)
  await patientPlanDetailSeed.create(patientPlanDetailForDay5StartFixture)
  await ivfDish.create(ivfDishFixture)
  await ivfDishToPlanTypeSeed.create(ivfDishToPlanTypeFixture)
  await ivfDishToPlanAddonSeed.create(ivfDishToPlanAddonFixture)
}

export async function destroyIVFLabFixtures(dataSource: DataSource): Promise<void> {
  const serviceProviderSeed = new ServiceProviderSeed(dataSource)
  const superTypeSeed = new SuperTypeSeed(dataSource)
  const serviceTypeSeed = new ServiceTypeSeed(dataSource)
  const appointmentSeed = new AppointmentSeed(dataSource)
  const patientSeed = new PatientSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)
  const serviceProviderGroupSeed = new ServiceProviderGroupSeed(dataSource)
  const patientPlanCohortSeed = new PatientPlanCohortSeed(dataSource)
  const ivfTaskDayToPlanTypeSeed = new IvfDayTaskToPlanTypeSeed(dataSource)
  const ivfTaskToDaySeed = new IvfTaskToDaySeed(dataSource)
  const patientPlanDetailSeed = new PatientPlanDetailSeed(dataSource)
  const planAddonSeed = new PatientPlanDetailSeed(dataSource)
  const ivfTaskDetailsHistorySeed = new IvfTaskDetailsHistorySeed(dataSource)
  const patientPlanLabInstructionSeed = new PatientPlanLabInstructionSeed(dataSource)
  const planLabInstructionSeed = new PlanLabInstructionSeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const ivfDishToPlanAddonSeed = new IvfDishToPlanAddonSeed(dataSource)
  const ivfDishToPlanTypeSeed = new IvfDishToPlanTypeSeed(dataSource)
  const ivfDishSeed = new IvfDishSeed(dataSource)
  const patientPlanAddonSeed = new PatientPlanAddonSeed(dataSource)

  await patientPlanAddonSeed.deleteByPlanAddonIds([
    fertilisationDirectiveAddonCAIonophore.id,
    fertilisationDirectiveAddonICSI.id,
  ])
  await patientPlanDetailSeed.removeByIds([
    patientPlanDetailForIVFFixture.id,
    patientPlanDetailForIVFICSIFixture.id,
    patientPlanDetailWithPlanInstructionStartFixture.id,
    patientPlanDetailForDay5StartFixture.id,
  ])
  await planAddonSeed.removeByIds([
    fertilisationDirectiveAddonCAIonophore.id,
    fertilisationDirectiveAddonICSI.id,
  ])
  await patientPlanCohortSeed.removeByPlanIds([
    patientPlanForIVFFixture.id,
    patientPlanForICSIFixture.id,
    patientPlanToCancelCohortFixture.id,
    patientPlanToNotCancelCohortFixture.id,
    patientPlanCohortNoShowFixture.id,
    patientPlanCohortForCheckUpcomingViableFixture.id,
    patientPlanCohortForCheckUpcomingNonViableFixture.id,
    patientPlanCohortForCheckCancelledNonViableFixture.id,
  ])

  await patientPlanLabInstructionSeed.removeByIds([patientPlanLabInstructionFixture.id])

  await appointmentSeed.removeByIds([
    appointmentToSetCohortDateFixture.id,
    appointmentToSetCohortDateFertilizationFixture.id,
    appointmentToUpdateCohortDateFixture.id,
    appointmentFixture.id,
    appointmentToCancelCohortDateFixture.id,
    appointmentToNotCancelCohortDateFixture.id,
    appointmentNoShowFixture.id,
    appointmentToSetCohortDateWithPlanInstructionFixture.id,
    appointmentToSetCohortDateDay5.id,
  ])

  await planLabInstructionSeed.removeByIds([planLabInstruction.id])

  await Promise.all([
    ivfTaskDayToPlanTypeSeed.removeByIds([
      ivfTaskToPlanTypeFixture.id,
      ivfTaskToPlanTypeCaIonophoreFixture.id,
      ivfTaskToPlanTypeISCIFixture.id,
      ivfTaskToPlanTypePISCIFixture.id,
      ivfTaskToPlanTypeIcsiInjectionFixture.id,
      ivfTaskToPlanTypeInjectionAssignmentPlanInstructionFixture.id,
    ]),
    patientPlanSeed.removeByIds([
      patientPlanForIVFFixture.id,
      patientPlanForICSIFixture.id,
      patientPlanToCancelCohortFixture.id,
      patientPlanToNotCancelCohortFixture.id,
      patientPlanNoShowFixture.id,
      patientPlanWithPlanInstructionStartFixture.id,
      patientPlanForDay5StartFixture.id,
      patientPlanNoShowActiveFixture.id,
      patientPlanNoShowCancelledFixture.id,
      patientPlanNoShowUpcomingFixture.id,
    ]),
  ])
  await Promise.all([
    patientSeed.removeByIds([
      patientForIVFFixture.id,
      patientToCancelCohortFixture.id,
      patientToNotCancelCohortFixture.id,
      patientForNoShowFixture.id,
    ]),
    serviceTypeSeed.removeByIds([
      serviceTypeForIVFFixture.id,
      serviceTypeForIVFWithPlanInstructionFixture.id,
      serviceTypeForIVFWithDay5Fixture.id,
    ]),
  ])
  await superTypeSeed.destroyFixtures()
  await planTypeSeed.removeByIds([
    planTypeFixture.id,
    planTypeWithPlanInstructionFixture.id,
    planTypeFixtureWithDay5.id,
  ])
  await serviceProviderSeed.removeByIds([serviceProviderFixture.id])
  await planCategorySeed.removeById(planCategoryFixture.id)
  await serviceProviderGroupSeed.removeByIds([serviceProviderGroupFixture.id])
  await ivfTaskToDaySeed.removeByIds([
    ivfTaskToDayFixture.id,
    ivfTaskToDayCaIonophoreFixture.id,
    ivfTaskToDayISCIFixture.id,
    ivfTaskToDayPISCIFixture.id,
  ])
  await ivfTaskDetailsHistorySeed.removeByIds([patientPlanCohortNoShowFixture.id])
  await patientPlanStatusSeed.removeById(patientPlanStatusFixture.id)
  await ivfDishToPlanAddonSeed.removeByIds([ivfDishToPlanAddonFixture.id])
  await ivfDishToPlanTypeSeed.removeByIds([ivfDishToPlanTypeFixture.id])
  await ivfDishSeed.removeByIds([ivfDishFixture.id])
}
