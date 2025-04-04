import {DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {PatientPlanCohortIvfTaskExpandedEmbryo} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  patientPlanCohortIVFExpandedEmbryoWithBiopsyFixture,
  patientPlanCohortIVFExpandedEmbryoWithBiopsyV3Fixture,
  patientPlanCohortIVFExpandedEmbryoWithoutBiopsyFixture,
  patientPlanCohortIVFExpandedEmbryoWithoutBiopsyOrderFixture,
  patientPlanCohortIVFExpandedEmbryoWithoutBiopsyOrderV3Fixture,
  patientPlanCohortIVFExpandedEmbryoWithoutBiopsyV3Fixture,
  patientPlanCohortIVFExpandedEmbryoFixture,
  patientPlanExpandedEmbryoCryoFrozen,
  patientPlanExpandedEmbryoCryoThawed,
  patientPlanExpandedEmbryoNoHaveGradeId,
  patientPlanExpandedEmbryoCryoStatuseFrozen,
  patientPlanSelectedEmbryo,
  patientPlanEmbryoToTransferFixture,
  patientPlanEmbryoIVFPlanCompletion1Fixture,
  patientPlanEmbryoIVFPlanCompletion2Fixture,
  patientPlanEmbryoIVFPlanCompletion3Fixture,
  patientPlanEmbryoForDeletionFutureFixture,
  patientPlanEmbryoForEmbyroDeletionFutureFixture,
  patientPlanEmbryoForBiopsyInTransitFixture,
} from '@libs/common/test/fixtures/ivf-task-expended-embryo.fixture'

class IvfTaskExpendedEmbryoSeed implements FixtureCreator {
  repository: Repository<PatientPlanCohortIvfTaskExpandedEmbryo>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PatientPlanCohortIvfTaskExpandedEmbryo)
  }

  private fixturesToCreateAndDelete = [
    patientPlanCohortIVFExpandedEmbryoWithoutBiopsyFixture,
    patientPlanCohortIVFExpandedEmbryoWithBiopsyFixture,
    patientPlanCohortIVFExpandedEmbryoWithoutBiopsyOrderFixture,
    patientPlanCohortIVFExpandedEmbryoWithoutBiopsyV3Fixture,
    patientPlanCohortIVFExpandedEmbryoWithBiopsyV3Fixture,
    patientPlanCohortIVFExpandedEmbryoWithoutBiopsyOrderV3Fixture,
    patientPlanCohortIVFExpandedEmbryoFixture,
    patientPlanExpandedEmbryoCryoFrozen,
    patientPlanExpandedEmbryoCryoThawed,
    patientPlanExpandedEmbryoNoHaveGradeId,
    patientPlanExpandedEmbryoCryoStatuseFrozen,
    patientPlanSelectedEmbryo,
    patientPlanEmbryoToTransferFixture,
    patientPlanEmbryoIVFPlanCompletion1Fixture,
    patientPlanEmbryoIVFPlanCompletion2Fixture,
    patientPlanEmbryoIVFPlanCompletion3Fixture,
    patientPlanEmbryoForDeletionFutureFixture,
    patientPlanEmbryoForEmbyroDeletionFutureFixture,
    patientPlanEmbryoForBiopsyInTransitFixture,
  ]

  private setDefaultValues(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskExpandedEmbryo>,
  ): Partial<PatientPlanCohortIvfTaskExpandedEmbryo> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid || v4(),
      patientPlanCohortId: dataOverwrite.patientPlanCohortId,
      gradeId: dataOverwrite.gradeId,
      cryoSampleContainerId: dataOverwrite.cryoSampleContainerId,
      day: dataOverwrite.day,
      state: dataOverwrite.state,
      biopsyRequired: dataOverwrite.biopsyRequired,
      embryoNumber: dataOverwrite.embryoNumber,
      physicianId: dataOverwrite.physicianId,
    }
  }

  async create(
    dataOverwrite: Partial<PatientPlanCohortIvfTaskExpandedEmbryo>,
  ): Promise<PatientPlanCohortIvfTaskExpandedEmbryo> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(
    dataOverwrites: Partial<PatientPlanCohortIvfTaskExpandedEmbryo>[],
  ): Promise<void> {
    const arrayData = dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite))

    await this.repository.save(arrayData)
  }

  async createFixtures(): Promise<void> {
    await this.createArray(this.fixturesToCreateAndDelete)
  }

  async destroyFixtures(): Promise<void> {
    await this.removeByIds(this.fixturesToCreateAndDelete.map((fixture) => fixture.id))
  }

  async removeById(id: number): Promise<void> {
    await this.repository.delete({id})
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.repository.delete(ids)
  }

  async findByPatientPlanCohortId(
    patientPlanCohortId: number,
  ): Promise<PatientPlanCohortIvfTaskExpandedEmbryo[]> {
    return this.repository.find({
      where: {patientPlanCohortId},
      relations: ['cryoSampleContainer', 'patientPlanCohort'],
    })
  }
}

export {IvfTaskExpendedEmbryoSeed}
