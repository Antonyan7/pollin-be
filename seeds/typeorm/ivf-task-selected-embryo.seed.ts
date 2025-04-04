import {DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {PatientPlanCohortFrozenEmbryoTransfer} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-frozen-embryo-transfer.entity'
import {
  patientPlanCohortFrozenEmbryo,
  patientPlanCohortFrozenTwoEmbryo,
} from '@libs/common/test/fixtures/patient-plan-cohort-frozen-embryo-transfer.fixture'

class IvfTaskSelectedEmbryoSeed implements FixtureCreator {
  repository: Repository<PatientPlanCohortFrozenEmbryoTransfer>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PatientPlanCohortFrozenEmbryoTransfer)
  }

  private fixturesToCreateAndDelete = [
    patientPlanCohortFrozenEmbryo,
    patientPlanCohortFrozenTwoEmbryo,
  ]

  private setDefaultValues(
    dataOverwrite: Partial<PatientPlanCohortFrozenEmbryoTransfer>,
  ): Partial<PatientPlanCohortFrozenEmbryoTransfer> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid || v4(),
      patientPlanCohortId: dataOverwrite.patientPlanCohortId,
      expandedEmbryoId: dataOverwrite.expandedEmbryoId,
      ivfDispositionReasonId: dataOverwrite.ivfDispositionReasonId || null,
    }
  }

  async create(
    dataOverwrite: Partial<PatientPlanCohortFrozenEmbryoTransfer>,
  ): Promise<PatientPlanCohortFrozenEmbryoTransfer> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(
    dataOverwrites: Partial<PatientPlanCohortFrozenEmbryoTransfer>[],
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
}

export {IvfTaskSelectedEmbryoSeed}
