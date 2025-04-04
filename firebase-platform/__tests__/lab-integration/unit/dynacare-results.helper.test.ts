import {DynacareAttachment, DynacareAttachmentXMLResponse} from '@libs/common/interfaces/dynacare'
import {
  isAttachmentReady,
  readLatestAttachment,
} from '@firebase-platform/functions/test-orders-and-results/src/dynacare/helper/dynacare-results.helper'
import {
  formatDynacareDateOfBirth,
  formatDynacareSpecimenCollectionDate,
} from '@firebase-platform/functions/test-orders-and-results/src/dynacare/service/dynacare-hl7.service'

describe('Dynacare Helper: isAttachmentReady', () => {
  it('should return false if attachments are not provided', () => {
    const result = isAttachmentReady({
      ArrayOfAttachment: {
        Attachment: {},
      },
    } as unknown as DynacareAttachmentXMLResponse)

    expect(result).toBe(false)
  })
})

describe('Dynacare Helper: readLatestAttachment', () => {
  it('should return data based on Array', () => {
    const result = readLatestAttachment({Id: 'test'} as unknown as DynacareAttachment)
    expect(result.Id).toBeTruthy()
  })
})

describe('Dynacare Helper: date utiities', () => {
  it('should return null if values are null', () => {
    expect(formatDynacareDateOfBirth(null)).toBe(null)
    expect(formatDynacareSpecimenCollectionDate(null)).toBe(null)
  })

  it('should return null for unexcepted DoB', () => {
    expect(formatDynacareDateOfBirth('2023-01-01')).toBe(null)
  })

  it('should return formatted value for valid Dynacare DoB', () => {
    expect(formatDynacareDateOfBirth('20230101')).toBe('2023-01-01')
  })

  it('should return null for unexpected specimen collection date', () => {
    expect(formatDynacareSpecimenCollectionDate('2017071708100000')).toBe(null)
  })
})
