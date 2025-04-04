import {DataSource, In, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IVFDispositionReason} from '@libs/data-layer/apps/clinic-ivf/entities'
import {v4} from 'uuid'
import {
  ivfDispositionOneForFETFixture,
  ivfDispositionTwoForFETFixture,
} from '@libs/common/test/fixtures/ivf-disposition-reason.fixture'

class IVFDispositionReasonSeed implements FixtureCreator {
  repository: Repository<IVFDispositionReason>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(IVFDispositionReason)
  }

  private setDefaultValues(
    dataOverwrite: Partial<IVFDispositionReason>,
  ): Partial<IVFDispositionReason> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid ?? v4(),
      reason: dataOverwrite.reason,
    }
  }

  private fixturesToCreateAndDelete = [
    ivfDispositionOneForFETFixture,
    ivfDispositionTwoForFETFixture,
  ]

  async create(dataOverwrite: Partial<IVFDispositionReason>): Promise<IVFDispositionReason> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(dataOverwrites: Partial<IVFDispositionReason>[]): Promise<void> {
    const arrayData = dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite))
    await this.repository.save(arrayData)
  }

  async createFixtures(): Promise<void> {
    await this.createArray(this.fixturesToCreateAndDelete)
  }

  async destroyFixtures(): Promise<void> {
    await this.removeByUuids(this.fixturesToCreateAndDelete.map(({uuid}) => uuid))
  }

  async removeByUuids(uuids: string[]): Promise<void> {
    await this.repository.delete({uuid: In(uuids)})
  }
}

export {IVFDispositionReasonSeed}
