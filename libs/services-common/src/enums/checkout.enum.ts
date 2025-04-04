import {CartItemType} from '@libs/data-layer/apps/checkout/entities/fireorm/cart'

export const InitialConsultationAppointmentCheckoutMessage = (hours: number): string =>
  `You will now see this appointment in your journey, where you will have the ability to reschedule or cancel if needed. Please take some time to complete our patient intake, which should be completed at least ${hours} hours prior to your appointment.`

export const wireTransferPaymentMessage = (): string =>
  "Plan selection is just pending receipt of your wire transfer. <br><br>We've sent you an email with all the details that you'll need to send it. Please do so as soon as possible in order to avoid delays to your treatment."

export const AppointmentCheckoutMessage = `You will now see this appointment in your journey.`

export const AlreadyBookedAppointmentCheckoutMessage = `You have paid for your appointment.`

export const MedicationCheckoutMessage = `You have paid for your medications.`

export const TestsCheckoutMessage = `You have paid for your tests.`

export const AdhocPaymentCheckoutMessage = `Your payment was successful`

export const PlanCheckoutMessage = (planTypeTitle: string): string =>
  `Plan confirmed \nYou successfully chose "${planTypeTitle}" as your plan.`

export const PlanCheckoutGeneticTestingMessage = (title: string): string =>
  `Your plan includes ${title} genetic testing of embryos. Please tell us how many Embryos you’d like to have this test performed on.`

export const checkoutMessageTypes = {
  [CartItemType.Medications]: MedicationCheckoutMessage,
  [CartItemType.Tests]: TestsCheckoutMessage,
  [CartItemType.ServiceTypeOrGroup]: AppointmentCheckoutMessage,
  [CartItemType.BookedAppointment]: AlreadyBookedAppointmentCheckoutMessage,
  [CartItemType.AdhocPayment]: AdhocPaymentCheckoutMessage,
}

export enum CartItemResponseType {
  Appointment = 'Appointment',
  Plan = 'Plan',
  Medications = 'Medications',
  Tests = 'Tests',
  AdhocPayment = 'AdhocPayment',
}
export enum SummaryLabelEnum {
  SubTotal = 'Subtotal',
  Total = 'Total Due',
  Taxes = 'Taxes',
}

export enum SummaryUidEnum {
  Total = 'total',
}
export const cartResponseTypeMap = new Map<CartItemType, CartItemResponseType>([
  [CartItemType.BookedAppointment, CartItemResponseType.Appointment],
  [CartItemType.Medications, CartItemResponseType.Medications],
  [CartItemType.Plan, CartItemResponseType.Plan],
  [CartItemType.ServiceTypeOrGroup, CartItemResponseType.Appointment],
  [CartItemType.Tests, CartItemResponseType.Tests],
  [CartItemType.AdhocPayment, CartItemResponseType.AdhocPayment],
])
