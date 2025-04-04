import {TestResultAttachment} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  testResultCompletedForAddNewAttachmentsFixture,
  testResultSemenCultureFixture,
} from './test-result.fixture'

export const testResultAttachmentFixture: Partial<TestResultAttachment> = {
  id: 3,
  uuid: '6833e423-951f-4881-a99a-4e89c40dcf51',
  testResultId: testResultSemenCultureFixture.id,
  title: 'Attachment.docx',
  url: 'https://google.com/testFile.docx',
  notes: 'Notes',
}

export const testResultAttachmentToBeDeletedFixture: Partial<TestResultAttachment> = {
  id: 4,
  uuid: 'hj-cnbddd-88-gfghf-to-be-deleted',
  testResultId: testResultSemenCultureFixture.id,
  title: 'Attachment.pdf',
  url: 'https://test.com/test.pdf',
  notes: 'Notes to be deleted',
}

export const testResultAttachmentToBePresentForCompletedTestResultFixture: Partial<TestResultAttachment> =
  {
    id: 5,
    uuid: '5f93d443-1899-4202-baf9-57eaa9a5f0f0',
    testResultId: testResultCompletedForAddNewAttachmentsFixture.id,
    title: 'Attachment.pdf',
    url: 'https://test.com/test.pdf',
    notes: 'Notes',
  }

export const testResultAttachmentToBeRemovedAfterSubmitTestResults: Partial<TestResultAttachment> =
  {
    id: 6,
    uuid: '3f93d443-1899-4202-baf9-57eaa9a5f0f9',
    testResultId: testResultCompletedForAddNewAttachmentsFixture.id,
    title: 'Attachment.pdf',
    url: 'https://test.com/testtest.pdf',
  }
