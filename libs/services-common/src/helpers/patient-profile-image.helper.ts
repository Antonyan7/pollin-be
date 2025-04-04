import {NestprojectConfigService} from '@libs/common'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {InternalServerErrorException} from '@libs/services-common/exceptions'
import {PatientPhotoVerificationStatus} from '@libs/services-common/enums'

const fireBaseStorageAdapter = new FirebaseStorageAdapter(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
)

/**
 *
 * @param includePending - Optional, checks whether to return imageUrl when photoVerificationStatus is 'Pending'
 *
 */
export const getProfileImageUrl = async (
  patient: Patient,
  message: string,
  includePending?: boolean,
): Promise<string> => {
  try {
    const isVerified = patient.photoVerificationStatus === PatientPhotoVerificationStatus.Verified
    const isPending = patient.photoVerificationStatus === PatientPhotoVerificationStatus.Pending

    const photoStatusCondition = isVerified || (includePending && isPending)

    const isShownImage = patient.photoKey && photoStatusCondition

    const imageUrl = isShownImage
      ? await fireBaseStorageAdapter.getSignedUrlToFile(
          fireBaseStorageAdapter.getPatientPhotoPath(patient.photoKey),
        )
      : null
    return imageUrl
  } catch (error) {
    handleError(new InternalServerErrorException(message), {
      functionName: activityLogs.PatientProfileFunctions.GetProfileImageURL,
      eventName: activityLogs.PatientProfileActions.GetProfileImageURLFailed,
      data: {patientId: patient?.id, errMsg: error?.message},
    })
  }
}
