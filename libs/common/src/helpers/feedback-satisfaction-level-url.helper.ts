import {PatientFeedbackFormSatisfactionLevelEnum} from '@libs/services-common/enums/patient-feedback-form-satisfaction-level.enum'
import {NestprojectConfigService} from '@libs/common'

const configService = NestprojectConfigService.getInstance()

export const getSatisfactionLevelImageUrl = new Map<
  PatientFeedbackFormSatisfactionLevelEnum,
  string
>([
  [
    PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel1,
    configService.get<string>('STATIC_ASSETS_BUCKET_URL') +
      'satisfaction_levels/very-dissatisfied.png',
  ],
  [
    PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel2,
    configService.get<string>('STATIC_ASSETS_BUCKET_URL') + 'satisfaction_levels/dissatisfied.png',
  ],
  [
    PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel3,
    configService.get<string>('STATIC_ASSETS_BUCKET_URL') + 'satisfaction_levels/neutral.png',
  ],
  [
    PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel4,
    configService.get<string>('STATIC_ASSETS_BUCKET_URL') + 'satisfaction_levels/satisfied.png',
  ],
  [
    PatientFeedbackFormSatisfactionLevelEnum.SatisfactionLevel5,
    configService.get<string>('STATIC_ASSETS_BUCKET_URL') +
      'satisfaction_levels/very-satisfied.png',
  ],
])
