import {PatientPlanCohortIvfTaskDetails} from '@libs/data-layer/apps/clinic-ivf/entities'
import {EmbryoState, IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {PatientNoteTypeEnum} from './patient-note.enum'

export const allPossibleDays: IvfLabDayEnum[] = [-1, 0, 1, 2, 3, 4, 5, 6, 7]

export enum IvfLabDayEnumLabels {
  PrepDay = 'Prep Day', // day -1
  DayZero = 'Day 0',
  DayOne = 'Day 1',
  DayTwo = 'Day 2',
  DayThree = 'Day 3',
  DayFour = 'Day 4',
  DayFive = 'Day 5',
  DaySix = 'Day 6',
  DaySeven = 'Day 7',
}

export enum IvfLabDayEnum {
  PrepDay = -1,
  DayZero = 0,
  DayOne = 1,
  DayTwo = 2,
  DayThree = 3,
  DayFour = 4,
  DayFive = 5,
  DaySix = 6,
  DaySeven = 7,
}

export const reversedIvfLabDayEnum: {[value: string]: string} = {}
Object.keys(IvfLabDayEnum).forEach((key) => {
  reversedIvfLabDayEnum[IvfLabDayEnum[key]] = key
})

export const getIvfLabDayLabels = new Map<number, IvfLabDayEnumLabels>([
  [IvfLabDayEnum.PrepDay, IvfLabDayEnumLabels.PrepDay],
  [IvfLabDayEnum.DayZero, IvfLabDayEnumLabels.DayZero],
  [IvfLabDayEnum.DayOne, IvfLabDayEnumLabels.DayOne],
  [IvfLabDayEnum.DayTwo, IvfLabDayEnumLabels.DayTwo],
  [IvfLabDayEnum.DayThree, IvfLabDayEnumLabels.DayThree],
  [IvfLabDayEnum.DayFour, IvfLabDayEnumLabels.DayFour],
  [IvfLabDayEnum.DayFive, IvfLabDayEnumLabels.DayFive],
  [IvfLabDayEnum.DaySix, IvfLabDayEnumLabels.DaySix],
  [IvfLabDayEnum.DaySeven, IvfLabDayEnumLabels.DaySeven],
])

export enum IvfEmbryoActions {
  FreshTransfer = 'FreshTransfer',
  Freeze = 'Freeze',
}

export enum IvfFreezeEmbryoBiopsyStates {
  Tested = 'Tested',
  Untested = 'Untested',
}

export const embryoStateToAction: Record<EmbryoState, IvfEmbryoActions> = {
  [EmbryoState.FreshET]: IvfEmbryoActions.FreshTransfer,
  [EmbryoState.Frozen]: IvfEmbryoActions.Freeze,
}

export const embryoActionToState: Record<IvfEmbryoActions, EmbryoState> = {
  [IvfEmbryoActions.FreshTransfer]: EmbryoState.FreshET,
  [IvfEmbryoActions.Freeze]: EmbryoState.Frozen,
}

export enum IVFTaskEntityTitle {
  OocytesCollected = 'Oocytes collected',
  OocytesWarmed = 'Oocytes warmed',
  InitialConcentration = 'Initial Concentration',
  FinalConcentration = 'Final Concentration',
  OocytesSurvived = 'Oocytes survived',
  InitialMotility = 'Initial motility (%)',
  FinalMotility = 'Final motility (%)',
  MatureOocytes = 'Mature oocytes',
  ImmatureOocytes = 'Immature oocytes',
  NewCohort = 'New cohort',
  OtherOocytes = 'Other Oocytes',
  DegenOocytes = 'Degen oocytes',
  AbnormalOocytes = 'Abnormal oocytes',
  Attachments = 'Attachments',
  Split = 'Split',
  MatureOocytesInjected = 'Mature oocytes injected',
  OocytesInseminated = 'Oocytes inseminated',
  MatureOocytesToCryo = 'Mature oocytes to cryo',
  OocytesDiscarded = 'Oocytes discarded',
  OocyteComments = 'Oocyte comments',
  OocyteQuality = 'Oocyte quality',
  Anomaly = 'Anomaly',
  OocytesAssessment = 'Oocytes assessment',
  EmbryosMoreThan6Cells = 'Embryos >= 6 cells',
  EmbryosLessThan6Cells = 'Embryos < 6 cells',
  EmbryosArrested = 'Embryos arrested',
  EmbryosDiscarded = 'Embryos discarded',
  AvgFragOfEmbryos = 'Avg. frag of embryos',
  AssistedHatching = 'Assisted hatching',
  Eggs = 'Eggs',
  FreezeDate = 'Freeze Date',
  Location = 'Location',
  FreezeWitness = 'Freeze witness',
  Comments = 'Comments',
  Biopsy = 'Biopsy',
  Grade = 'Grade',
  FreezeEmbryo = 'Freeze Embryo',
  FreshET = 'Fresh ET',
  FreshFreeze = 'Fresh/Freeze',
  Photo = 'Photo (optional)',
  ZeroPN = '0PN',
  OnePN = '1PN',
  TwoPN = '2PN',
  ThreePN = '3PN',
  DegenArrested = 'Degen / arrested',
  AdditionalNote = 'Additional Note',
  CallThePatient = 'Call The Patient',
  Witness = 'Witness',
  Embryologist = 'Embryologist',
  FreshTransfer = 'Fresh transfer',
  EmbryosToTransfer = 'Number of embryos to transfer',
  Straw = 'Straw',
  Embryo = 'Embryo',
}

export const EmbryoStateToLabel = {
  [EmbryoState.FreshET]: IVFTaskEntityTitle.FreshET,
  [EmbryoState.Frozen]: IVFTaskEntityTitle.FreezeEmbryo,
}

export enum InjectionAssessmentLabel {
  COC = 'COC',
  SER = 'SER',
  Granular = 'Granular',
  FragPBs = 'Frag PBs',
  PVS = 'PVS',
  PVD = 'PVD',
  Vacuoles = 'Vacuoles',
  Misshaped = 'Misshaped',
  AbnZone = 'Abn Zone',
  AbnMembraneBreak = 'Abn Membrane Break',
}
export enum InjectionAssessmentLabelWithState {
  COC = 'COC State',
  SER = 'SER State',
  Granular = 'Granular State',
  FragPBs = 'Frag PBs State',
  PVS = 'PVS State',
  PVD = 'PVD State',
  Vacuoles = 'Vacuoles State',
  Misshaped = 'Misshaped State',
  AbnZone = 'Abn Zone State',
  AbnMembraneBreak = 'Abn Membrane Break State',
}

export const injectionAssessmentFieldToPropertyName = new Map<
  keyof PatientPlanCohortIvfTaskDetails,
  string
>([
  ['oocyteAssessmentsCoc', InjectionAssessmentLabel.COC],
  ['oocyteAssessmentsSer', InjectionAssessmentLabel.SER],
  ['oocyteAssessmentsGranular', InjectionAssessmentLabel.Granular],
  ['oocyteAssessmentsFragPBs', InjectionAssessmentLabel.FragPBs],
  ['oocyteAssessmentsPvs', InjectionAssessmentLabel.PVS],
  ['oocyteAssessmentsPvd', InjectionAssessmentLabel.PVD],
  ['oocyteAssessmentsVacuoles', InjectionAssessmentLabel.Vacuoles],
  ['oocyteAssessmentsMishapped', InjectionAssessmentLabel.Misshaped],
  ['oocyteAssessmentsAbnZone', InjectionAssessmentLabel.AbnZone],
  ['oocyteAssessmentsAbnMembraneBreak', InjectionAssessmentLabel.AbnMembraneBreak],
])

export const injectionAssessmentIsEnabledFieldToPropertyName = new Map<
  keyof PatientPlanCohortIvfTaskDetails,
  string
>([
  ['oocyteAssessmentsCocEnabled', InjectionAssessmentLabelWithState.COC],
  ['oocyteAssessmentsSerEnabled', InjectionAssessmentLabelWithState.SER],
  ['oocyteAssessmentsGranularEnabled', InjectionAssessmentLabelWithState.Granular],
  ['oocyteAssessmentsFragPBsEnabled', InjectionAssessmentLabelWithState.FragPBs],
  ['oocyteAssessmentsPvsEnabled', InjectionAssessmentLabelWithState.PVS],
  ['oocyteAssessmentsPvdEnabled', InjectionAssessmentLabelWithState.PVD],
  ['oocyteAssessmentsVacuolesEnabled', InjectionAssessmentLabelWithState.Vacuoles],
  ['oocyteAssessmentsMishappedEnabled', InjectionAssessmentLabelWithState.Misshaped],
  ['oocyteAssessmentsAbnZoneEnabled', InjectionAssessmentLabelWithState.AbnZone],
  ['oocyteAssessmentsAbnMembraneBreakEnabled', InjectionAssessmentLabelWithState.AbnMembraneBreak],
])

export const injectionAssessmentBooleanFieldToPropertyName = new Map<
  keyof PatientPlanCohortIvfTaskDetails,
  string
>([
  ['oocyteAssessmentsCocEnabled', InjectionAssessmentLabel.COC],
  ['oocyteAssessmentsSerEnabled', InjectionAssessmentLabel.SER],
  ['oocyteAssessmentsGranularEnabled', InjectionAssessmentLabel.Granular],
  ['oocyteAssessmentsFragPBsEnabled', InjectionAssessmentLabel.FragPBs],
  ['oocyteAssessmentsPvsEnabled', InjectionAssessmentLabel.PVS],
  ['oocyteAssessmentsPvdEnabled', InjectionAssessmentLabel.PVD],
  ['oocyteAssessmentsVacuolesEnabled', InjectionAssessmentLabel.Vacuoles],
  ['oocyteAssessmentsMishappedEnabled', InjectionAssessmentLabel.Misshaped],
  ['oocyteAssessmentsAbnZoneEnabled', InjectionAssessmentLabel.AbnZone],
  ['oocyteAssessmentsAbnMembraneBreakEnabled', InjectionAssessmentLabel.AbnMembraneBreak],
])

export const IVFTaskToPatientNoteMapper = {
  [IVFTaskType.SetupWorksheet]: PatientNoteTypeEnum.SetupWorksheet,
  [IVFTaskType.LabelTubes]: PatientNoteTypeEnum.LabelTubes,
  [IVFTaskType.LabelDishes]: PatientNoteTypeEnum.LabelDishes,
  [IVFTaskType.VerifyConsent]: PatientNoteTypeEnum.VerifyConsent,
  [IVFTaskType.RinseDishes]: PatientNoteTypeEnum.RinseDishes,
  [IVFTaskType.DispenseMedia]: PatientNoteTypeEnum.DispenseMedia,
  [IVFTaskType.PlaceIntoIncubators]: PatientNoteTypeEnum.PlaceIntoIncubators,
  [IVFTaskType.VerifyHepBcHiv]: PatientNoteTypeEnum.VerifyHepBcHiv,
  [IVFTaskType.OocyteCollection]: PatientNoteTypeEnum.OocyteCollection,
  [IVFTaskType.SpermWash]: PatientNoteTypeEnum.SpermWash,
  [IVFTaskType.PostStripping]: PatientNoteTypeEnum.PostStripping,
  [IVFTaskType.MatureOocyteGroupPhoto]: PatientNoteTypeEnum.MatureOocyteGroupPhoto,
  [IVFTaskType.IcsiInjection]: PatientNoteTypeEnum.IcsiInjection,
  [IVFTaskType.InjectionAssessment]: PatientNoteTypeEnum.InjectionAssessment,
  [IVFTaskType.InseminationIVF]: PatientNoteTypeEnum.InseminationIVF,
  [IVFTaskType.PICSI]: PatientNoteTypeEnum.PICSI,
  [IVFTaskType.EggsToThaw]: PatientNoteTypeEnum.EggsToThaw,
  [IVFTaskType.CaIonophore]: PatientNoteTypeEnum.CaIonophore,
  [IVFTaskType.MiiDay1Cryo]: PatientNoteTypeEnum.MiiDay1Cryo,
  [IVFTaskType.FertilizationCheck]: PatientNoteTypeEnum.FertilizationCheck,
  [IVFTaskType.ChangeOver]: PatientNoteTypeEnum.ChangeOver,
  [IVFTaskType.Day3Check]: PatientNoteTypeEnum.Day3Check,
  [IVFTaskType.Day5Check]: PatientNoteTypeEnum.Day5Check,
  [IVFTaskType.Day6Check]: PatientNoteTypeEnum.Day6Check,
  [IVFTaskType.Day7Check]: PatientNoteTypeEnum.Day7Check,
  [IVFTaskType.FrozenEmbryoTransfer]: PatientNoteTypeEnum.FreezingEmbryos,
  [IVFTaskType.FinalBlastocystCryo]: PatientNoteTypeEnum.FinalBlastocystCryo,
  [IVFTaskType.EmbryoGroupPhoto]: PatientNoteTypeEnum.EmbryoGroupPhoto,
  [IVFTaskType.OocyteFreezing]: PatientNoteTypeEnum.OocyteCollection,
  [IVFTaskType.PrintLabel]: PatientNoteTypeEnum.PrintLabel,
  [IVFTaskType.CallThePatient]: PatientNoteTypeEnum.CallThePatient,
  [IVFTaskType.JourneyWitness]: PatientNoteTypeEnum.JourneyWitness,
  [IVFTaskType.DishInventory]: PatientNoteTypeEnum.DishInventory,
  [IVFTaskType.PartnerDishInventory]: PatientNoteTypeEnum.PartnerDishInventory,
}
