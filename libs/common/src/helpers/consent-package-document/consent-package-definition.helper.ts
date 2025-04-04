import {
  PatientConsentModule,
  PatientConsentPackage,
  PatientConsentPackageSignatory,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {Content, TDocumentDefinitions} from 'pdfmake/interfaces'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {getFooterContent} from '../pdf-document/pdf-footer.helper'
import {ColorPalette} from '@libs/services-common/enums'
import {getHtmlPdfContent} from '../pdf-document/common/encounter-and-staff-notes.helper'
import {getHeaderLogoImage, headerAddressTextStyle} from '../pdf-document/pdf-header.helper'
import {ClinicInfoService} from '@libs/services-common/services/clinic-info.service'
import {NestprojectConfigService} from '@libs/common/services'
import {getFullName} from '../patient.helper'
import {DateTimeUtil} from '@libs/common/utils'
import {formatPhoneNumber} from '../phone-number.helper'
import {noBorderNoPaddingTableLayout} from '../test-result-document/test-result-pdf/test-result-pdf.helper'
import {voidedBackground} from '../consent/voided.helper'
import {ConsentPackageStatus} from '@libs/data-layer/apps/users/enum'
import {
  ConsentQuestionAnswer,
  ConsentQuestionsBySignedPatient,
} from '@apps/emr/consents/services/consents-question.service'

const configService = NestprojectConfigService.getInstance()
const clinicInfoService: ClinicInfoService = new ClinicInfoService(configService)
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

async function getContent(
  consentPackage: PatientConsentPackage,
  consentQuestionsBySignedPatients: ConsentQuestionsBySignedPatient[],
): Promise<Content[]> {
  const signatories = consentPackage.signatories

  const content = [
    headerTable(signatories),
    ...menuDefinition(consentPackage),
    moduleContentDefinition(consentPackage.modules),
  ]

  //**Split signatories into arrays of 1 or 2 */
  const signatoriesArraysInTwo = Array.from({length: Math.ceil(signatories.length / 2)}, (_, i) =>
    signatories.slice(i * 2, i * 2 + 2),
  )

  signatoriesArraysInTwo.forEach((signatories) => {
    content.push(signatoriesTable(signatories, consentQuestionsBySignedPatients))
  })

  return content
}

async function getDefinition(
  content: Content[],
  fileName: string,
  status: ConsentPackageStatus,
): Promise<TDocumentDefinitions> {
  try {
    return {
      pageMargins: [80, 80, 80, 120],
      pageSize: {
        width: 1440,
        height: 1865,
      },
      content,
      header: () => (status === ConsentPackageStatus.Voided ? voidedBackground : null),
      footer: (page, pageCount) => getFooterContent(null, {page, pageCount}),
      info: {title: fileName},
      defaultStyle: {
        font: setDefaultFont(),
        fontSize: 24,
      },
    }
  } catch (error) {
    handleError(error, {
      functionName: activityLogs.TestResultFunctions.GetTestResultFileDefinition,
      eventName: activityLogs.TestResultActions.GetFileDefinitionPerSpecialWorkflowFailed,
    })
  }
}

const patientHeaderTable = (signatories: PatientConsentPackageSignatory[]): Content => {
  const patientsCount = signatories.length
  const patientInfoItem = (attr: string, value: string): Content => ({
    text: [
      {
        text: `${attr}: `,
        color: ColorPalette.Grey500,
      },
      {
        text: value,
      },
    ],
  })

  return {
    layout: {
      vLineWidth: () => 0,
      hLineWidth: () => 0,
      paddingLeft: () => (patientsCount === 1 ? 300 : 24),
      paddingBottom: () => 0,
      paddingTop: (i) => (i === 1 ? 16 : 0),
      paddingRight: () => 0,
    },
    fontSize: 20,
    lineHeight: 1.4,
    table: {
      widths: new Array(patientsCount).fill('*'),
      body: [
        [
          {
            text: 'Patients',
            bold: true,
            color: ColorPalette.Green,
            fontSize: 24,
            lineHeight: 1.1,
          },
          ...new Array((patientsCount || 1) - 1).fill({}),
        ],
        signatories.map(({signingPatient, contributionTitle}) => ({
          stack: [
            {
              text: [
                {
                  text: `${getFullName(signingPatient.firstName, signingPatient.lastName)} `,
                  bold: true,
                },
                {
                  text: `(${contributionTitle})`,
                  color: ColorPalette.Grey500,
                },
              ],
            },
            patientInfoItem('DOB', dateTimeUtil.formatBirthDate(signingPatient.dateOfBirth)),
            patientInfoItem('Phone', formatPhoneNumber(signingPatient.phoneNumber)),
            patientInfoItem('Email', formatPhoneNumber(signingPatient.email)),
          ],
        })),
      ],
    },
  }
}

const headerTable = (signatories: PatientConsentPackageSignatory[]): Content => {
  const patientsTableWidth = 1024

  return {
    layout: {
      vLineWidth: () => 0,
      hLineColor: (i: number) => (i === 1 ? ColorPalette.Green400 : ColorPalette.White),
      hLineWidth: (i: number) => (i === 1 ? 1 : 0),
      paddingLeft: () => 0,
      paddingTop: () => 0,
      paddingRight: () => 0,
      paddingBottom: () => 24,
    },
    table: {
      widths: ['*', patientsTableWidth],
      body: [
        [
          [
            getHeaderLogoImage(),
            {...headerAddressTextStyle, text: clinicInfoService.getClinicInternalAddress()},
          ],
          patientHeaderTable(signatories),
        ],
      ],
    },
    marginBottom: 24,
  }
}

const modulesContentBreaker = (padding = 20): Content => {
  return {
    layout: {
      vLineWidth: () => 0,
      hLineColor: (i: number) => (i === 1 ? ColorPalette.Grey : ColorPalette.White),
      hLineWidth: (i: number) => (i === 1 ? 1 : 0),
      paddingLeft: () => 0,
      paddingTop: () => padding,
      paddingRight: () => 0,
      paddingBottom: () => padding,
    },
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

const menuDefinition = (patientConsentPackage: PatientConsentPackage): Content[] => {
  return [
    {
      text: patientConsentPackage.title,
      fontSize: 36,
      lineHeight: 1.4,
      bold: true,
      marginBottom: 12,
    },
    {text: 'Consent Modules', fontSize: 24, lineHeight: 1.4, bold: true, color: ColorPalette.Green},
    {
      lineHeight: 1.4,
      fontSize: 20,
      layout: {
        vLineWidth: () => 0,
        hLineWidth: () => 0,
        paddingLeft: () => 16,
        paddingTop: () => 6,
        paddingRight: () => 16,
        paddingBottom: () => 6,
      },
      table: {
        widths: ['*'],
        body: patientConsentPackage.modules.map(({consentModule}) => [{text: consentModule.title}]),
      },
    },
  ]
}

const moduleContentDefinition = (consentModules: PatientConsentModule[]): Content => {
  return {
    lineHeight: 1.4,
    layout: 'noBorders',
    fontSize: 20,
    marginBottom: 44,
    table: {
      widths: ['*'],
      body: consentModules.flatMap(({consentModule}, index) => [
        [modulesContentBreaker(index === 0 ? 20 : 10)],
        [
          {
            text: consentModule.title,
            fontSize: 24,
            lineHeight: 1.1,
            bold: true,
            color: ColorPalette.Green,
            marginBottom: 10,
          },
        ],
        [getHtmlPdfContent(consentModule.content)],
      ]),
    },
  }
}

const questionTable = (consentQuestionAnswer: ConsentQuestionAnswer): Content => {
  return {
    fontSize: 20,
    lineHeight: 1.4,
    layout: {
      hLineColor: () => ColorPalette.Grey400,
      hLineWidth: (i) => (i === 0 ? 1 : 0),
      vLineWidth: () => 0,
      paddingLeft: () => 24,
      paddingRight: () => 24,
      paddingTop: (i) => (i == 0 ? 16 : 4),
      paddingBottom: (i, node) => (i === node.table.body.length - 1 ? 10 : 4),
    },
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: consentQuestionAnswer.title,
          },
        ],
        [
          {
            text: 'Answer',
            color: ColorPalette.Grey500,
          },
        ],
        [
          {
            marginLeft: 12,
            ul: consentQuestionAnswer.answers.map((answer) => ({text: answer})),
          },
        ],
      ],
    },
  }
}

const getSignature = (text: string): Content[] => [
  {
    font: 'AlexBrush',
    text: text ?? '|',
    opacity: text ? 1 : 0,
    fontSize: 35,
    lineHeight: 0.8,
  },
]

const signatureBlock = (signatory: PatientConsentPackageSignatory): Content => ({
  fillColor: ColorPalette.Alabaster,
  fontSize: 20,
  lineHeight: 1.4,
  layout: {
    hLineWidth: () => 0,
    vLineWidth: () => 0,
    paddingLeft: () => 16,
    paddingTop: () => 82,
    paddingRight: () => 16,
    paddingBottom: () => 18,
  },
  table: {
    widths: ['*'],
    body: [
      [
        {
          fontSize: 20,
          lineHeight: 1.4,
          layout: {
            hLineColor: () => ColorPalette.Dawn,
            hLineWidth: (i) => (i === 1 ? 0.5 : 0),
            vLineWidth: () => 0,
            paddingLeft: () => 0,
            paddingRight: () => 0,
            paddingTop: () => 16,
            paddingBottom: () => 0,
          },
          alignment: 'center',
          table: {
            widths: ['*'],
            body: [
              getSignature(signatory.signedText),
              [
                {
                  marginTop: 64,
                  text: signatory.signedDate
                    ? dateTimeUtil.formatBirthDate(signatory.signedDate)
                    : getFullName(
                        signatory.signingPatient.firstName,
                        signatory.signingPatient.lastName,
                      ),
                  bold: !Boolean(signatory.signedDate),
                },
              ],
              [
                {
                  text: signatory.signedLocation
                    ? `Location: ${signatory.signedLocation}`
                    : 'Consent not yet completed by partner',
                  color: ColorPalette.Grey800,
                },
              ],
            ],
          },
        },
      ],
    ],
  },
})

const signatoryCell = (
  signatory: PatientConsentPackageSignatory,
  consentQuestionsBySignedPatients: ConsentQuestionsBySignedPatient[],
): Content[] => {
  const signingPatient = signatory.signingPatient
  const consentQuestionsBySignedPatient = consentQuestionsBySignedPatients.find(
    (consentQuestion) => consentQuestion.signingPatientId == signingPatient.id,
  )
  const consentQuestionAnswers = consentQuestionsBySignedPatient?.questions || []

  return [
    {
      fontSize: 20,
      lineHeight: 1.4,
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        paddingLeft: () => 0,
        paddingTop: (i) => (i == 0 || i == 1 ? 16 : 0),
        paddingRight: () => 0,
        paddingBottom: (i) => (i == 1 ? 16 : 0),
        fillColor: () => ColorPalette.Tertiary,
      },
      table: {
        dontBreakRows: true,
        widths: [16, '*', 16],
        headerRows: 2,
        keepWithHeaderRows: 1,
        body: [
          [
            {},
            {
              text: getFullName(signingPatient.firstName, signingPatient.lastName),
              fontSize: 24,
              bold: true,
              lineHeight: 1.3,
            },
            {},
          ],
          [
            {},
            {
              text: `(${signatory.contributionTitle})`,
              color: ColorPalette.Grey500,
            },
            {},
          ],

          ...(consentQuestionAnswers?.length == 0
            ? []
            : consentQuestionAnswers.map((question) => [{}, questionTable(question), {}])),

          [{}, signatureBlock(signatory), {}],
        ],
      },
    },
    {
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        paddingLeft: () => 0,
        paddingTop: () => 0,
        paddingRight: () => 0,
        paddingBottom: () => 0,
        fillColor: () => ColorPalette.Tertiary,
      },
      marginBottom: 0,
      marginTop: 0,
      table: {
        widths: ['*'],
        body: [
          [
            {
              text: '',
              marginBottom: 8,
              marginTop: 8,
              lineHeight: 0,
            },
          ],
        ],
      },
    },
  ]
}

const signatoriesTable = (
  signatories: PatientConsentPackageSignatory[],
  consentQuestionsBySignedPatients: ConsentQuestionsBySignedPatient[],
): Content => {
  if (signatories?.length <= 0) {
    return {text: ''}
  }

  return signatories.length == 1
    ? {
        layout: noBorderNoPaddingTableLayout(),
        table: {
          widths: [322, '*', 322],
          body: [[{}, signatoryCell(signatories[0], consentQuestionsBySignedPatients), {}]],
        },
        marginBottom: 16,
      }
    : {
        layout: noBorderNoPaddingTableLayout(),
        table: {
          widths: ['*', 8, '*'],
          body: [
            [
              signatoryCell(signatories[0], consentQuestionsBySignedPatients),
              {},
              signatoryCell(signatories[1], consentQuestionsBySignedPatients),
            ],
          ],
        },
        marginBottom: 16,
      }
}

export const ConsentPackageFileHelpers = {
  getDefinition,
  getContent,
}
