type AppointmentAcuityFormField = {
  fieldID: number
  value: string
}

type AppointmentAcuityForm = {
  id: number
  name: string
  values: Array<AppointmentAcuityFormField>
}

//Response From Acuity
export type AppointmentAcuityResponse = {
  appointmentTypeID: number
  barCodeNumber: string

  /** eq.: Dr. Evan Taerk' */
  calendar: string
  calendarID: number
  canceled: boolean
  canClientCancel: boolean
  canClientReschedule: boolean
  certificate: string
  confirmationPage: string
  date: string

  /** eq.: '2023-11-23709:00:00-0500' */
  datetime: string
  email: string
  firstName: string
  lastName: string
  forms: Array<AppointmentAcuityForm>
  id: number
  location: string
  phone: string
  time: string
  acuityForm?: Partial<AppointmentAcuityResponse>
  price: string
  priceSold: string
  amountPaid: string
  notes?: string
  duration?: string
  /** Exist just in cancel acuity request  */
  noShow?: boolean

  /** custom for project */

  /** format: 01 */
  dateOfBirthDay: string
  /**  format: January */
  dateOfBirthMonth: string
  dateOfBirthYear: number

  sexAtBirth: string
  bookAppointmentWithPhysician: boolean

  primaryReason: string
  primaryReasonOtherDescription: string
  addedToReadyWaitList: boolean
  ageGroup: string

  haveReferral: boolean
  interestedService: string
  interestedServiceOther: string
  agreeTermsAndConditions: boolean
  agreeReceivingCommunications: boolean
  appointmentUUID: string

  // Custom field add into:
  // 1. AppointmentAcuityResponse this
  // 2. AcuityUpdateDTO below (most often is optional as we updating just part of field from our sides)
  // 3. basicFieldMapping
  // 4. if it is Boolean - need to add field into: libs/services-common/src/utils/acuity-fields.helper.ts -> AcuityFieldsHelper in the end (near hasReferral)
  // 5. Add DefaultValues into libs/common/src/adapters/acuity.adapter.ts customFieldsToAppointment
}

//Update to Acuity Service
export type AcuityUpdateDTO = {
  // custom for project

  /** format: 01 */
  dateOfBirthDay: string
  /**  format: January */
  dateOfBirthMonth: string
  dateOfBirthYear: string

  sexAtBirth?: string
  hasReferral?: boolean
  bookAppointmentWithPhysician?: boolean

  primaryReason?: string
  primaryReasonOtherDescription?: string
  addedToReadyWaitList?: boolean
  ageGroup?: string

  haveReferral?: boolean
  interestedService?: string
  interestedServiceOther?: string
  agreeTermsAndConditions?: boolean
  agreeReceivingCommunications?: boolean
}

export type AcuityCreateDTO = {
  appointmentUUID: string
  appointmentRevisionId: string
  /** format: 01 */
  dateOfBirthDay: string
  /**  format: January */
  dateOfBirthMonth: string
  dateOfBirthYear: string
  sexAtBirth: string
  primaryReason: string
  addedToReadyWaitList: boolean
  ageGroup: string
  haveReferral: boolean
  interestedService: string
  interestedServiceOther: string
  agreeTermsAndConditions: boolean
}

enum AppointmentSortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type AcuityGetAppointmentsQuery = {
  max?: string
  minDate?: string
  maxDate?: string
  calendarID?: number
  appointmentTypeID?: number
  canceled?: boolean
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  fields?: string
  excludeForms?: boolean
  direction?: AppointmentSortOrder
}

export class AcuityWebhookData {
  action: AcuityAction

  /** external acuity appointmentId */
  id: number

  /** Our serviceProviderId */
  calendarID: number

  /** Our serviceTypeId  */
  appointmentTypeID: number
}

export enum AcuityAction {
  /**
   * From acuity doc: is called when the appointment is changed in any way.
   * This includes when it is initially scheduled, rescheduled, or canceled, as well as when appointment details such as e-mail address or intake forms are updated.
   */
  Changed = 'changed',

  /**
   * From acuity doc: is called once when an appointment is initially booked
   */
  Scheduled = 'scheduled',

  Rescheduled = 'rescheduled',
  Canceled = 'canceled',

  // eslint-disable-next-line @typescript-eslint/naming-convention
  'order.completed' = 'order.completed',
}
