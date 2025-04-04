import {TestResultUterusMeasurement} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {Auditable} from '@libs/common'

export type HistoryUterusMeasurementKey = keyof Omit<
  TestResultUterusMeasurement,
  keyof Auditable | 'id' | 'uuid' | 'testResult' | 'testResultId' | 'revisionId'
>
export const HistoryUterusMeasurementKeys = [
  'height',
  'width',
  'length',
  'volume',
  'freeFluid',
  'utTrace',
  'endometriumThickness',
  'trilaminarEndometrium',
]
export const HistoryUterusMeasurementLabelMap: Record<HistoryUterusMeasurementKey, string> = {
  height: 'Height',
  width: 'Width',
  length: 'Length',
  volume: 'Volume',
  freeFluid: 'Free Fluid',
  utTrace: 'UT-Trace',
  endometriumThickness: 'Endometrium Thickness',
  trilaminarEndometrium: 'Trilaminar Endometrium',
}
