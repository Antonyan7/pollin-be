import {StaffNoteType} from '@libs/data-layer/apps/users/entities/typeorm'

export const staffNoteTypeFixture: Partial<StaffNoteType> = {
  id: 1,
  uuid: 'staffNoteTypeFixtureUUID',
  title: 'Test_StaffNote_Type_Title',
}

export const staffNoteTypeWithoutAppointmentFixture: Partial<StaffNoteType> = {
  id: 2,
  uuid: 'staffNoteTypeWithoutAppointment',
  title: 'Test_StaffNote_Type_Title',
}

export const staffNoteTypeWithTemplateFixture: Partial<StaffNoteType> = {
  id: 3,
  uuid: '780fbf6c-76d5-4449-a6e6-45a1f7549727',
  title: 'Test_StaffNote_Type_Title',
  template:
    `<h3><bold> StaffNote Template </bold> </h3>` +
    `<p> Template variant 1 </p> \r\n` +
    `<strong> text </strong>`,
}
