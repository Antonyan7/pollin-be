import {FormSemenSpecimenCollectionDTO} from '@libs/common/dto/semen-verification-form.dto'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {Specimen} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'

import {SpecimenStatus} from '@libs/data-layer/apps/clinic-test/enums'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const fireBaseStorageAdapter = new FirebaseStorageAdapter(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
)

export const getSemenVerificationFormDto = (
  specimen: Specimen,
): FormSemenSpecimenCollectionDTO | null => {
  const form = specimen?.semenVerificationForm
  const isSemenCollected =
    specimen?.serviceType?.superType?.specialWorkflow === ServiceTypeWorkflow.Semen
  const isNotRejected = specimen.status !== SpecimenStatus.Rejected

  if (isSemenCollected && isNotRejected) {
    return {
      partner: {
        firstName: form?.partnerFirstName,
        lastName: form?.partnerLastName,
        dateOfBirth: form?.partnerDateOfBirth
          ? dateTimeUtil.formatBirthDate(form.partnerDateOfBirth)
          : null,
      },
      patient: {
        daysSinceLastEjaculation: form.daysSinceLastEjaculation,
        hadLast60DaysFever: form.illnessRecently,
        takingMedications: form.takingMedications,
        smokes: {
          value: form.smokes,
          note: form.smokesComment,
        },
        dateCollected: dateTimeUtil.formatUTCDateInRFC3339Tz(form.collectedOn),
        collectionPurpose: form.collectionPurpose,
        method: form.collectionMethod,
        container: form.collectionContainer,
        sampleCollected: form.entireSampleCollected,
        otherComments: form?.comment,
      },
      provider: {
        id: form.serviceProvider.uuid,
        title: form.serviceProvider.title,
      },
    }
  }

  return null
}

export const getSemenPhotoImageUrl = async (photoPath: string): Promise<string> => {
  if (!photoPath) {
    return null
  }

  return fireBaseStorageAdapter.getSignedUrlToFile(photoPath)
}
