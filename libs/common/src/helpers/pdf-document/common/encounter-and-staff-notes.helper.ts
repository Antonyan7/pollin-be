import {getFullName} from '@libs/common/helpers/patient.helper'
import {DefaultValue, TimeFormat} from '@libs/common/enums'
import {NestprojectConfigService} from '@libs/common/services'
import {DateTimeUtil} from '@libs/common/utils'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  PatientEncounterAddendum,
  PatientStaffNoteAddendum,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette} from '@libs/services-common/enums'
import {
  footerAuthorLabelStyle,
  footerDesignationBlockStyle,
} from '@libs/services-common/helpers/pdf-kit-helpers/common/common-pdf.helper'
import {getMainDataContent} from '@libs/services-common/helpers/pdf-kit-helpers/encounter-and-staff-notes-pdf-kit.helper'
import {
  getSignatureImageTableCell,
  handleUnexpectedSymbolsForHtmlToPDFMake,
} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {Table, TableCell, ContentTable, Content} from 'pdfmake/interfaces'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const createSignatureContent = async (
  author: Staff,
  dateCreated: Date,
): Promise<TableCell[]> => {
  const signImageContent = await getSignatureImageTableCell(author?.signatureURL)
  const signContent = signImageContent ?? {}

  return [
    [
      signContent,
      {text: `${author.firstName} ${author.lastName}`, ...footerAuthorLabelStyle},
      {
        text: author.serviceProvider?.designation ?? DefaultValue.Empty,
        ...footerDesignationBlockStyle,
        marginBottom: MarginsPdfEnum.Margin24,
      },
      {
        text: `${dateTimeUtil.formatToZonedDateTimeWithAbbreviation({
          date: dateCreated,
          timeFormat: TimeFormat.H24,
        })}`,
        ...footerDesignationBlockStyle,
      },
    ],
  ]
}

export const getSignatureContent = async (
  author: Staff,
  dateCreated: Date,
): Promise<ContentTable> => {
  return {
    layout: 'noBorders',
    table: {
      widths: ['auto'],
      body: [await createSignatureContent(author, dateCreated)],
    } as Table,
    marginTop: MarginsPdfEnum.Margin20,
  }
}

export const getHtmlPdfContent = (content: string): string => {
  return getMainDataContent(handleUnexpectedSymbolsForHtmlToPDFMake(content))
}

export const getPdfNotesContentData = (content: string): string[] => {
  const noteStart = `Hello,` + `\n\n`
  const noteEnd = `\n\n` + `Sincerely,`

  const encounterNotesDataContent = getHtmlPdfContent(content)

  return [noteStart, encounterNotesDataContent, noteEnd]
}

export const getAddendumsContent = (
  addendums: PatientEncounterAddendum[] | PatientStaffNoteAddendum[],
): Content => {
  return {
    layout: 'noBorders',
    marginTop: 40,
    table: {
      widths: ['*'],
      body: addendums.map(
        (
          addendum: PatientEncounterAddendum | PatientStaffNoteAddendum,
          addendumPosition: number,
        ) => [
          {
            table: {
              widths: ['*'],
              body: [
                [{text: 'Addendum', bold: true}],
                [getHtmlPdfContent(addendum.note)],
                [
                  {
                    text: `Created on: ${dateTimeUtil.formatToZonedDateTimeWithAbbreviation({
                      date: addendum.createdAt,
                      timeFormat: TimeFormat.H24,
                    })} by ${getFullName(addendum.author?.firstName, addendum.author?.lastName)}`,
                    ...footerDesignationBlockStyle,
                    marginTop: 0,
                  },
                ],
              ],
            },
            layout: {
              hLineColor: () => ColorPalette.Green400,
              hLineWidth: (i: number) => (i === 0 && addendumPosition === 0 ? 1 : 0),
              vLineColor: () => ColorPalette.White,
              vLineWidth: () => 0,
              paddingLeft: () => 0,
              paddingTop: (i: number) => (i === 0 ? 40 : 24),
              paddingRight: () => 0,
              paddingBottom: () => 0,
            },
          },
        ],
      ),
    },
  }
}
