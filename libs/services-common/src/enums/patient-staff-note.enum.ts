export enum StaffNoteFilterTypeEnum {
  StaffNoteType = 'StaffNoteType',
  Author = 'Author',
}

export const StaffNoteFilterTitle = {
  [StaffNoteFilterTypeEnum.StaffNoteType]: 'Note Type',
  [StaffNoteFilterTypeEnum.Author]: 'Authors',
}
