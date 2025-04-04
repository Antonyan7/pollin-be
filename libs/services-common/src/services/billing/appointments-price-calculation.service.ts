import {Injectable} from '@nestjs/common'
import {NestprojectConfigService, StructuredLogger} from '@libs/common'
import {AppointmentRepository} from '@libs/data-layer/apps/scheduling/repositories/typeorm'
import {AppointmentAction, AppointmentFunction} from '@libs/common/enums'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {getPaymentValues} from '@libs/services-common/helpers/cart.helper'

@Injectable()
export class AppointmentsPriceCalculationService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly configService: NestprojectConfigService,
  ) {}

  /**@returns true if the price was updated */
  async updateAppointmentPrice(appointmentId: number): Promise<boolean> {
    try {
      const appointment = await this.appointmentRepository
        .createQueryBuilder('appointment')
        .select([
          'appointment.id',
          'appointment.totalAmount',
          'appointment.lockedPrice',
          'serviceType.id',
          'serviceType.taxable',
          'patientMilestones.id',
          'milestoneToTestTypesOrPanels.id',
          'milestoneToTestTypesOrPanels.lockedPrice',
          'testType.id',
          'testType.taxable',
          'testPanel.id',
          'testPanel.taxable',
        ])
        .leftJoin('appointment.serviceType', 'serviceType')
        .leftJoin('appointment.patientMilestones', 'patientMilestones')
        .leftJoin('patientMilestones.milestoneToTestTypesOrPanels', 'milestoneToTestTypesOrPanels')
        .leftJoin('milestoneToTestTypesOrPanels.testType', 'testType')
        .leftJoin('milestoneToTestTypesOrPanels.testPanel', 'testPanel')
        .where('appointment.id = :appointmentId', {appointmentId})
        .getOne()
      if (!appointment) {
        throw new Error('Appointment not found')
      }

      let totalAmount = 0
      const tax = this.configService.get<number>('TAX')

      const {total: serviceTypeTotal} = getPaymentValues(
        Number(appointment.lockedPrice),
        tax,
        appointment.serviceType.taxable,
      )
      totalAmount += Number(serviceTypeTotal)

      appointment.patientMilestones
        .flatMap((milestone) => milestone.milestoneToTestTypesOrPanels)
        .forEach(({testType, testPanel, lockedPrice}) => {
          const item = testType || testPanel
          if (!item) {
            StructuredLogger.error(
              AppointmentFunction.UpdateAppointmentPrice,
              AppointmentAction.NoTestsInsideMilestone,
              {
                appointmentId,
              },
            )
            return
          }

          const {total} = getPaymentValues(Number(lockedPrice), tax, item.taxable)

          totalAmount += Number(total)
        })

      const totalAmountString = totalAmount.toFixed(2)
      if (totalAmountString !== appointment.totalAmount) {
        await this.appointmentRepository.update(appointmentId, {totalAmount: totalAmountString})

        return true
      }

      return false
    } catch (error) {
      handleError(error, {
        functionName: AppointmentFunction.UpdateAppointmentPrice,
        eventName: AppointmentAction.UpdateAppointmentPriceFailed,
        data: {appointmentId},
      })
    }
  }
}
