import {BulkDownloadRequest, Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {Content, CustomTableLayout, TDocumentDefinitions} from 'pdfmake/interfaces'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {getSignatureContent} from '../pdf-document/common/encounter-and-staff-notes.helper'
import {
  getSubHeader,
  PdfNotesType,
} from '@libs/services-common/helpers/pdf-kit-helpers/encounter-and-staff-notes-pdf-kit.helper'
import {NestprojectConfigService} from '@libs/common/services'
import {ColorPalette} from '@libs/services-common/enums'
import {getPatientAddressFormattedText} from '../patient.helper'

export const getCoverLetterReferralInfo = (bulkDownloadRequest: BulkDownloadRequest): Content => {
  const configService = NestprojectConfigService.getInstance()

  const referredBy = bulkDownloadRequest.coverLetterStaff
  const referredTo = bulkDownloadRequest.coverLetterExternalDoctor

  const referredToLabels = [`${referredTo.name}`]
  if (referredTo.clinicName) {
    referredToLabels.push(`${referredTo.clinicName}`)
  }

  referredToLabels.push(`Address: ${getPatientAddressFormattedText(referredTo)}`)

  if (referredTo.faxNumber) {
    referredToLabels.push(`Fax: ${referredTo.faxNumber}`)
  }

  return {
    lineHeight: 1.5,
    marginTop: 20,
    layout: 'noBorders',
    table: {
      widths: [430, '*'],
      body: [
        [
          {
            text: 'Referred To:',
            bold: true,
            marginBottom: 6,
          },
          {
            text: 'Referred By:',
            bold: true,
            marginBottom: 6,
            marginLeft: 6,
          },
        ],
        [
          {
            text: referredToLabels.join('\n'),
          },
          {
            text: `${referredBy.firstName} ${referredBy.lastName}${referredBy.cpso ? ` (CPSO #${referredBy.cpso})` : ''}\n${configService.get('CLINIC_BRAND_NAME')}`,
            marginLeft: 6,
          },
        ],
      ],
    },
  }
}

export const getCoverLetterReasonForReferral = (content: string): Content => {
  const layout: CustomTableLayout = {
    vLineColor: ColorPalette.White,
    hLineColor: (i: number) => {
      if (i == 1) {
        return ColorPalette.Green
      }

      return ColorPalette.White
    },
    hLineWidth: (i: number) => (i == 1 ? 2 : 0),
    paddingLeft: () => 0,
    paddingTop: (i: number) => (i == 0 ? 8 : 28),
    paddingRight: () => 0,
    paddingBottom: (i: number) => (i == 0 ? 8 : 20),
  }

  return {
    lineHeight: 1.5,
    layout: layout,
    marginTop: 35,
    table: {
      headerRows: 1,
      widths: ['*'],
      body: [
        [{text: 'Reason for referral', color: ColorPalette.Green600, bold: true}],
        [{text: content}],
      ],
    },
  }
}

export const getCoverLetterContent = (bulkDownloadRequest: BulkDownloadRequest): Content[] => {
  return [
    getCoverLetterReferralInfo(bulkDownloadRequest),
    getCoverLetterReasonForReferral(bulkDownloadRequest.coverLetterContent),
    {text: `\n\nSee relevant documents/results attached.\n\nSincerely,`, lineHeight: 1.5},
  ]
}

export async function getCoverLetterFileDefinition(payload: {
  bulkDownloadRequest: BulkDownloadRequest
  patient: Patient
  staff: Staff
  totalPages?: number
}): Promise<TDocumentDefinitions> {
  try {
    const {bulkDownloadRequest, patient, staff, totalPages} = payload

    if (!bulkDownloadRequest.coverLetterContent || !bulkDownloadRequest.coverLetterFilename) {
      return null
    }

    const [headerContent, subHeaderContent, signatureContent] = await Promise.all([
      getHeaderContent(patient),
      getSubHeader(PdfNotesType.CoverLetter),
      getSignatureContent(bulkDownloadRequest.coverLetterStaff, bulkDownloadRequest.createdAt),
    ])

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
      content: [getCoverLetterContent(bulkDownloadRequest), signatureContent],
      footer: (page, pageCount) =>
        getFooterContent(staff, {page, pageCount: totalPages ?? pageCount}),
      info: {title: bulkDownloadRequest.coverLetterFilename},
      defaultStyle: {
        font: setDefaultFont(),
        fontSize: 24,
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.BulkDownloadFunctions.GetCoverLetterFileDefinition,
      eventName: activityLogs.BulkDownloadActions.GetCoverLetterFileDefinitionFailed,
    })
  }
}
