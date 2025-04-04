import {getOrderStateSpecimenGeneration} from '@apps/lis/order/helper/order-specimen.helper'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'

describe('Helper Function: getOrderStateSpecimenGeneration', () => {
  it('should not show specimen generation for Ultrasound appointment/milestone', () => {
    const milestoneForUltrasound = {
      id: 1,
      uuid: 'mock',
      dominantAppointment: {
        serviceType: {
          superType: {
            specialWorkflow: ServiceTypeWorkflow.DiagnosticImaging,
          },
        },
      },
    } as PatientMilestone

    const result = getOrderStateSpecimenGeneration(milestoneForUltrasound)
    expect(result).toBe(null)
  })
})
