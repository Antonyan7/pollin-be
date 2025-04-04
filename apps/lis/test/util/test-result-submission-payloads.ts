import {SubmitTestResultRequestDTO} from '@apps/lis/test-result/dto/test-result.dto'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  testResultCompletedForAddNewAttachmentsFixture,
  testResultCompletedForEditResultFixture,
  testResultForSubmitFixture,
  testResultInconclusive,
  testResultReviewedFixture,
  testResultSemenCultureFixture,
  testResultToBeVerbalFixture,
  testResultWillBeNotCompleteFixture,
  testResultAbnormal,
  testResultWithoutSpecimenFixture,
} from '@libs/common/test/fixtures'
import {
  testResultMeasurementForAddNewAttachmentsFixture,
  testResultMeasurementForCompletedTestResultEditFixture,
  testResultMeasurementForVerbalTestResultFixture,
  testResultMeasurementFoSubmitFixture,
  testResultMeasurementInconclusive,
  testResultMeasurementInconclusiveAnotherOne,
  testResultMeasurementReviewedFixture,
  testResultMeasurementWillHaveResultTypeTestNotCompleteFixture,
  testResultSemenCultureMeasurementFixture,
  testResultMeasurementAbnormal,
  testResultMeasurementAbnormalAnotherOne,
  testResultMeasurementForTestWithoutSpecimenFixture,
} from '@libs/common/test/fixtures/test-result-measurement.fixture'
import {} from '@libs/services-common/enums'
import {TestResultMeasurementType} from '@libs/data-layer/apps/clinic-test/enums'
import {
  testResultAttachmentFixture,
  testResultAttachmentToBePresentForCompletedTestResultFixture,
} from '@libs/common/test/fixtures/test-result-attachment.fixture'

const dateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const testResultsSubmitRequestBody: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultSemenCultureFixture.uuid,
    comment: 'Updated new comment ',
    items: [
      {
        id: testResultSemenCultureMeasurementFixture.uuid,
        result: 'Detected',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Normal,
      },
    ],
    attachments: [
      {
        id: testResultAttachmentFixture.uuid,
        title: 'Updated newly',
        note: 'Updated note for attachment',
      },
    ],
  },
}

export const testResultWithoutAttachments: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultForSubmitFixture.uuid,
    comment: 'Updating test result to Pending',
    items: [
      {
        id: testResultMeasurementFoSubmitFixture.uuid,
        result: '',
        dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
        resultType: TestResultMeasurementType.Normal,
      },
    ],
  },
}

export const testResultToSubmitAsComplete: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultForSubmitFixture.uuid,
    items: [
      {
        id: testResultMeasurementFoSubmitFixture.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachement url',
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleted: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultWillBeNotCompleteFixture.uuid,
    items: [
      {
        id: testResultMeasurementWillHaveResultTypeTestNotCompleteFixture.uuid,
        result: '1.999',
        dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
        resultType: TestResultMeasurementType.TestNotComplete,
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleteSeeDetails: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultInconclusive.uuid,
    items: [
      {
        id: testResultMeasurementInconclusive.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
      {
        id: testResultMeasurementInconclusiveAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Indeterminate,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}
export const submitTestResultNoResultType: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultForSubmitFixture.uuid,
    items: [
      {
        id: testResultMeasurementFoSubmitFixture.uuid,
        result: '4.999',
        dateReceived: '2024-9-6',
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleteSeeAbnormal: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultInconclusive.uuid,
    items: [
      {
        id: testResultMeasurementInconclusive.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
      {
        id: testResultMeasurementInconclusiveAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleteSeeNormal: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultInconclusive.uuid,
    items: [
      {
        id: testResultMeasurementInconclusive.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Normal,
      },
      {
        id: testResultMeasurementInconclusiveAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Normal,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleteInconclusive: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultInconclusive.uuid,
    items: [
      {
        id: testResultMeasurementInconclusive.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Inconclusive,
      },
      {
        id: testResultMeasurementInconclusiveAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Inconclusive,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleteIndeterminate: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultInconclusive.uuid,
    items: [
      {
        id: testResultMeasurementInconclusive.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Indeterminate,
      },
      {
        id: testResultMeasurementInconclusiveAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Indeterminate,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleteTestNotComplete: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultInconclusive.uuid,
    items: [
      {
        id: testResultMeasurementInconclusive.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.TestNotComplete,
      },
      {
        id: testResultMeasurementInconclusiveAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.TestNotComplete,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

export const testResultToSubmitAsTestNotCompleteNotApplicable: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultInconclusive.uuid,
    items: [
      {
        id: testResultMeasurementInconclusive.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.NotApplicable,
      },
      {
        id: testResultMeasurementInconclusiveAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.NotApplicable,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}
export const testResultToSubmitAsTestAbnormal: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultAbnormal.uuid,
    items: [
      {
        id: testResultMeasurementAbnormal.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
      {
        id: testResultMeasurementAbnormalAnotherOne.uuid,
        result: '1.999',
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
    ],
    attachments: [
      {
        title: 'Added newly',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

const signedUrl =
  'hhwzbjrkaqgiqntkyluucrhbnpqczrmhzaztgpyjfjpqrkxiruprwvyviesfsfmkllamsendmpdmrezxxpkppigbhgcornsttlhxydfmvoxfbknvinrtizvulmiwlqrydmshppbcklrhywrmpzkvgqrozxubcldbvuiihlgtxwogvvnceexgxdgbwsahmyrymzuqizbwihootcgvlvmfnrdaalxjabhrbrnjvkpeufccmztjplbszumntfoqubgqqdmuimgtkzdbinmsjrosimborxvhvivhthfcwffdgkhu'
export const submitTestResultsCompletedToAddNewAttachmentsPayload: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultCompletedForAddNewAttachmentsFixture.uuid,
    items: [
      {
        id: testResultMeasurementForAddNewAttachmentsFixture.uuid,
        result: '67', // result will be updated because of Completed status of test result
        dateReceived: '2022-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
    ],
    attachments: [
      {
        id: testResultAttachmentToBePresentForCompletedTestResultFixture.uuid, // existed attachment for test result
        title: 'Different title than in fixture',
        note: 'Different note than in fixture',
        url: signedUrl,
      },
      {
        title: 'Added newly for Completed test result',
        note: 'Note for attachment',
        url: 'attachment_url',
      },
    ],
  },
}

const newAttachment = submitTestResultsCompletedToAddNewAttachmentsPayload.testResult.attachments[1]

export const submitTestResultsForCompletedWithMaxCountReachedPayload: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    ...submitTestResultsCompletedToAddNewAttachmentsPayload.testResult,
    attachments: [
      submitTestResultsCompletedToAddNewAttachmentsPayload.testResult.attachments[0],
      newAttachment,
      newAttachment,
      newAttachment,
      newAttachment,
      newAttachment,
      newAttachment,
      newAttachment,
      newAttachment,
      newAttachment,
      newAttachment,
    ],
  },
}

export const submitTestResultAsVerbalRequest: SubmitTestResultRequestDTO = {
  isVerbal: true,
  testResult: {
    id: testResultToBeVerbalFixture.uuid,
    items: [
      {
        id: testResultMeasurementForVerbalTestResultFixture.uuid,
        dateReceived: '2023-09-01',
        result: '100',
        resultType: TestResultMeasurementType.Normal,
      },
    ],
    attachments: [],
    comment: '',
  },
}

export const submitReviewedTestResultPayload: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    // test result is Reviewed
    id: testResultReviewedFixture.uuid,
    items: [
      {
        id: testResultMeasurementReviewedFixture.uuid,
        result: '25',
        dateReceived: dateTimeUtil.subDays(dateTimeUtil.now(), 39),
        resultType: TestResultMeasurementType.Abnormal,
      },
    ],
    attachments: [
      {
        title: 'Added for Reviewed test result',
        url: 'attachment_url',
        note: 'Note for attachment',
      },
    ],
  },
}

export const submitEditCompletedTestResultPayload: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultCompletedForEditResultFixture.uuid,
    items: [
      {
        id: testResultMeasurementForCompletedTestResultEditFixture.uuid,
        result: '77',
        dateReceived: '2023-11-11',
        resultType: TestResultMeasurementType.Abnormal,
      },
    ],
    attachments: [
      {
        title: 'Added newly for Completed test result',
        url: 'attachment_url',
        note: 'Note for attachment',
      },
    ],
  },
}

export const submitTestResultWithoutSpecimenPayload: SubmitTestResultRequestDTO = {
  isVerbal: false,
  testResult: {
    id: testResultWithoutSpecimenFixture.uuid,
    comment: 'Updated comment for test result without specimen',
    items: [
      {
        id: testResultMeasurementForTestWithoutSpecimenFixture.uuid,
        result: '2.2',
        dateReceived: '2023-10-20',
        resultType: TestResultMeasurementType.Abnormal,
      },
    ],
    attachments: [],
  },
}
