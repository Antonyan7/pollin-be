import {TestType, TestTypeConfiguration} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {labInfoDynacareFixture, labInfoFixture, labInfoLifeLabsFixture} from './lab-info.fixture'
import {specimenGroupFixture} from './specimen-group.fixture'
import {
  serviceTypeFixture,
  serviceTypeForAppointmentUpdateFixture,
  serviceTypeProcedureFixture,
} from '@libs/common/test/fixtures/service-type.fixture'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'
import {HormoneType} from '@libs/data-layer/apps/clinic-test/enums'
import {
  mdBillingServiceCodeFixture,
  mdbillingServiceCodeFixture,
} from './mdbilling-service-code.fixture'
import {
  superTypeDiagnosticImagingFixture,
  superTypeFixture,
  superTypeGroupFixture,
  superTypeOtherFixture,
} from '@libs/common/test/fixtures/super-type.fixture'

const uuidSuffix: string = '_TestTypeUUID'

export const testTypeFixture: Partial<TestType> = {
  id: 13,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac122002',
  title: 'AMH',
  abbreviation: 'amh-abbreviation',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 100.2,
  description: 'AMH Description',
  unit: 'Unit_testTypeFixture',
}

export const testTypeVolumeFixture: Partial<TestType> = {
  id: 1,
  uuid: 'd5483bd6-2c35-4d69-a8f9-12805b0ff0df',
  title: 'Volume',
  unit: 'ml',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  testTypeResultOptions: null,
}

export const testTypeMotilityFixture: Partial<TestType> = {
  id: 2,
  uuid: 'a0dee8d2-dacf-4074-9412-6cac0765367b',
  title: 'Motility',
  unit: '%',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeSemenCultureFixture: Partial<TestType> = {
  id: 7,
  uuid: '20e3ef1d-d744-42af-b620-ca75b6081f11',
  title: 'Semen Culture',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  averageRange: 'Volume: 1.3-1.5 ml',
  relevancyPeriodMonths: 1,
}

export const testTypeAMHWithMdBIllingCodeFixture: Partial<TestType> = {
  id: 11,
  uuid: '2dfdc544-8213-44cf-8384-b83aa39b1b4d',
  title: 'AMH(different)',
  unit: 'ng/mL',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 35,
  mdBillingServiceCodeId: mdbillingServiceCodeFixture.id,
}

export const testTypeForTestResultFixture: Partial<TestType> = {
  id: 20,
  uuid: 20 + uuidSuffix,
  labId: labInfoFixture.id,
  unit: 'ng/mL',
  title: 'AMH(another one)',
  specimenGroupId: specimenGroupFixture.id,
  descriptionOnMobile: 'Example Description on Mobile',
}

export const testTypeAntiSpermFixture: Partial<TestType> = {
  id: 21,
  uuid: '444908f5-132d-11ed-814e-0242ac777002',
  title: 'Anti-Sperm AB',
  abbreviation: 'abr',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeToTestPanelHCTFixture: Partial<TestType> = {
  id: 25,
  uuid: '444908f5-132d-11ed-814e-0242ac777222',
  title: 'HCT',
  unit: 'testUnit/test unit',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeToTestPanelMCHFixture: Partial<TestType> = {
  id: 26,
  uuid: '444908f5-132d-11ed-814e-0242ac777333',
  title: 'Hgb',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeBloodGroupScreenFixture: Partial<TestType> = {
  id: 27,
  uuid: '444908f5-132d-11ed-814e-0242ac777555',
  title: 'Blood Group Screen',
  abbreviation: 'BGS',

  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  roundingForDecimalResultEnabled: true,
}

export const testTypeHbElectrophoresisFixture: Partial<TestType> = {
  id: 28,
  uuid: '444908f5-132d-11ed-814e-0242ac777666',
  title: 'Hb Electrophoresis',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeGlucoseFixture: Partial<TestType> = {
  id: 29,
  uuid: '444908f5-132d-11ed-814e-0242ac777777',
  title: 'Glucose Urine',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeBilirubinFixture: Partial<TestType> = {
  id: 30,
  uuid: '444908f5-132d-11ed-814e-0242ac777888',
  title: 'Bilirubin Urine',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeForOrderValidationFixture: Partial<TestType> = {
  id: 31,
  uuid: '444908f5-777d-11ed-757e-0242ac777888',
  title: 'Banman',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeAnalogFixture: Partial<TestType> = {
  id: 32,
  uuid: 'c6k908f5-132z-11ed-814e-0242ac122007',
  title: 'AMH analog',
  abbreviation: 'amhALG',
  unit: 'ml',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const individualTestTypeAnalogFixture: Partial<TestType> = {
  id: 33,
  uuid: 'c6z908f5-132z-11ed-814e-1242bc122007',
  title: 'Individual test',
  abbreviation: 'INDT',
  unit: 'ml',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeE2Fixture: Partial<TestType> = {
  id: 34,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac122011',
  labId: labInfoFixture.id,
  hormoneType: HormoneType.Estradiol,
  title: 'e2',
  abbreviation: 'E2',
}

export const testTypeP4Fixture: Partial<TestType> = {
  id: 35,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac122012',
  labId: labInfoFixture.id,
  hormoneType: HormoneType.Progesterone,
}

export const testTypeLHFixture: Partial<TestType> = {
  id: 36,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac122013',
  labId: labInfoFixture.id,
  hormoneType: HormoneType.LuteinizingHormone,
}

export const testTypeFSHFixture: Partial<TestType> = {
  id: 37,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac122014',
  labId: labInfoFixture.id,
  hormoneType: HormoneType.FollicleStimulatingHormone,
}

export const testTypeForCreateAppointmentFixture: Partial<TestType> = {
  id: 38,
  uuid: 'b9ba42d0-a375-4e0b-a4de-5eeea1cbf985',
  title: 'blood',
  abbreviation: 'blood',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  serviceTypeId: serviceTypeFixture.id,
  superTypeId: superTypeFixture.id,
}

export const testTypeWithDifferentServiceTypeFixture: Partial<TestType> = {
  id: 39,
  uuid: '262e21e6-8c96-491d-91fe-31e6033cb8ec',
  title: 'blood',
  abbreviation: 'blood',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
}

export const testTypeForUltrasoundFolliclesFixture: Partial<TestType> = {
  id: 45,
  uuid: '444908f5-132d-11ed-814e-0gg2ac777555',
  title: 'UltrasoundFollicles',
  abbreviation: 'BGS',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  processType: ProcessType.UltrasoundFolliclesMonitoring,
  superTypeId: superTypeDiagnosticImagingFixture.id,
}

export const testTypeForGetSpecimensForAppointmentFixture: Partial<TestType> = {
  id: 46,
  uuid: '719908f5-132d-11ed-814e-0gg2ac777335',
  title: 'TestTypeForApi',
  abbreviation: 'BGS',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testTypeSpermCryoFixture: Partial<TestType> = {
  id: 47,
  uuid: '1ec4ee1e-c68d-41a9-944a-e7436e68bd3e',
  title: 'Sperm Cryo',
  abbreviation: 'SPCYO',
  unit: '',
  labId: labInfoFixture.id,
  processType: ProcessType.SpermCryo,
}

export const testTypeForUltrasoundDay3Fixture: Partial<TestType> = {
  id: 50,
  uuid: 50 + '4908f5-132d-11ed-814e-0gg2ac777555',
  title: 'UltrasoundDay3',
  abbreviation: 'Day3',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  processType: ProcessType.UltrasoundDay3,
  superTypeId: superTypeDiagnosticImagingFixture.id,
}

export const testTypeForUltrasoundSonohysterogramFixture: Partial<TestType> = {
  id: 52,
  uuid: 52 + '4908f5-132d-11ed-814e-0gg2ac777555',
  title: 'Sonohysterogram',
  abbreviation: 'Sonohyst',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  processType: ProcessType.UltrasoundSonohysterogram,
}

export const testTypeForObUltrasoundFixture: Partial<TestType> = {
  id: 53,
  uuid: '2dfdc544-8213-44cf-8384-b83aa39b1b4e',
  title: 'AMH(different)',
  unit: 'ng/mL',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 35,
  mdBillingServiceCodeId: mdBillingServiceCodeFixture.id,
  processType: ProcessType.UltrasoundObstetric,
  superTypeId: superTypeDiagnosticImagingFixture.id,
}

export const notTaxableTestTypeAMHFixture: Partial<TestType> = {
  id: 54,
  uuid: '0d0fd87d-2b0a-46de-b018-fa7fbe9c3ce9',
  title: 'Not taxable AMH(different)',
  unit: 'ng/mL',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 35,
  taxable: false,
}

export const testTypeTSHFixture: Partial<TestType> = {
  id: 55,
  uuid: 'a6c908f5-132d-11ed-814e-0132ac122012',
  unit: 'kg',
  labId: labInfoFixture.id,
  hormoneType: HormoneType.ThyroidStimulatingHormone,
}

export const testTypeHCGFixture: Partial<TestType> = {
  id: 56,
  uuid: 'c6c908f5-132d-11ed-812c-0132ac122012',
  unit: 'm/L',
  labId: labInfoFixture.id,
  hormoneType: HormoneType.HumanChorionicGonadotropin,
  superTypeId: superTypeOtherFixture.id,
}

export const testTypeProcedureFixture: Partial<TestType> = {
  id: 57,
  uuid: 'd6c908f5-231d-11ed-812c-0132ac122012',
  unit: 'm/L',
  labId: labInfoFixture.id,
  abbreviation: 'WW',
  serviceTypeId: serviceTypeProcedureFixture.id,
  title: 'testTypeProcedureFixture',
  superTypeId: superTypeGroupFixture.id,
}

export const testTypeLifeLabB12Fixture: Partial<TestType> = {
  id: 58,
  uuid: 'e6c908f5-231d-11ed-812c-0132ac122013',
  unit: 'm/L',
  labId: labInfoLifeLabsFixture.id,
  title: 'Vitamin B12',
  lifeLabsCode: 'LIFELABS_B12',
  superTypeId: superTypeFixture.id,
}

export const testTypeFreeFixture: Partial<TestType> = {
  id: 65,
  uuid: 65 + 'c908f5-231d-11ed-812c-0132ac122013',
  price: 0,
  title: 'testTypeFreeFixtureTitle',
}

export const testTypeForUltrasoundOHSSFixture: Partial<TestType> = {
  id: 66,
  uuid: '287cc719-1a48-4562-8ef4-603d5a4ec53b',
  title: 'UltrasoundOHSS',
  abbreviation: 'OHSS',
  unit: '',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  processType: ProcessType.UltrasoundOHSS,
}

export const testTypeSpermVolumeFixture: Partial<TestType> = {
  id: 68,
  uuid: 'wh3908f5-132d-11ed-814e-k342ac1220j7',
  title: 'Sperm Volume',
  abbreviation: 'SVol',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 22,
  unit: 'ml',
}

export const testTypeDNAFragmentationIndexFixture: Partial<TestType> = {
  id: 69,
  uuid: 'kq3908f5-132d-11ed-814e-n442ac1220o2',
  title: 'DNA Fragmentation Index',
  abbreviation: 'DNA',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 22,
  unit: '%',
}

export const testTypeAFCFixture: Partial<TestType> = {
  id: 70,
  uuid: '78b647a4-952a-4069-8da0-a45ff6fe200e',
  title: 'Antral Follicle Count (AFC)',
  abbreviation: 'AFC',
  labId: labInfoFixture.id,
  processType: ProcessType.UltrasoundDay3,
  specimenGroupId: specimenGroupFixture.id,
  price: 100.2,
  description: 'Antral Follicle Count (AFC) Description',
}

export const testTypeGeneticTestingPGTAFixture: Partial<TestType> = {
  id: 71,
  uuid: '5254b6de-44a0-4fba-be18-d9e9562d2e23',
  price: 12.02,
  title: 'testTypeGeneticTestingPGTAFixture',
  description: 'testTypeGeneticTestingPGTAFixtureDescription',
  processType: ProcessType.GeneticTesting,
  configurations: [
    {
      id: 1,
      uuid: '254b6de-44a0-4fba-be18-d9e9562d2e23',
      sequence: 2,
      title: 'option1',
      description: 'description1',
    },
    {
      id: 2,
      uuid: '454b6de-44a0-4fba-be18-d9e9562d2e23',
      sequence: 1,
      title: 'option2',
      description: 'description2',
    },
  ] as TestTypeConfiguration[],
  taxable: true,
  isActive: true,
}

export const testTypeGeneticTestingPGTMFixture: Partial<TestType> = {
  id: 72,
  uuid: '2de2df1c-6c06-4cb9-b50b-46eefba37007',
  price: 11.02,
  title: 'testTypeGeneticTestingPGTMFixture',
  processType: ProcessType.GeneticTesting,
  description: 'testTypeGeneticTestingPGTMFixtureDescription',
  taxable: false,
}

export const testTypeGeneticTestingToNotSelectFixture: Partial<TestType> = {
  id: 73,
  uuid: '2de2df1c-6c06-4cb9-b50b-46eefba37012',
  price: 21.02,
  title: 'testTypeGeneticTestingToNotSelectFixture',
  processType: ProcessType.GeneticTesting,
}

export const testTypeForDynacareFixture: Partial<TestType> = {
  id: 74,
  uuid: 'k03908f5-132d-11ed-814e-k342ac1220j7',
  title: 'Sperm Volume',
  abbreviation: 'SVol',
  labId: labInfoDynacareFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  price: 22,
  unit: 'ml',
  averageRange: '1 - 10',
  dynacareCode: '3333',
}

export const testDeactivatedTypeFixture: Partial<TestType> = {
  id: 75,
  uuid: 'ab7ca4d4-cc7f-4cd3-9f03-c30717211678',
  unit: 'm/L',
  labId: labInfoLifeLabsFixture.id,
  title: 'testDeactivatedTypeFixture',
  isActive: false,
  lifeLabsCode: 'LIFELABS_B22',
  superTypeId: superTypeFixture.id,
}

export const testTypePatientHighlightsFixture: Partial<TestType> = {
  id: 76,
  uuid: '10065e5f-3528-4131-8da2-73a143b4881c',
  unit: 'm/L',
  labId: labInfoLifeLabsFixture.id,
  title: 'testTypePatientHighlightsFixture',
  lifeLabsCode: 'LIFELABS_B23',
  superTypeId: superTypeFixture.id,
}

export const testTypePatientHighlights2Fixture: Partial<TestType> = {
  id: 77,
  uuid: '81fdfc16-e5b2-473a-9a29-0b0dc130ba67',
  unit: 'm/L',
  labId: labInfoLifeLabsFixture.id,
  title: 'testTypePatientHighlights2Fixture',
  lifeLabsCode: 'LIFELABS_B24',
  superTypeId: superTypeFixture.id,
}
