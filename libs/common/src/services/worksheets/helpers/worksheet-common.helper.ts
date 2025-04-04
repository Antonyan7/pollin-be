import {difference} from 'lodash'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {abbreviatedName, getFullName, getInitials} from '@libs/common/helpers/patient.helper'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  PatientPlan,
  PatientPlanSheet,
  PlanType,
  Signature,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanSheetType, PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  PatientNoteTypeEnum,
  PlanTitle,
  WorksheetTestResultTypeEnum,
} from '@libs/services-common/enums'
import {SignatureType} from '@libs/data-layer/apps/plan/enums/signature.enum'
import {
  PlanSheetTestResultActions,
  PlanSheetUltrasoundTypeLabel,
  StimSheetNotifyingMethodLabel,
} from '@libs/services-common/enums/stim-sheet.enum'
import {DefaultValue} from '@libs/common/enums'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {WorksheetTestTypeResultsDto} from '@libs/common/services/worksheets/queries/worksheet.queries'
import {HormoneTypeTitle} from '@libs/data-layer/apps/clinic-test/enums'
import {PlanTypeSheet} from '@libs/data-layer/apps/plan/entities/typeorm/plan-type-sheet.entity'
import {
  FirstDayOfPeriodDto,
  PlanSheetDoctorSignOffDto,
  PlanSheetNoteDto,
  PlanSheetSignOffDto,
  PlanSheetTestTypeResultDTO,
  SheetConfigDTO,
  SheetTestResultGroupDto,
} from '@libs/common/dto/worksheets/common-worksheet.dto'
import {OBWorksheetUltrasoundResults} from '@libs/common/dto/worksheets/ob-worksheet.dto'
import {
  StimSheetAppointmentDto,
  StimSheetUltrasoundResultsDto,
} from '@libs/common/dto/worksheets/stim-sheet-worksheet.dto'
import {TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

export const sheetTypeToNoteType = new Map<PlanSheetType, PatientNoteTypeEnum>([
  [PlanSheetType.Stimulation, PatientNoteTypeEnum.PlanStimSheet],
  [PlanSheetType.EPL, PatientNoteTypeEnum.PlanEPLSheet],
  [PlanSheetType.HCG, PatientNoteTypeEnum.PlanHCGSheet],
  [PlanSheetType.OB, PatientNoteTypeEnum.PlanOBSheet],
  [PlanSheetType.Priming, PatientNoteTypeEnum.PlanPrimingWorksheet],
])

export const sheetTypeToDayNoteType = new Map<PlanSheetType, PatientNoteTypeEnum>([
  [PlanSheetType.Stimulation, PatientNoteTypeEnum.PlanStimSheetDay],
  [PlanSheetType.EPL, PatientNoteTypeEnum.PlanEPLSheetDay],
  [PlanSheetType.HCG, PatientNoteTypeEnum.PlanHCGSheetDay],
  [PlanSheetType.OB, PatientNoteTypeEnum.PlanOBSheetDay],
  [PlanSheetType.Priming, PatientNoteTypeEnum.PlanPrimingWorksheetDay],
])

export const sheetTypeToDayOrderNoteType = new Map<PlanSheetType, PatientNoteTypeEnum>([
  [PlanSheetType.Stimulation, PatientNoteTypeEnum.PlanOrderStimSheetDay],
  [PlanSheetType.HCG, PatientNoteTypeEnum.PlanOrderHCGSheetDay],
  [PlanSheetType.OB, PatientNoteTypeEnum.PlanOrderOBSheetDay],
  [PlanSheetType.Priming, PatientNoteTypeEnum.PlanOrderPrimingWorkSheetDay],
  [PlanSheetType.EPL, PatientNoteTypeEnum.PlanOrderEPLSheetDay],
])

export class WorksheetPayload {
  nonPrimaryDates?: Set<string>
  manuallyAddedDates?: Set<string>
}

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
const fireBaseStorageAdapter = new FirebaseStorageAdapter(
  configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
)

const isPlanSheetEditable = (patientPlan: PatientPlan, sheet: PatientPlanSheet): boolean => {
  return patientPlan.status !== PlanStatusEnum.Completed && !sheet?.endDate
}

const getPlanSheetNoteType = (date: string | boolean, type: PlanSheetType): PatientNoteTypeEnum => {
  return date ? sheetTypeToDayNoteType.get(type) : sheetTypeToNoteType.get(type)
}

const getPlanSheetOrderNoteType = (type: PlanSheetType): PatientNoteTypeEnum => {
  return sheetTypeToDayOrderNoteType.get(type)
}

const getNoteChangedData = (note: PatientNote): string => {
  if (!note) {
    return DefaultValue.Dash
  }

  const lastUpdateDate = note.updatedByStaffAt ?? note.createdAt

  const date = dateTimeUtil.formatBirthDate(dateTimeUtil.UTCToTz(lastUpdateDate))

  return `${Math.abs(note.createdAt.getTime() - lastUpdateDate.getTime()) <= 500 ? PlanTitle.AddedOn : PlanTitle.LastUpdatedOn} ${date} ${PlanTitle.By} ${abbreviatedName(note.updatedByStaff)}`
}

const getPlanSheetSignOffDetails = (
  signature: Signature,
  principal: Staff,
  signatory: Staff,
): string => {
  let details = `${PlanTitle.SignedOff} ${PlanTitle.By} ${getFullName(
    signatory.firstName,
    signatory.lastName,
  )} `

  if (signature.type === SignatureType.Doctor) {
    details += `${PlanTitle.For} ${getFullName(principal.firstName, principal.lastName)} `
  }

  details += `${PlanTitle.On} ${dateTimeUtil.formatTzTimeWithMMMDate(signature.createdAt)}`

  return details
}

const getPlanSheetSignatureDto = (
  signature: Signature,
  includeNotifyingDetails: boolean,
): PlanSheetDoctorSignOffDto => {
  return {
    isSigned: true,
    initials: getInitials(signature.principal),
    details: getPlanSheetSignOffDetails(signature, signature.principal, signature.signatory),
    notifyingDetails: getSignatureNotifyingMethodDetails(signature, includeNotifyingDetails),
  }
}

const getSheetSortedDays = (
  dates: string[],
  additionalDays: string[],
): {totalDates: string[]; nonPrimaryDates: Set<string>; manuallyAddedDates: Set<string>} => {
  const primaryDates = [...dates]
  const totalDates = additionalDays?.length ? [...primaryDates, ...additionalDays] : primaryDates

  const sortedTotalDates = dateTimeUtil.sortDates(Array.from(new Set(totalDates)))

  return {
    totalDates: sortedTotalDates,

    /**Dates that are manually added but and were not auto-generated */
    nonPrimaryDates: new Set(difference(sortedTotalDates, primaryDates)),

    /**Dates that are manually added */
    manuallyAddedDates: new Set(additionalDays),
  }
}

const getSheetNoteDto = (note: PatientNote, attachmentUrl: string): PlanSheetNoteDto => {
  const sheetNote: PlanSheetNoteDto = {
    id: note?.uuid,
    message: note?.content,
    creationData: PlanSheetHelpers.getNoteChangedData(note),
  }

  const document = note?.patientDocument
  if (document?.id) {
    sheetNote.attachment = {
      id: document.uuid,
      title: document.name,
      url: attachmentUrl ?? null,
    }
  }

  return sheetNote
}

const getNoteToAttachmentUrlMap = async (
  patientNotes: PatientNote[],
): Promise<Map<number, string>> => {
  const nodeIdToAttachmentUrlMap = new Map<number, string>()

  await Promise.all(
    patientNotes.map(async (note) => {
      if (!note?.patientDocument) {
        return
      }

      nodeIdToAttachmentUrlMap.set(
        note.id,
        await fireBaseStorageAdapter.getSignedUrlToFile(note?.patientDocument?.url),
      )
    }),
  )

  return nodeIdToAttachmentUrlMap
}

/**Returns dateToNotes Map */
const getDatesToNotesMap = async (
  patientPlan: PatientPlan,
  dates: string[],
  noteType: PatientNoteTypeEnum,
): Promise<Map<string, PlanSheetNoteDto[]>> => {
  const dateToNotesMap = new Map<string, PlanSheetNoteDto[]>(dates.map((date) => [date, []]))

  const nodeIdToAttachmentUrlMap = await getNoteToAttachmentUrlMap(patientPlan.patientNotes)
  patientPlan.patientNotes.forEach((note) => {
    if (noteType && note.type === noteType) {
      const noteDto = getSheetNoteDto(note, nodeIdToAttachmentUrlMap.get(note.id))

      dateToNotesMap.get(note.date)?.push(noteDto)
    }
  })

  return dateToNotesMap
}

const addNoteToMap = (
  map: Map<string, PlanSheetNoteDto[]>,
  note: PlanSheetNoteDto,
  date: string,
): Map<string, PlanSheetNoteDto[]> => {
  const notes = map.get(date)
  if (!notes) {
    map.set(date, [note])
    return
  }

  notes.push(note)
  return
}

const getDatesAndNotesMap = async (
  notes: PatientNote[],
  sheetType: PlanSheetType,
): Promise<{
  datesToNotesMap: Map<string, PlanSheetNoteDto[]>
  datesToOrderNotesMap: Map<string, PlanSheetNoteDto[]>
  noteDates: string[]
}> => {
  const datesToNotesMap = new Map<string, PlanSheetNoteDto[]>()
  const datesToOrderNotesMap = new Map<string, PlanSheetNoteDto[]>()

  const dates = new Set<string>()

  const noteType = getPlanSheetNoteType(true, sheetType)
  const orderNoteType = getPlanSheetOrderNoteType(sheetType)

  const nodeIdToAttachmentUrlMap = await getNoteToAttachmentUrlMap(notes)

  notes.forEach((note) => {
    const noteDto = getSheetNoteDto(note, nodeIdToAttachmentUrlMap.get(note.id))

    if (note.type === noteType) {
      dates.add(note.date)
      addNoteToMap(datesToNotesMap, noteDto, note.date)
    }

    if (note.type === orderNoteType) {
      dates.add(note.date)
      addNoteToMap(datesToOrderNotesMap, noteDto, note.date)
    }
  })

  return {
    datesToNotesMap,
    datesToOrderNotesMap,
    noteDates: [...dates],
  }
}

const getDatesToSignOffMap = (
  signatures: Signature[],
  dates: string[],
  includeNotifyingDetails?: boolean,
): Map<string, PlanSheetSignOffDto> => {
  const dateToSignOffsMap = new Map<string, PlanSheetSignOffDto>(
    dates.map((date) => [date, {doctor: {isSigned: false}, nurse: {isSigned: false}}]),
  )

  signatures?.forEach((signature) => {
    const signOffDto = dateToSignOffsMap.get(signature.date)
    if (!signOffDto) {
      return
    }

    if (signature.type === SignatureType.Doctor) {
      signOffDto.doctor = PlanSheetHelpers.getPlanSheetSignatureDto(signature, false)
    } else {
      signOffDto.nurse = PlanSheetHelpers.getPlanSheetSignatureDto(
        signature,
        !!includeNotifyingDetails,
      )
    }
  })

  return dateToSignOffsMap
}

const buildFirstDayOfCycleDto = (sheet: PatientPlanSheet): FirstDayOfPeriodDto => {
  const {dayOne, dayOneLastUpdated, dayOneUpdatedByStaff} = sheet ?? {}

  const result: FirstDayOfPeriodDto = {
    date: dayOne ?? null,
  }

  if (dayOne && dayOneLastUpdated && dayOneUpdatedByStaff) {
    const date = dateTimeUtil.formatBirthDate(dateTimeUtil.UTCToTz(dayOneLastUpdated))

    result.lastUpdateDetails = `${PlanTitle.LastUpdatedOn} ${date} ${
      PlanTitle.By
    } ${abbreviatedName(dayOneUpdatedByStaff)}`
  }

  return result
}

const getSignatureNotifyingMethodDetails = (
  signature: Signature,
  includeNotifyingDetails: boolean,
): string => {
  if (includeNotifyingDetails) {
    return StimSheetNotifyingMethodLabel.get(signature?.notifyingMethod) ?? DefaultValue.Dash
  }
}

const getAdditionalDatesInRange = (dates: string[], sheet: PatientPlanSheet): string[] => {
  const {startDateUTC, endDateUTC} = getSheetStartAndEndDateUTC(sheet)

  const day0UTC = dateTimeUtil.subDays(startDateUTC, 1)

  return dates.filter((date) => {
    const dateUTC = dateTimeUtil.getUTCTimeFromString(date)
    return (
      dateTimeUtil.isAfterOrEqual(dateUTC, day0UTC) && dateTimeUtil.isBefore(dateUTC, endDateUTC)
    )
  })
}

const getSheetSize = (sheetType: PlanSheetType): number => {
  switch (sheetType) {
    case PlanSheetType.Stimulation:
      return configService.get<number>('STIM_SHEET_SIZE_DAYS')
    case PlanSheetType.HCG:
      return configService.get<number>('HCG_WORKSHEET_SIZE_DAYS')
    case PlanSheetType.OB:
      return configService.get<number>('OB_WORKSHEET_SIZE_DAYS')
    case PlanSheetType.Priming:
      return configService.get<number>('PRIMING_WORKSHEET_SIZE_DAYS')
    case PlanSheetType.EPL:
      return configService.get<number>('EPL_WORKSHEET_SIZE_DAYS')
    default:
  }
}

const getSheetStartAndEndDateUTC = (
  sheet: PatientPlanSheet,
): {startDateUTC: Date; endDateUTC: Date} => {
  const startDateUTC = dateTimeUtil.getUTCTimeFromString(sheet.dayOne)

  const sheetSize = getSheetSize(sheet.type)

  const endDateUTC = dateTimeUtil.addDays(startDateUTC, sheetSize)

  return {startDateUTC, endDateUTC}
}

const getWorksheetTestTypeResultsDto = (
  testTypeResults: WorksheetTestTypeResultsDto,
  testTypes: TestType[],
  bookedTestTypeIds: number[],
): PlanSheetTestTypeResultDTO[] => {
  return testTypes
    .map((testType) => {
      const testResult = testTypeResults?.[testType.id]
      if (bookedTestTypeIds.includes(testType.id) || testResult) {
        return {
          id: testType.uuid,
          testResultId: testResult?.resultUUID ?? null,
          title: testType.abbreviation ?? DefaultValue.Dash,
          result: testResult?.result ?? DefaultValue.Dash,
        }
      }

      return null
    })
    .filter(Boolean)
}

const getWorkSheetTestResultsGroupDto = (
  testTypeResults: WorksheetTestTypeResultsDto,
  ultrasoundResult?: {uuid: string; status: string; responseObject: unknown},
  testTypes?: TestType[],
): SheetTestResultGroupDto[] => {
  const groups = []

  if (testTypeResults) {
    const testTypeResultsGroup: SheetTestResultGroupDto = {
      typeId: WorksheetTestResultTypeEnum.Hormone,
      testResults: Array.from(Object.keys(testTypeResults)).reduce((results, key) => {
        const testTypeResult = testTypeResults[key]
        const title =
          HormoneTypeTitle[key] ??
          testTypes?.find(({id}) => id === Number(key))?.abbreviation ??
          DefaultValue.Dash

        if (testTypeResult && PlanSheetTestResultActions.hasOwnProperty(testTypeResult.status)) {
          results.push({
            id: testTypeResult.resultUUID,
            title,
            actionIds: PlanSheetTestResultActions[testTypeResult.status],
          })
        }

        return results
      }, []),
    }

    if (testTypeResultsGroup.testResults?.length) {
      groups.push(testTypeResultsGroup)
    }
  }

  if (
    ultrasoundResult?.uuid &&
    PlanSheetTestResultActions.hasOwnProperty(ultrasoundResult?.status)
  ) {
    groups.push({
      typeId: WorksheetTestResultTypeEnum.TCM,
      testResults: [
        {
          id: ultrasoundResult.uuid,
          title: PlanSheetUltrasoundTypeLabel[WorksheetTestResultTypeEnum.TCM],
          actionIds: PlanSheetTestResultActions[ultrasoundResult.status],
        },
      ],
    })
  }

  return groups
}

const getDayProperties = (
  date: string,
  dayData: {
    notes: PlanSheetNoteDto[]
    orderNotes: PlanSheetNoteDto[]
    signOff: PlanSheetSignOffDto
    testTypeResults: WorksheetTestTypeResultsDto
    ultrasoundResult?: StimSheetUltrasoundResultsDto | OBWorksheetUltrasoundResults
    appointments?: StimSheetAppointmentDto[]
    bookedTestTypeIds?: number[]

    nonPrimaryDates: Set<string>
    manuallyAddedDates: Set<string>
  },
): {isRemovable: boolean; isHidden: boolean} => {
  const {
    notes,
    orderNotes,
    signOff,
    ultrasoundResult,
    testTypeResults,
    appointments,
    nonPrimaryDates,
    manuallyAddedDates,
    bookedTestTypeIds,
  } = dayData

  const daySigned = signOff.doctor.isSigned || signOff.nurse.isSigned

  const hasManuallyAddedData = Boolean(
    notes.length ||
      orderNotes.length ||
      ultrasoundResult ||
      (testTypeResults && Object.keys(testTypeResults).length) ||
      daySigned ||
      bookedTestTypeIds?.length,
  )

  return {
    isRemovable: nonPrimaryDates.has(date) && !hasManuallyAddedData,
    isHidden: !(manuallyAddedDates.has(date) || hasManuallyAddedData || appointments?.length),
  }
}

const getPlanTypeSheet = (planType: PlanType, sheetType: PlanSheetType): PlanTypeSheet => {
  return planType?.sheets?.find(({type}) => type === sheetType)
}

const hasActionList = (planTypeSheet: PlanTypeSheet, patientPlan: PatientPlan): boolean =>
  patientPlan.defaultSheetType === planTypeSheet?.type &&
  Boolean(planTypeSheet.planSheetActionListId)

const getConfig = (data: {
  patientPlan: PatientPlan
  type: PlanSheetType
  size: number
  isEditable: boolean
  planType?: PlanType
}): SheetConfigDTO => {
  const {patientPlan, type, size, isEditable, planType} = data

  const planTypeSheet = PlanSheetHelpers.getPlanTypeSheet(planType ?? patientPlan.planType, type)

  return {
    maximumWorksheetDays: size,
    isEditable,
    hasChecklist: Boolean(planTypeSheet?.planChecklistId),
    hasActionsList: hasActionList(planTypeSheet, patientPlan),
  }
}

const PlanSheetHelpers = {
  isPlanSheetEditable,
  getNoteChangedData,
  getPlanSheetNoteType,
  getPlanSheetSignatureDto,
  getPlanSheetSignOffDetails,
  getDatesToNotesMap,
  getDatesToSignOffMap,
  getSheetNoteDto,
  getSheetSortedDays,
  buildFirstDayOfCycleDto,
  getSignatureNotifyingMethodDetails,
  getPlanSheetOrderNoteType,
  getNoteToAttachmentUrlMap,
  getAdditionalDatesInRange,
  getSheetStartAndEndDateUTC,
  getWorkSheetTestResultsGroupDto,
  getDayProperties,
  getDatesAndNotesMap,
  getPlanTypeSheet,
  getConfig,
  getWorksheetTestTypeResultsDto,
}

export default PlanSheetHelpers
