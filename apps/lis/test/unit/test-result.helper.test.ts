import 'reflect-metadata'
import {NestprojectConfigService, DateTimeUtil} from '@libs/common'
import {
  LabInfo,
  LabSyncObservationRequest,
  LabSyncObservationResult,
  TestPanel,
  TestPanelToTestType,
  TestResult,
  TestResultAttachment,
  TestResultMeasurement,
  TestType,
  TestTypeResultOption,
} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  getLabInfoFilters,
  getStatusFilters,
  getTestPanelTestTypeFilters,
  getPossibleResultOptions,
} from '@apps/lis/test-result/helper/test-result.helper'
import {TestResultAttachmentDTO, TestResultItemDTO} from '@apps/lis/test-result/dto/test-result.dto'
import {getTestResultStatusTitle} from '@libs/services-common/enums/clinic-test.enum'
import {
  labInfoFixture,
  labSyncOBRDynacareGetTestResultDetailsFixture,
  labSyncOBXDynacareGetTestResultDetailsFixture,
  patientForProfileTestResultsFixture,
  serviceProviderFixture,
  serviceTypeBloodCycleMonitoringFixture,
} from '@libs/common/test/fixtures'
import {specimenFixture} from '@libs/common/test/fixtures/specimen.fixture'
import {TestTypeCount} from '@libs/data-layer/apps/clinic-test/repositories/typeorm'
import {testTypeHasHistory} from '@apps/lis/test-result/helper/test-result-history.helper'
import {DefaultValue} from '@libs/common/enums'
import {
  finalResult,
  testResultDateCompleted,
} from '@apps/lis/test-result/helper/order-test-result.helper'
import {getTestResultFiltersType, TestResultFilterEnum} from '@libs/services-common/enums'
import {
  FinalResultType,
  LabLocation,
  ResultStatusForPatient,
  SpecimenStatus,
  TestResultKind,
  TestResultMeasurementType,
  TestResultStatus,
} from '@libs/data-layer/apps/clinic-test/enums'
import {
  getTestResultAttachments,
  getTestResultItems,
  sortMeasurementsByTestPanelToTestTypes,
} from '@apps/lis/test-result/helper/test-result-details.helper'
import {
  FirebaseStorageAdapter as MockFirebaseStorageAdapter,
  mockedSignedUrlPrefix,
} from '@libs/common/adapters/firebase/__mocks__/firebase-storage-adapter'
import {FirebaseStorageAdapter} from '@libs/common/adapters'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const testPanelsMock: TestPanel[] = [
  {
    id: 11,
    uuid: 'c6c908f5-132d-11ed-814e-0242ac722002',
    title: 'Test Panel Title',
    labId: 1,
    testPanelToTestTypes: null,
    generateTaskForAbnormalResult: false,
    labInfo: null,
    createdAt: null,
    updatedAt: null,
    updatedBy: '',
    specimenTests: null,
    specimenGroupId: null,
    specimenGroup: null,
    serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
    price: 100.5,
    taxable: true,
  },
]

const possibleTestResultOptionsMock: TestTypeResultOption[] = [
  {
    id: 1,
    uuid: '7d43ff18-2ce5-4ade-b005-72a7832b8a3b',
    title: 'O+',
    createdAt: null,
    updatedAt: null,
    updatedBy: null,
    testType: null,
    testTypeId: null,
  },
  {
    id: 2,
    uuid: '7a20b66c-edd6-4cb6-b97f-dd273b8cc60e',
    title: 'O-',
    createdAt: null,
    updatedAt: null,
    updatedBy: null,
    testType: null,
    testTypeId: null,
  },
]

const testTypesMock: TestType[] = [
  {
    id: 13,
    uuid: 'c6c908f5-132d-11ed-814e-0242ac122002',
    title: 'Test Type Title',
    unit: 'ml',
    labId: 1,
    generateTaskForAbnormalResult: false,
    testTypeResultOptions: possibleTestResultOptionsMock,
    testPanelToTestTypes: null,
    testResultMeasurements: null,
    labInfo: null,
    createdAt: null,
    updatedAt: null,
    updatedBy: '',
    specimenGroupId: null,
    specimenGroup: null,
    specimenTests: null,
    serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
    price: 200.5,
    patientPlanToTestTypeProcedures: null,
    taxable: true,
    relevancyPeriodMonths: 1,
  },
]

const testTypesForSortedMeasurements: TestType[] = [
  ...testTypesMock,
  {
    id: 12,
    uuid: 'c6c90f5-132d-11ed-814e-0242ac122002',
    title: 'Test Type Title',
    unit: 'ml',
    labId: 1,
    generateTaskForAbnormalResult: false,
    testTypeResultOptions: possibleTestResultOptionsMock,
    testPanelToTestTypes: null,
    testResultMeasurements: null,
    labInfo: null,
    createdAt: null,
    updatedAt: null,
    updatedBy: '',
    specimenGroupId: null,
    specimenGroup: null,
    specimenTests: null,
    serviceTypeId: serviceTypeBloodCycleMonitoringFixture.id,
    price: 200.5,
    patientPlanToTestTypeProcedures: null,
    taxable: true,
    relevancyPeriodMonths: 1,
  },
]

const testPanelId = 1

const testPanelForSortedMeasurements: Partial<TestPanel> = {
  id: testPanelId,
  testPanelToTestTypes: [
    {
      id: 1,
      testPanelId,
      testTypeId: testTypesForSortedMeasurements[0].id,
      sequence: 1,
    },
    {
      id: 2,
      testPanelId,
      testTypeId: testTypesForSortedMeasurements[1].id,
      sequence: 2,
    },
  ] as Partial<TestPanelToTestType[]>,
}

const labInfosMock: LabInfo[] = [
  {
    id: 14,
    uuid: 'c6c908f5-132d-11ed-714e-0242ac122002',
    name: 'Laboratory Name',
    location: 'Address',
    phone: '+454545454545',
    createdAt: null,
    updatedAt: null,
    testPanels: null,
    testTypes: null,
    updatedBy: '',
    labLocation: LabLocation.External,
  },
]

const [testTypeEntity] = testTypesMock

const testResultMeasurementsMock: TestResultMeasurement[] = [
  {
    id: 1,
    uuid: 'hj-cnbddd-88-fvff',
    testResultId: 1,
    resultType: TestResultMeasurementType.Inconclusive,
    result: 'Undetected',
    dateReceived: dateTimeUtil.toDate('2022-11-01'),
    testTypeId: testTypeEntity.id,
    createdAt: null,
    updatedAt: null,
    updatedBy: '',
    testType: testTypeEntity,
    testResult: null,
  },
]

const testResultMeasurementsToBeSorted: TestResultMeasurement[] = [
  ...testResultMeasurementsMock,
  {
    id: 2,
    uuid: 'hj-ddd-88-fvff',
    testResultId: 1,
    resultType: TestResultMeasurementType.Inconclusive,
    result: 'Undetected',
    dateReceived: dateTimeUtil.toDate('2022-11-01'),
    testTypeId: testTypeEntity.id,
    createdAt: null,
    updatedAt: null,
    updatedBy: '',
    testType: testTypesForSortedMeasurements[1],
    testResult: null,
  },
]

const testResultMock: TestResult = {
  id: 1,
  uuid: 'gre-ffv-ffd-ffbff-44gd',
  patientId: patientForProfileTestResultsFixture.id,
  labId: labInfoFixture.id,
  status: TestResultStatus.Completed,
  finalResult: FinalResultType.Abnormal,
  testResultKind: TestResultKind.TestType,
  testPanelId: null,
  specimenId: specimenFixture.id,
  testTypeId: testTypeEntity.id,
  comment: 'Comment for test result',
  statusForPatient: ResultStatusForPatient.New,
  completedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  labInfo: null,
  orderingPhysician: null,
  patient: null,
  testResultAttachments: null,
  testResultMeasurements: testResultMeasurementsMock,
  orderingPhysicianId: serviceProviderFixture.id,
  testPanel: null,
  testType: null,
  specimen: null,
  createdAt: null,
  updatedAt: null,
  updatedBy: '',
  isMachine: false,
  completedBy: null,
  staffUser: null,
}

const testResultAttachmentsMock: TestResultAttachment[] = [
  {
    id: 1,
    uuid: 'hj-cnbddd-88-gfghf',
    testResultId: testResultMock.id,
    title: 'Attachment to test result',
    notes: 'Notes',
    url: '',
    testResult: testResultMock,
    createdAt: null,
    updatedAt: null,
    updatedBy: null,
  },
]

let OBRMock: LabSyncObservationRequest =
  labSyncOBRDynacareGetTestResultDetailsFixture as LabSyncObservationRequest
OBRMock = {
  ...OBRMock,
  testResultId: testResultMock.id,
  labSyncObservationResults: [
    {
      ...labSyncOBXDynacareGetTestResultDetailsFixture,
      testResultMeasurementId: testResultMeasurementsMock[0].id,
    } as LabSyncObservationResult,
  ],
}

const testResultForSortedMeasurements: Partial<TestResult> = {
  id: 1,
  testResultKind: TestResultKind.TestPanel,
  testResultMeasurements: testResultMeasurementsToBeSorted,
  testPanel: testPanelForSortedMeasurements as TestPanel,
}

// eslint-disable-next-line max-lines-per-function
describe('Test Result helper functions => cal', () => {
  it('Should run getTestPanelTestTypeFilters function', () => {
    expect(getTestPanelTestTypeFilters(testPanelsMock, testTypesMock)).toMatchObject({
      title: getTestResultFiltersType.get(TestResultFilterEnum.TestPanel),
      options: [
        {
          id: testPanelsMock[0].uuid,
          title: testPanelsMock[0].title,
          type: TestResultFilterEnum.TestPanel,
        },
        {
          id: testTypesMock[0].uuid,
          title: testTypesMock[0].title,
          type: TestResultFilterEnum.TestType,
        },
      ],
    })
  })

  it('Should run getLabInfoFilters function', () => {
    expect(getLabInfoFilters(labInfosMock)).toMatchObject({
      title: getTestResultFiltersType.get(TestResultFilterEnum.Lab),
      options: [
        {
          id: labInfosMock[0].uuid,
          title: labInfosMock[0].name,
          type: TestResultFilterEnum.Lab,
        },
      ],
    })
  })

  it('Should run getStatusFilters function', () => {
    expect(getStatusFilters()).toMatchObject({
      title: getTestResultFiltersType.get(TestResultFilterEnum.Status),
      options: [
        {
          id: TestResultStatus.NotReceived,
          type: TestResultFilterEnum.Status,
          title: getTestResultStatusTitle.get(TestResultStatus.NotReceived),
        },
        {
          id: TestResultStatus.Pending,
          type: TestResultFilterEnum.Status,
          title: getTestResultStatusTitle.get(TestResultStatus.Pending),
        },
        {
          id: TestResultStatus.Verbal,
          type: TestResultFilterEnum.Status,
          title: getTestResultStatusTitle.get(TestResultStatus.Verbal),
        },
        {
          id: TestResultStatus.WaitingCompletion,
          type: TestResultFilterEnum.Status,
          title: getTestResultStatusTitle.get(TestResultStatus.WaitingCompletion),
        },
        {
          id: TestResultStatus.Completed,
          type: TestResultFilterEnum.Status,
          title: getTestResultStatusTitle.get(TestResultStatus.Completed),
        },
      ],
    })
  })

  it('Should run getTestResultItems function', () => {
    const [measurement] = testResultMock.testResultMeasurements
    expect(getTestResultItems(testResultMock, OBRMock)).toMatchObject<TestResultItemDTO[]>([
      {
        id: measurement.uuid,
        type: measurement.testType.title,
        unit: OBRMock.labSyncObservationResults[0].unit,
        possibleResultOptions: getPossibleResultOptions(measurement),
        result: measurement.result,
        dateReceived: dateTimeUtil.formatIsoDate(dateTimeUtil.toDate(measurement.dateReceived)),
        resultType: measurement.resultType,
      },
    ])
  })

  it('Should run getTestResultAttachments function', async () => {
    const [attachment] = testResultAttachmentsMock
    expect(
      await getTestResultAttachments(
        testResultAttachmentsMock,
        new MockFirebaseStorageAdapter() as unknown as FirebaseStorageAdapter,
      ),
    ).toMatchObject<TestResultAttachmentDTO[]>([
      {
        id: attachment.uuid,
        title: attachment.title,
        note: attachment.notes,
        url: mockedSignedUrlPrefix + attachment.url,
      },
    ])
  })

  it('should show that test type has history if test type has more than 2 result count', () => {
    const mockTestTypeCount: TestTypeCount[] = [
      {
        testTypeId: 1,
        count: '2',
      },
    ]
    const result = testTypeHasHistory(1, mockTestTypeCount)
    expect(result).toBe(true)
  })

  it('Should run sortMeasurementsByTestPanelToTestTypes() and return sorted test result measurements of Test Panel', async () => {
    const measurements = sortMeasurementsByTestPanelToTestTypes(
      testResultForSortedMeasurements as TestResult,
    )

    const first = measurements[0]
    const last = measurements[measurements.length - 1]

    expect(first.id).toBe(testResultMeasurementsToBeSorted[0].id)
    expect(last.id).toBe(testResultMeasurementsToBeSorted[1].id)
  })
})

describe('Rejected cases for test result utility functions', () => {
  it('should show `-` as dateCompleted for non Rejected result', () => {
    const mockedResult = {
      dateCompleted: null,
      specimen: {
        status: SpecimenStatus.Rejected,
      },
    } as unknown as TestResult
    expect(testResultDateCompleted(mockedResult)).toBe(DefaultValue.Dash)
  })

  it('should return `-` for Rejected specimen as final result', () => {
    const mockedResult = {
      dateCompleted: null,
      specimen: {
        status: SpecimenStatus.Rejected,
      },
    } as unknown as TestResult

    expect(finalResult(mockedResult)).toBe(DefaultValue.Dash)
  })

  it('should return `-` for non Rejected specimen when final result is pending', () => {
    const mockedResult = {
      dateCompleted: null,
      specimen: {
        status: SpecimenStatus.InProgress,
      },
    } as unknown as TestResult

    expect(finalResult(mockedResult)).toBe(DefaultValue.Dash)
  })
})
