import {DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {IVFUnitOption} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfUnitOptionFixture,
  ivfUnitOptionHighfieldFixture,
} from '@libs/common/test/fixtures/ivf-unit-option.fixture'

class IVFUnitOptionSeed implements FixtureCreator {
  repository: Repository<IVFUnitOption>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(IVFUnitOption)
  }

  private fixturesToCreateAndDelete = [ivfUnitOptionFixture, ivfUnitOptionHighfieldFixture]

  private setDefaultValues(dataOverwrite: Partial<IVFUnitOption>): Partial<IVFUnitOption> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid || v4(),
      title: dataOverwrite.title,
      type: dataOverwrite.type,
      sequence: dataOverwrite.sequence,
    }
  }

  async create(dataOverwrite: Partial<IVFUnitOption>): Promise<IVFUnitOption> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(dataOverwrites: Partial<IVFUnitOption>[]): Promise<void> {
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

export {IVFUnitOptionSeed}
