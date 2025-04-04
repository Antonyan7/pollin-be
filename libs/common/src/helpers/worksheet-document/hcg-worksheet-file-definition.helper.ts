import {Content, TableCell} from 'pdfmake/interfaces'
import {
  GetHCGWorksheetResponseDTO,
  HCGWorksheetDateResult,
} from '@libs/common/dto/worksheets/hcg-worksheet.dto'
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

const getTableHeaderRowDefinition = (): TableCell[] => [
  getTableHeaderRowCellDefinition('Date'),
  getTableHeaderRowCellDefinition('HCG'),
  getTableHeaderRowCellDefinition('E2'),
  getTableHeaderRowCellDefinition('P4'),
  getTableHeaderRowCellDefinition('TSH'),
  getTableHeaderRowCellDefinition('Orders'),
]

const getTableRowDefinition = (dateResult: HCGWorksheetDateResult): TableCell[] => [
  getTableRowDateCellDefinition(dateResult.rowTitle),
  getTableRowCellDefinition(dateResult.hcg),
  getTableRowCellDefinition(dateResult.e2),
  getTableRowCellDefinition(dateResult.p4),
  getTableRowCellDefinition(dateResult.tsh),
  getTableRowOrderDefinition(dateResult.orderNotes),
]

export async function getHCGWorksheetFileContent(
  worksheet: GetHCGWorksheetResponseDTO,
  [planMedications, sheetType]: [PlanMedication[], PlanSheetType],
): Promise<Content[]> {
  return [
    getDayOneOfCycleDefinition(worksheet.firstDayOfPeriod.date),
    getPlanNotesContent(worksheet.generalNotes, sheetType),
    {
      table: {
        widths: ['auto', 133, 133, 133, 133, '*'],
        headerRows: 2,
        body: [
          getTablePlanMedicationRowDefinition(planMedications, 6),
          getTableHeaderRowDefinition(),
          ...worksheet.dateResults.map(getTableRowDefinition),
        ],
        dontBreakRows: true,
      },
      layout: worksheetTableLayout,
    },
  ]
}
