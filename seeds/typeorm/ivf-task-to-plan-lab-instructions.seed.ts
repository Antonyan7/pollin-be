import {DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IvfTaskToPlanLabInstruction} from '@libs/data-layer/apps/clinic-ivf/entities'

class IvfTaskToPlanLabInstructionsSeed implements FixtureCreator {
  ivfTaskToPlanLabInstruction: Repository<IvfTaskToPlanLabInstruction>

  constructor(dataSource: DataSource) {
    this.ivfTaskToPlanLabInstruction = dataSource.getRepository(IvfTaskToPlanLabInstruction)
  }

  private fixturesToCreateAndDelete = []

  private setDefaultValues(
    dataOverwrite: Partial<IvfTaskToPlanLabInstruction>,
  ): Partial<IvfTaskToPlanLabInstruction> {
    return {
      id: dataOverwrite.id,
      task: dataOverwrite.task,
      planLabInstructionId: dataOverwrite.planLabInstructionId,
    }
  }

  async create(dataOverwrite: Partial<IvfTaskToPlanLabInstruction>): Promise<void> {
    await this.ivfTaskToPlanLabInstruction.save(this.setDefaultValues(dataOverwrite))
  }

  async createArray(dataOverwrites: Partial<IvfTaskToPlanLabInstruction>[]): Promise<void> {
    const arrayData = dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite))

    await this.ivfTaskToPlanLabInstruction.save(arrayData)
  }

  async createFixtures(): Promise<void> {
    await this.createArray(this.fixturesToCreateAndDelete)
  }

  async destroyFixtures(): Promise<void> {
    this.removeByIds(this.fixturesToCreateAndDelete.map((fixture) => fixture.id))
  }

  async removeById(id: number): Promise<void> {
    await this.ivfTaskToPlanLabInstruction.delete({id})
  }

  async removeByIds(ids: number[]): Promise<void> {
    if (ids.length) {
      await this.ivfTaskToPlanLabInstruction.delete(ids)
    }
  }

  findOneById(id: number): Promise<IvfTaskToPlanLabInstruction> {
    return this.ivfTaskToPlanLabInstruction.findOneBy({id})
  }
}
export {IvfTaskToPlanLabInstructionsSeed}
