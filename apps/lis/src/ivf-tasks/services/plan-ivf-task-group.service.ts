import {Injectable} from '@nestjs/common'
import {handleError} from '@libs/services-common/helpers/error-handling'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {
  PatientPlanCohortIvfTaskGroupRepository,
  PatientPlanCohortRepository,
} from '@libs/data-layer/apps/clinic-ivf/repositories/typeorm'
import {
  GetPlanIVFLabTaskGroupsResponseDTO,
  PlanIVFLabTaskGroup,
} from '@apps/lis/ivf-tasks/dto/plan-ivf-tasks.dto'
import {getGroupTitle} from '@apps/lis/ivf-tasks/helper/ivf-task.helper'
import {Equal} from 'typeorm'
import {PatientPlanCohort} from '@libs/data-layer/apps/clinic-ivf/entities'
import {BadRequestException} from '@libs/services-common/exceptions'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {IVFLabStatus} from '@libs/data-layer/apps/clinic-ivf/enums'
import {handleOptionalStringValues, StructuredLogger} from '@libs/common'
import {IvfIVFLabStatusService} from '@apps/lis/ivf-patients/services/ivf-cohort-status.service'
import {getFullName} from '@libs/common/helpers/patient.helper'

@Injectable()
export class PlanIvfTasksService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly patientPlanCohortIvfTaskGroupRepository: PatientPlanCohortIvfTaskGroupRepository,
    private readonly patientPlanCohortRepository: PatientPlanCohortRepository,
    private readonly ivfIVFLabStatusService: IvfIVFLabStatusService,
    private readonly i18nService: I18nLocalizationService,
  ) {}

  async getCohortByPatientPlanUuid(patietnPlanUuid: string): Promise<PatientPlanCohort> {
    return this.patientPlanCohortRepository.findOne({
      select: {
        id: true,
        cancellationReason: {
          id: true,
          uuid: true,
          reason: true,
        },
        cancellationComment: true,
      },
      where: {
        spawnedFromPatientPlanCohortId: null,
        patientPlan: {
          uuid: Equal(patietnPlanUuid),
        },
      },
      relations: {
        patientPlan: true,
        cancellationReason: true,
      },
    })
  }

  async getIVFLabTaskGroup(patientPlanUuid: string): Promise<PlanIVFLabTaskGroup[]> {
    try {
      const ivfTaskGroups =
        await this.patientPlanCohortIvfTaskGroupRepository.findWithPatientPlanUuid(patientPlanUuid)

      return ivfTaskGroups.map((group) => ({
        id: group.uuid,
        title: getGroupTitle(group.day),
      }))
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.GetIVFLabTaskGroup,
        eventName: activityLogs.IvfTasksActions.GetIVFLabTaskGroupFailed,
      })
    }
  }

  async findMainAndSpawnedCohorts(
    patientPlanUuid: string,
  ): Promise<{mainCohort: PatientPlanCohort; spawnedCohort: PatientPlanCohort}> {
    try {
      const cohorts =
        await this.patientPlanCohortRepository.findWithPatientPlanUuid(patientPlanUuid)
      const mainCohort = cohorts.find((cohort) => cohort.spawnedFromPatientPlanCohortId === null)
      const spawnedCohort = cohorts.find((cohort) => cohort.spawnedFromPatientPlanCohortId !== null)
      return {mainCohort, spawnedCohort}
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.GetIVFLabTaskGroup,
        eventName: activityLogs.IvfTasksActions.GetIVFLabTaskGroupFailed,
      })
    }
  }

  async getIVFLabTaskGroups(patientPlanUuid: string): Promise<GetPlanIVFLabTaskGroupsResponseDTO> {
    try {
      const {mainCohort, spawnedCohort} = await this.findMainAndSpawnedCohorts(patientPlanUuid)

      if (!mainCohort) {
        throw new BadRequestException(this.i18nService.translate(i18Messages.COHORT_NOT_FOUND))
      }

      const mainCohortTasks = await this.getIVFLabTaskGroup(mainCohort.uuid)
      const cohorts = [
        {
          id: mainCohort.uuid,
          isMain: true,
          taskGroups: mainCohortTasks,
        },
      ]

      if (spawnedCohort) {
        const spawnedCohortTasks = await this.getIVFLabTaskGroup(spawnedCohort.uuid)
        cohorts.push({
          id: spawnedCohort.uuid,
          isMain: false,
          taskGroups: spawnedCohortTasks,
        })
      }

      return {
        ivfStatus: mainCohort.patientPlan.ivfLabStatus,
        ...(await this.getMetadata(mainCohort, spawnedCohort)),
        cohorts,
      }
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.IvfTasksFunctions.GetIVFLabTaskGroup,
        eventName: activityLogs.IvfTasksActions.GetIVFLabTasksFailed,
      })
    }
  }
  private async getMetadata(
    mainCohort: PatientPlanCohort,
    spawnedCohort: PatientPlanCohort | null,
  ): Promise<Partial<GetPlanIVFLabTaskGroupsResponseDTO>> {
    if (mainCohort.patientPlan.ivfLabStatus === IVFLabStatus.Completed) {
      const completionMetadata = await this.ivfIVFLabStatusService.getCompletionMetadata(
        mainCohort.patientPlan.uuid,
      )

      if (!completionMetadata.error) {
        const ivfWitnessStaff = mainCohort.patientPlan.ivfWitnessByStaff
        const embryologistFreezingStaff = mainCohort.patientPlan.embryologistFreezingByStaff
        const journeyWitness =
          mainCohort.patientPlanCohortIvfTaskDetails?.journeyWitness ||
          spawnedCohort?.patientPlanCohortIvfTaskDetails?.journeyWitness
        if (journeyWitness) {
          return {
            cancellationMetadata: null,
            completionMetadata: {
              details: completionMetadata.details,
              type: completionMetadata.type,
              comment: handleOptionalStringValues(mainCohort.completionComment),
              witness: journeyWitness,
            },
          }
        } else if (ivfWitnessStaff && embryologistFreezingStaff) {
          return {
            cancellationMetadata: null,
            completionMetadata: {
              details: completionMetadata.details,
              type: completionMetadata.type,
              comment: handleOptionalStringValues(mainCohort.completionComment),
              ivfWitnessByStaff: {
                id: ivfWitnessStaff.uuid,
                fullName: getFullName(ivfWitnessStaff.firstName, ivfWitnessStaff.lastName),
              },
              embryologistFreezingByStaff: {
                id: embryologistFreezingStaff.uuid,
                fullName: getFullName(
                  embryologistFreezingStaff.firstName,
                  embryologistFreezingStaff.lastName,
                ),
              },
            },
          }
        } else {
          return {
            cancellationMetadata: null,
            completionMetadata: {
              details: completionMetadata.details,
              type: completionMetadata.type,
              comment: handleOptionalStringValues(mainCohort.completionComment),
              witness: null,
              ivfWitnessByStaff: null,
              embryologistFreezingByStaff: null,
            },
          }
        }
      } else {
        StructuredLogger.warn(
          activityLogs.IvfPlanTaskGroupFunctions.GetIvfPatientsDTO,
          activityLogs.IvfPlanTaskGroupActions.AdditionalEmbryoAfterCompletion,
          {message: `Cohort edited after completion`},
        )
      }
    } else if (mainCohort.patientPlan.ivfLabStatus === IVFLabStatus.Cancelled) {
      return {
        completionMetadata: null,
        cancellationMetadata: {
          reasonForCancellation: handleOptionalStringValues(mainCohort.cancellationReason?.reason),
          comment: handleOptionalStringValues(mainCohort.cancellationComment),
        },
      }
    }
  }
}
