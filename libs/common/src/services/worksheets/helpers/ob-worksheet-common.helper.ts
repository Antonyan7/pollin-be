import {PatientPlan, PatientPlanSheet, PlanType} from '@libs/data-layer/apps/plan/entities/typeorm'
import {DefaultValue} from '@libs/common/enums'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {TestResult} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {WorksheetTestTypeResultsDto} from '@libs/common/services/worksheets/queries/worksheet.queries'
import {HormoneType} from '@libs/data-layer/apps/clinic-test/enums'
import {PatientNoteTypeEnum, TestResultUnit} from '@libs/services-common/enums'
import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {
  GetOBWorksheetResponseDTO,
  OBWorksheetDateResult,
  OBWorksheetUltrasoundData,
  OBWorksheetUltrasoundResults,
} from '@libs/common/dto/worksheets/ob-worksheet.dto'
import PlanSheetHelpers, {
  WorksheetPayload,
} from '@libs/common/services/worksheets/helpers/worksheet-common.helper'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const buildEmptyWorksheetResponse = async (
  patientPlan: PatientPlan,
  sheet: PatientPlanSheet,
  size: number,
): Promise<GetOBWorksheetResponseDTO> => {
  const nodeToAttachmentUrlMap = await PlanSheetHelpers.getNoteToAttachmentUrlMap(
    patientPlan.patientNotes,
  )

  const isEditable = PlanSheetHelpers.isPlanSheetEditable(patientPlan, sheet)

  return {
    config: PlanSheetHelpers.getConfig({isEditable, patientPlan, size, type: PlanSheetType.OB}),
    generalNotes: patientPlan.patientNotes.map((note) =>
      PlanSheetHelpers.getSheetNoteDto(note, nodeToAttachmentUrlMap.get(note.id)),
    ),
    firstDayOfPeriod: PlanSheetHelpers.buildFirstDayOfCycleDto(sheet),
    dateResults: [],
  }
}

const getDefaultOBUltrasoundDTO = (): OBWorksheetUltrasoundResults => ({
  gestationalAge: DefaultValue.Dash,
  yolkSac: DefaultValue.Dash,
  gSize: DefaultValue.Dash,
  crl: DefaultValue.Dash,
  fetalHeartRate: DefaultValue.Dash,
})

const getWeekDaysString = (weeks: number, days: number): string => {
  const weekPart = weeks ? `${weeks} weeks ` : ''

  return weekPart + `${days} days`
}

const getOBWorksheetUltrasoundDTO = (testResult: TestResult): OBWorksheetUltrasoundResults => {
  if (!testResult?.testResultObUltrasound) {
    return getDefaultOBUltrasoundDTO()
  }

  const obResult = testResult.testResultObUltrasound
  return {
    gestationalAge: getWeekDaysString(obResult.gestationalAgeWeeks, obResult.gestationalAgeDays),
    yolkSac: `${obResult.yolkSec} ${TestResultUnit.CM}`,
    gSize: getWeekDaysString(obResult.crownRumpLengthWeeks, obResult.crownRumpLengthDays),
    crl: `${obResult.crownRumpLengthLength} ${TestResultUnit.CM}`,
    fetalHeartRate: `${obResult.fetalHearthMotion} ${TestResultUnit.BPM}`,
  }
}

const getDatesToUltrasoundResults = (
  testResults: TestResult[],
  dates: string[],
): Map<string, OBWorksheetUltrasoundData> => {
  const datesToUltrasoundResults = new Map<string, OBWorksheetUltrasoundData>(
    dates.map((date) => [date, null]),
  )

  testResults.forEach((testResult) => {
    if (!testResult?.appointment) {
      return
    }

    const date = dateTimeUtil.formatTzDate(testResult.appointment.start)
    datesToUltrasoundResults.set(date, {
      uuid: testResult.uuid,
      status: testResult.status,
      responseObject: getOBWorksheetUltrasoundDTO(testResult),
    })
  })

  return datesToUltrasoundResults
}

const getOBWorksheetHormoneResultsDto = (
  hormoneResults: WorksheetTestTypeResultsDto,
): {e2: string; p4: string; tsh: string} => ({
  e2: hormoneResults?.[HormoneType.Estradiol]?.result ?? DefaultValue.Dash,
  p4: hormoneResults?.[HormoneType.Progesterone]?.result ?? DefaultValue.Dash,
  tsh: hormoneResults?.[HormoneType.ThyroidStimulatingHormone]?.result ?? DefaultValue.Dash,
})

class OBWorksheetPayload extends WorksheetPayload {
  patientPlan: PatientPlan
  size: number
  sheet: PatientPlanSheet
  dates: string[]
  generalNotes: PatientNote[]
  datesToUltrasoundResults?: Map<string, OBWorksheetUltrasoundData>
  datesToTestResults?: Map<string, WorksheetTestTypeResultsDto>
  sheetType: PlanSheetType
  planType: PlanType
}

const buildDateResultsDTO = async ({
  patientPlan,
  dates,
  nonPrimaryDates,
  manuallyAddedDates,
  datesToTestResults,
  datesToUltrasoundResults,
  sheet,
}: OBWorksheetPayload): Promise<OBWorksheetDateResult[]> => {
  const [datesToNotesMap, datesToOrderNotesMap] = await Promise.all([
    PlanSheetHelpers.getDatesToNotesMap(patientPlan, dates, PatientNoteTypeEnum.PlanOBSheetDay),
    PlanSheetHelpers.getDatesToNotesMap(
      patientPlan,
      dates,
      PatientNoteTypeEnum.PlanOrderOBSheetDay,
    ),
  ])
  const datesToSignOffMap = PlanSheetHelpers.getDatesToSignOffMap(sheet.signatures, dates)

  return dates.map((date) => {
    const orderNotes = datesToOrderNotesMap.get(date) ?? []
    const notes = datesToNotesMap.get(date) ?? []
    const signOff = datesToSignOffMap.get(date)

    const ultrasoundData = datesToUltrasoundResults.get(date)
    const testTypeResults = datesToTestResults.get(date)

    const {isRemovable} = PlanSheetHelpers.getDayProperties(date, {
      notes,
      orderNotes,
      signOff,
      ultrasoundResult: ultrasoundData?.responseObject,
      testTypeResults,

      nonPrimaryDates,
      manuallyAddedDates,
    })

    const hasHistory = notes.length > 0 || orderNotes.length > 0
    return {
      date,
      ...(ultrasoundData?.responseObject || getDefaultOBUltrasoundDTO()),
      ...getOBWorksheetHormoneResultsDto(testTypeResults),
      rowTitle: dateTimeUtil.formatBirthDateWithFullMonth(date),
      isRemovable,
      hasHistory,
      signOff,
      notes,
      orderNotes,
      testResultGroups: PlanSheetHelpers.getWorkSheetTestResultsGroupDto(
        testTypeResults,
        ultrasoundData,
      ),
    }
  })
}

const buildOBWorksheetResponseDto = async (
  payload: OBWorksheetPayload,
): Promise<GetOBWorksheetResponseDTO> => {
  const {patientPlan, dates, sheet, generalNotes, size, planType} = payload

  const nodeToAttachmentUrlMap = await PlanSheetHelpers.getNoteToAttachmentUrlMap(generalNotes)

  const isEditable = PlanSheetHelpers.isPlanSheetEditable(patientPlan, sheet)

  return {
    config: PlanSheetHelpers.getConfig({
      isEditable,
      patientPlan,
      size,
      type: PlanSheetType.OB,
      planType,
    }),
    firstDayOfPeriod: PlanSheetHelpers.buildFirstDayOfCycleDto(sheet),
    generalNotes: generalNotes.map((note) =>
      PlanSheetHelpers.getSheetNoteDto(note, nodeToAttachmentUrlMap.get(note.id)),
    ),
    dateResults: dates?.length ? await buildDateResultsDTO(payload) : [],
  }
}

const ObWorksheetHelpers = {
  buildEmptyWorksheetResponse,
  getDatesToUltrasoundResults,
  buildOBWorksheetResponseDto,
  getWeekDaysString,
}

export default ObWorksheetHelpers
