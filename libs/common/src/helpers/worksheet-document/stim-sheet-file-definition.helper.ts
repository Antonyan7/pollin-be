import {Content, ContentText, TableCell} from 'pdfmake/interfaces'
import {
  getDayOneOfCycleDefinition,
  getPlanNotesContent,
  getTablePlanMedicationRowDefinition,
  getTableRowOrderDefinition,
  worksheetTableInternalLayout,
  worksheetTableLayout,
} from './common-worksheet-file-definition.helper'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PlanMedication} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  GetStimSheetResponseDto,
  StimSheetAppointmentDto,
  StimSheetDateResultDto,
} from '@libs/common/dto/worksheets/stim-sheet-worksheet.dto'
import {CatheterType} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {DateTimeUtil} from '@libs/common/utils'
import {PlanSheetTestTypeResultDTO} from '@libs/common/dto/worksheets/common-worksheet.dto'

const widths = [80, 60, 60, 130, 75, 130, 75, 40, 40, '*']

const headerProperties = {
  bold: true,
  alignment: 'center',
  fillColor: '#F1EEE7',
  fontSize: 16,
}

const getTableHeaderRowCellDefinition = (text: string, rowSpan = 1, colSpan = 1): TableCell => ({
  text,
  marginTop: 19,
  marginBottom: 19,
  rowSpan,
  colSpan,
  lineHeight: 1,
  ...headerProperties,
})

const getTableHeaderRowSmallCellDefinition = (text: string, colSpan = 1): TableCell => ({
  text,
  rowSpan: 1,
  marginTop: 7,
  marginBottom: 6,
  lineHeight: 1,
  colSpan,
  ...headerProperties,
  fontSize: 14,
})

const getTableHeaderRowBigCellDefinition = (text: string): TableCell => ({
  text,
  marginTop: 44,
  rowSpan: 3,
  lineHeight: 1,
  ...headerProperties,
})

const TableRowProperties = {
  alignment: 'center',
  fontSize: 14,
  margin: [5, 19],
  lineHeight: 1,
}

const getTableRowCellDefinition = (text: string, rowSpan = 1, colSpan = 1): TableCell => ({
  ...TableRowProperties,
  text,
  rowSpan,
  colSpan,
})

const getTableRowCellDefinitionNoWrap = (text: string, rowSpan = 1, colSpan = 1): TableCell => ({
  ...TableRowProperties,
  text,
  rowSpan,
  colSpan,
  noWrap: true,
})

const dateTimeUtil = new DateTimeUtil()

const getTableRowDayCellDefinition = (
  dateResult: StimSheetDateResultDto,
  hasAppointments: boolean,
  hasTestResults: boolean,
): TableCell => {
  return {
    marginTop: (hasAppointments ? 50 : 19) + (hasTestResults ? 40 : 0),
    rowSpan: 2 + (hasTestResults ? 1 : 0) + (hasAppointments ? 1 : 0),
    alignment: 'left',
    stack: [
      {
        columns: [
          {
            stack: 'DAY'
              .split('')
              .map((char) => ({text: char, alignment: 'left', fontSize: 14, bold: true})),
            lineHeight: 0.9,
            alignment: 'left',
            marginLeft: 16,
            width: 32,
          },
          {
            text: String(dateResult.dayNumber),
            fontSize: 36,
            bold: true,
            alignment: 'left',
            marginTop: 4,
          },
        ],

        alignment: 'center',
        marginLeft: String(dateResult.dayNumber).length === 1 ? 8 : 0,
      },
      {
        text: dateTimeUtil.formatMonthAndDay(dateTimeUtil.toDate(dateResult.date)),
        alignment: 'center',
        fontSize: 14,
        marginTop: 8,
      },
    ],
  }
}

const getTableRowTestResultsDefinition = (
  testResults: PlanSheetTestTypeResultDTO[],
): TableCell => ({
  stack: [
    {
      text: testResults.length > 1 ? 'Test Results' : 'Test Result',
      marginBottom: 8,
      bold: true,
      fontSize: 16,
    },
    ...testResults.map(
      (result): ContentText => ({
        text: `${result.title}: ${result.result}`,
        marginBottom: 6,
        fontSize: 14,
      }),
    ),
  ],
  alignment: 'left',
  fontSize: 14,
  marginLeft: 42,
  marginBottom: 11,
  marginTop: 19,
  lineHeight: 1.2,
  colSpan: 9,
})

const getTableRowAppointmentsDefinition = (
  appointments: StimSheetAppointmentDto[],
  catheters: Map<string, string>,
): TableCell => ({
  text: appointments.map((appointment): ContentText => {
    const labels: ContentText[] = [{bold: true, text: `\n${appointment.abbreviation}`}]

    if (appointment.hasCatheterDropdown) {
      labels.push({text: ` - Catheter: `})
      labels.push({
        bold: true,
        text: `${catheters.get(appointment.catheterTypeId) ?? 'Not selected'}`,
      })
    }

    labels.push({text: '\n'})
    return {text: labels}
  }),
  alignment: 'left',
  fontSize: 14,
  marginLeft: 42,
  marginBottom: 19,
  marginTop: 7,
  lineHeight: 1,
  colSpan: 9,
})

const getTableHeaderRowDefinition = (): TableCell[] => {
  const rows = [
    [
      getTableHeaderRowBigCellDefinition('Day'),
      getTableHeaderRowCellDefinition('E2'),
      getTableHeaderRowCellDefinition('P4'),
      getTableHeaderRowCellDefinition('Left Ovary', 1, 2),
      {},
      getTableHeaderRowCellDefinition('Right Ovary', 1, 2),
      {},
      getTableHeaderRowCellDefinition('EnT', 1, 2),
      {},
      getTableHeaderRowBigCellDefinition('Orders'),
    ],
    [
      {},
      getTableHeaderRowCellDefinition('LH', 2),
      getTableHeaderRowCellDefinition('FSH', 2),
      getTableHeaderRowCellDefinition('Foll>1.0', 2),
      getTableHeaderRowSmallCellDefinition('Cyst'),
      getTableHeaderRowCellDefinition('Foll>1.0', 2),
      getTableHeaderRowSmallCellDefinition('Cyst'),
      getTableHeaderRowCellDefinition('FF', 2),
      getTableHeaderRowCellDefinition('Tri', 2),
      {},
    ],
    [
      {},
      {},
      {},
      {},
      getTableHeaderRowSmallCellDefinition('AFC'),
      {},
      getTableHeaderRowSmallCellDefinition('AFC'),
      {},
      {},
      {},
    ],
  ]

  return [
    [
      {
        table: {
          body: rows,
          widths,
        },
        layout: worksheetTableInternalLayout,
        margin: 0,
        dontBreakRows: true,
      },
    ],
  ]
}

export const getTableRowDefinition = (
  dateResult: StimSheetDateResultDto,
  catheters: Map<string, string>,
): TableCell[] => {
  const rows = [
    [
      getTableRowDayCellDefinition(
        dateResult,
        Boolean(dateResult.appointments.length),
        Boolean(dateResult.testResults.length),
      ),
      getTableRowCellDefinitionNoWrap(dateResult.e2),
      getTableRowCellDefinitionNoWrap(dateResult.p4),
      getTableRowCellDefinition(dateResult.leftOvary.folliclesMoreThanOneCmSizes, 2),
      getTableRowCellDefinition(dateResult.leftOvary.cyst),
      getTableRowCellDefinition(dateResult.rightOvary.folliclesMoreThanOneCmSizes, 2),
      getTableRowCellDefinition(dateResult.rightOvary.cyst),
      getTableRowCellDefinitionNoWrap(dateResult.endometrium, 1, 2),
      {},
      getTableRowOrderDefinition(dateResult.orderNotes, 2),
    ],
    [
      {},
      getTableRowCellDefinitionNoWrap(dateResult.lh),
      getTableRowCellDefinitionNoWrap(dateResult.fsh),
      {},
      getTableRowCellDefinitionNoWrap(dateResult.leftOvary.folliclesCount),
      {},
      getTableRowCellDefinitionNoWrap(dateResult.rightOvary.folliclesCount),
      getTableRowCellDefinitionNoWrap(dateResult.freeFluid),
      getTableRowCellDefinitionNoWrap(dateResult.trilaminarEndometrium),
      {},
    ],
  ]

  if (dateResult.appointments?.length) {
    rows.push([
      {},
      getTableRowAppointmentsDefinition(dateResult.appointments, catheters),
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ])
  }

  if (dateResult.testResults?.length) {
    rows.push([
      {},
      getTableRowTestResultsDefinition(dateResult.testResults),
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ])
  }

  return [
    {
      table: {
        body: rows,
        widths,
      },
      layout: worksheetTableInternalLayout,
      margin: 0,
      dontBreakRows: true,
    },
  ]
}

export async function getStimWorksheetFileContent(
  worksheet: GetStimSheetResponseDto,
  [planMedications, sheetType]: [PlanMedication[], PlanSheetType],
  catheterTypes: CatheterType[],
): Promise<Content[]> {
  const catheters = new Map(catheterTypes.map((type) => [type.uuid, type.title]))

  return [
    getDayOneOfCycleDefinition(worksheet.firstDayOfCycle.date),
    getPlanNotesContent(worksheet.generalNotes, sheetType),
    {
      table: {
        widths: ['*'],
        headerRows: 2,
        body: [
          getTablePlanMedicationRowDefinition(planMedications, 1),
          getTableHeaderRowDefinition(),
          ...worksheet.dateResults.map((result) => getTableRowDefinition(result, catheters)),
        ],
        dontBreakRows: true,
      },
      layout: worksheetTableLayout,
    },
  ]
}
