import {LabSyncTestResultFieldMatch} from '@libs/data-layer/apps/clinic-test/entities/typeorm/lab-sync-test-result-field-match.entity'

export enum LabSyncPaymentStatus {
  OHIP = 'OHIP',
  PrivatelyPaid = 'Privately Paid',
}

export enum LabSyncDefaultStateEnum {
  NoOHIP = 'No OHIP',
  NoPostalCode = 'No postal code',
  NoAddress = 'No Address',
  NoDateOfBirth = 'No date of birth',
}

export enum LabSyncTestResultListSortEnum {
  CollectionAge = 'CollectionAge',
  DateReceived = 'DateReceived',
}

export enum TestResultMatchID {
  TestName = 'TestName',
  FirstName = 'FirstName',
  LastName = 'LastName',
  DateOfBirth = 'DateOfBirth',
  OhipNumber = 'OhipNumber',
  OhipVersionCode = 'OhipVersionCode',
  PostalCode = 'PostalCode',
}

export const TestResultMatchMap: Partial<
  Record<keyof LabSyncTestResultFieldMatch, TestResultMatchID>
> = {
  testType: TestResultMatchID.TestName,
  firstName: TestResultMatchID.FirstName,
  lastName: TestResultMatchID.LastName,
  dateOfBirth: TestResultMatchID.DateOfBirth,
  ohip: TestResultMatchID.OhipNumber,
  ohipVersion: TestResultMatchID.OhipVersionCode,
  postalCode: TestResultMatchID.PostalCode,
}

export enum LabSyncStatusAction {
  LinkPatient = 'LinkPatient',
  VoidResult = 'VoidResult',
  DownloadHL7File = 'DownloadHL7File',
}

export enum LabSyncStatusActionLabel {
  LinkPatient = 'Link patient',
  VoidResult = 'Void result',
  DownloadHL7File = 'Download HL7',
}
