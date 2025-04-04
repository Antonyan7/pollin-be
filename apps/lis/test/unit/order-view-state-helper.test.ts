import {getOrderStateTestResultGeneration} from '@apps/lis/order/helper/order-view-state.helper'
import {DateTimeUtil} from '@libs/common/utils/date-time-util'
import {TestOrderAction} from '@libs/data-layer/apps/clinic-test/entities/typeorm'
import {
  SpecimenStatus,
  TestResultsGenerationStatusEnum,
} from '@libs/data-layer/apps/clinic-test/enums'
import {ServiceTypeWorkflow} from '@libs/data-layer/apps/scheduling/enums'
import {PatientMilestone} from '@libs/data-layer/apps/users/entities/typeorm/patient-milestone.entity'
import {ServiceTypeMethod} from '@libs/services-common/dto/service-type.dto'

const dateUtil = new DateTimeUtil()

// eslint-disable-next-line max-lines-per-function
describe('Helper function getOrderStateTestResultGeneration shows result generation details based on multiple conditions', () => {
  it('should not show result generation for Blood if specimen generation failed or not exists yet', () => {
    const mockedMilestone = {
      dominantAppointment: {
        serviceType: {
          superType: {
            specialWorkflow: ServiceTypeWorkflow.Blood,
          },
        },
        specimens: [], // Specimen generation failed
      },
    } as PatientMilestone

    const result = getOrderStateTestResultGeneration(mockedMilestone, null)
    expect(result).toBe(null)
  })

  it('should show result generation for Blood if specimen collection & generation was success', () => {
    const mockedMilestone = {
      dominantAppointment: {
        serviceType: {
          superType: {
            specialWorkflow: ServiceTypeWorkflow.Blood,
          },
        },
        specimens: [
          {
            id: 1,
            status: SpecimenStatus.Collected,
          },
        ],
        testResults: [
          {
            id: 1,
            createdAt: dateUtil.toDate('2024-01-01'),
          },
        ],
        testResultGenerationInProgress: false,
      },
    } as PatientMilestone

    const result = getOrderStateTestResultGeneration(mockedMilestone, null)
    expect(result.statusId).toBe(TestResultsGenerationStatusEnum.Success)
  })

  it('should show result generation for Diagnostic Imaging', () => {
    const mockedMilestone = {
      dominantAppointment: {
        serviceType: {
          superType: {
            specialWorkflow: ServiceTypeWorkflow.DiagnosticImaging,
          },
        },
        testResults: [
          {
            id: 1,
            createdAt: dateUtil.toDate('2024-01-01'),
          },
        ],
        testResultGenerationInProgress: false,
      },
    } as PatientMilestone

    const result = getOrderStateTestResultGeneration(mockedMilestone, null)
    expect(result.statusId).toBe(TestResultsGenerationStatusEnum.Success)
  })

  it('should show failed status Diagnostic Imaging if result generation failed', () => {
    const mockedMilestone = {
      dominantAppointment: {
        serviceType: {
          superType: {
            specialWorkflow: ServiceTypeWorkflow.DiagnosticImaging,
          },
        },
        testResults: [], // Result generation failed
        testResultGenerationInProgress: false,
      },
    } as PatientMilestone

    const result = getOrderStateTestResultGeneration(mockedMilestone, null)
    expect(result.statusId).toBe(TestResultsGenerationStatusEnum.Fail)
  })

  it('should return test generation for external appointment', () => {
    const mockedMilestone = {
      dominantAppointment: {
        serviceType: {
          type: ServiceTypeMethod.External,
          superType: {
            specialWorkflow: ServiceTypeWorkflow.Blood,
          },
        },
        testResults: [
          {
            id: 1,
            createdAt: dateUtil.toDate('2024-01-01'),
          },
        ],
      },
    } as PatientMilestone

    const orderAction = {
      testResultGenerationStatus: TestResultsGenerationStatusEnum.Success,
      lastTestResultGenerationOn: dateUtil.toDate('2024-01-01'),
    } as TestOrderAction

    const result = getOrderStateTestResultGeneration(mockedMilestone, orderAction)
    expect(result.statusId).toBe(TestResultsGenerationStatusEnum.Success)
  })
})
