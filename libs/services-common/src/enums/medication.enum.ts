import {
  MedicationInstructionLabelDto,
  MedicationLabelDto,
} from '@apps/emr/patient/dto/patient-medication.dto'
import {NestprojectConfigService} from '@libs/common'
import {MedicationIconFilepath} from '@libs/common/enums'

export enum PendingMedicationAction {
  New = 'New',
  Changed = 'Changed',
}

export enum MedicationDrugIdentifierNumber {
  RequireLetter = 'Requires Letter',
}

export enum PrescriptionType {
  InHouse = 'InHouse',
  External = 'External',
}

export enum PatientPrescriptionStatus {
  Dispensed = 'Dispensed',
  Paid = 'Paid',
  Prescribed = 'Prescribed',
  Archived = 'Archived',
  Prepared = 'Prepared',
  CalledOrFaxed = 'CalledOrFaxed',
  PhysicalPrescriptionProvided = 'PhysicalPrescriptionProvided',
}

export enum PatientPrescriptionStatusTitle {
  Dispensed = 'Dispensed',
  Paid = 'Paid',
  Prescribed = 'Prescribed',
  Archived = 'Archived',
  Prepared = 'Prepared',
  CalledOrFaxed = 'Called/Faxed In',
  PhysicalPrescriptionProvided = 'Physical Rx.',
}

export const PatientPrescriptionTitleMap = new Map<
  PatientPrescriptionStatus,
  PatientPrescriptionStatusTitle
>([
  [PatientPrescriptionStatus.Archived, PatientPrescriptionStatusTitle.Archived],
  [PatientPrescriptionStatus.Prescribed, PatientPrescriptionStatusTitle.Prescribed],
  [PatientPrescriptionStatus.Paid, PatientPrescriptionStatusTitle.Paid],
  [PatientPrescriptionStatus.Dispensed, PatientPrescriptionStatusTitle.Dispensed],
  [PatientPrescriptionStatus.Prepared, PatientPrescriptionStatusTitle.Prepared],
  [PatientPrescriptionStatus.CalledOrFaxed, PatientPrescriptionStatusTitle.CalledOrFaxed],
  [
    PatientPrescriptionStatus.PhysicalPrescriptionProvided,
    PatientPrescriptionStatusTitle.PhysicalPrescriptionProvided,
  ],
])

export enum PrescriptionActionsEnum {
  Download = 'Download',
  MarkAsDispensed = 'MarkAsDispensed',
  ArchivePrescription = 'ArchivePrescription',
  MarkAsPrepared = 'MarkAsPrepared',
  MarkAsCalledFaxedIn = 'MarkAsCalledFaxedIn',
  MarkAsPhysicalPrescriptionProvided = 'MarkAsPhysicalPrescriptionProvided',
  Edit = 'Edit',
}

export enum PrescriptionActionsLabelEnum {
  Download = 'Download',
  MarkAsDispensed = 'Mark as Dispensed',
  ArchivePrescription = 'Archive Prescription',
  MarkAsPrepared = 'Mark as Prepared',
  MarkAsCalledFaxedIn = 'Mark as called/faxed in',
  MarkAsPhysicalPrescriptionProvided = 'Mark as Physical prescription provided',
  Edit = 'Edit prescription',
}

export const inHousePrescriptionStatuses: PatientPrescriptionStatus[] = [
  PatientPrescriptionStatus.Prescribed,
  PatientPrescriptionStatus.Paid,
  PatientPrescriptionStatus.Archived,
  PatientPrescriptionStatus.Dispensed,
  PatientPrescriptionStatus.Prepared,
]

export const externalPrescriptionStatuses: PatientPrescriptionStatus[] = [
  ...inHousePrescriptionStatuses,
  PatientPrescriptionStatus.CalledOrFaxed,
  PatientPrescriptionStatus.PhysicalPrescriptionProvided,
]

export const PatientPrescriptionActionsIdForInHouse = new Map<
  PatientPrescriptionStatus,
  PrescriptionActionsEnum[]
>([
  [PatientPrescriptionStatus.Archived, []],
  [
    PatientPrescriptionStatus.Prescribed,
    [
      PrescriptionActionsEnum.Download,
      PrescriptionActionsEnum.ArchivePrescription,
      PrescriptionActionsEnum.MarkAsPrepared,
      PrescriptionActionsEnum.Edit,
    ],
  ],
  [
    PatientPrescriptionStatus.Paid,
    [
      PrescriptionActionsEnum.Download,
      PrescriptionActionsEnum.MarkAsDispensed,
      PrescriptionActionsEnum.MarkAsPrepared,
      PrescriptionActionsEnum.ArchivePrescription,
    ],
  ],
  [
    PatientPrescriptionStatus.Dispensed,
    [PrescriptionActionsEnum.Download, PrescriptionActionsEnum.ArchivePrescription],
  ],
  [
    PatientPrescriptionStatus.Prepared,
    [
      PrescriptionActionsEnum.Download,
      PrescriptionActionsEnum.MarkAsDispensed,
      PrescriptionActionsEnum.ArchivePrescription,
    ],
  ],
])

export const PatientPrescriptionActionsIdForExternal = new Map<
  PatientPrescriptionStatus,
  PrescriptionActionsEnum[]
>([
  [PatientPrescriptionStatus.Archived, []],
  [
    PatientPrescriptionStatus.Prescribed,
    [
      PrescriptionActionsEnum.Download,
      PrescriptionActionsEnum.ArchivePrescription,
      PrescriptionActionsEnum.MarkAsCalledFaxedIn,
      PrescriptionActionsEnum.MarkAsPhysicalPrescriptionProvided,
      PrescriptionActionsEnum.Edit,
    ],
  ],
  [PatientPrescriptionStatus.Paid, [PrescriptionActionsEnum.ArchivePrescription]],
  [PatientPrescriptionStatus.Dispensed, [PrescriptionActionsEnum.ArchivePrescription]],
  [PatientPrescriptionStatus.Prepared, [PrescriptionActionsEnum.ArchivePrescription]],
  [
    PatientPrescriptionStatus.CalledOrFaxed,
    [PrescriptionActionsEnum.Download, PrescriptionActionsEnum.ArchivePrescription],
  ],
  [PatientPrescriptionStatus.PhysicalPrescriptionProvided, [PrescriptionActionsEnum.Download]],
])

export const PatientPrescriptionActionsTitleForInHouse = new Map<
  PatientPrescriptionStatus,
  PrescriptionActionsLabelEnum[]
>([
  [PatientPrescriptionStatus.Archived, []],
  [
    PatientPrescriptionStatus.Prescribed,
    [
      PrescriptionActionsLabelEnum.Download,
      PrescriptionActionsLabelEnum.ArchivePrescription,
      PrescriptionActionsLabelEnum.MarkAsPrepared,
      PrescriptionActionsLabelEnum.Edit,
    ],
  ],
  [
    PatientPrescriptionStatus.Paid,
    [
      PrescriptionActionsLabelEnum.Download,
      PrescriptionActionsLabelEnum.MarkAsDispensed,
      PrescriptionActionsLabelEnum.MarkAsPrepared,
      PrescriptionActionsLabelEnum.ArchivePrescription,
    ],
  ],
  [
    PatientPrescriptionStatus.Dispensed,
    [PrescriptionActionsLabelEnum.Download, PrescriptionActionsLabelEnum.ArchivePrescription],
  ],
  [
    PatientPrescriptionStatus.Prepared,
    [
      PrescriptionActionsLabelEnum.Download,
      PrescriptionActionsLabelEnum.MarkAsDispensed,
      PrescriptionActionsLabelEnum.ArchivePrescription,
    ],
  ],
])

export const PatientPrescriptionActionsTitleForExternal = new Map<
  PatientPrescriptionStatus,
  PrescriptionActionsLabelEnum[]
>([
  [PatientPrescriptionStatus.Archived, []],
  [
    PatientPrescriptionStatus.Prescribed,
    [
      PrescriptionActionsLabelEnum.Download,
      PrescriptionActionsLabelEnum.ArchivePrescription,
      PrescriptionActionsLabelEnum.MarkAsCalledFaxedIn,
      PrescriptionActionsLabelEnum.MarkAsPhysicalPrescriptionProvided,
      PrescriptionActionsLabelEnum.Edit,
    ],
  ],
  [PatientPrescriptionStatus.Paid, [PrescriptionActionsLabelEnum.ArchivePrescription]],
  [PatientPrescriptionStatus.Dispensed, [PrescriptionActionsLabelEnum.ArchivePrescription]],
  [PatientPrescriptionStatus.Prepared, [PrescriptionActionsLabelEnum.ArchivePrescription]],
  [
    PatientPrescriptionStatus.CalledOrFaxed,
    [PrescriptionActionsLabelEnum.Download, PrescriptionActionsLabelEnum.ArchivePrescription],
  ],
  [PatientPrescriptionStatus.PhysicalPrescriptionProvided, [PrescriptionActionsLabelEnum.Download]],
])

export enum PrescriptionLabelType {
  LastDay = 'LastDay',
}

export function createMedicationLabel(
  title: string,
  textColor: string,
  backgroundColor: string,
): MedicationLabelDto {
  return {
    title,
    textColor,
    backgroundColor,
  }
}

export enum PatientMedicationTitle {
  NewlyAdded = 'Newly Added',
  ChangesMade = 'Changes Made',
  LastDay = 'Last Day',
}

export const PatientPrescriptionLabel = new Map<
  PendingMedicationAction | PrescriptionLabelType,
  MedicationLabelDto
>([
  [
    PendingMedicationAction.New,
    createMedicationLabel(PatientMedicationTitle.NewlyAdded, '#295B53', '#E2F3E4'),
  ],
  [
    PendingMedicationAction.Changed,
    createMedicationLabel(PatientMedicationTitle.ChangesMade, '#96310C', '#F4B9A3'),
  ],
  [
    PrescriptionLabelType.LastDay,
    createMedicationLabel(PatientMedicationTitle.LastDay, '#013739', '#C9DDE1'),
  ],
])

export enum PatientMedicationDetailLabels {
  Name = 'Name',
  Dosage = 'Dosage',
  Frequency = 'Frequency',
  ImportantNote = 'IMPORTANT NOTE',
  Pharmacy = 'Pharmacy',
}

export enum PatientMedicationDetailValues {
  ImportantNote = 'Please do not take Medication until specifically instructed by your clinical team.',
}

export enum PrescriptionMessage {
  YourDosage = 'Your dosage',
}

export enum StepType {
  Preparation = 'Preparation',
  Administration = 'Administration',
}

export enum LastUpdatedLabelEnum {
  LastUpdatedLabel = 'Last updated: ',
}

export enum PrescriptionStatus {
  Current = 'Current',
  Upcoming = 'Upcoming',
  Past = 'Past',
}

export enum PatientMedicationRouteEnum {
  Intravenous = 'Intravenous',
  Intramuscular = 'Intramuscular',
  Subcutaneous = 'Subcutaneous',
  Rectal = 'Rectal',
  Vaginal = 'Vaginal',
  Inhaled = 'Inhaled',
  Sublingual = 'Sublingual',
  Orally = 'Orally',
  Buccal = 'Buccal',
  Topically = 'Topically',
}

export const MedicationRouteLabel = new Map<PatientMedicationRouteEnum, string>([
  [PatientMedicationRouteEnum.Intravenous, 'Intravenous'],
  [PatientMedicationRouteEnum.Intramuscular, 'Intramuscular'],
  [PatientMedicationRouteEnum.Subcutaneous, 'Subcutaneous'],
  [PatientMedicationRouteEnum.Rectal, 'Rectal'],
  [PatientMedicationRouteEnum.Vaginal, 'Vaginal'],
  [PatientMedicationRouteEnum.Inhaled, 'Inhaled'],
  [PatientMedicationRouteEnum.Sublingual, 'Sublingual'],
  [PatientMedicationRouteEnum.Orally, 'Orally'],
  [PatientMedicationRouteEnum.Buccal, 'Buccal'],
  [PatientMedicationRouteEnum.Topically, 'Topically'],
])

export enum MedicationForm {
  Tablets = 'Tablets',
  Capsules = 'Capsules',
  Injection = 'Injection',
  Suppository = 'Suppository',
  Implants = 'Implants',
  TransdermalPatch = 'TransdermalPatch',
  Gel = 'Gel',
}

export const MedicationFormLabel = new Map<MedicationForm, string>([
  [MedicationForm.Tablets, 'Tablets'],
  [MedicationForm.Capsules, 'Capsules'],
  [MedicationForm.Injection, 'Injection'],
  [MedicationForm.Suppository, 'Suppository'],
  [MedicationForm.Implants, 'Implants'],
  [MedicationForm.TransdermalPatch, 'Transdermal Patch'],
  [MedicationForm.Gel, 'Gel'],
])

export enum MedicationTabMessages {
  Title = 'This list consists of medication prescribed from Nestproject only. ' +
    'If you are taking other medication, please continue to follow your doctor’s instructions.',
}

export enum MedicationStoreType {
  Fridge = 'Fridge',
  Room = 'Room',
}

export enum PatientPrescriptionIconType {
  Clock = 'Clock',
  StoreInFridge = 'StoreInFridge',
  StoreInRoomTemperature = 'StoreInRoomTemperature',
}

const configService = NestprojectConfigService.getInstance()

const assetsURL = configService.get<string>('STATIC_ASSETS_BUCKET_URL')
export const PatientPrescriptionIconURL = new Map<PatientPrescriptionIconType, string>([
  [PatientPrescriptionIconType.Clock, assetsURL + MedicationIconFilepath.Clock],
  [PatientPrescriptionIconType.StoreInFridge, assetsURL + MedicationIconFilepath.StoreInFridge],
  [
    PatientPrescriptionIconType.StoreInRoomTemperature,
    assetsURL + MedicationIconFilepath.StoreInRoomTemperature,
  ],
])

export enum MedicationInstructionLabelTitle {
  StoreInFridge = 'Store in Fridge',
  StoreInRoomTemp = 'Store in room temp.',
  PrepTime = 'Prep time',
}

export enum MedicationInstructionLabelStyle {
  Green = 'Green',
  Blue = 'Blue',
}

export const MedicationInstuctionStoreTypeLabel = new Map<
  MedicationStoreType,
  MedicationInstructionLabelDto
>([
  [
    MedicationStoreType.Fridge,
    {
      title: MedicationInstructionLabelTitle.StoreInFridge,
      imageURL: PatientPrescriptionIconURL.get(PatientPrescriptionIconType.StoreInFridge),
      style: MedicationInstructionLabelStyle.Blue,
    },
  ],
  [
    MedicationStoreType.Room,
    {
      title: MedicationInstructionLabelTitle.StoreInRoomTemp,
      imageURL: PatientPrescriptionIconURL.get(PatientPrescriptionIconType.StoreInRoomTemperature),
      style: MedicationInstructionLabelStyle.Green,
    },
  ],
])

export const MedicationTypeImageURL = new Map<MedicationForm, string>([
  [MedicationForm.Capsules, assetsURL + MedicationIconFilepath.Capsules],
  [MedicationForm.Implants, assetsURL + MedicationIconFilepath.Implants],
  [MedicationForm.Injection, assetsURL + MedicationIconFilepath.Injection],
  [MedicationForm.Suppository, assetsURL + MedicationIconFilepath.Suppository],
  [MedicationForm.Tablets, assetsURL + MedicationIconFilepath.Tablets],
  [MedicationForm.TransdermalPatch, assetsURL + MedicationIconFilepath.TransdermalPatch],
  [MedicationForm.Gel, assetsURL + MedicationIconFilepath.Gel],
])

export enum MedicationNotificationsTypes {
  Dosage = 'Dosage',
  Frequency = 'Frequency',
  Time = 'Time',
  Route = 'Route',
  Duration = 'Duration',
}
export const notAcknowledgedMedicationsTitle = 'There are changes made to your medications'
export const notAcknowledgedMedicationsDescription =
  'There are changes made to your medications. Please click into the details of the medication to see and acknowledge the changes.'

export enum MedicationDropdownType {
  Route = 'Route',
  Refill = 'Refill',
  Form = 'Form',
}

export enum MedicationsRecency {
  Current = 'Current',
  Past = 'Past',
  Upcoming = 'Upcoming',
}

export enum PatientMedicationHistoryFields {
  Dosage = 'dosage',
  Frequency = 'frequency',
  Time = 'medication time',
  Route = 'route',
  Duration = 'duration',
}

export enum DrugBankMissingFields {
  Route = 'route',
  Form = 'form',
  Strengths = 'strengths',
}
