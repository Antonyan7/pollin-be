/* eslint-disable max-lines */
import request = require('supertest')
import {
  AuthUserFixture,
  ivfPatientFemaleFixture,
  ivfPatientMalePartnerFixture,
  ivfTaskGroupForGetPatientPartnersFixture,
  ivfTaskGroupForGetPatientEmbryoFixture,
  ivfTaskGroupForGetPatientPartnersSpawnedFixture,
  ivfTaskSummaryForDay3Fixture,
  ivfTaskSummaryForResetSignOffFixture,
  ivfTaskSummaryForDay3FreshTransferFixture,
  ivfTaskSummaryForEmbryoPhotoFixture,
  ivfTaskSummaryForIcsiInjectionFixture,
  ivfTaskSummaryForInseminationIVFFixture,
  ivfTaskSummaryForMatureOocytesPhoto2Fixture,
  ivfTaskSummaryForMiiDay1CryoFixture,
  ivfTaskSummaryForEggThawFixture,
  ivfTaskSummaryForPICSIFixture,
  patientNotOhipFixture,
  planTypeFixture,
  taskGroupForCheckDisabledV1Fixture,
  ivfTaskGroupForDay6Fixture,
  ivfTaskSummaryForDishInventoryFixture,
  ivfDishFixture,
  ivfDishBarcodeFixture,
  ivfDishPatientPartnerFixture,
  ivfTaskSummaryForMiiDay1CryoForDeleteStrawFutureFixture,
  patientPlanCohortForDeleteStrawFutureFixture,
  ivfTaskGroupForFreshTransferFixture,
  ivfTaskSummaryForMiiDay1CryoMaxDiscardedValidaationFixture,
  ivfTaskGroupForEggThawStrawSelectionFixture,
  ivfTaskGroupForEggThawStrawSelection2Fixture,
  ivfTaskSummaryForMiiDay1CryoStrawNumberFixture,
  staffPhysicianFixture,
  ivfTaskSummaryForStrawSelectionOocyteCollectedFixture,
  activeMediaLotForCreateCryoCardFixture,
} from '@libs/common/test/fixtures'
import {headers} from '@libs/common/test/utils/headers'
import {HttpStatus} from '@nestjs/common'
import {getTestModule, TestModuleType} from '@libs/common/test/utils/test.utils'
import {
  ivfTaskSummaryFixture,
  ivfTaskSummaryForDay5Fixture,
  ivfTaskSummaryForJourneyWitnessFixture,
  ivfTaskSummaryForMatureOocytesPhotoFixture,
  ivfTaskSummaryForOocytesCollectionFixture,
  ivfTaskSummaryForPostStrippingFixture,
  ivfTaskSummaryForSpermWashFixture,
  ivfTaskSummaryTaskDisabledAtCheckHistoryIcsiInjectionFixture,
} from '@libs/common/test/fixtures/ivf-task-summary.fixture'
import {
  CryoCaneV2Seed,
  IvfTaskDetailsSeed,
  IvfTaskExpendedEmbryoSeed,
  IvfTaskSummarySeed,
  PatientPlanCohortCryoSampleContainersSeed,
} from '@seeds/typeorm'
import {DataSource} from 'typeorm'
import {
  staffClinicManagerFixture,
  staffEmbryologistFixture,
  staffWithMockedAssignorIdFixture,
} from '@libs/common/test/fixtures/staff.fixture'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {ContributionTitles, IvfLabDayEnumLabels} from '@libs/services-common/enums'
import {patientPlanV2ForGetGroupTaskFixture} from '@libs/common/test/fixtures/patient-plan.fixture'
import {
  planAddonFertilisationGetGroupTaskFixture,
  planAddonFixtureCaIonophoreFixture,
  planAddonIVFFreshDefaultFixture,
} from '@libs/common/test/fixtures/plan-addon.fixture'
import {PlanAddonType, SpermSourceLabel} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {
  IcsiInjectionDetailsToCheck,
  InjectionAssessmentDetailsToCheck,
  InseminationIVFDetailsToCheck,
  MatureOocyteGroupPhotoDetailsToCheck,
  MiiDay1CryoDetailsToCheck,
  OocyteCollectionDetailsToCheck,
  PICSIDetailsToCheck,
  PostStrippingDetailsToCheck,
  SpermWashDetailsToCheck,
  submitTaskDetailsPayload,
  VerifyHepBcHivDetailsToCheck,
  InjectionAssessmentDetailsResponseCheck,
  submitPayloadFertilizationCheck,
  taskDetailFertilizationCheckToCheck,
  MatureOocyteGroupPhotoDetailsDay2ToCheck,
  PrintLabelDetailsToCheck,
  submitTaskDetailsPayloadWithoutQualityRating,
  InjectionAssessmentDetailsResponseCheckWithoutQualityRating,
  MiiDay1SpawnedCryoDetailsToCheck,
  CallThePatientDetailsToCheck,
  OocyteCollectionDetailsAfterToCheck,
  taskDetailsMiiDay1CryoToCheck,
  journeyWitnessToCheck,
  dashboardDayUpdatePayload,
} from './payloads/ivf-task-group.payload'
import {
  submitInvalidPayloadDay5,
  submitTaskDetailsInvalidPayload,
} from './payloads/ivf-task-group-invalid.payload'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  ivfTaskDetailsFixture,
  ivfTaskForDay3FreshFixture,
} from '@libs/common/test/fixtures/ivf-task-details.fixture'
import {DateTimeUtil, NestprojectConfigService} from '@libs/common'
import {PatientDocumentSeed} from '@seeds/typeorm/patient-document.seed'
import {EmbryoGroupPhotoDetailsToCheck} from './payloads/ivf-task-group-photos.payload'
import {
  DishInventoryResponse,
  EggOptionDTO,
  FertilizationCheckResponse,
  GetIVFLabTaskGroupResponseDTO,
  IVFDishResponseStatus,
  PartnerDishInventoryResponse,
  SignOffIVFLabTaskResponseDTO,
  VerifyHepBcHivResponse,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {
  day3DetailsWithFreshTransfer,
  Day3CheckDetailsToCheck,
  day3Details,
  day3DetailsUpdate,
  generatUpdatedSubmitPayloadDay5,
  submitPayloadDay5,
  submitPayloadDay5WihtoutBiopsy,
  submitPayloadDay6WithNullLocation,
  taskDetailsMiiDay2CryoWithMoreStrawThanMatureOocytesToCryoRequestPayload,
  taskDetailsMiiDay2CryoWithStrawRequestPayload,
  day3DetailsWithFreshTransferDisabled,
  day3DetailsWithFreshTransferEnabled,
  dishInventoryRequest,
  dishInventoryBarcodeNotFoundRequest,
  dishInventoryBarcodeAlreadyUsedRequest,
  taskDetailsMiiDay2CryoWithStrawAndInvalidDiscardedRequestPayload,
  submitPayloadDay6WithIncorrectEmbryoNumber,
  submitPayloadDay6WithIncorrect2ndEmbryoNumber,
  submitPayloadDay6WithIncorrectNewExpandedEmbryos,
  day3DetailsForDashboardDayUpdates,
  taskDetailsMiiDay2CryoWithStrawDeleteRequestPayload,
  submitPayloadDay5ForEmbryoDeletion,
  submitPayloadDay5ForDeletePartOfEmbryos,
  payloadForMaxDeletedFieldValidation,
  taskDetailsMiiDay1CryoStrawNumberCheckPayload,
  taskDetailsMiiDay2CryoRemoveStrawRequestPayload,
} from './payloads/ivf-task-group-embryo.payload'
import {
  eggThawDetailsToCheck,
  freezeEmbryosPayloadDay2,
  taskDetailsDay5CheckToCheck,
  taskDetailsDay5WithoutBiopsyCheckToCheck,
  taskDetailsMiiDay1StrawNumberCheck,
} from './payloads/ivf-task-details.payload'
import {IvfTaskHistorySeed} from '@seeds/firestore/ivf-task-history.seed'
import {PatientPlanCohortIvfTaskGroupSeed} from '@seeds/typeorm'

import {ResponseStatusCodes} from '@libs/services-common/dto/response-status.dto'
import {
  ivfUnitOptionFixture,
  ivfUnitOptionHighfieldFixture,
} from '@libs/common/test/fixtures/ivf-unit-option.fixture'
import {IVFTaskToPatientNoteMapper} from './payloads/ivt-task-to-note.payload'
import {ivfTaskGroupForGetCallPatientFixture} from '@libs/common/test/fixtures'
import {patientProfileAlertTaskDetailsFixture} from '@libs/common/test/fixtures/patient-profile-alert.fixture'
import {profileAlertAbnormalSpermFixture} from '@libs/common/test/fixtures/profile-alert.fixture'
import {ProfileAlertTypeTitle} from '@libs/data-layer/apps/users/enum'
import {journeyWitnessHistoryPayload} from './payloads/ivf-task-history.payload'
import {ivfTaskGroupForResetSignOffFixture} from '@libs/common/test/fixtures'
import {patientPlanCohortDay3FreshTransferFixture} from '@libs/common/test/fixtures/patient-plan-cohort.fixture'
import {patientPlanCohortFixture} from '@libs/common/test/fixtures'
import {ivfTaskSummaryForOocyteCollection2Fixture} from '@libs/common/test/fixtures'
import {ivfTaskSummaryForSpermWashWithoutUnitsAndWithZeroOocyteCollectedFixture} from '@libs/common/test/fixtures'
import {
  ivfTaskSummaryForDay3CheckDashboardUpdatesFixture,
  patientPlanCohortDay3CheckDashboardDayUpdateFixture,
  ivfDispositionOneForFETFixture,
  ivfTaskSummaryForFreezeEmbryoFixture,
} from '@libs/common/test/fixtures'
import {IvfDayStatusEnum} from '@apps/lis/daily-view/dto/daily-view.dto'
import {patientPlanEmbryoIVFPlanCompletion2Fixture} from '@libs/common/test/fixtures/ivf-task-expended-embryo.fixture'
import {
  cryoSampleContainerFixture,
  cryoSampleContainerForEggThawFixture,
  cryoSampleContainerForEmbryosToTransferFixture,
  cryoSampleContainerForOocyteCollectionFixture,
} from '@libs/common/test/fixtures/cryo/cryo-sample-container.fixture'
import {ivfDispositionTwoForFETFixture} from '@libs/common/test/fixtures/ivf-disposition-reason.fixture'
import {ivfTaskGroupForEggThawFixture} from '@libs/common/test/fixtures'
import {
  cryoCaneForCryoCardIVFDetailsFixture,
  cryoCaneV2Fixture,
} from '@libs/common/test/fixtures/cryo/cryo-cane-v2.fixture'
import {
  cryoCanForCryoCardIVFDetailsFixture,
  cryoCanV2Fixture,
} from '@libs/common/test/fixtures/cryo/cryo-can-v2.fixture'
import {
  cryoTankForCryoCardIVFDetailsFixture,
  cryoTankV2Fixture,
} from '@libs/common/test/fixtures/cryo/cryo-tank-v2.fixture'
import {TaskIVF} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {
  ivfEmbryoGrade3BAFixture,
  ivfEmbryoGrade3BBFixture,
} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {PatientPlanAddonSeed} from '@seeds/typeorm/patient-plan-addon.seed'
import {catheterTypeFirstFixture} from '@libs/common/test/fixtures/catheter-type.fixture'
import {cryoCardForStrawSelectionOocyteCollectionFixture} from '@libs/common/test/fixtures/cryo/cryo-inventory-card.fixture'
import {LisAppModule} from '@apps/lis'

const defaultHeaders = headers(AuthUserFixture.emailVerified)

const headersToCheckSummaryLastUpdatedLabel = headers(AuthUserFixture.clinicScheduling)
const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

// eslint-disable-next-line max-lines-per-function
describe('IVF Tasks', () => {
  const url = '/v1/ivf-tasks'
  let server
  let ivfTaskSummarySeed: IvfTaskSummarySeed
  let ivfTaskDetailsSeed: IvfTaskDetailsSeed
  let patientDocumentSeed: PatientDocumentSeed
  let ivfTaskGroupSeed: PatientPlanCohortIvfTaskGroupSeed
  let patientPlanCohortCryoSampleContainersSeed: PatientPlanCohortCryoSampleContainersSeed
  let ivfTaskExpendedEmbryoSeed: IvfTaskExpendedEmbryoSeed
  let ivfTaskHistorySeed: IvfTaskHistorySeed
  let cryoCaneV2Seed: CryoCaneV2Seed
  let patientPlanAddonSeed: PatientPlanAddonSeed

  let dataSource: DataSource

  beforeAll(async () => {
    const testModule = await getTestModule(LisAppModule, 9200, TestModuleType.ClinicPortalService)
    dataSource = testModule.appModule.get(DataSource)
    ivfTaskSummarySeed = new IvfTaskSummarySeed(dataSource)
    ivfTaskDetailsSeed = new IvfTaskDetailsSeed(dataSource)
    patientDocumentSeed = new PatientDocumentSeed(dataSource)
    ivfTaskGroupSeed = new PatientPlanCohortIvfTaskGroupSeed(dataSource)
    patientPlanAddonSeed = new PatientPlanAddonSeed(dataSource)
    ivfTaskExpendedEmbryoSeed = new IvfTaskExpendedEmbryoSeed(dataSource)
    patientPlanCohortCryoSampleContainersSeed = new PatientPlanCohortCryoSampleContainersSeed(
      dataSource,
    )
    cryoCaneV2Seed = new CryoCaneV2Seed(dataSource)
    server = testModule.server

    ivfTaskHistorySeed = new IvfTaskHistorySeed()
  })
  it('Should submit task details type Day3Check with freshTransfer: Success', async () => {
    const filter = dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(
        dateTimeUtil.toDate(patientPlanCohortDay3FreshTransferFixture.cohortDate),
        1,
      ),
    )
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDay3FreshTransferFixture.uuid,
      details: day3DetailsWithFreshTransfer,
      dashboardFilterDate: filter,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.Day3Check],
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.dashboardDayUpdate).toMatchObject(dashboardDayUpdatePayload)
    expect(res.body.data.details.freshTransfer).toMatchObject({
      enabled: true,
      embryosToTransfer: 2,
      assistedHatching: true,
    })
  })

  it('Should submit task details type Day3Check and return dashboard day updates: Success', async () => {
    const filter = dateTimeUtil.formatDateYMD(
      dateTimeUtil.addDays(
        dateTimeUtil.toDate(patientPlanCohortDay3CheckDashboardDayUpdateFixture.cohortDate),
        2,
      ),
    )
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDay3CheckDashboardUpdatesFixture.uuid,
      details: day3DetailsForDashboardDayUpdates,
      dashboardFilterDate: filter,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.Day3Check],
    })

    expect(res.body.data.dashboardDayUpdate.patients[0].ivfTaskGroups[0].type).toBe(
      IvfDayStatusEnum.NoTask,
    )
    expect(res.body.data.dashboardDayUpdate.patients[0].ivfTaskGroups[0].signOffInitials).toBe(null)
    expect(res.body.data.dashboardDayUpdate.patients[0].ivfTaskGroups[0].isDayDisabled).toBe(false)
  })
  it('Should submit task details Dish Inventory: Success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDishInventoryFixture.uuid,
      details: dishInventoryRequest,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.DishInventory],
    })

    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data.uiid).toBe(IVFTaskType.DishInventory)
    expect(res.body.data.details.dishes).toMatchObject(
      expect.arrayContaining([
        {
          dish: {
            id: ivfDishFixture.uuid,
            label: ivfDishFixture.dishLabel,
            status: IVFDishResponseStatus.Active,
          },
          barcode: {id: ivfDishBarcodeFixture.uuid, value: ivfDishBarcodeFixture.value},
        },
      ]),
    )
  })

  it('Should submit task details Dish Inventory: Fail - barcode not found', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDishInventoryFixture.uuid,
      details: dishInventoryBarcodeNotFoundRequest,
    })

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(i18Messages.IVF_DISH_BARCODE_NOT_FOUND)
  })

  it('Should submit task details Dish Inventory: Fail - barcode already used', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDishInventoryFixture.uuid,
      details: dishInventoryBarcodeAlreadyUsedRequest,
    })

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(i18Messages.IVF_DISH_BARCODE_ALREADY_USED)
  })

  it('Should fail to submit task note type Day3Check: Success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDay3Fixture.uuid,
      details: day3Details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.Day3Check],
    })
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should submit already SignedOff task and set signedOff fields null: success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForResetSignOffFixture.uuid,
      details: day3Details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.Day3Check],
    })
    expect(res.status).toBe(HttpStatus.OK)
    const group = await ivfTaskGroupSeed.findOneById(ivfTaskGroupForResetSignOffFixture.id)
    expect(group.signedOffDate).toBeNull()
    expect(group.signedOffById).toBeNull()
  })

  it('Should update freshTransfer from disabled to enabled with embryosToTransfer', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDay3FreshTransferFixture.uuid,
      details: day3DetailsWithFreshTransferEnabled,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.Day3Check],
    })
    expect(res.status).toBe(HttpStatus.OK)

    const res2 = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDay3FreshTransferFixture.uuid,
      details: day3DetailsWithFreshTransferDisabled,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.Day3Check],
    })
    expect(res2.status).toBe(HttpStatus.OK)

    const cohortDetails = await ivfTaskDetailsSeed.findOneByIdWithDetails(
      ivfTaskForDay3FreshFixture.id,
    )
    expect(cohortDetails.day3FreshTransfer).toBe(false)
    expect(cohortDetails.day3EmbryosToTransfer).toBe(null)
    expect(cohortDetails.day3AssistedHatching).toBe(false)
  })

  it('Should patch IVF lab task group count: Success', async () => {
    const getGroupTasks = await request(server)
      .get(`${url}?ivfTaskGroupId=${taskGroupForCheckDisabledV1Fixture.uuid}`)
      .set(defaultHeaders)
    expect(getGroupTasks.status).toBe(HttpStatus.OK)
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({id: ivfTaskSummaryTaskDisabledAtCheckHistoryIcsiInjectionFixture.uuid})
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should throw error on sign-off validation: Success', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({id: ivfTaskSummaryFixture.uuid})
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should throw error IVF LAB not found: Fail', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({id: 'NOT_FOUND_ID'})

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(i18Messages.IVF_TASK_SUMMARY_NOT_FOUND)
  })

  it('Should fail to get IVF lab task group: FAIL', async () => {
    const res = await request(server).get(`${url}?ivfTaskGroupId=NOT_FOUND_ID`).set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(i18Messages.IVF_TASK_GROUP_NOT_FOUND)
  })

  it('Should fail to submit task details: FAIL', async () => {
    const res = await request(server)
      .put(`${url}?ivfTaskGroupId=NOT_FOUND_ID&ivfTaskId=InjectionAssessment`)
      .set(defaultHeaders)
      .send({...submitTaskDetailsPayload, dashboardFilterDate: null, id: 'NOT_FOUND_ID'})

    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(i18Messages.IVF_TASK_SUMMARY_NOT_FOUND)
  })

  it('Should submit task details type InjectionAssessment: when isEnable is true but qualityRating is null', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitTaskDetailsPayloadWithoutQualityRating)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(InjectionAssessmentDetailsResponseCheckWithoutQualityRating)
  })

  it('Should submit task details type InjectionAssessment: Success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send(submitTaskDetailsPayload)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(InjectionAssessmentDetailsResponseCheck)
  })

  it('Should throw error on task details submit validation: Fail', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitTaskDetailsInvalidPayload)
    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should signOff IVF Lab Task: Success', async () => {
    const res = await request(server)
      .patch(`${url}/sign-off`)
      .set(defaultHeaders)
      .send({id: ivfTaskSummaryFixture.uuid})
    const data = res.body.data as SignOffIVFLabTaskResponseDTO
    const signOff = data.signOff
    expect(res.status).toBe(HttpStatus.OK)

    // should add signedOffDate and signedOffById
    const ivfTaskSummary = await ivfTaskSummarySeed.findOneByUUID(ivfTaskSummaryFixture.uuid)
    expect(ivfTaskSummary.signedOffDate).toBeTruthy()
    expect(ivfTaskSummary.signedOffById).toBe(staffWithMockedAssignorIdFixture.id)
    expect(ivfTaskSummary.updatedBy).toBe(staffWithMockedAssignorIdFixture.authUserId)
    expect(data.completionPercentage).toBe(5)
    expect(data.uiid).toBe(IVFTaskType.InjectionAssessment)
    expect(signOff.isDone).toBe(true)
    expect(signOff.initials).toBe('UW')
    const forExistense = signOff.details.match(/ for /)
    expect(forExistense).toBeNull()
    expect(signOff.details).toBeTruthy()
  })

  it('Should submit task details type InseminationIVF: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForInseminationIVFFixture.uuid,
        details: {oocytesInseminated: 3},
        dashboardFilterDate: null,
        note: IVFTaskToPatientNoteMapper[IVFTaskType.InseminationIVF],
      })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(InseminationIVFDetailsToCheck)

    const summary = await ivfTaskSummarySeed.findOneById(ivfTaskSummaryForInseminationIVFFixture.id)
    expect(summary.updatedByStaffId).toBe(staffWithMockedAssignorIdFixture.id)
    expect(summary.updatedByStaffAt).toBeTruthy()
  })

  it('Should submit task details type PICSI: Success', async () => {
    const details = {
      matureOocytesInjected: 1,
      immatureOocytes: 3,
    }
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForPICSIFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.PICSI],
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(PICSIDetailsToCheck)
  })

  it('Should submit task details type IcsiInjection: Success', async () => {
    const details = {
      split: 1,
      matureOocytesInjected: 1,
    }
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForIcsiInjectionFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.IcsiInjection],
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(IcsiInjectionDetailsToCheck)
  })

  it('Should submit task details type Day3Check: Success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDay3Fixture.uuid,
      details: day3Details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.Day3Check],
    })
    expect(res.body.data.details.updateDisabled).toBe(false)
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should not submit task details type OocytesCollection - embryologist has wrong role type', async () => {
    const details = {
      oocytesCollected: 24,
      oocytesWarmed: 2,
      oocytesSurvived: 13,
      embryologistId: staffClinicManagerFixture.uuid,
    }
    const res = await request(server).put(url).set(headersToCheckSummaryLastUpdatedLabel).send({
      id: ivfTaskSummaryForOocytesCollectionFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.OocyteCollection],
    })
    expect(res.status).toBe(400)
    expect(res.body.status.message).toBe(i18Messages.EMBRYOLOGIST_NOT_FOUND)
  })

  it('Should submit task details type OocytesCollection: Success', async () => {
    const details = {
      oocytesCollected: 24,
      oocytesWarmed: 2,
      oocytesSurvived: 13,
      embryologistId: staffEmbryologistFixture.uuid,
      physicianId: staffPhysicianFixture.uuid,
      selectedEggs: [],
    }
    const res = await request(server).put(url).set(headersToCheckSummaryLastUpdatedLabel).send({
      id: ivfTaskSummaryForOocytesCollectionFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.OocyteCollection],
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(OocyteCollectionDetailsToCheck)
  })

  it('Should fail submit task details type MiiDay1Cryo: Fail', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMiiDay1CryoFixture.uuid,
      details: taskDetailsMiiDay2CryoWithStrawAndInvalidDiscardedRequestPayload,
      dashboardFilterDate: null,
    })

    expect(res.body.status.message).toBe(
      i18Messages.CANNOT_DISCARD_MORE_OOCYTES_THAN_THE_TOTAL_AVAILABLE,
    )
  })

  it('Should submit task details type MiiDay1Cryo: Success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMiiDay1CryoFixture.uuid,
      details: taskDetailsMiiDay2CryoWithStrawRequestPayload,
      dashboardFilterDate: null,
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(taskDetailsMiiDay1CryoToCheck)
  })
  it('Should submit task details type MiiDay1Cryo with more straw than Mature Oocytes Cryo : error', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMiiDay1CryoFixture.uuid,
      details: taskDetailsMiiDay2CryoWithMoreStrawThanMatureOocytesToCryoRequestPayload,
      dashboardFilterDate: null,
    })
    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    expect(res.body.status.message).toBe(
      i18Messages.CANNOT_CREATE_MORE_STRAWS_THAN_THE_NUMBER_OF_MATURE_OOCYTES_AVAILABLE,
    )
  })

  it('Should submit task details type PostStripping: Success', async () => {
    const details = {
      matureOocytes: 7,
      immatureOocytes: 8,
      degenOocytes: 2,
      abnormalOocytes: 7,
    }
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForPostStrippingFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.PostStripping],
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(PostStrippingDetailsToCheck)
  })

  it('Should submit task details type SpermWash with null concentration: Success', async () => {
    const details = {
      initialConcentration: {
        value: null,
        unitId: ivfUnitOptionFixture.uuid,
      },
      finalConcentration: {
        value: null,
        unitId: ivfUnitOptionHighfieldFixture.uuid,
      },
      initialMotility: 11,
      finalMotility: 12,
    }
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForSpermWashFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: null,
    })
    expect(res.status).toBe(200)
    expect(res.body.data).toMatchObject({
      details: {
        unitOptions: [
          {id: ivfUnitOptionFixture.uuid, title: ivfUnitOptionFixture.title},
          {id: ivfUnitOptionHighfieldFixture.uuid, title: ivfUnitOptionHighfieldFixture.title},
        ],
        initialConcentration: {
          value: null,
          unitId: ivfUnitOptionFixture.uuid,
        },
        finalConcentration: {
          value: null,
          unitId: ivfUnitOptionHighfieldFixture.uuid,
        },
        initialMotility: 11,
        finalMotility: 12,
      },
    })
  })

  it('Should submit task details type SpermWash: Success', async () => {
    const details = {
      initialConcentration: {
        value: 11.123,
        unitId: ivfUnitOptionFixture.uuid,
      },
      finalConcentration: {
        value: 12.123,
        unitId: ivfUnitOptionHighfieldFixture.uuid,
      },
      initialMotility: 11,
      finalMotility: 12,
    }
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForSpermWashFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.SpermWash],
    })
    expect(res.status).toBe(200)
    expect(res.body.data).toMatchObject(SpermWashDetailsToCheck)
  })

  it('Should submit task details for IVF Journey Witness task: Success', async () => {
    const result = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(journeyWitnessHistoryPayload.request)
    expect(result.status).toBe(200)
    expect(result.body.data).toMatchObject(journeyWitnessToCheck)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(
      ivfTaskSummaryForJourneyWitnessFixture.id,
    )
    expect(historyUpdates).toMatchObject(journeyWitnessHistoryPayload.updates)
  })

  it('Should not submit task details type SpermWash - option was not passed', async () => {
    const details = {
      initialConcentration: {
        value: 11.123,
        unitId: null,
      },
      finalConcentration: {
        value: 12.123,
        unitId: ivfUnitOptionHighfieldFixture.uuid,
      },
      initialMotility: 11,
      finalMotility: 12,
    }
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForSpermWashFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.SpermWash],
    })
    expect(res.status).toBe(400)
    expect(res.body.status.message).toBe(i18Messages.IVF_UNIT_WAS_NOT_PASSED)
  })

  it('Should submit task details type MatureOocyteGroup: Success', async () => {
    const matureOocyteGroupPhotos = [
      {id: null, title: 'photo1.jpg', url: 'url/photo1.jpg', originalFileName: 'EmbryoFileName1'},
      {id: null, title: 'photo2.jpg', url: 'url/photo2.jpg', originalFileName: 'EmbryoFileName2'},
    ]
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMatureOocytesPhotoFixture.uuid,
      details: {matureOocyteGroupPhotos},
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.MatureOocyteGroupPhoto],
    })
    expect(res.status).toBe(200)
    const patientDocuments = await patientDocumentSeed.findByPatientId(ivfPatientFemaleFixture.id)
    patientDocuments.forEach((patientDocument) => {
      const matchingPhoto = matureOocyteGroupPhotos.find(
        (item) => item.title === patientDocument.name,
      )
      expect(matchingPhoto).toHaveProperty('originalFileName')
    })

    expect(patientDocuments?.length).toBe(2)
    patientDocuments.forEach((patientDocument) =>
      expect(
        matureOocyteGroupPhotos.find((item) => item.title === patientDocument.name).title,
      ).toBeTruthy(),
    )

    const cohortDetails = await ivfTaskDetailsSeed.findOneByIdWithDetails(ivfTaskDetailsFixture.id)
    expect(cohortDetails.matureOocyteGroups).toMatchObject([
      {
        title: matureOocyteGroupPhotos[0].title,
        photoPath: matureOocyteGroupPhotos[0].url,
        revisionId: expect.any(String),
      },
      {title: matureOocyteGroupPhotos[1].title, photoPath: matureOocyteGroupPhotos[1].url},
    ])
    expect(res.body.data).toMatchObject(MatureOocyteGroupPhotoDetailsToCheck)
  })

  it('Should submit task details type MatureOocyteGroup on day 2: Success', async () => {
    const matureOocyteGroupPhotos = [
      {id: null, title: 'photoForDay2.jpg', url: 'url/photoForDay2.jpg'},
    ]
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMatureOocytesPhoto2Fixture.uuid,
      details: {matureOocyteGroupPhotos},
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.MatureOocyteGroupPhoto],
    })
    expect(res.status).toBe(200)

    const patientDocuments = await patientDocumentSeed.findByPatientId(ivfPatientFemaleFixture.id)
    expect(patientDocuments?.length).toBe(3)
    matureOocyteGroupPhotos.forEach((item) =>
      expect(
        patientDocuments.find((patientDocument) => item.title === patientDocument.name).name,
      ).toBeTruthy(),
    )

    expect(res.body.data).toMatchObject(MatureOocyteGroupPhotoDetailsDay2ToCheck)
  })

  it('Should submit task details type EmbryoGroup: Success', async () => {
    const embryoGroupPhotos = [
      {id: null, title: 'photo1.jpg', url: 'url/photo1.jpg', originalFileName: 'EmbryoFileName1'},
      {id: null, title: 'photo2.jpg', url: 'url/photo2.jpg', originalFileName: 'EmbryoFileName2'},
    ]
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForEmbryoPhotoFixture.uuid,
      details: {embryoGroupPhotos},
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.EmbryoGroupPhoto],
    })
    expect(res.status).toBe(200)

    const patientDocuments = await patientDocumentSeed.findByPatientId(ivfPatientFemaleFixture.id)
    const matchingPatientDocuments = patientDocuments.filter((patientDocument) =>
      embryoGroupPhotos.some((item) => item.title === patientDocument.name),
    )

    matchingPatientDocuments.forEach((patientDocument) => {
      const matchingPhoto = embryoGroupPhotos.find((item) => item.title === patientDocument.name)
      expect(matchingPhoto).toHaveProperty('originalFileName')
    })

    expect(patientDocuments?.length).toBe(3)
    embryoGroupPhotos.forEach((item) =>
      expect(
        patientDocuments.find((patientDocument) => item.title === patientDocument.name).name,
      ).toBeTruthy(),
    )

    const cohortDetails = await ivfTaskDetailsSeed.findOneByIdWithDetails(ivfTaskDetailsFixture.id)
    expect(cohortDetails.embryoGroupPhotos).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          title: embryoGroupPhotos[0].title,
          photoPath: embryoGroupPhotos[0].url,
          revisionId: expect.any(String),
        }),
        expect.objectContaining({
          title: embryoGroupPhotos[1].title,
          photoPath: embryoGroupPhotos[1].url,
        }),
      ]),
    )
    expect(res.body.data).toMatchObject(EmbryoGroupPhotoDetailsToCheck)
  })

  /**Order is important */
  it('Should submit task details type Day5Check without biopsy: Success', async () => {
    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForDay5Fixture.id)

    // Create embryo and attachments
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadDay5WihtoutBiopsy)
    expect(createRes.body.data.details.embryosExpanded[0].physicianId).not.toBeDefined()
    expect(createRes.status).toBe(HttpStatus.OK)
    expect(createRes.body.data).toMatchObject(taskDetailsDay5WithoutBiopsyCheckToCheck)
  })

  it('Should fail to submit task details type Day3Check: Failed', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForDay3Fixture.uuid,
      details: day3DetailsUpdate,
      dashboardFilterDate: null,
      note: null,
    })
    expect(res.body.status.message).toBe(i18Messages.YOU_CANNOT_EDIT_DAY_3_AFTER_EDITING_DAY_5)
    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should submit task details type Day5Check: Failed on wrong CaneId', async () => {
    // Create embryo and attachments
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitInvalidPayloadDay5)

    expect(createRes.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('Should submit task details type Day5Check: Success', async () => {
    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForDay5Fixture.id)
    const filter = dateTimeUtil.formatDateYMD(
      dateTimeUtil.toDate(patientPlanCohortFixture.cohortDate),
    )

    // Create embryo and attachments
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({...submitPayloadDay5, dashboardFilterDate: filter})
    expect(createRes.status).toBe(HttpStatus.OK)
    expect(createRes.body.data.details.embryosExpanded[4].details.physicianId).toBeDefined()
    expect(createRes.body.data).toMatchObject(taskDetailsDay5CheckToCheck)

    const historyUpdates = await ivfTaskHistorySeed.findBySummaryId(ivfTaskSummaryForDay5Fixture.id)
    expect(historyUpdates.length).toBe(8)

    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForDay5Fixture.id)

    // Update embryo and attachments
    const updateRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(generatUpdatedSubmitPayloadDay5(createRes.body.data.details))
    expect(updateRes.status).toBe(HttpStatus.OK)

    const patientDocuments = await patientDocumentSeed.findByPatientId(ivfPatientFemaleFixture.id)
    expect(patientDocuments?.length).toBe(7)
    const attachments = submitPayloadDay5.details.embryosExpanded.flatMap(
      (embryo) => embryo.biopsy?.attachments ?? [],
    )

    attachments.forEach((attachment) => {
      const matchingDocument = patientDocuments.find((doc) => doc.url === attachment.url)
      expect(matchingDocument).toHaveProperty('originalFileName')
    })

    await ivfTaskHistorySeed.deleteByTaskSummaryId(ivfTaskSummaryForDay5Fixture.id)

    // Same request - history should not be created
    const resultWithoutChanges = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(generatUpdatedSubmitPayloadDay5(createRes.body.data.details))

    expect(resultWithoutChanges.status).toBe(HttpStatus.OK)
    expect(resultWithoutChanges.body.data.disabledIvfTaskGroupIds[0]).toBe(
      ivfTaskGroupForDay6Fixture.uuid,
    )
  })

  it('Should submit task details type Day6Check: Success', async () => {
    // empty location for Freeze
    const result = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadDay6WithNullLocation)
    expect(result.body.status).toMatchObject({
      code: ResponseStatusCodes.Succeed,
      message: null,
    })
  })

  it('Should fail to submit task details type Day6Check: Incorrect embryo number', async () => {
    const result = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadDay6WithIncorrectEmbryoNumber)
    expect(result.body.status).toMatchObject({
      code: ResponseStatusCodes.BadRequest,
      message: i18Messages.WRONG_EMBRYO_NUMBERING,
    })
  })

  it('Should fail to submit task details type Day6Check: Incorrect embryo number for 2nd embryo', async () => {
    const result = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadDay6WithIncorrect2ndEmbryoNumber)
    expect(result.body.status).toMatchObject({
      code: ResponseStatusCodes.BadRequest,
      message: i18Messages.WRONG_EMBRYO_NUMBERING,
    })
  })

  it('Should fail to submit task details type Day6Check: Incorrect embryo number for 2nd embryo', async () => {
    const result = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadDay6WithIncorrectNewExpandedEmbryos)
    expect(result.body.status).toMatchObject({
      code: ResponseStatusCodes.BadRequest,
      message: i18Messages.WRONG_EMBRYO_NUMBERING,
    })
  })

  it('Should submit task details type FertilizationCheck: Success', async () => {
    const createRes = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadFertilizationCheck)
    expect(createRes.status).toBe(HttpStatus.OK)
    expect(createRes.body.data).toMatchObject(taskDetailFertilizationCheckToCheck)
  })

  it('Should get IVF lab task group: Success', async () => {
    await patientPlanAddonSeed.updateByPatientPlanIdAndType(
      patientPlanV2ForGetGroupTaskFixture.id,
      PlanAddonType.FertilizationDirective,
      {
        planAddonId: planAddonFixtureCaIonophoreFixture.id,
      },
    )

    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetPatientPartnersFixture.uuid}`)
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)

    const group: GetIVFLabTaskGroupResponseDTO = res.body.data
    const ivfTasks = group.ivfTasks
    const fertCheckTask = ivfTasks.find(
      (item) => item.uiid === IVFTaskType.FertilizationCheck,
    ).details
    expect((fertCheckTask as FertilizationCheckResponse).sourceGroups[0].percentage).toBe(0)
    expect((fertCheckTask as FertilizationCheckResponse).sourceGroups[1].percentage).toBe(100)
    expect(group.details.date).toBe(ivfTaskGroupForGetPatientPartnersFixture.date)

    await patientPlanAddonSeed.updateByPatientPlanIdAndType(
      patientPlanV2ForGetGroupTaskFixture.id,
      PlanAddonType.FertilizationDirective,
      {
        planAddonId: planAddonFertilisationGetGroupTaskFixture.id,
      },
    )
  })

  it('Should get IVF lab task group with dish inventory task: Success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetPatientPartnersFixture.uuid}`)
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)

    const group: GetIVFLabTaskGroupResponseDTO = res.body.data
    const ivfTasks = group.ivfTasks
    const partnerDishInventoryTask = ivfTasks.find(
      (item) => item.uiid === IVFTaskType.PartnerDishInventory,
    ).details
    const dishInventoryTask = ivfTasks.find(
      (item) => item.uiid === IVFTaskType.DishInventory,
    ).details

    expect((partnerDishInventoryTask as PartnerDishInventoryResponse).dishes[0]).toMatchObject({
      dish: {id: ivfDishPatientPartnerFixture.uuid, label: ivfDishPatientPartnerFixture.dishLabel},
      barcode: {},
    })

    expect((dishInventoryTask as DishInventoryResponse).dishes[0]).toMatchObject({
      dish: {
        id: ivfDishFixture.uuid,
        label: ivfDishFixture.dishLabel,
      },
      barcode: {id: ivfDishBarcodeFixture.uuid, value: ivfDishBarcodeFixture.value},
    })
    expect(group.details.date).toBe(ivfTaskGroupForGetPatientPartnersFixture.date)

    await patientPlanAddonSeed.updateByPatientPlanIdAndType(
      patientPlanV2ForGetGroupTaskFixture.id,
      PlanAddonType.FertilizationDirective,
      {
        planAddonId: planAddonFertilisationGetGroupTaskFixture.id,
      },
    )
  })

  it('Should get IVF lab task group: Success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetPatientPartnersFixture.uuid}`)
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)
    const group: GetIVFLabTaskGroupResponseDTO = res.body.data
    expect(group.title).toContain(IvfLabDayEnumLabels.DayFive)

    const patient = group.details.patient
    const partners = group.details.partners
    const spermSources = group.details.spermSources
    const patientPlan = group.details.patientPlan

    const verifyHepBcHivTask = group.ivfTasks.find(
      (ivfTask) => ivfTask.uiid === IVFTaskType.VerifyHepBcHiv,
    ).details as VerifyHepBcHivResponse
    //check patient data
    expect(patient).toEqual(
      expect.objectContaining({
        id: ivfPatientFemaleFixture.uuid,
        identifier: ivfPatientFemaleFixture.patientIdentifier,
        contributionTitle: ContributionTitles.EggUterus,
        title: `${ivfPatientFemaleFixture.firstName} ${ivfPatientFemaleFixture.lastName}`,
      }),
    )
    //check patientPlan data
    expect(patientPlan).toEqual(
      expect.objectContaining({
        id: patientPlanV2ForGetGroupTaskFixture.uuid,
        title: planTypeFixture.title,
        hasStimSheet: false,
      }),
    )
    // check patientPlan data
    expect(spermSources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: SpermSourceLabel.PartnerFresh,
          donorId: null,
          dateOfArrival: null,
          contributorId: patientNotOhipFixture.uuid,
          spermType: planAddonIVFFreshDefaultFixture.title,
        }),
      ]),
    )
    //check patientPlan data
    expect(partners).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: ivfPatientMalePartnerFixture.uuid,
          identifier: ivfPatientMalePartnerFixture.patientIdentifier,
          title: 'ivfPatientMale ivfPatientMale',
          alerts: [
            {
              id: patientProfileAlertTaskDetailsFixture.uuid,
              typeId: profileAlertAbnormalSpermFixture.type,
              typeTitle: ProfileAlertTypeTitle[profileAlertAbnormalSpermFixture.type],
              message: profileAlertAbnormalSpermFixture.text,
            },
          ],
        }),
      ]),
    )
    expect(verifyHepBcHivTask.patientId).toBeTruthy()
    expect(verifyHepBcHivTask.patientPlanId).toBeTruthy()

    const ivfTasks = group.ivfTasks
    // check order
    expect(ivfTasks[0]).toMatchObject(InseminationIVFDetailsToCheck)
    expect(ivfTasks[1]).toMatchObject(SpermWashDetailsToCheck)
    expect(ivfTasks[2]).toMatchObject(InjectionAssessmentDetailsToCheck)

    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.PICSI)).toMatchObject(
      PICSIDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.IcsiInjection)).toMatchObject(
      IcsiInjectionDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.MiiDay1Cryo)).toMatchObject(
      MiiDay1CryoDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.VerifyHepBcHiv)).toMatchObject(
      VerifyHepBcHivDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.OocyteCollection)).toMatchObject(
      OocyteCollectionDetailsAfterToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.PostStripping)).toMatchObject(
      PostStrippingDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.MatureOocyteGroupPhoto)).toMatchObject(
      MatureOocyteGroupPhotoDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.Day3Check)).toMatchObject(
      Day3CheckDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.PrintLabel)).toMatchObject(
      PrintLabelDetailsToCheck,
    )
    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.JourneyWitness)).toMatchObject(
      journeyWitnessToCheck,
    )
  })

  it('Should get IVF lab task group: Success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetPatientPartnersSpawnedFixture.uuid}`)
      .set(defaultHeaders)

    expect(res.status).toBe(HttpStatus.OK)

    const ivfTasks = res.body.data.ivfTasks

    expect(ivfTasks.find((item) => item.uiid === IVFTaskType.MiiDay1Cryo)).toMatchObject(
      MiiDay1SpawnedCryoDetailsToCheck,
    )
  })

  it('Should get Ivf lab task group with CallPatient type: success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetCallPatientFixture.uuid}`)
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)

    const ivfTasks = res.body.data.ivfTasks
    const callThePatientTask = ivfTasks.find((task) => task.uiid === 'CallThePatient')

    expect(callThePatientTask).toBeDefined()
    expect(callThePatientTask).toMatchObject(CallThePatientDetailsToCheck)
  })

  it('Should only freeze embryos: Success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetPatientEmbryoFixture.uuid}`)
      .set(defaultHeaders)
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(freezeEmbryosPayloadDay2)
  })

  it('Should submit task details type Frozen Embryo Transfer: Success', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForFreezeEmbryoFixture.uuid,
        details: {
          numberOfEmbryosThawed: 8,
          selectedEmbryos: [
            {
              id: patientPlanEmbryoIVFPlanCompletion2Fixture.uuid,
              dispositionId: ivfDispositionOneForFETFixture.uuid,
              regradeId: ivfEmbryoGrade3BBFixture.uuid,
              mediaLotId: activeMediaLotForCreateCryoCardFixture.uuid,
            },
          ],
          physicianId: staffPhysicianFixture.uuid,
          transferTechId: staffPhysicianFixture.uuid,
          thawTechId: staffPhysicianFixture.uuid,
          catheterId: catheterTypeFirstFixture.uuid,
        },
        dashboardFilterDate: null,
        note: IVFTaskToPatientNoteMapper[IVFTaskType.FrozenEmbryoTransfer],
      })
    expect(res.status).toBe(200)
    const embryoOptions = res.body.data.details.embryoOptions
    expect(res.body.data.details.physicianId).toBe(staffPhysicianFixture.uuid)
    expect(res.body.data.details.transferTechId).toBe(staffPhysicianFixture.uuid)
    expect(res.body.data.details.thawTechId).toBe(staffPhysicianFixture.uuid)
    expect(res.body.data.details.catheterId).toBe(catheterTypeFirstFixture.uuid)
    const checkedEmbryos = embryoOptions.find((embryo) => embryo.isChecked === true)
    const newEmbryo = embryoOptions.find(
      (embryo) => embryo.mediaLotId === activeMediaLotForCreateCryoCardFixture.uuid,
    )
    expect(newEmbryo.mediaLotId).toBe(activeMediaLotForCreateCryoCardFixture.uuid)
    expect(newEmbryo.regradeId).toBe(ivfEmbryoGrade3BBFixture.uuid)
    expect(checkedEmbryos.dispositionId).toBe(ivfDispositionOneForFETFixture.uuid)
  })

  it('Should get FrozenEmbryoTransfer task details: success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForGetPatientPartnersFixture.uuid}`)
      .set(defaultHeaders)

    const filteredTask = res.body.data.ivfTasks.find(
      (task: TaskIVF) => task.id === ivfTaskSummaryForFreezeEmbryoFixture.uuid,
    )
    expect(filteredTask.details.physicianId).toBe(staffPhysicianFixture.uuid)
    expect(filteredTask.details.embryoOptions[0].details).toMatchObject({
      freezeDate: '2023-06-08',
      tankId: cryoTankForCryoCardIVFDetailsFixture.uuid,
      canId: cryoCanForCryoCardIVFDetailsFixture.uuid,
      caneId: cryoCaneForCryoCardIVFDetailsFixture.uuid,
      freezeWitness: cryoSampleContainerForEmbryosToTransferFixture.freezeWitness,
      comments: cryoSampleContainerForEmbryosToTransferFixture.freezeComment,
      status: 'Frozen',
      eggCount: null,
      grade: ivfEmbryoGrade3BAFixture.uuid,
    })
  })

  it('Should submit task details type InjectionAssessment: Fail validation error', async () => {
    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send({
        id: ivfTaskSummaryForInseminationIVFFixture.uuid,
        details: {oocytesInseminated: 10000000},
        dashboardFilterDate: null,
        note: IVFTaskToPatientNoteMapper[IVFTaskType.InseminationIVF],
      })
    expect(res.status).toBe(400)
    expect(res.body.status.message).toContain('oocytesInseminated must not be greater than 1000000')
  })

  it('Should submit OocyteCollection task when oocytesCollected is zero and warming is optional: Success', async () => {
    const details = {
      oocytesCollected: 0,
      oocytesSurvived: 13,
      embryologistId: staffEmbryologistFixture.uuid,
      physicianId: staffPhysicianFixture.uuid,
      selectedEggs: [],
    }
    const res = await request(server).put(url).set(headersToCheckSummaryLastUpdatedLabel).send({
      id: ivfTaskSummaryForOocyteCollection2Fixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.OocyteCollection],
    })
    expect(res.body.data.details.physicianId).toBe(staffPhysicianFixture.uuid)
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should fail to submit OocyteCollection task when oocytesCollected is greater than zero and warming is required: Fail', async () => {
    const details = {
      oocytesCollected: 1,
      oocytesSurvived: 13,
      embryologistId: staffEmbryologistFixture.uuid,
    }
    const res = await request(server).put(url).set(headersToCheckSummaryLastUpdatedLabel).send({
      id: ivfTaskSummaryForOocyteCollection2Fixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.OocyteCollection],
    })
    expect(res.status).toBe(400)
    expect(res.body.status.message).toContain(
      'oocytesWarmed must be a number conforming to the specified constraints',
    )
  })

  it('Should submit task details type SpermWash when oocyte collected 0: Success', async () => {
    const details = {
      initialConcentration: {
        value: 11.123,
        unitId: null,
      },
      finalConcentration: {
        value: 12.123,
        unitId: null,
      },
      initialMotility: 11,
      finalMotility: 12,
    }

    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForSpermWashWithoutUnitsAndWithZeroOocyteCollectedFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.SpermWash],
    })
    expect(res.status).toBe(HttpStatus.OK)
  })

  it('Should get Egg Thaw task details: success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForEggThawFixture.uuid}`)
      .set(defaultHeaders)
    const filteredStraw = res.body.data.ivfTasks[0].details.eggOptions.find(
      (straw: EggOptionDTO) => straw.id === cryoSampleContainerFixture.uuid,
    )
    expect(res.body.data.ivfTasks[0].details.mediaLotId).toBeNull()
    expect(filteredStraw.details).toMatchObject({
      freezeDate: cryoSampleContainerFixture.freezeDate,
      tankId: cryoTankV2Fixture.uuid,
      canId: cryoCanV2Fixture.uuid,
      caneId: cryoCaneV2Fixture.uuid,
      freezeWitness: 'freezeWitness',
      comments: 'freezeComment',
      status: 'Frozen',
      eggCount: 3,
      grade: null,
    })
  })

  it('Should submit Egg Thaw task details and check egg options based on isChecked: Success', async () => {
    const details = {
      eggsWarmed: 6,
      eggsSurvived: 4,
      selectedEggs: [
        {
          id: cryoSampleContainerForEggThawFixture.uuid,
          dispositionId: ivfDispositionTwoForFETFixture.uuid,
        },
      ],
      mediaLotId: activeMediaLotForCreateCryoCardFixture.uuid,
      thawTechId: staffPhysicianFixture.uuid,
    }
    const resCheck = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForEggThawFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: null,
    })
    expect(resCheck.status).toBe(HttpStatus.OK)
    expect(resCheck.body.data.details).toMatchObject(eggThawDetailsToCheck)

    const resBefore = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForEggThawFixture.uuid}`)
      .set(defaultHeaders)

    const checkedEggs = resBefore.body.data.ivfTasks[0].details.eggOptions.filter(
      (egg) => egg.isChecked,
    )

    expect(checkedEggs.length).toBe(1)

    const emptyDetails = {
      eggsWarmed: 6,
      eggsSurvived: 4,
      selectedEggs: [],
      thawTechId: staffPhysicianFixture.uuid,
    }
    const resUncheck = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForEggThawFixture.uuid,
      details: emptyDetails,
      dashboardFilterDate: null,
      note: null,
    })
    expect(resUncheck.status).toBe(HttpStatus.OK)

    const resAfter = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForEggThawFixture.uuid}`)
      .set(defaultHeaders)

    const checkedEggsEmpty = resAfter.body.data.ivfTasks[0].details.eggOptions.filter(
      (egg) => egg.isChecked,
    )

    // We're not supporting uncheck functional for now
    expect(checkedEggsEmpty.length).toBe(1)
  })

  it('Should submit task details type MiiDay1Cryo for deleting straw future: Success', async () => {
    const initialStraws = await patientPlanCohortCryoSampleContainersSeed.getByPatientPlanCohortId(
      patientPlanCohortForDeleteStrawFutureFixture.id,
    )
    expect(initialStraws.length).toBe(2)

    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMiiDay1CryoForDeleteStrawFutureFixture.uuid,
      details: taskDetailsMiiDay2CryoWithStrawDeleteRequestPayload,
      dashboardFilterDate: null,
    })
    expect(res.status).toBe(HttpStatus.OK)

    const strawsAfterUpdate =
      await patientPlanCohortCryoSampleContainersSeed.getByPatientPlanCohortId(
        patientPlanCohortForDeleteStrawFutureFixture.id,
      )

    expect(strawsAfterUpdate.length).toBe(0)
  })

  it('Should submit task details type Day5Check for embryo deletion future: Success', async () => {
    const initialEmbryos = await ivfTaskExpendedEmbryoSeed.findByPatientPlanCohortId(
      patientPlanCohortForDeleteStrawFutureFixture.id,
    )
    expect(initialEmbryos.length).toBe(2)

    const updatedCryoCaneBeforeUpdate = await cryoCaneV2Seed.findById(cryoCaneV2Fixture.id)
    expect(updatedCryoCaneBeforeUpdate.currentCapacity).toBe(8)

    const res = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadDay5ForDeletePartOfEmbryos)

    expect(res.status).toBe(HttpStatus.OK)
    const partiallyUpdatedEmbryos = await ivfTaskExpendedEmbryoSeed.findByPatientPlanCohortId(
      patientPlanCohortForDeleteStrawFutureFixture.id,
    )

    expect(partiallyUpdatedEmbryos.length).toBe(1)

    const res2 = await request(server)
      .put(url)
      .set(defaultHeaders)
      .send(submitPayloadDay5ForEmbryoDeletion)
    expect(res2.status).toBe(HttpStatus.OK)

    const fullyUpdatedEmbryos = await ivfTaskExpendedEmbryoSeed.findByPatientPlanCohortId(
      patientPlanCohortForDeleteStrawFutureFixture.id,
    )
    const updatedCryoCaneAfterUpdate = await cryoCaneV2Seed.findById(cryoCaneV2Fixture.id)
    expect(updatedCryoCaneAfterUpdate.currentCapacity).toBe(7)

    expect(fullyUpdatedEmbryos.length).toBe(0)
  })

  it('Should get PIDLabel task: Success', async () => {
    const res = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForFreshTransferFixture.uuid}`)
      .set(defaultHeaders)

    expect(res.status).toBe(HttpStatus.OK)

    expect(res.body.data.ivfTasks[1].details).toMatchObject({
      patientIdentifier: ivfPatientFemaleFixture.patientIdentifier,
      patientFullName: getFullName(
        ivfPatientFemaleFixture.firstName,
        ivfPatientFemaleFixture.lastName,
      ),
      dateOfBirth: dateTimeUtil.formatBirthDate(ivfPatientFemaleFixture.dateOfBirth),
    })
  })
  it('Should not submit task details type MiiDay1Cryo for max deleted field validation: Fail', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMiiDay1CryoMaxDiscardedValidaationFixture.uuid,
      details: payloadForMaxDeletedFieldValidation,
      dashboardFilterDate: null,
    })
    expect(res.body.status.message).toBe(
      i18Messages.CANNOT_DISCARD_MORE_OOCYTES_THAN_THE_TOTAL_AVAILABLE,
    )
  })

  it('Should  get IVF lab task group EggThaw: Success', async () => {
    const resMainCohort = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForEggThawStrawSelectionFixture.uuid}`)
      .set(defaultHeaders)

    const resMainCohortWhereThawed = resMainCohort.body.data.ivfTasks[0].details.eggOptions
    const strawUuidFromMainCohortWhereThawed = resMainCohortWhereThawed[0].id

    const resOtherCohort = await request(server)
      .get(`${url}?ivfTaskGroupId=${ivfTaskGroupForEggThawStrawSelection2Fixture.uuid}`)
      .set(defaultHeaders)

    const isStrawInOtherCohort = resOtherCohort.body.data.ivfTasks[0].details.eggOptions.some(
      (straw) => straw.uuid === strawUuidFromMainCohortWhereThawed,
    )
    expect(isStrawInOtherCohort).toBe(false)
  })

  it('Should submit task details type MiiDay1Cryo: Success', async () => {
    const res = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMiiDay1CryoStrawNumberFixture.uuid,
      details: taskDetailsMiiDay1CryoStrawNumberCheckPayload,
      dashboardFilterDate: null,
    })
    expect(res.status).toBe(HttpStatus.OK)
    expect(res.body.data).toMatchObject(taskDetailsMiiDay1StrawNumberCheck)

    // remove for other tests files
    const removeRes = await request(server).put(url).set(defaultHeaders).send({
      id: ivfTaskSummaryForMiiDay1CryoFixture.uuid,
      details: taskDetailsMiiDay2CryoRemoveStrawRequestPayload,
      dashboardFilterDate: null,
    })
    expect(removeRes.status).toBe(HttpStatus.OK)
  })
  it('Should submit task details type OocytesCollection with straw selection: Success', async () => {
    const details = {
      oocytesCollected: 24,
      oocytesWarmed: 2,
      oocytesSurvived: 13,
      embryologistId: staffEmbryologistFixture.uuid,
      physicianId: staffPhysicianFixture.uuid,
      selectedEggs: [
        {
          id: cryoSampleContainerForOocyteCollectionFixture.uuid,
          dispositionId: ivfDispositionTwoForFETFixture.uuid,
        },
      ],
    }
    const res = await request(server).put(url).set(headersToCheckSummaryLastUpdatedLabel).send({
      id: ivfTaskSummaryForStrawSelectionOocyteCollectedFixture.uuid,
      details,
      dashboardFilterDate: null,
      note: IVFTaskToPatientNoteMapper[IVFTaskType.OocyteCollection],
    })
    expect(res.body.data.details.eggOptions[0].cryoCard.id).toBe(
      cryoCardForStrawSelectionOocyteCollectionFixture.uuid,
    )
    expect(res.body.data.details.eggOptions[0].isChecked).toBe(true)
    expect(res.body.data.details.eggOptions[0].details).toBeDefined()
    expect(res.status).toBe(HttpStatus.OK)
  })
})
