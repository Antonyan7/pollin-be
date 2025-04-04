import {PatientProfile} from '@libs/data-layer/apps/users/entities/fireorm/patient-profile.entity'
import {DateTimeUtil} from '@libs/common'
import {patientDetailFixture} from '@libs/common/test/fixtures/patient-detail.fixture'
import {questionnaireIntentFixture} from './questionnaire.fixture'
import {SexAtBirth} from '@libs/data-layer/apps/clinic-test/enums'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientProfileFixture: Partial<PatientProfile> = {
  id: 'patient-profile-CF',
  patientId: patientDetailFixture.id,
  questionnaires: [
    {
      questionnaireId: questionnaireIntentFixture.questionnaireId,
      createdOn: dateTimeUtil.getFirestoreTimeStampNowDate(),
    },
    {
      questionnaireId: 123,
      createdOn: dateTimeUtil.getFirestoreTimeStampNowDate(),
    },
  ],
}

export const patientFixtureWireTransfer = {
  id: 1,
  uuid: '09c8f277-f1fe-4b69-a0da-c1ff3c7ae713',
  authUserId: 'task-wire-transfer-payment-user',
}

export const wireTransferPatientFixture = {
  id: 1,
  authUserId: 'wireTransferPatientFixture',
  firstName: 'wireTransferPatientFixture',
  lastName: 'wireTransferPatientFixture',
  dateOfBirth: dateTimeUtil.toDate('2001-10-11'),
  sexAtBirth: SexAtBirth.Male,
}
