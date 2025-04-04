import {PatientPlanCohortIvfTaskExpandedEmbryo} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  patientPlanCohortFixture,
  patientPlanCohortForBiopsyInTransitFixture,
  patientPlanCohortForCompletedIVFStateEggFreezingFixture,
  patientPlanCohortForCompletionForStatsFixture,
  patientPlanCohortForDeleteStrawFutureFixture,
  patientPlanCohortForFrozenEmbryoPlanComponentFixture,
  patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {EmbryoState} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  cryoSampleContainerFixture,
  cryoSampleContainerForBiopsyInTransitFixture,
  cryoSampleContainerForCalculateSecondFixture,
  cryoSampleContainerForEmbryosToTransferFixture,
  cryoSampleContainerForExpandedEmbryoDeletionFixture,
  cryoSampleContainerForExpandedEmbryoDeletionFutureFixture,
  cryoSampleContainerForIVFPlanCompletion1Fixture,
  cryoSampleContainerForIVFPlanCompletion2Fixture,
  cryoSampleContainerForIVFPlanCompletion3Fixture,
  cryoSampleContainerForPlanComponentUpdate,
  cryoSampleContainerForPlanComponentUpdateSecondFixture,
  cryoSampleContainerGetInventoryListFixture,
  cryoSampleContainerGetInventoryListThawedFixture,
  cryoSampleContainerTransferredFixture,
} from './cryo/cryo-sample-container.fixture'
import {
  ivfEmbryoGrade3BAFixture,
  ivfEmbryoGrade3BBFixture,
} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'

export const patientPlanCohortIVFExpandedEmbryoWithoutBiopsyFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 2,
    uuid: '23a1563a-f401-4f29-a1dd-b76f1427502a',
    patientPlanCohortId: patientPlanCohortForFrozenEmbryoPlanComponentFixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    day: 5,
    state: EmbryoState.FreshET,
    assistedHatching: false,
    biopsyRequired: false,
    embryoNumber: 1,
  }

export const patientPlanCohortIVFExpandedEmbryoWithBiopsyFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 3,
    uuid: '33a1563a-f401-4f29-a1dd-b76f1427502a',
    patientPlanCohortId: patientPlanCohortForFrozenEmbryoPlanComponentFixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    day: 5,
    state: EmbryoState.FreshET,
    assistedHatching: false,
    biopsyRequired: true,
    embryoNumber: 1,
  }
export const patientPlanCohortIVFExpandedEmbryoFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 8,
    uuid: '2f03fda9-75d8-4e7b-9520-63e8d6308791',
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateEggFreezingFixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    day: 5,
    state: EmbryoState.FreshET,
    assistedHatching: false,
    biopsyRequired: false,
    embryoNumber: 1,
  }
export const patientPlanCohortIVFExpandedEmbryoWithoutBiopsyOrderFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 4,
    uuid: '43a1563a-f401-4f29-a1dd-b76f1427502a',
    patientPlanCohortId: patientPlanCohortForFrozenEmbryoPlanComponentFixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    day: 5,
    state: EmbryoState.FreshET,
    assistedHatching: false,
    biopsyRequired: true,
    embryoNumber: 1,
  }

export const patientPlanCohortIVFExpandedEmbryoWithoutBiopsyV3Fixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 5,
    uuid: '23a1563a-f401-4f29-a1aa-b76f1427502a',
    patientPlanCohortId: patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    day: 5,
    cryoSampleContainerId: cryoSampleContainerForPlanComponentUpdate.id,
    state: EmbryoState.FreshET,
    assistedHatching: false,
    biopsyRequired: false,
    embryoNumber: 1,
  }

export const patientPlanCohortIVFExpandedEmbryoWithBiopsyV3Fixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 6,
    uuid: '33a1563a-f401-4f29-a1aa-b76f1427502a',
    patientPlanCohortId: patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    day: 5,
    cryoSampleContainerId: cryoSampleContainerForPlanComponentUpdateSecondFixture.id,
    state: EmbryoState.FreshET,
    assistedHatching: false,
    biopsyRequired: true,
    embryoNumber: 1,
  }

export const patientPlanCohortIVFExpandedEmbryoWithoutBiopsyOrderV3Fixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 7,
    uuid: '43a1563a-f401-4f29-a1aa-b76f1427502a',
    patientPlanCohortId: patientPlanCohortForFrozenEmbryoPlanComponentV3Fixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    day: 5,
    state: EmbryoState.FreshET,
    assistedHatching: false,
    biopsyRequired: true,
    embryoNumber: 1,
  }

export const patientPlanExpandedEmbryoCryoFrozen: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 37,
    uuid: '1cfc920b-4fa1-4d76-85c1-9d9d7b3ee7a5',
    patientPlanCohortId: patientPlanCohortFixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    cryoSampleContainerId: cryoSampleContainerGetInventoryListFixture.id,
    day: 5,
    assistedHatching: null,
    biopsyRequired: true,
    state: EmbryoState.Frozen,
    biopsyAttachments: null,
    embryoNumber: 1,
  }

export const patientPlanExpandedEmbryoCryoStatuseFrozen: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 40,
    uuid: '1cfc920b-4fa1-4d76-85c1-9d9d7b7ef896',
    patientPlanCohortId: patientPlanCohortFixture.id,
    gradeId: ivfEmbryoGrade3BBFixture.id,
    cryoSampleContainerId: cryoSampleContainerFixture.id,
    assistedHatching: null,
    biopsyRequired: false,
    state: EmbryoState.Frozen,
    biopsyAttachments: null,
    embryoNumber: 1,
  }

export const patientPlanExpandedEmbryoCryoThawed: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 38,
    uuid: '1cfc920b-4fa1-4d76-85c1-9d9d7b388de7',
    patientPlanCohortId: patientPlanCohortFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerGetInventoryListThawedFixture.id,
    day: 5,
    assistedHatching: null,
    biopsyRequired: true,
    state: EmbryoState.Frozen,
    biopsyAttachments: null,
    embryoNumber: 2,
  }
export const patientPlanExpandedEmbryoNoHaveGradeId: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 39,
    uuid: '1cfc920b-4fa1-4d76-85c1-9d9d7b3847ed',
    patientPlanCohortId: patientPlanCohortFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerForCalculateSecondFixture.id,
    day: 5,
    assistedHatching: null,
    biopsyRequired: true,
    state: EmbryoState.Frozen,
    biopsyAttachments: null,
    embryoNumber: 3,
  }

export const patientPlanSelectedEmbryo: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> = {
  id: 41,
  uuid: '1cfc920b-4fa1-4d76-85c1-9d9d7b388595',
  patientPlanCohortId: patientPlanCohortFixture.id,
  gradeId: ivfEmbryoGrade3BAFixture.id,
  cryoSampleContainerId: cryoSampleContainerTransferredFixture.id,
  day: 5,
  assistedHatching: null,
  biopsyRequired: true,
  state: EmbryoState.Frozen,
  biopsyAttachments: null,
  embryoNumber: 4,
}

export const patientPlanEmbryoToTransferFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> = {
  id: 42,
  uuid: '1cfc920b-afa1-5d76-23c1-9d9d7b388595',
  patientPlanCohortId: null,
  gradeId: ivfEmbryoGrade3BAFixture.id,
  cryoSampleContainerId: cryoSampleContainerForEmbryosToTransferFixture.id,
  state: EmbryoState.Frozen,
  embryoNumber: 1,
}

export const patientPlanEmbryoIVFPlanCompletion1Fixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 43,
    uuid: '1cfc920b-afa1-5d76-23c1-9d9d7b388596',
    patientPlanCohortId: patientPlanCohortForCompletionForStatsFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerForIVFPlanCompletion1Fixture.id,
    state: EmbryoState.Frozen,
    embryoNumber: 1,
  }

export const patientPlanEmbryoIVFPlanCompletion2Fixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 44,
    uuid: '1cfc920b-afa1-5d76-23c1-9d9d7b388597',
    patientPlanCohortId: patientPlanCohortForCompletionForStatsFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerForIVFPlanCompletion2Fixture.id,
    state: EmbryoState.Frozen,
    embryoNumber: 1,
  }

export const patientPlanEmbryoIVFPlanCompletion3Fixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 45,
    uuid: '1cfc920b-afa1-5d76-23c1-9d9d7b388598',
    patientPlanCohortId: patientPlanCohortForCompletionForStatsFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerForIVFPlanCompletion3Fixture.id,
    state: EmbryoState.Frozen,
    embryoNumber: 1,
  }

export const patientPlanEmbryoForDeletionFutureFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 46,
    uuid: '887930f2-777d-44ac-bae8-e6a771dd9010',
    patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerForExpandedEmbryoDeletionFixture.id,
    state: EmbryoState.Frozen,
    embryoNumber: 1,
    day: 0,
  }

export const patientPlanEmbryoForEmbyroDeletionFutureFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 47,
    uuid: '46628d32-89d4-4f78-a73a-de4a2e42eae2',
    patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerForExpandedEmbryoDeletionFutureFixture.id,
    state: EmbryoState.Frozen,
    embryoNumber: 2,
    day: 0,
  }

export const patientPlanEmbryoForBiopsyInTransitFixture: Partial<PatientPlanCohortIvfTaskExpandedEmbryo> =
  {
    id: 48,
    uuid: '56628d32-89d4-4f78-a73a-de4a2e42eae3',
    patientPlanCohortId: patientPlanCohortForBiopsyInTransitFixture.id,
    gradeId: ivfEmbryoGrade3BAFixture.id,
    cryoSampleContainerId: cryoSampleContainerForBiopsyInTransitFixture.id,
    state: EmbryoState.Frozen,
    embryoNumber: 1,
    day: 0,
  }
