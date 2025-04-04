import {isE2E, NestprojectConfigService} from '@libs/common'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {DefaultValue} from '@libs/common/enums'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {ColorPalette} from '@libs/services-common/enums'
import {Content, ContentImage, Style, TableCell} from 'pdfmake/interfaces'

const configService = NestprojectConfigService.getInstance()

const firebaseStorageAdapter = new FirebaseStorageAdapter(
  configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
)

export const rowMarginBottom = {marginBottom: MarginsPdfEnum.Margin7}
export const rowMarginBottomV2 = {marginBottom: MarginsPdfEnum.Margin4}

export const tableBodyCellStyle: Style = {
  fontSize: 16,
  color: ColorPalette.Green800,
  bold: false,
  alignment: 'left',
}

export const tableBodyCellSecondaryStyle: Style = {
  ...tableBodyCellStyle,
  fontSize: 14,
}

export const logoImageStyle: ContentImage = {
  image: '',
  width: 380,
}

/** @deprecated */
export const getFileHeader = (
  clinicInternalAddress: string,
  logoImage: ContentImage,
): TableCell[] => {
  return [
    {
      ...logoImage,
    },
    {
      text: DefaultValue.Empty,
    },
    {
      ...tableBodyCellSecondaryStyle,
      text: clinicInternalAddress,
      alignment: 'right',
    },
  ]
}

export const setDefaultFont = (): string => (!isE2E() ? 'Geomanist' : 'Roboto')

export const getSignatureImageTableCell = async (signatureImageUrl: string): Promise<Content> => {
  const imageBase64 = await firebaseStorageAdapter.getImageBase64ByUrl(signatureImageUrl)

  if (!imageBase64) {
    return null
  }

  const signatureTableCellContent = {
    image: imageBase64,
    width: 240,
    marginTop: MarginsPdfEnum.Margin40,
  }

  return Promise.resolve(signatureTableCellContent)
}

export const handleUnexpectedSymbolsForHtmlToPDFMake = (note: string): string => {
  return note
    .replaceAll('<p>&nbsp;</p>', '<span><br></span>')
    .replaceAll('&nbsp;', '<span> </span>')
    .replaceAll('&ensp;', '<span> </span>')
    .replaceAll(' ', '<span> </span>')
    .replaceAll('<br />', '<span><br></span>')
}
