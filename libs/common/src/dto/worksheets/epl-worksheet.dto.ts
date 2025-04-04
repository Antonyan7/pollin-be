import {
  FirstDayOfPeriodDto,
  OrderNotes,
  PlanSheetConfigDTO,
  PlanSheetNoteDto,
  PlanSheetSignOffDto,
  SheetTestResultGroupDto,
} from './common-worksheet.dto'

export class GetEPLWorksheetResponseDTO extends PlanSheetConfigDTO {
  generalNotes: PlanSheetNoteDto[]
  firstDayOfPeriod: FirstDayOfPeriodDto
  dateResults: EPLWorksheetDateResult[]
}

export class EPLWorksheetDateResult {
  date: string
  rowTitle: string
  isRemovable: boolean
  bhcg: string
  p4: string
  signOff: PlanSheetSignOffDto
  notes: PlanSheetNoteDto[]
  orderNotes: OrderNotes[]
  testResultGroups: SheetTestResultGroupDto[]
}
