import {Injectable} from '@nestjs/common'
import {DateTimeUtil, NestprojectConfigService, StructuredLogger} from '@libs/common'
import {
  ConsentModuleRepository,
  PatientCommonRepository,
  PatientConsentModuleRepository,
  PatientConsentPackageRepository,
  PatientConsentPackageSignatoryRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  ConsentModule,
  Patient,
  PatientConsentModule,
  PatientConsentPackage,
  PatientConsentPackageSignatory,
} from '@libs/data-layer/apps/users/entities/typeorm'
import {AuditUserAction} from '@libs/services-common/enums'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {ConsentActions, ConsentFunctions} from '@libs/common/enums/active-logs/consent'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {PatientPlanRepository, PlanAddonRepository} from '@libs/data-layer/apps/plan/repositories'
import {
  ConsentModuleRelationType,
  ConsentModuleRelationTypeLabel,
  ConsentPackageSourceType,
  ConsentPackageStatus,
} from '@libs/data-layer/apps/users/enum'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {getConsentTitle} from '@libs/common/helpers/consents.helper'
import {ConsentsMilestoneService} from './consent-milestone.service'
import {PatientConsentAuditTrailService} from '@libs/audit-trail/services/patient-consent-audit-trail.service'
import {ConsentsQuestionnaireService} from './consent-questionnaire.service'
import {ConsentsHistoryService} from './consent-history.service'
import {SpermSourceV2} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PlanAddon} from '@libs/data-layer/apps/plan/entities/typeorm/plan-addons.entity'

type ModuleInfo = {
  consentModuleId: number
  relationType: ConsentModuleRelationType
}

@Injectable()
export class PlanConsentsGenerationService {
  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )
  private readonly contributorRelationTypes = new Set([
    ConsentModuleRelationType.EggContributor,
    ConsentModuleRelationType.SpermContributor,
    ConsentModuleRelationType.UterusContributor,
  ])

  // eslint-disable-next-line max-params
  constructor(
    private readonly configService: NestprojectConfigService,
    private readonly patientPlanRepository: PatientPlanRepository,
    private readonly patientConsentPackageRepository: PatientConsentPackageRepository,
    private readonly planAddonRepository: PlanAddonRepository,
    private readonly patientCommonRepository: PatientCommonRepository,
    private readonly consentModuleRepository: ConsentModuleRepository,
    private readonly patientConsentModuleRepository: PatientConsentModuleRepository,
    private readonly patientConsentPackageSignatoryRepository: PatientConsentPackageSignatoryRepository,

    private readonly patientConsentAuditTrailService: PatientConsentAuditTrailService,
    private readonly consentsMilestoneService: ConsentsMilestoneService,
    private readonly consentsQuestionnaireService: ConsentsQuestionnaireService,
    private readonly consentHistoryService: ConsentsHistoryService,
  ) {}

  async generateConsentPackage(
    patientPlanId: number,
    patient: Patient,
    staff?: Staff,
  ): Promise<string> {
    try {
      const patientPlan =
        await this.patientPlanRepository.findOneForConsentGenerationById(patientPlanId)

      const modulesInfo = await this.getModulesInfo(patientPlan)

      const relationTypes = this.getUniqueRelationTypes(modulesInfo)
      if (!relationTypes.size) {
        StructuredLogger.info(
          ConsentFunctions.GenerateConsentPackage,
          ConsentActions.ConsentPackageGenerationNotRequired,
          {patientId: patient.id},
        )
        return
      }

      const uniqueModulesInfo = this.getUniqueModuleIds(modulesInfo)

      const [signatoriesIdToRelationTypes, consentTitle] = await Promise.all([
        this.getSignatories(patientPlan, patient, relationTypes),
        this.getConsentPackageTitle(uniqueModulesInfo),
      ])

      const activeSignatoriesIds = Array.from(signatoriesIdToRelationTypes, ([id]) => id).filter(
        (signingPatientId) =>
          !relationTypes.has(ConsentModuleRelationType.Patient) || signingPatientId === patient.id,
      )

      const sentDate = this.dateTimeUtil.now()
      const patientConsentPackage = await this.patientConsentPackageRepository.save({
        patientId: patient.id,
        patientPlanId: patientPlan.id,
        status: activeSignatoriesIds.includes(patient.id)
          ? ConsentPackageStatus.Incomplete
          : ConsentPackageStatus.PendingPartnerCompletion,
        title: consentTitle,
        sourceType: ConsentPackageSourceType.GeneratedFromPlan,
        sentDate,

        updatedByStaffId: staff?.id,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
      })

      const [patientModules, packageSignatories] = await Promise.all([
        this.savePatientConsentModules({uniqueModulesInfo, patientConsentPackage, staff}),
        this.saveSignatories({
          signatoriesIdToRelationTypes,
          activeSignatoriesIds,
          patientConsentPackage,
          staff,
        }),
        this.consentHistoryService.saveStatusHistory({
          patientConsentPackage: patientConsentPackage,
          staff,
          newStatus: patientConsentPackage.status,
          oldStatus: null,
        }),
      ])

      await Promise.all([
        Promise.all(
          activeSignatoriesIds.map((signingPatientId) =>
            this.consentsMilestoneService.createForConsentPackage(
              signingPatientId,
              patientConsentPackage,
              staff ?? patient,
            ),
          ),
        ),
        this.patientConsentAuditTrailService.addPatientPackageConsentAudit(
          [patientConsentPackage],
          staff ?? patient,
          AuditUserAction.Create,
        ),
        this.patientConsentAuditTrailService.addPatientConsentModuleAudit(
          patientModules,
          staff ?? patient,
          AuditUserAction.Create,
        ),
        this.patientConsentAuditTrailService.addPatientConsentPackageSignatoryAudit(
          packageSignatories,
          staff ?? patient,
          AuditUserAction.Create,
        ),

        this.consentsQuestionnaireService.createPatientConsentQuestionnaireBySignatures(
          patientConsentPackage,
          signatoriesIdToRelationTypes,
        ),
      ])

      return patientConsentPackage.uuid
    } catch (error) {
      handleError(error, {
        functionName: ConsentFunctions.GenerateConsentPackage,
        eventName: ConsentActions.GenerateConsentPackageFailed,
      })
    }
  }

  private async getModulesInfo(patientPlan: PatientPlan): Promise<ModuleInfo[]> {
    const planAddons = await this.getConsentPlanAddons(patientPlan)

    return [
      ...patientPlan.planType.planTypeConsentModules.map(({consentModuleId, relationType}) => ({
        consentModuleId,
        relationType,
      })),
      ...planAddons.flatMap((planAddon) =>
        planAddon.consentModulesRelations.map(({consentModuleId, relationType}) => ({
          consentModuleId,
          relationType,
        })),
      ),
      ...patientPlan.planMedications.flatMap(({medication}) =>
        medication.consentModulesRelations.map(({consentModuleId}) => ({
          consentModuleId,
          relationType: ConsentModuleRelationType.Patient,
        })),
      ),
    ]
  }

  private async getSignatories(
    patientPlan: PatientPlan,
    patient: Patient,
    relationTypes: Set<ConsentModuleRelationType>,
  ): Promise<Map<number, ConsentModuleRelationType[]>> {
    const signatoriesIdToRelationTypes = new Map<number, ConsentModuleRelationType[]>()

    const addSignatory = (contributorId: number, type: ConsentModuleRelationType): void => {
      if (!contributorId) {
        return
      }

      const existingTypes = signatoriesIdToRelationTypes.get(contributorId) || []
      signatoriesIdToRelationTypes.set(contributorId, [...existingTypes, type])
    }

    if (relationTypes.has(ConsentModuleRelationType.Patient)) {
      addSignatory(patient.id, ConsentModuleRelationType.Patient)
    }

    if (relationTypes.has(ConsentModuleRelationType.Partners)) {
      const partners = await this.patientCommonRepository.findPartners(patient.id)
      partners.forEach((patient) => {
        addSignatory(patient.id, ConsentModuleRelationType.Partners)
      })
    }

    if (relationTypes.has(ConsentModuleRelationType.EggContributor)) {
      addSignatory(patientPlan.detail.oocytePatientId, ConsentModuleRelationType.EggContributor)
    }

    if (relationTypes.has(ConsentModuleRelationType.UterusContributor)) {
      addSignatory(
        patientPlan.detail.uterusContributorId,
        ConsentModuleRelationType.UterusContributor,
      )
    }

    if (relationTypes.has(ConsentModuleRelationType.SpermContributor)) {
      const uniquieContributorIds = [
        ...new Set(patientPlan.spermSources.map((spermSource) => spermSource.spermContributorId)),
      ]

      uniquieContributorIds.forEach((contributorId) => {
        addSignatory(contributorId, ConsentModuleRelationType.SpermContributor)
      })
    }

    StructuredLogger.info(
      ConsentFunctions.GenerateConsentPackage,
      ConsentActions.GetSignatoriesToRelationTypes,
      {signatoriesToRelations: signatoriesIdToRelationTypes},
    )

    return signatoriesIdToRelationTypes
  }

  private getUniqueRelationTypes(modulesInfo: ModuleInfo[]): Set<ConsentModuleRelationType> {
    const relationTypes = new Set(modulesInfo.map(({relationType}) => relationType))
    StructuredLogger.info(
      ConsentFunctions.GenerateConsentPackage,
      ConsentActions.GetUniqueRelationTypes,
      {relationTypes: [...relationTypes]},
    )

    return relationTypes
  }

  private getUniqueModuleIds(modulesInfo: ModuleInfo[]): ModuleInfo[] {
    const seenModuleIds = new Set<number>()
    const uniqueModulesInfo = modulesInfo.filter(({consentModuleId}) =>
      seenModuleIds.has(consentModuleId) ? false : seenModuleIds.add(consentModuleId),
    )

    StructuredLogger.info(
      ConsentFunctions.GenerateConsentPackage,
      ConsentActions.GetUniqueConsentModules,
      {uniqueConsentModuleIds: uniqueModulesInfo.map(({consentModuleId}) => consentModuleId)},
    )

    return uniqueModulesInfo
  }

  private async getConsentPackageTitle(modulesInfo: ModuleInfo[]): Promise<string> {
    return getConsentTitle(
      modulesInfo.length === 1
        ? [await this.consentModuleRepository.findOneById(modulesInfo[0].consentModuleId)]
        : new Array<ConsentModule>(),
    )
  }

  private savePatientConsentModules(data: {
    uniqueModulesInfo: ModuleInfo[]
    patientConsentPackage: PatientConsentPackage
    staff: Staff
  }): Promise<PatientConsentModule[]> {
    const {uniqueModulesInfo, patientConsentPackage, staff} = data

    return this.patientConsentModuleRepository.save(
      uniqueModulesInfo.map(({consentModuleId}, index) => ({
        consentModuleId,
        patientConsentPackageId: patientConsentPackage.id,
        sequence: index + 1,

        updatedByStaffId: staff?.id,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
      })),
    )
  }

  private saveSignatories(data: {
    signatoriesIdToRelationTypes: Map<number, ConsentModuleRelationType[]>
    activeSignatoriesIds: number[]
    patientConsentPackage: PatientConsentPackage
    staff: Staff
  }): Promise<PatientConsentPackageSignatory[]> {
    const {signatoriesIdToRelationTypes, activeSignatoriesIds, patientConsentPackage, staff} = data

    return this.patientConsentPackageSignatoryRepository.save(
      Array.from(signatoriesIdToRelationTypes, ([signingPatientId, relationTypes]) => ({
        patientConsentPackageId: patientConsentPackage.id,
        signingPatientId,
        relationType: relationTypes[0],
        contributionTitle: this.getContributionTitle(relationTypes),
        isActive: activeSignatoriesIds.includes(signingPatientId),
        updatedByStaffId: staff?.id,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
      })),
    )
  }

  private getContributionTitle(relationTypes: ConsentModuleRelationType[]): string {
    const contributorTypes = relationTypes.filter((item) => this.contributorRelationTypes.has(item))

    let contributionTitle = contributorTypes.length
      ? contributorTypes
          .map((relationType) => ConsentModuleRelationTypeLabel[relationType])
          .join(' & ')
      : ConsentModuleRelationTypeLabel[relationTypes[0] ?? ConsentModuleRelationType.Patient]

    if (contributorTypes.length) {
      contributionTitle += ` Contributor`
    }

    return contributionTitle
  }

  private async getConsentPlanAddons(patientPlan: PatientPlan): Promise<PlanAddon[]> {
    const planAddonIds: number[] = patientPlan.addons.map((addon) => addon.planAddonId)
    patientPlan.spermSources.forEach(
      ({
        spermSource,
        freshSpermTypeAddonId,
        frozenSpermTypeAddonId,
        freshWithFrozenBackupSpermTypeAddonId,
      }) => {
        switch (spermSource) {
          case SpermSourceV2.FreshPartnerWithFrozenBackup:
            if (freshWithFrozenBackupSpermTypeAddonId) {
              planAddonIds.push(freshWithFrozenBackupSpermTypeAddonId)
            }
            return
          case SpermSourceV2.PartnerFresh:
            if (freshSpermTypeAddonId) {
              planAddonIds.push(freshSpermTypeAddonId)
            }
            return
          case SpermSourceV2.PartnerFrozen:
            if (frozenSpermTypeAddonId) {
              planAddonIds.push(frozenSpermTypeAddonId)
            }
            return
        }
      },
    )

    return this.planAddonRepository.findForConsentGeneration(planAddonIds)
  }
}
