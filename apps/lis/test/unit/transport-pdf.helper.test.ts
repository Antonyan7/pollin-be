import {Nestproject_LOGO_BASE64_PNG} from '@libs/services-common/assets/assets.const'
import {
  headerLayout,
  headerStyle,
  labsTrackTableLayout,
  tableHeaderCellStyle,
} from '@libs/services-common/helpers/pdf-kit-helpers/transport-pdf-kit.helper'
import {
  getContentHeader,
  getContentImage,
  getLabsTrackSubTableBody,
  getPatientDataHeader,
  getPatientDataRowsValues,
  getRowItems,
  getSubTitleHeader,
} from '@apps/lis/transport/helper/transport-pdf.helper'
import {patientEmailVerifiedFixture} from '@libs/common/test/fixtures'
import {specimenFixture} from '@libs/common/test/fixtures/specimen.fixture'
import {Specimen} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {ContentImage, TableCell} from 'pdfmake/interfaces'
import {ColorPalette} from '@libs/services-common/enums/color-palette.enum'
import {MarginsPdfEnum} from '@libs/services-common/assets/margins.pdf'

const contentImage: ContentImage = {
  image: Nestproject_LOGO_BASE64_PNG,
  width: 80,
  height: 80,
  alignment: 'center',
  marginBottom: MarginsPdfEnum.Margin24,
}

const specimen = {
  ...specimenFixture,
  patient: patientEmailVerifiedFixture as Patient,
} as Specimen

describe('Transport pdf helper functions calls', () => {
  it('Should run getSubTitleHeader() function', () => {
    expect(getSubTitleHeader('Location')).toMatchObject({
      text: 'Location:',
      fontSize: 14,
      color: ColorPalette.Grey800,
      bold: true,
      marginBottom: MarginsPdfEnum.Margin10,
    })
  })

  it('Should run getContentImage() function', () => {
    expect(getContentImage(Nestproject_LOGO_BASE64_PNG)).toMatchObject(contentImage)
  })

  it('Should run getContentHeader() function', () => {
    const result = getContentHeader('Test', 'TestIdentifier')
    const table = result.table
    const [bodyRow] = table.body
    const [rowCell] = bodyRow as TableCell[]

    expect(result.layout).toBe(headerLayout)
    expect(table.widths).toBeInstanceOf(Array)
    expect(rowCell).toBeTruthy()
  })

  it('Should run getLabsTrackSubTableBody() function', () => {
    const result = getLabsTrackSubTableBody('name', 'location', 'phone')
    const [nameRow] = result

    expect(result.length).toBe(3)
    expect(nameRow[1]).toBe('name')
  })

  it('headerLayout should match properties', () => {
    expect(headerLayout.vLineColor).toBe(ColorPalette.White)
    expect(headerLayout.paddingLeft(null, null)).toBe(0)
    expect(headerLayout.paddingTop(null, null)).toBe(7.5)
    expect(headerLayout.paddingRight(null, null)).toBe(0)
    expect(headerLayout.paddingBottom(null, null)).toBe(7.5)
  })

  it('labsTrackTableLayout should match properties', () => {
    expect(labsTrackTableLayout.vLineColor).toBe(ColorPalette.White)
    expect(labsTrackTableLayout.hLineColor).toBe(ColorPalette.White)
    expect(labsTrackTableLayout.paddingLeft(null, null)).toBe(0)
    expect(labsTrackTableLayout.paddingTop(null, null)).toBe(5)
    expect(labsTrackTableLayout.paddingRight(null, null)).toBe(0)
    expect(labsTrackTableLayout.paddingBottom(null, null)).toBe(5)
  })

  it('should run getPatientDataRowsValues() & getRowItems() helper functions', () => {
    expect(getPatientDataRowsValues([specimen]).length).toBe(1)
    expect(getRowItems(specimen).length).toBe(4)
  })

  it('should run getPatientDataHeader() helper function', () => {
    expect(getPatientDataHeader().length).toBe(4)
  })

  it('headerStyle & tableHeaderCellStyle should match properties', () => {
    expect(headerStyle).toMatchObject({fontSize: 20, color: ColorPalette.Green, bold: true})
    expect(tableHeaderCellStyle).toHaveProperty('fontSize')
  })
})
