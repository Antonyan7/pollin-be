import {
  ivfTaskSummaryFixture,
  ivfTaskSummaryForDay5Fixture,
  staffEmbryologistFixture,
  staffPhysicianFixture,
} from '@libs/common/test/fixtures'
import {ivfEmbryoGrade3BBFixture} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'
import {IvfEmbryoActions} from '@libs/services-common/enums'
import {cryoCanV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'

// Invalid Payload
export const submitTaskDetailsInvalidPayload = {
  id: ivfTaskSummaryFixture.uuid,
  details: {
    oocyteQualityRatingId: 'Good',
    oocyteComment: 'oocyteComment',
    oocyteAssessments: {
      coc: {
        isEnabled: false,
        qualityRating: 1,
      },
      ser: {
        isEnabled: false,
        qualityRating: null,
      },
      granular: {
        isEnabled: false,
        qualityRating: null,
      },
      fragPBs: {
        isEnabled: true,
        qualityRating: 2,
      },
      pvs: {
        isEnabled: true,
        qualityRating: 0,
      },
      pvd: {
        isEnabled: true,
        qualityRating: 0,
      },
      vacuoles: {
        isEnabled: true,
        qualityRating: 0,
      },
      misshaped: {
        isEnabled: true,
        qualityRating: 0,
      },
      abnormalZone: {
        isEnabled: true,
        qualityRating: 2,
      },
      abnMembraneBreak: {
        isEnabled: true,
        qualityRating: 2,
      },
    },
  },
}

export const submitInvalidPayloadDay5 = {
  id: ivfTaskSummaryForDay5Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: null,
        title: 'test title',
        identifier: 'asd',
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          assistedHatching: true,
          freezeDate: '2029-02-24',
          caneId: 'INVALIDCANEID',
          freezeWitness: 'Test',
          comments: 'test',
        },
        biopsy: null,
      },
    ],
  },
}

export const submitInvalidMissingFieldsPayloadDay5 = {
  id: ivfTaskSummaryForDay5Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: null,
        title: 'test title',
        identifier: 'asd',
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          comments: 'test',
        },
        biopsy: null,
      },
    ],
  },
}

export const submitInvalidMissingFieldsFreshETPayloadDay5 = {
  id: ivfTaskSummaryForDay5Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: null,
        title: 'test title',
        identifier: 'asd',
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.FreshTransfer,
        details: {
          physicianId: staffPhysicianFixture.uuid,
          comments: 'test',
        },
        biopsy: null,
      },
    ],
  },
}

export const submitInvalidCaneIdPayloadDay5 = {
  id: ivfTaskSummaryForDay5Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: null,
        title: 'test title',
        identifier: 'asd',
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          caneId: cryoCanV2Fixture.uuid,
          canId: cryoCanV2Fixture.uuid,
          comments: 'test',
          freezeDate: '2029-02-24',
          freezeWitness: 'Test',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
    ],
  },
  dashboardFilterDate: null,
}
