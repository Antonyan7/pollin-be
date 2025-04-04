import {In, DataSource, Repository} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IvfTaskToDay} from '@libs/data-layer/apps/clinic-ivf/entities'
import {IVFTaskType} from '@libs/data-layer/apps/clinic-ivf/enums'
import {
  ivfTaskDay3CheckFixture,
  ivfTaskDay5CheckFixture,
  ivfTaskDay6CheckFixture,
  ivfTaskFertilizationCheckFixture,
  ivfTaskEmbryoPhotoFixture,
  ivfTaskMatureOocytePhotoFixture,
  ivfTaskPostStrippingFixture,
  ivfTaskPostStrippingForCheckMaxCountFixture,
  ivfTaskToDay2Fixture,
  ivfTaskToDay3Fixture,
  ivfTaskToDay4Fixture,
  ivfTaskToDayFixture,
  ivfTaskToDayForVerifyHepBcHivFixture,
  ivfTaskToDayOocytesCollectionFixture,
  ivfTaskToDayZeroIcsiInjectionFixture,
  ivfTaskToDayZeroPICSIFixture,
  ivfTaskEmbryoFreezingOocytesFixture,
  ivfTaskMatureOocytePhotoDay2Fixture,
  ivfTaskDay7Fixture,
  ivfTaskDayFreezeEmrbyoFixture,
  ivfTaskDayFertilizationIVFFixture,
  ivfTaskDayFertilizationICSIFixture,
  ivfTaskDayCallPatientFixture,
  ivfTaskDaySetupWorksheetFixture,
  ivfTaskEmbryoDay2Fixture,
  ivfTaskJourneyWitnessFixture,
  ivfTaskDishInventoryFixture,
  ivfTaskPartnerDishInventoryFixture,
  ivfTaskToDayOocytesCollection2Fixture,
  ivfTaskDaySignOffInseminationIVFFixture,
  ivfTaskDaySignOffChangeOverFixture,
  ivfTaskToDayOocytesCollectionWithZeroFixture,
  ivfTaskDay3CheckDashboardDayUpdateFixture,
  ivfTaskToDayOocytesCollectionForSpermWashFixture,
  ivfTaskToDayOocytesCollectionForSpermWashWithZeroOocyteCollectedFixture,
  ivfTaskToDayEggThawFixture,
  ivfTaskToDayMiiDay1CryoStrawDeletionFixture,
  ivfTaskToDayForDay5CheckExpandedEmbryoDeletionFixture,
  ivfTaskToDayForPIDLabelFixture,
  ivfTaskToDayForMiiDay1Fixture,
  ivfTaskToDayForMiiDay1ForDiscardedValidationFixture,
  ivfTaskToDayEggThawStrawSelectionVisibilityFixture,
  ivfTaskToDayOocyteCollectionStrawSelectionFixture,
} from '@libs/common/test/fixtures/ivf-task-to-day.fixture'
import {handleOptionalNumberValues} from '@libs/common'
import {ivfTaskPrintLabelFixture} from '@libs/common/test/fixtures'

class IvfTaskToDaySeed implements FixtureCreator {
  /** Common list for create and delete */
  fixturesToCreateAndDelete: Partial<IvfTaskToDay>[] = [
    ivfTaskToDayZeroIcsiInjectionFixture,
    ivfTaskToDayFixture,
    ivfTaskToDay2Fixture,
    ivfTaskToDay3Fixture,
    ivfTaskToDay4Fixture,
    ivfTaskToDayZeroPICSIFixture,
    ivfTaskToDayForVerifyHepBcHivFixture,
    ivfTaskToDayOocytesCollectionFixture,
    ivfTaskPostStrippingFixture,
    ivfTaskPostStrippingForCheckMaxCountFixture,
    ivfTaskDay5CheckFixture,
    ivfTaskDay3CheckFixture,
    ivfTaskDay6CheckFixture,
    ivfTaskFertilizationCheckFixture,
    ivfTaskMatureOocytePhotoFixture,
    ivfTaskMatureOocytePhotoDay2Fixture,
    ivfTaskEmbryoPhotoFixture,
    ivfTaskEmbryoFreezingOocytesFixture,
    ivfTaskPrintLabelFixture,
    ivfTaskDay7Fixture,
    ivfTaskDayFreezeEmrbyoFixture,
    ivfTaskDayFertilizationIVFFixture,
    ivfTaskDayFertilizationICSIFixture,
    ivfTaskDayCallPatientFixture,
    ivfTaskDaySetupWorksheetFixture,
    ivfTaskEmbryoDay2Fixture,
    ivfTaskJourneyWitnessFixture,
    ivfTaskDishInventoryFixture,
    ivfTaskPartnerDishInventoryFixture,
    ivfTaskToDayOocytesCollection2Fixture,
    ivfTaskDaySignOffInseminationIVFFixture,
    ivfTaskDaySignOffChangeOverFixture,
    ivfTaskToDayOocytesCollectionWithZeroFixture,
    ivfTaskToDayOocytesCollectionForSpermWashFixture,
    ivfTaskToDayOocytesCollectionForSpermWashWithZeroOocyteCollectedFixture,
    ivfTaskToDayEggThawFixture,
    ivfTaskDay3CheckDashboardDayUpdateFixture,
    ivfTaskToDayMiiDay1CryoStrawDeletionFixture,
    ivfTaskToDayForDay5CheckExpandedEmbryoDeletionFixture,
    ivfTaskToDayForPIDLabelFixture,
    ivfTaskToDayForMiiDay1Fixture,
    ivfTaskToDayForMiiDay1ForDiscardedValidationFixture,
    ivfTaskToDayEggThawStrawSelectionVisibilityFixture,
    ivfTaskToDayOocyteCollectionStrawSelectionFixture,
  ]

  ivfTaskToDay: Repository<IvfTaskToDay>

  constructor(dataSource: DataSource) {
    this.ivfTaskToDay = dataSource.getRepository(IvfTaskToDay)
  }

  async create(dataOverwrite: Partial<IvfTaskToDay>): Promise<void> {
    await this.ivfTaskToDay.save(this.setDefaultValues(dataOverwrite))
  }

  private setDefaultValues(dataOverwrite: Partial<IvfTaskToDay>): Partial<IvfTaskToDay> {
    return {
      id: dataOverwrite.id,
      day: dataOverwrite.day,
      task: dataOverwrite.task || IVFTaskType.InseminationIVF,
      order: handleOptionalNumberValues(dataOverwrite.order),
    }
  }

  async createArray(dataOverwrites: Partial<IvfTaskToDay>[]): Promise<void> {
    await this.ivfTaskToDay.save(
      dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite)),
    )
  }

  async createFixtures(): Promise<void> {
    const fixturesWithDefaultValues = this.fixturesToCreateAndDelete.map((fixture) =>
      this.setDefaultValues(fixture),
    )
    await this.ivfTaskToDay.save(fixturesWithDefaultValues)
  }

  async destroyFixtures(): Promise<void> {
    const ids = this.fixturesToCreateAndDelete.map((labInfo) => labInfo.id)
    await this.removeByIds(ids)
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.ivfTaskToDay.delete({id: In(ids)})
  }
}

export {IvfTaskToDaySeed}
