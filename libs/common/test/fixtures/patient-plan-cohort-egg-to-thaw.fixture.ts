import {PatientPlanCohortEggToThaw} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  patientPlanCohortForEggThawFixture,
  patientPlanCohortForEggThawStrawSelectionVisibility2Fixture,
  patientPlanCohortForEggThawStrawSelectionVisibilityFixture,
  patientPlanCohortForStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {
  cryoSampleContainerForEggThawFixture,
  cryoSampleContainerForEggThawStrawSelection2Fixture,
  cryoSampleContainerForEggThawStrawSelectionFixture,
  cryoSampleContainerForOocyteCollectionFixture,
} from '@libs/common/test/fixtures/cryo/cryo-sample-container.fixture'
import {ivfDispositionOneForFETFixture} from '@libs/common/test/fixtures/ivf-disposition-reason.fixture'
import {CohortEggToThawType} from '@libs/data-layer/apps/clinic-ivf/enums'

export const patientPlanCohortForEggToThawFixture: Partial<PatientPlanCohortEggToThaw> = {
  id: 1,
  uuid: 'a4ffef44-f5c5-4a2b-bfb3-8915f64ea338',
  patientPlanCohortId: patientPlanCohortForEggThawFixture.id,
  cryoSampleContainerId: cryoSampleContainerForEggThawFixture.id,
  ivfDispositionReasonId: ivfDispositionOneForFETFixture.id,
}

export const patientPlanCohortForEggToThawStrawSelectionFixture: Partial<PatientPlanCohortEggToThaw> =
  {
    id: 2,
    uuid: '3bbe870f-daa5-4fd2-8984-a47de4d00beb',
    patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibilityFixture.id,
    cryoSampleContainerId: cryoSampleContainerForEggThawStrawSelectionFixture.id,
    ivfDispositionReasonId: ivfDispositionOneForFETFixture.id,
  }
export const patientPlanCohortForEggToThawStrawSelection2Fixture: Partial<PatientPlanCohortEggToThaw> =
  {
    id: 3,
    uuid: 'fb08590e-10d2-4681-9217-b1315dfbf9c7',
    patientPlanCohortId: patientPlanCohortForEggThawStrawSelectionVisibility2Fixture.id,
    cryoSampleContainerId: cryoSampleContainerForEggThawStrawSelection2Fixture.id,
    ivfDispositionReasonId: ivfDispositionOneForFETFixture.id,
  }

export const patientPlanCohortStrawSelectionForOocyteCollectionFixture: Partial<PatientPlanCohortEggToThaw> =
  {
    id: 4,
    uuid: '87382793-e0c5-442f-982b-e16ae2fc301a',
    patientPlanCohortId: patientPlanCohortForStrawSelectionOocyteCollectionFixture.id,
    cryoSampleContainerId: cryoSampleContainerForOocyteCollectionFixture.id,
    ivfDispositionReasonId: ivfDispositionOneForFETFixture.id,
    type: CohortEggToThawType.OocyteCollection,
  }
