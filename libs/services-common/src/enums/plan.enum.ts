import {PlanAlertType, PlanStatusEnum} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {GetPatientPlansStatusLabelDto} from '@libs/services-common/dto/plan.dto'

export enum DropdownEnum {
  Procedures = 'Procedures',
  Protocol = 'Protocol',
  GeneticTesting = 'GeneticTesting',
}

export const PlanStatusEnumTitles = new Map<PlanStatusEnum, string>([
  [PlanStatusEnum.Draft, PlanStatusEnum.Draft],
  [PlanStatusEnum.ReadyToOrder, 'Ready To Order'],
  [PlanStatusEnum.ReadyForActivation, 'Ready For Activation'],
  [PlanStatusEnum.PendingWireTransfer, 'Pending Wire Transfer'],
  [PlanStatusEnum.Ordered, PlanStatusEnum.Ordered],
  [PlanStatusEnum.Declined, PlanStatusEnum.Declined],
  [PlanStatusEnum.Cancelled, PlanStatusEnum.Cancelled],
  [PlanStatusEnum.Active, PlanStatusEnum.Active],
  [PlanStatusEnum.Completed, PlanStatusEnum.Completed],
])

export const PlanStatusChangeLabels = new Map<PlanStatusEnum, string>([
  [PlanStatusEnum.Draft, 'Draft since'],
  [PlanStatusEnum.ReadyToOrder, 'Ready to order since'],
  [PlanStatusEnum.ReadyForActivation, 'Ready for activation since'],
  [PlanStatusEnum.PendingWireTransfer, 'Pending Wire Transfer on'],
  [PlanStatusEnum.Ordered, 'Ordered on'],
  [PlanStatusEnum.Declined, 'Declined on'],
  [PlanStatusEnum.Cancelled, 'Cancelled on'],
  [PlanStatusEnum.Active, 'Activated on'],
  [PlanStatusEnum.Completed, 'Completed on'],
])

export enum PlanActionsEnum {
  MarkAsActive = 'MarkAsActive',
  MarkAsCompleted = 'MarkAsCompleted',
  MarkAsCancelled = 'MarkAsCancelled',
}

export enum PlanActionsTitleEnum {
  MarkAsActive = 'Mark as Active',
  MarkAsCompleted = 'Mark as Completed',
  MarkAsCancelled = 'Cancel Plan',
}

export const PatientPlanStatusActionTitle = new Map<PlanActionsEnum, PlanActionsTitleEnum>([
  [PlanActionsEnum.MarkAsActive, PlanActionsTitleEnum.MarkAsActive],
  [PlanActionsEnum.MarkAsCompleted, PlanActionsTitleEnum.MarkAsCompleted],
  [PlanActionsEnum.MarkAsCancelled, PlanActionsTitleEnum.MarkAsCancelled],
])

export const PatientPlanStatusActionsId = new Map<PlanStatusEnum, PlanActionsEnum[]>([
  [PlanStatusEnum.Draft, [PlanActionsEnum.MarkAsCancelled]],
  [PlanStatusEnum.Active, [PlanActionsEnum.MarkAsCancelled, PlanActionsEnum.MarkAsCompleted]],
  [PlanStatusEnum.Completed, []],
  [PlanStatusEnum.Cancelled, []],
  [PlanStatusEnum.PendingWireTransfer, [PlanActionsEnum.MarkAsCancelled]],
  [PlanStatusEnum.ReadyToOrder, [PlanActionsEnum.MarkAsCancelled]],
  [PlanStatusEnum.Ordered, [PlanActionsEnum.MarkAsCancelled]],
  [
    PlanStatusEnum.ReadyForActivation,
    [PlanActionsEnum.MarkAsActive, PlanActionsEnum.MarkAsCancelled],
  ],
  [PlanStatusEnum.Declined, [PlanActionsEnum.MarkAsCancelled]],
])

export const PatientPlanStatusLabel = new Map<PlanStatusEnum, GetPatientPlansStatusLabelDto>([
  [
    PlanStatusEnum.Draft,
    {
      backgroundColor: '#D2DDD8',
      textColor: '#616161',
    },
  ],
  [
    PlanStatusEnum.Active,
    {
      backgroundColor: '#4C7663',
      textColor: '#FCFBF9',
    },
  ],
  [
    PlanStatusEnum.Declined,
    {
      backgroundColor: '#E3F2FD',
      textColor: '#005490',
    },
  ],
  [
    PlanStatusEnum.Ordered,
    {
      backgroundColor: '#FAF3E2',
      textColor: '#D68300',
    },
  ],
  [
    PlanStatusEnum.Cancelled,
    {
      backgroundColor: '#F6EAE6',
      textColor: '#A81804',
    },
  ],
  [
    PlanStatusEnum.ReadyForActivation,
    {
      backgroundColor: '#EDE7F6',
      textColor: '#323297',
    },
  ],
  [
    PlanStatusEnum.PendingWireTransfer,
    {
      backgroundColor: '#EEEEEE',
      textColor: '#616161',
    },
  ],
  [
    PlanStatusEnum.Completed,
    {
      backgroundColor: '#E2F3E4',
      textColor: '#02922A ',
    },
  ],
  [
    PlanStatusEnum.ReadyToOrder,
    {
      backgroundColor: '#FCFBF9',
      textColor: '#526366',
    },
  ],
])

export enum MonitoringLocationEnum {
  MonitoredInClinic = 'MonitoredInClinic',
}
export const MonitoringLocationLabel = {
  [MonitoringLocationEnum.MonitoredInClinic]: 'Monitored in clinic',
}

export enum SpermType {
  Fresh = 'Fresh',
  Frozen = 'Frozen',
  NA = 'NA',
}
export enum SpermSource {
  Partner = 'Partner',
  Donor = 'Donor',
  NA = 'NA',
}

export enum PlanOutcome {
  Pregnancy = 'Pregnancy',
  NoPregnancy = 'NoPregnancy',
  BioChemical = 'BioChemical',
  EPL = 'EPL',
  ConvertedToIUI = 'ConvertedToIUI',
  Other = 'Other',
}
export const getPlanOutcomeTitle = new Map<PlanOutcome, string>([
  [PlanOutcome.Pregnancy, 'Pregnancy'],
  [PlanOutcome.NoPregnancy, 'No Pregnancy'],
  [PlanOutcome.BioChemical, 'Bio-Chemical'],
  [PlanOutcome.EPL, 'EPL'],
  [PlanOutcome.ConvertedToIUI, 'Converted to IUI'],
  [PlanOutcome.Other, 'Other'],
])
export const getPlanOutcomeColor = new Map<PlanOutcome, string>([
  [PlanOutcome.Pregnancy, '#02922A'],
  [PlanOutcome.NoPregnancy, '#A81804'],
  [PlanOutcome.BioChemical, '#D68300'],
  [PlanOutcome.EPL, '#005490'],
  [PlanOutcome.ConvertedToIUI, '#5E5EDE'],
  [PlanOutcome.Other, '#757575'],
])
export enum PlanCancelledBy {
  Doctor = 'Doctor',
  Patient = 'Patient',
}

export enum PlanTitle {
  LastUpdatedOn = 'Last updated on',
  By = 'by',
  AddedOn = 'Added on',
  BookedFor = 'Booked for',
  SignedOff = 'Signed off',
  For = 'for',
  On = 'on',
  Checklist = 'Checklist',
  GeneticTesting = 'Genetic Testing',
}

export enum PlanSheetHistoryLabel {
  Order = 'Order',
  Note = 'Note',
  Updated = 'updated',
  Added = 'added',
}

export enum PlanTestResultHandlingMethod {
  DisplayResults = 'DisplayResults',
  DisplayInModal = 'DisplayInModal',
  TrendingHistory = 'TrendingHistory',
}

export enum MedicationCategoryLabel {
  Other = 'Other Medication',
  PlanMedications = 'Plan Medications',
}

export enum PatientPlanPaidOnMessage {
  PlanPaidOn = 'Plan paid for on',
  PlanPendingPayment = 'Pending wire transfer since ',
}

export const planAlertTypeToTitle = new Map<PlanAlertType, string>([
  [PlanAlertType.DayOneOfPeriodUpdated, 'First day of period updated'],
])

export enum PlanAlertAction {
  Acknowledge = 'Acknowledge',
}

export const planAlertTypeToActions = new Map<PlanAlertType, PlanAlertAction[]>([
  [PlanAlertType.DayOneOfPeriodUpdated, [PlanAlertAction.Acknowledge]],
])
