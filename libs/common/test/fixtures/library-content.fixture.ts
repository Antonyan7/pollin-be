import {serviceTypeWithDuration30Fixture} from '@libs/common/test/fixtures/service-type.fixture'
import {serviceGroupFixture} from '@libs/common/test/fixtures/service-group.fixture'
import {serviceCategoryFixture} from '@libs/common/test/fixtures/service-category.fixture'
import {LibraryContent} from '@libs/data-layer/apps/users/entities/typeorm/library-content.entity'
import {LibraryContentType} from '@libs/services-common/enums/library.enum'
import {MediaResourceType} from '@libs/services-common/enums'
import {medicationFixture} from './medication.fixture'

export const libraryContentRootFirstCategoryWithSubItemsFixture: Partial<LibraryContent> = {
  id: 1,
  uuid: 1 + '005e601-5be2-4a90-92c7-dd86f38b8bc8',
  sequence: 10,

  contentType: LibraryContentType.Category,

  iconURL: 'rootCategoryIconURL',
  title: 'rootCategoryTitle',
}

export const libraryContentMediaResourceFixture: Partial<LibraryContent> = {
  id: 5,
  uuid: 5 + '005e601-5be2-4a90-92c7-dd86f38b8bc8',
  parentCategoryId: libraryContentRootFirstCategoryWithSubItemsFixture.id,

  medicationId: medicationFixture.id,
  title: 'Related Resource title',
  label: 'Related Resource label',
  tag: 'Related Resource tag',
  iconURL: 'Related Resource iconURL',
  thumbnailURL: 'Related Resource thumbnailURL',
  url: 'Related Resource url',
  sequence: 1,
  resourceType: MediaResourceType.Link,
}

export const libraryContentMediaResourceForServiceTypeFixture: Partial<LibraryContent> = {
  id: 6,
  parentCategoryId: libraryContentRootFirstCategoryWithSubItemsFixture.id,

  serviceTypeId: serviceTypeWithDuration30Fixture.id,
  sequence: 1,
  url: 'serviceTypeUrl',
  resourceType: MediaResourceType.Link,
}

export const libraryContentMediaResourceForServiceGroupFixture: Partial<LibraryContent> = {
  id: 7,
  parentCategoryId: libraryContentRootFirstCategoryWithSubItemsFixture.id,

  serviceGroupId: serviceGroupFixture.id,
  sequence: 1,
  url: 'serviceGroupUrl',
  resourceType: MediaResourceType.Link,
}

export const libraryContentMediaResourceForServiceCategorySequence2Fixture: Partial<LibraryContent> =
  {
    id: 8,
    parentCategoryId: libraryContentRootFirstCategoryWithSubItemsFixture.id,

    serviceCategoryId: serviceCategoryFixture.id,
    sequence: 2,
    url: 'urlForSequence2',
    resourceType: MediaResourceType.Link,
  }

export const libraryContentMediaResourceForServiceCategorySequence1Fixture: Partial<LibraryContent> =
  {
    id: 9,
    parentCategoryId: libraryContentRootFirstCategoryWithSubItemsFixture.id,

    serviceCategoryId: serviceCategoryFixture.id,
    sequence: 1,
    url: 'urlForSequence1',
    resourceType: MediaResourceType.PDF,
  }

export const libraryContentRootSecondCategoryWithNoSubItemsFixture: Partial<LibraryContent> = {
  id: 11,
  uuid: 11 + '05e601-5be2-4a90-92c7-dd86f38b8bc8',

  sequence: 11,

  contentType: LibraryContentType.Category,

  iconURL: 'rootCategoryIconURL',
  title: 'rootCategoryTitle',
}

export const libraryContentRootThirdResourceFixture: Partial<LibraryContent> = {
  id: 12,
  uuid: 12 + '05e601-5be2-4a90-92c7-dd86f38b8bc8',

  sequence: 12,

  contentType: LibraryContentType.Resource,

  tag: 'rootResourceTag',
  title: 'rootResourceTitle',
  thumbnailURL: 'rootResourceThumbnailURL',
  iconURL: 'rootResourceIconUrl',
  label: 'rootResourceLabel',
  url: 'rootResourceUrl',
  resourceType: MediaResourceType.Video,
}

export const libraryContentSubResourceForRootCategoryFixture: Partial<LibraryContent> = {
  id: 13,
  uuid: 13 + '05e601-5be2-4a90-92c7-dd86f38b8bc8',

  sequence: 13,
  parentCategoryId: libraryContentRootFirstCategoryWithSubItemsFixture.id,
  contentType: LibraryContentType.Resource,
  title: 'UniqueTitleToValidateOnTestlibraryContentSubResourceForRootCategoryFixture',
}
