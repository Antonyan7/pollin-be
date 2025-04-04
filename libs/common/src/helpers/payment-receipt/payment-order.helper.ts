import * as activityLogs from '@libs/common/enums/activity-logs'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {getCreateDatabaseConnection} from '@libs/common/typeorm/connection'
import {LogType, StructuredLogger} from '@libs/common/utils'
import {PaymentOrder} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order.entity'
import {parseError} from '@libs/services-common/helpers/error-handling'
import {StreamableFile} from '@nestjs/common/file-stream'
import {NestprojectConfigService} from '@libs/common/services'
import {PaymentOrderItem} from '@libs/data-layer/apps/checkout/entities/typeorm/payment-order-item.entity'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {PatientAdhocPayment, PatientMedication} from '@libs/data-layer/apps/users/entities/typeorm'
import {Appointment} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {PatientPlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-addon.entity'
const configService = NestprojectConfigService.getInstance()

export const getAdhocPlanDetails = async (
  adhocPayment: PatientAdhocPayment,
): Promise<PatientPlanAddon[]> => {
  const dataSource = await getCreateDatabaseConnection()

  const patientPlanRepository = new PatientPlanRepository(dataSource)

  const patientPlan = await patientPlanRepository.findOneForCheckout(
    {id: adhocPayment.patientPlanId},
    null,
    false,
  )

  return patientPlan.addons
}

export const getAdhocAppointmentDetails = async (
  adhocPayment: PatientAdhocPayment,
): Promise<{appointment: Appointment; testTitles: string[]}> => {
  const dataSource = await getCreateDatabaseConnection()

  const appointmentRepository = dataSource.getRepository(Appointment)

  const appointment = await appointmentRepository
    .createQueryBuilder('appointment')
    .select([
      'appointment.id',
      'appointment.start',
      'serviceType.id',
      'serviceType.name',
      'patientMilestones.id',
      'patientMilestones.dominantAppointmentId',
      'milestoneToTestTypesOrPanels.id',
      'testType.id',
      'testType.title',
      'testPanel.id',
      'testPanel.title',
    ])
    .leftJoin('appointment.serviceType', 'serviceType')
    .leftJoin('appointment.patientMilestones', 'patientMilestones')
    .leftJoin('patientMilestones.milestoneToTestTypesOrPanels', 'milestoneToTestTypesOrPanels')
    .leftJoin('milestoneToTestTypesOrPanels.testType', 'testType')
    .leftJoin('milestoneToTestTypesOrPanels.testPanel', 'testPanel')
    .where('appointment.id = :appointmentId', {appointmentId: adhocPayment.appointmentId})
    .getOne()

  return {
    appointment,
    testTitles: appointment.patientMilestones
      .flatMap((milestone) => milestone.milestoneToTestTypesOrPanels)
      .flatMap(
        (milestoneToTestTypeOrPanel) =>
          milestoneToTestTypeOrPanel.testType?.title || milestoneToTestTypeOrPanel.testPanel?.title,
      ),
  }
}

export const getAdhocPrescriptionDetails = async (
  adhocPayment: PatientAdhocPayment,
): Promise<PatientMedication[]> => {
  const dataSource = await getCreateDatabaseConnection()

  const patientMedicationRepository = dataSource.getRepository(PatientMedication)

  return patientMedicationRepository
    .createQueryBuilder('patientMedication')
    .select([
      'patientMedication.id',
      'patientMedication.nameFromIntake',
      'patientMedication.name',
      'medication.id',
      'medication.title',
      'medication.strength',
      'medication.form',
      'medication.drugIdentifierNumber',
    ])
    .innerJoin('patientMedication.medication', 'medication')
    .where('patientMedication.prescriptionId = :prescriptionId', {
      prescriptionId: adhocPayment.patientPrescriptionId,
    })
    .getMany()
}

const paymentOrderSelect = [
  'paymentOrder',
  'patient',
  'serviceProvider',
  'partnersRelations',
  'partner',
  'partnerPatient',
  'inviterRelations',
  'inviterPatient',
  'patientMilestone',
  'patientPlan',
  'planType',
  'paymentMethods',
  'paymentOrderItems',
  'appointment',
  'appointmentServiceProvider',
  'staffUser',
  'serviceProviderGroup',
  'serviceType',
  'medication',
  'testType',
  'testPanel',
  'cryoSubscription',

  // plan type
  'itemPlanType.id',
  'itemPlanType.title',
  'itemPaymentReceiptDescriptionItem.id',
  'itemPaymentReceiptDescriptionItem.sequence',
  'itemPaymentReceiptDescription.id',
  'itemPaymentReceiptDescription.description',
  'itemPatientPlan',

  // adhoc payment
  'patientAdhocPayment.id',
  'patientAdhocPayment.type',
  'patientAdhocPayment.billableItemTitle',
  'patientAdhocPayment.patientPrescriptionId',
  'patientAdhocPayment.appointmentId',
  'patientAdhocPayment.patientPlanId',
  'patientAdhocPayment.amount',
  'patientAdhocPayment.taxable',
  'adhocPatientPlan.id',
  'adhocPlanType.id',
  'adhocPlanType.title',
  'adhocPaymentReceiptDescriptionItem.id',
  'adhocPaymentReceiptDescriptionItem.sequence',
  'adhocPaymentReceiptDescription.id',
  'adhocPaymentReceiptDescription.description',
]

export const getPaymentOrderWithDetails = async (
  id?: number,
  uuid?: string,
): Promise<PaymentOrder> => {
  const dataSource = await getCreateDatabaseConnection()
  const paymentOrderRepository = dataSource.getRepository(PaymentOrder)

  return (
    paymentOrderRepository
      .createQueryBuilder('paymentOrder')
      .select(paymentOrderSelect)
      .leftJoin('paymentOrder.patient', 'patient')
      .leftJoin('patient.serviceProvider', 'serviceProvider')
      .leftJoin('patient.partnersRelations', 'partnersRelations')
      .leftJoin('partnersRelations.partner', 'partner')
      .leftJoin('partnersRelations.patient', 'partnerPatient')
      .leftJoin('patient.inviterRelations', 'inviterRelations')
      .leftJoin('inviterRelations.patient', 'inviterPatient')
      .leftJoin('paymentOrder.patientMilestone', 'patientMilestone')
      .leftJoin('patientMilestone.patientPlan', 'patientPlan')
      .leftJoin('patientPlan.planType', 'planType')
      .leftJoin('paymentOrder.paymentMethods', 'paymentMethods')
      .leftJoin('paymentOrder.paymentOrderItems', 'paymentOrderItems')
      .leftJoin('paymentOrderItems.appointment', 'appointment')
      .leftJoin('appointment.serviceProvider', 'appointmentServiceProvider')
      .leftJoin('appointmentServiceProvider.staffUser', 'staffUser')
      .leftJoin('appointmentServiceProvider.serviceProviderGroup', 'serviceProviderGroup')
      .leftJoin('paymentOrderItems.serviceType', 'serviceType')
      .leftJoin('paymentOrderItems.medication', 'medication')
      .leftJoin('paymentOrderItems.testType', 'testType')
      .leftJoin('paymentOrderItems.testPanel', 'testPanel')
      .leftJoin('paymentOrderItems.cryoSubscription', 'cryoSubscription')

      // plan type
      .leftJoin('paymentOrderItems.planType', 'itemPlanType')
      .leftJoin('itemPlanType.paymentReceiptDescriptionItem', 'itemPaymentReceiptDescriptionItem')
      .leftJoin(
        'itemPaymentReceiptDescriptionItem.paymentReceiptDescriptionItem',
        'itemPaymentReceiptDescription',
      )
      .leftJoin('paymentOrderItems.patientPlan', 'itemPatientPlan')

      //adhoc payment
      .leftJoin('paymentOrderItems.patientAdhocPayment', 'patientAdhocPayment')
      .leftJoin('patientAdhocPayment.patientPlan', 'adhocPatientPlan')
      .leftJoin('adhocPatientPlan.planType', 'adhocPlanType')
      .leftJoin('adhocPlanType.paymentReceiptDescriptionItem', 'adhocPaymentReceiptDescriptionItem')
      .leftJoin(
        'adhocPaymentReceiptDescriptionItem.paymentReceiptDescriptionItem',
        'adhocPaymentReceiptDescription',
      )
      .where(id ? 'paymentOrder.id = :id' : 'paymentOrder.uuid = :uuid', {uuid, id})
      .orderBy('itemPaymentReceiptDescriptionItem.sequence', 'ASC')
      .getOne()
  )
}

export const isValidPaymentOrderItems = (paymentOrderItems: PaymentOrderItem[]): boolean => {
  return paymentOrderItems.some(
    (item) =>
      item.serviceTypeId ||
      item.appointmentId ||
      item.adhocPaymentId ||
      item.testTypeId ||
      item.testPanelId ||
      item.medicationId ||
      item.patientPlanId ||
      item.planTypeId,
  )
}

export const isValidServiceTypePaymentOrderItems = (
  paymentOrderItems: PaymentOrderItem[],
): boolean => {
  if (!paymentOrderItems.filter((item) => item.serviceTypeId)?.length) {
    return true
  }

  return paymentOrderItems.some((item) => item.serviceTypeId && item.appointmentId)
}

export const uploadPdfToStorage = async (
  path: string,
  steamableFile: StreamableFile,
  paymentOrderUUID: string,
): Promise<string> => {
  try {
    StructuredLogger.info(
      activityLogs.PaymentOrdersFunction.UploadPaymentReceiptPDF,
      activityLogs.PaymentOrdersAction.UploadOfReceiptPDFStarted,
      {paymentOrderUUID},
    )

    const fireBaseStorageAdapter = new FirebaseStorageAdapter(
      configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
    )

    const options = {
      disposition: `attachment; filename="receipt.pdf"`,
      type: 'application/pdf',
    }

    const fileStream = new StreamableFile(steamableFile.getStream(), options)

    await fireBaseStorageAdapter.uploadPrivateFile(path, fileStream.getStream())

    return path
  } catch (error) {
    StructuredLogger.error(
      activityLogs.PaymentOrdersFunction.UploadPaymentReceiptPDF,
      activityLogs.PaymentOrdersAction.UploadPaymentReceiptPDFFailed,
      {
        message: `Upload of payment receipt pdf failed`,
        ...parseError(error),
      },
      LogType.PaymentReceiptPDF,
    )

    return null
  }
}
