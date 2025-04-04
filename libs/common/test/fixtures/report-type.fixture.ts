import {ReportType} from '@libs/data-layer/apps/clinic-test/entities/typeorm/report-type.entity'
import {ReportTypeCategory} from '@libs/data-layer/apps/clinic-test/enums/report-type-category.enum'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(
  NestprojectConfigService.getInstance().get<string>('DEFAULT_TIME_ZONE'),
)

export const reportTypeFixture: Partial<ReportType> = {
  id: 1,
  uuid: 'd4dc72f7-b0fd-4c4a-9444-b3e43f2b8279',
  category: ReportTypeCategory.FertilityIQ,
  heading: 'Heading of Report Type',
  title: 'Title of Report Type',
  iconURL: 'icon_url',
  backgroundImageURL: 'image_url',
  createdAt: dateTimeUtil.now(),
}

export const reportTypeForEqqFreezingFixture: Partial<ReportType> = {
  id: 2,
  uuid: 2 + '4dc72f7-b0fd-4c4a-9444-b3e43f2b8279',
  category: ReportTypeCategory.EggFreezing,
  heading: 'Heading of Report Type EggFreezing',
  title: 'Title of Report Type EggFreezing',
  iconURL: 'icon_url EggFreezing',
  backgroundImageURL: 'image_url EggFreezing',
  createdAt: dateTimeUtil.now(),
  introDescription: 'introDescription_reportTypeForEqqFreezingFixture',
  intoTitle: 'intoTitle_reportTypeForEqqFreezingFixture',
}
