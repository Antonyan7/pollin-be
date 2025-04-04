export type BucketFileUploadedPayload = {
  kind: string
  id: string
  selfLink: string
  name: string
  bucket: string
  generation: string
  metageneration: string
  contentType: string
  timeCreated: string
  updated: string
  storageClass: string
  timeStorageClassUpdated: string
  size: string
  md5Hash: string
  mediaLink: string
  crc32c: string
  etag: string
}

export function decodeStoragePubSubMessage(data: string): BucketFileUploadedPayload {
  return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
}

export function encodeStoragePubSubMessage(data: Partial<BucketFileUploadedPayload>): string {
  const jsonString = JSON.stringify(data)
  return Buffer.from(jsonString, 'utf-8').toString('base64')
}
