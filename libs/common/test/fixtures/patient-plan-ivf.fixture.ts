import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {planTypeFixture} from '@libs/common/test/fixtures/plan-type.fixture'
import {
  patientForDiscardDishFutureFixture,
  patientForIVFTasks1Fixture,
  patientForIVFTasks2Fixture,
  patientForIVFTasks3Fixture,
  patientForIVFTasks4Fixture,
  patientForIVFTasks5Fixture,
  patientForIVFTasks6Fixture,
  patientForIVFTasks7Fixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  cryoCardForCreateStrawCanIdFixture,
  cryoCardForCreateStrawFixture,
  cryoInventoryCardForEggSampleFixture,
} from '@libs/common/test/fixtures/cryo/cryo-inventory-card.fixture'
import {planAddonFixtureIcsiInjectionFixture} from './plan-addon.fixture'
import {PlanAddonType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientPlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-addon.entity'

export const patientPlanForIVFFixture: Partial<PatientPlan> = {
  id: 168,
  uuid: 'c95bd593-5750-4558-bf84-fb16ba409102',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks1Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
  addons: [
    {
      planAddonId: planAddonFixtureIcsiInjectionFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}

export const patientPlanForIVF2Fixture: Partial<PatientPlan> = {
  id: 174,
  uuid: '1608474a-2d68-414b-b991-2e16e3cbffec',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks2Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
  embryoCryoInventoryCardId: cryoCardForCreateStrawCanIdFixture.id,
  addons: [
    {
      planAddonId: planAddonFixtureIcsiInjectionFixture.id,
      type: PlanAddonType.FertilizationDirective,
      lockedPrice: '0',
    },
  ] as PatientPlanAddon[],
}
export const patientPlanForScanBarcodeFixture: Partial<PatientPlan> = {
  id: 176,
  uuid: '97916837-f081-49b0-bbe8-73888a5f9537',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks2Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
  embryoCryoInventoryCardId: cryoCardForCreateStrawFixture.id,
}

export const patientPlanForIVF3Fixture: Partial<PatientPlan> = {
  id: 169,
  uuid: '616f56b6-211e-4eb7-b7b8-c7c26ff87dfb',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks3Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
  embryoCryoInventoryCardId: cryoInventoryCardForEggSampleFixture.id,
}

export const patientPlanForIVF4Fixture: Partial<PatientPlan> = {
  id: 170,
  uuid: '35a4ad6f-4c46-461c-8da4-1c423d21515b',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks4Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForIVF5Fixture: Partial<PatientPlan> = {
  id: 171,
  uuid: '36d1430a-71fd-4ff5-be20-090394bf1f13',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks5Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForIVF6Fixture: Partial<PatientPlan> = {
  id: 172,
  uuid: '4818cb7e-c6aa-4367-a7e5-16e7374c5cbc',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks6Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForIVF7Fixture: Partial<PatientPlan> = {
  id: 173,
  uuid: '9190caf3-984c-4d77-af93-68892f0e9b28',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks7Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForIVF8Fixture: Partial<PatientPlan> = {
  id: 175,
  uuid: '31bdc515-5ded-4c93-b34f-d621ee2e96f9',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks7Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForDishScanFixture: Partial<PatientPlan> = {
  id: 177,
  uuid: 'c95bd593-5750-4558-bf84-fb16ba409103',
  planTypeId: planTypeFixture.id,
  patientId: patientForIVFTasks1Fixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}

export const patientPlanForDiscardDishIVFFixture: Partial<PatientPlan> = {
  id: 178,
  uuid: '90bbe14b-0882-4ca3-833f-a40113c3609a',
  planTypeId: planTypeFixture.id,
  patientId: patientForDiscardDishFutureFixture.id,
  status: PlanStatusEnum.Active,
  ivfLabStatus: IVFLabStatus.Active,
}
