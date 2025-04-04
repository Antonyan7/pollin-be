import {
  ivfPatientFemaleFixture,
  patientPlanCohortForCancelFixture,
  patientPlanCohortForCompleteFixture,
  planTypeFixture,
} from '@libs/common/test/fixtures'
import {
  patientPlanV2ForCancelCohortFixture,
  patientPlanV2ForCompleteCohortFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  CancelPlanRequestDTO,
  CompletePlanRequestDTO,
} from '@apps/lis/ivf-patients/dto/ivf-patients.dto'
import {transportFolderForIVFFixture} from '@libs/common/test/fixtures/transport-folder.fixture'

export const getCancelIvfPlanRequest = (reasonId: string): CancelPlanRequestDTO => ({
  patientPlanId: patientPlanV2ForCancelCohortFixture.uuid,
  dashboardFilterDate: patientPlanCohortForCancelFixture.cohortDate,
  reason: reasonId,
  comments: 'Lorem ipsum',
})

export const completionMetadata: CompletePlanRequestDTO = {
  patientPlanId: patientPlanV2ForCompleteCohortFixture.uuid,
  dashboardFilterDate: patientPlanCohortForCompleteFixture.cohortDate,
  comments: 'Lorem ipsum',
  metadata: {
    transportFolderId: transportFolderForIVFFixture.uuid,
  },
}

export const filtersResponse = [
  {
    options: [
      {id: 'Active', title: 'IVF Lab Active', type: 'Status'},
      {id: 'Cancelled', title: 'Cancelled', type: 'Status'},
      {id: 'Completed', title: 'IVF Lab Completed', type: 'Status'},
      {id: 'Upcoming', title: 'Upcoming', type: 'Status'},
      {id: 'AwaitingBiopsyResults', title: 'Awaiting Biopsy Results', type: 'Status'},
    ],
    title: 'Status',
  },
  {
    options: [
      {id: 'b8b69f4f-bb93-46b2-8b15-f51506f994f6', title: 'planTypeFixtureV2', type: 'PlanType'},
    ],
    title: 'Plan Type',
  },
]

export const cancelDashboardDayUpdates = expect.objectContaining({
  id: patientPlanCohortForCancelFixture.uuid,
  patientId: ivfPatientFemaleFixture.uuid,
  identifier: ivfPatientFemaleFixture.patientIdentifier,
  fullName: `${ivfPatientFemaleFixture.firstName} ${ivfPatientFemaleFixture.lastName}`,
  planTypeTitle: planTypeFixture.title,
  patientPlanId: patientPlanV2ForCancelCohortFixture.uuid,
  patientIvfStatus: IVFLabStatus.Cancelled,
  isSpawnedCohort: false,
  ivfTaskGroups: [
    {
      signOffInitials: null,
      id: '08b28d22-dfe3-4965-a06b-b60364569913',
      type: 'NoTask',
      isDayDisabled: false,
      scanState: 'NotApplicable',
    },
  ],
})

export const completeDashboardDayUpdates = expect.objectContaining({
  id: patientPlanCohortForCompleteFixture.uuid,
  patientId: ivfPatientFemaleFixture.uuid,
  identifier: ivfPatientFemaleFixture.patientIdentifier,
  fullName: `${ivfPatientFemaleFixture.firstName} ${ivfPatientFemaleFixture.lastName}`,
  planTypeTitle: planTypeFixture.title,
  patientPlanId: patientPlanV2ForCompleteCohortFixture.uuid,
  patientIvfStatus: IVFLabStatus.Completed,
  isSpawnedCohort: false,
  ivfTaskGroups: [],
})
