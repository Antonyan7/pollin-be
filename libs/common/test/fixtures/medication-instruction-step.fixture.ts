import {MedicationInstructionStep} from '@libs/data-layer/apps/medication/entities/typeorm'
import {medicationFixture} from '@libs/common/test/fixtures/medication.fixture'
import {StepType} from '@libs/services-common/enums/medication.enum'

export const medicationInstructionStepFixture: Partial<MedicationInstructionStep> = {
  id: 1,
  medicationId: medicationFixture.id,
  title: 'Medication Instruction Step description',
  thumbnailURL: 'Medication Instruction Step thumbnailURL',
  videoUrl: 'Medication Instruction Step videoUrl',
  sequence: 1,
}

export const medicationInstructionAdministrationStepFixture: Partial<MedicationInstructionStep> = {
  id: 2,
  medicationId: medicationFixture.id,
  title: 'Administration Instruction Step description',
  thumbnailURL: 'Administration Instruction Step thumbnailURL',
  videoUrl: 'Administration Instruction Step videoUrl',
  sequence: 1,
  type: StepType.Administration,
}
