export enum GetPrivacyAndTermsFunctions {
  GetPrivacyAndTerms = 'GetPrivacyAndTerms',
  GetConsentsList = 'GetConsentsList',
  GetConsentDetail = 'GetConsentDetail',
  GetQuestionnaireAnswersForGetDetail = 'GetQuestionnaireAnswersForGetDetail',
  SignConsent = 'SignConsent',
  GetConsentQuestionsBySignedPatients = 'GetConsentQuestionsBySignedPatients',
}

export enum GetPrivacyAndTermsActions {
  PredefinedConsentPackageNotExist = 'PredefinedConsentPackageNotExist',
  PredefinedConsentPackageDoesNotContainAnyModule = 'PredefinedConsentPackageDoesNotContainAnyModule',
}
