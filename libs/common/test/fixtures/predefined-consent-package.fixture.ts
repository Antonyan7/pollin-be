import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {
  PredefinedConsentPackage,
  PredefinedConsentPackageType,
} from '@libs/data-layer/apps/users/entities/typeorm'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const predefinedConsentPackageFixture: Partial<PredefinedConsentPackage> = {
  id: 1,
  type: PredefinedConsentPackageType.TermsAndConditions,
  title: 'Title PredefinedConsentPackage',
  content: 'content PredefinedConsentPackage html',
  lastUpdated: dateTimeUtil.toDate('2024-02-05'),
}
