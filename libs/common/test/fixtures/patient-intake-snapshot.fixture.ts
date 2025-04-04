import {Config} from '@config/config.util'
import {DateTimeUtil} from '@libs/common'
import {questionnaireWithPatientIntakeFemaleCompletedFixture} from '@libs/common/test/fixtures/questionnaire.fixture'
import {patientForFinalizedPatientIntakeFixture} from './patient.fixture'
import {PatientIntakeSnapshot} from '@libs/data-layer/apps/users/entities/fireorm/patient-intake-snapshot.entity'
import {staffUserFixture} from './staff.fixture'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil(Config.get<string>('DEFAULT_TIME_ZONE'))
export const authUserId2: string = 'getPrevQuestion_Token1'

export const patientIntakeSnapshotFixture: Partial<PatientIntakeSnapshot> = {
  id: 'id1',
  patientId: patientForFinalizedPatientIntakeFixture.id,
  finalizedAt: dateTimeUtil.getFirestoreTimeStampNowDate(),
  finalizedByStaffId: staffUserFixture.id,
  questionnaireId: questionnaireWithPatientIntakeFemaleCompletedFixture.id,
}
