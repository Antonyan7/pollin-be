import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {AuthUserFixture} from '@libs/common/test/fixtures'
import {
  PatientMilestoneSeed,
  PatientSeed,
  PlanCategorySeed,
  PlanTypeSeed,
  PatientPlanSeed,
  PatientPlanStatusSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {
  PatientMilestoneStatus,
  PatientMilestoneType,
} from '@libs/services-common/enums/milestone.enum'
import {
  PatientPlan,
  PatientPlanStatus,
  PlanCategory,
  PlanType,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PatientStatusEnum} from '@libs/services-common/enums'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'

export const patientPlanStatusUpdatedId = 978782

export const patientFixture: Partial<Patient> = {
  id: patientPlanStatusUpdatedId,
  authUserId: AuthUserFixture.emailVerified.uid,
  firstName: 'Firstname',
  lastName: 'Lastname',
  status: PatientStatusEnum.PlanType,
}

export const planCategoryFixture: Partial<PlanCategory> = {
  id: patientPlanStatusUpdatedId,
}

export const patientPlanStatusFixture: Partial<PatientPlanStatus> = {
  id: patientPlanStatusUpdatedId,
  patientStatusAbbreviation: 'IVF',
  patientStatusColor: '#DDF1E4',
}

export const planTypeFixture: Partial<PlanType> = {
  id: patientPlanStatusUpdatedId,
  title: 'planTypeFixture',
  planCategoryId: planCategoryFixture.id,
  patientPlanStatusId: patientPlanStatusFixture.id,
}

export const patientPlanFixture: Partial<PatientPlan> = {
  id: patientPlanStatusUpdatedId,
  patientId: patientFixture.id,
  planTypeId: planTypeFixture.id,
  status: PlanStatusEnum.Active,
}

export const patientMilestoneReportPeriodUpcomingFixture: Partial<PatientMilestone> = {
  id: patientPlanStatusUpdatedId,
  patientPlanId: patientPlanFixture.id,
  patientId: patientFixture.id,
  type: PatientMilestoneType.PlanReportPeriod,
  status: PatientMilestoneStatus.Upcoming,
}
export const patientMilestoneReportPeriodPastFixture: Partial<PatientMilestone> = {
  id: patientPlanStatusUpdatedId + 2,
  patientPlanId: patientPlanFixture.id,
  patientId: patientFixture.id,
  type: PatientMilestoneType.PlanReportPeriod,
  status: PatientMilestoneStatus.Past,
}

export const createPatientPlanStatusUpdatedFixtures = async (
  dataSource: DataSource,
): Promise<void> => {
  const patientSeed = new PatientSeed(dataSource)
  const patientMilestoneSeed = new PatientMilestoneSeed(dataSource)
  const planCategorySeed = new PlanCategorySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)

  await patientSeed.createArray([patientFixture])
  await planCategorySeed.create(planCategoryFixture)
  await patientPlanStatusSeed.create(patientPlanStatusFixture)
  await planTypeSeed.create(planTypeFixture)
  await patientPlanSeed.create(patientPlanFixture)
  await patientMilestoneSeed.createArray([
    patientMilestoneReportPeriodUpcomingFixture,
    patientMilestoneReportPeriodPastFixture,
  ])
}

export const destroyPatientPlanStatusUpdatedFixtures = async (
  dataSource: DataSource,
): Promise<void> => {
  const patientSeed = new PatientSeed(dataSource)
  const patientMilestoneSeed = new PatientMilestoneSeed(dataSource)

  const planCategorySeed = new PlanCategorySeed(dataSource)
  const patientPlanStatusSeed = new PatientPlanStatusSeed(dataSource)
  const planTypeSeed = new PlanTypeSeed(dataSource)
  const patientPlanSeed = new PatientPlanSeed(dataSource)

  await patientMilestoneSeed.removeByIds([
    patientMilestoneReportPeriodUpcomingFixture.id,
    patientMilestoneReportPeriodPastFixture.id,
  ])
  await patientSeed.removePatientByAuthUserId(patientFixture.authUserId)
  await patientPlanSeed.removeByIds([patientPlanFixture.id])
  await planTypeSeed.removeByIds([planTypeFixture.id])
  await patientPlanStatusSeed.removeByIds([patientPlanStatusFixture.id])
  await planCategorySeed.removeByIds([planCategoryFixture.id])
}
