import {MedicationInstruction} from '@libs/data-layer/apps/medication/entities/typeorm'
import {medicationFixture} from '@libs/common/test/fixtures/medication.fixture'
import {MedicationStoreType} from '@libs/services-common/enums/medication.enum'

export const medicationInstructionFixture: Partial<MedicationInstruction> = {
  id: 1,
  medicationId: medicationFixture.id,
  prepTimeMinutes: 10,
  description: 'Medication Instruction description',
  storeType: MedicationStoreType.Fridge,
}
