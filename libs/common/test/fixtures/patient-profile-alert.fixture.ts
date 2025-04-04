import {PatientProfileAlert} from '@libs/data-layer/apps/users/entities/typeorm'
import {
  profileAlertAbnormalGroupFixture,
  profileAlertAbnormalSpermFixture,
} from './profile-alert.fixture'
import {
  ivfPatientFemaleFixture,
  ivfPatientMalePartnerFixture,
  patientEmailVerifiedFixture,
  patientForIVFTasks1Fixture,
  patientForIVFTasks2Fixture,
  patientForIVFTasks7Fixture,
  patientForStimCycleDetailsFixture,
  patientWithActivePlanForOrderSecondFixture,
} from './patient.fixture'

export const patientProfileAlertAbnormalPartnerResultFixture: Partial<PatientProfileAlert> = {
  id: 1,
  profileAlertId: profileAlertAbnormalGroupFixture.id,
  uuid: '5c5044e7-08f6-4308-b34a-47373858249a',
  patientId: patientWithActivePlanForOrderSecondFixture.id,
  partnerId: patientForStimCycleDetailsFixture.id,
}

export const patientProfileAlertAbnormalForSequenceFixture: Partial<PatientProfileAlert> = {
  id: 2,
  profileAlertId: profileAlertAbnormalSpermFixture.id,
  uuid: '5c5044e2-01f3-4308-b34a-47373858249a',
  patientId: patientWithActivePlanForOrderSecondFixture.id,
  partnerId: patientForIVFTasks1Fixture.id,
}

export const patientProfileAlertDailyViewFixture: Partial<PatientProfileAlert> = {
  id: 3,
  profileAlertId: profileAlertAbnormalSpermFixture.id,
  uuid: '5c2044e7-18f6-4308-b34a-47373858249a',
  patientId: patientForIVFTasks7Fixture.id,
  partnerId: patientForIVFTasks1Fixture.id,
}

export const patientProfileAlertDailyViewSpawnFixture: Partial<PatientProfileAlert> = {
  id: 4,
  profileAlertId: profileAlertAbnormalSpermFixture.id,
  uuid: '5c3044e7-18f6-4208-b34a-47373858249a',
  patientId: ivfPatientFemaleFixture.id,
  partnerId: patientForIVFTasks1Fixture.id,
}

export const patientProfileAlertTaskDetailsFixture: Partial<PatientProfileAlert> = {
  id: 5,
  profileAlertId: profileAlertAbnormalSpermFixture.id,
  uuid: '5c3044e2-18f6-4208-b34a-47373858249a',
  patientId: ivfPatientFemaleFixture.id,
  partnerId: ivfPatientMalePartnerFixture.id,
}

export const patientProfileAlertForScanBarcodeFixture: Partial<PatientProfileAlert> = {
  id: 6,
  profileAlertId: profileAlertAbnormalSpermFixture.id,
  uuid: 'ba6964bc-9216-4db6-b6e6-2c002cb7962c',
  patientId: patientForIVFTasks2Fixture.id,
  partnerId: patientEmailVerifiedFixture.id,
}
