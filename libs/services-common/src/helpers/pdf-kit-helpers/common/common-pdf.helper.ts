import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {FirebaseAuthAdapter} from '@libs/common/adapters'
import {DefaultValue} from '@libs/common/enums'
import {formatOhipNumber, formatOhipVersionCode} from '@libs/common/helpers/patient-ohip.helper'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {formatPhoneNumber, getPhoneNumber} from '@libs/common/helpers/phone-number.helper'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {Patient, PatientAddress} from '@libs/data-layer/apps/users/entities/typeorm'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette, PatientAddressType} from '@libs/services-common/enums'
import {ClinicInfoService} from '@libs/services-common/services/clinic-info.service'
import {UserRecord} from 'firebase-admin/auth'
import {
  ContentImage,
  ContentTable,
  CustomTableLayout,
  Style,
  Table,
  TableCell,
} from 'pdfmake/interfaces'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
const clinicInfoService: ClinicInfoService = new ClinicInfoService(configService)

export const tableBodyCellStyle: Style = {
  fontSize: 24,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'left',
}

export const tableBodyCellSecondaryStyle: Style = {
  ...tableBodyCellStyle,
  fontSize: 28,
}

export const tableHeaderCellSecondaryStyle: Style = {
  fontSize: 28,
  color: ColorPalette.Green800,
  bold: true,
  alignment: 'left',
  noWrap: true,
}

export const footerDesignationBlockStyle: Style = {
  fontSize: 20,
  color: ColorPalette.Grey500,
  alignment: 'left',
}

export const footerAuthorLabelStyle: Style = {
  ...footerDesignationBlockStyle,
  color: ColorPalette.Green800,
  bold: true,
}

/** @deprecated */
export const concatLogoAndClinicAddress = (
  logoImage: ContentImage,
  clinicInternalAddress: string,
): TableCell[] => {
  return [
    {
      ...logoImage,
      marginLeft: MarginsPdfEnum.Margin80,
      marginTop: MarginsPdfEnum.Margin80,
    },
    {
      text: DefaultValue.Empty,
    },
    {
      ...tableBodyCellStyle,
      text: clinicInternalAddress,
      alignment: 'right',
      marginTop: MarginsPdfEnum.Margin80,
      marginRight: MarginsPdfEnum.Margin80,
      fontSize: 24,
    },
  ]
}

/** @deprecated */
export const createFileHeaderAndAddressTable = (logoImage: ContentImage): ContentTable => {
  return {
    layout: 'noBorders',
    marginBottom: MarginsPdfEnum.Margin24,
    table: {
      widths: ['auto', '*', 'auto'],
      body: [concatLogoAndClinicAddress(logoImage, clinicInfoService.getClinicInternalAddress())],
    } as Table,
  }
}

export const getPatientPhoneNumberForPDF = async (patientAuthUserId: string): Promise<string> => {
  if (!patientAuthUserId) {
    return null
  }

  const firebaseAuthAdapter: FirebaseAuthAdapter = new FirebaseAuthAdapter()
  const userInfo: UserRecord = await firebaseAuthAdapter.getAuthUserById(patientAuthUserId)

  return userInfo?.multiFactor?.enrolledFactors?.length
    ? formatPhoneNumber(getPhoneNumber(userInfo))
    : null
}

export const getPatientAddressFormattedText = (patientAddress: PatientAddress): string => {
  return (
    `${patientAddress.streetAddress}` +
    (patientAddress.unitNumber ? `, ${patientAddress.unitNumber}` : DefaultValue.Empty) +
    `,\n${patientAddress.city}, ${patientAddress.province} ${patientAddress.postalCode}`
  )
}

/** @deprecated */
const getPatientTableRowData = async (patient: Patient): Promise<TableCell[]> => {
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
      {
        text: 'Patient',
        ...tableHeaderCellSecondaryStyle,
        marginBottom: MarginsPdfEnum.Margin12,
      },
      {
        text: getFullName(patient.firstName, patient.lastName),
        ...tableBodyCellSecondaryStyle,
        marginRight: MarginsPdfEnum.Margin10,
        marginBottom: MarginsPdfEnum.Margin12,
      },
      {
        text: `${DOB} ${SAB}`,
        ...tableBodyCellSecondaryStyle,
      },
    ],
    [
      {
        text: 'Phone Number',
        ...tableHeaderCellSecondaryStyle,
        marginBottom: MarginsPdfEnum.Margin12,
      },
      {
        text: `${patientPhoneNumber || DefaultValue.LongDash}`,
        ...tableBodyCellSecondaryStyle,
      },
    ],
    [
      {text: 'Address', ...tableHeaderCellSecondaryStyle, marginBottom: MarginsPdfEnum.Margin12},
      {
        text: patientAddressFormatted,
        ...tableBodyCellSecondaryStyle,
      },
    ],
    [
      {
        text: 'Health Card',
        ...tableHeaderCellSecondaryStyle,
        marginBottom: MarginsPdfEnum.Margin12,
        alignment: 'right',
      },
      {
        text: patientHealthCard,
        ...tableBodyCellSecondaryStyle,
        alignment: 'right',
      },
    ],
  ]
}

/** @deprecated */
export const createPatientTable = async (patient: Patient): Promise<ContentTable> => {
  const patientInfoTable: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: () => ColorPalette.White,
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
    layout: patientInfoTable,
    marginLeft: MarginsPdfEnum.Margin80,
    marginRight: MarginsPdfEnum.Margin80,
    marginBottom: MarginsPdfEnum.Margin28,
    table: {
      headerRows: 1,
      widths: ['*', '*', '*', '*'],
      body: [await getPatientTableRowData(patient)],
    } as Table,
  }
}
