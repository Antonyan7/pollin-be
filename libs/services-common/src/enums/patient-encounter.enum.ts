export enum EncounterFilterTypeEnum {
  EncounterType = 'EncounterType',
  Author = 'Author',
}

export const EncounterFilterTitle = {
  [EncounterFilterTypeEnum.EncounterType]: 'Encounter Type',
  [EncounterFilterTypeEnum.Author]: 'Authors',
}

export enum EncounterTemplateVariableEnum {
  PatientName = 'PatientName',
  PatientPartnerNames = 'PatientPartnerNames',
  PatientResults = 'PatientResults',
  PatientPartnerResults = 'PatientPartnerResults',
}
