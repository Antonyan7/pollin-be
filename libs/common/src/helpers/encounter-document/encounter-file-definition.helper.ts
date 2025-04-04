import {Patient, PatientEncounter} from '@libs/data-layer/apps/users/entities/typeorm'
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

async function getEncounterFileContent(
  patientEncounter: PatientEncounter,
  includeAddendums: boolean,
): Promise<Content[]> {
  const encounterNotesContent = getPdfNotesContentData(patientEncounter.note)
  const signatureContent = await getSignatureContent(
    patientEncounter.author,
    patientEncounter.createdAt,
  )

  const content: Content[] = [encounterNotesContent, signatureContent]

  if (includeAddendums && patientEncounter.addendums?.length) {
    content.push(getAddendumsContent(patientEncounter.addendums))
  }

  return content
}

async function getEncounterFileDefinition(payload: {
  patient: Patient
  staff: Staff
  content: Content[]
  firstPage?: number
  totalPages?: number
}): Promise<TDocumentDefinitions> {
  try {
    const {staff, content, patient, firstPage, totalPages} = payload
    const headerContent = await getHeaderContent(patient)
    const subHeaderContent = await getSubHeader(PdfNotesType.Encounter)

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
      info: {title: 'encounter_notes.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
        fontSize: 24, // default font size for encounter note pdf
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetTestResultFileDefinition,
      eventName: activityLogs.TestResultActions.GetFileDefinitionPerSpecialWorkflowFailed,
    })
  }
}

export const EncounterFileDefintionHelpers = {
  getEncounterFileDefinition,
  getEncounterFileContent,
}
