import {PatientPlanToTestTypeProcedure} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-to-test-type-procedure.entity'
import {
  patientPlanFixture,
  patientPlanToUpdateFixture,
  patientPlanV2ToUpdateFixture,
  patientPlanV3ToUpdateFixture,
} from '@libs/common/test/fixtures/patient-plan.fixture'
import {
  testTypeFixture,
  testTypeLifeLabB12Fixture,
  testTypeVolumeFixture,
} from '@libs/common/test/fixtures/test-type.fixture'

export const patientPlanToTestTypeProcedureFixture: Partial<PatientPlanToTestTypeProcedure> = {
  patientPlanId: patientPlanFixture.id,
  testTypeId: testTypeFixture.id,
}

export const patientPlanToTestTypeProcedureForUpdateToRemoveFixture: Partial<PatientPlanToTestTypeProcedure> =
  {
    patientPlanId: patientPlanToUpdateFixture.id,
    testTypeId: testTypeVolumeFixture.id,
  }

export const patientPlanToTestTypeProcedureForUpdateToKeepFixture: Partial<PatientPlanToTestTypeProcedure> =
  {
    patientPlanId: patientPlanToUpdateFixture.id,
    testTypeId: testTypeLifeLabB12Fixture.id,
  }

export const patientPlanV2ToTestTypeProcedureForUpdateToKeepFixture: Partial<PatientPlanToTestTypeProcedure> =
  {
    patientPlanId: patientPlanV2ToUpdateFixture.id,
    testTypeId: testTypeLifeLabB12Fixture.id,
  }

export const patientPlanV3ToTestTypeProcedureForUpdateToKeepFixture: Partial<PatientPlanToTestTypeProcedure> =
  {
    patientPlanId: patientPlanV3ToUpdateFixture.id,
    testTypeId: testTypeLifeLabB12Fixture.id,
  }
