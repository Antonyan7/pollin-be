export enum PatientAdhoc {
  Pending = 'Pending',
  Paid = 'Paid',
  Archived = 'Archived',
}
export const PatientAdHocTextColorMap = new Map<PatientAdhoc, string>([
  [PatientAdhoc.Pending, '#D68300'],
  [PatientAdhoc.Paid, '#02922A'],
  [PatientAdhoc.Archived, '#616161'],
])

export const PatientAdHocBackgroundColorMap = new Map<PatientAdhoc, string>([
  [PatientAdhoc.Pending, '#FAF3E2'],
  [PatientAdhoc.Paid, '#E2F3E4'],
  [PatientAdhoc.Archived, '#EEEEEE'],
])
