import {
  PlanHistoryComponent,
  PlanTypeComponentEnum,
} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PatientPlanChangeNotificationEntity} from '@libs/data-layer/apps/plan/entities/typeorm'
import {staffWithMockedAssignorIdFixture} from '@libs/common/test/fixtures/staff.fixture'
import {
  planAddonFreshEmbryoFixture,
  planAddonGeneticTestingFixture,
  planAddonGeneticTestingSecondOrderFixture,
} from '@libs/common/test/fixtures/plan-addon.fixture'
import {
  patientPlanForPlanTypesV2OlderFixture,
  patientPlanV3CompletedFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'

export const patientPlanChangeNotificationFixture1: Partial<PatientPlanChangeNotificationEntity> = {
  id: 1,
  uuid: '0cd467ff-e023-4252-b546-6c6fcae4bec6',
  patientPlanId: patientPlanV3CompletedFixture.id,
  component: PlanTypeComponentEnum.GeneticTestingV2,
  dataChange: [
    {
      propertyName: PlanHistoryComponent.GeneticTestingV2,
      fromValue: planAddonGeneticTestingFixture.title,
      toValue: planAddonGeneticTestingSecondOrderFixture.title,
    },
  ],
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientPlanChangeNotificationFixture2: Partial<PatientPlanChangeNotificationEntity> = {
  id: 2,
  uuid: 'c84e2d91-6b2b-4eb0-a031-a07503a84f39',
  patientPlanId: patientPlanV3CompletedFixture.id,
  component: PlanTypeComponentEnum.FreshEmbryoTransfer,
  dataChange: [
    {
      propertyName: PlanHistoryComponent.FreshEmbryoTransfer,
      fromValue: planAddonFreshEmbryoFixture.title,
      toValue: 'New Value',
    },
  ],
  updatedByStaffId: staffWithMockedAssignorIdFixture.id,
}

export const patientPlanChangeNotificationNotActiveFixture: Partial<PatientPlanChangeNotificationEntity> =
  {
    id: 3,
    uuid: '2cd467ff-e024-2352-b546-6c6fcae4bec6',
    patientPlanId: patientPlanForPlanTypesV2OlderFixture.id,
    component: PlanTypeComponentEnum.IVFRetrievalOrderInstructions,
    dataChange: [
      {
        propertyName: PlanHistoryComponent.IVFRetrievalOrder,
        fromValue: '1',
        toValue: '2',
      },
    ],
    updatedByStaffId: staffWithMockedAssignorIdFixture.id,
  }
