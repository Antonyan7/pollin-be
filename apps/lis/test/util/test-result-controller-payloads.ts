import {
  GetOrderResultsListForPatientRequestDTO,
  GetTestResultsListRequestDTO,
} from '@apps/lis/test-result/dto/test-result.dto'
import {
  labInfoSecondFixture,
  patientPartnerForProfileWithInvalidHighlightFixture,
  testPanelFixture,
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeFixture,
} from '@libs/common/test/fixtures'
import {SortOrder} from '@libs/services-common/helpers/sort.helper'
import {
  OrderResultsFilterEnum,
  OrderResultSortByField,
  SortByField,
  TestResultFilterEnum,
} from '@libs/services-common/enums'
import {FinalResultType, TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {
  testGroupHighlightsFixture,
  testResultFilteringByTestGroupFixture,
} from '@libs/common/test/fixtures/test-group.fixture'

export const getPendingTestResultListDefaultRequest: Partial<GetTestResultsListRequestDTO> = {
  page: 1,
}

export const getTestResultListDefaultRequest: Partial<GetOrderResultsListForPatientRequestDTO> = {
  page: 1,
  pageSize: null,
}

export const testResultSortingPatientLastnameAsc: Partial<GetTestResultsListRequestDTO> = {
  page: 1,
  sortByField: SortByField.PatientName,
  sortOrder: SortOrder.Asc,
}

export const testResultSortedCollectionAgeAsc: Partial<GetTestResultsListRequestDTO> = {
  searchString: '',
  filters: [],
  page: 1,
  sortByField: SortByField.CollectionAge,
  sortOrder: SortOrder.Asc,
}

export const testResultNotReceived: Partial<GetTestResultsListRequestDTO> = {
  searchString: '',
  filters: [{id: TestResultStatus.NotReceived, type: TestResultFilterEnum.Status}],
  page: 1,
  sortByField: SortByField.Lab,
  sortOrder: SortOrder.Desc,
}

export const testResultCompletedFilterRequest: Partial<GetTestResultsListRequestDTO> = {
  filters: [{id: TestResultStatus.Completed, type: TestResultFilterEnum.Status}],
  page: 1,
  pageSize: 10,
}

export const testResultWithSearchString: Partial<GetTestResultsListRequestDTO> = {
  searchString: 'patent',
  filters: [{id: TestResultStatus.Pending, type: TestResultFilterEnum.Status}],
  page: 1,
  sortByField: SortByField.Status,
  sortOrder: SortOrder.Asc,
}

export const testResultTestPanel: Partial<GetTestResultsListRequestDTO> = {
  searchString: '',
  filters: [{id: testPanelFixture.uuid, type: TestResultFilterEnum.TestPanel}],
  page: 1,
  sortByField: SortByField.Status,
  sortOrder: SortOrder.Asc,
}

export const testResultTestType: Partial<GetTestResultsListRequestDTO> = {
  searchString: '',
  filters: [{id: testTypeFixture.uuid, type: TestResultFilterEnum.TestType}],
  page: 1,
}

export const labFilterPayload = {
  page: 1,
  filters: [{id: labInfoSecondFixture.uuid, type: TestResultFilterEnum.Lab}],
}

export const multipFilterPayload = {
  page: 1,
  filters: [
    {id: labInfoSecondFixture.uuid, type: TestResultFilterEnum.Lab},
    {
      id: TestResultStatus.NotReceived,
      type: OrderResultsFilterEnum.Status,
    },
    {
      id: testTypeFixture.uuid,
      type: OrderResultsFilterEnum.TestType,
    },
  ],
}

export const testResultSearchIdentifer: Partial<GetTestResultsListRequestDTO> = {
  searchString: patientPartnerForProfileWithInvalidHighlightFixture.patientIdentifier,
  filters: [],
  page: 1,
}

export const orderResultsSortByFieldStatusOrderAscRequest: Partial<GetOrderResultsListForPatientRequestDTO> =
  {
    page: 1,
    pageSize: 20,
    sortByField: OrderResultSortByField.Status,
    sortOrder: SortOrder.Asc,
  }

export const orderResultsFilterTestTypeAndFinalAbnormalSortStatus: Partial<GetOrderResultsListForPatientRequestDTO> =
  {
    filters: [
      {
        id: testTypeAMHWithMdBIllingCodeFixture.uuid,
        type: OrderResultsFilterEnum.TestType,
      },
      {
        id: FinalResultType.Abnormal,
        type: OrderResultsFilterEnum.FinalResultType,
      },
      {
        id: TestResultStatus.Reviewed,
        type: OrderResultsFilterEnum.Status,
      },
    ],
    page: 1,
    pageSize: 10,
    sortByField: OrderResultSortByField.Date,
    sortOrder: SortOrder.Asc,
  }

export const orderResultsFilterTestGroupNoDataSortStatus: Partial<GetOrderResultsListForPatientRequestDTO> =
  {
    filters: [
      {
        id: testGroupHighlightsFixture.uuid,
        type: OrderResultsFilterEnum.TestGroup,
      },
    ],
    page: 1,
    pageSize: 10,
    sortByField: OrderResultSortByField.Date,
    sortOrder: SortOrder.Asc,
  }

export const orderResultsFilterTestGroupWithDataSortStatus: Partial<GetOrderResultsListForPatientRequestDTO> =
  {
    filters: [
      {
        id: testResultFilteringByTestGroupFixture.uuid,
        type: OrderResultsFilterEnum.TestGroup,
      },
    ],
    page: 1,
    pageSize: 10,
    sortByField: OrderResultSortByField.Date,
    sortOrder: SortOrder.Asc,
  }

export const invalidTestResultUUID = 'invalidTestResultUUID'
export const invalidSpecimenUUID = 'invalidSpecimenUUID'
