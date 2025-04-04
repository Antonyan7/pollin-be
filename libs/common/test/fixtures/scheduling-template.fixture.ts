import {
  DeleteSchedulingTemplatesDto,
  SchedulingTemplateDto,
  UpdateTemplateDto,
} from '@apps/booking/schedule-template/dto/scheduling-templates.dto'
import {CreateTemplateDto} from '@apps/booking/schedule-template/dto/template.dto'
import {
  SchedulingTemplate,
  SchedulingTemplatePeriod,
  SchedulingTemplatePeriodType,
} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {serviceTypeFixture} from '@libs/common/test/fixtures/service-type.fixture'
import {ValidationBadRequestResponse} from '@libs/services-common/dto/status-codes.dto'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {ClinicInfoService} from '@libs/services-common/services/clinic-info.service'

const configService: NestprojectConfigService = NestprojectConfigService.getInstance()
const clinicInfoService: ClinicInfoService = new ClinicInfoService(configService)

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))
const currentDateISO: string = dateTimeUtil.formatIsoDate()

const dateTimeWithCurrentDate: string = dateTimeUtil.formatUTCStringInRFC3339Tz(
  dateTimeUtil.formatTimeToISO('09:00:00'),
)

const tzOffset: string = dateTimeUtil.extractInDigitsTimeZoneOffset(
  dateTimeWithCurrentDate,
  clinicInfoService.getClinicTimezone().timezone,
)

const clinicEndTime: string = clinicInfoService.getClinicHours().closeTime

export const schedulingTemplateFixture: Partial<SchedulingTemplate> = {
  id: 1,
  uuid: '242b2a24-c0c0-452b-879f-24438a1afd06',
  name: 'MyTemplateName',
  countDaysIncomplete: 1,
  countDaysComplete: 6,
  updatedBy: 'Seed',
}

export const applySchedulingTemplateFixture: Partial<SchedulingTemplate> = {
  id: 2,
  uuid: 'af6a3ef7-22d4-11ed-84f7-0242ac110002',
  name: 'Apply Scheduling Template Fixture',
  countDaysIncomplete: 0,
  countDaysComplete: 3,
}

export const templateWithTimePeriodsFixture: Partial<SchedulingTemplate> = {
  id: 3,
  uuid: '34334-43444r-5665hgrfe-6754444se',
  name: 'MyTemplate777',
  countDaysIncomplete: 2,
  countDaysComplete: 3,
  updatedBy: 'Seed',
}

export const newTemplateName: string = 'BrandNewTemplate'

export const invalidTemplateDetailsId: number = 25

export const invalidTemplateUUID: string = 'invalidTemplateUUID777'

export const timePeriodsFixture: Partial<SchedulingTemplatePeriod>[] = [
  {
    id: 4,
    uuid: '9ea79dd2-2b29-4031-87a8-2648778883',
    schedulingTemplateId: templateWithTimePeriodsFixture.id,
    type: SchedulingTemplatePeriodType.ServiceType,
    placeholderLabel: 'Placeholder 2',
    startTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
      hours: 9,
      minutes: 52,
      seconds: 42,
    }),
    endTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
      hours: 11,
      minutes: 30,
      seconds: 42,
    }),
    isActiveOnMonday: true,
    isActiveOnTuesday: true,
    isActiveOnWednesday: true,
    isActiveOnThursday: false,
    isActiveOnFriday: false,
    isActiveOnSaturday: false,
    isActiveOnSunday: true,
  },
  {
    id: 5,
    uuid: '9e777d2-2b29-4031-87a8-26afd4877773',
    schedulingTemplateId: templateWithTimePeriodsFixture.id,
    type: SchedulingTemplatePeriodType.Block,
    placeholderLabel: 'Placeholder 2',
    startTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
      hours: 9,
      minutes: 52,
    }),
    endTime: dateTimeUtil.setDateByGivenDateAndHours(dateTimeUtil.todayWithZeroTimeTZ(), {
      hours: 12,
    }),
    isActiveOnMonday: false,
    isActiveOnTuesday: false,
    isActiveOnWednesday: true,
    isActiveOnThursday: true,
    isActiveOnFriday: true,
    isActiveOnSaturday: true,
    isActiveOnSunday: false,
  },
]

export const templateToBeUpdatedFixture: Partial<SchedulingTemplate> = {
  id: 90,
  uuid: '09a46e7e-ff74-4ea1-8abd-9f37d0f25fbd',
  name: 'Template To Be Updated Fixture',
  countDaysIncomplete: 2,
  countDaysComplete: 3,
  updatedBy: 'Update Seed',
}

export const templateUpdateNameValidationMessage: string =
  'name must be shorter than or equal to 50 characters'

export const templateCreateNameValidationMessage: string =
  'name must be shorter than or equal to 50 characters'

export const updateTemplateRequestUUIDFixture: string = '09a46e7e-ff74-4ea1-8abd-9f37d0f25fbd'

export const updateTemplateWithTimePeriodRequestFixture: Partial<UpdateTemplateDto> = {
  name: 'Update Scheduling Template Request Fixture',
  timePeriods: [
    {
      id: '232efaf6-4a27-4c61-98ce-b943f899debe',
      days: [0, 1, 2],
      startTime: `${currentDateISO}T17:10:00`,
      endTime: `${currentDateISO}T18:00:00`,
      periodType: SchedulingTemplatePeriodType.Block,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Update Scheduling Template Period Placeholder',
    },
  ],
}

export const deleteSchedulingTemplates: Partial<SchedulingTemplate>[] = [
  {
    id: 333,
    uuid: '167d3710-f2c2-4f5e-85aa-ce3076b31196',
    name: 'WillDeletedTemplate1',
    countDaysIncomplete: 7,
    countDaysComplete: 7,
    isDeleted: false,
  },
  {
    id: 444,
    uuid: '394a4b9f-b465-4ba6-8905-921f15251cf2',
    name: 'WillDeletedTemplate2',
    countDaysIncomplete: 7,
    countDaysComplete: 7,
    isDeleted: false,
  },
  {
    id: 555,
    uuid: 'cdafceaa-666d-11ed-9022-0242ac120002',
    name: 'IsDeletedTemplate',
    countDaysIncomplete: 7,
    countDaysComplete: 7,
    isDeleted: true,
  },
]

export const invalidTemplatesToDeleteUUIDs: DeleteSchedulingTemplatesDto = {
  templateIds: ['test-uuid-template-1', 'test-uuid-template-2'],
}

export const validateTemplateTimePeriodsRequestFixture: Partial<CreateTemplateDto> = {
  name: 'Validate Scheduling Template Request Fixture',
  timePeriods: [
    {
      days: [0],
      startTime: `${currentDateISO}T09:00:00${tzOffset}`,
      endTime: `${currentDateISO}T15:00:00${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.Block,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Validate Scheduling Template Period Placeholder',
    },
    {
      days: [0, 1],
      startTime: `${currentDateISO}T14:30:00${tzOffset}`,
      endTime: `${currentDateISO}T18:00:00${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.ServiceType,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Validate Scheduling Template Period Placeholder',
    },
    {
      days: [1],
      startTime: `${currentDateISO}T15:00:00${tzOffset}`,
      endTime: `${currentDateISO}T18:00:00${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.ServiceType,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Validate Scheduling Template Period Placeholder',
    },
  ],
}

export const validateTemplateTimePeriodsResponseFixture: Partial<ValidationBadRequestResponse> = {
  data: [0, 1],
}

export const handleIncompleteLogicTemplateRequestFixture: Partial<CreateTemplateDto> = {
  name: 'Incomplete Scheduling Template Fixture',
  timePeriods: [
    {
      days: [0, 1],
      startTime: `${currentDateISO}T07:00:00${tzOffset}`,
      endTime: `${currentDateISO}T${clinicEndTime}${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.Block,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Placeholder time period 1',
    },
    {
      days: [2],
      startTime: `${currentDateISO}T13:00:00${tzOffset}`,
      endTime: `${currentDateISO}T${clinicEndTime}${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.ServiceType,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Placeholder time period 2',
    },
    {
      days: [3],
      startTime: `${currentDateISO}T07:00:00${tzOffset}`,
      endTime: `${currentDateISO}T${clinicEndTime}${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.Block,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Placeholder time period 3',
    },
  ],
}

export const invalidTemplateWithPeriodWithoutDays: Partial<CreateTemplateDto> = {
  name: 'Invalid Template',
  timePeriods: [
    {
      days: [],
      startTime: `${currentDateISO}T08:00:00${tzOffset}`,
      endTime: `${currentDateISO}T17:00:00${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.ServiceType,
      serviceTypes: [serviceTypeFixture.uuid],
      placeholderName: 'Placeholder time period 1',
    },
  ],
}

export const handleIncompleteLogicTemplateDbFixture: Partial<SchedulingTemplate> = {
  name: 'Incomplete Template Handler Fixture',
  countDaysIncomplete: 1,
  countDaysComplete: 3,
}

export const durationLabel4DaysCreationOnResponseGetTemplatesFixture: Partial<SchedulingTemplateDto> =
  {
    duration: '4 Days (1 incomplete)',
  }

export const durationLabel1DayCreationOnResponseGetTemplatesFixture: Partial<SchedulingTemplateDto> =
  {
    duration: '1 Day',
  }

export const invalidTemplateServiceTypesArrayEmpty: Partial<CreateTemplateDto> = {
  name: 'Invalid Template',
  timePeriods: [
    {
      days: [0, 1],
      startTime: `${currentDateISO}T14:30:00${tzOffset}`,
      endTime: `${currentDateISO}T18:00:00${tzOffset}`,
      periodType: SchedulingTemplatePeriodType.ServiceType,
      serviceTypes: [],
      placeholderName: 'Validate Scheduling Template Period Placeholder',
    },
  ],
}

export const schedulingTemplateForDuplicateFixture: Partial<SchedulingTemplate> = {
  id: 600,
  uuid: '10278b54-6517-4ac2-993d-6a6fc8c8904b',
  name: 'schedulingTemplate',
  countDaysIncomplete: 1,
  countDaysComplete: 6,
  updatedBy: 'Seed',
}
