export enum DownloadFileTypeEnum {
  PDF = 'PDF',
  DOCX = 'DOCX',
  DOC = 'DOC',
}

export enum DownloadFileExtensionTypeEnum {
  PDF = '.pdf',
  DOCX = '.docx',
  DOC = '.doc',
}

export enum DownloadFileMimeType {
  PDF = 'application/pdf',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export const getDownloadFileMimeTypes = new Map<DownloadFileTypeEnum, DownloadFileMimeType>([
  [DownloadFileTypeEnum.PDF, DownloadFileMimeType.PDF],
  [DownloadFileTypeEnum.DOC, DownloadFileMimeType.DOC],
  [DownloadFileTypeEnum.DOCX, DownloadFileMimeType.DOCX],
])
