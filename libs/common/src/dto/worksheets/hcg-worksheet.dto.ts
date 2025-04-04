import {
  FirstDayOfPeriodDto,
  OrderNotes,
  PlanSheetConfigDTO,
  PlanSheetNoteDto,
  PlanSheetSignOffDto,
  SheetTestResultGroupDto,
} from './common-worksheet.dto'

export class GetHCGWorksheetResponseDTO extends PlanSheetConfigDTO {
  generalNotes: PlanSheetNoteDto[]
  firstDayOfPeriod: FirstDayOfPeriodDto
  dateResults: HCGWorksheetDateResult[]
}

export class HCGWorksheetDateResult {
  date: string
  rowTitle: string
  isRemovable: boolean
  hcg: string
  e2: string
  p4: string
  tsh: string
  signOff: PlanSheetSignOffDto
  notes: PlanSheetNoteDto[]
  orderNotes: OrderNotes[]
  testResultGroups: SheetTestResultGroupDto[]
}
