import {
  getDateOrNull,
  getFreeFluidShortValue,
} from '@apps/lis/diagnostic-imaging/helper/ultrasound.helper'
import {DefaultValue} from '@libs/common/enums'
import {
  convertNumberToStringArray,
  convertStringToNumberArray,
} from '@libs/common/helpers/ultrasound-result.helper'

describe('Test Result helper functions => cal', () => {
  it('Should run getTestPanelTestTypeFilters function', () => {
    expect(convertStringToNumberArray(null)).toStrictEqual([])
    expect(convertNumberToStringArray(null)).toStrictEqual([])

    expect(getDateOrNull(null)).toBeFalsy()
  })
  it('Should run getFreeFluidShortValue function', () => {
    expect(getFreeFluidShortValue(null)).toStrictEqual(DefaultValue.Dash)
  })
})
