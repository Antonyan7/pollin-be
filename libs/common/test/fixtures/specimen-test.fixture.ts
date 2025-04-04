import {SpecimenTest} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  specimen30DaysPlusFixture,
  specimenCollectedFixture,
  specimenFixture,
  specimenForBarcodeFixture,
  specimenForGetSpecimensForAppointmentFixture,
  specimenForSpermCryoFixture,
  specimenForSpermCryoPanelFixture,
  specimenForSpermCryoThawedFixture,
  specimenForSpermCryoWithCryoVialsFixture,
} from './specimen.fixture'
import {
  testPanelFixture,
  testPanelForOrderValidationFixture,
  testPanelSpermCryoProcessTypeFixture,
} from './test-panel.fixture'
import {
  testTypeAMHWithMdBIllingCodeFixture,
  testTypeBilirubinFixture,
  testTypeFixture,
  testTypeForGetSpecimensForAppointmentFixture,
  testTypeForTestResultFixture,
  testTypeSpermCryoFixture,
} from './test-type.fixture'

export const specimenTestPanelFixture: Partial<SpecimenTest> = {
  id: 1,
  specimenId: specimenFixture.id,
  testTypeId: null,
  testPanelId: testPanelFixture.id,
}

export const specimenTestTestTypeFixture: Partial<SpecimenTest> = {
  id: 2,
  specimenId: specimenFixture.id,
  testTypeId: testTypeFixture.id,
  testPanelId: null,
}

export const specimenTestAMHFixutre: Partial<SpecimenTest> = {
  id: 3,
  specimenId: specimenCollectedFixture.id,
  testTypeId: testTypeAMHWithMdBIllingCodeFixture.id,
  testPanelId: null,
}

export const specimenTestspecimen30DaysPlusFixture: Partial<SpecimenTest> = {
  id: 4,
  specimenId: specimen30DaysPlusFixture.id,
  testTypeId: testTypeForTestResultFixture.id,
  testPanelId: null,
}

export const specimenTestGetSpecimensForAppointmentWithTestTypeFixture: Partial<SpecimenTest> = {
  id: 5,
  specimenId: specimenForGetSpecimensForAppointmentFixture.id,
  testTypeId: testTypeForGetSpecimensForAppointmentFixture.id,
  testPanelId: null,
}

export const specimenTestGetSpecimensForAppointmentWithTestPanelFixture: Partial<SpecimenTest> = {
  id: 6,
  specimenId: specimenForGetSpecimensForAppointmentFixture.id,
  testTypeId: null,
  testPanelId: testPanelForOrderValidationFixture.id,
}

export const specimenTestForSpermCryoFixture: Partial<SpecimenTest> = {
  id: 7,
  specimenId: specimenForSpermCryoFixture.id,
  testTypeId: testTypeSpermCryoFixture.id,
  testPanelId: null,
}

export const specimenTestForSpermCryoWithCryoVialsFixture: Partial<SpecimenTest> = {
  id: 8,
  specimenId: specimenForSpermCryoWithCryoVialsFixture.id,
  testTypeId: testTypeSpermCryoFixture.id,
  testPanelId: null,
}

export const specimenTestForSpermCryoWithThawedStatusFixture: Partial<SpecimenTest> = {
  id: 9,
  specimenId: specimenForSpermCryoThawedFixture.id,
  testTypeId: testTypeSpermCryoFixture.id,
  testPanelId: null,
}

export const specimenTestForBarcodeFixture: Partial<SpecimenTest> = {
  id: 10,
  specimenId: specimenForBarcodeFixture.id,
  testTypeId: testTypeBilirubinFixture.id,
  testPanelId: null,
}

export const specimenTestForSpermCryoPanel: Partial<SpecimenTest> = {
  id: 11,
  specimenId: specimenForSpermCryoPanelFixture.id,
  testTypeId: null,
  testPanelId: testPanelSpermCryoProcessTypeFixture.id,
}
