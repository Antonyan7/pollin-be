import {Injectable} from '@nestjs/common'
import {DateTimeUtil, StructuredLogger, NestprojectConfigService} from '@libs/common'
import {getAuditTrailRequestMetadata} from '@libs/services-common/helpers/async-hook'
import PubSubHelpers from '@libs/common/helpers/pubsub.helper'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {PatientPlanRepository} from '@libs/data-layer/apps/plan/repositories'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {generateRevisionId} from '../helpers/audit-trail.helper'
import {PatientPlanToTestTypeProcedure} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-to-test-type-procedure.entity'
import {
  PatientPlan,
  PatientPlanDetail,
  PatientPlanEmbryoTypeTransferInstruction,
  PatientPlanLabInstruction,
  PatientPlanSheet,
  PatientPlanSheetAdditionalDay,
  PlanInitialResult,
  PlanMedication,
} from '@libs/data-layer/apps/plan/entities/typeorm'
import {AuditTrailCollection, AuditUserAction} from '@libs/services-common/enums'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {Patient, PatientNote} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPlanSpermSource} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-sperm-source.entity'
import {
  PatientPlanCohort,
  PatientPlanCohortIvfTaskGroup,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhoto,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {PatientPlanChecklistItem} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-checklist-item.entity'
import {PatientPlanLutealSupportItem} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-luteal-support-item.entity'
import {PatientPlanAlert} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-alert.entity'
import {PatientPlanSheetAction} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-sheet-action.entity'
import {PatientPlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-addon.entity'

@Injectable()
export class PatientPlanAuditTrailService {
  private dateTimeUtil = new DateTimeUtil(this.configService.get<string>('DEFAULT_TIME_ZONE'))

  constructor(
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly configService: NestprojectConfigService,
  ) {}

  async addPatientPlanAuditById(
    patientPlanId: number,
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    if (!patientPlanId) {
      return
    }

    const patientPlanData = await this.patientPlanRepository.findOneById(patientPlanId)

    const latestData = JSON.stringify(patientPlanData)
    const revisionId = generateRevisionId(this.dateTimeUtil.now())
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all([
      this.patientPlanRepository.update(
        {id: patientPlanId},
        {revisionId, updatedBy: user.authUserId},
      ),
      this.pushToPubSub({
        authUserId: user.authUserId,
        userAction,
        revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.PatientPlanRevisions,
      }),
    ])
  }

  async addPatientPlanAudit(
    patientPlan: PatientPlan,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const latestData = JSON.stringify(patientPlan)
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.pushToPubSub({
        authUserId: staff.authUserId,
        userAction,
        revisionId: patientPlan.revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.PatientPlanRevisions,
      }),
    ])
  }

  async addPatientPlanSheetAudit(
    patientPlanSheet: PatientPlanSheet,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const latestData = JSON.stringify(patientPlanSheet)
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all([
      this.pushToPubSub({
        authUserId: staff.authUserId,
        userAction,
        revisionId: patientPlanSheet.revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.PatientPlanSheetRevisions,
      }),
    ])
  }

  async addPatientPlanDetailAudit(
    patientPlanDetail: PatientPlanDetail,
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const latestData = JSON.stringify(patientPlanDetail)
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all([
      this.pushToPubSub({
        authUserId: user.authUserId,
        userAction,
        revisionId: patientPlanDetail.revisionId,
        latestData,
        authUserName,
        tableUpdated: AuditTrailCollection.PatientPlanDetailRevisions,
      }),
    ])
  }

  async addPatientPlanToTestTypeProceduresAudit(
    patientPlanToTestTypeProcedures: PatientPlanToTestTypeProcedure[],
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      patientPlanToTestTypeProcedures.map(async (patientPlanToTestTypeProcedure) =>
        this.pushToPubSub({
          authUserId: user.authUserId,
          userAction,
          revisionId: patientPlanToTestTypeProcedure.revisionId,
          latestData: JSON.stringify(patientPlanToTestTypeProcedure),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanToTestTypeProcedureRevisions,
        }),
      ),
    )
  }

  async addPatientPlanAddonsAudit(
    patientPlanAddons: PatientPlanAddon[],
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      patientPlanAddons.map(async (patientPlanAddon) =>
        this.pushToPubSub({
          authUserId: user.authUserId,
          userAction,
          revisionId: patientPlanAddon.revisionId,
          latestData: JSON.stringify(patientPlanAddon),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanAddonRevisions,
        }),
      ),
    )
  }

  async addPatientPlanSpermSourcesAudit(
    spermSources: PatientPlanSpermSource[],
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    if (!spermSources.length) {
      return
    }

    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      spermSources.map(async (spermSource) =>
        this.pushToPubSub({
          authUserId: user.authUserId,
          userAction,
          revisionId: spermSource.revisionId,
          latestData: JSON.stringify(spermSource),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanSpermSourceRevisions,
        }),
      ),
    )
  }

  async addPatientPlanLabInstructionsAudit(
    labInstructions: PatientPlanLabInstruction[],
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    if (!labInstructions?.length) {
      return
    }

    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      labInstructions.map(async (labInstruction) =>
        this.pushToPubSub({
          authUserId: user.authUserId,
          userAction,
          revisionId: labInstruction.revisionId,
          latestData: JSON.stringify(labInstruction),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanLabInstructionRevisions,
        }),
      ),
    )
  }

  async addPatientPlanLutealSupportItemAudit(
    lutealSupportItems: Partial<PatientPlanLutealSupportItem>[],
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      lutealSupportItems.map(async (item) =>
        this.pushToPubSub({
          authUserId: user.authUserId,
          userAction,
          revisionId: item.revisionId,
          latestData: JSON.stringify(item),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanLutealSupportItemRevisions,
        }),
      ),
    )
  }

  async addPatientPlanEmbryoTypeTransferInstructionAudit(
    instructions: PatientPlanEmbryoTypeTransferInstruction[],
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)

    await Promise.all(
      instructions.map(async (instruction) =>
        this.pushToPubSub({
          authUserId: user.authUserId,
          userAction,
          revisionId: instruction.revisionId,
          latestData: JSON.stringify(instruction),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanEmbryoTypeTransferInstructionRevisions,
        }),
      ),
    )
  }

  async addPatientPlanMedicationAudit(
    planMedications: PlanMedication[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all(
      planMedications.map(async (planMedication) => {
        const latestData = JSON.stringify(planMedication)

        await this.pushToPubSub({
          authUserId: staff.authUserId,
          userAction,
          revisionId: planMedication.revisionId,
          latestData,
          authUserName,
          tableUpdated: AuditTrailCollection.PlanMedicationRevisions,
        })
      }),
    )
  }

  async addPatientPlanInitialResultsAudit(
    planInitialResults: PlanInitialResult[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all(
      planInitialResults.map(async (planInitialResult) => {
        const latestData = JSON.stringify(planInitialResult)

        await this.pushToPubSub({
          authUserId: staff.authUserId,
          userAction,
          revisionId: planInitialResult.revisionId,
          latestData,
          authUserName,
          tableUpdated: AuditTrailCollection.PlanInitialResultRevisions,
        })
      }),
    )
  }

  async addPatientNotesAudit(
    patientNotes: PatientNote[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all(
      patientNotes.map(async (note) => {
        const latestData = JSON.stringify(note)

        await this.pushToPubSub({
          authUserId: staff.authUserId,
          userAction,
          revisionId: note.revisionId,
          latestData,
          authUserName,
          tableUpdated: AuditTrailCollection.PatientNoteRevisions,
        })
      }),
    )
  }

  async addPatientPlanMatureOocytesPhotosAudit(
    groupPhotos: PatientPlanCohortIvfTaskMatureOocyteGroupPhoto[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all(
      groupPhotos.map(async (groupPhoto) => {
        const latestData = JSON.stringify(groupPhoto)

        await this.pushToPubSub({
          authUserId: staff.authUserId,
          userAction,
          revisionId: groupPhoto.revisionId,
          latestData,
          authUserName,
          tableUpdated:
            AuditTrailCollection.PatientPlanCohortIvfTaskMatureOocyteGroupPhotoRevisions,
        })
      }),
    )
  }

  async addPatientPlanSheetAdditionalDayAudit(
    additionalDay: PatientPlanSheetAdditionalDay,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)
    const latestData = JSON.stringify(additionalDay)

    await this.pushToPubSub({
      authUserId: staff.authUserId,
      userAction,
      revisionId: additionalDay.revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPlanSheetAdditionalDayRevisions,
    })
  }

  async addPatientPlanChecklistItemAudit(
    item: PatientPlanChecklistItem,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)
    const latestData = JSON.stringify(item)

    await this.pushToPubSub({
      authUserId: staff.authUserId,
      userAction,
      revisionId: item.revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPlanChecklistItemRevisions,
    })
  }

  async addPatientPlanCohortAudit(
    patientPlanCohort: PatientPlanCohort,
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    const authUserName = getFullName(staff.firstName, staff.lastName)
    const latestData = JSON.stringify(patientPlanCohort)

    await this.pushToPubSub({
      authUserId: staff.authUserId,
      userAction,
      revisionId: patientPlanCohort.revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPlanCohortRevisions,
    })
  }

  async addPatientPlanCohortIvfTaskGroupsAudit(
    taskGroups: PatientPlanCohortIvfTaskGroup[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    if (!taskGroups?.length) {
      return
    }

    const authUserName = getFullName(staff.firstName, staff.lastName)

    await Promise.all(
      taskGroups.map((taskGroup) =>
        this.pushToPubSub({
          authUserId: staff.authUserId,
          userAction,
          revisionId: taskGroup.revisionId,
          latestData: JSON.stringify(taskGroup),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanCohortIvfTaskGroupRevisions,
        }),
      ),
    )
  }

  async addPatientPlanSheetActionAudit(
    actions: PatientPlanSheetAction[],
    userAction: AuditUserAction,
    staff: Staff,
  ): Promise<void> {
    if (!actions?.length) {
      return
    }

    const authUserName = getFullName(staff.firstName, staff.lastName)
    await Promise.all(
      actions.map((action) =>
        this.pushToPubSub({
          authUserId: staff.authUserId,
          userAction,
          revisionId: action.revisionId,
          latestData: JSON.stringify(action),
          authUserName,
          tableUpdated: AuditTrailCollection.PatientPlanSheetActionRevisions,
        }),
      ),
    )
  }

  async addPatientPlanAlertAudit(
    item: PatientPlanAlert,
    userAction: AuditUserAction,
    user: Staff | Patient,
  ): Promise<void> {
    const authUserName = getFullName(user.firstName, user.lastName)
    const latestData = JSON.stringify(item)

    await this.pushToPubSub({
      authUserId: user.authUserId,
      userAction,
      revisionId: item.revisionId,
      latestData,
      authUserName,
      tableUpdated: AuditTrailCollection.PatientPlanAlertRevisions,
    })
  }

  private async pushToPubSub({
    authUserId,
    userAction,
    revisionId,
    latestData,
    authUserName,
    tableUpdated,
  }: {
    authUserId: string
    userAction: AuditUserAction
    revisionId: string
    latestData: string
    authUserName: string
    tableUpdated: AuditTrailCollection
  }): Promise<void> {
    const {deviceId, requestId, ipAddress} = getAuditTrailRequestMetadata()
    await PubSubHelpers.publishEmrDataChanged({
      revisionId,
      requestId,
      deviceId,
      authUserId,
      ipAddress,
      authUserName,
      dataUpdateDateTime: this.dateTimeUtil.nowInISOString(),
      userAction: userAction,
      latestData,
      tableUpdated,
    })
    StructuredLogger.info(
      activityLogs.AuditTrailServiceFunctions.AddAuditTrailPatientPlan,
      activityLogs.AuditTrailServiceActions.AuditTrailActivity,
      {
        authUserId,
        deviceId,
        requestId,
        userAction,
        tableUpdated,
      },
    )
  }
}
