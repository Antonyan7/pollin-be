import {DataSource, Equal, In, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {PatientPlanCohortIvfTaskDetails} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfTaskDetailsFixture,
  newIvfTaskDetailsFixture,
  ivfTaskDetailsForGetDataFixture,
  ivfTaskDetailsForIVFHistoryFixture,
  ivfTaskDetailsForSpawnFixture,
  ivfTaskForCompletionDetailsFixture,
  ivfTaskForCompletionStatsDetailsFixture,
  ivfTaskForCompletionStatsDetailsEggFreezingFixture,
  ivfTaskForSpawnedFixture,
  ivfTaskForCohort2Fixture,
  ivfTaskForCohortForNewGroupFixture,
  ivfTaskForDay3FreshFixture,
  patientPlanCohortForCompletedIVFStateDetailsFixture,
  patientPlanCohortForCompletionIVFDetailsFixture,
  ivfTaskDetailsWithZeroOocyteCollectedFixture,
  ivfTaskDetailsOocyteCollectedZeroFixture,
  ivfTaskForDay3CheckDashboardDayUpdateFreshFixture,
  ivfTaskDetailsOocyteCollectedZeroForSpermWashFixture,
  ivfTaskDetailsForEggThawFixture,
  ivfTaskDetailsForStrawDeleteFixture,
  ivfTaskDetailsDiscardDishFixture,
  ivfTaskDetailsMiiDay1CryoFixture,
  ivfTaskDetailsMiiDay1CryoMaxDiscardedValidationFixture,
  ivfTaskDetailsForEggThawStrawSelectionFixture,
  ivfTaskDetailsForEggThawStrawSelection2Fixture,
  ivfTaskDetailsStrawNumberFixture,
  ivfTaskDetailsStrawSelectionOocyteCollectionFixture,
} from '@libs/common/test/fixtures/ivf-task-details.fixture'
import {patientPlanCohortFixture} from '@libs/common/test/fixtures'

class IvfTaskDetailsSeed implements FixtureCreator {
  repository: Repository<PatientPlanCohortIvfTaskDetails>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PatientPlanCohortIvfTaskDetails)
  }

  private fixturesToCreateAndDelete = [
    ivfTaskDetailsFixture,
    newIvfTaskDetailsFixture,
    ivfTaskDetailsForGetDataFixture,
    ivfTaskDetailsForSpawnFixture,
    ivfTaskDetailsForIVFHistoryFixture,
    ivfTaskForCompletionDetailsFixture,
    ivfTaskForCompletionStatsDetailsFixture,
    ivfTaskForCompletionStatsDetailsEggFreezingFixture,
    ivfTaskForSpawnedFixture,
    ivfTaskForCohort2Fixture,
    ivfTaskForCohortForNewGroupFixture,
    ivfTaskForDay3FreshFixture,
    patientPlanCohortForCompletedIVFStateDetailsFixture,
    patientPlanCohortForCompletionIVFDetailsFixture,
    ivfTaskDetailsWithZeroOocyteCollectedFixture,
    ivfTaskDetailsOocyteCollectedZeroFixture,
    ivfTaskDetailsOocyteCollectedZeroForSpermWashFixture,
    ivfTaskForDay3CheckDashboardDayUpdateFreshFixture,
    ivfTaskDetailsForEggThawFixture,
    ivfTaskDetailsDiscardDishFixture,
    ivfTaskDetailsForStrawDeleteFixture,
    ivfTaskDetailsMiiDay1CryoFixture,
    ivfTaskDetailsMiiDay1CryoMaxDiscardedValidationFixture,
    ivfTaskDetailsForEggThawStrawSelectionFixture,
    ivfTaskDetailsForEggThawStrawSelection2Fixture,
    ivfTaskDetailsStrawNumberFixture,
    ivfTaskDetailsStrawSelectionOocyteCollectionFixture,
  ]

  private setDefaultValues(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskDetails>,
  ): Partial<PatientPlanCohortIvfTaskDetails> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid || v4(),
      patientPlanCohortId: dataOverwrite.patientPlanCohortId,
      createdAt: dataOverwrite.createdAt,
      updatedAt: dataOverwrite.updatedAt,
      oocytesCollected: dataOverwrite.oocytesCollected,
      oocytesSurvived: dataOverwrite.oocytesSurvived,
      oocyteCollectionEmbryologistId: dataOverwrite.oocyteCollectionEmbryologistId,
      oocytesWarmed: dataOverwrite.oocytesWarmed,
      totalOocytes: dataOverwrite.totalOocytes,
      matureOocytes: dataOverwrite.matureOocytes,
      immatureOocytes: dataOverwrite.immatureOocytes,
      degenOocytes: dataOverwrite.degenOocytes,
      abnormalOocytes: dataOverwrite.abnormalOocytes,
      spermWashFinalConcentration: dataOverwrite.spermWashFinalConcentration,
      spermWashFinalConcentrationUnitId: dataOverwrite.spermWashFinalConcentrationUnitId,
      spermWashInitialConcentration: dataOverwrite.spermWashInitialConcentration,
      spermWashInitialConcentrationUnitId: dataOverwrite.spermWashInitialConcentrationUnitId,
      spermWashFinalMotility: dataOverwrite.spermWashFinalMotility,
      spermWashInitialMotility: dataOverwrite.spermWashInitialMotility,
      day3EmbryosMoreThan6Cells: dataOverwrite.day3EmbryosMoreThan6Cells,
      icsiSplit: dataOverwrite.icsiSplit,
      icsiMatureOocytesInjected: dataOverwrite.icsiMatureOocytesInjected,
      oocytesInseminated: dataOverwrite.oocytesInseminated,
      picsiImmatureOocytes: dataOverwrite.picsiImmatureOocytes,
      picsiMatureOocytesInjected: dataOverwrite.picsiMatureOocytesInjected,
      matureOocytesToCry: dataOverwrite.matureOocytesToCry,
      oocytesDiscarded: dataOverwrite.oocytesDiscarded,
      embryoGroupPhotos: dataOverwrite.embryoGroupPhotos,
      oocyteAssessmentsGranular: dataOverwrite.oocyteAssessmentsGranular,
      oocyteAssessmentsSer: dataOverwrite.oocyteAssessmentsSer,
      oocyteAssessmentsComment: dataOverwrite.oocyteAssessmentsComment,
      oocyteQuality: dataOverwrite.oocyteQuality,
      day3EmbryosLessThan6Cells: dataOverwrite.day3EmbryosLessThan6Cells,
      day3EmbryosArrested: dataOverwrite.day3EmbryosArrested,
      day3EmbryosAverageFrag: dataOverwrite.day3EmbryosAverageFrag,
      day3AssistedHatching: dataOverwrite.day3AssistedHatching,
      day5Arrested: dataOverwrite.day5Arrested,
      day6Arrested: dataOverwrite.day6Arrested,
      day7Discarded: dataOverwrite.day7Discarded,
      callDate: dataOverwrite.callDate,
      journeyWitness: dataOverwrite.journeyWitness,
      oocyteCollectionPhysicianId: dataOverwrite.oocyteCollectionPhysicianId,
      fetPhysicianId: dataOverwrite.fetPhysicianId,
      eggThawThawTechId: dataOverwrite.eggThawThawTechId,
      fetTransferTechId: dataOverwrite.fetTransferTechId,
    }
  }

  async create(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskDetails>,
  ): Promise<PatientPlanCohortIvfTaskDetails> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(dataOverwrites: Partial<PatientPlanCohortIvfTaskDetails>[]): Promise<void> {
    const arrayData = dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite))

    await this.repository.save(arrayData)
  }

  async createFixtures(): Promise<void> {
    await this.createArray(this.fixturesToCreateAndDelete)
  }

  async destroyFixtures(): Promise<void> {
    await Promise.all([
      this.removeByIds(this.fixturesToCreateAndDelete.map((fixture) => fixture.id)),
      this.removeByCohortIds([patientPlanCohortFixture.id]),
    ])
  }

  async removeById(id: number): Promise<void> {
    await this.repository.delete({id})
  }

  async removeByCohortIds(patientPlanCohortIds: number[]): Promise<void> {
    await this.repository.delete({patientPlanCohortId: In(patientPlanCohortIds)})
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.repository.delete(ids)
  }

  async getOneById(id: number): Promise<PatientPlanCohortIvfTaskDetails> {
    return this.repository.findOneBy({id})
  }

  async findOneByIdWithDetails(id: number): Promise<PatientPlanCohortIvfTaskDetails> {
    return this.repository.findOne({
      where: {id: Equal(id)},
      relations: {matureOocyteGroups: true, embryoGroupPhotos: true},
    })
  }

  async update(
    id: number,
    patientPlanCohortIvfTaskDetails: Partial<PatientPlanCohortIvfTaskDetails>,
  ): Promise<void> {
    await this.repository.update(id, {...patientPlanCohortIvfTaskDetails})
  }
}

export {IvfTaskDetailsSeed}
