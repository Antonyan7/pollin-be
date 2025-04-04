import {IvfDishBarcode} from '@libs/data-layer/apps/clinic-ivf/entities/ivf-dish-barcode.entity'
import {DataSource, Equal} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {BaseRepository} from '@libs/common'

@Injectable()
export class IvfDishBarcodeRepository extends BaseRepository<IvfDishBarcode> {
  constructor(public dataSource: DataSource) {
    super(IvfDishBarcode, dataSource.createEntityManager())
  }
  getById(id: number): Promise<IvfDishBarcode> {
    return this.findOne({
      where: {
        id: Equal(id),
      },
    })
  }
  async getByBarcode(barcode: string): Promise<IvfDishBarcode> {
    return await this.createQueryBuilder('ivfDishBarcode')
      .leftJoinAndSelect('ivfDishBarcode.patientPlanCohort', 'patientPlanCohort')
      .leftJoinAndSelect('patientPlanCohort.patientPlan', 'patientPlan')
      .leftJoinAndSelect('patientPlan.patient', 'patient')
      .leftJoinAndSelect('patient.detail', 'detail')
      .where('ivfDishBarcode.value = :barcode', {barcode})
      .getOne()
  }

  async readBarcodeForScan(barcode: string): Promise<IvfDishBarcode> {
    return this.findOne({
      where: {value: Equal(barcode)},
      relations: {
        patientPlanCohortIvfDish: {
          ivfDish: true,
          patientPlanCohort: {
            patientPlan: {
              patient: true,
            },
          },
        },
      },
    })
  }
}
