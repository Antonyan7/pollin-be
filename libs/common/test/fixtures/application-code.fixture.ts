import {ApplicationCode} from '@libs/data-layer/apps/questionnaires/entities/typeorm/application-code.entity'
import {
  ApplicationCodeEnum,
  ApplicationCodeType,
} from '@libs/data-layer/apps/questionnaires/enums/application-code'

export const applicationCodeExistsTypeFixture: Partial<ApplicationCode> = {
  id: 3,
  code: null,
  type: ApplicationCodeType.Answer,
}

export const applicationCodeMaxDateTodayFixture: Partial<ApplicationCode> = {
  id: 14,
  code: ApplicationCodeEnum.MaxDateToday,
}

export const applicationCodeMaxDateYesterdayFixture: Partial<ApplicationCode> = {
  id: 15,
  code: ApplicationCodeEnum.MaxDateYesterday,
}
