import {PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPlan, PatientPlanSheet, Signature} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanTitle} from '@libs/services-common/enums/plan.enum'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {getInitials} from '@libs/common/helpers/patient.helper'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {WorksheetTestTypeResultsDto} from '@libs/common/services/worksheets/queries/worksheet.queries'
import {DefaultValue} from '@libs/common/enums'
import {
  TestResult,
  TestResultOvaryMeasurement,
  TestType,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  CystTypeAbbreviation,
  uterusTypeResultToAbbreviation,
} from '@libs/services-common/enums/stim-sheet.enum'
import {HormoneType} from '@libs/data-layer/apps/clinic-test/enums'
import {OvaryLocation} from '@libs/data-layer/apps/clinic-test/enums/stim-sheet.enum'
import {getFreeFluidShortValue} from '@apps/lis/diagnostic-imaging/helper/ultrasound.helper'
import {SignatureType} from '@libs/data-layer/apps/plan/enums/signature.enum'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {PlanSheetType, PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {
  PlanSheetDoctorSignOffDto,
  PlanSheetNoteDto,
} from '@libs/common/dto/worksheets/common-worksheet.dto'
import {
  StimSheetDateResultDto,
  GetStimSheetResponseDto,
  StimSheetAppointmentDto,
  StimSheetAppointmentTestReport,
  StimSheetOvaryDto,
  StimSheetUltrasoundData,
  StimSheetUltrasoundResultsDto,
  SignOffStimSheetCycleDetailsDto,
} from '@libs/common/dto/worksheets/stim-sheet-worksheet.dto'
import PlanSheetHelpers, {
  WorksheetPayload,
} from '@libs/common/services/worksheets/helpers/worksheet-common.helper'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const getAppointmentTestReport = (appointment: Appointment): StimSheetAppointmentTestReport => {
  if (!appointment?.testResults?.length) {
    return null
  }

  //it was sorted earlier
  const testResult = appointment.testResults[0]

  return testResult.machineComment
    ? {
        testName: testResult.testType?.title ?? testResult.testPanel?.title ?? DefaultValue.Dash,
        comment: testResult.machineComment,
      }
    : null
}

const getStimSheetAppointmentDateAndDto = (
  appointment: Appointment,
): [string, StimSheetAppointmentDto | null] => {
  const date = dateTimeUtil.formatIsoDate(dateTimeUtil.UTCToTz(appointment.start))
  const {serviceType} = appointment

  if (!serviceType.hasLinkToEncounters) {
    return [date, null]
  }

  const appointmentDto: StimSheetAppointmentDto = {
    id: appointment.uuid,
    identifier: appointment.identifier ?? DefaultValue.Dash,
    isEditable: true,
    abbreviation: serviceType.abbreviation,
    details: `${serviceType.name}\n${PlanTitle.BookedFor} ${dateTimeUtil.extractTzTime(
      appointment.start,
    )}`,
    testReport: getAppointmentTestReport(appointment),

    hasCatheterDropdown: serviceType.hasCatheterSelection,
    hasRoutineProcedureCheckbox: serviceType.hasUncomplicatedProcedure,
    hasLinkToEncounters: serviceType.hasLinkToEncounters,

    catheterTypeId: serviceType?.hasCatheterSelection ? appointment.catheterType?.uuid : null,
    uncomplicatedProcedure: serviceType?.hasUncomplicatedProcedure
      ? appointment.uncomplicatedProcedure
      : null,
  }

  return [date, appointmentDto]
}

const getDatesToAppointmentsMap = (
  dates: string[],
  appointments: Appointment[],
): Map<string, StimSheetAppointmentDto[]> => {
  const dateToAppointmentsMap = new Map<string, StimSheetAppointmentDto[]>(
    dates.map((date) => [date, []]),
  )

  appointments.forEach((appointment) => {
    const [date, appointmentDto] = getStimSheetAppointmentDateAndDto(appointment)

    dateToAppointmentsMap.get(date)?.push(appointmentDto ?? null)
  })

  return dateToAppointmentsMap
}

const ultrasoundDefaultResponse = (): StimSheetUltrasoundResultsDto => ({
  leftOvary: getDefaultOveryDto(),
  rightOvary: getDefaultOveryDto(),
  endometrium: DefaultValue.Dash,
  freeFluid: DefaultValue.Dash,
  trilaminarEndometrium: DefaultValue.Dash,
})

const getDatesToUltrasoundResults = (
  testResults: TestResult[],
  dates: string[],
  dayOne: string,
): Map<string, StimSheetUltrasoundData> => {
  const dateOfDayOne = dateTimeUtil.parseISO(dayOne)

  const datesToUltrasoundResults = new Map<string, StimSheetUltrasoundData>(
    dates.map((date) => [
      date,
      {
        uuid: null,
        status: null,
        responseObject: null,
        dayNumber: generateRowDay(date, dateOfDayOne),
      },
    ]),
  )

  testResults.forEach((testResult) => {
    if (!testResult.appointment) {
      return
    }

    const date = dateTimeUtil.formatIsoDate(dateTimeUtil.UTCToTz(testResult.appointment.start))

    const ultrasoundData = datesToUltrasoundResults.get(date)
    if (!ultrasoundData) {
      return
    }

    const uterus = testResult.testResultUterusMeasurement

    const responseObject: StimSheetUltrasoundResultsDto = {
      endometrium: uterus?.endometriumThickness?.toFixed(1) || DefaultValue.Dash,
      trilaminarEndometrium:
        uterusTypeResultToAbbreviation.get(uterus.trilaminarEndometrium) || DefaultValue.Dash,
      freeFluid: getFreeFluidShortValue(uterus.freeFluid),
      leftOvary: getDefaultOveryDto(),
      rightOvary: getDefaultOveryDto(),
    }

    testResult.testResultOvaryMeasurements.forEach((ovaryMeasurement) => {
      if (ovaryMeasurement.location === OvaryLocation.LeftOvary) {
        responseObject.leftOvary = getOvaryDto(ovaryMeasurement)
      } else {
        responseObject.rightOvary = getOvaryDto(ovaryMeasurement)
      }
    })

    ultrasoundData.uuid = testResult.uuid
    ultrasoundData.status = testResult.status
    ultrasoundData.responseObject = responseObject
  })

  return datesToUltrasoundResults
}

const getDefaultOveryDto = (): StimSheetOvaryDto => ({
  folliclesMoreThanOneCmSizes: DefaultValue.Dash,
  cyst: DefaultValue.Dash,
  folliclesCount: DefaultValue.Dash,
})

const sortAndConvertToStimSheetSizesString = (sizes: string[]): string =>
  sizes
    .map((size) => Math.round((Number(size) + Number.EPSILON) * 10) / 10)
    .sort((a, b) => b - a)
    .map((size) => size.toFixed(1))
    .join(', ')

const getOvaryDto = (ovary: TestResultOvaryMeasurement): StimSheetOvaryDto => {
  const cyst = ovary.testResultOvaryCystMeasurements?.length
    ? ovary.testResultOvaryCystMeasurements
        .map(
          (cyst) =>
            `${CystTypeAbbreviation.get(cyst.type)} ${sortAndConvertToStimSheetSizesString(cyst.sizes)}`,
        )
        .join('\n')
    : DefaultValue.Dash

  const folliclesMoreThanOneCmSizes = ovary.follMoreThanOneCmSizes?.length
    ? sortAndConvertToStimSheetSizesString(ovary.follMoreThanOneCmSizes)
    : DefaultValue.Dash

  return {
    folliclesCount: String(ovary.totalFollicles),
    folliclesMoreThanOneCmSizes,
    cyst,
  }
}

const getStimSheetHormoneResultsDto = (
  hormoneResults: WorksheetTestTypeResultsDto,
): {e2: string; p4: string; lh: string; fsh: string} => ({
  e2: hormoneResults?.[HormoneType.Estradiol]?.result ?? DefaultValue.Dash,
  p4: hormoneResults?.[HormoneType.Progesterone]?.result ?? DefaultValue.Dash,
  lh: hormoneResults?.[HormoneType.LuteinizingHormone]?.result ?? DefaultValue.Dash,
  fsh: hormoneResults?.[HormoneType.FollicleStimulatingHormone]?.result ?? DefaultValue.Dash,
})

const generateRowDay = (date: string, dayOne: Date): string => {
  const differenceInDays = dateTimeUtil.differenceInDays(dateTimeUtil.parseISO(date), dayOne) + 1
  if (differenceInDays < 0) {
    return '0'
  }

  return `${differenceInDays}`
}

const buildDateResultsDto = async ({
  dates,
  appointments,
  datesToTestResults,
  ultrasoundResults,
  sheet,
  nonPrimaryDates,
  manuallyAddedDates,
  datesToNotesMap,
  datesToOrderNotesMap,
  signatures,
  testTypes,
  appointmentDatesToTestTypeIds,
}: StimSheetPayload): Promise<StimSheetDateResultDto[]> => {
  const datesToAppointments = getDatesToAppointmentsMap(dates, appointments)
  const datesToSignOffMap = PlanSheetHelpers.getDatesToSignOffMap(signatures, dates, true)
  const datesToUltrasoundResults = getDatesToUltrasoundResults(
    ultrasoundResults,
    dates,
    sheet.dayOne,
  )

  return dates
    .map((date, index) => {
      const ultrasoundData = datesToUltrasoundResults.get(date)
      const testTypeResults = datesToTestResults.get(date)
      const signOff = datesToSignOffMap.get(date)
      const notes = datesToNotesMap.get(date) ?? []
      const orderNotes = datesToOrderNotesMap.get(date) ?? []
      const appointments = datesToAppointments.get(date) || []

      const bookedTestTypeIds = appointmentDatesToTestTypeIds.get(date) ?? []
      const testResults = PlanSheetHelpers.getWorksheetTestTypeResultsDto(
        testTypeResults,
        testTypes,
        bookedTestTypeIds,
      )

      const {isRemovable, isHidden} = PlanSheetHelpers.getDayProperties(date, {
        notes,
        orderNotes,
        signOff,
        ultrasoundResult: ultrasoundData?.responseObject,
        testTypeResults,
        appointments,
        manuallyAddedDates,
        nonPrimaryDates,
        bookedTestTypeIds,
      })

      if (isHidden) {
        return null
      }

      const hasHistory = notes.length > 0 || orderNotes.length > 0
      return {
        id: `date-result-${index}`,
        date,
        isRemovable,
        hasHistory,
        ...getStimSheetHormoneResultsDto(testTypeResults),
        ...(ultrasoundData.responseObject || ultrasoundDefaultResponse()),
        dayNumber: ultrasoundData.dayNumber,
        testResults,
        appointments: appointments.filter(Boolean),
        signOff,
        notes,
        orderNotes,
        testResultGroups: PlanSheetHelpers.getWorkSheetTestResultsGroupDto(
          testTypeResults,
          ultrasoundData,
          testTypes,
        ),
      }
    })
    .filter(Boolean)
}

export class StimSheetPayload extends WorksheetPayload {
  patientPlan?: PatientPlan
  size: number
  sheet?: PatientPlanSheet
  dates: string[]
  appointments?: Appointment[]
  ultrasoundResults?: TestResult[]
  datesToTestResults?: Map<string, WorksheetTestTypeResultsDto>
  datesToNotesMap?: Map<string, PlanSheetNoteDto[]>
  datesToOrderNotesMap?: Map<string, PlanSheetNoteDto[]>
  generalNotes?: PatientNote[]
  signatures?: Signature[]
  sheetType: PlanSheetType
  testTypes?: TestType[]
  appointmentDatesToTestTypeIds?: Map<string, number[]>
}

const buildGetStimSheetResponseDto = async (
  payload: StimSheetPayload,
): Promise<GetStimSheetResponseDto> => {
  const {
    patientPlan,
    generalNotes,
    dates,
    sheet,
    size,
    appointments,
    datesToTestResults,
    ultrasoundResults,
    sheetType,
  } = payload

  StructuredLogger.info(
    activityLogs.PlanSheetFunctions.GetWorksheet,
    activityLogs.PlanSheetActions.GetWorksheetData,
    {
      appointmentsIds: appointments.map(({id}) => id),
      testResultDates: Array.from(datesToTestResults.keys()),
      ultrasoundResultsIds: ultrasoundResults.map(({id}) => id),
      patientNotesIds: patientPlan.patientNotes.map(({id}) => id),
      type: sheetType,
    },
  )

  const isEditable = !sheet?.endDate && PlanSheetHelpers.isPlanSheetEditable(patientPlan, sheet)

  const nodeToAttachmentUrlMap = await PlanSheetHelpers.getNoteToAttachmentUrlMap(generalNotes)
  return {
    config: PlanSheetHelpers.getConfig({isEditable, patientPlan, size, type: sheetType}),
    firstDayOfCycle: PlanSheetHelpers.buildFirstDayOfCycleDto(sheet),
    generalNotes: generalNotes.map((note) =>
      PlanSheetHelpers.getSheetNoteDto(note, nodeToAttachmentUrlMap.get(note.id)),
    ),
    dateResults: dates?.length ? await buildDateResultsDto(payload) : [],
    globalSignOff: buildSignOffStimSheetCycleDetailsDto(sheet.signatures),
  }
}

const buildGetStimSheetEmptyResponseDto = async (data: {
  patientPlan: PatientPlan
  sheet: PatientPlanSheet
  generalNotes: PatientNote[]
  globalSignatures: Signature[]
  size: number
  sheetType: PlanSheetType
}): Promise<GetStimSheetResponseDto> => {
  const {patientPlan, sheet, generalNotes, globalSignatures, size, sheetType} = data

  const isEditable = !sheet?.endDate && PlanSheetHelpers.isPlanSheetEditable(patientPlan, sheet)

  const nodeToAttachmentUrlMap = await PlanSheetHelpers.getNoteToAttachmentUrlMap(generalNotes)
  return {
    config: PlanSheetHelpers.getConfig({isEditable, patientPlan, size, type: sheetType}),
    firstDayOfCycle: PlanSheetHelpers.buildFirstDayOfCycleDto(sheet),
    generalNotes: generalNotes.map((note) =>
      PlanSheetHelpers.getSheetNoteDto(note, nodeToAttachmentUrlMap.get(note.id)),
    ),
    dateResults: [],
    globalSignOff: buildSignOffStimSheetCycleDetailsDto(globalSignatures),
  }
}

export const getStimSheetSignatureDetails = (
  signatures: Signature[],
  type: SignatureType,
): PlanSheetDoctorSignOffDto => {
  const signature = signatures?.find((item) => item.type === type)
  if (!signature) {
    return {
      isSigned: false,
    }
  }
  return {
    isSigned: true,
    initials: getInitials(signature.principal),
    details: PlanSheetHelpers.getPlanSheetSignOffDetails(
      signature,
      signature.principal,
      signature.signatory,
    ),
  }
}
export const buildSignOffStimSheetCycleDetailsDto = (
  signatures: Signature[],
): SignOffStimSheetCycleDetailsDto => {
  return {
    nurse: getStimSheetSignatureDetails(signatures, SignatureType.Nurse),
    admin: getStimSheetSignatureDetails(signatures, SignatureType.Admin),
  }
}

export const getStimSheetEndDate = (
  dayOneOfCycleDateUTC: Date,
  patientPlan: PatientPlan,
  stimSheetSize: number,
): Date => {
  const endDateBasedOnStimsheetSize = dateTimeUtil.addDays(dayOneOfCycleDateUTC, stimSheetSize)
  const planCompletionOrCancellationDate = patientPlan.lastStatusUpdateDate

  if (
    (patientPlan.status !== PlanStatusEnum.Completed &&
      patientPlan.status !== PlanStatusEnum.Cancelled) ||
    dateTimeUtil.isAfter(planCompletionOrCancellationDate, endDateBasedOnStimsheetSize)
  ) {
    return endDateBasedOnStimsheetSize
  }

  if (
    dateTimeUtil.isAfterOrEqual(endDateBasedOnStimsheetSize, planCompletionOrCancellationDate) &&
    dateTimeUtil.isAfterOrEqual(planCompletionOrCancellationDate, dayOneOfCycleDateUTC)
  ) {
    const tzDate = dateTimeUtil.formatTzDate(planCompletionOrCancellationDate)
    return dateTimeUtil.addDays(dateTimeUtil.getUTCTimeFromString(tzDate), 1)
  }

  if (dateTimeUtil.isAfter(dayOneOfCycleDateUTC, planCompletionOrCancellationDate)) {
    return dayOneOfCycleDateUTC
  }

  return endDateBasedOnStimsheetSize
}

const getPlanTypeSheetTestTypes = (
  patientPlan: PatientPlan,
  sheetType: PlanSheetType,
): TestType[] => {
  const planTypeSheet = PlanSheetHelpers.getPlanTypeSheet(patientPlan.planType, sheetType)
  return planTypeSheet.testTypesRelations.map(({testType}) => testType)
}

const StimSheetCommonHelpers = {
  getStimSheetAppointmentDateAndDto,
  buildDateResultsDto,
  buildGetStimSheetResponseDto,
  buildGetStimSheetEmptyResponseDto,
  getDatesToAppointmentsMap,
  getStimSheetEndDate,
  getPlanTypeSheetTestTypes,
}

export default StimSheetCommonHelpers
