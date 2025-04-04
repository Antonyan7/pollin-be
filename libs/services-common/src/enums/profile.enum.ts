export enum HighlightAllergyResponse {
  Yes = 'Yes',
}

export enum ProfileHeaderEnum {
  ContactInfo = 'ContactInfo',
  OHIPInfo = 'OHIPInfo',
  DoctorInfo = 'DoctorInfo',
}

export const getProfileHeaderLabel = new Map<ProfileHeaderEnum, string>([
  [ProfileHeaderEnum.ContactInfo, 'Contact Info'],
  [ProfileHeaderEnum.OHIPInfo, 'OHIP Info'],
  [ProfileHeaderEnum.DoctorInfo, 'Doctor Info'],
])

export enum ProfileHighlightLabel {
  Partners = 'Partners',
  BMI = 'BMI',
  MRP = 'MRP',
  Menses = 'Menses',
  LatexAllergy = 'Latex Allergy',
  FoodAllergies = 'Food Allergies',
  DrugAllergies = 'Drug Allergies',
  Medications = 'Medications',
  OtherProviders = 'Other Providers',
  Email = 'Email',
  ContactNumber = 'Contact Number',
  PatientName = 'Patient Name',
  FamilyDoctor = 'Family Doctor',
  ReferringDoctor = 'Referring Doctor',
  OHIPNumber = 'OHIP Number',
  OHIPVersionCode = 'OHIP Version Code',
  StimSheets = 'Stim Sheets',
  WeightInLbs = 'Weight (lbs)',
  HeightInches = 'Height',
}

export enum MensesResponse {
  Irregular = 'Irregular',
  Regular = 'Regular',
  NoPeriod = 'NoPeriod',
}

export enum MensesResponseLabel {
  Irregular = 'Irregular',
  Regular = 'Regular',
  NoPeriod = 'No Period',
}

export enum HighlightDetailsType {
  LineItems = 'LineItems',
  Medications = 'Medications',
  Partner = 'Partner',
}

export enum ProfileOverviewWidgetLabel {
  PatientGender = 'Patient Gender',
  PatientContribution = 'Patient Contribution',
  PreviousFertilityTreatment = 'Previous Fertility Treatment',
  GTPAETAL = 'GTPAETAL',
  IsOvulating = 'Ov/Anov',
}

export enum ProfileOverviewListItemTitle {
  Yes = 'Yes',
  No = 'No',
  Male = 'Male',
  Female = 'Female',
}

export enum ProfileOverviewUIID {
  PreviousFertilityTreatment = 'PreviousFertilityTreatment',
}

export enum ProfileOverviewWidgetTitle {
  Overview = 'Overview',
}

export enum HighlightDetailsWidgetTitle {
  ContactInformation = 'Contact Information',
  AllergyInformation = 'Allergy Information',
  Medications = 'Medications',
  PartnerInformation = 'Partner Information',
  DoctorInformation = 'Doctor Information',
  OtherProviders = 'Other Providers',
  OHIPInformation = 'OHIP Information',
  StimSheet = 'Stim Sheet',
}

export enum HighlightLinkType {
  Plan = 'Plan',
}
