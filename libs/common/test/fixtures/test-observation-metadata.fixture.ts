import {TestObservationMetadata} from '@libs/data-layer/apps/clinic-test/entities/typeorm/test-observations-metadata.entity'
import {ObservationType} from '@libs/data-layer/apps/clinic-test/enums/observation-type.enum'

export const SonoTestObservationMetadataFixture: Partial<TestObservationMetadata> = {
  id: 1,
  uuid: 'cd22356f-d369-4bb2-a063-e485fbd1cb94',
  title: 'SonoTitle',
  type: ObservationType.SONOHYSTOGRAM,
  description: 'SonoDescription',
  imageURL: 'SonoImageURL',
}

export const AFCTestObservationMetadataFixture: Partial<TestObservationMetadata> = {
  id: 2,
  uuid: 'c32c5bf2-4452-4afa-b094-1df5fcff684b',
  title: 'AFCTitle',
  type: ObservationType.AFC,
  description: 'AFCDescription',
  imageURL: 'AFCImageURL',
}

export const TestObservationMetadataForUterusWidthFixture: Partial<TestObservationMetadata> = {
  id: 4,
  uuid: 4 + '32c5bf2-4452-4afa-b094-1df5fcff684b',
  title: 'Uterus width extra title',
  type: ObservationType.UterusWidth,
  description: 'Uterus some long description ',
  htmlDescription: 'long html with table',
}

export const TestObservationMetadataForObservationTypeRightOvaryFollMoreThan1CmFixture: Partial<TestObservationMetadata> =
  {
    id: 5,
    uuid: 5 + '32c5bf2-4452-4afa-b094-1df5fcff684b',
    title: 'RightOvaryFollMoreThan1Cm width extra title',
    type: ObservationType.RightOvaryFollMoreThan1Cm,
    description: 'RightOvaryFollMoreThan1Cm Uterus some long description ',
    htmlDescription: 'RightOvaryFollMoreThan1Cm long html with table',
  }

export const TestObservationMetadataForOhssRighOvaryApproxFixture: Partial<TestObservationMetadata> =
  {
    id: 7,
    uuid: 7 + '32c5bf2-4452-4afa-b094-1df5fcff684b',
    title: 'TestObservationMetadataForOhssFixture width extra title',
    type: ObservationType.RightOvaryApproxNoOfCysts,
    description: 'TestObservationMetadataForOhssFixture Uterus some long description ',
    htmlDescription: 'TestObservationMetadataForOhssFixture long html with table',
  }

export const TestObservationMetadataForOhssLeftSubdiaphragmaticFixture: Partial<TestObservationMetadata> =
  {
    id: 8,
    uuid: 8 + '32c5bf2-4452-4afa-b094-1df5fcff684b',
    title: 'TestObservationMetadataForOhssFixture width extra title',
    type: ObservationType.LeftSubdiaphragmatic,
    description: 'TestObservationMetadataForOhssFixture Uterus some long description ',
    htmlDescription:
      'TestObservationMetadataForOhssLeftSubdiaphragmaticFixture long html with table',
  }

export const TestObservationMetadataForPCDSFixture: Partial<TestObservationMetadata> = {
  id: 9,
  uuid: 9 + '32c5bf2-4452-4afa-b094-1df5fcff684b',
  title: 'PCDS width extra title',
  type: ObservationType.PCDS,
  description: 'PCDS Uterus some long description ',
  htmlDescription: 'PCDS long html with table',
}
