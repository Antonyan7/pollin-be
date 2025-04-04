import {DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {IvfEmbryoGrade} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfEmbryoGrade3BAFixture,
  ivfEmbryoGrade3BBFixture,
} from '@libs/common/test/fixtures/ivf-embryo-grade.fixture'

class IvfEmbryoGradeSeed implements FixtureCreator {
  repository: Repository<IvfEmbryoGrade>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(IvfEmbryoGrade)
  }

  private fixturesToCreateAndDelete = [ivfEmbryoGrade3BBFixture, ivfEmbryoGrade3BAFixture]

  private setDefaultValues(dataOverwrite: Partial<IvfEmbryoGrade>): Partial<IvfEmbryoGrade> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid || v4(),
      title: dataOverwrite.title,
    }
  }

  async create(dataOverwrite: Partial<IvfEmbryoGrade>): Promise<IvfEmbryoGrade> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(dataOverwrites: Partial<IvfEmbryoGrade>[]): Promise<void> {
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

export {IvfEmbryoGradeSeed}
