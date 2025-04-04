import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

export const getStaffsWithTrimmedAndNotEmptyBillingNumber = (
  staffsWithBillingNumber: Staff[],
): Staff[] => {
  const staffsWithBillingNumberTrimmed: Staff[] = staffsWithBillingNumber.map((staff) => {
    return {...staff, billingNumberForMdBilling: staff.billingNumberForMdBilling.trim()}
  })

  const cleanStuffs = staffsWithBillingNumberTrimmed.filter(
    (staff) => staff.billingNumberForMdBilling,
  )
  return cleanStuffs
}
