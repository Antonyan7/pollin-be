import {In, DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IvfTaskToDayToPlanType} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfTaskToDayToPlanType2Fixture,
  ivfTaskToDayToPlanType3Fixture,
  ivfTaskToDayToPlanTypeDayZeroFixture,
  ivfTaskToDayToPlanTypeFixture,
  ivfTaskToDayToPlanTypeFreezeEmbryoFixture,
  ivfTaskToDayToPlanTypePicsiFixture,
  ivfTaskToDayToPlanTypeCallPatientFixture,
} from '@libs/common/test/fixtures'
import {ivfTaskToDayToPlanType5Fixture} from '@libs/common/test/fixtures'

class IvfDayTaskToPlanTypeSeed implements FixtureCreator {
  /** Common list for create and delete */
  fixturesToCreateAndDelete: Partial<IvfTaskToDayToPlanType>[] = [
    ivfTaskToDayToPlanTypeFixture,
    ivfTaskToDayToPlanType5Fixture,
    ivfTaskToDayToPlanType2Fixture,
    ivfTaskToDayToPlanType3Fixture,
    ivfTaskToDayToPlanTypeDayZeroFixture,
    ivfTaskToDayToPlanTypePicsiFixture,
    ivfTaskToDayToPlanTypeFreezeEmbryoFixture,
    ivfTaskToDayToPlanTypeCallPatientFixture,
  ]

  ivfTaskToDayToPlanType: Repository<IvfTaskToDayToPlanType>

  constructor(dataSource: DataSource) {
    this.ivfTaskToDayToPlanType = dataSource.getRepository(IvfTaskToDayToPlanType)
  }

  async create(dataOverwrite: Partial<IvfTaskToDayToPlanType>): Promise<void> {
    await this.ivfTaskToDayToPlanType.save(this.setDefaultValues(dataOverwrite))
  }

  private setDefaultValues(
    dataOverwrite: Partial<IvfTaskToDayToPlanType>,
  ): Partial<IvfTaskToDayToPlanType> {
    return {
      id: dataOverwrite.id,
      planTypeId: dataOverwrite.planTypeId,
      IVFTaskToDayId: dataOverwrite.IVFTaskToDayId,
    }
  }

  async createArray(dataOverwrites: Partial<IvfTaskToDayToPlanType>[]): Promise<void> {
    await this.ivfTaskToDayToPlanType.save(
      dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite)),
    )
  }

  async createFixtures(): Promise<void> {
    const fixturesWithDefaultValues = this.fixturesToCreateAndDelete.map((fixture) =>
      this.setDefaultValues(fixture),
    )
    await this.ivfTaskToDayToPlanType.save(fixturesWithDefaultValues)
  }

  async destroyFixtures(): Promise<void> {
    const ids = this.fixturesToCreateAndDelete.map((labInfo) => labInfo.id)
    await this.removeByIds(ids)
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.ivfTaskToDayToPlanType.delete({id: In(ids)})
  }
}

export {IvfDayTaskToPlanTypeSeed}
