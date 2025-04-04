import {DataSource, In, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IVFCancellationReason} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  FirstCancellationReasonFixture,
  SecondCancellationReasonFixture,
} from '@libs/common/test/fixtures'

class IVFCancellationReasonSeed implements FixtureCreator {
  repository: Repository<IVFCancellationReason>

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(IVFCancellationReason)
  }

  private setDefaultValues(
    dataOverwrite: Partial<IVFCancellationReason>,
  ): Partial<IVFCancellationReason> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid,
      reason: dataOverwrite.reason ?? 'Default Reason',
    }
  }

  private fixturesToCreateAndDelete = [
    FirstCancellationReasonFixture,
    SecondCancellationReasonFixture,
  ]

  async create(dataOverwrite: Partial<IVFCancellationReason>): Promise<IVFCancellationReason> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(dataOverwrites: Partial<IVFCancellationReason>[]): Promise<void> {
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

export {IVFCancellationReasonSeed}
