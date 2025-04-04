export enum FirebaseStorageFunction {
  GetBucket = 'GetBucket',
  DeleteFile = 'DeleteFile',
  GetSignedUrlToFile = 'GetSignedUrlToFile',
  UploadPrivateFile = 'UploadPrivateFile',
  UploadPublicFile = 'UploadPublicFile',
  UploadFile = 'UploadFile',
  UploadBase64PrivateFile = 'UploadBase64PrivateFile',
  GetImageBase64ByUrl = 'GetImageBase64ByUrl',
  CreateReadStream = 'CreateReadStream',
  MoveFileBetweenBuckets = 'MoveFileBetweenBuckets',
}

export enum FirebaseStorageActions {
  BucketNotFound = 'BucketNotFound',
  DeleteFileFailed = 'DeleteFileFailed',
  GetSignedUrlToFileFailed = 'GetSignedUrlToFileFailed',
  DeletingFile = 'DeletingFile',
  UploadPrivateFileFailed = 'UploadPrivateFile',
  UploadPublicFileFailed = 'UploadPublicFileFailed',
  UploadFileFailed = 'UploadFileFailed',
  UploadBase64PrivateFileFailed = 'UploadBase64PrivateFileFailed',
  GetImageBase64ByUrlFailed = 'GetImageBase64ByUrlFailed',
  CreateReadStreamFailed = 'CreateReadStreamFailed',
  MoveFileBetweenBucketsSuccess = 'MoveFileBetweenBucketsSuccess',
  MoveFileBetweenBucketsFailed = 'MoveFileBetweenBucketsFailed',
}
