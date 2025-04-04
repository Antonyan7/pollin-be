import {PatientPlanCohortIvfTaskDetails} from '@libs/data-layer/apps/clinic-ivf/entities'
import {DefaultValue} from '../enums'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'

const dateTimeUtil = new DateTimeUtil()

type HistoryChange = {
  propertyName: string
  from: string
  to: string
}

type HistoryValueType =
  | PatientPlanCohortIvfTaskDetails[keyof PatientPlanCohortIvfTaskDetails]
  | string
  | string[]
  | {dosage: string; notes: string}

type HistoryItemOptions = {
  propertyName: string
  unit?: string
  valueBuilder?: (value: HistoryValueType) => string
}

export const getItemsDTO = (items: HistoryChange[]): HistoryChange[] =>
  items.map(({propertyName, from, to}) => ({
    propertyName: propertyName ?? DefaultValue.Unknown,
    from: toHistoryValue(from),
    to: toHistoryValue(to),
  })) ?? []

export const toHistoryValue = (value: HistoryValueType, unit?: string): string => {
  if (value === null || value === undefined || value === '') {
    return DefaultValue.Dash
  }

  return String(value).concat(unit ? ` ${unit}` : '')
}

export const toBooleanHistoryValue = (value: boolean): string => {
  if (value === null || value === undefined) {
    return DefaultValue.Dash
  }

  return value ? DefaultValue.Yes : DefaultValue.No
}

export const toDefaultHistoryValue = (value: keyof typeof DefaultValue | string): string => {
  if (value === null || value === undefined) {
    return DefaultValue.Dash
  }

  switch (value) {
    case 'NA':
      return DefaultValue.NA
    case 'Yes':
      return DefaultValue.Yes
    case DefaultValue.No:
      return DefaultValue.No

    default:
      return DefaultValue.Dash
  }
}

export const toFormattedJSON = (value: string[]): string => {
  if (value === null || value === undefined) {
    return DefaultValue.Dash
  }

  return String(value).replace(/null/g, ` ${DefaultValue.Dash}`)
}

export const toFormattedDateValue = (value: string | Date): string => {
  if (value === null || value === undefined) {
    return DefaultValue.Dash
  }

  return dateTimeUtil.formatTzTimeWithMMMDDYYYY(value)
}

export const compareAndReturnHistoryChange = (
  oldValue: HistoryValueType,
  newValue: HistoryValueType,
  options: HistoryItemOptions,
): HistoryChange => {
  const {propertyName, unit, valueBuilder = toHistoryValue} = options

  const oldValueString = valueBuilder(oldValue, unit)
  const newValueString = valueBuilder(newValue, unit)
  if (oldValueString !== newValueString) {
    return {from: oldValueString, to: newValueString, propertyName}
  }

  return null
}
