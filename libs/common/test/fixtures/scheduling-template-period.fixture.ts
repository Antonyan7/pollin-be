import {
  SchedulingTemplatePeriod,
  SchedulingTemplatePeriodType,
  ServiceType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  applySchedulingTemplateFixture,
  schedulingTemplateForDuplicateFixture,
  templateToBeUpdatedFixture,
} from '@libs/common/test/fixtures/scheduling-template.fixture'
import {serviceTypeFixture} from '@libs/common/test/fixtures/service-type.fixture'
import {SchedulingTemplatePeriodInputSeed} from '@seeds/typeorm'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'

export const templateWithServiceTypesPeriodPlaceholderLabel: string = 'Test_name'
export const templatePeriodPlaceholderLabel: string = 'Test_name_2'
const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const templateTimePeriodToBeUpdatedFixture: Partial<SchedulingTemplatePeriod> = {
  id: 10,
  uuid: '232efaf6-4a27-4c61-98ce-b943f899debe',
  schedulingTemplateId: templateToBeUpdatedFixture.id,
  type: SchedulingTemplatePeriodType.ServiceType,
  placeholderLabel: 'Template To Be Updated Placeholder',
  startTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
    hours: 12,
    minutes: 52,
    seconds: 42,
  }),
  endTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
    hours: 7,
    minutes: 30,
    seconds: 42,
  }),
  isActiveOnSunday: true,
  isActiveOnMonday: false,
  isActiveOnTuesday: false,
  isActiveOnWednesday: false,
  isActiveOnThursday: false,
  isActiveOnFriday: false,
  isActiveOnSaturday: false,
}

export const applySchedulingTemplatePeriodFixture: Partial<SchedulingTemplatePeriodInputSeed> = {
  id: 1,
  uuid: '7b52fcd8-22d3-11ed-84f7-0242ac110002',
  schedulingTemplateId: applySchedulingTemplateFixture.id,
  type: SchedulingTemplatePeriodType.ServiceType,
  name: 'Service Type Template Period Fixture',
  placeholderLabel: 'Ultrasound',
  startTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
    hours: 12,
  }),
  endTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {hours: 13}),
  isActiveOnMonday: true,
  serviceTypes: [serviceTypeFixture as ServiceType],
}

export const blockedPeriodFixture: Partial<SchedulingTemplatePeriodInputSeed> = {
  id: 2,
  uuid: '03ee3f82-e3f8-46e5-af12-91001348bea0',
  schedulingTemplateId: applySchedulingTemplateFixture.id,
  type: SchedulingTemplatePeriodType.Block,
  name: 'Blocked Template Period Fixture',
  placeholderLabel: 'Orders',
  startTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
    hours: 13,
  }),
  endTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
    hours: 14,
  }),
  isActiveOnMonday: true,
  serviceTypes: [],
}

export const VALIDATION_TIME_PERIODS_FAILED: string = 'Error: Overlapping Service Types and Blocks'

export const blockedPeriodForReapplyFixture: Partial<SchedulingTemplatePeriod> = {
  id: 3,
  uuid: '03ee3f82-e3f8-46e5-af12-9100134890a0',
  schedulingTemplateId: applySchedulingTemplateFixture.id,
  type: SchedulingTemplatePeriodType.Block,
  placeholderLabel: 'New Orders [For Re Apply]',
  startTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
    hours: 13,
  }),
  endTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
    hours: 14,
  }),
  isActiveOnTuesday: true,
  serviceTypes: [],
}

export const applySchedulingTemplatePeriodForDuplicateFixture: Partial<SchedulingTemplatePeriodInputSeed> =
  {
    id: 666,
    uuid: '305490f9-c70e-4905-b283-46d3e2ab4bcc',
    schedulingTemplateId: schedulingTemplateForDuplicateFixture.id,
    type: SchedulingTemplatePeriodType.ServiceType,
    name: 'Template Period Fixture',
    placeholderLabel: 'Ultrasound',
    startTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
      hours: 12,
    }),
    endTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
      hours: 13,
    }),
    isActiveOnMonday: true,
    serviceTypes: [serviceTypeFixture as ServiceType],
  }
