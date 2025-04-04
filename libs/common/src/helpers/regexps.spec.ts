import {regExPassword} from '@libs/common/helpers/regexps'

regExPassword
it('matches password', () => {
  const password = '1baaaaa#'
  expect(password).toMatch(regExPassword)
})

it('not matches without special character password', () => {
  const password = '1aaaaa'
  expect(password).not.toMatch(regExPassword)
})

it('not matches without number password', () => {
  const password = 'abaaaaa#'
  expect(password).not.toMatch(regExPassword)
})

it('not matches without letters password', () => {
  const password = '11111111111111111#'
  expect(password).not.toMatch(regExPassword)
})
