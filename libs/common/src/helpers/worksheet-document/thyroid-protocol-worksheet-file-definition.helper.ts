import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {TDocumentDefinitions, TableCell} from 'pdfmake/interfaces'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {
  getSubHeader,
  PdfNotesType,
} from '@libs/services-common/helpers/pdf-kit-helpers/encounter-and-staff-notes-pdf-kit.helper'
import {
  getTableHeaderRowCellDefinition,
  getTableRowCellDefinition,
  getTableRowOrderDefinition,
  worksheetTableLayout,
} from './common-worksheet-file-definition.helper'
import {
  GetThyroidProtocolWorksheetResponseDTO,
  ThyroidDateResultDTO,
} from '@libs/common/dto/worksheets/thyroid-protocol-worksheet.dto'

const getTableHeaderRowDefinition = (): TableCell[] => [
  getTableHeaderRowCellDefinition('Date'),
  getTableHeaderRowCellDefinition('TSH'),
  getTableHeaderRowCellDefinition('TPO'),
  getTableHeaderRowCellDefinition('Synthroid Dosage'),
  getTableHeaderRowCellDefinition('Action'),
]

const getTableRowDefinition = (dateResult: ThyroidDateResultDTO): TableCell[] => [
  getTableRowCellDefinition(dateResult.rowTitle),
  getTableRowCellDefinition(dateResult.tsh),
  getTableRowCellDefinition(dateResult.tpo),
  getTableRowOrderDefinition(dateResult.synthroidDosage),
  getTableRowOrderDefinition(dateResult.actions),
]

export async function getThyroidProtocolWorksheetFileDefinition(
  worksheet: GetThyroidProtocolWorksheetResponseDTO,
  patient: Patient,
  staff: Staff,
): Promise<TDocumentDefinitions> {
  try {
    const headerContent = await getHeaderContent(patient)
    const subHeaderContent = await getSubHeader(PdfNotesType.WorksheetThyroid)

    return {
      pageMargins: [
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin375,
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin120,
      ],
      pageSize: {
        width: 1440,
        height: 1865,
      },
      header: () => [headerContent, subHeaderContent],
      content: [
        {
          table: {
            widths: [102, 133, 133, '*', '*'],
            headerRows: 1,
            body: [
              getTableHeaderRowDefinition(),
              ...worksheet.dateResults.map(getTableRowDefinition),
            ],
            dontBreakRows: true,
          },
          layout: worksheetTableLayout,
        },
      ],
      footer: (page, pageCount) => getFooterContent(staff, {page, pageCount}),
      info: {title: 'worksheet.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
        fontSize: 24,
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetTestResultFileDefinition,
      eventName: activityLogs.TestResultActions.GetFileDefinitionPerSpecialWorkflowFailed,
    })
  }
}
