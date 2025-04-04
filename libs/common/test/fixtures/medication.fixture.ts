import {
  Medication,
  MedicationPredifinedDosage,
} from '@libs/data-layer/apps/medication/entities/typeorm'
import {
  MedicationForm,
  PatientMedicationRouteEnum,
} from '@libs/services-common/enums/medication.enum'

export const medicationFixture: Partial<Medication> = {
  id: 1,
  uuid: '0ecd7311-7526-4e1d-9190-d73645151623',
  drugIdentifierNumber: '001777007',
  title: 'Medication Fixture title',
  commonName: 'Medication Fixture commonName',
  form: MedicationForm.Capsules,
  drugBankId: 'DBK0007',
  strength: 'medicationStrength',
  price: 111,
  taxable: true,
}

export const medicationDetailFixture: Partial<Medication> = {
  id: 2,
  uuid: '0ecd7311-7526-4e1d-9190-d73645151624',
  title: 'Medication Detail Fixture title',
  drugIdentifierNumber: '777001008',
  commonName: 'Medication Detail Fixture commonName',
  form: MedicationForm.Capsules,
  route: PatientMedicationRouteEnum.Intravenous,
  predefinedDosages: [
    {id: 1, dosage: '11 ml', sequence: 2, uuid: '0ecd7311-7526-4e1d-9190-a73645151633'},
    {id: 2, dosage: '12 ml', sequence: 3, uuid: '0ecd2311-1526-ae1d-9190-a73645151633'},
  ] as MedicationPredifinedDosage[],
  price: 18,
  taxable: true,
}

export const medicationWithoutInstructionFixture: Partial<Medication> = {
  id: 3,
  uuid: '0ecd7311-7526-4e1d-9190-d73645151644',
  drugIdentifierNumber: '777001009',
  form: MedicationForm.Capsules,
  title: 'medicationWithoutInstructionFixture',
  taxable: false,
}

//Added same values but vice versa for title and commonName => medicationDetailSearchCommonNameFixture
export const medicationForSearchTitleFixture: Partial<Medication> = {
  id: 4,
  uuid: '0ecd7311-7526-4e1d-9190-d73645151633',
  title: 'search1',
  drugIdentifierNumber: '777001010',
  commonName: 'search2',
  form: MedicationForm.Capsules,
  predefinedDosages: [
    {dosage: '12 ml', sequence: 2, uuid: '0ecd7311-7526-4e1d-9190-d73645151633'},
    {dosage: '13ml', sequence: 1, uuid: '0ecd7311-7526-4e1d-9190-d73645151634'},
    {dosage: '5ml', sequence: 3, uuid: '1ecd7323-7626-4e1d-9190-d73645151634'},
  ] as MedicationPredifinedDosage[],
}
//Added same values but vice versa for title and commonName => medicationForSearchTitleFixture
export const medicationDetailSearchCommonNameFixture: Partial<Medication> = {
  id: 5,
  title: 'search2',
  drugIdentifierNumber: '777001011',
  commonName: 'search1',
  form: MedicationForm.Capsules,
}

// not taxable medication
export const notTaxableMedicationFixture: Partial<Medication> = {
  id: 6,
  uuid: '195372bd-7280-4e6e-8846-9d7b6bcc9b48',
  drugIdentifierNumber: '001777012',
  title: 'Medication Fixture title',
  commonName: 'Medication Fixture commonName',
  form: MedicationForm.Capsules,
  drugBankId: 'DBK0007',
  strength: 'medicationStrength',
  taxable: false,
  price: 100,
}

export const compoundMedicationFixture: Partial<Medication> = {
  id: 7,
  uuid: '422897bd-3eb6-4579-b274-fc81aab530f3',
  drugIdentifierNumber: 'Requires Letter',
  letterUrl: 'testingUrl',
  title: 'Medication Fixture title',
  commonName: 'Medication Fixture commonName',
  form: MedicationForm.Capsules,
  drugBankId: 'DBK0007',
  strength: 'medicationStrength',
}

export const medicationForConsentFixture: Partial<Medication> = {
  id: 8,
  uuid: '2ecd7311-7526-4e1d-9190-a73645151623',
  title: 'Medication Fixture title',
  commonName: 'Medication Fixture commonName',
  form: MedicationForm.Capsules,
}
