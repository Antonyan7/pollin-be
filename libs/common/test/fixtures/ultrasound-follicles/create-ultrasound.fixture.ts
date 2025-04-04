import {CreateUltrasoundDto} from '@apps/lis/diagnostic-imaging/dto/ultrasound-create-detail.dto'
import {CystType} from '@libs/data-layer/apps/clinic-test/enums'
import {
  FreeFluidOptions,
  TrilaminarEndometriumOptions,
} from '@libs/services-common/enums/ultrasound.enum'

export const CreateUltrasoundFolliclesPayloadFixture: CreateUltrasoundDto = {
  testResult: {
    uterus: {
      endometriumThickness: 0,
      trilaminarEndometriumTypeId: TrilaminarEndometriumOptions.NA,
      freeFluidTypeId: FreeFluidOptions.No,
    },

    rightOvary: {
      totalFollicles: 1,
      folliclesMoreThanOneCm: {
        count: 2,
        sizes: [3, 4],
      },
      cysts: [
        {count: 1, sizes: [6], typeId: CystType.Dermoid},
        {count: 5, sizes: [6, 7, 7.1, 7.2, 7.3], typeId: CystType.ComplexCyst},
      ],
    },

    leftOvary: {
      totalFollicles: 8,
      folliclesMoreThanOneCm: {
        count: 3,
        sizes: [9, 10, 11.1],
      },
      cysts: [{count: 2, sizes: [1.1, 2.2], typeId: CystType.CorpusLutealCyst}],
    },

    attachments: [
      {title: 'fileTitle1', url: 'someUrlToFile1', note: 'noteForFile1'},
      {title: 'fileTitle2', url: 'someUrlToFile2'},
    ],

    comment: 'commentForTestResult',
    commentFromMachine: 'commentFromMachine 23',
  },
}

export const CreateUltrasoundDay3PayloadFixture: CreateUltrasoundDto = {
  testResult: {
    uterus: {
      length: 1.1,
      width: 2.3,
      height: 4.5,
      volume: 6.7,

      endometriumThickness: 1.2,
      utTrace: 3,
    },

    rightOvary: {
      length: 8.1,
      width: 0,
      height: 0,
      volume: 8.7,

      totalFollicles: 1,
      folliclesMoreThanOneCm: {
        count: 2,
        sizes: [3, 4],
        volumes: [5.1, 6],
        // averageVolume: 3.4, // can be undefined or null
        totalVolume: 99.2,
      },

      cysts: [
        {count: 1, sizes: [6], typeId: CystType.Dermoid},
        {count: 5, sizes: [6, 7, 7.1, 7.2, 7.3], typeId: CystType.ComplexCyst},
      ],
    },

    leftOvary: {
      length: 9.1,
      width: 9.3,
      height: 9.5,
      volume: 9.7,

      totalFollicles: 8,
      folliclesMoreThanOneCm: {
        count: 3,
        sizes: [9, 10, 11.1],
        volumes: [8.1, 9, 10],
        averageVolume: 55.4,
        totalVolume: 93.2,
      },

      cysts: [{count: 2, sizes: [1.1, 2.2], typeId: CystType.CorpusLutealCyst}],
    },

    attachments: [
      {title: 'fileTitle1D3', url: 'someUrlToFile1D3', note: 'noteForFile1D3'},
      {title: 'fileTitle2D3', url: 'someUrlToFile2D3'},
    ],

    comment: 'commentForTestResultD3',
    commentFromMachine: 'commentFromMachine 23D3',
  },
}

export const editUltrasoundDay3CompletedResultPayloadFixture: CreateUltrasoundDto = {
  testResult: {
    ...CreateUltrasoundDay3PayloadFixture.testResult,
    uterus: {
      length: 2.2,
      width: 1.1,
      height: 3.0,
      volume: 5.5,
      endometriumThickness: 2.2,
      utTrace: 1,
    },
  },
}

export const CreateUltrasoundSonohysterogramPayloadFixture: CreateUltrasoundDto = {
  testResult: {
    attachments: [
      {title: 'fileTitle1D4', url: 'someUrlToFile1D4', note: 'noteForFile1D4'},
      {title: 'fileTitle2D4', url: 'someUrlToFile2D4'},
    ],

    comment: 'commentForTestResultD4',
  },
}
