import {TestType} from '@libs/data-layer/apps/clinic-test/entities/typeorm'

export const testTypeForLabIntegrationFixture: Partial<TestType> = {
  id: 444,
  uuid: '446d157a-8205-4067-aef1-c4cc3728d11a',
  title: 'testTypeForLabIntegrationFixture',
  taxable: false,
  lifeLabsCode: '14196-0', // the same value is coming from hl7 file
}

export const testTypeOneForLabIntegrationFixture: Partial<TestType> = {
  id: 445,
  uuid: '116d157a-8205-4067-aef1-c4cc3728d11a',
  title: 'testTypeForLabIntegration1Fixture',
  taxable: false,
  lifeLabsCode: '55420-4', // the same value is coming from hl7 file
}

export const testTypeWithoutIntegrationCodeForLabIntegrationFixture: Partial<TestType> = {
  id: 446,
  uuid: '0006d157a-8205-4067-aef1-c4cc3728d11a',
  title: 'testTypeWithoutIntegrationCodeForLabIntegrationFixture',
  taxable: false,
  lifeLabsCode: null, // must be null
}

export const testTypeForLabIntegrationDynacareFixture: Partial<TestType> = {
  id: 447,
  uuid: 'kk6d157a-8205-4067-aef1-c4cc3728d11a',
  title: 'testTypeForLabIntegrationFixture',
  taxable: false,
  dynacareCode: '544D', // the same value is coming from hl7 file
}
