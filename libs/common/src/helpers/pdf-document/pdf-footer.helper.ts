import {DateTimeUtil} from '@libs/common/utils'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette} from '@libs/services-common/enums'
import {ContentTable, Style, Table} from 'pdfmake/interfaces'
import {getFullName} from '../patient.helper'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

const footerPrimaryTextStyle: Style = {
  fontSize: 22,
  color: ColorPalette.Green800,
  noWrap: true,
}

const footerPrimaryTextBoldStyle: Style = {
  ...footerPrimaryTextStyle,
  bold: true,
}

export const getFooterContent = (
  staff: Staff,
  pagination: {
    page: number
    pageCount: number
    firstPage?: number
  },
): ContentTable => {
  const {page, pageCount, firstPage} = pagination

  const firstPageNumber = firstPage ?? 1

  const paginationContent = {
    ...footerPrimaryTextStyle,
    alignment: 'right',
    text: `${page + firstPageNumber - 1}/${pageCount}`,
  }

  const content = staff
    ? [
        {
          text: [
            {...footerPrimaryTextBoldStyle, text: 'Printed by: '},
            {...footerPrimaryTextStyle, text: `${getFullName(staff?.firstName, staff?.lastName)}`},
          ],
        },
        {
          ...footerPrimaryTextStyle,
          alignment: 'center',
          text: dateTimeUtil.formatToZonedDateTimeWithAbbreviation({
            date: dateTimeUtil.now(),
          }),
        },
        paginationContent,
      ]
    : [{}, {}, paginationContent]

  return {
    layout: 'noBorders',
    marginLeft: MarginsPdfEnum.Margin80,
    marginTop: MarginsPdfEnum.Margin30,
    marginRight: MarginsPdfEnum.Margin80,
    marginBottom: MarginsPdfEnum.Margin70,
    table: {
      widths: ['*', '*', '*'],
      body: [content],
    } as Table,
  }
}
