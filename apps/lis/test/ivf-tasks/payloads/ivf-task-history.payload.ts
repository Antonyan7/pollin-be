/* eslint-disable max-lines */
import {SourceGroupTypeEnum, TaskDetails} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {DefaultValue} from '@libs/common/enums'
import {
  AuthUserFixture,
  ivfTaskSummaryForFreezingOocytesFixture,
  ivfTaskSummaryHistoryDay3CheckFixture,
  ivfTaskSummaryHistoryDay7CheckFixture,
  ivfTaskSummaryHistoryFertilizationCheckFixture,
  ivfTaskSummaryInjectionAssessmentFixture,
  ivfTaskSummaryTaskHistoryEmbryoGroupPhotoFixture,
  ivfTaskSummaryTaskHistoryIcsiInjectionFixture,
  ivfTaskSummaryTaskHistoryMiiDay1Fixture,
  ivfTaskSummaryTaskHistoryOocyteCollectionFixture,
  ivfTaskSummaryTaskHistoryOocyteGroupPhotoFixture,
  ivfTaskSummaryTaskHistoryOocytesInseminationnFixture,
  ivfTaskSummaryTaskHistoryPicsiFixture,
  ivfTaskSummaryTaskHistoryPostStrippingFixture,
  ivfTaskSummaryTaskHistorySpermWashFixture,
  ivfTaskSummaryForCallPatientFixture,
  ivfTaskSummarySetupWorksheetFixture,
  ivfTaskSummaryVerifyHepBcHivFixture,
  ivfTaskSummaryForJourneyWitnessFixture,
  staffPhysicianFixture,
} from '@libs/common/test/fixtures'
import {cryoCanV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {cryoCaneV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {cryoTankV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-tank-v2.fixture'
import {
  ivfTaskDetailsFixture,
  ivfTaskDetailsForIVFHistoryFixture,
} from '@libs/common/test/fixtures/ivf-task-details.fixture'
import {
  staffEmbryologistFixture,
  staffUserFixture,
  staffWithMockedAssignorIdFixture,
} from '@libs/common/test/fixtures/staff.fixture'
import {IvfTaskHistory} from '@libs/data-layer/apps/clinic-ivf/entities/fireorm'
import {IVFTaskType, OocyteQuality} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  InjectionAssessmentLabel,
  InjectionAssessmentLabelWithState,
  IvfEmbryoActions,
  IVFTaskEntityTitle,
} from '@libs/services-common/enums'
import {Timestamp} from 'firebase-admin/firestore'
import {
  taskDetailsFreezingOocytesUpdatedStrawRequestPayload,
  taskDetailsFreezingOocytesWithStrawRequestPayload,
} from './ivf-task-group-freeze-oocytes.payload'
import {ivfEmbryoGrade3BBFixture} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'
import {
  ivfUnitOptionFixture,
  ivfUnitOptionHighfieldFixture,
} from '@libs/common/test/fixtures/ivf-unit-option.fixture'
import {IVFTaskToPatientNoteMapper} from './ivt-task-to-note.payload'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'
import {getFullName} from '@libs/common/helpers/patient.helper'

type IVFHistoryTestPayload = {
  request: {id: string; details: Partial<TaskDetails>; dashboardFilterDate: null; note?: string}
  updates: IvfTaskHistory[]
}

export const oocytesCollectionHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryOocyteCollectionFixture.uuid,
    details: {
      oocytesCollected: 1,
      oocytesWarmed: 2,
      oocytesSurvived: 3,
      embryologistId: staffEmbryologistFixture.uuid,
      physicianId: staffPhysicianFixture.uuid,
      selectedEggs: [],
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      entityTitle: null,
      authUserFullName: `${staffWithMockedAssignorIdFixture.firstName} ${staffWithMockedAssignorIdFixture.lastName}`,
      authUserId: AuthUserFixture.emailVerified.uid,
      sourceTaskSummaryId: ivfTaskSummaryTaskHistoryOocyteCollectionFixture.id,
      date: expect.any(Timestamp),
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocytesCollected,
          from: DefaultValue.Dash,
          to: '1',
        },
      ],
    }),
    expect.objectContaining({
      entityTitle: null,
      authUserFullName: `${staffWithMockedAssignorIdFixture.firstName} ${staffWithMockedAssignorIdFixture.lastName}`,
      authUserId: AuthUserFixture.emailVerified.uid,
      sourceTaskSummaryId: ivfTaskSummaryTaskHistoryOocyteCollectionFixture.id,
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocytesWarmed,
          from: String(ivfTaskDetailsForIVFHistoryFixture.oocytesWarmed),
          to: '2',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocytesSurvived,
          from: String(ivfTaskDetailsForIVFHistoryFixture.oocytesSurvived),
          to: '3',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.Embryologist,
          from: `${staffUserFixture.firstName} ${staffUserFixture.lastName}`,
          to: `${staffEmbryologistFixture.firstName} ${staffEmbryologistFixture.lastName}`,
        },
      ],
    }),
  ]),
}

export const spermWashHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistorySpermWashFixture.uuid,
    details: {
      initialConcentration: {
        value: 2,
        unitId: ivfUnitOptionFixture.uuid,
      },
      finalConcentration: {
        value: 1,
        unitId: ivfUnitOptionHighfieldFixture.uuid,
      },
      initialMotility: 2,
      finalMotility: 5,
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.InitialConcentration,
          from: `${ivfTaskDetailsForIVFHistoryFixture.spermWashInitialConcentration} ${ivfUnitOptionHighfieldFixture.title}`,
          to: `2 ${ivfUnitOptionFixture.title}`,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.FinalConcentration,
          from: `${ivfTaskDetailsForIVFHistoryFixture.spermWashFinalConcentration} ${ivfUnitOptionFixture.title}`,
          to: `1 ${ivfUnitOptionHighfieldFixture.title}`,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.InitialMotility,
          from: String(ivfTaskDetailsForIVFHistoryFixture.spermWashInitialMotility),
          to: '2',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.FinalMotility,
          from: String(ivfTaskDetailsForIVFHistoryFixture.spermWashFinalMotility),
          to: '5',
        },
      ],
    }),
  ]),
}

export const postStrippingHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryPostStrippingFixture.uuid,
    details: {
      matureOocytes: 11,
      immatureOocytes: 12,
      degenOocytes: 2,
      abnormalOocytes: 13,
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.MatureOocytes,
          from: String(ivfTaskDetailsForIVFHistoryFixture.matureOocytes),
          to: '11',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.ImmatureOocytes,
          from: String(ivfTaskDetailsForIVFHistoryFixture.immatureOocytes),
          to: '12',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.DegenOocytes,
          from: String(ivfTaskDetailsForIVFHistoryFixture.degenOocytes),
          to: '2',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.AbnormalOocytes,
          from: String(ivfTaskDetailsForIVFHistoryFixture.abnormalOocytes),
          to: '13',
        },
      ],
    }),
  ]),
}

export const oocyteGroupPhotosHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryOocyteGroupPhotoFixture.uuid,
    details: {
      matureOocyteGroupPhotos: [
        {id: null, title: 'photo1.jpg', url: 'url/photo1.jpg'},
        {id: null, title: 'photo2.jpg', url: 'url/photo2.jpg'},
      ],
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.Attachments,
          from: DefaultValue.Dash,
          to: 'photo1.jpg\nphoto2.jpg',
        },
      ],
    }),
  ]),
}

export const icsiInjectionHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryIcsiInjectionFixture.uuid,
    details: {
      split: 31,
      matureOocytesInjected: 36,
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.Split,
          from: String(ivfTaskDetailsForIVFHistoryFixture.icsiSplit),
          to: '31',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.MatureOocytesInjected,
          from: String(ivfTaskDetailsForIVFHistoryFixture.icsiMatureOocytesInjected),
          to: '36',
        },
      ],
    }),
  ]),
}

export const oocytesInseminationHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryOocytesInseminationnFixture.uuid,
    details: {
      oocytesInseminated: 12,
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocytesInseminated,
          from: String(ivfTaskDetailsForIVFHistoryFixture.oocytesInseminated),
          to: '12',
        },
      ],
    }),
  ]),
}

export const picsiHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryPicsiFixture.uuid,
    details: {
      matureOocytesInjected: 1,
      immatureOocytes: 2,
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.MatureOocytesInjected,
          from: String(ivfTaskDetailsForIVFHistoryFixture.picsiMatureOocytesInjected),
          to: '1',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.ImmatureOocytes,
          from: String(ivfTaskDetailsForIVFHistoryFixture.picsiImmatureOocytes),
          to: '2',
        },
      ],
    }),
  ]),
}

export const miiDay1HistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryMiiDay1Fixture.uuid,
    details: {
      matureOocytesToCryo: 9,
      oocytesDiscarded: 3,
      straws: [
        {
          id: null,
          numberOfEggs: 3,
          strawNumber: 1,
          details: {
            freezeDate: '2029-02-24',
            caneId: cryoCaneV2Fixture.uuid,
            canId: cryoCanV2Fixture.uuid,
            freezeWitness: 'history witness',
            comments: 'history comment',
            status: CryoStatus.Frozen,
          },
        },
      ],
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.MatureOocytesToCryo,
          from: String(ivfTaskDetailsForIVFHistoryFixture.matureOocytesToCry),
          to: '9',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocytesDiscarded,
          from: String(ivfTaskDetailsForIVFHistoryFixture.oocytesDiscarded),
          to: '3',
        },
      ],
    }),
    expect.objectContaining({
      entityTitle: expect.stringMatching(/^Straw 1\d*/),
      changes: [
        {
          from: DefaultValue.Dash,
          to: '3',
          propertyName: IVFTaskEntityTitle.Eggs,
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
          to: 'history witness',
          propertyName: IVFTaskEntityTitle.FreezeWitness,
        },
        {
          from: DefaultValue.Dash,
          to: 'history comment',
          propertyName: IVFTaskEntityTitle.Comments,
        },
      ],
    }),
  ]),
}

export const miiDay1UpdateHistoryPayload = (strawUUID: string): IVFHistoryTestPayload => ({
  request: {
    id: ivfTaskSummaryTaskHistoryMiiDay1Fixture.uuid,
    details: {
      matureOocytesToCryo: 8,
      oocytesDiscarded: 10,
      straws: [
        {
          id: strawUUID,
          strawNumber: 1,
          numberOfEggs: 2,
          details: {
            freezeDate: '2029-02-23',
            canId: cryoCanV2Fixture.uuid,
            caneId: cryoCaneV2Fixture.uuid,
            freezeWitness: 'history witness 2',
            comments: 'history comment 2',
            status: CryoStatus.Frozen,
          },
        },
      ],
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.MatureOocytesToCryo,
          from: '9',
          to: '8',
        },
      ],
    }),
    expect.objectContaining({
      entityTitle: expect.stringMatching(/^Straw 1\d*/),
      changes: [
        {
          from: '3',
          to: '2',
          propertyName: IVFTaskEntityTitle.Eggs,
        },
        {
          from: 'Feb 24, 2029',
          to: 'Feb 23, 2029',
          propertyName: IVFTaskEntityTitle.FreezeDate,
        },
        {
          from: 'history witness',
          to: 'history witness 2',
          propertyName: IVFTaskEntityTitle.FreezeWitness,
        },
        {
          from: 'history comment',
          to: 'history comment 2',
          propertyName: IVFTaskEntityTitle.Comments,
        },
      ],
    }),
  ]),
})

export const embryoGroupPhotoHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryTaskHistoryEmbryoGroupPhotoFixture.uuid,
    details: {
      embryoGroupPhotos: [
        {
          id: ivfTaskDetailsForIVFHistoryFixture.embryoGroupPhotos[0].uuid,
          title: 'photo1.jpg',
          url: 'url/photo1.jpg',
        },
        {
          id: null,
          title: 'photo2.jpg',
          url: 'url/photo2.jpg',
        },
      ],
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.Attachments,
          from: `${ivfTaskDetailsForIVFHistoryFixture.embryoGroupPhotos[0].title}`,
          to: `${ivfTaskDetailsForIVFHistoryFixture.embryoGroupPhotos[0].title}\nphoto2.jpg`,
        },
      ],
    }),
  ]),
}

export const newInjectionAssessmentComment = 'new injection assessment comment'
export const injectionAssessmentPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryInjectionAssessmentFixture.uuid,
    details: {
      isAnomaly: true,
      oocyteQualityRatingId: OocyteQuality.Poor,
      oocyteComment: newInjectionAssessmentComment,
      oocyteAssessments: {
        coc: {
          isEnabled: true,
          qualityRating: 1,
        },
        ser: {
          isEnabled: true,
          qualityRating: 3,
        },
        granular: {
          isEnabled: false,
          qualityRating: null,
        },
        fragPBs: {
          isEnabled: true,
          qualityRating: 3,
        },
        pvs: {
          isEnabled: true,
          qualityRating: 1,
        },
        pvd: {
          isEnabled: true,
          qualityRating: 2,
        },
        vacuoles: {
          isEnabled: true,
          qualityRating: 3,
        },
        misshaped: {
          isEnabled: true,
          qualityRating: 1,
        },
        abnormalZone: {
          isEnabled: true,
          qualityRating: 2,
        },
        abnMembraneBreak: {
          isEnabled: true,
          qualityRating: 3,
        },
      },
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocyteComments,
          from: String(ivfTaskDetailsForIVFHistoryFixture.oocyteAssessmentsComment),
          to: newInjectionAssessmentComment,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.OocyteQuality,
          from: String(ivfTaskDetailsForIVFHistoryFixture.oocyteQuality),
          to: OocyteQuality.Poor,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.Anomaly,
          from: DefaultValue.Dash,
          to: DefaultValue.Yes,
        },
      ],
    }),
    expect.objectContaining({
      changes: expect.arrayContaining([
        {
          propertyName: InjectionAssessmentLabel.COC,
          from: DefaultValue.Dash,
          to: '+',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.COC,
          from: DefaultValue.Dash,
          to: 'COC',
        },
        {
          propertyName: InjectionAssessmentLabel.SER,
          from: '+'.repeat(ivfTaskDetailsForIVFHistoryFixture.oocyteAssessmentsSer),
          to: '+++',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.SER,
          from: DefaultValue.Dash,
          to: 'SER',
        },
        {
          propertyName: InjectionAssessmentLabel.Granular,
          from: '+'.repeat(ivfTaskDetailsForIVFHistoryFixture.oocyteAssessmentsGranular),
          to: DefaultValue.Dash,
        },
        {
          propertyName: InjectionAssessmentLabel.FragPBs,
          from: DefaultValue.Dash,
          to: '+++',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.FragPBs,
          from: DefaultValue.Dash,
          to: 'Frag PBs',
        },
        {
          propertyName: InjectionAssessmentLabel.PVS,
          from: DefaultValue.Dash,
          to: '+',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.PVS,
          from: DefaultValue.Dash,
          to: 'PVS',
        },
        {
          propertyName: InjectionAssessmentLabel.PVD,
          from: DefaultValue.Dash,
          to: '++',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.PVD,
          from: DefaultValue.Dash,
          to: 'PVD',
        },
        {
          propertyName: InjectionAssessmentLabel.Vacuoles,
          from: DefaultValue.Dash,
          to: '+++',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.Vacuoles,
          from: DefaultValue.Dash,
          to: 'Vacuoles',
        },
        {
          propertyName: InjectionAssessmentLabel.Misshaped,
          from: DefaultValue.Dash,
          to: '+',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.Misshaped,
          from: DefaultValue.Dash,
          to: 'Misshaped',
        },
        {
          propertyName: InjectionAssessmentLabel.AbnZone,
          from: DefaultValue.Dash,
          to: '++',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.AbnZone,
          from: DefaultValue.Dash,
          to: 'Abn Zone',
        },
        {
          propertyName: InjectionAssessmentLabel.AbnMembraneBreak,
          from: DefaultValue.Dash,
          to: '+++',
        },
        {
          propertyName: InjectionAssessmentLabelWithState.AbnMembraneBreak,
          from: DefaultValue.Dash,
          to: 'Abn Membrane Break',
        },
      ]),
    }),
  ]),
}

export const day3CheckHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryHistoryDay3CheckFixture.uuid,
    details: {
      embryosMoreThan6Cells: 4,
      embryosLessThan6Cells: 3,
      embryosArrested: 1,
      embryosAverageFrag: 2,
      assistedHatching: true,
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.EmbryosMoreThan6Cells,
          from: String(ivfTaskDetailsForIVFHistoryFixture.day3EmbryosMoreThan6Cells),
          to: '4',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.EmbryosLessThan6Cells,
          from: String(ivfTaskDetailsForIVFHistoryFixture.day3EmbryosLessThan6Cells),
          to: '3',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.EmbryosArrested,
          from: String(ivfTaskDetailsForIVFHistoryFixture.day3EmbryosArrested),
          to: '1',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.AvgFragOfEmbryos,
          from: String(ivfTaskDetailsForIVFHistoryFixture.day3EmbryosAverageFrag),
          to: '2',
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.AssistedHatching,
          from: DefaultValue.No,
          to: DefaultValue.Dash,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: 'Fresh transfer',
          from: DefaultValue.Dash,
          to: DefaultValue.Yes,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          propertyName: 'Number of embryos to transfer',
          from: DefaultValue.Dash,
          to: '5',
        },
      ],
    }),
  ]),
}

export const day3CheckHistoryWithFreshTransferPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryHistoryDay3CheckFixture.uuid,
    details: {
      embryosMoreThan6Cells: 4,
      embryosLessThan6Cells: 3,
      embryosArrested: 1,
      embryosAverageFrag: 2,
      assistedHatching: true,
      freshTransfer: {
        enabled: true,
        embryosToTransfer: 5,
        assistedHatching: null,
      },
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          propertyName: IVFTaskEntityTitle.FreshTransfer,
          from: DefaultValue.Dash,
          to: DefaultValue.Yes,
        },
      ],
    }),
  ]),
}
export const oocytesFreezingCreationUpdates = expect.arrayContaining([
  expect.objectContaining({
    entityTitle: expect.stringMatching(/^Straw 1\d*/),
    authUserFullName: `${staffWithMockedAssignorIdFixture.firstName} ${staffWithMockedAssignorIdFixture.lastName}`,
    authUserId: AuthUserFixture.emailVerified.uid,
    sourceTaskSummaryId: ivfTaskSummaryForFreezingOocytesFixture.id,
    date: expect.any(Timestamp),
    changes: [
      {
        from: DefaultValue.Dash,
        to: String(taskDetailsFreezingOocytesWithStrawRequestPayload.straws[0].numberOfEggs),
        propertyName: IVFTaskEntityTitle.Eggs,
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
        to: String(
          taskDetailsFreezingOocytesWithStrawRequestPayload.straws[0].details.freezeWitness,
        ),
        propertyName: IVFTaskEntityTitle.FreezeWitness,
      },
      {
        from: DefaultValue.Dash,
        to: String(taskDetailsFreezingOocytesWithStrawRequestPayload.straws[0].details.comments),
        propertyName: IVFTaskEntityTitle.Comments,
      },
    ],
  }),
])

export const oocytesFreezingEditingUpdates = expect.arrayContaining([
  expect.objectContaining({
    entityTitle: expect.stringMatching(/^Straw 1\d*/),
    authUserFullName: `${staffWithMockedAssignorIdFixture.firstName} ${staffWithMockedAssignorIdFixture.lastName}`,
    authUserId: AuthUserFixture.emailVerified.uid,
    sourceTaskSummaryId: ivfTaskSummaryForFreezingOocytesFixture.id,
    date: expect.any(Timestamp),
    changes: [
      {
        from: String(taskDetailsFreezingOocytesWithStrawRequestPayload.straws[0].numberOfEggs),
        to: String(
          taskDetailsFreezingOocytesUpdatedStrawRequestPayload(null, 2).straws[0].numberOfEggs,
        ),
        propertyName: IVFTaskEntityTitle.Eggs,
      },
      {
        from: 'Feb 24, 2029',
        to: 'Feb 01, 2029',
        propertyName: IVFTaskEntityTitle.FreezeDate,
      },
      {
        from: String(
          taskDetailsFreezingOocytesWithStrawRequestPayload.straws[0].details.freezeWitness,
        ),
        to: String(
          taskDetailsFreezingOocytesUpdatedStrawRequestPayload(null, 2).straws[0].details
            .freezeWitness,
        ),
        propertyName: IVFTaskEntityTitle.FreezeWitness,
      },
      {
        from: String(taskDetailsFreezingOocytesWithStrawRequestPayload.straws[0].details.comments),
        to: String(
          taskDetailsFreezingOocytesUpdatedStrawRequestPayload(null, 2).straws[0].details.comments,
        ),
        propertyName: IVFTaskEntityTitle.Comments,
      },
    ],
  }),
])

export const day7CheckHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryHistoryDay7CheckFixture.uuid,
    details: {
      embryosDiscarded: 2,
      embryosExpanded: [
        {
          id: null,
          title: 'test day 7',
          identifier: '2',
          embryoNumber: 1,
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          biopsy: null,
          actionType: IvfEmbryoActions.FreshTransfer,
          embryologistId: staffEmbryologistFixture.uuid,
          details: {assistedHatching: false, physicianId: staffPhysicianFixture.uuid},
        },
      ],
    },
    dashboardFilterDate: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      entityTitle: IVFTaskEntityTitle.FreshET,
      sourceTaskEmbryoId: expect.any(Number),
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
        {
          from: DefaultValue.Dash,
          to: getFullName(staffEmbryologistFixture.firstName, staffEmbryologistFixture.lastName),
          propertyName: IVFTaskEntityTitle.Embryologist,
        },
      ],
    }),
    expect.objectContaining({
      entityTitle: null,
      changes: [
        {
          from: DefaultValue.Dash,
          to: '2',
          propertyName: IVFTaskEntityTitle.EmbryosDiscarded,
        },
      ],
    }),
  ]),
}

export const fertilizationCheckHistoryPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryHistoryFertilizationCheckFixture.uuid,
    details: {
      sourceGroups: [
        {
          typeId: SourceGroupTypeEnum.IVF,
          '0pn': 1,
          '1pn': 2,
          '2pn': 3,
          '3pn': 4,
          degenOrArrested: 5,
        },
        {
          typeId: SourceGroupTypeEnum.PICSI,
          '0pn': 6,
          '1pn': 7,
          '2pn': 8,
          '3pn': 9,
          degenOrArrested: 10,
        },
      ],
    },
    dashboardFilterDate: null,
    note: 'new note',
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: `5 ${SourceGroupTypeEnum.IVF} | 10 ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.DegenArrested,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: `1 ${SourceGroupTypeEnum.IVF} | 6 ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.ZeroPN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: `2 ${SourceGroupTypeEnum.IVF} | 7 ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.OnePN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: `3 ${SourceGroupTypeEnum.IVF} | 8 ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.TwoPN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: `4 ${SourceGroupTypeEnum.IVF} | 9 ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.ThreePN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: 'new note',
          propertyName: IVFTaskEntityTitle.AdditionalNote,
        },
      ],
    }),
  ]),
}
export const callPatientHistoryPayload = {
  request: {
    id: ivfTaskSummaryForCallPatientFixture.uuid,
    details: {
      date: '2024-07-15',
    },
    dashboardFilterDate: null,
  },
  updates: [
    {
      authUserFullName: 'User With Permissions',
      authUserId: 'id-emailVerified-fixture',
      changes: [
        {
          from: '-',
          propertyName: 'Call The Patient',
          to: '2024-07-15',
        },
      ],
      createdAt: expect.any(Object),
      date: expect.any(Object),
      entityTitle: null,
      id: expect.any(String),
      sourceTaskEmbryoId: null,
      sourceTaskSummaryId: ivfTaskSummaryForCallPatientFixture.id,
      updatedAt: expect.any(Object),
      updatedBy: 'id-emailVerified-fixture',
    },
  ],
}
export const fertilizationCheckHistoryChangeToDashesPayload: IVFHistoryTestPayload = {
  request: {
    id: ivfTaskSummaryHistoryFertilizationCheckFixture.uuid,
    details: {
      sourceGroups: [
        {
          typeId: SourceGroupTypeEnum.IVF,
          '0pn': 10,
          '1pn': 11,
          '2pn': 12,
          '3pn': 13,
          degenOrArrested: 5,
        },
        {
          typeId: SourceGroupTypeEnum.PICSI,
          '0pn': null,
          '1pn': null,
          '2pn': null,
          '3pn': null,
          degenOrArrested: 0,
        },
      ],
    },
    dashboardFilterDate: null,
    note: null,
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          from: `5 ${SourceGroupTypeEnum.IVF} | 10 ${SourceGroupTypeEnum.PICSI}`,
          to: `5 ${SourceGroupTypeEnum.IVF} | 0 ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.DegenArrested,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: `1 ${SourceGroupTypeEnum.IVF} | 6 ${SourceGroupTypeEnum.PICSI}`,
          to: `10 ${SourceGroupTypeEnum.IVF} | ${DefaultValue.Dash} ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.ZeroPN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: `2 ${SourceGroupTypeEnum.IVF} | 7 ${SourceGroupTypeEnum.PICSI}`,
          to: `11 ${SourceGroupTypeEnum.IVF} | ${DefaultValue.Dash} ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.OnePN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: `3 ${SourceGroupTypeEnum.IVF} | 8 ${SourceGroupTypeEnum.PICSI}`,
          to: `12 ${SourceGroupTypeEnum.IVF} | ${DefaultValue.Dash} ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.TwoPN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: `4 ${SourceGroupTypeEnum.IVF} | 9 ${SourceGroupTypeEnum.PICSI}`,
          to: `13 ${SourceGroupTypeEnum.IVF} | ${DefaultValue.Dash} ${SourceGroupTypeEnum.PICSI}`,
          propertyName: IVFTaskEntityTitle.ThreePN,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: 'new note',
          to: DefaultValue.Dash,
          propertyName: IVFTaskEntityTitle.AdditionalNote,
        },
      ],
    }),
  ]),
}

export const ivfSetupWorksheetNote = 'setupWorksheetNote 2143asddfs'
export const setupWorksheetHistoryPayload = {
  request: {
    id: ivfTaskSummarySetupWorksheetFixture.uuid,
    details: null,
    dashboardFilterDate: null,
    note: ivfSetupWorksheetNote,
  },
  updates: [
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: ivfSetupWorksheetNote,
          propertyName: IVFTaskEntityTitle.AdditionalNote,
        },
      ],
    }),
  ],
}

export const ivfVerifyHepBcHivNote = 'VerifyHepBcHiv note asd'
export const ivfVerifyHepBcHivHistoryPayload = {
  request: {
    id: ivfTaskSummaryVerifyHepBcHivFixture.uuid,
    details: null,
    dashboardFilterDate: null,
    note: ivfVerifyHepBcHivNote,
  },
  updates: [
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: ivfVerifyHepBcHivNote,
          propertyName: IVFTaskEntityTitle.AdditionalNote,
        },
      ],
    }),
  ],
}

export const journeyWitnessHistoryTestValue = 'witness-history-21312'
export const journeyWitnessHistoryPayload = {
  request: {
    id: ivfTaskSummaryForJourneyWitnessFixture.uuid,
    details: {
      witness: journeyWitnessHistoryTestValue,
    },
    dashboardFilterDate: null,
    note: IVFTaskToPatientNoteMapper[IVFTaskType.JourneyWitness],
  },
  updates: expect.arrayContaining([
    expect.objectContaining({
      changes: [
        {
          from: ivfTaskDetailsFixture.journeyWitness,
          to: journeyWitnessHistoryTestValue,
          propertyName: IVFTaskEntityTitle.Witness,
        },
      ],
    }),
    expect.objectContaining({
      changes: [
        {
          from: DefaultValue.Dash,
          to: IVFTaskToPatientNoteMapper[IVFTaskType.JourneyWitness],
          propertyName: IVFTaskEntityTitle.AdditionalNote,
        },
      ],
    }),
  ]),
}
