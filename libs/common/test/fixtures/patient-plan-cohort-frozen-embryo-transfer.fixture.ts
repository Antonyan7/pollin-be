import {PatientPlanCohortFrozenEmbryoTransfer} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-frozen-embryo-transfer.entity'
import {
  patientPlanSelectedEmbryo,
  patientPlanEmbryoIVFPlanCompletion2Fixture,
} from './ivf-task-expended-embryo.fixture'
import {patientPlanCohortFixture} from './patient-plan-cohort.fixture'
import {ivfDispositionOneForFETFixture} from '@libs/common/test/fixtures/ivf-disposition-reason.fixture'

export const patientPlanCohortFrozenEmbryo: Partial<PatientPlanCohortFrozenEmbryoTransfer> = {
  id: 1,
  uuid: '23a1563a-f401-4f29-a1dd-b76f14278054',
  patientPlanCohortId: patientPlanCohortFixture.id,
  expandedEmbryoId: patientPlanSelectedEmbryo.id,
  ivfDispositionReasonId: ivfDispositionOneForFETFixture.id,
}

export const patientPlanCohortFrozenTwoEmbryo: Partial<PatientPlanCohortFrozenEmbryoTransfer> = {
  id: 2,
  uuid: '2f861368-df27-4a7c-bc45-3671183e53a4',
  patientPlanCohortId: patientPlanCohortFixture.id,
  expandedEmbryoId: patientPlanEmbryoIVFPlanCompletion2Fixture.id,
  ivfDispositionReasonId: ivfDispositionOneForFETFixture.id,
}
