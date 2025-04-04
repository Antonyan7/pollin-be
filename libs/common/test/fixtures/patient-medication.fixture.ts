/* eslint-disable max-lines */
import {PatientMedication} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  medicationFixture,
  medicationWithoutInstructionFixture,
  patientEmailVerifiedFixture,
  patientForProfileHighlightFixture,
  patientPrescriptionCurrentLastDayFixture,
  patientPrescriptionFixture,
  patientPrescriptionIsCurrentFalseFixture,
  patientPrescriptionPastFixture,
  patientPrescriptionPendingMedicationActionChangedFixture,
  patientPrescriptionsFixture,
  patientPrescriptionUpcomingFixture,
  patientPrescriptionWithoutInstructionFixture,
  patientForQuestionnaireFixture,
  patientPrescriptionForPDFCreationFixture,
  patientForPlansCreationFixture,
  patientPrescriptionForCreateCart,
  patientAcknowledgedMedicationsFixture,
  medicationDetailFixture,
  milestoneDetailsPatientFixture,
  patientForPlanPartnerFixture,
  patientAppointmentTestOrderFixture,
  patientPrescriptionChangesMadeFixture,
  cartPatientUpdateFemaleSexAtBirthFixture,
  patientPrescriptionWithoutOhip,
  patientPrescriptionArchivedForGetMedicationsFixture,
  patientPrescriptionOhip,
  patientOhipFixture,
  patientPrescriptionForArchiveFixture,
  medicationForSearchTitleFixture,
  patientArchivedPrescriptionForMedicationStateFixture,
  patientForEPPFixture,
  patientForNotTaxableServicesFixture,
  notTaxableMedicationFixture,
  notTaxablePrescriptionWithoutOhip,
  notTaxableAndTaxableMedicationsPrescriptionWithoutOhip,
  patientForPlansV2Fixture,
  patientForPlanTypesFixture,
  patientForPlansV3Fixture,
  compoundMedicationFixture,
  patientForRevisionFixture,
  patientPrescriptionForBillsPaidFixture,
  patientPrescriptionForBillsFixture,
  patientForLinkedBillsFixture,
  patientFemaleFixture,
  patientPrescriptionForDetailsExternalTypeFixture,
  patientForPrescriptionUpdateFixture,
  patientPrescriptionToUpdateInHouseFixture,
} from '@libs/common/test/fixtures/index'
import {DateTimeUtil} from '@libs/common'
import {
  MedicationForm,
  PatientMedicationRouteEnum,
  PendingMedicationAction,
} from '@libs/services-common/enums/medication.enum'
import {staffAuthorOfEncounterAndAddendumFixture, staffClinicManagerFixture} from './staff.fixture'
const dateTimeUtil: DateTimeUtil = new DateTimeUtil()
const today: Date = dateTimeUtil.now()
const twoDaysFromNow: Date = dateTimeUtil.addDays(dateTimeUtil.now(), 2)
const yesterday: Date = dateTimeUtil.subDays(dateTimeUtil.now(), 1)
export const patientMedicationWithoutPrescriptionCreatedAt: Date = dateTimeUtil.now()
export const patientMedicationInvalidUuid: string = 'patientMedicationInvalidUuid'

const patientMedicationBaseFixture: Partial<PatientMedication> = {
  patientId: patientForProfileHighlightFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
}

export const patientMedicationsFixtures: Partial<PatientMedication>[] = [
  {
    id: 1,
    uuid: '371f9b18-23d1-44b2-b5e6-42bd39565694',
    nameFromIntake: 'From Intake Concerta',
    dosage: 'Extra Strength',
    ...patientMedicationBaseFixture,
    drugBankId: 'DB07777',
  },
  {
    id: 2,
    name: 'Sulfonamides',
    dosage: '1000MG',
    ...patientMedicationBaseFixture,
  },
  {
    id: 3,
    nameFromIntake: 'From Intake Paracetamol',
    dosage: '50MG',
    ...patientMedicationBaseFixture,
  },
]
export const patientMedicationFixture: Partial<PatientMedication> = {
  id: 4,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565694',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(today),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  endDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(twoDaysFromNow),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),

  frequency: '1 time',
  dosage: '100 mg',
  medicationTime: '07:00',
  pendingMedicationAction: PendingMedicationAction.Changed,
  prescriptionId: patientPrescriptionFixture.id,
  route: PatientMedicationRouteEnum.Orally,
}
export const patientMedicationIsCurrentFalseFixture: Partial<PatientMedication> = {
  id: 5,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565623',
  startDate: dateTimeUtil.now(),
  endDate: dateTimeUtil.addMonths(dateTimeUtil.now(), -1),
  frequency: 'frequency patientMedicationIsCurrentFalseFixture',
  dosage: 'dosage patientMedicationIsCurrentFalseFixture',
  medicationTime: 'medicationTime patientMedicationIsCurrentFalseFixture',
  medicationId: medicationFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  prescriptionId: patientPrescriptionIsCurrentFalseFixture.id,
}
export const patientMedicationPendingMedicationActionChangedFixture: Partial<PatientMedication> = {
  id: 6,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565616',
  startDate: dateTimeUtil.addMonths(dateTimeUtil.now(), 1),
  endDate: dateTimeUtil.addMonths(dateTimeUtil.now(), 1),
  frequency: 'frequency patientMedicationPendingMedicationActionChangedFixture',
  dosage: 'dosage patientMedicationPendingMedicationActionChangedFixture',
  medicationTime: 'medicationTime patientMedicationPendingMedicationActionChangedFixture',
  pendingMedicationAction: PendingMedicationAction.Changed,
  medicationId: medicationFixture.id,
  patientId: patientEmailVerifiedFixture.id,
  prescriptionId: patientPrescriptionPendingMedicationActionChangedFixture.id,
}
export const patientMedicationCurrentFixture: Partial<PatientMedication> = {
  id: 7,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565615',
  medicationId: medicationFixture.id,
  name: 'Concerta Extra Strength',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientPrescriptionsFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForPDFCreationFixture.id,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '40 mg',
  route: PatientMedicationRouteEnum.Orally,
  frequency: 'BID – Twice daily',
  form: MedicationForm.Tablets,
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  lastChangeAcknowledgedOn: dateTimeUtil.toDate('2022-11-10T05:23:00.000Z'),
}
export const patientMedicationUpcomingFixture: Partial<PatientMedication> = {
  id: 19,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565614',
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 6),
  patientId: patientPrescriptionsFixture.id,
  prescriptionId: patientPrescriptionUpcomingFixture.id,
}
export const patientMedicationPastFixture: Partial<PatientMedication> = {
  id: 31,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565613',
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  patientId: patientPrescriptionsFixture.id,
  prescriptionId: patientPrescriptionPastFixture.id,
}
export const patientMedicationCurrentLastDayFixture: Partial<PatientMedication> = {
  id: 42,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565611',
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(yesterday),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  endDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(today),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  patientId: patientEmailVerifiedFixture.id,
  prescriptionId: patientPrescriptionCurrentLastDayFixture.id,
  pendingMedicationAction: null,
}
export const patientMedicationWithoutInstructionFixture: Partial<PatientMedication> = {
  id: 43,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29565612',
  medicationId: medicationWithoutInstructionFixture.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '',
  pendingMedicationAction: PendingMedicationAction.New,
  patientId: patientForQuestionnaireFixture.id,
  prescriptionId: patientPrescriptionWithoutInstructionFixture.id,
}

export const patientMedicationUpdateFixture: Partial<PatientMedication> = {
  id: 44,
  uuid: 'b9f2bbc0-aeec-44bd-8f78-4ef3b5d21c23',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: patientForQuestionnaireFixture.id,
  dosage: '1',
  prescriptionId: patientPrescriptionWithoutInstructionFixture.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '1',
  frequency: '1',
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
}

export const patientMedicationToUseForPrescriptionPDFCreationFixture: Partial<PatientMedication> = {
  ...patientMedicationCurrentFixture,
  id: 45,
  dosage: '50 mL',
  route: PatientMedicationRouteEnum.Intravenous,
  frequency: 'BID – Twice daily',
  quantity: null,
  medicationTime: null,
  refill: null,
  refillNote: 'Patient needs another refill in two weeks. Should not need to come in.',
  doctorNote: 'Her mom had warned her. She had been warned time and again',
}

export const patientMedicationIcFormFixture: Partial<PatientMedication> = {
  id: 111,
  uuid: 'b9f2bbc0-aeec-44bd-8f78-4ef3b5d21c33',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: patientForPlansCreationFixture.id,
  prescriptionId: patientPrescriptionWithoutInstructionFixture.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '',
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
}

export const patientMedicationForCreateCartFixture: Partial<PatientMedication> = {
  id: 49,
  uuid: '140444ee-00fd-4fb0-a3b1-2ad1f1f644ff',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: patientForPlansCreationFixture.id,
  name: 'test medication',
  lockedPrice: '9.43',
  prescriptionId: patientPrescriptionForCreateCart.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '',
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
  quantity: 2,
}

export const patientSecondMedicationForCreateCartFixture: Partial<PatientMedication> = {
  id: 50,
  uuid: '5bfd5a25-868c-4394-a1cd-ec83b283b998',
  medicationId: medicationDetailFixture.id,
  patientId: patientForPlansCreationFixture.id,
  prescriptionId: patientPrescriptionForCreateCart.id,
  name: 'test medication 2',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '',
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
  quantity: 3,
  lockedPrice: '10.37',
}

export const patientMedicationWithoutPrescriptionFixture: Partial<PatientMedication> = {
  id: 51,
  uuid: 'e4121cd6-4037-4d58-a0ec-8eb293c4c94f',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  frequency: '3 time',
  dosage: '150 mg',
  medicationTime: '17:00',
  pendingMedicationAction: PendingMedicationAction.Changed,
  createdAt: patientMedicationWithoutPrescriptionCreatedAt,
}

export const patientMedicationPendingMedicationActionCheckFixture: Partial<PatientMedication> = {
  id: 52,
  uuid: 'ff514e34-cfe2-4d43-8c63-6e1eacc3e919',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(today),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  endDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(twoDaysFromNow),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  frequency: '3 time',
  dosage: '150 mg',
  medicationTime: '17:00',
  createdAt: patientMedicationWithoutPrescriptionCreatedAt,
  pendingMedicationAction: PendingMedicationAction.New,
}

export const patientAcknowledgedMedicationsFirstFixture: Partial<PatientMedication> = {
  id: 53,
  uuid: '056463b7-8373-454a-b493-52f44e01db50',
  medicationId: medicationFixture.id,
  name: 'Concerta Extra Strength',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientAcknowledgedMedicationsFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForPDFCreationFixture.id,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '40 mg',
  route: PatientMedicationRouteEnum.Orally,
  form: MedicationForm.Capsules,
  frequency: 'BID – Twice daily',
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
}

export const patientAcknowledgedMedicationsSecondFixture: Partial<PatientMedication> = {
  id: 54,
  uuid: 'bff5bf26-838a-40d6-a694-368b94a68cf3',
  medicationId: medicationDetailFixture.id,
  name: 'Sulfonamides',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientAcknowledgedMedicationsFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForPDFCreationFixture.id,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '40 mg',
  route: PatientMedicationRouteEnum.Orally,
  form: MedicationForm.Injection,
  frequency: 'BID – Twice daily',
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientAcknowledgedMedicationsThirdFixture: Partial<PatientMedication> = {
  id: 55,
  uuid: 'f1c5de66-33c0-420b-b439-233dd0ff5aac',
  medicationId: medicationWithoutInstructionFixture.id,
  name: 'Paracetamol',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientAcknowledgedMedicationsFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForPDFCreationFixture.id,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '10',
  route: PatientMedicationRouteEnum.Orally,
  frequency: 'BID – Twice daily',
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
}

export const patientNotAcknowledgedMedicationsForAlertFixture: Partial<PatientMedication> = {
  id: 56,
  uuid: '1ec596ca-9f96-4d88-8c07-3eae76532ec5',
  medicationId: medicationWithoutInstructionFixture.id,
  name: 'Paracetamol',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: milestoneDetailsPatientFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForPDFCreationFixture.id,
  pendingMedicationAction: PendingMedicationAction.Changed,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '10',
  route: PatientMedicationRouteEnum.Orally,
  frequency: 'BID – Twice daily',
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
}

export const archivedPrescriptionMedication: Partial<PatientMedication> = {
  id: 57,
  uuid: 'b934ef83-5845-4cbb-82fb-644aef29a167',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(today),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  endDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(twoDaysFromNow),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  frequency: '1 time',
  dosage: '100 mg',
  medicationTime: '07:00',
  pendingMedicationAction: PendingMedicationAction.Changed,
  prescriptionId: patientPrescriptionArchivedForGetMedicationsFixture.id,
}

export const medicationWithoutPrescription: Partial<PatientMedication> = {
  id: 58,
  uuid: '8d16c044-3029-4d45-8093-e94cdb653550',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(today),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  endDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(twoDaysFromNow),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  frequency: '1 time',
  dosage: '100 mg',
  medicationTime: '07:00',
  pendingMedicationAction: PendingMedicationAction.Changed,
}

export const medicationForStimSheetFixture: Partial<PatientMedication> = {
  id: 59,
  uuid: '8d16c044-3029-4d45-8093-e94cdb653120',
  patientId: patientForPlanPartnerFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.toDate('2020-02-01'),
  endDate: dateTimeUtil.toDate('2020-02-02'),
}

export const medicationForStimSheetWithoutMedicationFixture: Partial<PatientMedication> = {
  id: 60,
  uuid: '8d16c044-3029-4d45-8093-e94cdb653330',
  patientId: patientForPlanPartnerFixture.id,
  nameFromIntake: 'medicationForStimSheetWithoutMedication',
  startDate: dateTimeUtil.toDate('2020-02-02'),
  endDate: dateTimeUtil.toDate('2020-02-05'),
}

export const medicationChangesMadeFixture: Partial<PatientMedication> = {
  id: 61,
  uuid: '112e0ed6-7f04-4825-8de3-60b006e3853c',
  patientId: patientAppointmentTestOrderFixture.id,
  medicationId: medicationFixture.id,
  nameFromIntake: 'medicationChangesMadeLabel',
  startDate: today,
  endDate: today,
  frequency: '1 time',
  dosage: '100 mg',
  medicationTime: '07:00',
  prescriptionId: patientPrescriptionChangesMadeFixture.id,
  pendingMedicationAction: PendingMedicationAction.Changed,
}

export const patientMedicationWithoutOhipFixture: Partial<PatientMedication> = {
  id: 62,
  uuid: '7c6e3bbb-d347-4469-8bd6-f3a97ab09bf8',
  name: 'Sulfonamides',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: cartPatientUpdateFemaleSexAtBirthFixture.id,
  prescriptionId: patientPrescriptionWithoutOhip.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '',
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
  lockedPrice: '2.33',
  quantity: 2,
}

export const patientSecondMedicationWithoutOhipFixture: Partial<PatientMedication> = {
  id: 63,
  lockedPrice: '8.45',
  uuid: '07565055-1328-4399-b96a-e3c3282b292b',
  medicationId: medicationDetailFixture.id,
  patientId: cartPatientUpdateFemaleSexAtBirthFixture.id,
  name: 'Sulfonamides',
  prescriptionId: patientPrescriptionWithoutOhip.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '',
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
  quantity: 3,
}

export const patientMedicationUpcomingBaseFixture: Partial<PatientMedication> = {
  id: 64,
  uuid: '371f9c28-23d1-44b2-b5e6-42dd29565694',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: medicationFixture.id,
  startDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(yesterday),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
  endDate: dateTimeUtil.subtractMinutes(
    dateTimeUtil.startOfDay(twoDaysFromNow),
    dateTimeUtil.getTimezoneOffsetMin(),
  ),
}

export const ohipPatientMedication: Partial<PatientMedication> = {
  id: 65,
  uuid: 'eb20de90-ce8d-48c8-81c9-1720efa1226f',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: patientOhipFixture.id,
  name: 'Sulfonamides',
  prescriptionId: patientPrescriptionOhip.id,
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 6),
  endDate: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  medicationTime: '',
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
  quantity: 2,
  lockedPrice: '5',
}

export const patientArchivedPrescriptionMedicationsThirdFixture: Partial<PatientMedication> = {
  id: 66,
  uuid: '9089dcf2-6b5a-4d3f-a3ff-2ebdf5da2301',
  medicationId: medicationForSearchTitleFixture.id,
  name: 'Paracetamol',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientAcknowledgedMedicationsFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForArchiveFixture.id,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '10',
  route: PatientMedicationRouteEnum.Orally,
  frequency: 'BID – Twice daily',
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
}

export const patientMedicationForArchivedPrescriptionFixture: Partial<PatientMedication> = {
  id: 67,
  uuid: 'a746702a-90c3-4d6d-b90f-4405ae1f6b9b',
  medicationId: medicationForSearchTitleFixture.id,
  name: 'Paracetamol',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientForProfileHighlightFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientArchivedPrescriptionForMedicationStateFixture.id,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '10',
  route: PatientMedicationRouteEnum.Orally,
  frequency: 'BID – Twice daily',
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
}

export const patientMedicationToDiscontinueFixture: Partial<PatientMedication> = {
  id: 68,
  uuid: '8d16c055-3029-4d45-8093-e94cdb653330',
  patientId: patientForEPPFixture.id,
  nameFromIntake: 'patientMedicationToDiscontinue',
  dosage: '213',
  frequency: 'freq',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const patientMedicationToDiscontinueFutureFixture: Partial<PatientMedication> = {
  id: 69,
  uuid: '8d16b055-3029-4d45-8093-e94cdb653330',
  patientId: patientForEPPFixture.id,
  nameFromIntake: 'patientMedicationToDiscontinueFuture',
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const notTaxablePatientMedicationFixture: Partial<PatientMedication> = {
  id: 70,
  uuid: 'fb1d83c4-e3ac-4342-9a33-6b7e00b017d0',
  patientId: patientForNotTaxableServicesFixture.id,
  nameFromIntake: 'patientMedicationToDiscontinueFuture',
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  medicationId: notTaxableMedicationFixture.id,
  prescriptionId: notTaxablePrescriptionWithoutOhip.id,
  name: 'NotTaxablePatientMedication',
  quantity: 1,
  lockedPrice: '10.37',
}

export const patientMedicationForTaxablePrescriptionFixture: Partial<PatientMedication> = {
  id: 71,
  uuid: '5a03c513-3233-40c5-933f-702fe0d6066d',
  patientId: patientForNotTaxableServicesFixture.id,
  nameFromIntake: 'patientMedicationToDiscontinueFuture',
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  medicationId: medicationFixture.id,
  prescriptionId: notTaxableAndTaxableMedicationsPrescriptionWithoutOhip.id,
  name: 'NotTaxablePatientMedication',
  quantity: 2,
  lockedPrice: '11',
}

export const secondPatientMedicationForTaxablePrescriptionFixture: Partial<PatientMedication> = {
  id: 72,
  uuid: '728dd351-cb4e-4696-9bff-85d752a02222',
  patientId: patientForNotTaxableServicesFixture.id,
  nameFromIntake: 'patientMedicationToDiscontinueFuture',
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  medicationId: notTaxableMedicationFixture.id,
  prescriptionId: notTaxableAndTaxableMedicationsPrescriptionWithoutOhip.id,
  name: 'NotTaxablePatientMedication',
  quantity: 3,
  lockedPrice: '10',
}

export const patientMedicationToDiscontinueV2Fixture: Partial<PatientMedication> = {
  id: 73,
  uuid: '8d16c065-3029-4d45-8093-e94cdb653330',
  patientId: patientForPlansV2Fixture.id,
  nameFromIntake: 'patientMedicationToDiscontinue',
  dosage: '213',
  frequency: 'freq',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const patientMedicationToDiscontinueFutureV2Fixture: Partial<PatientMedication> = {
  id: 74,
  uuid: '8d16b065-3029-4d45-8093-e94cdb653330',
  patientId: patientForPlansV2Fixture.id,
  nameFromIntake: 'patientMedicationToDiscontinueFuture',
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const patientMedicationCurrentForPlanTypes: Partial<PatientMedication> = {
  id: 75,
  uuid: '2d16b065-3029-4d45-8093-e94cdb653330',
  patientId: patientForPlanTypesFixture.id,
  dosage: '123',
  frequency: 'once in 13',
  nameFromIntake: 'patientMedicationCurrentForPlanTypes',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const patientMedicationFutureForPlanTypes: Partial<PatientMedication> = {
  id: 76,
  uuid: '3d16b065-3029-4d45-8093-e94cdb653330',
  patientId: patientForPlanTypesFixture.id,
  nameFromIntake: 'patientMedicationFutureForPlanTypes',
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const patientMedicationToDiscontinueV3Fixture: Partial<PatientMedication> = {
  id: 77,
  uuid: '8d16c065-3029-4d45-8093-a94cdb653330',
  patientId: patientForPlansV3Fixture.id,
  nameFromIntake: 'patientMedicationToDiscontinueV3Fixture',
  dosage: '213',
  frequency: 'freq',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.toDate('3000-02-02'),
}

export const patientMedicationToDiscontinueFutureV3Fixture: Partial<PatientMedication> = {
  id: 78,
  uuid: '8d16b065-3029-4d45-8093-b94cdb653330',
  patientId: patientForPlansV3Fixture.id,
  nameFromIntake: 'patientMedicationToDiscontinueFutureV3Fixture',
  startDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const patientMedicationForHIghlightFromPatientIntakeOnlyFirstFixture: Partial<PatientMedication> =
  {
    id: 80,
    uuid: 80 + '46702a-90c3-4d6d-b90f-4405ae1f6b9b',
    nameFromIntake: 'patientMedicationForHIghlightFromPatientIntakeOnlyFirstFixture',
    patientId: patientForProfileHighlightFixture.id,
    dosage: 'patientMedicationForHIghlightFromPatientIntakeOnlyFirstFixture dosage',
    frequency: 'patientMedicationForHIghlightFromPatientIntakeOnlyFirstFixture frequency',
  }

export const patientMedicationForHIghlightFromPatientIntakeOnlyTwoFixture: Partial<PatientMedication> =
  {
    id: 81,
    uuid: 81 + '46702a-90c3-4d6d-b90f-4405ae1f6b9b',
    nameFromIntake: 'patientIntake 2',
    patientId: patientForProfileHighlightFixture.id,
    dosage: 'patientMedicationForHIghlightFromPatientIntakeOnlyFirstFixture dosage 2',
    frequency: 'patientMedicationForHIghlightFromPatientIntakeOnlyFirstFixture frequency 2',
  }
export const patientMedicationForHIghlightFromPatientIntakeOnlyTheeFixture: Partial<PatientMedication> =
  {
    id: 82,
    uuid: 82 + '46702a-90c3-4d6d-b90f-4405ae1f6b9b',
    nameFromIntake: 'patientIntake 3',
    patientId: patientForProfileHighlightFixture.id,
    dosage: 'patientIntake dosage 3',
    frequency: 'patientIntake frequency 3',
  }

export const patientCompoundMedicationWithLetterUrl: Partial<PatientMedication> = {
  id: 83,
  uuid: 'ce02a9bc-39ad-4cf0-91e5-f453ac7f81a0',
  patientId: patientEmailVerifiedFixture.id,
  medicationId: compoundMedicationFixture.id,
  nameFromIntake: 'patientMedicationToDiscontinue',
  dosage: '15',
  frequency: 'freq',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 2),
}

export const patientMedicationForRevisionFixture: Partial<PatientMedication> = {
  id: 84,
  uuid: 'd7aedb2b-ee64-42cc-9e2e-15c820952dc2',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: patientForRevisionFixture.id,
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
}

export const patientMedicationForBillsPaidFixture: Partial<PatientMedication> = {
  id: 85,
  uuid: 'd7aedb2b-eb24-42cc-9e2e-15c820952dc2',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: patientForLinkedBillsFixture.id,
  pendingMedicationAction: PendingMedicationAction.New,
  route: PatientMedicationRouteEnum.Intramuscular,
  prescriptionId: patientPrescriptionForBillsPaidFixture.id,
  name: 'patientMedicationForBillsPaidFixture',
}

export const patientMedicationForBillsNotPaidFixture: Partial<PatientMedication> = {
  id: 86,
  uuid: 'd7aedb3c-ee64-42cc-9e2e-15c820952dc2',
  medicationId: medicationWithoutInstructionFixture.id,
  patientId: patientForLinkedBillsFixture.id,
  quantity: 2,
  prescriptionId: patientPrescriptionForBillsFixture.id,
  name: 'patientMedicationForBillsNotPaidFixture',
}

export const patientMedicationForBillsNotPaidForSequenceFixture: Partial<PatientMedication> = {
  id: 87,
  uuid: 'd8aedb3c-ee64-42cc-9e2e-15c820952dc2',
  patientId: patientForLinkedBillsFixture.id,
  prescriptionId: patientPrescriptionForBillsFixture.id,
  nameFromIntake: 'patientMedicationForBillsNotPaidForSequenceFixture',
  drugBankId: 'patientMedicationForBillsNotPaidForSequenceFixture',
}

export const patientMedicationForPrescriptionAllFieldsFixture: Partial<PatientMedication> = {
  id: 88,
  uuid: 'bff5bf26-838a-40d6-a694-368a94a68cf4',
  medicationId: medicationFixture.id,
  name: 'Sulfonamides',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientFemaleFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForDetailsExternalTypeFixture.id,
  externalPrescriberName: 'External Prescriber Name',
  dosage: '40 mg',
  route: PatientMedicationRouteEnum.Orally,
  form: MedicationForm.Injection,
  frequency: 'twice daily',
  quantity: 1,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
}

export const patientMedicationForPrescriptionEmptyFieldsFixture: Partial<PatientMedication> = {
  id: 89,
  uuid: 'f1c5de66-33c0-420b-b439-233dc0ff5aa5',
  medicationId: null,
  name: 'Paracetamol',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientFemaleFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionForDetailsExternalTypeFixture.id,
  externalPrescriberName: '',
  dosage: '',
  route: '',
  frequency: '',
  quantity: 0,
  medicationTime: '',
  refill: '',
  refillNote: '',
  form: MedicationForm.Capsules,
}

export const patientMedicationForPrescriptionToUpdateFixture: Partial<PatientMedication> = {
  id: 90,
  uuid: 'a1c5de62-33c0-420b-b439-233dc0ff5aa5',
  lockedPrice: '10.00',
  medicationId: medicationFixture.id,
  name: 'Paracetamol',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientForPrescriptionUpdateFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionToUpdateInHouseFixture.id,
  externalPrescriberName: '',
  dosage: '23',
  route: '13',
  frequency: '14',
  quantity: 4,
  doctorNote: 'doctorNote',
  medicationTime: '15',
  refill: '16',
  refillNote: '17',
  form: MedicationForm.Capsules,
}

export const patientMedicationForPrescriptionToNotUpdateDrugBankFixture: Partial<PatientMedication> =
  {
    id: 91,
    uuid: 'a1c5ae63-43c1-420b-b439-233dc0ff5aa5',
    lockedPrice: '0.00',
    drugBankId: 'drugBankId',
    name: 'Paracetamol',
    startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
    endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
    patientId: patientForPrescriptionUpdateFixture.id,
    staffId: staffAuthorOfEncounterAndAddendumFixture.id,
    prescriptionId: patientPrescriptionToUpdateInHouseFixture.id,
    externalPrescriberName: '',
    dosage: '12 ml',
    route: 'intramuscular',
    frequency: 'once daily',
    quantity: 3,
    medicationTime: '8:00 PM',
    refill: '2',
    refillNote: 'Refill note refill note',
    form: MedicationForm.Injection,
    doctorNote: 'doctorNote',
  }

export const patientMedicationForPrescriptionToDeleteFixture: Partial<PatientMedication> = {
  id: 92,
  uuid: 'ac25ae64-43c1-420b-b439-233dc0ff5aa5',
  lockedPrice: '35.00',
  medicationId: medicationDetailFixture.id,
  name: 'Paracetamol',
  startDate: dateTimeUtil.subDays(dateTimeUtil.now(), 2),
  endDate: dateTimeUtil.addDays(dateTimeUtil.now(), 3),
  patientId: patientForPrescriptionUpdateFixture.id,
  staffId: staffClinicManagerFixture.id,
  prescriptionId: patientPrescriptionToUpdateInHouseFixture.id,
  externalPrescriberName: '',
  dosage: '12 ml',
  route: 'intramuscular',
  frequency: 'once daily',
  quantity: 2,
  medicationTime: '8:00 PM',
  refill: '2',
  refillNote: 'Refill note refill note',
  form: MedicationForm.Injection,
  doctorNote: 'doctorNote',
}
