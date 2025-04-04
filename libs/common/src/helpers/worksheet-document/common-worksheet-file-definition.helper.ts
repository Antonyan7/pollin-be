import {OrderNotes, PlanSheetNoteDto} from '@libs/common/dto/worksheets/common-worksheet.dto'
import {PlanMedication} from '@libs/data-layer/apps/plan/entities/typeorm'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {Content, TableCell, TableLayout, TDocumentDefinitions} from 'pdfmake/interfaces'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {
  getSubHeader,
  PdfNotesType,
} from '@libs/services-common/helpers/pdf-kit-helpers/encounter-and-staff-notes-pdf-kit.helper'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'

export const worksheetTableLayout: TableLayout = {
  hLineWidth: () => 1,
  vLineWidth: () => 1,
  hLineColor: () => '#C0C0C0',
  vLineColor: () => '#C0C0C0',
  paddingBottom: () => 0,
  paddingLeft: () => 0,
  paddingRight: () => 0,
  paddingTop: () => 0,
}

export const worksheetTableInternalLayout: TableLayout = {
  ...worksheetTableLayout,
  hLineWidth: (rowIndex) => (rowIndex ? 1 : 0),
  vLineWidth: (rowIndex) => (rowIndex ? 1 : 0),
}

export async function getPlanWorksheetFileDefinition(
  [patient, staff, sheetType]: [Patient, Staff, PlanSheetType],
  content: Content[],
  pagination: {firstPage?: number; totalPages?: number},
): Promise<TDocumentDefinitions> {
  try {
    const {firstPage, totalPages} = pagination

    const sheetTypeToPdfNotesType = new Map<PlanSheetType, PdfNotesType>([
      [PlanSheetType.EPL, PdfNotesType.WorksheetEPL],
      [PlanSheetType.HCG, PdfNotesType.WorksheetHCG],
      [PlanSheetType.OB, PdfNotesType.WorksheetOB],
      [PlanSheetType.Priming, PdfNotesType.WorksheetPriming],
      [PlanSheetType.Stimulation, PdfNotesType.WorksheetStimulation],
    ])

    const headerContent = await getHeaderContent(patient)
    const subHeaderContent = await getSubHeader(sheetTypeToPdfNotesType.get(sheetType))

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
      content,
      footer: (page, pageCount) =>
        getFooterContent(staff, {page, pageCount: totalPages ?? pageCount, firstPage}),
      info: {title: 'worksheet.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
        fontSize: 24,
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.PlanSheetFunctions.GetWorksheetFileDefinition,
      eventName: activityLogs.PlanSheetActions.GetWorksheetFileDefinitionFailed,
    })
  }
}

export const getPlanNotesContent = (
  notes: PlanSheetNoteDto[],
  sheetType: PlanSheetType,
): Content =>
  notes.length
    ? {
        table: {
          widths: ['*', 180],
          headerRows: 1,
          body: [
            [
              {
                text: `${sheetType} Notes`,
                fillColor: '#F1EEE7',
                alignment: 'left',
                margin: [12, 12, 12, 12],
                colSpan: 2,
                bold: true,
                fontSize: 20,
              },
              {},
            ],
            ...notes.map((note) => [
              {
                text: note.message,
                fontSize: 15,
                margin: [12, 14, 12, 12],
                lineHeight: 1.5,
                alignment: 'left',
                border: [true, true, false, true],
                fillColor: '#FCFBF9',
              },
              {
                text: note.creationData,
                fontSize: 14,
                margin: [12, 15, 12, 12],
                lineHeight: 1.5,
                alignment: 'right',
                border: [false, true, true, true],
                fillColor: '#FCFBF9',
              },
            ]),
          ],
        },
        layout: worksheetTableLayout,
        margin: [0, 20, 0, 16],
      }
    : {
        text: '',
        margin: [0, 20, 0, 16],
      }

export const getTablePlanMedicationRowDefinition = (
  planMedications: PlanMedication[],
  columnsSize: number,
): TableCell[] => {
  const categoryToData = planMedications.reduce((map, medication) => {
    const categoryValue = map.get(medication.medicationCategoryId)
    const medicationTitles = categoryValue?.medicationTitles ?? []

    medicationTitles.push(medication.name + (medication.dosage ? ` ${medication.dosage}` : ''))

    map.set(medication.medicationCategoryId, {
      title: categoryValue?.title ?? medication.medicationCategory?.title ?? 'Other',
      medicationTitles: medicationTitles,
    })

    return map
  }, new Map<number, {title: string; medicationTitles: string[]}>())

  return [
    {
      table: {
        body: [
          [
            {
              text: 'Plan Medications:',
              alignment: 'left',
              fillColor: '#F9F8F6',
              margin: 12,
              fontSize: 18,
              lineHeight: 1.5,
              border: [true, true, false, true],
            },
            {
              lineHeight: 1.5,
              text: Array.from(categoryToData, ([_, category]) => ({
                fontSize: 16,
                text: [
                  {
                    text: `${category.title}: `,
                  },
                  {
                    text: category.medicationTitles.join(', ') + '\n',
                    bold: true,
                  },
                ],
                marginTop: 12,
              })),
              alignment: 'left',
              fillColor: '#F9F8F6',
              marginTop: 14,
              marginBottom: 6,
              fontSize: 16,
              border: [false, true, true, true],
            },
          ],
        ],
        widths: [170, '*'],
      },
      layout: worksheetTableInternalLayout,
      colSpan: columnsSize,
    },
    ...new Array(columnsSize - 1).fill({}),
  ]
}

export const getDayOneOfCycleDefinition = (date: string): Content => ({
  text: [{text: 'Day 1 of Cycle\n', bold: true}, {text: date}],
  fontSize: 20,
  lineHeight: 1.3,
})

export const getTableHeaderRowCellDefinition = (text: string): TableCell => ({
  text,
  bold: true,
  alignment: 'center',
  fillColor: '#F1EEE7',
  margin: [5, 46],
  fontSize: 16,
  lineHeight: 1,
  noWrap: true,
})

export const getTableRowCellDefinition = (text: string): TableCell => ({
  text,
  alignment: 'center',
  margin: [5, 46],
  fontSize: 15,
  lineHeight: 1,
})

export const getTableRowDateCellDefinition = (text: string): TableCell => ({
  text,
  alignment: 'center',
  margin: [8, 46],
  fontSize: 15,
  lineHeight: 1,
  noWrap: true,
})

export const getTableRowOrderDefinition = (orderNotes: OrderNotes[], rowSpan = 1): TableCell => ({
  text: [
    {
      text: orderNotes.map((orderNote, index) => ({
        text: [
          {text: `${index !== 0 ? '\n\n' : ''} ${orderNote.message}\n`, lineHeight: 1},
          {
            text: `${orderNote.creationData}`,
            lineHeight: 1.2,
            bold: true,
            fontSize: 14,
          },
        ],
      })),
    },
  ],
  alignment: 'left',
  margin: [14, 14],
  fontSize: 15,
  lineHeight: 1,
  rowSpan,
  noWrap: false,
})
