import {
  Content,
  ContentImage,
  ContentTable,
  CustomTableLayout,
  Style,
  Table,
  TableCell,
} from 'pdfmake/interfaces'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ColorPalette, PatientAddressType} from '@libs/services-common/enums'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {NestprojectConfigService} from '@libs/common/services'
import {ClinicInfoService} from '@libs/services-common/services/clinic-info.service'
import {DateTimeUtil} from '@libs/common/utils'
import {DefaultValue} from '@libs/common/enums'
import {formatPhoneNumber} from '../phone-number.helper'
import {getPatientAddressFormattedText} from '@libs/services-common/helpers/pdf-kit-helpers/common/common-pdf.helper'
import {formatOhipNumber, formatOhipVersionCode} from '../patient-ohip.helper'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {getFullName} from '../patient.helper'
import {Nestproject_HEADER_LOGO} from '@libs/services-common/assets/assets.const'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil()
const clinicInfoService: ClinicInfoService = new ClinicInfoService(configService)

export const headerTextStyle: Style = {
  color: ColorPalette.Green800,
  fontSize: 24,
}

export const headerTextBoldStyle: Style = {
  ...headerTextStyle,
  bold: true,
}

export const headerAddressTextStyle: Style = {
  ...headerTextStyle,
  fontSize: 18,
}

export const getHeaderLogoImage = (): ContentImage => ({
  width: 165,
  image: Nestproject_HEADER_LOGO,
  margin: MarginsPdfEnum.Margin0,
  marginBottom: MarginsPdfEnum.Margin18,
})

const getHeaderTable = (patient: Patient): TableCell[] => {
  const DOB = patient?.dateOfBirth
    ? dateTimeUtil.formatBirthDate(patient.dateOfBirth)
    : DefaultValue.LongDash

  let SAB: string

  if (patient.sexAtBirth) {
    SAB = patient.sexAtBirth === SexAtBirth.Male ? 'M' : 'F'
  } else {
    SAB = DefaultValue.Dash
  }

  const patientPhoneNumber = formatPhoneNumber(patient.phoneNumber)

  const patientAddress = patient.patientAddresses?.find(
    (item) => item.type === PatientAddressType.Primary,
  )

  const patientAddressFormatted = patientAddress
    ? getPatientAddressFormattedText(patientAddress)
    : DefaultValue.LongDash

  const patientHealthCard = patient?.ohipCardNumber
    ? `${formatOhipNumber(patient.ohipCardNumber)}` +
      (patient?.ohipCardVersionCode
        ? `-${formatOhipVersionCode(patient.ohipCardVersionCode)}`
        : DefaultValue.Empty)
    : DefaultValue.LongDash

  return [
    [
      getHeaderLogoImage(),
      {...headerAddressTextStyle, text: clinicInfoService.getClinicInternalAddress()},
    ],
    [
      {
        marginBottom: MarginsPdfEnum.Margin16,
        text: [
          {...headerTextBoldStyle, text: 'Patient: '},
          {
            ...headerTextStyle,
            text: `${getFullName(patient.firstName, patient.lastName)} (${SAB})`,
          },
        ],
      },
      {
        marginBottom: MarginsPdfEnum.Margin16,
        text: [
          {...headerTextBoldStyle, text: 'Patient ID: '},
          {...headerTextStyle, text: `MRN: ${patient.patientIdentifier}`},
        ],
      },
      {
        marginBottom: MarginsPdfEnum.Margin16,
        text: [
          {...headerTextBoldStyle, text: 'DOB: '},
          {...headerTextStyle, text: `${DOB}`},
        ],
      },
      {
        text: [
          {...headerTextBoldStyle, text: 'MRP: '},
          {...headerTextStyle, text: `${patient?.serviceProvider?.title || DefaultValue.LongDash}`},
        ],
      },
    ],
    [
      {
        marginBottom: MarginsPdfEnum.Margin16,
        text: [
          {...headerTextBoldStyle, text: 'Health Card: '},
          {...headerTextStyle, text: `${patientHealthCard}`},
        ],
      },
      {
        marginBottom: MarginsPdfEnum.Margin16,
        text: [
          {...headerTextBoldStyle, text: 'Phone Number: '},
          {...headerTextStyle, text: `${patientPhoneNumber || DefaultValue.LongDash}`},
        ],
      },
      {
        text: [
          {...headerTextBoldStyle, text: 'Address: '},
          {...headerTextStyle, text: patientAddressFormatted},
        ],
      },
    ],
  ]
}

export const getContentBreaker = (): Content => {
  const headerTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i: number) => (i === 1 ? ColorPalette.Green400 : ColorPalette.White),
    hLineWidth: () => 1,
    vLineWidth: () => 0,
    paddingLeft: () => 0,
    paddingTop: () => 36,
    paddingRight: () => 0,
    paddingBottom: () => 36,
  }

  return {
    layout: headerTableLayout,
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: '',
            lineHeight: 0,
          },
        ],
        [
          {
            text: '',
            lineHeight: 0,
          },
        ],
      ],
    },
  }
}

export const getHeaderContent = async (patient: Patient): Promise<ContentTable> => {
  const headerTableLayout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i: number) => {
      return i == 1 ? ColorPalette.Green400 : ColorPalette.White
    },
    hLineWidth: () => 1,
    paddingLeft: () => 0,
    paddingTop: (i: number) => {
      if (i == 1) {
        return 24
      }
      return 0
    },
    paddingRight: () => 0,
    paddingBottom: (i: number) => {
      if (i == 0) {
        return 24
      }
      return 0
    },
  }

  return {
    layout: headerTableLayout,
    marginLeft: MarginsPdfEnum.Margin80,
    marginTop: MarginsPdfEnum.Margin80,
    marginRight: MarginsPdfEnum.Margin80,
    marginBottom: MarginsPdfEnum.Margin24,
    table: {
      headerRows: 1,
      widths: ['*', '*', '*'],
      body: [getHeaderTable(patient)],
    } as Table,
  }
}
