import {CreateObUltrasoundDto} from '@apps/lis/diagnostic-imaging/dto/ob-ultrasound.dto'
import {SubmitOHSSUltrasoundTestResultRequestDTO} from '@apps/lis/diagnostic-imaging/dto/ohss-ultrasound.dto'
import {GestationalAgeEnum} from '@libs/data-layer/apps/clinic-test/enums'

export const createObUltrasoundRequestBody: CreateObUltrasoundDto = {
  testResult: {
    findings: {
      gestationalAge: {
        dlmpOrEdd: GestationalAgeEnum.DLMP,
        date: '2002-12-12',
        weeks: 12,
        days: 0,
      },
      numberOfGestationalSacs: 3,
      minSacDiameter: 'af',
      yolkSec: 'sf',
      crownRumpLength: {
        length: 'sfa',
        weeks: 11,
        days: 22,
      },
      fetalHearthMotion: 'as',
      cervix: {
        length: 'aq',
        type: 'ClosedTV',
      },
      adnexaNote: 'addd',
      freeFluidNote: 'freeFluidNote',
    },
    rightOvary: {note: 'right'},
    leftOvary: {note: 'left'},
    opinion: {
      singleLiveGestationOf: {
        weeks: 25,
        days: 12,
      },
      estimatedDateOfConfinement: '2002-12-12',
      followUpRecommendation: 'bf',
    },
    clinicalHistory: 'aaa',
    comparison: 'b',
    comment: 'Comment for edit',
    attachments: [
      {title: 't1', url: 'url1', note: 'note1'},
      {title: 't2', url: 'url2', note: 'note2'},
    ],
  },
}

export const createObUltrasoundAddMoreAttachmentsRequestBody: CreateObUltrasoundDto = {
  testResult: {
    ...createObUltrasoundRequestBody.testResult,
    attachments: [], // attachments payload are configured directly in a test case
  },
}

export const updateObUltrasoundRequestBody: CreateObUltrasoundDto = {
  testResult: {
    findings: {
      gestationalAge: {
        dlmpOrEdd: GestationalAgeEnum.EDD,
        weeks: 0,
        days: 0,
      },
      numberOfGestationalSacs: 3,
      minSacDiameter: 'af',
      yolkSec: 'sf',
      crownRumpLength: {
        length: 'sfa',
        weeks: 11,
        days: 22,
      },
      fetalHearthMotion: 'as',
      cervix: {
        length: 'aq',
        type: 'ClosedTV',
      },
      adnexaNote: 'addd',
      freeFluidNote: 'freeFluidNote',
    },
    rightOvary: {note: 'right'},
    leftOvary: {note: 'left'},
    opinion: {
      singleLiveGestationOf: {
        weeks: 25,
        days: 12,
      },
      estimatedDateOfConfinement: '2002-12-12',
      followUpRecommendation: 'bf',
    },
    clinicalHistory: 'aaa',
    comparison: 'b',
    comment: 'Comment for edit',
    attachments: [
      {title: 't1', url: 'url1', note: 'note1'},
      {title: 't2', url: 'url2', note: 'note2'},
    ],
  },
}

export const submitCreateOHSSUltrasoundTestResultRequestBody: SubmitOHSSUltrasoundTestResultRequestDTO =
  {
    testResult: {
      leftOvary: {
        width: 4.1,
        height: 4.1,
        length: 3.2,
        volume: 15,
        approximateNumberOfCysts: 1,
        largestAverageInSize: [7, 1.6, 4.2],
      },
      rightOvary: {
        width: 1.1,
        height: 3.1,
        length: 6.2,
        volume: 14.5,
        approximateNumberOfCysts: 2,
        largestAverageInSize: null,
      },
      pelvicFreeFluidCollection: {
        PCDS: {
          width: 3.2,
          height: 4.1,
          length: 6.3,
          volume: 12,
        },
        leftAdnexa: 6.4,
        rightAdnexa: 1.1,
        ACDS: 13,
      },
      abdominalFreeFluidCollection: {
        morrisonPouchRUQ: 2,
        rightSubdiaphragmatic: 5,
        leftSubdiaphragmatic: null,
        rightFlank: null,
        leftFlank: null,
        luq: null,
        totalAmount: 20,
      },
      pleuralEffusionPresence: {
        left: false,
        right: null,
      },
      attachments: [
        {title: 't1', url: 'url1', note: 'note1'},
        {title: 't2', url: 'url2', note: 'note2'},
      ],
      comment: null,
    },
  }

export const submitUpdateOHSSUltrasoundTestResultRequestBody: SubmitOHSSUltrasoundTestResultRequestDTO =
  {
    testResult: {
      ...submitCreateOHSSUltrasoundTestResultRequestBody.testResult,
      leftOvary: {
        ...submitCreateOHSSUltrasoundTestResultRequestBody.testResult.leftOvary,
        height: 8.2,
      },
      pleuralEffusionPresence: {
        ...submitCreateOHSSUltrasoundTestResultRequestBody.testResult.pleuralEffusionPresence,
        right: true,
      },
    },
  }
