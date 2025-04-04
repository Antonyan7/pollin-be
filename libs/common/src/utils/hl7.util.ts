/* eslint-disable @typescript-eslint/no-require-imports */
const HL7 = require('hl7-standard')

export enum HL7Info {
  PatientFirstname = 'PatientFirstname',
  PatientLastname = 'PatientLastname',
  PatientDateOfBirth = 'PatientDateOfBirth',

  PatientAddressStreet = 'PatientAddressStreet',
  PatientAddressCity = 'PatientAddressCity',
  PatientAddressState = 'PatientAddressState',
  PatientPostalCode = 'PatientPostalCode',
  PatientAddressCountry = 'PatientAddressCountry',
  ExternalPatientId = 'ExternalPatientId',
  ExternalAppointmentId = 'ExternalAppointmentId',

  PatientPhone = 'PatientPhone',
  ServiceName = 'ServiceName',
  AppointmentDate = 'AppointmentDate',
  OhipNumber = 'OhipNumber',
  OhipVersionCode = 'OhipVersionCode',
}

const HL7InfoMapper: {
  [hl7Info: string]: [string, number?]
} = {
  [HL7Info.PatientFirstname]: ['PID.5.2'],
  [HL7Info.PatientLastname]: ['PID.5.1'],
  [HL7Info.PatientDateOfBirth]: ['PID.7.1'],

  [HL7Info.ExternalPatientId]: ['PID.3.1'],
  [HL7Info.ExternalAppointmentId]: ['OBR.2.1'],

  [HL7Info.PatientAddressStreet]: ['PID.11.1'],
  [HL7Info.PatientAddressCity]: ['PID.11.3'],
  [HL7Info.PatientAddressState]: ['PID.11.4'],
  [HL7Info.PatientPostalCode]: ['PID.11.5'],
  [HL7Info.PatientAddressCountry]: ['PID.11.6'],

  [HL7Info.PatientPhone]: ['PID.13.1'],
  [HL7Info.ServiceName]: ['OBR.4.2'],
  [HL7Info.AppointmentDate]: ['OBR.7.1'],
  [HL7Info.OhipNumber]: ['PID.3.1', 1],
  [HL7Info.OhipVersionCode]: ['PID.3.2', 1],
}
// more standards  in https://hl7-definition.caristix.com/v2/HL7v2.5/Segments. But it could be different - so need compare with real data from TNI

export class HL7Util {
  h17: typeof HL7

  constructor(content: string) {
    this.h17 = new HL7(content)
  }

  parse(): void {
    this.h17.transform()
  }

  getSegmentInfo(requestedInfo: HL7Info, index?: number): string {
    const segmentData = HL7InfoMapper[requestedInfo]

    //PID
    const segmentRoot = segmentData[0].slice(0, 3)
    //PID.3.1
    const segmentAddress = segmentData[0]
    //If there are more than one same addresses - index of address
    const segmentIndex = index ?? segmentData[1]

    try {
      return this.h17.getSegments(segmentRoot)?.[0]?.get(segmentAddress, segmentIndex, 0)
    } catch {
      return null
    }
  }
}
