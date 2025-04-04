import {PatientAdhocPayment, PatientAdhocType} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  getAdhocPlanDetails,
  getAdhocAppointmentDetails,
  getAdhocPrescriptionDetails,
} from './payment-order.helper'
import {TableCell} from 'pdfmake/interfaces'
import {tableBodyCellStyle} from './receipt-pdf-styles.helper'
import {
  getAppointmentPaymentRow,
  getMedicationPaymentRow,
  getPlanTypePaymentRow,
} from './receipt-pdf-infrastructure.helper'
import {handleMedicationNameValue} from '../medications.helper'
import {DefaultValue} from '@libs/common/enums'

const getCommonTableLayout = (items: TableCell[]): TableCell => ({
  marginTop: 8,
  lineHeight: 1,
  layout: {
    vLineWidth: () => 0,
    hLineWidth: () => 0,
    paddingLeft: () => 20,
    paddingTop: () => 8,
    paddingRight: () => 8,
    paddingBottom: () => 8,
  },
  table: {
    widths: ['*'],
    body: items.map((item) => [item]),
  },
})

const getAdhocPlanPaymentRow = async (adhocPayment: PatientAdhocPayment): Promise<TableCell[]> => {
  const patientPlanAddons = await getAdhocPlanDetails(adhocPayment)
  const content = [getPlanTypePaymentRow(adhocPayment.patientPlan.planType)]

  patientPlanAddons.forEach((addon) => {
    content.push([{text: addon.planAddon?.title ?? DefaultValue.Dash, ...tableBodyCellStyle}])
  })

  return [
    {text: adhocPayment.type, ...tableBodyCellStyle, bold: true},
    getCommonTableLayout(content),
  ]
}

const getAdhocAppointmentPaymentRow = async (
  adhocPayment: PatientAdhocPayment,
): Promise<TableCell[]> => {
  const {testTitles, appointment} = await getAdhocAppointmentDetails(adhocPayment)
  const content = [getAppointmentPaymentRow(appointment.serviceType.name, appointment)]

  testTitles.forEach((testTitle) => {
    content.push([{text: testTitle, ...tableBodyCellStyle}])
  })

  return [
    {text: adhocPayment.type, ...tableBodyCellStyle, bold: true},
    getCommonTableLayout(content),
  ]
}

const getAdhocPrescriptionPaymentRow = async (
  adhocPayment: PatientAdhocPayment,
): Promise<TableCell[]> => {
  const patientMedications = await getAdhocPrescriptionDetails(adhocPayment)
  const content = []

  patientMedications.forEach((medication) => {
    content.push(
      getMedicationPaymentRow(handleMedicationNameValue(medication), medication.medication),
    )
  })

  return [
    {text: adhocPayment.type, ...tableBodyCellStyle, bold: true},
    getCommonTableLayout(content),
  ]
}

export const getAdhocPaymentRow = async (
  adhocPayment: PatientAdhocPayment,
): Promise<TableCell[]> => {
  if (adhocPayment.type === PatientAdhocType.Plan) {
    return getAdhocPlanPaymentRow(adhocPayment)
  }

  if (adhocPayment.type === PatientAdhocType.Appointment) {
    return getAdhocAppointmentPaymentRow(adhocPayment)
  }

  if (adhocPayment.type === PatientAdhocType.Prescription) {
    return getAdhocPrescriptionPaymentRow(adhocPayment)
  }

  return [
    {
      text: adhocPayment.billableItemTitle,
      ...tableBodyCellStyle,
    },
  ]
}
