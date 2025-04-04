import {checkMoreOrEqualZeroNotNullValue, DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {DefaultValue} from '@libs/common/enums'
import {TestResultObUltrasound} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {CervixTypeLabels} from '@libs/data-layer/apps/clinic-test/enums'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {Content, Table, TableCell} from 'pdfmake/interfaces'
import {
  tableLayoutCommonForUltrasound,
  tableLayoutCommonNoBordersForUltrasound,
} from './ultrasound-pdf-common.helper'
import {
  headerCellSecondaryStyle,
  tableBodyCellStyle,
  tableHeaderCellStyle,
} from './ultrasound-pdf-styles.helper'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const getObUltrasoundFindingsTableHeader = (): TableCell[] => [
  [{text: 'Type', ...tableHeaderCellStyle}],
  {
    text: 'Result',
    ...tableHeaderCellStyle,
  },
  {
    text: DefaultValue.Empty,
    ...tableHeaderCellStyle,
    noWrap: true,
  },
  {
    text: DefaultValue.Empty,
    ...tableHeaderCellStyle,
    noWrap: true,
  },
  {
    text: DefaultValue.Empty,
    ...tableHeaderCellStyle,
    noWrap: true,
  },
  {text: 'Unit', ...tableHeaderCellStyle},
]

const GATableRowValue = (obUltrasound: TestResultObUltrasound): TableCell[] => [
  {
    text: 'GA by',
    ...tableBodyCellStyle,
    marginLeft: MarginsPdfEnum.Margin28,
  },
  {
    text: obUltrasound?.gestationalAgeDlmpOrEdd || DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: obUltrasound?.gestationalAgeDate
      ? dateTimeUtil.formatBirthDate(obUltrasound.gestationalAgeDate)
      : DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: checkMoreOrEqualZeroNotNullValue(obUltrasound?.gestationalAgeWeeks)
      ? obUltrasound.gestationalAgeWeeks + ' weeks'
      : DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: checkMoreOrEqualZeroNotNullValue(obUltrasound?.gestationalAgeDays)
      ? obUltrasound?.gestationalAgeDays + ' days'
      : DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
]

const CRLTableRowValue = (obUltrasound: TestResultObUltrasound): TableCell[] => [
  {
    text: 'CRL',
    ...tableBodyCellStyle,
    marginLeft: MarginsPdfEnum.Margin28,
  },
  {
    text: obUltrasound?.crownRumpLengthLength
      ? obUltrasound.crownRumpLengthLength + ' cm'
      : DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: checkMoreOrEqualZeroNotNullValue(obUltrasound?.crownRumpLengthWeeks)
      ? obUltrasound.crownRumpLengthWeeks + ' weeks'
      : DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {
    text: checkMoreOrEqualZeroNotNullValue(obUltrasound?.crownRumpLengthDays)
      ? obUltrasound.crownRumpLengthDays + ' days'
      : DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {text: DefaultValue.Empty},
  {
    text: 'cm',
    ...tableBodyCellStyle,
  },
]

const FHRTableRowValue = (obUltrasound: TestResultObUltrasound): TableCell[] => [
  {
    text: 'FHR',
    ...tableBodyCellStyle,
    marginLeft: MarginsPdfEnum.Margin28,
  },
  {
    text: obUltrasound?.fetalHearthMotion || DefaultValue.LongDash,
    ...tableBodyCellStyle,
  },
  {text: DefaultValue.Empty},
  {text: DefaultValue.Empty},
  {text: DefaultValue.Empty},
  {
    text: 'bpm',
    ...tableBodyCellStyle,
  },
]

export const getObUltrasoundFindingsTableRowsValues = (
  obUltrasound: TestResultObUltrasound,
): TableCell[][] => [
  [
    {
      text: 'Findings',
      ...headerCellSecondaryStyle,
      marginBottom: MarginsPdfEnum.Margin16,
    },
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
  ],
  GATableRowValue(obUltrasound),
  [
    {
      text: 'No. of Gestational Sacs',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin28,
    },
    {
      text: checkMoreOrEqualZeroNotNullValue(obUltrasound?.numberOfGestationalSacs)
        ? obUltrasound?.numberOfGestationalSacs
        : DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {
      text: DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
  ],
  [
    {
      text: 'Mean Sac Diameter',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin28,
    },
    {
      text: obUltrasound?.minSacDiameter || DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {
      text: 'cm',
      ...tableBodyCellStyle,
    },
  ],
  [
    {
      text: 'Yolk Sac',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin28,
    },
    {
      text: obUltrasound?.yolkSec || DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {
      text: 'cm',
      ...tableBodyCellStyle,
    },
  ],
  CRLTableRowValue(obUltrasound),
  FHRTableRowValue(obUltrasound),
  [
    {
      text: 'Cervix',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin28,
    },
    {
      text: obUltrasound?.cervixLength ? obUltrasound.cervixLength + ' cm' : DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {
      text: obUltrasound?.cervixType
        ? CervixTypeLabels.get(obUltrasound.cervixType)
        : DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {text: DefaultValue.Empty},
    {text: DefaultValue.Empty},
    {
      text: DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
  ],
]

const contentRow = (title: string, value: string | number): Content[] => {
  return [
    {
      text: title,
      ...headerCellSecondaryStyle,
      marginBottom: MarginsPdfEnum.Margin20,
    },
    {
      text: value || DefaultValue.LongDash,
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin28,
      marginBottom: MarginsPdfEnum.Margin25,
    },
  ]
}

export const getObUltrasoundOpinionTableRowsValues = (
  obUltrasound: TestResultObUltrasound,
): TableCell[][] => [
  [
    {
      text: 'Single live intrauterine gestation of',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin28,
    },
    {
      text: DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {
      text: checkMoreOrEqualZeroNotNullValue(obUltrasound?.singleLiveGestationOfWeeks)
        ? obUltrasound.singleLiveGestationOfWeeks + ' weeks'
        : DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {
      text: checkMoreOrEqualZeroNotNullValue(obUltrasound?.singleLiveGestationOfDays)
        ? obUltrasound.singleLiveGestationOfDays + ' days'
        : DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
  ],
  [
    {
      text: 'EDC by this ultrasound is',
      ...tableBodyCellStyle,
      marginLeft: MarginsPdfEnum.Margin28,
    },
    {
      text: DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {
      text: obUltrasound?.estimatedDateOfConfinement
        ? dateTimeUtil.formatBirthDate(obUltrasound.estimatedDateOfConfinement)
        : DefaultValue.LongDash,
      ...tableBodyCellStyle,
    },
    {
      text: DefaultValue.Empty,
    },
  ],
]

export const createOBUltrasoundMainContent = (obUltrasound: TestResultObUltrasound): Content => {
  return [
    ...contentRow('Clinical History', obUltrasound?.clinicalHistory),
    ...contentRow('Comparison', obUltrasound?.comparison),
    {
      layout: tableLayoutCommonForUltrasound,
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [264, 160, 155, 120, 120, '*'],
        body: [
          getObUltrasoundFindingsTableHeader(),
          ...getObUltrasoundFindingsTableRowsValues(obUltrasound),
        ],
      } as Table,
      marginBottom: MarginsPdfEnum.Margin24,
    },
    ...contentRow('Right Ovary', obUltrasound?.rightOvary),
    ...contentRow('Left Ovary', obUltrasound?.leftOvary),
    ...contentRow('Adnexa', obUltrasound?.adnexaNote),
    ...contentRow('Free Fluid', obUltrasound?.freeFluidNote),
    [
      {
        text: 'Opinion',
        ...headerCellSecondaryStyle,
        marginBottom: MarginsPdfEnum.Margin18,
      },
      {
        layout: tableLayoutCommonNoBordersForUltrasound,
        table: {
          dontBreakRows: true,
          widths: [300, 160, 140, 120],
          body: [...getObUltrasoundOpinionTableRowsValues(obUltrasound)],
        } as Table,
        marginBottom: MarginsPdfEnum.Margin16,
      },
    ],
    ...contentRow('Follow-Up Recommendation', obUltrasound?.followUpRecommendation),
  ]
}
