import {StreamableFile} from '@nestjs/common'
import {
  PdfCreatorService,
  setFontFamilyForPrinterMockData,
} from '@libs/services-common/services/pdf-creator.service'
import {transportFolderToBeUpdatedFixture} from '@libs/common/test/fixtures/transport-folder.fixture'
import * as path from 'path'

import {ContentImage, ContentTable, TDocumentDefinitions} from 'pdfmake/interfaces'
import {
  composeLabsTrackTable,
  getContentHeader,
  getContentImage,
} from '@apps/lis/transport/helper/transport-pdf.helper'
import {Nestproject_LOGO_BASE64_PNG} from '@libs/services-common/assets/assets.const'
import {LabInfo, Specimen} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  labInfoFixture,
  labInfoSecondFixture,
  patientEmailVerifiedFixture,
  specimenToBeUpdatedForTransportFolderFixture,
} from '@libs/common/test/fixtures'
import {composePatientDataTable} from '@libs/services-common/helpers/pdf-kit-helpers/transport-pdf-kit.helper'
import {setDefaultFont} from '@libs/services-common/helpers/pdf-kit-helpers/pdf-kit-common.helper'
import {WriteAndReadFile} from '@libs/common/utils/pdf.util'

const contentImage: ContentImage = getContentImage(Nestproject_LOGO_BASE64_PNG)

const contentHeader: ContentTable = getContentHeader(
  transportFolderToBeUpdatedFixture.name,
  transportFolderToBeUpdatedFixture.identifier,
)
const labInternal: LabInfo = labInfoSecondFixture as LabInfo
const labExternal: LabInfo = labInfoFixture as LabInfo
const labsTrackTable: ContentTable = composeLabsTrackTable(labInternal, labExternal)
const patientDataTable: ContentTable = composePatientDataTable([
  {
    ...specimenToBeUpdatedForTransportFolderFixture,
    patient: patientEmailVerifiedFixture,
  } as Specimen,
])
const fileName = 'transport_manifest.pdf'
const folderName = 'transport-manifest'
const fileDefinitionDownloadManifest: TDocumentDefinitions = {
  pageMargins: [80, 80],
  pageSize: {
    width: 1146,
    height: 1591,
  },
  content: [contentImage, contentHeader, labsTrackTable, patientDataTable],
  info: {title: fileName},
  defaultStyle: {
    font: setDefaultFont(),
  },
}

describe('PdfCreatorService', () => {
  let pdfCreatorService: PdfCreatorService

  beforeAll(() => {
    const spyOn = jest.spyOn(PdfCreatorService.prototype, 'setFontFamilyForPrinter')
    spyOn.mockReturnValue(setFontFamilyForPrinterMockData)
    pdfCreatorService = new PdfCreatorService()
  })

  it('should generate transport manifest pdf successfully', async () => {
    const {streamable} = await pdfCreatorService.generatePdfStream(fileDefinitionDownloadManifest)
    expect(streamable).toBeInstanceOf(StreamableFile)
    const folderPath = path.join(__dirname, `./${folderName}`)
    const fullPath = path.join(__dirname, `./${folderName}/${fileName}`)
    const data = await WriteAndReadFile({fileName, folderPath, fullPath, result: streamable})
    expect(data.text).toContain(transportFolderToBeUpdatedFixture.name)
    expect(data.text).toContain(transportFolderToBeUpdatedFixture.identifier)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
