import {
  TestResultFinalStatusActionsEnum,
  WorksheetTestResultTypeEnum,
} from '@libs/services-common/enums'

export class SheetConfigDTO {
  hasChecklist: boolean
  hasActionsList: boolean
  maximumWorksheetDays: number
  isEditable: boolean
}

export class PlanSheetConfigDTO {
  config: SheetConfigDTO
}

export class PlanSheetAttachmentDto {
  id: string
  title: string
  url: string
}

export class PlanSheetNoteDto {
  id: string
  message: string
  creationData: string
  attachment?: PlanSheetAttachmentDto
}

export class PlanSheetDoctorSignOffDto {
  isSigned: boolean
  initials?: string
  details?: string
  notifyingDetails?: string
}

export class PlanSheetSignOffDto {
  doctor: PlanSheetDoctorSignOffDto
  nurse: PlanSheetDoctorSignOffDto
}

export class SheetTestResultGroupResultDto {
  id: string
  title: string
  actionIds: TestResultFinalStatusActionsEnum[]
}

export class SheetTestResultGroupDto {
  typeId: WorksheetTestResultTypeEnum
  testResults: SheetTestResultGroupResultDto[]
}

export class OrderNotes {
  id: string
  message: string
  creationData: string
}

export class FirstDayOfPeriodDto {
  date: string
  lastUpdateDetails?: string
}

export class PlanSheetTestTypeResultDTO {
  id: string
  testResultId: string | null
  title: string
  result: string
}
