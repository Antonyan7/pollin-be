import {
  ivfPatientFemaleFixture,
  ivfTaskSummaryFixture,
  ivfTaskSummaryForFertilisationCheckFixture,
  ivfTaskSummaryForIcsiInjectionFixture,
  ivfTaskSummaryForInseminationIVFFixture,
  ivfTaskSummaryForMatureOocytesPhoto2Fixture,
  ivfTaskSummaryForMatureOocytesPhotoFixture,
  ivfTaskSummaryForMiiDay1CryoFixture,
  ivfTaskSummaryForMiiDay1CryoSpawnedFixture,
  ivfTaskSummaryForOocytesCollectionFixture,
  ivfTaskSummaryForPICSIFixture,
  ivfTaskSummaryForPostStrippingFixture,
  ivfTaskSummaryForSpermWashFixture,
  ivfTaskSummaryForVerifyHepBcHivFixture,
  patientNotOhipFixture,
  ivfTaskSummaryForCallPatientFixture,
  ivfTaskSummaryForJourneyWitnessFixture,
  patientPlanCohortFixture,
  patientPlanCohortDay3FreshTransferFixture,
  planTypeFixture,
  staffPhysicianFixture,
} from '@libs/common/test/fixtures'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  getOocyteQualityOptions,
  getOocyteQualityRatingOptions,
} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {SpermSourceLabel} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {planAddonIVFFreshDefaultFixture} from '@libs/common/test/fixtures/plan-addon.fixture'
import {patientPlanV2ForGetGroupTaskFixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {mockedSignedUrlPrefix} from '@libs/common/adapters/firebase/__mocks__/firebase-storage-adapter'
import {
  FertilizationCheckRequest,
  SourceGroupTypeEnum,
  TaskIVF,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {ivfTaskSummaryForPrintLabelFixture} from '@libs/common/test/fixtures'
import {patientPlanForDay3Fixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {
  staffEmbryologistFixture,
  staffJourneyFixture,
} from '@libs/common/test/fixtures/staff.fixture'
import {cryoCanV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {cryoCaneV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {cryoTankV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-tank-v2.fixture'
import {
  ivfUnitOptionFixture,
  ivfUnitOptionHighfieldFixture,
} from '@libs/common/test/fixtures/ivf-unit-option.fixture'
import {IVFTaskToPatientNoteMapper} from './ivt-task-to-note.payload'
import {patientNoteVerifyHepBcHivFixture} from '@libs/common/test/fixtures/patient-note.fixture'
import {journeyWitnessHistoryTestValue} from './ivf-task-history.payload'
import {calculateDay0Date} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {ivfTaskGroupForFreshTransferFixture} from '@libs/common/test/fixtures/patient-plan-cohort-ivf-task-group.fixture'
import {
  patientProfileAlertTaskDetailsFixture,
  patientProfileAlertDailyViewSpawnFixture,
} from '@libs/common/test/fixtures/patient-profile-alert.fixture'
export const submitPayloadFertilizationCheck = {
  id: ivfTaskSummaryForFertilisationCheckFixture.uuid,
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
        typeId: SourceGroupTypeEnum.ICSI,
        '0pn': 6,
        '1pn': 7,
        '2pn': 8,
        '3pn': 9,
        degenOrArrested: 10,
      },
    ],
  },
  dashboardFilterDate: null,
  note: IVFTaskToPatientNoteMapper[IVFTaskType.FertilizationCheck],
}

export const submitTaskDetailsPayload = {
  id: ivfTaskSummaryFixture.uuid,
  details: {
    isAnomaly: true,
    oocyteQualityRatingId: 'Good',
    oocyteComment: 'oocyteComment',
    oocyteAssessments: {
      coc: {
        isEnabled: false,
        qualityRating: null,
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
        qualityRating: null,
      },
      pvs: {
        isEnabled: true,
        qualityRating: 1,
      },
      pvd: {
        isEnabled: true,
        qualityRating: 1,
      },
      vacuoles: {
        isEnabled: true,
        qualityRating: 1,
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
        qualityRating: 2,
      },
    },
  },
  dashboardFilterDate: null,
  note: IVFTaskToPatientNoteMapper[IVFTaskType.InjectionAssessment],
}
export const submitTaskDetailsPayloadWithoutQualityRating = {
  id: ivfTaskSummaryFixture.uuid,
  details: {
    isAnomaly: false,
    oocyteQualityRatingId: 'Good',
    oocyteComment: 'oocyteComment',
    oocyteAssessments: {
      coc: {
        isEnabled: false,
        qualityRating: null,
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
        qualityRating: null,
      },
      pvs: {
        isEnabled: true,
        qualityRating: 1,
      },
      pvd: {
        isEnabled: true,
        qualityRating: 1,
      },
      vacuoles: {
        isEnabled: true,
        qualityRating: 1,
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
        qualityRating: 2,
      },
    },
  },
  dashboardFilterDate: null,
  note: IVFTaskToPatientNoteMapper[IVFTaskType.InjectionAssessment],
}
export const InjectionAssessmentDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryFixture.uuid,
  uiid: IVFTaskType.InjectionAssessment,
  lastUpdateDetails: expect.any(String),
  details: {
    isAnomaly: true,
    oocyteQualityRatingOptions: getOocyteQualityRatingOptions(),
    oocyteQualityOptions: getOocyteQualityOptions(),
    oocyteQualityRatingId: submitTaskDetailsPayload.details.oocyteQualityRatingId,
    oocyteAssessments: submitTaskDetailsPayload.details.oocyteAssessments,
    oocyteComment: submitTaskDetailsPayload.details.oocyteComment,
  },
  note: null,
})
export const InseminationIVFDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForInseminationIVFFixture.uuid,
  uiid: IVFTaskType.InseminationIVF,
  lastUpdateDetails: expect.any(String),
  details: {percentage: null, split: 100, oocytesInseminated: 3},
  note: IVFTaskToPatientNoteMapper[IVFTaskType.InseminationIVF],
})
export const PICSIDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForPICSIFixture.uuid,
  uiid: IVFTaskType.PICSI,
  lastUpdateDetails: expect.any(String),
  details: {
    matureOocytesInjected: 1,
    immatureOocytes: 3,
    spermPrep: {
      sources: [
        {
          contributorId: patientNotOhipFixture.uuid,
          dateOfArrival: null,
          donorId: null,
          source: SpermSourceLabel.PartnerFresh,
          spermType: 'ivfTaskGroup',
        },
      ],
    },
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.PICSI],
})
export const IcsiInjectionDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForIcsiInjectionFixture.uuid,
  uiid: IVFTaskType.IcsiInjection,
  lastUpdateDetails: expect.any(String),
  details: {
    isSplitEnabled: true,
    split: 1,
    matureOocytesInjected: 1,
    percentage: 100,
    spermPrep: {
      sources: [
        {
          source: SpermSourceLabel.PartnerFresh,
          donorId: null,
          dateOfArrival: null,
          contributorId: patientNotOhipFixture.uuid,
          spermType: planAddonIVFFreshDefaultFixture.title,
        },
      ],
    },
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.IcsiInjection],
})

export const MiiDay1CryoDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForMiiDay1CryoFixture.uuid,
  uiid: IVFTaskType.MiiDay1Cryo,
  lastUpdateDetails: expect.any(String),
  details: {
    immatureFromDay0: 8,
    matureOocytesToCryo: 1,
    oocytesDiscarded: 0,
    lastStrawNumber: 1,
    straws: [
      {
        id: expect.any(String),
        title: expect.stringMatching(/^Straw \d*/),
        identifier: expect.any(String),
        numberOfEggs: 3,
        details: {
          canId: cryoCanV2Fixture.uuid,
          freezeDate: '2028-05-04',
          caneId: cryoCaneV2Fixture.uuid,
          freezeWitness: 'Test miiDay1Cryo',
          comments: 'test mii day 1 cryo',
          tankId: cryoTankV2Fixture.uuid,
          status: 'Frozen',
        },
      },
    ],
  },
  note: null,
})

export const MiiDay1SpawnedCryoDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForMiiDay1CryoSpawnedFixture.uuid,
  uiid: IVFTaskType.MiiDay1Cryo,
  lastUpdateDetails: null,
  details: {
    immatureFromDay0: 2,
    lastStrawNumber: null,
    matureOocytesToCryo: null,
    oocytesDiscarded: null,
    straws: [],
  },
  note: null,
})
export const CallThePatientDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForCallPatientFixture.uuid,
  uiid: IVFTaskType.CallThePatient,
  lastUpdateDetails: null,
  details: {date: null},
  note: null,
})
export const VerifyHepBcHivDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForVerifyHepBcHivFixture.uuid,
  uiid: IVFTaskType.VerifyHepBcHiv,
  lastUpdateDetails: null,
  details: {
    patientId: ivfPatientFemaleFixture.uuid,
    patientPlanId: patientPlanV2ForGetGroupTaskFixture.uuid,
  },
  note: patientNoteVerifyHepBcHivFixture.content,
})
export const OocyteCollectionDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForOocytesCollectionFixture.uuid,
  uiid: IVFTaskType.OocyteCollection,
  details: {
    oocytesCollected: 24,
    oocytesWarmed: 2,
    oocytesSurvived: 13,
    embryologistId: staffEmbryologistFixture.uuid,
    physicianId: staffPhysicianFixture.uuid,
    isEditable: true,
    eggOptions: expect.any(Array),
  },
  lastUpdateDetails: expect.stringMatching(
    new RegExp(
      `Last updated by ${staffJourneyFixture.firstName} ${staffJourneyFixture.lastName[0]}. on ... .*, .*`,
    ),
  ),
  note: IVFTaskToPatientNoteMapper[IVFTaskType.OocyteCollection],
})

export const OocyteCollectionDetailsAfterToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForOocytesCollectionFixture.uuid,
  uiid: IVFTaskType.OocyteCollection,
  details: {
    oocytesCollected: 24,
    oocytesWarmed: 2,
    oocytesSurvived: 13,
    embryologistId: staffEmbryologistFixture.uuid,
    physicianId: staffPhysicianFixture.uuid,
    eggOptions: expect.any(Array),
    isEditable: true,
  },
  lastUpdateDetails: expect.stringMatching(
    new RegExp(
      `Last updated by ${staffJourneyFixture.firstName} ${staffJourneyFixture.lastName[0]}. on ... .*, .*`,
    ),
  ),
})

export const PostStrippingDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForPostStrippingFixture.uuid,
  uiid: IVFTaskType.PostStripping,
  lastUpdateDetails: expect.any(String),
  details: {
    day0Date: calculateDay0Date(patientPlanCohortFixture.cohortDate),
    matureOocytes: 7,
    immatureOocytes: 8,
    degenOocytes: 2,
    abnormalOocytes: 7,
    isCohortSpawned: false,
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.PostStripping],
})

export const PrintLabelDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForPrintLabelFixture.uuid,
  uiid: IVFTaskType.PrintLabel,
  lastUpdateDetails: null,
  details: {
    name: expect.any(String),
    identifier: expect.any(String),
    dateOfBirth: 'Jan 02, 1994',
  },
})

export const SpermWashDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForSpermWashFixture.uuid,
  uiid: IVFTaskType.SpermWash,
  lastUpdateDetails: expect.any(String),
  details: {
    unitOptions: [
      {id: ivfUnitOptionFixture.uuid, title: ivfUnitOptionFixture.title},
      {id: ivfUnitOptionHighfieldFixture.uuid, title: ivfUnitOptionHighfieldFixture.title},
    ],
    initialMotility: 11,
    finalMotility: 12,
    initialConcentration: {
      value: 11.123,
      unitId: ivfUnitOptionFixture.uuid,
    },
    finalConcentration: {
      value: 12.123,
      unitId: ivfUnitOptionHighfieldFixture.uuid,
    },
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.SpermWash],
})
export const MatureOocyteGroupPhotoDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForMatureOocytesPhotoFixture.uuid,
  uiid: IVFTaskType.MatureOocyteGroupPhoto,
  lastUpdateDetails: expect.any(String),
  details: {
    matureOocyteGroupPhotos: [
      {
        id: expect.any(String),
        title: 'photo1.jpg',
        url: mockedSignedUrlPrefix + 'url/photo1.jpg',
      },
      {
        id: expect.any(String),
        title: 'photo2.jpg',
        url: mockedSignedUrlPrefix + 'url/photo2.jpg',
      },
    ],
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.MatureOocyteGroupPhoto],
})

export const MatureOocyteGroupPhotoDetailsDay2ToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForMatureOocytesPhoto2Fixture.uuid,
  uiid: IVFTaskType.MatureOocyteGroupPhoto,
  lastUpdateDetails: expect.any(String),
  details: {
    matureOocyteGroupPhotos: [
      {
        id: expect.any(String),
        title: 'photoForDay2.jpg',
        url: mockedSignedUrlPrefix + 'url/photoForDay2.jpg',
      },
    ],
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.MatureOocyteGroupPhoto],
})

export const taskDetailsMiiDay1CryoToCheck = expect.objectContaining({
  id: ivfTaskSummaryForMiiDay1CryoFixture.uuid,
  uiid: IVFTaskType.MiiDay1Cryo,
  lastUpdateDetails: expect.any(String),
  details: {
    immatureFromDay0: null,
    matureOocytesToCryo: 1,
    oocytesDiscarded: 0,
    lastStrawNumber: 1,
    straws: [
      {
        id: expect.any(String),
        title: expect.stringMatching(/^Straw \d*/),
        identifier: expect.any(String),
        numberOfEggs: 3,
        details: {
          canId: cryoCanV2Fixture.uuid,
          caneId: cryoCaneV2Fixture.uuid,
          freezeDate: '2028-05-04',
          freezeWitness: 'Test miiDay1Cryo',
          comments: 'test mii day 1 cryo',
          tankId: cryoTankV2Fixture.uuid,
          status: 'Frozen',
        },
      },
    ],
  },
})

export const taskDetailFertilizationCheckToCheck: FertilizationCheckRequest =
  expect.objectContaining({
    id: ivfTaskSummaryForFertilisationCheckFixture.uuid,
    uiid: IVFTaskType.FertilizationCheck,
    lastUpdateDetails: expect.any(String),
    details: {
      numberOfOocytes: 7,
      sourceGroups: [
        {
          typeId: SourceGroupTypeEnum.IVF,
          percentage: 100,
          degenOrArrested: 5,
          '0pn': 1,
          '1pn': 2,
          '2pn': 3,
          '3pn': 4,
        },
        {
          typeId: SourceGroupTypeEnum.ICSI,
          percentage: 0,
          degenOrArrested: 10,
          '0pn': 6,
          '1pn': 7,
          '2pn': 8,
          '3pn': 9,
        },
      ],
    },
    note: IVFTaskToPatientNoteMapper[IVFTaskType.FertilizationCheck],
  })

export const InjectionAssessmentDetailsResponseCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryFixture.uuid,
  uiid: IVFTaskType.InjectionAssessment,
  lastUpdateDetails: expect.any(String),
  details: {
    isAnomaly: true,
    oocyteQualityRatingOptions: getOocyteQualityRatingOptions(),
    oocyteQualityOptions: getOocyteQualityOptions(),
    oocyteQualityRatingId: submitTaskDetailsPayload.details.oocyteQualityRatingId,
    oocyteAssessments: submitTaskDetailsPayload.details.oocyteAssessments,
    oocyteComment: submitTaskDetailsPayload.details.oocyteComment,
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.InjectionAssessment],
})

export const InjectionAssessmentDetailsResponseCheckWithoutQualityRating: TaskIVF =
  expect.objectContaining({
    id: ivfTaskSummaryFixture.uuid,
    uiid: IVFTaskType.InjectionAssessment,
    lastUpdateDetails: expect.any(String),
    details: {
      isAnomaly: false,
      oocyteQualityRatingOptions: [
        {id: '1', title: '+ (Best)'},
        {id: '2', title: '++'},
        {id: '3', title: '+++ (Worst)'},
      ],
      oocyteQualityOptions: getOocyteQualityOptions(),
      oocyteQualityRatingId: null,
      oocyteAssessments: submitTaskDetailsPayloadWithoutQualityRating.details.oocyteAssessments,
      oocyteComment: submitTaskDetailsPayloadWithoutQualityRating.details.oocyteComment,
    },
    note: IVFTaskToPatientNoteMapper[IVFTaskType.InjectionAssessment],
  })
export const journeyWitnessToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForJourneyWitnessFixture.uuid,
  uiid: IVFTaskType.JourneyWitness,
  details: {
    witness: journeyWitnessHistoryTestValue,
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.JourneyWitness],
})

export const dashboardDayUpdatePayload = {
  id: ivfTaskGroupForFreshTransferFixture.day,
  title: 'Day 3',
  patients: [
    {
      id: patientPlanCohortDay3FreshTransferFixture.uuid,
      patientId: ivfPatientFemaleFixture.uuid,
      identifier: ivfPatientFemaleFixture.patientIdentifier,
      fullName: 'ivfPatientFemale ivfPatientFemale',
      planTypeTitle: planTypeFixture.title,
      patientPlanId: patientPlanForDay3Fixture.uuid,
      isSpawnedCohort: !!patientPlanCohortDay3FreshTransferFixture.spawnedFromPatientPlanCohortId,
      patientIvfStatus: patientPlanForDay3Fixture.ivfLabStatus,
      ivfTaskGroups: [
        {
          id: ivfTaskGroupForFreshTransferFixture.uuid,
          type: 'Current',
          signOffInitials: null,
        },
      ],
      alerts: [
        {
          id: patientProfileAlertDailyViewSpawnFixture.uuid,
          typeId: 'AbnormalPartnerResult',
          typeTitle: 'Abnormal Test',
          message: expect.any(String),
        },
        {
          id: patientProfileAlertTaskDetailsFixture.uuid,
          typeId: 'AbnormalPartnerResult',
          typeTitle: 'Abnormal Test',
          message: expect.any(String),
        },
      ],
    },
  ],
}
