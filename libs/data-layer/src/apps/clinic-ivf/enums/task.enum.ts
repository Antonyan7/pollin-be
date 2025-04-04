import {PlanAddonCode} from '@libs/data-layer/apps/plan/enums/plan-type.enum'

export enum IVFTaskType {
  SetupWorksheet = 'SetupWorksheet',
  LabelTubes = 'LabelTubes',
  LabelDishes = 'LabelDishes',
  VerifyConsent = 'VerifyConsent',
  RinseDishes = 'RinseDishes',
  DispenseMedia = 'DispenseMedia',
  PlaceIntoIncubators = 'PlaceIntoIncubators',
  VerifyHepBcHiv = 'VerifyHepBcHiv',
  OocyteCollection = 'OocyteCollection',
  SpermWash = 'SpermWash',
  PostStripping = 'PostStripping',
  MatureOocyteGroupPhoto = 'MatureOocyteGroupPhoto',
  IcsiInjection = 'IcsiInjection',
  InjectionAssessment = 'InjectionAssessment',
  InseminationIVF = 'InseminationIVF',
  PICSI = 'PICSI',
  EggsToThaw = 'EggsToThaw',
  CaIonophore = 'CaIonophore',
  MiiDay1Cryo = 'MiiDay1Cryo',
  FertilizationCheck = 'FertilizationCheck',
  ChangeOver = 'ChangeOver',
  Day3Check = 'Day3Check',
  Day5Check = 'Day5Check',
  Day6Check = 'Day6Check',
  Day7Check = 'Day7Check',
  FrozenEmbryoTransfer = 'FrozenEmbryoTransfer',
  FinalBlastocystCryo = 'FinalBlastocystCryo',
  EmbryoGroupPhoto = 'EmbryoGroupPhoto',
  OocyteFreezing = 'OocyteFreezing',
  PrintLabel = 'PrintLabel',
  CallThePatient = 'CallThePatient',
  JourneyWitness = 'JourneyWitness',
  DishInventory = 'DishInventory',
  PartnerDishInventory = 'PartnerDishInventory',
  EggThaw = 'EggThaw',
  PIDLabel = 'PIDLabel',
}

export const IVFTaskTypeLabel = {
  [IVFTaskType.SetupWorksheet]: 'Setup Worksheet',
  [IVFTaskType.LabelTubes]: 'Label Tubes',
  [IVFTaskType.LabelDishes]: 'Label Dishes',
  [IVFTaskType.VerifyConsent]: 'Verify Consent',
  [IVFTaskType.RinseDishes]: 'Rinse Dishes',
  [IVFTaskType.DispenseMedia]: 'Dispense Media',
  [IVFTaskType.PlaceIntoIncubators]: 'Place Into Incubators',
  [IVFTaskType.VerifyHepBcHiv]: 'Verify Hep Bc Hiv',
  [IVFTaskType.OocyteCollection]: 'Oocyte Collection',
  [IVFTaskType.SpermWash]: 'Sperm Wash',
  [IVFTaskType.PostStripping]: 'Post Stripping',
  [IVFTaskType.MatureOocyteGroupPhoto]: 'Mature Oocyte Group Photo',
  [IVFTaskType.IcsiInjection]: 'ICSI Injection',
  [IVFTaskType.InjectionAssessment]: 'Injection Assessment',
  [IVFTaskType.InseminationIVF]: 'Insemination IVF',
  [IVFTaskType.PICSI]: 'PICSI',
  [IVFTaskType.EggsToThaw]: 'Eggs To Thaw',
  [IVFTaskType.CaIonophore]: 'Ca Ionophore',
  [IVFTaskType.MiiDay1Cryo]: 'Mii Day 1 Cryo',
  [IVFTaskType.FertilizationCheck]: 'Fertilization Check',
  [IVFTaskType.ChangeOver]: 'Change Over',
  [IVFTaskType.Day3Check]: 'Day 3 Check',
  [IVFTaskType.Day5Check]: 'Day 5 Check',
  [IVFTaskType.Day6Check]: 'Day 6 Check',
  [IVFTaskType.Day7Check]: 'Day 7 Check',
  [IVFTaskType.FrozenEmbryoTransfer]: 'Frozen Embryo Transfer',
  [IVFTaskType.FinalBlastocystCryo]: 'Final Blastocyst Cryo',
  [IVFTaskType.EmbryoGroupPhoto]: 'Embryo Group Photo',
  [IVFTaskType.OocyteFreezing]: 'Oocyte Freezing',
  [IVFTaskType.PrintLabel]: 'Print Label',
  [IVFTaskType.CallThePatient]: 'Call The Patient',
  [IVFTaskType.DishInventory]: 'Dish Inventory',
  [IVFTaskType.PartnerDishInventory]: 'Partner Dish Inventory',
  [IVFTaskType.EggThaw]: 'Egg Thaw',
  [IVFTaskType.PIDLabel]: 'PID Label',
}

export const dashboardUpdateNeededTasks = [
  IVFTaskType.Day3Check,
  IVFTaskType.Day5Check,
  IVFTaskType.Day6Check,
  IVFTaskType.Day7Check,
]

export const IVFTaskTypeMapper = {
  [PlanAddonCode.IVF]: [IVFTaskType.InseminationIVF],
  [PlanAddonCode.ICSI]: [IVFTaskType.IcsiInjection, IVFTaskType.InjectionAssessment],
  [PlanAddonCode.IVFOrICSISplit]: [
    IVFTaskType.InseminationIVF,
    IVFTaskType.IcsiInjection,
    IVFTaskType.InjectionAssessment,
  ],
  [PlanAddonCode.ICSIAndCaIonophore]: [
    IVFTaskType.IcsiInjection,
    IVFTaskType.CaIonophore,
    IVFTaskType.InjectionAssessment,
  ],
  [PlanAddonCode.PICSI]: [IVFTaskType.PICSI, IVFTaskType.InjectionAssessment],
}

export enum OocyteQuality {
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor',
}

export enum EmbryoState {
  Frozen = 'Frozen',
  FreshET = 'FreshET',
}

export enum OocyteQualityLabel {
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor',
}

export enum RecencyEnum {
  Active = 'Active',
  Upcoming = 'Upcoming',
}

export enum Day3EmbryosAverageFrag {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
}

export enum CryoType {
  MiiDay1Cryo = 'MiiDay1Cryo',
  OocyteFreezing = 'OocyteFreezing',
}

export enum CohortEggToThawType {
  OocyteCollection = 'OocyteCollection',
  EggThaw = 'EggThaw',
}
