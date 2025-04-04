import {In, DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IvfDishToPlanType} from '@libs/data-layer/apps/clinic-ivf/entities'
import {v4} from 'uuid'
import {
  ivfDishToIvfPlanTypeFixture,
  ivfDishToIvfPlanType2Fixture,
  ivfDishToIvfPlanTypeNewFixture,
} from '@libs/common/test/fixtures/ivf-dish-to-ivf-plan-type.fixture'

class IvfDishToPlanTypeSeed implements FixtureCreator {
  fixturesToCreateAndDelete: Partial<IvfDishToPlanType>[] = [
    ivfDishToIvfPlanTypeFixture,
    ivfDishToIvfPlanType2Fixture,
    ivfDishToIvfPlanTypeNewFixture,
  ]

  ivfDishToPlanType: Repository<IvfDishToPlanType>

  constructor(dataSource: DataSource) {
    this.ivfDishToPlanType = dataSource.getRepository(IvfDishToPlanType)
  }

  async create(dataOverwrite: Partial<IvfDishToPlanType>): Promise<void> {
    await this.ivfDishToPlanType.save(this.setDefaultValues(dataOverwrite))
  }

  private setDefaultValues(dataOverwrite: Partial<IvfDishToPlanType>): Partial<IvfDishToPlanType> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid ?? v4(),
      planTypeId: dataOverwrite.planTypeId,
      ivfDishId: dataOverwrite.ivfDishId,
      day: dataOverwrite.day,
      required: dataOverwrite.required,
    }
  }

  async findOneByPlanTypeId(planTypeId: number): Promise<IvfDishToPlanType[]> {
    return this.ivfDishToPlanType.find({
      where: {planTypeId},
      relations: {ivfDish: true},
    })
  }

  async createArray(dataOverwrites: Partial<IvfDishToPlanType>[]): Promise<void> {
    await this.ivfDishToPlanType.save(
      dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite)),
    )
  }

  async createFixtures(): Promise<void> {
    const fixturesWithDefaultValues = this.fixturesToCreateAndDelete.map((fixture) =>
      this.setDefaultValues(fixture),
    )
    await this.ivfDishToPlanType.save(fixturesWithDefaultValues)
  }

  async destroyFixtures(): Promise<void> {
    const ids = this.fixturesToCreateAndDelete.map((planTypeDish) => planTypeDish.id)
    await this.removeByIds(ids)
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.ivfDishToPlanType.delete({id: In(ids)})
  }
}

export {IvfDishToPlanTypeSeed}
