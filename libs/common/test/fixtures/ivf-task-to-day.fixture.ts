import {IvfTaskToDay} from '@libs/data-layer/apps/clinic-ivf/entities'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'

export const ivfTaskToDayFixture: Partial<IvfTaskToDay> = {
  id: 1,
  day: 1,
  task: IVFTaskType.InseminationIVF,
  order: 1,
}

export const ivfTaskToDay2Fixture: Partial<IvfTaskToDay> = {
  id: 2,
  day: 1,
  task: IVFTaskType.InjectionAssessment,
  order: 4,
}

export const ivfTaskToDay3Fixture: Partial<IvfTaskToDay> = {
  id: 3,
  day: 2,
  task: IVFTaskType.SpermWash,
  order: 3,
}

export const ivfTaskToDayZeroPICSIFixture: Partial<IvfTaskToDay> = {
  id: 5,
  day: 0,
  task: IVFTaskType.PICSI,
  order: 5,
}

export const ivfTaskToDay4Fixture: Partial<IvfTaskToDay> = {
  id: 6,
  day: 7,
  task: IVFTaskType.MiiDay1Cryo,
  order: 6,
}

export const ivfTaskToDayZeroIcsiInjectionFixture: Partial<IvfTaskToDay> = {
  id: 7,
  day: 0,
  task: IVFTaskType.IcsiInjection,
  order: 7,
}

export const ivfTaskToDayForVerifyHepBcHivFixture: Partial<IvfTaskToDay> = {
  id: 9,
  day: 0,
  task: IVFTaskType.VerifyHepBcHiv,
  order: 9,
}

export const ivfTaskToDayOocytesCollectionFixture: Partial<IvfTaskToDay> = {
  id: 10,
  day: 1,
  task: IVFTaskType.OocyteCollection,
  order: 10,
}

export const ivfTaskPostStrippingFixture: Partial<IvfTaskToDay> = {
  id: 11,
  day: 1,
  task: IVFTaskType.PostStripping,
  order: 11,
}

export const ivfTaskPostStrippingForCheckMaxCountFixture: Partial<IvfTaskToDay> = {
  id: 25,
  day: 1,
  task: IVFTaskType.PostStripping,
  order: 25,
}

export const ivfTaskMatureOocytePhotoFixture: Partial<IvfTaskToDay> = {
  id: 13,
  day: 1,
  task: IVFTaskType.MatureOocyteGroupPhoto,
  order: 12,
}

export const ivfTaskMatureOocytePhotoDay2Fixture: Partial<IvfTaskToDay> = {
  id: 21,
  day: 2,
  task: IVFTaskType.MatureOocyteGroupPhoto,
  order: 20,
}

export const ivfTaskDay5CheckFixture: Partial<IvfTaskToDay> = {
  id: 14,
  day: 5,
  task: IVFTaskType.Day5Check,
  order: 13,
}

export const ivfTaskDay3CheckFixture: Partial<IvfTaskToDay> = {
  id: 15,
  day: 1,
  task: IVFTaskType.Day3Check,
  order: 14,
}

export const ivfTaskDay3CheckDashboardDayUpdateFixture: Partial<IvfTaskToDay> = {
  id: 50,
  day: 4,
  task: IVFTaskType.Day3Check,
  order: 43,
}

export const ivfTaskDay6CheckFixture: Partial<IvfTaskToDay> = {
  id: 16,
  day: 1,
  task: IVFTaskType.Day6Check,
  order: 15,
}

export const ivfTaskFertilizationCheckFixture: Partial<IvfTaskToDay> = {
  id: 18,
  day: 1,
  task: IVFTaskType.FertilizationCheck,
  order: 17,
}

export const ivfTaskEmbryoPhotoFixture: Partial<IvfTaskToDay> = {
  id: 19,
  day: 1,
  task: IVFTaskType.EmbryoGroupPhoto,
  order: 18,
}

export const ivfTaskEmbryoFreezingOocytesFixture: Partial<IvfTaskToDay> = {
  id: 20,
  day: 1,
  task: IVFTaskType.OocyteFreezing,
  order: 19,
}

export const ivfTaskPrintLabelFixture: Partial<IvfTaskToDay> = {
  id: 22,
  day: 1,
  task: IVFTaskType.PrintLabel,
  order: 22,
}

export const ivfTaskDay7Fixture: Partial<IvfTaskToDay> = {
  id: 23,
  day: 7,
  task: IVFTaskType.Day7Check,
  order: 23,
}

export const ivfTaskDayFreezeEmrbyoFixture: Partial<IvfTaskToDay> = {
  id: 24,
  day: 7,
  task: IVFTaskType.FrozenEmbryoTransfer,
  order: 24,
}

export const ivfTaskDayFertilizationIVFFixture: Partial<IvfTaskToDay> = {
  id: 26,
  day: 3,
  task: IVFTaskType.InseminationIVF,
  order: 24,
}

export const ivfTaskDayFertilizationICSIFixture: Partial<IvfTaskToDay> = {
  id: 27,
  day: 4,
  task: IVFTaskType.IcsiInjection,
  order: 24,
}

export const ivfTaskDayCallPatientFixture: Partial<IvfTaskToDay> = {
  id: 28,
  day: 1,
  task: IVFTaskType.CallThePatient,
  order: 25,
}

export const ivfTaskDaySetupWorksheetFixture: Partial<IvfTaskToDay> = {
  id: 29,
  day: 1,
  task: IVFTaskType.SetupWorksheet,
  order: 26,
}

export const ivfTaskEmbryoDay2Fixture: Partial<IvfTaskToDay> = {
  id: 30,
  day: 2,
  task: IVFTaskType.FrozenEmbryoTransfer,
  order: 12,
}

export const ivfTaskJourneyWitnessFixture: Partial<IvfTaskToDay> = {
  id: 41,
  day: 1,
  task: IVFTaskType.JourneyWitness,
  order: 41,
}

export const ivfTaskDishInventoryFixture: Partial<IvfTaskToDay> = {
  id: 42,
  day: 3,
  task: IVFTaskType.DishInventory,
  order: 14,
}

export const ivfTaskPartnerDishInventoryFixture: Partial<IvfTaskToDay> = {
  id: 43,
  day: 3,
  task: IVFTaskType.PartnerDishInventory,
  order: 14,
}

export const ivfTaskToDayOocytesCollection2Fixture: Partial<IvfTaskToDay> = {
  id: 44,
  day: 1,
  task: IVFTaskType.OocyteCollection,
  order: 20,
}

export const ivfTaskDaySignOffInseminationIVFFixture: Partial<IvfTaskToDay> = {
  id: 45,
  day: 2,
  task: IVFTaskType.InseminationIVF,
  order: 40,
}
export const ivfTaskDaySignOffChangeOverFixture: Partial<IvfTaskToDay> = {
  id: 46,
  day: 2,
  task: IVFTaskType.ChangeOver,
  order: 41,
}

export const ivfTaskToDayOocytesCollectionWithZeroFixture: Partial<IvfTaskToDay> = {
  id: 47,
  day: 0,
  task: IVFTaskType.OocyteCollection,
  order: 42,
}
export const ivfTaskToDayOocytesCollectionForSpermWashFixture: Partial<IvfTaskToDay> = {
  id: 48,
  day: 5,
  task: IVFTaskType.OocyteCollection,
  order: 43,
}
export const ivfTaskToDayOocytesCollectionForSpermWashWithZeroOocyteCollectedFixture: Partial<IvfTaskToDay> =
  {
    id: 49,
    day: 5,
    task: IVFTaskType.SpermWash,
    order: 44,
  }
export const ivfTaskToDayEggThawFixture: Partial<IvfTaskToDay> = {
  id: 51,
  day: 1,
  task: IVFTaskType.EggThaw,
  order: 45,
}

export const ivfTaskToDayMiiDay1CryoStrawDeletionFixture: Partial<IvfTaskToDay> = {
  id: 52,
  day: 0,
  task: IVFTaskType.MiiDay1Cryo,
  order: 46,
}

export const ivfTaskToDayForDay5CheckExpandedEmbryoDeletionFixture: Partial<IvfTaskToDay> = {
  id: 53,
  day: 0,
  task: IVFTaskType.Day5Check,
  order: 47,
}
export const ivfTaskToDayForPIDLabelFixture: Partial<IvfTaskToDay> = {
  id: 54,
  day: 3,
  task: IVFTaskType.PIDLabel,
  order: 48,
}

export const ivfTaskToDayForMiiDay1Fixture: Partial<IvfTaskToDay> = {
  id: 55,
  day: 1,
  task: IVFTaskType.MiiDay1Cryo,
  order: 48,
}
export const ivfTaskToDayForMiiDay1ForDiscardedValidationFixture: Partial<IvfTaskToDay> = {
  id: 56,
  day: 2,
  task: IVFTaskType.MiiDay1Cryo,
  order: 49,
}

export const ivfTaskToDayEggThawStrawSelectionVisibilityFixture: Partial<IvfTaskToDay> = {
  id: 57,
  day: 0,
  task: IVFTaskType.EggThaw,
  order: 50,
}

export const ivfTaskToDayOocyteCollectionStrawSelectionFixture: Partial<IvfTaskToDay> = {
  id: 58,
  day: 5,
  task: IVFTaskType.OocyteCollection,
  order: 51,
}
