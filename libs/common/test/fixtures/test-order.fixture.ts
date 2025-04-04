import {TestOrder} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  patientAppointmentTestOrderFixture,
  patientBilling,
  patientBookedAppointmentCartFixture,
  patientClinicEmrKimLeFixture,
  patientEmailVerifiedFixture,
  patientForBackgroundInformationFixture,
  patientForForLibraryContentWithTestOrderFixture,
  patientForGetSpecimenDetailsFixture,
  patientForPatientAppointmentTestResultsFixture,
  patientForPendingPaymentListForOhipYesFixture,
  patientForPlansBackgroundFixture,
  patientForPlansV2CheckoutWithTestTypesFixture,
  patientForProfileTestResultsFixture,
  patientForProfileTestResultsForDiffPatientFixture,
  patientForUltrasoundDay3Fixture,
  patientForUltrasoundFixture,
  patientForUpdateOhipAvailabilityFixture,
  patientPlanSelectionDetailsFixture,
  patientToMoveSpecimenAppointmentInProgressFixture,
} from './patient.fixture'
import {testOrderCancellationReasonFixture} from './test-order-cancellation-reason.fixture'
import {staffUserFixture} from './staff.fixture'
import {DateTimeUtil} from '@libs/common'
import {Config} from '@config/config.util'
import {TestOrderStatusEnum} from '@libs/data-layer/apps/clinic-test/enums'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))

export const testOrderFixture: Partial<TestOrder> = {
  id: 1,
  uuid: '8bd3e13f-df16-4adb-9321-3977803e5459',
  comment: 'comment-1',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  customCancellationReason: 'Custom Cancellation Reason',
  staffUserId: staffUserFixture.id,
}

export const testOrderWithCancellationReasonFixture: Partial<TestOrder> = {
  id: 2,
  uuid: 'testOrder132d-11ed-814e-0242ac122003',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  cancellationReasonId: testOrderCancellationReasonFixture.id,
}

export const testOrderForCancelEndpoint: Partial<TestOrder> = {
  id: 3,
  uuid: 'd98aab5e-c047-4108-bc18-8af3f058f257',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderToFailCancelEndpoint: Partial<TestOrder> = {
  id: 4,
  uuid: '7239cb5b-467d-4b22-8700-130d4da51ceb',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.Collecting,
}

export const testOrderToUpdate: Partial<TestOrder> = {
  id: 5,
  uuid: 'testOrderUpdS-11ed-814e-0242ac122002',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderToFailUpdate: Partial<TestOrder> = {
  id: 6,
  uuid: 'testOrderUpdF-11ed-814e-0242ac122002',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.Collecting,
}

export const testOrderForRegularCancelEndpoint: Partial<TestOrder> = {
  id: 7,
  uuid: 'd98aab5e-c047-4908-bc18-8af3f058f357',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderSpecimenCollectionFixture: Partial<TestOrder> = {
  id: 8,
  uuid: '777aab5e-c047-4908-bc18-8af3f058f777',
  patientId: patientEmailVerifiedFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderForCreateAppointmentFixture: Partial<TestOrder> = {
  id: 9,
  uuid: 'fefde2b9-3a43-4a3e-8715-7bc7c76d40c3',
  patientId: patientAppointmentTestOrderFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderForUltrasoundFolliclesDetailFixture: Partial<TestOrder> = {
  id: 11,
  uuid: '777aab5e-c047-4908-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

// used in deprecated API
export const testOrderForUltrasoundFolliclesOldFixture: Partial<TestOrder> = {
  id: 12,
  uuid: '7ggaab5e-c047-4908-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForUltrasoundFolliclesDetailWIthEmptyActivePlanFixture: Partial<TestOrder> = {
  id: 13,
  uuid: '777aab5e-c047-4k08-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForGetSpecimensForAppointmentFixture: Partial<TestOrder> = {
  id: 14,
  uuid: '999aab5e-c047-4908-bc18-8af3f058f777',
  patientId: patientEmailVerifiedFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderSpermCryoFixture: Partial<TestOrder> = {
  id: 15,
  uuid: 'eaa2ed5a-58b2-4270-9e91-c1e6fe623c62',
  patientId: patientEmailVerifiedFixture.id,
  status: TestOrderStatusEnum.NotCollected,
}

export const testOrderSpermCryoCreateVialsFixture: Partial<TestOrder> = {
  id: 18,
  uuid: '834f02e5-c399-4cd3-a46d-689fc7e8a71c',
  patientId: patientForGetSpecimenDetailsFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
}

export const testOrderForUltrasoundDay3Fixture: Partial<TestOrder> = {
  id: 20,
  uuid: 20 + 'gaab5e-c047-4908-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForUltrasoundDay3LessDataFixture: Partial<TestOrder> = {
  id: 21,
  uuid: 21 + 'DDab5e-c047-4908-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForUltrasoundFolliclesFixture: Partial<TestOrder> = {
  id: 22,
  uuid: 22 + 'gaab5e-c047-4908-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForUltrasoundFolliclesLessDataFixture: Partial<TestOrder> = {
  id: 24,
  uuid: 24 + 'DDab5e-c047-4908-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForUltrasoundSonohysterogramFixture: Partial<TestOrder> = {
  id: 26,
  uuid: 26 + 'gaab5e-c047-4908-bc18-8af3f445f777',
  patientId: patientForUltrasoundFixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderSpecimenBarcodeFixture: Partial<TestOrder> = {
  id: 27,
  uuid: '11835935-b9a9-41a5-acfa-a6649d88d1ec',
  patientId: patientEmailVerifiedFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForClaimDetailsFixture: Partial<TestOrder> = {
  id: 28,
  uuid: 'e649bb42-efee-4471-a6c3-8cd2f813fb06',
  patientId: patientBilling.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForUltrasound3Fixture: Partial<TestOrder> = {
  id: 29,
  uuid: 'd0507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForUltrasoundDay3Fixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForPatAppTestResultsFixture: Partial<TestOrder> = {
  id: 32,
  uuid: 32 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForPatientAppointmentTestResultsFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForOrderActionsFixture: Partial<TestOrder> = {
  id: 33,
  uuid: 33 + '917a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForBackgroundInformationFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderSpecimenInProgressFixture: Partial<TestOrder> = {
  id: 34,
  uuid: 34 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientEmailVerifiedFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForPatientUpdateOhipFixture: Partial<TestOrder> = {
  id: 35,
  uuid: 35 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForUpdateOhipAvailabilityFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForPatientUpdateOhipWithTestWithPriceFixture: Partial<TestOrder> = {
  id: 36,
  uuid: 36 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForUpdateOhipAvailabilityFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForAppWithTestWithPriceForCheckoutFixture: Partial<TestOrder> = {
  id: 37,
  uuid: 37 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientBookedAppointmentCartFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderPendingPaymentListFixture: Partial<TestOrder> = {
  id: 39,
  uuid: 39 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForPendingPaymentListForOhipYesFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

// to show status based on testOrder if testResult not exist yet
export const testOrderForProfileStatusFixture: Partial<TestOrder> = {
  id: 42,
  uuid: 42 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForProfileTestResultsFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

//should not get status for this testOrderItem as it related to other patient
export const testOrderForProfileStatusForDiffPatientFixture: Partial<TestOrder> = {
  id: 45,
  uuid: 45 + '507a87-be89-4fd1-befc-6fde0c60598a',
  patientId: patientForProfileTestResultsForDiffPatientFixture.id,
  status: TestOrderStatusEnum.PartiallyBooked,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}

export const testOrderForPlanFixture: Partial<TestOrder> = {
  id: 46,
  uuid: '227aab5e-a047-4908-bc18-8af3f058f777',
  patientId: patientEmailVerifiedFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderForMobilePlanFixture: Partial<TestOrder> = {
  id: 47,
  uuid: '222aab2e-a047-5902-bc11-8af3f058f777',
  patientId: patientPlanSelectionDetailsFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderForMobilePlanAbandonedFixture: Partial<TestOrder> = {
  id: 48,
  uuid: '222aab2e-a047-5902-bc11-8af3f028f777',
  patientId: patientPlanSelectionDetailsFixture.id,
  status: TestOrderStatusEnum.Abandoned,
  staffUserId: staffUserFixture.id,
}

export const testOrderForCheckoutAbandonedFixture: Partial<TestOrder> = {
  id: 49,
  uuid: '322aaa2e-a047-5902-bc11-8af3f028f777',
  patientId: patientForPlansV2CheckoutWithTestTypesFixture.id,
  status: TestOrderStatusEnum.Abandoned,
  staffUserId: staffUserFixture.id,
}

export const testOrderForCheckoutFixture: Partial<TestOrder> = {
  id: 50,
  uuid: '322aaa2e-a047-5902-bc11-8af3f058f777',
  patientId: patientForPlansV2CheckoutWithTestTypesFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderForViewFixture: Partial<TestOrder> = {
  id: 51,
  uuid: '444aaa2e-a047-5902-bc11-8af3f058f888',
  patientId: patientClinicEmrKimLeFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
  comment: 'testOrderForViewFixture',
}

export const testOrderForLibraryContentWithTestOrderFixture: Partial<TestOrder> = {
  id: 54,
  uuid: 54 + '4aaa2e-a047-5902-bc11-8af3f058f888',
  patientId: patientForForLibraryContentWithTestOrderFixture.id,
  status: TestOrderStatusEnum.Completed,
  staffUserId: staffUserFixture.id,
}

export const testOrderToMoveAppointmentInProgressFixture: Partial<TestOrder> = {
  id: 55,
  uuid: 55 + '4aaa2e-a047-5902-bc11-8af3f058f888',
  patientId: patientToMoveSpecimenAppointmentInProgressFixture.id,
  status: TestOrderStatusEnum.Booked,
  staffUserId: staffUserFixture.id,
}

export const testOrderForPlansBackgroundPriceFixture: Partial<TestOrder> = {
  id: 56,
  uuid: 56 + 'aaa2e-a047-5902-bc11-8af3f058f777',
  patientId: patientForPlansBackgroundFixture.id,
  status: TestOrderStatusEnum.NotCollected,
  staffUserId: staffUserFixture.id,
}

export const testOrderForExternalBloodTestFixture: Partial<TestOrder> = {
  id: 57,
  uuid: '96f23b81-4c7e-48dd-8a25-f2e73764815a',
  patientId: patientEmailVerifiedFixture.id,
  status: TestOrderStatusEnum.AwaitingResults,
  staffUserId: staffUserFixture.id,
  createdAt: dateTimeUtil.now(),
}
