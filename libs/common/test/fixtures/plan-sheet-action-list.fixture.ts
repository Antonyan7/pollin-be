import {PlanSheetActionListToAction} from '@libs/data-layer/apps/plan/entities/typeorm/plan-sheet-action-list-action.entity'
import {PlanSheetActionList} from '@libs/data-layer/apps/plan/entities/typeorm/plan-sheet-action-list.entity'
import {
  planSheetActionFixture,
  planSheetActionToCheckSequenceFixture,
  planSheetActionSoftDeletedFixture,
  planSheetActionToUpdateListFixture,
} from './plan-sheet-action.fixture'
import {DateTimeUtil} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const planSheetActionListFixture: Partial<PlanSheetActionList> = {
  id: 1,
  actionsRelations: [
    {
      planSheetActionId: planSheetActionSoftDeletedFixture.id,
      sequence: 1,
      deletedAt: dateTimeUtil.now(),
    },
    {
      planSheetActionId: planSheetActionToCheckSequenceFixture.id,
      sequence: 3,
    },
    {planSheetActionId: planSheetActionFixture.id, sequence: 2},
    {planSheetActionId: planSheetActionToUpdateListFixture.id, sequence: 4},
  ] as PlanSheetActionListToAction[],
}
