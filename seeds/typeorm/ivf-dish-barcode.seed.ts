import {FixtureCreator} from '@libs/common/interfaces/fixture.interface'
import {v4} from 'uuid'
import {DataSource, In, Repository} from 'typeorm'
import {IvfDishBarcode} from '@libs/data-layer/apps/clinic-ivf/entities/ivf-dish-barcode.entity'
import {
  ivfDishBarcodeFixture,
  ivfDishBarcodeScanDish1Fixture,
  ivfDishBarcodeScanDish2Fixture,
  ivfDishBarcodeScanDish3Fixture,
  ivfDishBarcodeScanDish4Fixture,
  ivfDishBarcodeForScan1Fixture,
  ivfDishBarcodeForScan2Fixture,
  ivfDishBarcodeForScan3Fixture,
  ivfDishBarcodePatientFixture,
  ivfDishBarcodeScanDishNotAssignedFixture,
  ivfDishBarcodeScanDishUnmatchedPatientFixture,
  ivfDishBarcodeUsedFixture,
  ivfDishBarcodePartnerFixture,
  ivfDishBarcodeNotRequiredFixture,
  ivfDishBarcodeForScanDiscardedDishFixture,
} from '@libs/common/test/fixtures'

class IvfDishBarcodeSeed implements FixtureCreator {
  repository: Repository<IvfDishBarcode>
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(IvfDishBarcode)
  }
  private setDefaultValues(dataOverwrite: Partial<IvfDishBarcode>): Partial<IvfDishBarcode> {
    return {
      id: dataOverwrite.id,
      uuid: dataOverwrite.uuid ?? v4(),
      value: dataOverwrite.value || null,
      patientPlanCohortId: dataOverwrite.patientPlanCohortId,
    }
  }
  private fixturesToCreateAndDelete = [
    ivfDishBarcodeFixture,
    ivfDishBarcodeForScan1Fixture,
    ivfDishBarcodeForScan2Fixture,
    ivfDishBarcodeForScan3Fixture,
    ivfDishBarcodeScanDish1Fixture,
    ivfDishBarcodeScanDish2Fixture,
    ivfDishBarcodeScanDish3Fixture,
    ivfDishBarcodeScanDish4Fixture,
    ivfDishBarcodePatientFixture,
    ivfDishBarcodeScanDishNotAssignedFixture,
    ivfDishBarcodeScanDishUnmatchedPatientFixture,
    ivfDishBarcodeUsedFixture,
    ivfDishBarcodePartnerFixture,
    ivfDishBarcodeNotRequiredFixture,
    ivfDishBarcodeForScanDiscardedDishFixture,
  ]
  findOneByUUID(uuid: string): Promise<IvfDishBarcode> {
    return this.repository.findOneBy({uuid})
  }
  async createFixtures(): Promise<void> {
    const fixturesWithDefaultValues = this.fixturesToCreateAndDelete.map((fixture) =>
      this.setDefaultValues(fixture),
    )
    await this.repository.save(fixturesWithDefaultValues)
  }

  async create(dataOverwrite: Partial<IvfDishBarcode>): Promise<IvfDishBarcode> {
    return this.repository.save(this.setDefaultValues(dataOverwrite))
  }
  async removeByIds(ids: number[]): Promise<void> {
    await this.repository.delete({id: In(ids)})
  }
  async destroyFixtures(): Promise<void> {
    await this.removeByIds(this.fixturesToCreateAndDelete.map(({id}) => id))
  }
}
export {IvfDishBarcodeSeed}
