import {getFileMimeType} from '@libs/common/helpers/file.helper'

describe('File Helper', () => {
  it('should return correct mime type for PDF', () => {
    const mimeType = getFileMimeType(
      'uploads/portal/test-results/external/90a13b52-801a-4c46-ae49-edccf3d1bb7f.pdf',
    )

    expect(mimeType).toBe('application/pdf')
  })

  it('should return null for unsupported file types (.txt)', () => {
    const mimeType = getFileMimeType('uploads/portal/test-results/external/file.txt')

    expect(mimeType).toBe(null)
  })
})
