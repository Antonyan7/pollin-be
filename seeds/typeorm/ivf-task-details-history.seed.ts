import {DataSource, In, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {patientPlanCohortFixture} from '@libs/common/test/fixtures'
import {PatientPlanCohortIvfTaskDetailsHistory} from '@libs/data-layer/apps/clinic-ivf/entities'

class IvfTaskDetailsHistorySeed implements FixtureCreator {
  repository: Repository<PatientPlanCohortIvfTaskDetailsHistory>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PatientPlanCohortIvfTaskDetailsHistory)
  }

  private fixturesToCreateAndDelete = []

  private setDefaultValues(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskDetailsHistory>,
  ): Partial<PatientPlanCohortIvfTaskDetailsHistory> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid || v4(),
      patientPlanCohortId: dataOverwrite.patientPlanCohortId,
      createdAt: dataOverwrite.createdAt,
      updatedAt: dataOverwrite.updatedAt,
      oocytesCollected: dataOverwrite.oocytesCollected,
      oocytesSurvived: dataOverwrite.oocytesSurvived,
      oocytesWarmed: dataOverwrite.oocytesWarmed,
      totalOocytes: dataOverwrite.totalOocytes,
      matureOocytes: dataOverwrite.matureOocytes,
      immatureOocytes: dataOverwrite.immatureOocytes,
      degenOocytes: dataOverwrite.degenOocytes,
      abnormalOocytes: dataOverwrite.abnormalOocytes,
      spermWashFinalConcentration: dataOverwrite.spermWashFinalConcentration,
      spermWashInitialConcentration: dataOverwrite.spermWashInitialConcentration,
      spermWashFinalMotility: dataOverwrite.spermWashFinalMotility,
      spermWashInitialMotility: dataOverwrite.spermWashInitialMotility,
      day3EmbryosMoreThan6Cells: dataOverwrite.day3EmbryosMoreThan6Cells,
      icsiSplit: dataOverwrite.icsiSplit,
      icsiMatureOocytesInjected: dataOverwrite.icsiMatureOocytesInjected,
      oocytesInseminated: dataOverwrite.oocytesInseminated,
      picsiImmatureOocytes: dataOverwrite.picsiImmatureOocytes,
      picsiMatureOocytesInjected: dataOverwrite.picsiMatureOocytesInjected,
      matureOocytesToCry: dataOverwrite.matureOocytesToCry,
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
    }
  }

  async create(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskDetailsHistory>,
  ): Promise<PatientPlanCohortIvfTaskDetailsHistory> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(
    dataOverwrites: Partial<PatientPlanCohortIvfTaskDetailsHistory>[],
  ): Promise<void> {
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
  async findByCohortId(
    patientPlanCohortId: number,
  ): Promise<PatientPlanCohortIvfTaskDetailsHistory> {
    return this.repository.findOne({where: {patientPlanCohortId}})
  }
}

export {IvfTaskDetailsHistorySeed}
