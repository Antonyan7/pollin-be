import {parseLifeLabsXML} from '@libs/common/utils/xml.util'
import * as fs from 'fs/promises'
import {
  parseLifeLabsDate,
  parseLifeLabsHL7,
} from '@codebase/test-orders-and-results/lifelabs/service/lifelabs-hl7.service'

describe('LifeLabs HL7 Parsing', () => {
  test('should return null for empty DoB format', () => {
    expect(parseLifeLabsDate(null)).toBe(null)
  })

  test('should return null for unexpected DoB format', () => {
    expect(parseLifeLabsDate('2023-01-01')).toBe(null)
  })

  test('should return value for valid DoB format', () => {
    expect(parseLifeLabsDate('20230101')).toBe('2023-01-01')
  })

  test('should parse & return value for valid Date format without tz in UTC', () => {
    expect(parseLifeLabsDate('20170717130637')).toBe('2017-07-17T13:06:37')
  })

  test('should parse & return value with tz and format in UTC', () => {
    expect(parseLifeLabsDate('20170717130637-0400')).toBe('2017-07-17T13:06:37')
  })

  test('should parse mocked hl7 file', async () => {
    const file = await fs.readFile(__dirname + '/lifelabs/lifelabs-multiple-tests-with-cbc.xml')
    const [parsed] = await parseLifeLabsXML(file)
    const parsedHL7 = await parseLifeLabsHL7(parsed)

    expect(parsed).toBeTruthy()
    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('LIFELABS ONTARIO')
    expect(parsedHL7.patient.firstName).toBeTruthy()
    expect(parsedHL7.patient.dateOfBirth).toBe('1987-12-30')
    expect(parsedHL7.observationRequests.length).toBeGreaterThan(1)
    expect(parsedHL7.observationRequests[0].observationResults[0].comment).toBe(
      'Comment1 Comment2 Comment3',
    )
    expect(parsedHL7.observationRequests[0].observationResults[0].producersText).not.toContain('&')

    await fs.writeFile('./lifelabs-result.json', Buffer.from(JSON.stringify(parsedHL7)))
  })

  test('should parse hl7 with PDF', async () => {
    const file = await fs.readFile(__dirname + '/lifelabs/lifelabs-with-pdf.xml')
    const [parsed] = await parseLifeLabsXML(file)
    const parsedHL7 = await parseLifeLabsHL7(parsed)

    expect(parsed).toBeTruthy()
    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('LIFELABS ONTARIO')
    expect(parsedHL7.patient.firstName).toBeTruthy()
    expect(parsedHL7.observationRequests.length).toBeGreaterThan(1)
    expect(parsedHL7.observationRequests.some((obr) => obr.hasPDFReport === true)).toBe(true)

    const pdfOBR = parsedHL7.observationRequests.find((obr) => obr.testName === 'PDF Report')
    const pdfOBX = pdfOBR.observationResults[0].resultValue

    await fs.writeFile('./lifelabs-pdf-report.pdf', Buffer.from(pdfOBX, 'base64'))
    await fs.writeFile('./lifelabs-result-pdf.json', Buffer.from(JSON.stringify(parsedHL7)))
  })

  test('should parse mocked hl7 file with multiple obx', async () => {
    const file = await fs.readFile(__dirname + '/lifelabs/lifelabs-duplicate-obx.xml')
    const [parsed] = await parseLifeLabsXML(file)
    const parsedHL7 = await parseLifeLabsHL7(parsed)

    expect(parsed).toBeTruthy()
    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('LIFELABS ONTARIO')
    expect(
      parsedHL7.observationRequests.find((obr) =>
        obr.observationResults.find((obx) => obx.universalCode === '6463-4(1)'),
      ),
    ).toBeTruthy()

    await fs.writeFile('./lifelabs-duplicate-obx.json', Buffer.from(JSON.stringify(parsedHL7)))
  })
})
