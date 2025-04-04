import {
  patientPlanCohortForCompletedIVFStateEggFreezingFixture,
  patientPlanCohortForDeleteStrawFutureFixture,
  patientPlanCohortForMiiDay1CryoFixture,
  patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture,
} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {PatientPlanCohortCryoSampleContainers} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-cryo-sample-containers.entity'
import {CryoType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  cryoSampleContainerFixture,
  cryoSampleContainerForMiiDayFixture,
  cryoSampleContainerForMiiDayForMaxDiscardedValidationFixture,
  cryoSampleContainerForMiiDayForStrawDeleteFixture,
  cryoSampleContainerForMiiDayForStrawDeleteFutureFixture,
  cryoSampleContainerForMiiDayForStrawsAssignsMismatchFixture,
  cryoSampleContainerGetInventoryListThawedFixture,
} from '@libs/common/test/fixtures/cryo/cryo-sample-container.fixture'

export const PatientPlanCohortCryoSampleContainerFixture: Partial<PatientPlanCohortCryoSampleContainers> =
  {
    id: 1,
    uuid: '907251b0-88ee-462c-93b4-9a9916958c58',
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateEggFreezingFixture.id,
    cryoSampleContainerId: cryoSampleContainerGetInventoryListThawedFixture.id,
    type: CryoType.OocyteFreezing,
  }

export const PatientPlanCohortCryoSampleContainerMiDayFixture: Partial<PatientPlanCohortCryoSampleContainers> =
  {
    id: 2,
    uuid: 'ff1bf74d-a603-49ef-bba2-0bdd78e1b02f',
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateEggFreezingFixture.id,
    cryoSampleContainerId: cryoSampleContainerForMiiDayFixture.id,
    type: CryoType.MiiDay1Cryo,
  }

export const PatientPlanCohortCryoSampleContainerMiDayDeleteStrawFixture: Partial<PatientPlanCohortCryoSampleContainers> =
  {
    id: 4,
    uuid: '53f88de1-96b4-4f93-8213-2556e70b9194',
    patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
    cryoSampleContainerId: cryoSampleContainerForMiiDayForStrawDeleteFutureFixture.id,
    type: CryoType.MiiDay1Cryo,
  }

export const PatientPlanCohortCryoSampleContainerMiDayDeleteStrawFutureFixture: Partial<PatientPlanCohortCryoSampleContainers> =
  {
    id: 5,
    uuid: '13055f28-b7a1-4298-8f85-fbc269fda683',
    patientPlanCohortId: patientPlanCohortForDeleteStrawFutureFixture.id,
    cryoSampleContainerId: cryoSampleContainerForMiiDayForStrawDeleteFixture.id,
    type: CryoType.MiiDay1Cryo,
  }

export const PatientPlanCohortCryoSampleContainerMiDayMismatchStrawsAssignesFutureFixture: Partial<PatientPlanCohortCryoSampleContainers> =
  {
    id: 6,
    uuid: 'b8ee6829-c528-4bfd-9044-e2a0062b9588',
    patientPlanCohortId: patientPlanCohortForMiiDay1CryoFixture.id,
    cryoSampleContainerId: cryoSampleContainerForMiiDayForStrawsAssignsMismatchFixture.id,
    type: CryoType.MiiDay1Cryo,
  }

export const PatientPlanCohortCryoSampleContainerMiiDayMaxDeletedFieldValidationFixture: Partial<PatientPlanCohortCryoSampleContainers> =
  {
    id: 7,
    uuid: 'c37d006c-31d0-46e4-95cc-7efa8b7a0ee5',
    patientPlanCohortId: patientPlanCohortForMiiDay1CryoMaxDiscardedValidationFixture.id,
    cryoSampleContainerId: cryoSampleContainerForMiiDayForMaxDiscardedValidationFixture.id,
    type: CryoType.MiiDay1Cryo,
  }

export const PatientPlanCohortCryoSampleContainerMiiDayListFixture: Partial<PatientPlanCohortCryoSampleContainers> =
  {
    id: 8,
    uuid: 'b8be5abb-bb0a-4244-aca6-35648d6667d0',
    patientPlanCohortId: patientPlanCohortForCompletedIVFStateEggFreezingFixture.id,
    cryoSampleContainerId: cryoSampleContainerFixture.id,
    type: CryoType.OocyteFreezing,
    eggNumber: 1,
  }
