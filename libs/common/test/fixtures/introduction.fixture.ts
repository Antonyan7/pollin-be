import {IntroductionSeedInput} from '@seeds/typeorm/introduction.seed'
import {autoIncrement} from './seed.utils'

const id: () => number = autoIncrement()

export const introductionFixture: IntroductionSeedInput = {
  id: id(),
  uuid: 'f3f2cfe0-8648-4242-865c-467e730fefa1',
  name: 'introductionFixtureName',
  title: 'introductionFixtureTitle',
  heading: 'introductionFixtureHeading',
  description: 'introductionFixtureDescription',
}

export const introductionForQuestionnaireFixture: IntroductionSeedInput = {
  id: id(),
  uuid: '22ef63db-cc70-4e17-9424-8ade453a05c1',
  name: 'introductionForQuestionnaireFixture',
  title: 'introductionForQuestionnaireFixture',
  heading: 'introductionForQuestionnaireFixture',
  description: 'introductionForQuestionnaireFixture',
}

export const introductionForQuestionnaireWithAnswersFixture: IntroductionSeedInput = {
  id: id(),
  uuid: '28bc261a-d7b2-4528-83f2-d883e8bc5f2d',
  name: 'introductionForQuestionnaireWithAnswersFixture',
  title: 'introductionForQuestionnaireWithAnswersFixture',
  heading: 'introductionForQuestionnaireWithAnswersFixture',
  description: 'introductionForQuestionnaireWithAnswersFixture',
}

export const introductionForQuestionnaireWithoutAnswersFixture: IntroductionSeedInput = {
  id: id(),
  uuid: 'c800e73f-6171-4505-8e5d-dedbe1c1622c',
  name: 'introductionForQuestionnaireWithoutAnswersFixture',
  title: 'introductionForQuestionnaireWithoutAnswersFixture',
  heading: 'introductionForQuestionnaireWithoutAnswersFixture',
  description: 'introductionForQuestionnaireWithoutAnswersFixture',
}

export const introductionForServiceCategoryFixture: IntroductionSeedInput = {
  id: id(),
  uuid: '5c5044e7-08f6-4308-b34a-47373858249a',
  name: 'introductionForServiceCategoryFixture',
  title: 'introductionForServiceCategoryFixture',
  heading: 'introductionForServiceCategoryFixture',
  description: 'introductionForServiceCategoryFixture',
}

export const introductionForBookingFlowFixture: IntroductionSeedInput = {
  id: id(),
  uuid: '5c5044e7-08f6-4308-b34a-47373858249b',
  name: 'introductionForBookingFlow',
  title: 'introductionForBookingFlow',
  heading: 'introductionForBookingFlow',
  description: 'introductionForBookingFlow',
}
