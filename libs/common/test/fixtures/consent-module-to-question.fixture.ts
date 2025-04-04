import {ConsentModuleToQuestion} from '@libs/data-layer/apps/users/entities/typeorm/consent-module-to-question.entity'
import {ConsentModuleRelationType} from '@libs/data-layer/apps/users/enum'
import {
  consentModuleFertilizationDirectiveFixture,
  consentModuleFixture,
  consentModuleToSendFixture,
} from './consent-module.fixture'
import {
  ageLastQuestion2Fixture,
  firstQuestionFixture,
  question1Fixture,
  stringQuestionFixture,
} from './question.fixture'

export const consentModuleToQuestionForModuleOneFixture: Partial<ConsentModuleToQuestion> = {
  id: 1,
  consentModuleId: consentModuleFixture.id,
  questionId: question1Fixture.id,
  sequence: 2,
}

export const consentModuleToQuestionTwoFOrModuleOneFixture: Partial<ConsentModuleToQuestion> = {
  id: 2,
  consentModuleId: consentModuleFixture.id,
  questionId: stringQuestionFixture.id,
  sequence: 1,
}

export const consentModuleToQuestionOneForModuleTwoFixture: Partial<ConsentModuleToQuestion> = {
  id: 3,
  consentModuleId: consentModuleToSendFixture.id,
  questionId: ageLastQuestion2Fixture.id,
  sequence: 1,
}

export const consentModuleToQuestionTwoForModuleTwoWithAppliesToPartnerFixture: Partial<ConsentModuleToQuestion> =
  {
    id: 4,
    consentModuleId: consentModuleToSendFixture.id,
    questionId: firstQuestionFixture.id,
    sequence: 1,
    appliesTo: ConsentModuleRelationType.Partners,
  }

export const consentModuleToQuestionForConsentModuleFertilizationDirectiveFixtureFixture: Partial<ConsentModuleToQuestion> =
  {
    id: 5,
    consentModuleId: consentModuleFertilizationDirectiveFixture.id,
    questionId: firstQuestionFixture.id,
    sequence: 1,
  }
