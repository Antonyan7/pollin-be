import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {Content, TableCell, TDocumentDefinitions} from 'pdfmake/interfaces'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {PatientEggFreezingReport} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ColorPalette} from '@libs/services-common/enums'
import {ContentTable, Table, Style} from 'pdfmake/interfaces'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export function getEggFreezingPDFContent(
  eggFreezingReport: PatientEggFreezingReport,
  patient: Patient,
): Content {
  const firstLinesContent: Content = [
    {
      text: 'Egg Freezing Report',
      fontSize: 48,
      color: ColorPalette.Green,
      lineHeight: 1.1,
      marginBottom: MarginsPdfEnum.Margin65,
    },
    {
      text: 'Your egg freezing outcome',
      fontSize: 36,
      color: ColorPalette.Green800,
      lineHeight: 1.1,
      marginBottom: MarginsPdfEnum.Margin32,
    },
    {
      text: `This report provides details about mature egg(s) that were cryopreserved following your egg collection procedure.`,
      fontSize: 24,
      color: ColorPalette.Green800,
      lineHeight: 1.4,
      marginBottom: MarginsPdfEnum.Margin30,
    },
  ]

  const contentDateOfEggCollection = getContentLineWithLabelAndBoldResults(
    'Date of Egg Collection Procedure: ',
    dateTimeUtil.formatBirthDate(dateTimeUtil.toDate(eggFreezingReport.eggCollectionDate)),
  )

  const contentDoctor = getContentLineWithLabelAndBoldResults(
    'Doctor: ',
    patient.serviceProvider?.title ?? DefaultValue.Dash,
  )

  const contentFrozenDaysTable = getFrozenDaysValue(eggFreezingReport)

  return [firstLinesContent, contentDateOfEggCollection, contentDoctor, contentFrozenDaysTable]
}

export const getFrozenDaysValue = (eggFreezingReport: PatientEggFreezingReport): ContentTable => {
  const frozenDayHeader: Style = {
    fontSize: 24,
    lineHeight: 1.4,
    color: ColorPalette.Green,
    noWrap: true,
    alignment: 'center',
    marginBottom: MarginsPdfEnum.Margin8,
    marginTop: MarginsPdfEnum.Margin24,
    marginLeft: MarginsPdfEnum.Margin90,
    marginRight: MarginsPdfEnum.Margin90,

    fillColor: ColorPalette.Dew,
  }

  const frozenDayValue: Style = {
    fontSize: 64,
    lineHeight: 1.2,
    color: ColorPalette.Green800,
    noWrap: true,
    alignment: 'center',
    marginBottom: MarginsPdfEnum.Margin24,
    bold: true,

    fillColor: ColorPalette.Dew,
  }

  const contentHeader: TableCell = [
    {
      ...frozenDayHeader,
      text: 'Eggs frozen on Day 0',
    },
    {},
    {
      ...frozenDayHeader,
      text: 'Eggs frozen on Day 1',
    },
    {},
    {
      ...frozenDayHeader,
      text: 'Total Eggs frozen',
    },
  ]

  const contentValues: TableCell = [
    {
      ...frozenDayValue,
      text: eggFreezingReport.eggsFrozenOnDay0 ?? 0,
    },
    {},
    {
      ...frozenDayValue,
      text: eggFreezingReport.eggsFrozenOnDay1 ?? 0,
    },
    {},
    {
      ...frozenDayValue,
      text: (eggFreezingReport.eggsFrozenOnDay0 ?? 0) + (eggFreezingReport.eggsFrozenOnDay1 ?? 0),
    },
  ]

  return {
    layout: 'noBorders',
    table: {
      widths: ['*', 24, '*', 24, '*'],
      body: [contentHeader, contentValues],
    } as Table,
  }
}

const getContentLineWithLabelAndBoldResults = (
  firstPartLabel: string,
  secondPartBoldValue: string,
): ContentTable => {
  const commonStyle: Style = {
    fontSize: 24,
    lineHeight: 1.4,
  }

  const valuesContent: Content = [
    {
      text: [
        {
          ...commonStyle,
          text: firstPartLabel,
          color: ColorPalette.Green,
        },
        {
          ...commonStyle,
          text: secondPartBoldValue,
          color: ColorPalette.Green800,
        },
      ],

      noWrap: true, //to avoid add new line for date for some reason

      marginLeft: MarginsPdfEnum.Margin16,
      marginTop: MarginsPdfEnum.Margin16,
      marginRight: MarginsPdfEnum.Margin16,
    },
  ]

  return {
    layout: 'noBorders',
    fillColor: ColorPalette.Dew,
    marginBottom: MarginsPdfEnum.Margin32,
    table: {
      headerRows: 1,
      widths: ['auto'],
      body: [[valuesContent]],
    } as Table,
  }
}

export async function createEggFreezingPDF(
  eggFreezingReport: PatientEggFreezingReport,
  patient: Patient,
  staff: Staff, //in this case it patient.serviceProvider.staffUser
): Promise<TDocumentDefinitions> {
  try {
    const headerContent = await getHeaderContent(patient)

    const content = await getEggFreezingPDFContent(eggFreezingReport, patient)

    const fileDefinition: TDocumentDefinitions = {
      pageMargins: [
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin320,
        MarginsPdfEnum.Margin80,
        MarginsPdfEnum.Margin120,
      ],
      pageSize: {
        width: 1440,
        height: 1865,
      },
      header: () => [headerContent],
      content: [content],
      footer: (page, pageCount) => getFooterContent(staff, {page, pageCount}),
      info: {title: 'egg-freezing.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
      },
    }

    return fileDefinition
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.PatientEggFreezingReportFunctions.CreateEggFreezingPDF,
      eventName: activityLogs.PatientEggFreezingReportActions.InternalError,
    })
  }
}
