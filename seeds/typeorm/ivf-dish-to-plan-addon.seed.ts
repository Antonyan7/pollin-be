import {In, DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IvfDishToPlanAddon} from '@libs/data-layer/apps/clinic-ivf/entities'
import {v4} from 'uuid'
import {ivfDishToIvfPlanAddonWitnessFixture} from '@libs/common/test/fixtures/ivf-dish-to-ivf-plan-addon.fixture'

class IvfDishToPlanAddonSeed implements FixtureCreator {
  fixturesToCreateAndDelete: Partial<IvfDishToPlanAddon>[] = [ivfDishToIvfPlanAddonWitnessFixture]

  ivfDishToPlanAddon: Repository<IvfDishToPlanAddon>

  constructor(dataSource: DataSource) {
    this.ivfDishToPlanAddon = dataSource.getRepository(IvfDishToPlanAddon)
  }

  async create(dataOverwrite: Partial<IvfDishToPlanAddon>): Promise<void> {
    await this.ivfDishToPlanAddon.save(this.setDefaultValues(dataOverwrite))
  }
  private setDefaultValues(
    dataOverwrite: Partial<IvfDishToPlanAddon>,
  ): Partial<IvfDishToPlanAddon> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid ?? v4(),
      day: dataOverwrite.day,
      required: dataOverwrite.required,
      planAddonId: dataOverwrite.planAddonId,
      ivfDishId: dataOverwrite.ivfDishId,
    }
  }

  async findOneByPlanAddonId(planAddonId: number): Promise<IvfDishToPlanAddon[]> {
    return this.ivfDishToPlanAddon.find({
      where: {planAddonId},
      relations: {ivfDish: true},
    })
  }

  async createArray(dataOverwrites: Partial<IvfDishToPlanAddon>[]): Promise<void> {
    await this.ivfDishToPlanAddon.save(
      dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite)),
    )
  }

  async createFixtures(): Promise<void> {
    const fixturesWithDefaultValues = this.fixturesToCreateAndDelete.map((fixture) =>
      this.setDefaultValues(fixture),
    )
    await this.ivfDishToPlanAddon.save(fixturesWithDefaultValues)
  }

  async destroyFixtures(): Promise<void> {
    const ids = this.fixturesToCreateAndDelete.map((addonDish) => addonDish.id)
    await this.removeByIds(ids)
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.ivfDishToPlanAddon.delete({id: In(ids)})
  }
}

export {IvfDishToPlanAddonSeed}
