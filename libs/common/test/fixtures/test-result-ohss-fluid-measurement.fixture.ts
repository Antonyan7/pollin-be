import {TestResultOHSSFluidMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {testResultForGetOHSSUltrasoundDetailsFixture} from './test-result.fixture'

export const testResultOHSSFluidMeasurementFixture: Partial<TestResultOHSSFluidMeasurement> = {
  id: 1,
  uuid: 'affdc11c-24e8-4f58-91ba-042afec2f4f2',
  testResultId: testResultForGetOHSSUltrasoundDetailsFixture.id,
  PCDSLength: 3.1,
  PCDSWidth: 4.2,
  PCDSAp: 1.1,
  PCDSVolume: 17,
  ACDS: 43,
  rightAdnexa: 1.1,
  leftAdnexa: 6.4,
  morrisonPouchRUQ: 4,
  rightSubdiaphragmatic: 4,
  pleuralEffusionRight: true,
  pleuralEffusionLeft: false,
  totalAmountFreeFluid: 5,
}
