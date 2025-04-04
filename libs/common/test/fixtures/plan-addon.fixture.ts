import {PlanAddonCode, PlanAddonType} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/plan-addons.entity'
import {DateTimeUtil} from '@libs/common'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const planAddonFreshDefaultFixture: Partial<PlanAddon> = {
  id: 1,
  uuid: '7fad203a-1111-48f5-8569-01230c9351c6',
  addonType: PlanAddonType.FreshSpermType,
  title: 'planAddonFreshDefault',
  price: 52,
  sequence: 2,
}

export const planAddonFrozenDefaultFixture: Partial<PlanAddon> = {
  id: 2,
  uuid: '7fad203a-1111-48f5-8569-01230c9351c7',
  addonType: PlanAddonType.FrozenSpermType,
  title: 'planAddonFrozenDefault',
  price: 51,
  sequence: 1,
}

export const planAddonFreshFixture: Partial<PlanAddon> = {
  id: 3,
  uuid: '7fad203a-1111-48f5-8569-01230c9351c8',
  addonType: PlanAddonType.FreshSpermType,
  title: 'planAddonFresh',
  price: 61,
  sequence: 1,
}

export const planAddonFrozenFixture: Partial<PlanAddon> = {
  id: 4,
  uuid: '7fad203a-1111-48f5-8569-01230c9351c9',
  addonType: PlanAddonType.FrozenSpermType,
  title: 'planAddonFrozen',
  price: 31,
  code: PlanAddonCode.SpermLI,
  sequence: 2,
}

export const planAddonFertilisationDirectiveSplitFixture: Partial<PlanAddon> = {
  id: 5,
  uuid: '2fbd203a-1111-48f5-8569-01230c9351c9',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFertilisationDirectiveSplitFixture',
  price: 12,
  code: PlanAddonCode.IVFOrICSISplit,
  sequence: 2,
}

export const planAddonFertilisationDirectiveFixture: Partial<PlanAddon> = {
  id: 6,
  uuid: '2fad203a-1111-48f5-8569-01230c9351c9',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFertilisationDirectiveFixture',
  description: 'planAddonFertilisationDirectiveFixture',
  price: 23,
  sequence: 1,
}

export const planAddonIVFFreshDefaultFixture: Partial<PlanAddon> = {
  id: 7,
  uuid: '8d42f6a2-80c6-4690-9d22-39de5dea5947',
  addonType: PlanAddonType.FreshSpermType,
  title: 'ivfTaskGroup',
  price: 8,
  sequence: 10,
}

export const planAddonGeneticTestingFixture: Partial<PlanAddon> = {
  id: 8,
  uuid: '1d42f6a2-80c6-4690-9d22-39de5dea5947',
  addonType: PlanAddonType.GeneticTesting,
  description: 'planAddonGeneticTestingFixture',
  title: 'planAddonGeneticTestingFixture',
  price: 9,
}

export const planAddonEndometrialAssessmentFixture: Partial<PlanAddon> = {
  id: 9,
  uuid: '1d32f2a2-80c6-4690-9d22-29de5dea5947',
  description: 'planAddonEndometrialAssessmentFixture',
  addonType: PlanAddonType.EndometrialAssessment,
  title: 'planAddonEndometrialAssessmentFixture',
  price: 0,
  sequence: 4,
}

export const planAddonEndometrialAssessmentNotSelectedFixture: Partial<PlanAddon> = {
  id: 10,
  uuid: '1d32f2a2-80c6-4690-9d22-32de5dea5947',
  addonType: PlanAddonType.EndometrialAssessment,
  title: 'planAddonEndometrialAssessmentNotSelectedFixture',
  price: 17,
  sequence: 5,
}

export const planAddonFreshEmbryoFixture: Partial<PlanAddon> = {
  id: 11,
  uuid: '5d32f2a2-80c6-4690-9d22-32de5dea5947',
  addonType: PlanAddonType.FreshEmbryoTransfer,
  title: 'planAddonFreshEmbryoFixture',
  price: 12,
  description: 'planAddonFreshEmbryoFixture',
  sequence: 2,
  taxable: false,
  createdAt: dateTimeUtil.subDays(dateTimeUtil.now(), 3),
}

export const planAddonFixture: Partial<PlanAddon> = {
  id: 14,
  uuid: '883f0a23-200a-4ad5-a3c6-1638186d627a',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFixture',
  price: 0,
  sequence: 2,
  code: PlanAddonCode.IVFOrICSISplit,
}

export const planAddonFertilisationGetGroupTaskFixture: Partial<PlanAddon> = {
  id: 15,
  uuid: '48f29449-703e-4939-8dd1-41f6cf561bfb',
  code: PlanAddonCode.IVF,
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFertilisationGetGroupTaskFixture',
  description: 'planAddonFertilisationGetGroupTaskFixture',
  price: 23,
  sequence: 1,
}

export const planAddonGeneticTestingSecondOrderFixture: Partial<PlanAddon> = {
  id: 16,
  uuid: '1d42f6a1-80c2-4690-9d22-39de5dea5947',
  addonType: PlanAddonType.GeneticTesting,
  description: 'planAddonGeneticTestingSecondOrderFixture',
  title: 'planAddonGeneticTestingSecondOrderFixture',
  price: 9,
  sequence: 2,
}

export const planAddonFixtureCaIonophoreFixture: Partial<PlanAddon> = {
  id: 17,
  uuid: '172f288f-7d57-4ab3-a063-85c4b093c9da',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFixtureCa',
  price: 0,
  sequence: 3,
  code: PlanAddonCode.ICSIAndCaIonophore,
}

export const planAddonFixtureIcsiInjectionFixture: Partial<PlanAddon> = {
  id: 23,
  uuid: '4f67eceb-7db4-4a87-a7ff-3ebb51fd45c9',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFixtureIcsi',
  price: 0,
  sequence: 4,
  code: PlanAddonCode.ICSI,
}

export const planAddonGeneticTestingForComponentFixture: Partial<PlanAddon> = {
  id: 21,
  uuid: 'bbb4ef02-ae44-47ba-b807-b58c8335073e',
  addonType: PlanAddonType.GeneticTesting,
  description: 'planAddonGeneticTestingFixture',
  title: 'PGT-A',
  price: 9,
}

export const planAddonComponentHistologyFixture: Partial<PlanAddon> = {
  id: 18,
  uuid: 'eee9a232-4974-44b0-9864-f8294cb7a253',
  description: 'planAddonComponentHistologyFixture',
  addonType: PlanAddonType.EndometrialAssessment,
  title: 'Histology / Pathology',
  price: 10,
  sequence: 3,
}

export const planAddonBiopsyFixture: Partial<PlanAddon> = {
  id: 19,
  uuid: 'eaf98dd8-2444-4c1e-9199-20e688c710ac',
  description: 'planAddonBiopsyFixture',
  addonType: PlanAddonType.EndometrialAssessment,
  title: 'ERA Biopsy',
  price: 10,
  sequence: 2,
}

export const planAddonComponentFertilisationDirectiveFixture: Partial<PlanAddon> = {
  id: 20,
  uuid: 'd04df14c-30e2-46cd-831f-770a5743f9ac',
  description: 'planAddonComponentFertilisationDirectiveFixture',
  addonType: PlanAddonType.EndometrialAssessment,
  title: 'Fertilisation Directive',
  code: PlanAddonCode.IVFOrICSISplit,
  price: 10,
  sequence: 1,
}

export const planAddonFreshWithFrozenBackupSpermTypeFixture: Partial<PlanAddon> = {
  id: 22,
  uuid: 'aba31d5b-90d3-4077-9ca9-94394a12709e',
  addonType: PlanAddonType.FreshWithFrozenBackupSpermType,
  description: 'planFrozenBackupSpermTypeFixture',
  title: 'planFrozenBackupSpermTypeFixture',
  price: 9,
  sequence: 3,
  code: PlanAddonCode.SpermLI,
}

export const planAddonGeneticTestingSecondItemForComponentFixture: Partial<PlanAddon> = {
  id: 24,
  uuid: 'a1d7d090-21d6-427a-9134-b7022f40206a',
  addonType: PlanAddonType.GeneticTesting,
  description: 'planAddonGeneticTestingFixture',
  title: 'PGT-A',
  price: 9,
}

export const planAddonForFreshPartnerWithFrozenBackupFixture: Partial<PlanAddon> = {
  id: 25,
  uuid: '285bc273-752d-4d62-9f16-441ec257b684',
  addonType: PlanAddonType.FreshWithFrozenBackupSpermType,
  description: 'FreshPartnerWithFrozenBackup',
  title: 'FreshPartnerWithFrozenBackup',
  price: 90,
  sequence: 1,
}

export const planAddonFixturePICSIFixture: Partial<PlanAddon> = {
  id: 26,
  uuid: '4f67eceb-7db4-4a21-a7ff-3ebb51fd45c9',
  addonType: PlanAddonType.FertilizationDirective,
  title: 'planAddonFixtureIcsi',
  price: 0,
  sequence: 100,
  code: PlanAddonCode.PICSI,
}

export const planAddonEggQualityAnalysisFixture: Partial<PlanAddon> = {
  id: 27,
  uuid: '4f67eceb-2db3-3a22-b7ff-3ebb51fd45c9',
  addonType: PlanAddonType.EggQualityAnalysis,
  title: 'planAddonEggQualityAnalysisFixture',
  price: 210,
  description: 'planAddonEggQualityAnalysisFixture description',
  sequence: 101,
  taxable: false,
}
