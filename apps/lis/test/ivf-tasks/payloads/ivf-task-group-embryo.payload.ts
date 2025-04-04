/* eslint-disable max-lines */
import {
  ivfDishBarcodeAlreadyUsedFixture,
  ivfDishBarcodeFixture,
  ivfDishBarcodeUsedFixture,
  ivfDishFixture,
  ivfTaskSummaryForDay3Fixture,
  ivfTaskSummaryForDay5CheckExpandedEmbryoDeletionFutureFixture,
  ivfTaskSummaryForDay5Fixture,
  ivfTaskSummaryForDay6Fixture,
  staffEmbryologistFixture,
  staffEmbryologistHistoryFixture,
  staffPhysicianFixture,
} from '@libs/common/test/fixtures'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  ivfEmbryoGrade3BAFixture,
  ivfEmbryoGrade3BBFixture,
} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'
import {IvfEmbryoActions} from '@libs/services-common/enums'
import {cryoCanV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {cryoCaneV2Fixture} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {Day5CheckResponse} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {TaskIVF} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {
  Day5CheckRequest,
  DishInventoryRequest,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {IVFTaskToPatientNoteMapper} from './ivt-task-to-note.payload'
import {CryoStatus} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/enums'

export const submitPayloadDay5 = {
  id: ivfTaskSummaryForDay5Fixture.uuid,
  details: {
    embryosArrested: 2,
    embryosExpanded: [
      {
        id: null,
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 5,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.FreshTransfer,
        details: {assistedHatching: true, physicianId: staffPhysicianFixture.uuid},
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: null,
        title: 'test title',
        identifier: 'asd',
        embryoNumber: 6,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: cryoCaneV2Fixture.uuid,
          canId: cryoCanV2Fixture.uuid,
          freezeWitness: 'Test',
          comments: 'test',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
        biopsy: {
          id: null,
          attachments: [
            {id: null, url: 'test_url', title: 'title 1', originalFileName: 'EmbryoFileName1'},
            {id: null, url: 'test_url', title: 'title 1', originalFileName: 'EmbryoFileName2'},
          ],
        },
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b3ee7a5',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 7,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b388de7',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 8,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b3847ed',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 9,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b388595',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 10,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
      },
      {
        id: null,
        title: 'test title',
        identifier: 'asd',
        embryoNumber: 7,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: cryoCanV2Fixture.uuid,
          freezeWitness: 'Test',
          comments: 'test',
        },
        embryologistId: staffEmbryologistHistoryFixture.uuid,
        biopsy: {
          id: null,
          attachments: [
            {id: null, url: 'test_url', title: 'title 1', originalFileName: 'EmbryoFileName1'},
            {id: null, url: 'test_url', title: 'title 1', originalFileName: 'EmbryoFileName2'},
          ],
        },
      },
    ],
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day5Check],
}
// eslint-disable-next-line max-lines-per-function
export const generatUpdatedSubmitPayloadDay5 = (
  day5Details: Day5CheckResponse,
): {id: string; details: Day5CheckRequest} => {
  return {
    id: ivfTaskSummaryForDay5Fixture.uuid,
    details: {
      embryosArrested: 2,
      embryosExpanded: [
        {
          id: day5Details.embryosExpanded[0].id,
          title: 'test title without biopsy',
          identifier: '2',
          embryoNumber: 20,
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          actionType: IvfEmbryoActions.Freeze,
          details: {
            freezeDate: '2029-02-24',
            caneId: null,
            canId: null,
            freezeWitness: 'Test2',
            comments: 'test2',
            status: CryoStatus.Frozen,
          },
          embryologistId: staffEmbryologistFixture.uuid,
          biopsy: null,
        },
        {
          id: day5Details.embryosExpanded[1].id,
          title: 'test title',
          identifier: 'asd',
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          actionType: IvfEmbryoActions.Freeze,
          details: {
            freezeDate: '2029-02-24',
            caneId: null,
            canId: null,
            freezeWitness: 'Test2',
            comments: 'test2',
            status: CryoStatus.Frozen,
          },
          embryologistId: staffEmbryologistFixture.uuid,
          biopsy: null,
        },
        {
          id: day5Details.embryosExpanded[2].id,
          title: 'test title without biopsy',
          identifier: '2',
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          biopsy: null,
          actionType: IvfEmbryoActions.Freeze,
          details: {
            freezeDate: '2029-02-24',
            caneId: null,
            canId: null,
            freezeWitness: 'Test2',
            comments: 'test2',
            status: CryoStatus.Frozen,
          },
          embryologistId: staffEmbryologistFixture.uuid,
        },
        {
          id: day5Details.embryosExpanded[3].id,
          title: 'test title without biopsy',
          identifier: '2',
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          biopsy: null,
          actionType: IvfEmbryoActions.Freeze,
          details: {
            freezeDate: '2029-02-24',
            caneId: null,
            canId: null,
            freezeWitness: 'Test2',
            comments: 'test2',
            status: CryoStatus.Frozen,
          },
          embryologistId: staffEmbryologistFixture.uuid,
        },
        {
          id: day5Details.embryosExpanded[4].id,
          title: 'test title without biopsy',
          identifier: '2',
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          biopsy: null,
          actionType: IvfEmbryoActions.Freeze,
          details: {
            freezeDate: '2029-02-24',
            caneId: null,
            canId: null,
            freezeWitness: 'Test2',
            comments: 'test2',
            status: CryoStatus.Frozen,
          },
          embryologistId: staffEmbryologistFixture.uuid,
        },
        {
          id: day5Details.embryosExpanded[5].id,
          title: 'test title without biopsy',
          identifier: '2',
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          biopsy: null,
          actionType: IvfEmbryoActions.Freeze,
          details: {
            freezeDate: '2029-02-24',
            caneId: null,
            canId: null,
            freezeWitness: 'Test2',
            comments: 'test2',
            status: CryoStatus.Frozen,
          },
          embryologistId: staffEmbryologistFixture.uuid,
        },
        {
          id: day5Details.embryosExpanded[6].id,
          title: 'test title without biopsy',
          identifier: '2',
          gradeId: ivfEmbryoGrade3BBFixture.uuid,
          biopsy: null,
          actionType: IvfEmbryoActions.Freeze,
          details: {
            freezeDate: '2029-02-24',
            caneId: null,
            canId: null,
            freezeWitness: 'Test2',
            comments: 'test2',
            status: CryoStatus.Frozen,
          },
          embryologistId: staffEmbryologistFixture.uuid,
        },
      ],
    },
  }
}
export const submitPayloadDay5WihtoutBiopsy = {
  id: ivfTaskSummaryForDay5Fixture.uuid,
  details: {
    embryosArrested: 2,
    embryosExpanded: [
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b3ee7a5',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 4,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b388de7',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 5,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b3847ed',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 6,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
      },
      {
        id: '1cfc920b-4fa1-4d76-85c1-9d9d7b388595',
        title: 'test title without biopsy',
        identifier: '2',
        embryoNumber: 7,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
      },
    ],
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day5Check],
}

export const submitPayloadDay6WithNullLocation = {
  id: ivfTaskSummaryForDay6Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: null,
        title: 'test title 2',
        identifier: 'asd2',
        embryoNumber: 8,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
    ],
  },
  dashboardFilterDate: null,
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day6Check],
}

export const submitPayloadDay6WithIncorrectEmbryoNumber = {
  id: ivfTaskSummaryForDay6Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: null,
        title: 'test title 2',
        identifier: 'asd2',
        embryoNumber: 54,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
    ],
  },
  dashboardFilterDate: null,
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day6Check],
}

export const submitPayloadDay6WithIncorrect2ndEmbryoNumber = {
  id: ivfTaskSummaryForDay6Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: null,
        title: 'test title 2',
        identifier: 'asd2',
        embryoNumber: 10,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
      {
        id: null,
        title: 'test title 2',
        identifier: 'asd2',
        embryoNumber: 132,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
    ],
  },
  dashboardFilterDate: null,
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day6Check],
}

export const submitPayloadDay6WithIncorrectNewExpandedEmbryos = {
  id: ivfTaskSummaryForDay6Fixture.uuid,
  details: {
    embryosArrested: 1,
    embryosExpanded: [
      {
        id: '980e4b5b-99d8-488a-a966-0dfd9ed8fb83',
        title: 'test title 2',
        identifier: 'asd2',
        embryoNumber: 10,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
      {
        id: null,
        title: 'test title 2',
        identifier: 'asd2',
        embryoNumber: 110,
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: null,
          canId: null,
          freezeWitness: 'Test2',
          comments: 'test2',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
    ],
  },
  dashboardFilterDate: null,
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day6Check],
}

export const day3Details = {
  embryosMoreThan6Cells: 4,
  embryosLessThan6Cells: 5,
  embryosArrested: 4,
  embryosAverageFrag: 4,
  assistedHatching: true,
}
export const day3DetailsToCheck = {
  embryosMoreThan6Cells: 4,
  embryosLessThan6Cells: 5,
  embryosArrested: 4,
  embryosAverageFrag: 4,
  assistedHatching: true,
  freshTransfer: {
    enabled: false,
    embryosToTransfer: null,
    assistedHatching: null,
  },
  updateDisabled: true,
}
export const day3DetailsWithFreshTransfer = {
  embryosMoreThan6Cells: 4,
  embryosLessThan6Cells: 3,
  embryosArrested: 2,
  embryosAverageFrag: 3,
  assistedHatching: true,
  freshTransfer: {
    enabled: true,
    embryosToTransfer: 2,
    assistedHatching: true,
  },
}

export const day3DetailsForDashboardDayUpdates = {
  embryosMoreThan6Cells: 10,
  embryosLessThan6Cells: 3,
  embryosArrested: 2,
  embryosAverageFrag: 3,
  assistedHatching: true,
  freshTransfer: {
    enabled: true,
    embryosToTransfer: 2,
    assistedHatching: true,
  },
}

export const dishInventoryRequest: DishInventoryRequest = {
  dishes: [
    {
      dish: {id: ivfDishFixture.uuid},
      barcode: {value: ivfDishBarcodeFixture.value},
    },
  ],
}

export const dishInventoryBarcodeNotFoundRequest: DishInventoryRequest = {
  dishes: [
    {
      dish: {id: ivfDishFixture.uuid},
      barcode: {value: 'NotFound'},
    },
  ],
}

export const dishInventoryBarcodeAlreadyUsedRequest: DishInventoryRequest = {
  dishes: [
    {
      dish: {id: ivfDishBarcodeAlreadyUsedFixture.uuid},
      barcode: {value: ivfDishBarcodeUsedFixture.value},
    },
  ],
}

export const day3DetailsWithFreshTransferEnabled = {
  embryosMoreThan6Cells: 4,
  embryosLessThan6Cells: 3,
  embryosArrested: 2,
  embryosAverageFrag: 3,
  assistedHatching: false,
  freshTransfer: {
    enabled: true,
    embryosToTransfer: 5,
    assistedHatching: null,
  },
}
export const day3DetailsWithFreshTransferDisabled = {
  embryosMoreThan6Cells: 4,
  embryosLessThan6Cells: 3,
  embryosArrested: 2,
  embryosAverageFrag: 3,
  assistedHatching: false,
  freshTransfer: {
    enabled: false,
    embryosToTransfer: 10,
    assistedHatching: null,
  },
}
export const day3DetailsUpdate = {
  embryosMoreThan6Cells: 4,
  embryosLessThan6Cells: 4,
  embryosArrested: 4,
  embryosAverageFrag: 2,
  assistedHatching: true,
}

export const Day5CheckDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForDay5Fixture.uuid,
  uiid: IVFTaskType.Day5Check,
  lastUpdateDetails: expect.any(String),
  details: {
    numberOfEmbryos: 4,
    remainingEmbryos: 2,
    embryoGradeOptions: [
      {id: ivfEmbryoGrade3BBFixture.uuid, title: ivfEmbryoGrade3BBFixture.title},
      {id: ivfEmbryoGrade3BAFixture.uuid, title: ivfEmbryoGrade3BAFixture.title},
    ],
    embryosArrested: submitPayloadDay5.details.embryosArrested,
    embryosExpanded: [
      {
        id: expect.any(String),
        title: 'Embryo 1',
        identifier: expect.any(String),
        gradeId: ivfEmbryoGrade3BAFixture.uuid,
        actionType: IvfEmbryoActions.FreshTransfer,
        details: {assistedHatching: true, physicianId: staffPhysicianFixture.uuid},
        biopsy: null,
      },
    ],
  },
})
export const Day3CheckDetailsToCheck: TaskIVF = expect.objectContaining({
  id: ivfTaskSummaryForDay3Fixture.uuid,
  uiid: IVFTaskType.Day3Check,
  lastUpdateDetails: expect.any(String),
  details: day3DetailsToCheck,
})
export const taskDetailsDay5CheckToCheckWithoutBiopsy = expect.objectContaining({
  id: ivfTaskSummaryForDay5Fixture.uuid,
  uiid: IVFTaskType.Day5Check,
  lastUpdateDetails: expect.any(String),
  details: {
    numberOfEmbryos: 4,
    remainingEmbryos: 2,
    embryoGradeOptions: [
      {id: ivfEmbryoGrade3BBFixture.uuid, title: ivfEmbryoGrade3BBFixture.title},
      {id: ivfEmbryoGrade3BAFixture.uuid, title: ivfEmbryoGrade3BAFixture.title},
    ],
    embryosArrested: submitPayloadDay5.details.embryosArrested,
    embryosExpanded: [
      {
        biopsy: null,
        gradeId: '6abc186f-8709-49bb-87b1-5e0c8686b7d3',
        id: expect.any(String),
        identifier: expect.any(String),
        title: 'Embryo 1',
        actionType: IvfEmbryoActions.FreshTransfer,
        details: {assistedHatching: true, physicianId: staffPhysicianFixture.uuid},
      },
      {
        id: expect.any(String),
        title: 'Embryo 2',
        identifier: expect.any(String),
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        biopsy: null,
        actionType: IvfEmbryoActions.FreshTransfer,
        details: {assistedHatching: true, physicianId: staffPhysicianFixture.uuid},
      },
    ],
  },
})

export const submitPayloadDay5ForEmbryo = {
  id: ivfTaskSummaryForDay5Fixture.uuid,
  details: {
    embryosArrested: 2,
    embryosExpanded: [
      {
        id: null,
        title: 'test title',
        identifier: 'asd',
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: cryoCaneV2Fixture.uuid,
          freezeWitness: 'Test',
          comments: 'test',
        },
        biopsy: {
          id: null,
          attachments: [
            {id: null, url: 'test_url', title: 'title 1'},
            {id: null, url: 'test_url', title: 'title 1'},
          ],
        },
      },
    ],
  },
}

export const taskDetailsMiiDay2CryoWithMoreStrawThanMatureOocytesToCryoRequestPayload = {
  matureOocytesToCryo: 1,
  oocytesDiscarded: 3,
  straws: [
    {
      strawNumber: 1,
      numberOfEggs: 3,
      details: {
        freezeDate: '2028-05-04',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test miiDay1Cryo',
        comments: 'test mii day 1 cryo',
      },
    },
    {
      strawNumber: 2,
      numberOfEggs: 3,
      details: {
        freezeDate: '2028-05-04',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test miiDay1Cryo',
        comments: 'test mii day 1 cryo',
      },
    },
  ],
}

export const taskDetailsMiiDay2CryoWithStrawRequestPayload = {
  matureOocytesToCryo: 1,
  oocytesDiscarded: 0,
  straws: [
    {
      numberOfEggs: 3,
      strawNumber: 1,
      details: {
        freezeDate: '2028-05-04',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test miiDay1Cryo',
        comments: 'test mii day 1 cryo',
      },
    },
  ],
}

export const taskDetailsMiiDay2CryoRemoveStrawRequestPayload = {
  matureOocytesToCryo: 1,
  oocytesDiscarded: 0,
  straws: [],
}

export const taskDetailsMiiDay2CryoWithStrawDeleteRequestPayload = {
  matureOocytesToCryo: 1,
  oocytesDiscarded: 0,
  straws: [],
}
export const taskDetailsMiiDay2CryoWithStrawAndInvalidDiscardedRequestPayload = {
  matureOocytesToCryo: 1,
  oocytesDiscarded: 100,
  straws: [],
}

export const submitPayloadDay5ForEmbryoDeletion = {
  id: ivfTaskSummaryForDay5CheckExpandedEmbryoDeletionFutureFixture.uuid,
  details: {
    embryosArrested: 2,
    embryosExpanded: [],
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day5Check],
}
export const submitPayloadDay5ForDeletePartOfEmbryos = {
  id: ivfTaskSummaryForDay5CheckExpandedEmbryoDeletionFutureFixture.uuid,
  details: {
    embryosArrested: 2,
    embryosExpanded: [
      {
        id: '887930f2-777d-44ac-bae8-e6a771dd9010',
        title: 'test title 2',
        embryoNumber: 10,
        identifier: 'identifier13',
        gradeId: ivfEmbryoGrade3BBFixture.uuid,
        actionType: IvfEmbryoActions.Freeze,
        details: {
          freezeDate: '2029-02-24',
          caneId: cryoCaneV2Fixture.uuid,
          canId: cryoCanV2Fixture.uuid,
          freezeWitness: 'Test',
          comments: 'test',
        },
        embryologistId: staffEmbryologistFixture.uuid,
        biopsy: null,
      },
    ],
  },
  note: IVFTaskToPatientNoteMapper[IVFTaskType.Day5Check],
}
export const payloadForMaxDeletedFieldValidation = {
  matureOocytesToCryo: 2,
  oocytesDiscarded: 24,
  straws: [
    {
      strawNumber: 1,
      numberOfEggs: 3,
      details: {
        freezeDate: '2028-05-04',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test miiDay1Cryo',
        comments: 'test mii day 1 cryo',
      },
    },
    {
      strawNumber: 2,
      numberOfEggs: 3,
      details: {
        freezeDate: '2028-05-04',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test miiDay1Cryo',
        comments: 'test mii day 1 cryo',
      },
    },
  ],
}

export const taskDetailsMiiDay1CryoStrawNumberCheckPayload = {
  matureOocytesToCryo: 5,
  oocytesDiscarded: 0,
  straws: [
    {
      numberOfEggs: 3,
      strawNumber: 1,
      details: {
        freezeDate: '2028-05-04',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test miiDay1Cryo',
        comments: 'test mii day 1 cryo',
      },
    },
    {
      numberOfEggs: 3,
      strawNumber: 2,
      details: {
        freezeDate: '2028-05-04',
        caneId: cryoCaneV2Fixture.uuid,
        freezeWitness: 'Test miiDay1Cryo',
        comments: 'test mii day 1 cryo',
      },
    },
  ],
}
