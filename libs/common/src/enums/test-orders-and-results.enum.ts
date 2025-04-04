export enum LifeLabsAcknowledgementStatus {
  Positive = 'Positive',
  Negative = 'Negative',
}
export enum HL7AbnormalFlag {
  /** Normal */
  N = 'N',

  /** Abnormal */
  A = 'A',

  /** Abnormal – Low */
  L = 'L',

  /** Abnormal – High */
  H = 'H',

  /** Abnormal – Critically Low */
  LL = 'LL',

  /** Abnormal – Critically High */
  HH = 'HH',

  /** Interpretation required */
  I = 'I ',
}

export enum HL7ResultStatus {
  /** Final result */
  F = 'F',

  /** Result has been changed */
  C = 'C',

  /** Preliminary */
  P = 'P',

  /** Interim */
  I = 'I',

  /** Cancelled */
  X = 'X',
}
