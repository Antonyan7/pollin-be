import {OrderNotes, PlanSheetSignOffDto, SheetTestResultGroupDto} from './common-worksheet.dto'

export class ThyroidDateResultDTO {
  date: string
  isRemovable: boolean
  rowTitle: string
  tsh: string | null
  tpo: string | null
  synthroidDosage: OrderNotes[]
  actions: OrderNotes[]
  signOff: PlanSheetSignOffDto
  testResultGroups?: SheetTestResultGroupDto[]
}

export class GetThyroidProtocolWorksheetResponseDTO {
  dateResults: ThyroidDateResultDTO[]
}
