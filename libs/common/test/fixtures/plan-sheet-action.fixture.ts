import {PlanSheetAction} from '@libs/data-layer/apps/plan/entities/typeorm/plan-sheet-action.entity'
import {PlanSheetActionCode} from '@libs/data-layer/apps/plan/enums/plan.enum'

export const planSheetActionFixture: Partial<PlanSheetAction> = {
  id: 1,
  uuid: 'b2b69f4f-cc93-46b2-8b15-f51506f994b2',
  title: 'planSheetActionFixture',
  abbreviation: 'psaf',
  code: PlanSheetActionCode.Custom,
}

export const planSheetActionSoftDeletedFixture: Partial<PlanSheetAction> = {
  id: 2,
  uuid: 'b2b69f4f-bb93-46b2-8b15-f51506f994c4',
  title: 'planSheetActionSoftDeletedFixture',
  abbreviation: 'to-soft-delete',
}

export const planSheetActionToCheckSequenceFixture: Partial<PlanSheetAction> = {
  id: 3,
  uuid: 'a2c69f4f-bb93-46b2-8b15-f51506f994c4',
  title: 'planSheetActionToCheckSequenceFixture',
  abbreviation: 'action-sequence',
  backgroundColor: '#FFFFFF',
  textColor: '#FFFFFF',
}

export const planSheetActionToUpdateListFixture: Partial<PlanSheetAction> = {
  id: 4,
  uuid: 'b2b69f4f-cc93-46b2-8b15-f51506f994b5',
  title: 'planSheetActionToUpdateListFixture',
  abbreviation: 'action-update',
}

export const planSheetActionWithoutLinkToListFixture: Partial<PlanSheetAction> = {
  id: 5,
  uuid: 'b2b69f4f-aa92-46b2-8b15-f51506f994b2',
  title: 'planSheetActionWithoutLinkToListFixture',
  abbreviation: 'action-without-link',
}
