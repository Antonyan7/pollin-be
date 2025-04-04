import {
  activeMediaLotForCreateCryoCardFixture,
  ivfPatientFemaleFixture,
  ivfPatientMalePartnerFixture,
  ivfTaskEmbryoDay2Fixture,
  ivfTaskSummaryForChackFreezingEmbryosFixture,
  ivfTaskSummaryForDay5Fixture,
  ivfTaskSummaryForMiiDay1CryoStrawNumberFixture,
  patientForIVFTasks2Fixture,
  patientNotOhipFixture,
  staffEmbryologistFixture,
  staffEmbryologistHistoryFixture,
  staffPhysicianFixture,
} from '@libs/common/test/fixtures'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {ContributionTitlesMapper} from '@libs/services-common/enums'
import {patientDetailForIVFFixture} from '@libs/common/test/fixtures/patient-detail.fixture'
import {patientPlanV2ForGetGroupTaskFixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  ivfEmbryoGrade3BAFixture,
  ivfEmbryoGrade3BBFixture,
} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'
import {submitPayloadDay5} from './ivf-task-group-embryo.payload'
import {cryoCardGetListFixture} from '@libs/common/test/fixtures/cryo/cryo-inventory-card.fixture'
import {patientPlanEmbryoToTransferFixture} from '@libs/common/test/fixtures/ivf-task-expended-embryo.fixture'
import {
  ivfTaskGroupForGetPatientPartnersFixture,
  ivfTaskGroupForDay6Fixture,
  ivfTaskGroupForGetCallPatientFixture,
  ivfTaskGroupForGetPatientEmbryoFixture,
  ivfTaskGroupForGetPatientPartnersDay2Fixture,
  patientPlanCohortIVFTaskGroupForDisablingFixture,
} from '@libs/common/test/fixtures'
import {patientPlanCohortFixture} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {ivfDispositionOneForFETFixture} from '@libs/common/test/fixtures'
import {cryoTankV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-tank-v2.fixture'
import {cryoCanV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {cryoCaneV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

const yearLastTwo = dateTimeUtil.getYearLastTwoDigits()

export const freezeEmbryosPayloadDay2 = {
  title: 'IVF Lab Form - Day 2',
  details: {
    patient: {
      id: ivfPatientFemaleFixture.uuid,
      identifier: ivfPatientFemaleFixture.patientIdentifier,
      title: getFullName(ivfPatientFemaleFixture.firstName, ivfPatientFemaleFixture.lastName),
      contributionTitle: ContributionTitlesMapper[patientDetailForIVFFixture.contribution],
    },
    partners: [
      {
        id: ivfPatientMalePartnerFixture.uuid,
        identifier: ivfPatientMalePartnerFixture.patientIdentifier,
        title: getFullName(
          ivfPatientMalePartnerFixture.firstName,
          ivfPatientMalePartnerFixture.lastName,
        ),
        contributionTitle: null,
      },
    ],
    spermSources: [
      {
        source: 'Fresh Partner',
        donorId: null,
        dateOfArrival: null,
        contributorId: patientNotOhipFixture.uuid,
        spermType: 'ivfTaskGroup',
      },
    ],
    patientPlan: {
      id: patientPlanV2ForGetGroupTaskFixture.uuid,
      title: 'planTypeFixtureV2',
      hasStimSheet: false,
    },
    date: expect.any(String),
  },
  ivfTasks: [
    {
      id: ivfTaskSummaryForChackFreezingEmbryosFixture.uuid,
      uiid: ivfTaskEmbryoDay2Fixture.task,
      lastUpdateDetails: null,
      details: {
        uterusContributor: {
          patientId: patientForIVFTasks2Fixture.uuid,
          patientName: getFullName(
            patientForIVFTasks2Fixture.firstName,
            patientForIVFTasks2Fixture.lastName,
          ),
        },

        embryoOptions: [
          expect.objectContaining({
            id: patientPlanEmbryoToTransferFixture.uuid,
            patientPlan: null,
          }),
          {
            id: expect.any(String),
            title: expect.stringContaining('3BA'),
            biopsy: null,
            comments: null,
            patientPlan: {
              id: '45c48f79-c83a-4ea6-9bd0-5fadbab4c1b5',
              title: 'planTypeFixtureV2',
            },
          },
          {
            id: expect.any(String),
            title: expect.stringContaining('3BA'),
            biopsy: null,
            comments: null,
            patientPlan: {
              id: '45c48f79-c83a-4ea6-9bd0-5fadbab4c1b5',
              title: 'planTypeFixtureV2',
            },
            cryoCard: null,
            isChecked: true,
            dispositionId: ivfDispositionOneForFETFixture.uuid,
          },
          {
            id: expect.any(String),
            title: expect.stringContaining('3BA'),
            biopsy: null,
            comments: null,
            patientPlan: {
              id: '45c48f79-c83a-4ea6-9bd0-5fadbab4c1b5',
              title: 'planTypeFixtureV2',
            },
          },
          {
            id: expect.any(String),
            title: expect.stringContaining('3BB • FZ: Feb 24, 2029'),
            biopsy: null,
            comments: 'test2',
            patientPlan: {
              id: '90de5279-f42d-4ffb-ac52-f533c0417497',
              title: 'planTypeFixtureV2',
            },
          },
          {
            id: expect.any(String),
            title: expect.stringContaining('3BB • FZ: Feb 24, 2029 • Untested'),
            biopsy: null,
            comments: 'test2',
            patientPlan: {
              id: '90de5279-f42d-4ffb-ac52-f533c0417497',
              title: 'planTypeFixtureV2',
            },
          },
          {
            id: expect.any(String),
            title: expect.stringContaining('3BB • FZ: Feb 24, 2029'),
            biopsy: null,
            comments: 'test2',
            patientPlan: {
              id: '90de5279-f42d-4ffb-ac52-f533c0417497',
              title: 'planTypeFixtureV2',
            },
          },
          {
            id: expect.any(String),
            title: expect.stringContaining('3BB • FZ: Feb 24, 2029'),
            biopsy: null,
            comments: 'test2',
            patientPlan: {
              id: '90de5279-f42d-4ffb-ac52-f533c0417497',
              title: 'planTypeFixtureV2',
            },
          },
        ],
        embryosToTransfer: [],
        numberOfEmbryosThawed: null,
        oocyteSource: 'Frozen Donor',
        donorId: '222',
      },
    },
  ],
}

export const taskDetailsDay5CheckToCheck = expect.objectContaining({
  id: ivfTaskSummaryForDay5Fixture.uuid,
  uiid: IVFTaskType.Day5Check,
  lastUpdateDetails: expect.any(String),
  disabledIvfTaskGroupIds: [
    '51f898f4-0a26-4cc4-9438-581a7d19de84',
    '0085f96e-6955-4e0c-b1c1-9fb01a1d7a7c',
  ],
  details: {
    numberOfEmbryos: 9,
    lastEmbryoNumber: 7,
    embryoGradeOptions: [
      {id: ivfEmbryoGrade3BBFixture.uuid, title: ivfEmbryoGrade3BBFixture.title},
      {id: ivfEmbryoGrade3BAFixture.uuid, title: ivfEmbryoGrade3BAFixture.title},
    ],
    remainingEmbryos: 0,
    embryosArrested: submitPayloadDay5.details.embryosArrested,
    embryosExpanded: [
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b3ee7a5',
        title: 'Embryo 1',
        identifier: 'strawIdentifier4',
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: cryoCardGetListFixture.uuid,
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b388de7',
        title: 'Embryo 2',
        identifier: 'strawIdentifier5',
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: expect.any(String),
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b3847ed',
        title: 'Embryo 3',
        identifier: 'O24-1213-8',
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: expect.any(String),
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b388595',
        title: 'Embryo 4',
        identifier: 'strawIdentifier10',
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: expect.any(String),
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: expect.any(String),
        title: 'Embryo 5',
        identifier: 'FreshET',
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: null,
        actionType: 'FreshTransfer',
        details: {assistedHatching: true, physicianId: staffPhysicianFixture.uuid},
        biopsy: null,
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: expect.any(String),
        title: 'Embryo 6',
        identifier: `E${yearLastTwo}-204-6`,
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: expect.any(String),
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: '3c95e94c-0e03-456f-a7f0-05b229c82af8',
          canId: '500d648b-7df0-425d-a0d3-b0f62f3c2bbc',
          caneId: '92b56003-e3ad-400a-8360-ffad2f241a80',
          freezeWitness: 'Test',
          comments: 'test',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
        biopsy: {
          id: `B1-E${yearLastTwo}-204-6`,
          attachments: [
            {
              id: expect.any(String),
              title: 'title 1',
              url: 'url/test_url',
            },
            {
              id: expect.any(String),
              title: 'title 1',
              url: 'url/test_url',
            },
          ],
        },
      },
      {
        id: expect.any(String),
        title: 'Embryo 7',
        identifier: `E${yearLastTwo}-204-7`,
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: expect.any(String),
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: '3c95e94c-0e03-456f-a7f0-05b229c82af8',
          canId: '500d648b-7df0-425d-a0d3-b0f62f3c2bbc',
          caneId: null,
          freezeWitness: 'Test',
          comments: 'test',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
        biopsy: {
          id: `B1-E${yearLastTwo}-204-7`,
          attachments: [
            {
              id: expect.any(String),
              title: 'title 1',
              url: 'url/test_url',
            },
            {
              id: expect.any(String),
              title: 'title 1',
              url: 'url/test_url',
            },
          ],
        },
      },
    ],
  },
  dashboardDayUpdate: {
    id: null,
    title: null,
    patients: [
      {
        id: patientPlanCohortFixture.uuid,
        patientId: ivfPatientFemaleFixture.uuid,
        identifier: 'PID0000204',
        fullName: 'ivfPatientFemale ivfPatientFemale',
        planTypeTitle: 'planTypeFixtureV2',
        patientPlanId: '90de5279-f42d-4ffb-ac52-f533c0417497',
        patientIvfStatus: 'Active',
        isSpawnedCohort: false,
        alerts: [
          {
            id: expect.any(String),
            message: expect.any(String),
            typeId: 'AbnormalPartnerResult',
            typeTitle: 'Abnormal Test',
          },
          {
            id: expect.any(String),
            message: expect.any(String),
            typeId: 'AbnormalPartnerResult',
            typeTitle: 'Abnormal Test',
          },
        ],
        ivfTaskGroups: [
          {
            id: ivfTaskGroupForGetCallPatientFixture.uuid,
            isDayDisabled: false,
            signOffInitials: null,
            type: 'Future',
            scanState: 'NotApplicable',
          },
          {
            id: ivfTaskGroupForGetPatientEmbryoFixture.uuid,
            isDayDisabled: false,
            signOffInitials: null,
            type: 'Future',
            scanState: 'NotApplicable',
          },
          {
            id: ivfTaskGroupForGetPatientPartnersDay2Fixture.uuid,
            isDayDisabled: false,
            signOffInitials: null,
            type: 'Future',
            scanState: 'NotApplicable',
          },
          {
            id: ivfTaskGroupForGetPatientPartnersFixture.uuid,
            isDayDisabled: false,
            signOffInitials: null,
            type: 'Future',
            scanState: 'NotApplicable',
          },
          {
            id: patientPlanCohortIVFTaskGroupForDisablingFixture.uuid,
            isDayDisabled: false,
            signOffInitials: null,
            type: 'NoTask',
            scanState: 'NotApplicable',
          },
          {
            id: ivfTaskGroupForDay6Fixture.uuid,
            isDayDisabled: false,
            signOffInitials: null,
            type: 'NoTask',
            scanState: 'NotApplicable',
          },
        ],
      },
    ],
  },
  note: 'Day5Check321',
})

export const taskDetailsDay5WithoutBiopsyCheckToCheck = expect.objectContaining({
  id: ivfTaskSummaryForDay5Fixture.uuid,
  uiid: IVFTaskType.Day5Check,
  disabledIvfTaskGroupIds: [],
  lastUpdateDetails: expect.any(String),
  note: 'Day5Check321',
  details: {
    numberOfEmbryos: 9,
    remainingEmbryos: 3,
    embryoGradeOptions: [
      {id: ivfEmbryoGrade3BBFixture.uuid, title: ivfEmbryoGrade3BBFixture.title},
      {id: ivfEmbryoGrade3BAFixture.uuid, title: ivfEmbryoGrade3BAFixture.title},
    ],
    embryosArrested: submitPayloadDay5.details.embryosArrested,
    embryosExpanded: [
      {
        id: expect.any(String),
        title: 'Embryo 1',
        identifier: 'strawIdentifier4',
        cryoCardId: expect.any(String),
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistFixture.uuid,
      },
      {
        id: expect.any(String),
        title: 'Embryo 2',
        identifier: 'strawIdentifier5',
        cryoCardId: expect.any(String),
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistFixture.uuid,
      },
      {
        id: expect.any(String),
        title: 'Embryo 3',
        identifier: 'O24-1213-8',
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: expect.any(String),
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistFixture.uuid,
      },
      {
        id: expect.any(String),
        title: 'Embryo 4',
        identifier: 'strawIdentifier10',
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        cryoCardId: expect.any(String),
        actionType: 'Freeze',
        details: {
          freezeDate: '2029-02-24',
          tankId: null,
          canId: null,
          caneId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        biopsy: null,
        embryologistId: staffEmbryologistFixture.uuid,
      },
    ],
    lastEmbryoNumber: 4,
  },
})

export const eggThawDetailsToCheck = expect.objectContaining({
  numberOfEggsThawed: 2,
  eggsWarmed: 6,
  eggsSurvived: 4,
  mediaLotId: activeMediaLotForCreateCryoCardFixture.uuid,
  eggOptions: expect.any(Array),
})

export const taskDetailsMiiDay1StrawNumberCheck = expect.objectContaining({
  id: ivfTaskSummaryForMiiDay1CryoStrawNumberFixture.uuid,
  uiid: IVFTaskType.MiiDay1Cryo,
  lastUpdateDetails: expect.any(String),
  details: {
    immatureFromDay0: null,
    matureOocytesToCryo: 5,
    oocytesDiscarded: 0,
    lastStrawNumber: 2,
    straws: [
      {
        id: expect.any(String),
        title: expect.stringMatching(/^Straw \d*/),
        numberOfEggs: 3,
        identifier: expect.any(String),
        details: {
          freezeDate: '2028-05-04',
          tankId: cryoTankV2Fixture.uuid,
          canId: cryoCanV2Fixture.uuid,
          caneId: cryoCaneV2Fixture.uuid,
          freezeWitness: 'Test miiDay1Cryo',
          comments: 'test mii day 1 cryo',
          status: 'Frozen',
        },
      },
      {
        id: expect.any(String),
        title: expect.stringMatching(/^Straw \d*/),
        numberOfEggs: 3,
        identifier: expect.any(String),
        details: {
          freezeDate: '2028-05-04',
          tankId: cryoTankV2Fixture.uuid,
          canId: cryoCanV2Fixture.uuid,
          caneId: cryoCaneV2Fixture.uuid,
          freezeWitness: 'Test miiDay1Cryo',
          comments: 'test mii day 1 cryo',
          status: 'Frozen',
        },
      },
    ],
  },
})
