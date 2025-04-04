import {Patient, PatientStaffNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {Content, TDocumentDefinitions} from 'pdfmake/interfaces'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {
  getAddendumsContent,
  getPdfNotesContentData,
  getSignatureContent,
} from '../pdf-document/common/encounter-and-staff-notes.helper'
import {
  getSubHeader,
  PdfNotesType,
} from '@libs/services-common/helpers/pdf-kit-helpers/encounter-and-staff-notes-pdf-kit.helper'

async function getStaffNoteFileContent(
  patientStaffNote: PatientStaffNote,
  includeAddendums?: boolean,
): Promise<Content[]> {
  try {
    const staffNoteNotesContent = getPdfNotesContentData(patientStaffNote.note)
    const signatureContent = await getSignatureContent(
      patientStaffNote.author,
      patientStaffNote.createdAt,
    )

    const content: Content[] = [staffNoteNotesContent, signatureContent]

    if (includeAddendums && patientStaffNote.addendums?.length) {
      content.push(getAddendumsContent(patientStaffNote.addendums))
    }

    return content
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.ClinicDownloadsFunctions.GetStaffNoteFileContent,
      eventName: activityLogs.ClinicDownloadsActions.GetStaffNoteFileContentFaield,
    })
  }
}

async function getStaffNoteFileDefinition(payload: {
  patient: Patient
  staff: Staff
  content: Content[]
  firstPage?: number
  totalPages?: number
}): Promise<TDocumentDefinitions> {
  try {
    const {patient, content, staff, totalPages, firstPage} = payload

    const [headerContent, subHeaderContent] = await Promise.all([
      getHeaderContent(patient),
      getSubHeader(PdfNotesType.Staff),
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
      content,
      footer: (page, pageCount) =>
        getFooterContent(staff, {page, pageCount: totalPages ?? pageCount, firstPage}),
      info: {title: 'staff_note_notes.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
        fontSize: 24,
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.ClinicDownloadsFunctions.GetStaffNoteFileDefinition,
      eventName: activityLogs.ClinicDownloadsActions.GetStaffNoteFileDefinitionFailed,
    })
  }
}

export const StaffNoteFileDefintionHelpers = {
  getStaffNoteFileDefinition,
  getStaffNoteFileContent,
}
