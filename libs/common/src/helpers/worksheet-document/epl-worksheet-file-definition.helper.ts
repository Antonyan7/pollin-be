import {Content, TableCell} from 'pdfmake/interfaces'
import {
  getDayOneOfCycleDefinition,
  getPlanNotesContent,
  getTableHeaderRowCellDefinition,
  getTablePlanMedicationRowDefinition,
  getTableRowCellDefinition,
  getTableRowDateCellDefinition,
  getTableRowOrderDefinition,
  worksheetTableLayout,
} from './common-worksheet-file-definition.helper'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {PlanMedication} from '@libs/data-layer/apps/plan/entities/typeorm'
import {
  EPLWorksheetDateResult,
  GetEPLWorksheetResponseDTO,
} from '@libs/common/dto/worksheets/epl-worksheet.dto'

const getTableHeaderRowDefinition = (): TableCell[] => [
  getTableHeaderRowCellDefinition('Date'),
  getTableHeaderRowCellDefinition('BHCG'),
  getTableHeaderRowCellDefinition('Progesterone'),
  getTableHeaderRowCellDefinition('Orders'),
]

const getTableRowDefinition = (dateResult: EPLWorksheetDateResult): TableCell[] => [
  getTableRowDateCellDefinition(dateResult.rowTitle),
  getTableRowCellDefinition(dateResult.bhcg),
  getTableRowCellDefinition(dateResult.p4),
  getTableRowOrderDefinition(dateResult.orderNotes),
]

export async function getEPLWorksheetFileContent(
  worksheet: GetEPLWorksheetResponseDTO,
  [planMedications, sheetType]: [PlanMedication[], PlanSheetType],
): Promise<Content[]> {
  return [
    getDayOneOfCycleDefinition(worksheet.firstDayOfPeriod.date),
    getPlanNotesContent(worksheet.generalNotes, sheetType),
    {
      table: {
        widths: ['auto', 150, 150, '*'],
        headerRows: 2,
        body: [
          getTablePlanMedicationRowDefinition(planMedications, 4),
          getTableHeaderRowDefinition(),
          ...worksheet.dateResults.map(getTableRowDefinition),
        ],
        dontBreakRows: true,
      },
      layout: worksheetTableLayout,
    },
  ]
}
