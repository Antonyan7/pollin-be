import {TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {
  TestResultFinalStatusActionsEnum,
  WorksheetTestResultTypeEnum,
} from '@libs/services-common/enums'
import {
  FirstDayOfPeriodDto,
  PlanSheetConfigDTO,
  PlanSheetDoctorSignOffDto,
  PlanSheetNoteDto,
  PlanSheetSignOffDto,
  PlanSheetTestTypeResultDTO,
} from './common-worksheet.dto'

export class StimSheetAppointmentDto {
  id: string
  identifier: string
  isEditable: boolean
  abbreviation: string
  details: string
  catheterTypeId?: string
  uncomplicatedProcedure?: boolean
  hasCatheterDropdown: boolean
  hasRoutineProcedureCheckbox: boolean
  hasLinkToEncounters: boolean
  testReport?: StimSheetAppointmentTestReport
}

export class StimSheetAppointmentTestReport {
  testName: string
  comment: string
}

export class UltrasoundUterusDto {
  endometrium: string
  freeFluid: string
  trilaminarEndometrium: string
}

export class StimSheetOvaryDto {
  folliclesMoreThanOneCmSizes: string
  cyst: string
  folliclesCount: string
}

export class StimSheetUltrasoundResultsDto extends UltrasoundUterusDto {
  leftOvary: StimSheetOvaryDto
  rightOvary: StimSheetOvaryDto
}

export class StimSheetUltrasoundData {
  uuid: string
  status: TestResultStatus

  responseObject: StimSheetUltrasoundResultsDto
  /** @deprecated */
  dayTitle?: string
  dayNumber?: string
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

export class StimSheetDateResultDto extends StimSheetUltrasoundResultsDto {
  id: string
  date: string
  dayNumber: string
  isRemovable: boolean
  hasHistory: boolean
  e2: string
  lh: string
  p4: string
  fsh: string
  appointments: StimSheetAppointmentDto[]
  signOff: PlanSheetSignOffDto
  notes: PlanSheetNoteDto[]
  orderNotes?: PlanSheetNoteDto[]
  testResults: PlanSheetTestTypeResultDTO[]
  testResultGroups: SheetTestResultGroupDto[]
}

export class SignOffStimSheetCycleDetailsDto {
  nurse: PlanSheetDoctorSignOffDto
  admin: PlanSheetDoctorSignOffDto
}

export class GetStimSheetResponseDto extends PlanSheetConfigDTO {
  firstDayOfCycle: FirstDayOfPeriodDto
  generalNotes: PlanSheetNoteDto[]
  globalSignOff: SignOffStimSheetCycleDetailsDto
  dateResults: StimSheetDateResultDto[]
}
