import {Content, TableCell} from 'pdfmake/interfaces'
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
  GetOBWorksheetResponseDTO,
  OBWorksheetDateResult,
} from '@libs/common/dto/worksheets/ob-worksheet.dto'

const widths = ['auto', 46, 46, 140, 80, 140, 80, 80, '*']

const headerProperties = {
  bold: true,
  alignment: 'center',
  fillColor: '#F1EEE7',
  fontSize: 16,
}

const getTableHeaderRowCellDefinition = (text: string): TableCell => ({
  text,
  marginTop: 46,
  marginLeft: 5,
  marginRight: 5,
  rowSpan: 2,
  lineHeight: 0,
  ...headerProperties,
})

const getTableHeaderRowSmallCellDefinition = (text: string, colSpan = 1): TableCell => ({
  text,
  rowSpan: 1,
  margin: [5, 20],
  lineHeight: 1,
  colSpan,
  noWrap: true,
  ...headerProperties,
})

const getTableRowCellDefinition = (text: string): TableCell => ({
  text,
  alignment: 'center',
  fontSize: 14,
  rowSpan: 2,
  margin: [5, 46],
  noWrap: true,
  lineHeight: 0,
})

const getTableRowSmallCellDefinition = (text: string, colSpan = 1): TableCell => ({
  text,
  alignment: 'center',
  margin: [5, 20],

  fontSize: 14,
  lineHeight: 1,
  colSpan,
})

const getTableHeaderRowDefinition = (): TableCell[][] => {
  const rows = [
    [
      getTableHeaderRowCellDefinition('Date'),
      getTableHeaderRowSmallCellDefinition('E2'),
      getTableHeaderRowSmallCellDefinition('P4'),
      getTableHeaderRowCellDefinition('Gestational Age'),
      getTableHeaderRowCellDefinition('Yolk Sac'),
      getTableHeaderRowCellDefinition('G Size'),
      getTableHeaderRowCellDefinition('CRL'),
      getTableHeaderRowCellDefinition('FHR'),
      getTableHeaderRowCellDefinition('Orders'),
    ],
    [{}, getTableHeaderRowSmallCellDefinition('TSH', 2), {}, {}, {}, {}, {}, {}, {}],
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

const getTableRowDefinition = (dateResult: OBWorksheetDateResult): TableCell[] => {
  const rows = [
    [
      getTableRowCellDefinition(dateResult.rowTitle),
      getTableRowSmallCellDefinition(dateResult.e2),
      getTableRowSmallCellDefinition(dateResult.p4),
      getTableRowCellDefinition(dateResult.gestationalAge),
      getTableRowCellDefinition(dateResult.yolkSac),
      getTableRowCellDefinition(dateResult.gSize),
      getTableRowCellDefinition(dateResult.crl),
      getTableRowCellDefinition(dateResult.fetalHeartRate),
      getTableRowOrderDefinition(dateResult.orderNotes, 2),
    ],
    [{}, getTableRowSmallCellDefinition(dateResult.tsh, 2), {}, {}, {}, {}, {}, {}, {}],
  ]

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

export async function getOBWorksheetFileContent(
  worksheet: GetOBWorksheetResponseDTO,
  [planMedications, sheetType]: [PlanMedication[], PlanSheetType],
): Promise<Content[]> {
  return [
    getDayOneOfCycleDefinition(worksheet.firstDayOfPeriod.date),
    getPlanNotesContent(worksheet.generalNotes, sheetType),
    {
      table: {
        widths: ['*'],
        headerRows: 2,
        body: [
          getTablePlanMedicationRowDefinition(planMedications, 1),
          ...getTableHeaderRowDefinition(),
          ...worksheet.dateResults.map(getTableRowDefinition),
        ],
        dontBreakRows: true,
      },
      layout: worksheetTableLayout,
    },
  ]
}
