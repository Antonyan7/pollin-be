import * as fs from 'fs/promises'
import {parseDynacareHL7} from '@firebase-platform/functions/test-orders-and-results/src/dynacare/service/dynacare-hl7.service'
import {DynacareIgnoredIdentifiers} from '@firebase-platform/functions/test-orders-and-results/src/dynacare/model/dynacare-ignore-segments'

describe('Dynacare HL7 Parsing', () => {
  test('should parse mocked hl7 file', async () => {
    const fileName = `dynacare-cbc-multi-test-ohip.hl7`
    const file = await fs.readFile(__dirname + '/dynacare/' + fileName)
    const parsedHL7 = await parseDynacareHL7(file.toString())

    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('Dynacare')
    expect(parsedHL7.patient.firstName).toBe('Firstname')
    expect(parsedHL7.patient.lastName).toBe('Lastname')
    expect(parsedHL7.patient.dateOfBirth).toBe('1979-04-03')
    expect(parsedHL7.patient.ohipNumber).toBe('2222225941')

    expect(parsedHL7.patient.address.street).toBe('9 Toronto Street')
    expect(parsedHL7.patient.address.unit).toBe('Unit 29')
    expect(parsedHL7.patient.address.city).toBe('Toronto')
    expect(parsedHL7.patient.address.province).toBe('ON')
    expect(parsedHL7.patient.address.postalCode).toBe('ABCDEFG')

    expect(parsedHL7.observationRequests.length).toBeGreaterThan(1)
    const [obr] = parsedHL7.observationRequests
    expect(obr.testName).toBe('ANTINUCLEAR AB. (ANA)')
    expect(obr.universalCode).toBe('544D')
    expect(obr.department).toBe('AUTO')

    const [obx] = obr.observationResults
    expect(obx.testName).toBe('ANTINUCLEAR AB. (ANA)')
    expect(obx.resultValue).toBe('NEGATIVE')
    expect(obx.resultStatus).toBe('F')
    expect(obx.universalCode).toBe('544D')
    expect(obx.unit).toBe('')
    expect(obx.refRange).toBeTruthy()
    expect(obx.abnormalFlags).toBe('N')
    expect(obx.comment).toBe(
      'A negative test is strong evidence against a diagnosis of rheumatic disease but is not conclusive. Results should be interpreted in conjunction with other serological tests and clinical findings. NEGATIVE',
    )

    await fs.writeFile(`./${fileName}.json`, Buffer.from(JSON.stringify(parsedHL7)))
  })

  test('should parse mocked hl7 with multiple panels. Panels should include multuple OBX segments', async () => {
    const fileName = `dynacare-multi-obx.hl7`
    const file = await fs.readFile(__dirname + '/dynacare/' + fileName)
    const parsedHL7 = await parseDynacareHL7(file.toString())

    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('Dynacare')

    const WBCPanel = parsedHL7.observationRequests.find(
      (obr) => obr.testName === "DIFFERENTIAL WBC'S :",
    )
    expect(WBCPanel.observationResults.length).toBeGreaterThan(2)

    await fs.writeFile(`./${fileName}.json`, Buffer.from(JSON.stringify(parsedHL7)))
  })

  test('should be able to parse duplicate OBX values and add sub IDs in universal codes', async () => {
    const fileName = `dynacare-duplicate-obx.hl7`
    const file = await fs.readFile(__dirname + '/dynacare/' + fileName)
    const parsedHL7 = await parseDynacareHL7(file.toString())

    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('Dynacare')

    const obrWithSubID = parsedHL7.observationRequests.find(
      (obr) => obr.testName === 'CALCULUS ANALYSIS',
    )
    expect(
      obrWithSubID.observationResults.some((obx) => obx.universalCode === 'COMPOS(200367.005)'),
    )
  })

  test('should be able to parse duplicate OBX and universal code values and generate unique identifier', async () => {
    const fileName = `dyncare-duplicate-uni-codes.hl7`
    const file = await fs.readFile(__dirname + '/dynacare/' + fileName)
    const parsedHL7 = await parseDynacareHL7(file.toString())

    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('Dynacare')

    const duplicate = parsedHL7.observationRequests.find((obr) => obr.universalCode === 'TAY')
    expect(duplicate.observationResults[0].universalCode).toBe('TAY(901515)-1')
    expect(duplicate.observationResults[1].universalCode).toBe('TAY(901515)-2')

    await fs.writeFile(`./${fileName}.json`, Buffer.from(JSON.stringify(parsedHL7)))
  })

  test('should skip OBX segements that includes Hepatitis markers', async () => {
    const fileName = `dynacare-with-hepatitis-markers.hl7`
    const file = await fs.readFile(__dirname + '/dynacare/' + fileName)
    const parsedHL7 = await parseDynacareHL7(file.toString())

    expect(parsedHL7).toBeTruthy()
    expect(parsedHL7.labIdentifier).toBe('Dynacare')

    const obxWithMarker = parsedHL7.observationRequests.find((obr) =>
      obr.observationResults.find((result) =>
        DynacareIgnoredIdentifiers.includes(result?.universalCode),
      ),
    )

    expect(obxWithMarker).toBeFalsy()

    await fs.writeFile(`./${fileName}.json`, Buffer.from(JSON.stringify(parsedHL7)))
  })
})
