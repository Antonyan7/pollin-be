import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {ConsentModule} from '@libs/data-layer/apps/users/entities/typeorm'
import {DefaultValue} from '../enums'
import {CONSENT_PACKAGE} from '@libs/common/i18n/en/message.json'
import {DateTimeUtil} from '../utils'

export const getConsentFileName = (
  patientPlan: PatientPlan,
  title: string,
  sentDate: Date,
): string => {
  const sentOnString = sentDate ? new DateTimeUtil().formatDateYMDTime(sentDate) : DefaultValue.Dash
  const planString = patientPlan?.planType?.title || DefaultValue.Dash

  return `Consent - ${title}_${planString}_${sentOnString}.pdf`
}

export const getConsentTitle = (consentModules: ConsentModule[]): string =>
  consentModules.length === 1 && consentModules[0]?.title
    ? consentModules[0].title
    : CONSENT_PACKAGE
