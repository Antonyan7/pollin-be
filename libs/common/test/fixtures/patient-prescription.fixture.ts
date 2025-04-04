import {PatientPrescription} from '@libs/data-layer/apps/users/entities/typeorm/patient-prescription.entity'
import {DateTimeUtil} from '@libs/common'
import {
  pharmacyFixture,
  pharmacyForBackgroundInformationFixture,
  pharmacyForPrescriptionDetailsFixture,
  pharmacyForPrescriptionUpdateFixture,
  pharmacyOfPatientForPrescriptionFileCreationFixture,
} from '@libs/common/test/fixtures/pharmacy.fixture'
import {
  cartPatientFixture,
  cartPatientUpdateFemaleSexAtBirthFixture,
  patientAcknowledgedMedicationsFixture,
  patientAppointmentTestOrderFixture,
  patientEmailVerifiedFixture,
  patientForNotTaxableServicesFixture,
  patientForPlans,
  patientForProfileHighlightFixture,
  patientForV2PaymentSheetFixture,
  patientOhipFixture,
  patientPrescriptionsFixture,
  patientForQuestionnaireFixture,
  patientForDocumentGenerationFixture,
  patientIdentifierFixture,
  patientForLinkedBillsFixture,
  patientForLinkedItemAdhocCheckoutFixture,
  patientForPlansEPLFixture,
  patientForPrescriptionUpdateFixture,
} from '@libs/common/test/fixtures/patient.fixture'
import {
  PatientMedicationRouteEnum,
  PatientPrescriptionStatus,
  PrescriptionType,
} from '@libs/services-common/enums/medication.enum'
import {
  staffAuthorOfEncounterAndAddendumFixture,
  staffClinicManagerFixture,
  staffUserFixture,
} from './staff.fixture'
import {CreatePatientPrescriptionRequestDTO} from '@apps/emr/prescriptions/dto/prescriptions.dto'
import {patientPartnerForProfileWithInvalidHighlightUuid} from '@libs/common/test/fixtures/patient-ids.fixture'
import {medicationFixture} from '@libs/common/test/fixtures/medication.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

const today: Date = dateTimeUtil.now()
export const prescribedOnPatientPrescriptionFixture: Date = today
export const patientPrescriptionInvalidUuid: string = '371f9b18-23d1-44b2-b5e6-42dd29565616'

export const patientPrescriptionFixture: Partial<PatientPrescription> = {
  id: 1,
  patientId: patientEmailVerifiedFixture.id,
  uuid: 'cba07546-c96b-424f-89ef-f3e5a309e1c1',
  pharmacyId: pharmacyFixture.id,
  prescribedOn: prescribedOnPatientPrescriptionFixture,
  updatedAt: prescribedOnPatientPrescriptionFixture,
}

export const patientPrescriptionIsCurrentFalseFixture: Partial<PatientPrescription> = {
  id: 2,
  patientId: patientEmailVerifiedFixture.id,
  uuid: 'isCurrentFalseUuid',
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.toDate(prescribedOnPatientPrescriptionFixture),
}

export const patientPrescriptionPendingMedicationActionChangedFixture: Partial<PatientPrescription> =
  {
    id: 3,
    patientId: patientEmailVerifiedFixture.id,
    uuid: 'actionChanged',
    pharmacyId: pharmacyFixture.id,
    prescribedOn: dateTimeUtil.toDate(prescribedOnPatientPrescriptionFixture),
  }

export const patientPrescriptionCurrentFixture: Partial<PatientPrescription> = {
  id: 10,
  patientId: patientPrescriptionsFixture.id,
  pharmacyId: pharmacyForBackgroundInformationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionUpcomingFixture: Partial<PatientPrescription> = {
  id: 21,
  uuid: 'ea632354-d874-4491-a8ba-9039da2d8046',
  patientId: patientPrescriptionsFixture.id,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionPastFixture: Partial<PatientPrescription> = {
  id: 32,
  patientId: patientPrescriptionsFixture.id,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
  type: PrescriptionType.External,
}
//ids 32-43 used for prescriptions paginations

export const patientPrescriptionCurrentLastDayFixture: Partial<PatientPrescription> = {
  id: 44,
  totalAmount: '222',
  patientId: patientEmailVerifiedFixture.id,
  uuid: 'prescriptionCurrentLastDay',
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
  status: PatientPrescriptionStatus.Prescribed,
}

export const patientPrescriptionWithoutInstructionFixture: Partial<PatientPrescription> = {
  id: 45,
  uuid: 'PrescrWithoutInstruction',
  patientId: patientForQuestionnaireFixture.id,
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
}
export const patientPrescriptionArchivedStatusFixture: Partial<PatientPrescription> = {
  id: 46,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29575786',
  patientId: patientEmailVerifiedFixture.id,
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
  status: PatientPrescriptionStatus.Archived,
}
export const patientPrescriptionPrescribedStatusFixture: Partial<PatientPrescription> = {
  id: 47,
  uuid: '371f9b18-23d1-44b2-b5e6-42dd29575744',
  patientId: patientEmailVerifiedFixture.id,
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
  status: PatientPrescriptionStatus.Prescribed,
  type: PrescriptionType.InHouse,
}

export const patientPrescriptionForPDFCreationFixture: Partial<PatientPrescription> = {
  id: 48,
  uuid: 'bce4aed4-93ac-4d51-80c3-bdf1ba2d6bcc',
  patientId: patientPrescriptionsFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
  preparedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 8),
  preparedByStaffId: staffAuthorOfEncounterAndAddendumFixture.id,
  paidOn: dateTimeUtil.subDays(dateTimeUtil.now(), 7),
  dispensedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  dispensedByStaffId: staffUserFixture.id,
}

export const patientPrescriptionForCreateCart: Partial<PatientPrescription> = {
  id: 49,
  uuid: 'e323fe43-4225-4c30-910a-dec718c3d163',
  patientId: cartPatientFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionForPDFCreationArchivedFixture: Partial<PatientPrescription> = {
  id: 50,
  uuid: 'bce4aed4-93ac-4d51-80c3-bdf1ba2d6bnn',
  patientId: patientPrescriptionsFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Archived,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const createPatientPrescriptionExternalType: CreatePatientPrescriptionRequestDTO = {
  patientId: patientPartnerForProfileWithInvalidHighlightUuid,
  prescription: {
    type: PrescriptionType.External,
    medications: [
      {
        internalDrugId: medicationFixture.uuid,
        dosage: 'test',
        frequency: 'frequency',
        time: 'test',
        strength: '500.1mg',
        name: 'Medication Fixture title',
        form: 'form',
        route: PatientMedicationRouteEnum.Intravenous,
        duration: {
          start: '2023-03-11',
          end: '2023-04-11',
        },
        quantity: 1,
        refill: 'test',
        refillNotes: 'test',
        doctorNotes: 'test',
      },
    ],
    prescriberId: staffClinicManagerFixture.uuid,
    pharmacy: {
      name: 'test',
      address: {
        street: 'test',
        city: 'test',
        postalCode: 'pharmacy_postalCode_for_check_external_type',
        province: 'province',
        country: 'test',
      },
    },
  },
}
//use functional test
export const patientPrescriptionForPlansFixture: Partial<PatientPrescription> = {
  id: 51,
  uuid: 'bce4aed4-93ac-4d51-80c3-bdf1ba2d6bkd',
  patientId: patientForPlans.id,
  pharmacyId: pharmacyFixture.id,
  paidOn: dateTimeUtil.subDays(dateTimeUtil.now(), 200),
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionChangesMadeFixture: Partial<PatientPrescription> = {
  id: 51,
  uuid: 'fa87e942-99a0-44b3-8d9f-982523165832',
  patientId: patientAppointmentTestOrderFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionWithoutOhip: Partial<PatientPrescription> = {
  id: 52,
  uuid: 'eb149820-404c-44ce-94ef-985662847321',
  patientId: cartPatientUpdateFemaleSexAtBirthFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionArchivedForGetMedicationsFixture: Partial<PatientPrescription> = {
  id: 53,
  uuid: '371f3c18-23d1-44b2-b5e6-42dd29575786',
  patientId: patientEmailVerifiedFixture.id,
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
  status: PatientPrescriptionStatus.Archived,
}

export const patientPrescriptionOhip: Partial<PatientPrescription> = {
  id: 54,
  uuid: 'ed920962-3325-40b3-871e-0e2caf970350',
  patientId: patientOhipFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionForArchiveFixture: Partial<PatientPrescription> = {
  id: 55,
  uuid: 'e816294c-7347-44b7-a599-0ce714f57654',
  patientId: patientAcknowledgedMedicationsFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientArchivedPrescriptionForMedicationStateFixture: Partial<PatientPrescription> = {
  id: 56,
  uuid: 'c377c505-a2f1-47d4-a97e-950a55023201',
  patientId: patientForProfileHighlightFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Archived,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const prescriptionToBePreparedStatusFixture: Partial<PatientPrescription> = {
  id: 57,
  uuid: '6e9bc5a2-f3f8-47b8-9295-ec2c71f0311b',
  patientId: patientEmailVerifiedFixture.id,
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 5),
  status: PatientPrescriptionStatus.Paid,
}

export const notTaxablePrescriptionWithoutOhip: Partial<PatientPrescription> = {
  id: 58,
  uuid: '612807c5-64f7-4f25-8ee7-b87c5fe3f092',
  patientId: patientForNotTaxableServicesFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const notTaxableAndTaxableMedicationsPrescriptionWithoutOhip: Partial<PatientPrescription> =
  {
    id: 59,
    uuid: '3cb31cd2-1d08-4122-ae28-cf53edccc5a0',
    patientId: patientForNotTaxableServicesFixture.id,
    prescriberId: staffClinicManagerFixture.id,
    status: PatientPrescriptionStatus.Prescribed,
    pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
    prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  }

export const prescriptionToBeCalledOrFaxedInFixture: Partial<PatientPrescription> = {
  id: 60,
  uuid: '22b31cd2-1d08-4122-ae28-cf53edccc680',
  patientId: patientForNotTaxableServicesFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
}

export const patientPrescriptionForSplitPayment: Partial<PatientPrescription> = {
  id: 61,
  uuid: '72e1ce35-5dee-42ef-9372-940f74f1f425',
  patientId: patientForV2PaymentSheetFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const patientPrescriptionArchivedFixture: Partial<PatientPrescription> = {
  id: 62,
  uuid: '64b22f23-a1f3-466f-b7d0-5f57fcd40461',
  patientId: patientEmailVerifiedFixture.id,
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
  status: PatientPrescriptionStatus.Archived,
}

export const patientPrescriptionToGenerateDocumentFixture: Partial<PatientPrescription> = {
  id: 63,
  uuid: '62b22f23-a2f2-261f-c7d0-5f57fcd40461',
  patientId: patientForDocumentGenerationFixture.id,
  pharmacyId: pharmacyFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 9),
  status: PatientPrescriptionStatus.Paid,
}

export const patientPrescriptionPhysicalPrescriptionProvidedFixture: Partial<PatientPrescription> =
  {
    id: 64,
    uuid: 'c6ed1d7d-f322-467e-9f9f-e6ad10ac1679',
    patientId: patientIdentifierFixture.id,
    status: PatientPrescriptionStatus.PhysicalPrescriptionProvided,
    pharmacyId: pharmacyOfPatientForPrescriptionFileCreationFixture.id,
    prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
    physicalPrescriptionProvidedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 4),
    physicalPrescriptionProvidedByStaffId: staffUserFixture.id,
  }

export const patientPrescriptionForBillsFixture: Partial<PatientPrescription> = {
  id: 65,
  uuid: '62b22f23-a2a2-361a-c7d0-5f57fcd40461',
  patientId: patientForLinkedBillsFixture.id,
  pharmacyId: pharmacyFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  prescribedOn: dateTimeUtil.toDate('2025-02-12T13:00:00'),
  totalAmount: '100',
}

export const patientPrescriptionForBillsPaidFixture: Partial<PatientPrescription> = {
  id: 66,
  uuid: '0ee0a799-8d2a-4983-904c-7525aef96ea5',
  patientId: patientForLinkedBillsFixture.id,
  pharmacyId: pharmacyFixture.id,
  status: PatientPrescriptionStatus.Paid,
  prescribedOn: dateTimeUtil.toDate('2025-02-12T13:00:00'),
  type: PrescriptionType.InHouse,
  totalAmount: '100',
}

export const patientPrescriptionForAdhocCheckoutFixture: Partial<PatientPrescription> = {
  id: 67,
  uuid: '62b42f22-b2b4-361a-c7d0-5f57fcd40461',
  patientId: patientForLinkedItemAdhocCheckoutFixture.id,
  pharmacyId: pharmacyFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
  totalAmount: '100',
}

export const patientPrescriptionForBillsExternalTypeFixture: Partial<PatientPrescription> = {
  id: 68,
  uuid: '68b22f23-a2a2-361a-c7d0-5f57fcd40461',
  patientId: patientForLinkedBillsFixture.id,
  pharmacyId: pharmacyFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  type: PrescriptionType.External,
  prescribedOn: dateTimeUtil.toDate('2025-02-12T13:00:00'),
  totalAmount: '100',
}

export const patientPrescriptionForDetailsExternalTypeFixture: Partial<PatientPrescription> = {
  id: 69,
  uuid: 'bce4aed3-23ab-4d51-80c3-bdf1ba2d6bcc',
  patientId: patientForPlansEPLFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  type: PrescriptionType.External,
  pharmacyId: pharmacyForPrescriptionDetailsFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPrescriptionForDetailsInHouseFixture: Partial<PatientPrescription> = {
  id: 70,
  uuid: 'bce4aed3-23ab-4d51-80c3-bdf1ba2d7bca',
  type: PrescriptionType.InHouse,
  patientId: patientForPlansEPLFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: null,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPrescriptionToUpdateInHouseFixture: Partial<PatientPrescription> = {
  id: 71,
  uuid: '0ee0a799-8d2a-4983-904c-7525aef96eb3',
  type: PrescriptionType.InHouse,
  patientId: patientForPrescriptionUpdateFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyForPrescriptionUpdateFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}

export const patientPrescriptionToUpdateExternalFixture: Partial<PatientPrescription> = {
  id: 72,
  uuid: '0ee0a799-8d2a-4983-904c-7525aef96eb4',
  type: PrescriptionType.External,
  patientId: patientForPrescriptionUpdateFixture.id,
  prescriberId: staffClinicManagerFixture.id,
  status: PatientPrescriptionStatus.Prescribed,
  pharmacyId: pharmacyForPrescriptionUpdateFixture.id,
  prescribedOn: dateTimeUtil.subDays(dateTimeUtil.now(), 10),
}
