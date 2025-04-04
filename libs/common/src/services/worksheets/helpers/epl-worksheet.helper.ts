import {PatientPlan, PatientPlanSheet, PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {DefaultValue} from '@libs/common/enums'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {HormoneType} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PatientNoteTypeEnum} from '@libs/services-common/enums'
import {
  EPLWorksheetDateResult,
  GetEPLWorksheetResponseDTO,
} from '@libs/common/dto/worksheets/epl-worksheet.dto'
import PlanSheetHelpers, {
  WorksheetPayload,
} from '@libs/common/services/worksheets/helpers/worksheet-common.helper'
import {WorksheetTestTypeResultsDto} from '@libs/common/services/worksheets/queries/worksheet.queries'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const buildEmptyWorksheetResponse = async (
  patientPlan: PatientPlan,
  sheet: PatientPlanSheet,
  size: number,
): Promise<GetEPLWorksheetResponseDTO> => {
  const nodeToAttachmentUrlMap = await PlanSheetHelpers.getNoteToAttachmentUrlMap(
    patientPlan.patientNotes,
  )

  const isEditable = PlanSheetHelpers.isPlanSheetEditable(patientPlan, sheet)

  return {
    config: PlanSheetHelpers.getConfig({isEditable, patientPlan, size, type: PlanSheetType.EPL}),
    generalNotes: patientPlan.patientNotes.map((note) =>
      PlanSheetHelpers.getSheetNoteDto(note, nodeToAttachmentUrlMap.get(note.id)),
    ),
    firstDayOfPeriod: PlanSheetHelpers.buildFirstDayOfCycleDto(sheet),
    dateResults: [],
  }
}

const getEPLWorksheetHormoneResultsDto = (
  hormoneResults: WorksheetTestTypeResultsDto,
): {bhcg: string; p4: string} => ({
  bhcg: hormoneResults?.[HormoneType.HumanChorionicGonadotropin]?.result ?? DefaultValue.Dash,
  p4: hormoneResults?.[HormoneType.Progesterone]?.result ?? DefaultValue.Dash,
})

class EPLWorksheetPayload extends WorksheetPayload {
  size: number
  patientPlan: PatientPlan
  sheet: PatientPlanSheet
  dates: string[]
  generalNotes: PatientNote[]
  datesToTestResults?: Map<string, WorksheetTestTypeResultsDto>
  sheetType: PlanSheetType
  planType: PlanType
}

const buildDateResultsDTO = async ({
  patientPlan,
  nonPrimaryDates,
  manuallyAddedDates,
  dates,
  datesToTestResults,
  sheet,
}: EPLWorksheetPayload): Promise<EPLWorksheetDateResult[]> => {
  const [datesToNotesMap, datesToOrderNotesMap] = await Promise.all([
    PlanSheetHelpers.getDatesToNotesMap(patientPlan, dates, PatientNoteTypeEnum.PlanEPLSheetDay),
    PlanSheetHelpers.getDatesToNotesMap(
      patientPlan,
      dates,
      PatientNoteTypeEnum.PlanOrderEPLSheetDay,
    ),
  ])

  const datesToSignOffMap = PlanSheetHelpers.getDatesToSignOffMap(sheet.signatures, dates)

  return dates.map((date) => {
    const orderNotes = datesToOrderNotesMap.get(date) ?? []
    const notes = datesToNotesMap.get(date) ?? []
    const signOff = datesToSignOffMap.get(date)
    const testTypeResults = datesToTestResults.get(date)

    const hasHistory = notes.length > 0 || orderNotes.length > 0

    const {isRemovable} = PlanSheetHelpers.getDayProperties(date, {
      notes,
      orderNotes,
      signOff,
      testTypeResults,
      nonPrimaryDates,
      manuallyAddedDates,
    })

    return {
      date,
      ...getEPLWorksheetHormoneResultsDto(testTypeResults),
      rowTitle: dateTimeUtil.formatBirthDateWithFullMonth(date),
      isRemovable,
      hasHistory,
      signOff,
      notes,
      orderNotes,
      testResultGroups: PlanSheetHelpers.getWorkSheetTestResultsGroupDto(testTypeResults),
    }
  })
}

const buildEPLSheetResponseDto = async (
  payload: EPLWorksheetPayload,
): Promise<GetEPLWorksheetResponseDTO> => {
  const {patientPlan, dates, sheet, generalNotes, size, planType} = payload

  const nodeToAttachmentUrlMap = await PlanSheetHelpers.getNoteToAttachmentUrlMap(generalNotes)

  const isEditable = PlanSheetHelpers.isPlanSheetEditable(patientPlan, sheet)

  return {
    config: PlanSheetHelpers.getConfig({
      isEditable,
      patientPlan,
      size,
      type: PlanSheetType.EPL,
      planType,
    }),
    firstDayOfPeriod: PlanSheetHelpers.buildFirstDayOfCycleDto(sheet),
    generalNotes: generalNotes.map((note) =>
      PlanSheetHelpers.getSheetNoteDto(note, nodeToAttachmentUrlMap.get(note.id)),
    ),

    dateResults: dates?.length ? await buildDateResultsDTO(payload) : [],
  }
}

const EPLWorksheetHelpers = {
  buildEmptyWorksheetResponse,
  buildEPLSheetResponseDto,
}

export default EPLWorksheetHelpers
