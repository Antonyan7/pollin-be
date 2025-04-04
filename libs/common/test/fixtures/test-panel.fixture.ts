import {TestPanel} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {labInfoFixture} from './lab-info.fixture'
import {specimenGroupFixture} from './specimen-group.fixture'
import {serviceTypeForAppointmentUpdateFixture} from '@libs/common/test/fixtures/service-type.fixture'
import {
  superTypeFixture,
  superTypeTestPanelFixture,
} from '@libs/common/test/fixtures/super-type.fixture'
import {ProcessType} from '@libs/data-layer/apps/clinic-test/enums/process-type.enum'

export const testPanelFixture: Partial<TestPanel> = {
  id: 11,
  uuid: 'c6c908f5-132d-11ed-814e-0242ac722002',
  title: 'CBC',
  abbreviation: 'cbc',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  superTypeId: superTypeFixture.id,
  price: 200.5,
}

export const testPanelSemenAnalysisFixture: Partial<TestPanel> = {
  id: 1,
  uuid: '0f7fbe71-80fd-480d-b053-ced4c365455d',
  title: 'Semen Analysis',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  description: 'Semen analysis for test Panel',
}

const uuidSuffix: string = '_TestPanelUUID'

export const testPanelForTestResultFixture: Partial<TestPanel> = {
  id: 21,
  uuid: 21 + uuidSuffix,
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  title: 'AMH3',
}

export const testPanelForTestResultDetailFixture: Partial<TestPanel> = {
  id: 23,
  uuid: 23 + uuidSuffix,
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testPanelUrinalysisUnderOrderSetFixture: Partial<TestPanel> = {
  id: 25,
  uuid: '0f7fbe71-80fd-480d-b053-ced4c365488d',
  title: 'Urinalysis (Chemical) Urine R&M (Routine Miscroscopy)',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
}

export const testPanelForOrderValidationFixture: Partial<TestPanel> = {
  id: 26,
  uuid: 'c6c795f5-132d-11ed-814e-0242ac722002',
  title: 'Banater',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  superTypeId: superTypeTestPanelFixture.id,
}

export const testPanelForCreateAppointmentFixture: Partial<TestPanel> = {
  id: 27,
  uuid: 'd41f32e7-b937-4551-b716-78fcc5a818f1',
  title: 'Semen Analysis',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  description: 'Semen analysis for test Panel',
}

export const testPanelHighlightsFixture: Partial<TestPanel> = {
  id: 28,
  uuid: 'ea092864-14d7-455e-b822-4e1105ecf9cf',
  title: 'testPanelHighlightsFixture',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
}

export const testPanelSpermCryoProcessTypeFixture: Partial<TestPanel> = {
  id: 29,
  uuid: 'da092864-14d7-455e-b822-4e1105ecf9kq',
  title: 'Test Panel With SpermCryo process type',
  labId: labInfoFixture.id,
  specimenGroupId: specimenGroupFixture.id,
  serviceTypeId: serviceTypeForAppointmentUpdateFixture.id,
  processType: ProcessType.SpermCryo,
}
