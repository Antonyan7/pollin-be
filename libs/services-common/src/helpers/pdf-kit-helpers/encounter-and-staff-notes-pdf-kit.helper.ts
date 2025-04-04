import {
  Nestproject_SUB_HEADER_COVER_LETTER_LOGO,
  Nestproject_SUB_HEADER_ENCOUNTER_LOGO,
  Nestproject_SUB_HEADER_EPL_WORKSHEET_LOGO,
  Nestproject_SUB_HEADER_HCG_WORKSHEET_LOGO,
  Nestproject_SUB_HEADER_OB_WORKSHEET_LOGO,
  Nestproject_SUB_HEADER_PRIMING_WORKSHEET_LOGO,
  Nestproject_SUB_HEADER_STAFF_NOTES_LOGO,
  Nestproject_SUB_HEADER_STIM_SHEET_LOGO,
  Nestproject_SUB_HEADER_THYROID_WORKSHEET_LOGO,
} from '@libs/services-common/assets/assets.const'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {Content, ContentImage, ContentSvg} from 'pdfmake/interfaces'
import {JSDOMProvider} from './common/jsdom-provider'

const ENCOUNTER_NOTES_SUB_HEADER_WIDTH = 555
const COVER_LETTER_SUB_HEADER_WIDTH = 250
const STAFF_NOTES_SUB_HEADER_WIDTH = 394

export enum PdfNotesType {
  Encounter = 'Encounter',
  CoverLetter = 'CoverLetter',
  Staff = 'Staff',
  WorksheetHCG = 'WorksheetHCG',
  WorksheetEPL = 'WorksheetEPL',
  WorksheetOB = 'WorksheetOB',
  WorksheetStimulation = 'WorksheetStimulation',
  WorksheetPriming = 'WorksheetPriming',
  WorksheetThyroid = 'WorksheetThyroid',
}

const getSubHeaderLogoPNG = (width: number, imageBase64: string): ContentImage => ({
  width,
  image: imageBase64,
  marginLeft: MarginsPdfEnum.Margin80,
  marginBottom: MarginsPdfEnum.Margin40,
})

const getSubHeaderLogoSVG = (width: number, svgCode: string, marginBottom = 0): ContentSvg => ({
  width,
  svg: svgCode,
  marginLeft: MarginsPdfEnum.Margin80,
  marginBottom,
})

export const getSubHeader = async (type: PdfNotesType): Promise<Content> => {
  switch (type) {
    case PdfNotesType.Encounter:
      return getSubHeaderLogoPNG(ENCOUNTER_NOTES_SUB_HEADER_WIDTH, Nestproject_SUB_HEADER_ENCOUNTER_LOGO)
    case PdfNotesType.CoverLetter:
      return getSubHeaderLogoSVG(
        COVER_LETTER_SUB_HEADER_WIDTH,
        Nestproject_SUB_HEADER_COVER_LETTER_LOGO,
        MarginsPdfEnum.Margin40,
      )
    case PdfNotesType.Staff:
      return getSubHeaderLogoPNG(STAFF_NOTES_SUB_HEADER_WIDTH, Nestproject_SUB_HEADER_STAFF_NOTES_LOGO)
    case PdfNotesType.WorksheetHCG:
      return getSubHeaderLogoSVG(487, Nestproject_SUB_HEADER_HCG_WORKSHEET_LOGO)
    case PdfNotesType.WorksheetEPL:
      return getSubHeaderLogoSVG(297, Nestproject_SUB_HEADER_EPL_WORKSHEET_LOGO)
    case PdfNotesType.WorksheetOB:
      return getSubHeaderLogoSVG(432, Nestproject_SUB_HEADER_OB_WORKSHEET_LOGO)
    case PdfNotesType.WorksheetStimulation:
      return getSubHeaderLogoSVG(504, Nestproject_SUB_HEADER_STIM_SHEET_LOGO)
    case PdfNotesType.WorksheetPriming:
      return getSubHeaderLogoSVG(380, Nestproject_SUB_HEADER_PRIMING_WORKSHEET_LOGO)
    case PdfNotesType.WorksheetThyroid:
      return getSubHeaderLogoSVG(330, Nestproject_SUB_HEADER_THYROID_WORKSHEET_LOGO)
  }
}

export const getMainDataContent = (content: string): string => {
  return JSDOMProvider.getContent(content)
}
