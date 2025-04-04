import {VoidResultRequestDTO} from '@apps/lis/lab-sync-test-results/dto/get-lab-sync-test-results.dto'
import {labSyncOBRUnlinkedToBeVoidFixture} from '@libs/common/test/fixtures/lab-sync/lab-sync-observation-request.fixture'

export const voidResultRequestPayload: VoidResultRequestDTO = {
  unlinkedTestResultId: labSyncOBRUnlinkedToBeVoidFixture.uuid,
  reason: 'Void reason',
}
