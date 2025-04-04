import {handleOptionalStringValues} from '@libs/common'
import {
  ReverseSortOrder,
  SortOrder,
  SortOrderMapper,
} from '@libs/services-common/helpers/sort.helper'
import {FindOptionsOrder} from 'typeorm/find-options/FindOptionsOrder'
import {LabSyncObservationRequest} from '@libs/data-layer/apps/clinic-test/entities/typeorm/lab-sync-observation-request.entity'
import {LabSyncTestResultsListDTO} from '../dto/get-lab-sync-test-results.dto'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {
  LabSyncDefaultStateEnum,
  LabSyncPaymentStatus,
  LabSyncTestResultListSortEnum,
  TestResultMatchID,
  TestResultMatchMap,
} from '../enum/lab-sync-list.enum'
import {DefaultValue} from '@libs/common/enums'
import {LabSyncTestResultFieldMatch} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

const dateTimeUtil = new DateTimeUtil()

export const getLabSyncResultListOrder = (
  sortByField: LabSyncTestResultListSortEnum,
  sortOrder: SortOrder = SortOrder.Desc,
): FindOptionsOrder<LabSyncObservationRequest> => {
  const order = SortOrderMapper[sortOrder]

  switch (sortByField) {
    case LabSyncTestResultListSortEnum.CollectionAge:
      return {specimenReceivedOn: ReverseSortOrder[sortOrder]}
    case LabSyncTestResultListSortEnum.DateReceived:
      return {systemReceivedOn: order}
    default:
      return {specimenReceivedOn: ReverseSortOrder[sortOrder]}
  }
}

export const labSyncNotMatchedFields = (
  match: LabSyncTestResultFieldMatch,
): Array<TestResultMatchID> => {
  const enums = Object.entries(match).map(([field, value]) => {
    if (!value) {
      return TestResultMatchMap[field]
    }

    return null
  })

  return enums.filter(Boolean)
}

export const labSyncResultsListDTO = (
  result: LabSyncObservationRequest,
  universalCodes: string[],
): LabSyncTestResultsListDTO => {
  const testMatched = result.labSyncTestResultFieldMatch.testType === true
  const ohipCoveredTest = universalCodes.find((code) => result.universalCode === code)
  const payment = testMatched
    ? ohipCoveredTest
      ? LabSyncPaymentStatus.OHIP
      : LabSyncPaymentStatus.PrivatelyPaid
    : DefaultValue.Dash

  return {
    id: result.uuid,
    title: result?.testName,
    status: result.status,
    lab: {
      id: result.labSyncRawData.labInfo.uuid,
      title: result.labSyncRawData.labInfo.name,
    },
    age: dateTimeUtil.differenceInDays(dateTimeUtil.now(), result.specimenReceivedOn),
    dateReceived: dateTimeUtil.formatUTCDateInRFC3339Tz(result?.systemReceivedOn),
    ohip: {
      number: result.patientOHIPNumber || LabSyncDefaultStateEnum.NoOHIP,
      versionCode: handleOptionalStringValues(result.patientOHIPVersion),
    },
    notMatchingProperties: labSyncNotMatchedFields(result.labSyncTestResultFieldMatch),
    payment,
    patient: {
      firstName: result.patientFirstName,
      lastName: result.patientLastName,
      dateOfBirth: result.patientDOB
        ? dateTimeUtil.formatBirthDate(result.patientDOB)
        : LabSyncDefaultStateEnum.NoDateOfBirth,
      address: result.patientAddress || LabSyncDefaultStateEnum.NoAddress,
      postalCode: result.patientPostalCode || LabSyncDefaultStateEnum.NoPostalCode,
    },
  }
}
