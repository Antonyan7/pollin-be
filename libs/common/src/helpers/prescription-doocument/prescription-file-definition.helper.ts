import {
  createPatientMedicationsTable,
  footerAuthorSignatureLabelStyle,
  footerDesignationLabelStyle,
  footerSignatureBlockStyle,
  getPrescriberFileContent,
  getPrescriptionSubHeader,
} from '@libs/services-common/helpers/pdf-kit-helpers/prescription-pdf-kit.helper'
import {
  getSignatureImageTableCell,
  setDefaultFont,
} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {Content, TDocumentDefinitions} from 'pdfmake/interfaces'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {DefaultValue} from '@libs/common/enums'
import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {Patient, PatientMedication} from '@libs/data-layer/apps/users/entities/typeorm'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {getHeaderContent} from '../pdf-document/pdf-header.helper'
import {noBorderNoPaddingTableLayout} from '../test-result-document/test-result-pdf/test-result-pdf.helper'

export const createSignatureContent = async (prescriber: Staff): Promise<Content> => {
  const signImageContent = await getSignatureImageTableCell(prescriber?.signatureURL)

  const signatureContent = signImageContent ?? {
    text: 'x ____________________________________________',
    ...footerSignatureBlockStyle,
    fontSize: 20,
    marginTop: MarginsPdfEnum.Margin150,
    marginBottom: MarginsPdfEnum.Margin20,
  }

  return [
    [
      signatureContent,
      {
        text: `${prescriber.firstName} ${prescriber.lastName}`,
        ...footerAuthorSignatureLabelStyle,
      },
      {
        ...footerDesignationLabelStyle,
        text: prescriber.serviceProvider?.designation ?? DefaultValue.Empty,
      },
    ],
  ]
}

export async function getPrescriptionFileContent(
  patientPrescription: PatientPrescription,
  patientMedications: PatientMedication[],
): Promise<Content[]> {
  try {
    const [prescriberData, medicationsTable, signatureContent] = await Promise.all([
      getPrescriberFileContent(patientPrescription),
      createPatientMedicationsTable(patientMedications),
      createSignatureContent(patientPrescription.prescriber),
    ])

    return [
      {
        layout: noBorderNoPaddingTableLayout(),
        table: {
          headerRows: 1,
          widths: ['*'],
          body: [[prescriberData], [medicationsTable], [signatureContent]],
        },
      },
    ]
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.PrescriptionsFunctions.GetPrescriptionFileContent,
      eventName: activityLogs.PrescriptionsActions.GetPrescriptionFileContentFailed,
    })
  }
}

export async function getPrescriptionFileDefinition(data: {
  patient: Patient
  staff: Staff
  content: Content[]

  firstPage?: number
  totalPages?: number
}): Promise<TDocumentDefinitions> {
  try {
    const {patient, staff, content, firstPage, totalPages} = data

    const headerContent = await getHeaderContent(patient)
    const subHeaderContent = await getPrescriptionSubHeader()

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
      info: {title: 'prescription.pdf'},
      defaultStyle: {
        font: setDefaultFont(),
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.PrescriptionsFunctions.GetPrescriptionFileDefinition,
      eventName: activityLogs.PrescriptionsActions.GetPrescriptionFileDefinitionFailed,
    })
  }
}
