import {SignatureNotifyingMethod} from '@libs/data-layer/apps/plan/enums/signature.enum'
import {FreeFluidOptions, TrilaminarEndometriumOptions} from './ultrasound.enum'
import {CystType, TestResultStatus} from '@libs/data-layer/apps/clinic-test/enums'
import {TestResultFinalStatusActionsEnum, WorksheetTestResultTypeEnum} from './clinic-test.enum'

export const StimSheetNotifyingMethodLabel = new Map<SignatureNotifyingMethod, string>([
  [SignatureNotifyingMethod.LeftMessage, 'LM'],
  [SignatureNotifyingMethod.PatientAware, 'PA'],
])

export const CystTypeLabel = new Map<CystType, string>([
  [CystType.ParaOvarianCyst, 'Para ovarian cyst'],
  [CystType.ComplexCyst, 'Complex cyst'],
  [CystType.Dermoid, 'Dermoid'],
  [CystType.CorpusLutealCyst, 'Corpus luteal cyst'],
  [CystType.Endometrioma, 'Endometrioma'],
  [CystType.Hydrosalpinx, 'Hydrosalpinx'],
  [CystType.Simple, 'Simple'],
])

export const CystTypeAbbreviation = new Map<CystType, string>([
  [CystType.ParaOvarianCyst, 'POC'],
  [CystType.ComplexCyst, 'CC'],
  [CystType.Dermoid, 'Derm'],
  [CystType.CorpusLutealCyst, 'CLC'],
  [CystType.Endometrioma, 'Endo'],
  [CystType.Hydrosalpinx, 'Hydro'],
  [CystType.Simple, 'Simple'],
])

export enum StimSheetDropdownOptionType {
  CatheterType = 'CatheterType',
  CycleType = 'CycleType',
}

/** For stime sheet to get: Y, N */
export enum UterusTypeShortResults {
  Y = 'Y',
  N = 'N',
  NA = 'N/A',
}

export const uterusTypeResultToAbbreviation = new Map<string, UterusTypeShortResults>([
  [TrilaminarEndometriumOptions.Yes, UterusTypeShortResults.Y],
  [FreeFluidOptions.Yes, UterusTypeShortResults.Y],

  [TrilaminarEndometriumOptions.No, UterusTypeShortResults.N],
  [FreeFluidOptions.No, UterusTypeShortResults.N],

  [TrilaminarEndometriumOptions.NA, UterusTypeShortResults.NA],
])

export enum StimSheetPropertyUpdateFieldEnum {
  Appointments = 'appointments',
}

export enum StimSheetCycleTypeEnum {
  FW = 'FW',
  IC = 'IC',
  IUI = 'IUI',
  TDI = 'TDI',
}

export const PlanSheetTestResultActions = {
  [TestResultStatus.Completed]: [
    TestResultFinalStatusActionsEnum.Review,
    TestResultFinalStatusActionsEnum.Release,
  ],
  [TestResultStatus.Reviewed]: [TestResultFinalStatusActionsEnum.Release],
  [TestResultStatus.AutomaticallyReviewed]: [TestResultFinalStatusActionsEnum.Release],
}

export const PlanSheetUltrasoundTypeLabel = {
  [WorksheetTestResultTypeEnum.TCM]: 'TCM',
}
