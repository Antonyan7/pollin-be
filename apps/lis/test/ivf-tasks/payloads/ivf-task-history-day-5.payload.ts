import {DefaultValue} from '@libs/common/enums'
import {AuthUserFixture, ivfTaskSummaryForDay5Fixture} from '@libs/common/test/fixtures'
import {ivfEmbryoGrade3BBFixture} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'
import {staffWithMockedAssignorIdFixture} from '@libs/common/test/fixtures/staff.fixture'
import {IVFTaskEntityTitle} from '@libs/services-common/enums'
import {Timestamp} from 'firebase-admin/firestore'
import {
  submitPayloadDay5,
  submitPayloadDay5WihtoutBiopsy,
  submitPayloadDay6WithNullLocation,
} from './ivf-task-group-embryo.payload'
import {cryoCaneV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {cryoCanV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {cryoTankV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-tank-v2.fixture'

export const historyDay5WithFreshETCreation = expect.arrayContaining([
  expect.objectContaining({
    entityTitle: IVFTaskEntityTitle.FreshET,
    authUserFullName: `${staffWithMockedAssignorIdFixture.firstName} ${staffWithMockedAssignorIdFixture.lastName}`,
    authUserId: AuthUserFixture.emailVerified.uid,
    sourceTaskSummaryId: ivfTaskSummaryForDay5Fixture.id,
    sourceTaskEmbryoId: expect.any(Number),
    date: expect.any(Timestamp),
    changes: [
      {
        from: DefaultValue.Dash,
        to: IVFTaskEntityTitle.FreshET,
        propertyName: IVFTaskEntityTitle.FreshFreeze,
      },
      {
        from: DefaultValue.Dash,
        to: DefaultValue.No,
        propertyName: IVFTaskEntityTitle.AssistedHatching,
      },
      {
        from: DefaultValue.Dash,
        to: ivfEmbryoGrade3BBFixture.title,
        propertyName: IVFTaskEntityTitle.Grade,
      },
    ],
  }),
  expect.objectContaining({
    entityTitle: null,
    changes: [
      {
        from: DefaultValue.Dash,
        to: String(submitPayloadDay5WihtoutBiopsy.details.embryosArrested),
        propertyName: IVFTaskEntityTitle.EmbryosArrested,
      },
    ],
  }),
])

export const historyDay5WithEmbryoAndAttachments = expect.arrayContaining([
  expect.objectContaining({
    entityTitle: expect.stringContaining('E'),
    sourceTaskEmbryoId: expect.any(Number),
    date: expect.any(Timestamp),
    changes: [
      {
        from: DefaultValue.Dash,
        to: IVFTaskEntityTitle.FreezeEmbryo,
        propertyName: IVFTaskEntityTitle.FreshFreeze,
      },
      {
        from: DefaultValue.Dash,
        to: ivfEmbryoGrade3BBFixture.title,
        propertyName: IVFTaskEntityTitle.Grade,
      },
      {
        from: DefaultValue.Dash,
        to: 'Feb 24, 2029',
        propertyName: IVFTaskEntityTitle.FreezeDate,
      },
      {
        from: DefaultValue.Dash,
        to: `${cryoTankV2Fixture.name} / ${cryoCanV2Fixture.name} / ${cryoCaneV2Fixture.name}`,
        propertyName: IVFTaskEntityTitle.Location,
      },
      {
        from: DefaultValue.Dash,
        to: submitPayloadDay5.details.embryosExpanded[1].details.freezeWitness,
        propertyName: IVFTaskEntityTitle.FreezeWitness,
      },
      {
        from: DefaultValue.Dash,
        to: submitPayloadDay5.details.embryosExpanded[1].details.comments,
        propertyName: IVFTaskEntityTitle.Comments,
      },
      {
        from: DefaultValue.Dash,
        to: DefaultValue.Yes,
        propertyName: IVFTaskEntityTitle.Biopsy,
      },
      {
        from: DefaultValue.Dash,
        to: submitPayloadDay5.details.embryosExpanded[1].biopsy.attachments
          .map(({title}) => title)
          .join('\n'),
        propertyName: IVFTaskEntityTitle.Photo,
      },
    ],
  }),
  expect.objectContaining({
    entityTitle: IVFTaskEntityTitle.FreshET,
    changes: [
      {
        from: DefaultValue.Dash,
        to: IVFTaskEntityTitle.FreshET,
        propertyName: IVFTaskEntityTitle.FreshFreeze,
      },
      {
        from: DefaultValue.Dash,
        to: DefaultValue.Yes,
        propertyName: IVFTaskEntityTitle.AssistedHatching,
      },
      {
        from: DefaultValue.Dash,
        to: ivfEmbryoGrade3BBFixture.title,
        propertyName: IVFTaskEntityTitle.Grade,
      },
    ],
  }),
  expect.objectContaining({
    entityTitle: IVFTaskEntityTitle.FreshET,
    changes: [
      {
        from: IVFTaskEntityTitle.FreshET,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.FreshFreeze,
      },
      {
        from: DefaultValue.No,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.AssistedHatching,
      },
      {
        from: ivfEmbryoGrade3BBFixture.title,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.Grade,
      },
    ],
  }),
])

export const historyDay5WithEmbryoAndAttachmentsEditing = [
  expect.objectContaining({
    entityTitle: expect.stringContaining('E'),
    sourceTaskEmbryoId: expect.any(Number),
    changes: [
      {
        from: IVFTaskEntityTitle.FreezeEmbryo,
        to: IVFTaskEntityTitle.FreshET,
        propertyName: IVFTaskEntityTitle.FreshFreeze,
      },
      {
        from: DefaultValue.Dash,
        to: DefaultValue.Yes,
        propertyName: IVFTaskEntityTitle.AssistedHatching,
      },
      {
        from: 'Feb 24, 2029',
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.FreezeDate,
      },
      {
        from: `${cryoTankV2Fixture.name} / ${cryoCanV2Fixture.name} / ${cryoCaneV2Fixture.name}`,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.Location,
      },
      {
        from: submitPayloadDay5.details.embryosExpanded[1].details.freezeWitness,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.FreezeWitness,
      },
      {
        from: submitPayloadDay5.details.embryosExpanded[1].details.comments,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.Comments,
      },
      {
        from: DefaultValue.Yes,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.Biopsy,
      },
      {
        from: submitPayloadDay5.details.embryosExpanded[1].biopsy.attachments
          .map(({title}) => title)
          .join('\n'),
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.Photo,
      },
    ],
  }),
]

export const historyDay6 = expect.arrayContaining([
  expect.objectContaining({
    entityTitle: expect.stringContaining('E'),
    sourceTaskEmbryoId: expect.any(Number),
    changes: [
      {
        from: IVFTaskEntityTitle.FreezeEmbryo,
        to: IVFTaskEntityTitle.FreshET,
        propertyName: IVFTaskEntityTitle.FreshFreeze,
      },
      {
        from: DefaultValue.Dash,
        to: DefaultValue.Yes,
        propertyName: IVFTaskEntityTitle.AssistedHatching,
      },
      {
        from: 'Feb 24, 2029',
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.FreezeDate,
      },
      {
        from: submitPayloadDay6WithNullLocation.details.embryosExpanded[0].details.freezeWitness,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.FreezeWitness,
      },
      {
        from: submitPayloadDay6WithNullLocation.details.embryosExpanded[0].details.comments,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.Comments,
      },
      {
        from: DefaultValue.No,
        to: DefaultValue.Dash,
        propertyName: IVFTaskEntityTitle.Biopsy,
      },
    ],
  }),
  expect.objectContaining({
    entityTitle: null,
    changes: [
      {
        from: '1',
        to: '0',
        propertyName: IVFTaskEntityTitle.EmbryosArrested,
      },
    ],
  }),
])
