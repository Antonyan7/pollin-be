import {
  FirstDayOfPeriodDto,
  OrderNotes,
  PlanSheetConfigDTO,
  PlanSheetNoteDto,
  PlanSheetSignOffDto,
  SheetTestResultGroupDto,
} from './common-worksheet.dto'

export class GetOBWorksheetResponseDTO extends PlanSheetConfigDTO {
  firstDayOfPeriod: FirstDayOfPeriodDto
  generalNotes: PlanSheetNoteDto[]
  dateResults: OBWorksheetDateResult[]
}

export class OBWorksheetUltrasoundData {
  uuid: string
  status: string
  responseObject: OBWorksheetUltrasoundResults
}

export class OBWorksheetUltrasoundResults {
  gestationalAge: string
  yolkSac: string
  gSize: string
  crl: string
  fetalHeartRate: string
}

export class OBWorksheetDateResult extends OBWorksheetUltrasoundResults {
  date: string
  rowTitle: string
  isRemovable: boolean
  e2: string
  p4: string
  tsh: string
  signOff: PlanSheetSignOffDto
  notes: PlanSheetNoteDto[]
  orderNotes: OrderNotes[]
  testResultGroups: SheetTestResultGroupDto[]
}
