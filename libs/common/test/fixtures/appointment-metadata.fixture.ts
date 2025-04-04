import {AppointmentMetadata} from '@libs/data-layer/apps/scheduling/entities/typeorm'
import {
  appointmentFollowUpFixture,
  appointmentForSlotFixture,
  nextYear,
} from '@libs/common/test/fixtures/appointment.fixture'
import {DateTimeUtil} from '@libs/common'
import {commonConfig} from '@config/common.configuration'
import {staffWithMockedAssignorIdFixture} from '@libs/common/test/fixtures/staff.fixture'
const dateTimeUtil: DateTimeUtil = new DateTimeUtil(commonConfig.DEFAULT_TIME_ZONE as string)

export const appointmentMetadataFixture: Partial<AppointmentMetadata> = {
  id: 1,
  appointmentId: appointmentForSlotFixture.id,
  primaryReason: 'appointmentAcuityFixturePrimaryReason',
}

export const appointmentMetadataFollowUpFixture: Partial<AppointmentMetadata> = {
  id: 2,
  appointmentId: appointmentFollowUpFixture.id,
  primaryReason: 'appointmentMetadataFollowUpFixture',
  signedOffDate: dateTimeUtil.toDate(`${nextYear}-06-17T03:24:00`),
  signedOffById: staffWithMockedAssignorIdFixture.id,
}
