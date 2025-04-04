import {In, DataSource, Repository, IsNull} from 'typeorm'
import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {IvfDishToIvfTaskGroup} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ivfDishToIvfTaskGroupFixture,
  ivfDishToIvfTaskGroupScanBarcodeFixture,
  ivfDishToIvfTaskGroupPartnerDishInventoryFixture,
  ivfDishToIvfTaskGroupScanDishDay0_1Fixture,
  ivfDishToIvfTaskGroupScanDishDay0Fixture,
  ivfDishToIvfTaskGroupScanDishDay1_1Fixture,
  ivfDishToIvfTaskGroupScanDishDay1_2Fixture,
  ivfDishToIvfTaskGroupScanDishDay1Fixture,
  ivfDishToIvfTaskGroupScanDishPrepDayFixture,
  ivfDishToIvfTaskGroupScanDishNotAssignedFixture,
  ivfDishToIvfTaskGroupScanDishPatientFixture,
  ivfDishToIvfTaskGroupWitnessingChecklistFixture,
  ivfDishToIvfTaskGroupForPartnerBarcodeFixture,
  ivfDishToIvfTaskGroupForDiscardBarcodeFixture,
} from '@libs/common/test/fixtures/ivf-dish-to-ivf-task-group.fixture'

class IvfDishToIvfTaskGroupSeed implements FixtureCreator {
  fixturesToCreateAndDelete: Partial<IvfDishToIvfTaskGroup>[] = [
    ivfDishToIvfTaskGroupFixture,
    ivfDishToIvfTaskGroupScanBarcodeFixture,
    ivfDishToIvfTaskGroupPartnerDishInventoryFixture,
    ivfDishToIvfTaskGroupScanDishPrepDayFixture,
    ivfDishToIvfTaskGroupScanDishDay0Fixture,
    ivfDishToIvfTaskGroupScanDishDay0_1Fixture,
    ivfDishToIvfTaskGroupScanDishDay1Fixture,
    ivfDishToIvfTaskGroupScanDishDay1_1Fixture,
    ivfDishToIvfTaskGroupScanDishDay1_2Fixture,
    ivfDishToIvfTaskGroupScanDishNotAssignedFixture,
    ivfDishToIvfTaskGroupScanDishPatientFixture,
    ivfDishToIvfTaskGroupWitnessingChecklistFixture,
    ivfDishToIvfTaskGroupForPartnerBarcodeFixture,
    ivfDishToIvfTaskGroupForDiscardBarcodeFixture,
  ]

  ivfDishToIvfTaskGroup: Repository<IvfDishToIvfTaskGroup>

  constructor(dataSource: DataSource) {
    this.ivfDishToIvfTaskGroup = dataSource.getRepository(IvfDishToIvfTaskGroup)
  }

  async create(dataOverwrite: Partial<IvfDishToIvfTaskGroup>): Promise<void> {
    await this.ivfDishToIvfTaskGroup.save(this.setDefaultValues(dataOverwrite))
  }

  private setDefaultValues(
    dataOverwrite: Partial<IvfDishToIvfTaskGroup>,
  ): Partial<IvfDishToIvfTaskGroup> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid,
      patientPlanCohortIvfTaskGroupId: dataOverwrite.patientPlanCohortIvfTaskGroupId,
      ivfDishId: dataOverwrite.ivfDishId,
      required: dataOverwrite.required || null,
      scannedDate: dataOverwrite.scannedDate || null,
      scannedById: dataOverwrite.scannedById || null,
    }
  }

  async findOneByDateCohortIdDishId(
    date: string,
    patientPlanCohortId: number,
    ivfDishId: number,
  ): Promise<IvfDishToIvfTaskGroup> {
    return this.ivfDishToIvfTaskGroup.findOne({
      where: {ivfDishId, patientPlanCohortIvfTaskGroup: {date, patientPlanCohortId}},
    })
  }
  async createArray(dataOverwrites: Partial<IvfDishToIvfTaskGroup>[]): Promise<void> {
    await this.ivfDishToIvfTaskGroup.save(
      dataOverwrites.map((dataOverwrite) => this.setDefaultValues(dataOverwrite)),
    )
  }

  async createFixtures(): Promise<void> {
    const fixturesWithDefaultValues = this.fixturesToCreateAndDelete.map((fixture) =>
      this.setDefaultValues(fixture),
    )
    await this.ivfDishToIvfTaskGroup.save(fixturesWithDefaultValues)
  }

  async destroyFixtures(): Promise<void> {
    const ids = this.fixturesToCreateAndDelete.map((labInfo) => labInfo.id)
    await this.removeByIds(ids)
  }

  async removeByIds(ids: number[]): Promise<void> {
    await this.ivfDishToIvfTaskGroup.delete({id: In(ids)})
  }

  async findNotScanned(): Promise<IvfDishToIvfTaskGroup[]> {
    return this.ivfDishToIvfTaskGroup.find({where: {scannedDate: IsNull()}})
  }
}

export {IvfDishToIvfTaskGroupSeed}
