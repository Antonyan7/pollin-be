import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'
import {EncounterType} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  EncounterTypeComponent,
  EncounterTypeComponentEnum,
} from '@libs/data-layer/apps/users/entities/typeorm/encounter-type-component.entity'
import {testTypeForObUltrasoundFixture, testTypeHCGFixture} from './test-type.fixture'
import {EncounterTemplateVariableEnum} from '@libs/services-common/enums'

export const encounterTypeFixture: Partial<EncounterType> = {
  id: 1,
  uuid: 'encounterTypeFixtureUUID',
  title: 'Test_Encounter_Type_Title',
}

export const encounterTypeWithoutAppointmentFixture: Partial<EncounterType> = {
  id: 2,
  uuid: 'encounterTypeWithoutAppointment',
  title: 'Test_Encounter_Type_Title',
}

export const encounterTypeWithTemplateFixture: Partial<EncounterType> = {
  id: 3,
  uuid: '780fbe6c-76d5-4449-a6e6-45a1f7549727',
  title: 'Test_Encounter_Type_Title',
  template:
    `<h3><bold> Encounter Template </bold> </h3>` +
    `<p> Template variant 1 </p> \r\n` +
    `<strong> text </strong>`,
}

export const encounterTypeWithTemplateParamsFixture: Partial<EncounterType> = {
  id: 4,
  uuid: '780fce6a-86d5-4449-a6e6-45a1f7549727',
  title: 'encounterTypeWithTemplateParamsFixture',
  template:
    `<%- ${EncounterTemplateVariableEnum.PatientName} %><br/>` +
    `<%- ${EncounterTemplateVariableEnum.PatientPartnerNames} %><br/>` +
    `<%- ${EncounterTemplateVariableEnum.PatientPartnerResults} %><br/>` +
    `<%- ${EncounterTemplateVariableEnum.PatientResults} %><br/>`,
  components: [
    {
      id: 1,
      label: 'HCG:',
      sequence: 1,
      sexAtBirth: SexAtBirth.Female,
      type: EncounterTypeComponentEnum.TestTypeResult,
      testTypeId: testTypeHCGFixture.id,
    },
    {
      id: 2,
      label: 'AFC:',
      sequence: 2,
      sexAtBirth: SexAtBirth.Female,
      type: EncounterTypeComponentEnum.AFC,
    },
    {
      id: 3,
      label: 'Sono:',
      sequence: 3,
      sexAtBirth: SexAtBirth.Female,
      type: EncounterTypeComponentEnum.FirstSonoDate,
    },
    {
      id: 4,
      label: 'HCG: ',
      sequence: 4,
      sexAtBirth: SexAtBirth.Male,
      type: EncounterTypeComponentEnum.TestTypeResult,
      testTypeId: testTypeHCGFixture.id,
    },
    {
      id: 5,
      label: null,
      sequence: 1,
      sexAtBirth: SexAtBirth.Female,
      type: EncounterTypeComponentEnum.TestTypeResult,
      testTypeId: testTypeForObUltrasoundFixture.id,
    },
  ] as EncounterTypeComponent[],
}
