/* eslint-disable max-lines */
import {
  IvfEmbryoGrade,
  IVFUnitOption,
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskExpandedEmbryo,
  PatientPlanCohortIvfTaskGroup,
  PatientPlanCohortIvfTaskSummary,
  PatientPlanCohortSignOffHistory,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {
  ContributorSpermSource,
  FilterAttachmentDTO,
  IVFLABPatientPlan,
  IVFPatientDetails,
  IvfTaskFilter,
  OocyteQualityOptions,
  OocyteQualityRatingOptions,
  SelectedEmbryo,
  SourceGroupTypeEnum,
  TaskIVF,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {
  BiopsyAttachments,
  Day5CheckRequest,
  Day7CheckRequest,
  ExpandedEmbryo,
  ExpandedEmbryoDetailsFreeze,
  ExpandedEmbryoDetailsFreshET,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {Patient} from '@libs/data-layer/apps/users/entities/typeorm'
import {PatientPlan} from '@libs/data-layer/apps/plan/entities/typeorm'
import {abbreviatedName, getFullName} from '@libs/common/helpers/patient.helper'
import {
  ContributionTitlesMapper,
  embryoStateToAction,
  getIvfLabDayLabels,
  IvfEmbryoActions,
} from '@libs/services-common/enums'
import {PatientPlanSpermSource} from '@libs/data-layer/apps/plan/entities/typeorm/patient-plan-sperm-source.entity'
import {
  PlanAddonCode,
  PlanAddonType,
  SpermSourceLabel,
  SpermSourceV2,
} from '@libs/data-layer/apps/plan/enums/plan-type.enum'
import {PlanSheetType} from '@libs/data-layer/apps/plan/enums/plan.enum'
import {
  DateTimeUtil,
  handleOptionalNumberValues,
  handleOptionalStringValues,
  NestprojectConfigService,
} from '@libs/common'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  IVFLabStatus,
  EmbryoState,
  OocyteQuality,
  OocyteQualityLabel,
} from '@libs/data-layer/apps/clinic-ivf/enums'
import {validatePayload} from '@libs/common/helpers'
import {plainToClass} from 'class-transformer'
import {FirebaseStorageAdapter} from '@libs/common/adapters'
import {EmbryoGroupPhotoResponse} from '@apps/lis/ivf-tasks/dto/ivf-task-embryo-group-photo.dto'
import {
  CallPatientTaskResponse,
  Day3CheckResponse,
  Day5CheckResponse,
  Day6CheckResponse,
  Day7CheckResponse,
  FertilizationSourceGroupsResponse,
  IcsiInjectionResponse,
  InjectionAssessmentResponse,
  InseminationIvfResponse,
  JourneyWitnessResponse,
  MatureOocyteGroupPhotoResponse,
  MiiDay1CryoResponse,
  PicsiResponse,
  PostStrippingResponse,
  SpermWashResponse,
  VerifyHepBcHivResponse,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {PatientPlanCohortCryoSampleContainers} from '@libs/data-layer/apps/clinic-ivf/entities/patient-plan-cohort-cryo-sample-containers.entity'
import {buildProfileAlertResponse} from '@libs/common/helpers/profile-alert.helper'
import {
  CryoSampleContainer,
  MediaLot,
} from '@libs/data-layer/apps/clinic-cryo-preservation-lab/entities/typeorm'
import {PrintLabelResponse} from '@apps/lis/ivf-tasks/dto/ivf-tasks-response.dto'
import {getFirstPatientPlanAddonByType} from '@libs/common/helpers/plan.helper'
import {patientIdentifier} from '@apps/lis/test-result/helper/test-result.helper'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const getPlanCohortSignOffHistoryPayload = (
  ivfTaskSummary: PatientPlanCohortIvfTaskSummary,
): Partial<PatientPlanCohortSignOffHistory> => {
  return {
    IVFTaskToDayId: ivfTaskSummary.IVFTaskToDayId,
    patientPlanCohortId: ivfTaskSummary.patientPlanCohortId,
    patientPlanCohortIvfTaskGroupId: ivfTaskSummary.patientPlanCohortIvfTaskGroupId,
    signedOffDate: ivfTaskSummary.signedOffDate,
    signedOffById: ivfTaskSummary.signedOffById,
  }
}

export const getGroupTitle = (day: number): string => {
  return `IVF Lab Form - ${getIvfLabDayLabels.get(day)}`
}

export const generateIvfTasksResponse = (tasksIVF: IvfTaskFilter[]): TaskIVF[] => {
  return tasksIVF.map((item) => {
    return {
      id: item.id,
      uiid: item.uiid,
      lastUpdateDetails: item.lastUpdateDetails,
      details: item.details,
      note: handleOptionalStringValues(item.note),
    }
  })
}

export const getLastUpdateDetails = (
  summary: PatientPlanCohortIvfTaskSummary,
  staff: Staff,
): string => {
  if (summary?.updatedByStaffAt && staff) {
    return `Last updated by ${abbreviatedName(staff)} on ${dateTimeUtil.formatToMonthsDayYearWithTime(
      summary.updatedByStaffAt,
    )}`
  }
  return null
}

export const getSignedOffDetails = (
  signedOffUser: Staff,
  staffUser: Staff,
  summary: PatientPlanCohortIvfTaskSummary,
): string => {
  if (signedOffUser && staffUser && summary.signedOffDate) {
    return `Signed off by ${getFullName(
      signedOffUser.firstName,
      signedOffUser.lastName,
    )} on ${dateTimeUtil.formatTzTimeWithMMMDate(summary.signedOffDate)}.`
  }
  return null
}

export const getSignedOffDetailsV2 = (
  signedOffUser: Staff,
  group: PatientPlanCohortIvfTaskGroup,
): string => {
  if (signedOffUser && group.signedOffDate) {
    const signedOffDate = group.signedOffDate

    return `Signed off by ${getFullName(
      signedOffUser.firstName,
      signedOffUser.lastName,
    )} on ${dateTimeUtil.formatTzTimeWithMMMDate(signedOffDate)}.`
  }
  return null
}

export const miiDay1CryoResponse = (data: {
  detail: PatientPlanCohortIvfTaskDetails
  existingOocytes: PatientPlanCohortCryoSampleContainers[]
  lastStrawNumber: number
  immatureOocytes?: number
}): MiiDay1CryoResponse => {
  const {detail, existingOocytes, lastStrawNumber, immatureOocytes} = data
  return {
    immatureFromDay0: handleOptionalNumberValues(immatureOocytes || detail.immatureOocytes),
    matureOocytesToCryo: detail.matureOocytesToCry,
    oocytesDiscarded: detail.oocytesDiscarded,
    lastStrawNumber,
    straws: existingOocytes.map((oocyte) => ({
      id: oocyte.cryoSampleContainer.uuid,
      title: `Straw ${oocyte.cryoSampleContainer.strawNumber}`,
      numberOfEggs: oocyte.cryoSampleContainer.eggCount,
      identifier: oocyte.cryoSampleContainer.identifier,
      details: {
        freezeDate: oocyte.cryoSampleContainer.freezeDate,
        tankId: handleOptionalStringValues(oocyte.cryoSampleContainer?.cryoCan?.cryoTank?.uuid),
        canId: handleOptionalStringValues(oocyte.cryoSampleContainer?.cryoCan?.uuid),
        caneId: handleOptionalStringValues(oocyte.cryoSampleContainer.cryoCane?.uuid),
        freezeWitness: oocyte.cryoSampleContainer.freezeWitness,
        comments: oocyte.cryoSampleContainer.freezeComment,
        status: oocyte.cryoSampleContainer.status,
      },
    })),
  }
}

export const verifyHepBcHivResponse = (patientPlan: PatientPlan): VerifyHepBcHivResponse => {
  return {
    patientId: patientPlan.patient.uuid,
    patientPlanId: patientPlan.uuid,
  }
}
export const day3CheckResponse = (details: PatientPlanCohortIvfTaskDetails): Day3CheckResponse => {
  return {
    embryosMoreThan6Cells: details.day3EmbryosMoreThan6Cells,
    embryosLessThan6Cells: details.day3EmbryosLessThan6Cells,
    embryosArrested: details.day3EmbryosArrested,
    embryosAverageFrag: details.day3EmbryosAverageFrag,
    assistedHatching: details.day3AssistedHatching,
    updateDisabled: details.day3Disabled,
    freshTransfer: {
      enabled: details.day3FreshTransfer || false,
      embryosToTransfer: details.day3FreshTransfer ? details.day3EmbryosToTransfer : null,
      assistedHatching: details.day3FreshTransfer ? details.day3AssistedHatching : null,
    },
  }
}

const IVFfertilizationCheckPercentage = (patientPlan: PatientPlan): number => {
  const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
    patientPlan,
    PlanAddonType.FertilizationDirective,
  )?.planAddon

  if (fertilizationDirectiveAddon?.code === PlanAddonCode.IVF) {
    return 100
  }
  if (
    fertilizationDirectiveAddon?.code === PlanAddonCode.ICSI ||
    fertilizationDirectiveAddon?.code === PlanAddonCode.PICSI
  ) {
    return 0
  }
  if (fertilizationDirectiveAddon?.code === PlanAddonCode.IVFOrICSISplit) {
    return patientPlan.detail.fertilisationDirectiveSplitIVFPercentages
  }
  return 0
}

const ICSIfertilizationCheckPercentage = (patientPlan: PatientPlan): number => {
  const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
    patientPlan,
    PlanAddonType.FertilizationDirective,
  )?.planAddon

  if (
    fertilizationDirectiveAddon?.code === PlanAddonCode.ICSI ||
    fertilizationDirectiveAddon?.code === PlanAddonCode.ICSIAndCaIonophore
  ) {
    return 100
  }
  if (
    fertilizationDirectiveAddon?.code === PlanAddonCode.IVF ||
    fertilizationDirectiveAddon?.code === PlanAddonCode.PICSI
  ) {
    return 0
  }
  if (fertilizationDirectiveAddon?.code === PlanAddonCode.IVFOrICSISplit) {
    const ivfPercentages = patientPlan.detail.fertilisationDirectiveSplitIVFPercentages ?? 0

    return 100 - ivfPercentages
  }
  return 0
}

const PICSIfertilizationCheckPercentage = (patientPlan: PatientPlan): number => {
  const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
    patientPlan,
    PlanAddonType.FertilizationDirective,
  )?.planAddon

  if (fertilizationDirectiveAddon?.code === PlanAddonCode.PICSI) {
    return 100
  }
  return 0
}

export const ICSIAddons = [
  PlanAddonCode.IVF,
  PlanAddonCode.ICSI,
  PlanAddonCode.IVFOrICSISplit,
  PlanAddonCode.ICSIAndCaIonophore,
]

export const fertilizationCheckResponse = (
  detail: Partial<PatientPlanCohortIvfTaskDetails>,
  patientPlan: PatientPlan,
): FertilizationSourceGroupsResponse[] => {
  const result = [
    {
      typeId: SourceGroupTypeEnum.IVF,
      percentage: IVFfertilizationCheckPercentage(patientPlan),
      degenOrArrested: detail.ivfFertilizationDegenOrArrested,
      '0pn': detail.ivfFertilization0pn,
      '1pn': detail.ivfFertilization1pn,
      '2pn': detail.ivfFertilization2pn,
      '3pn': detail.ivfFertilization3pn,
    },
  ]

  const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
    patientPlan,
    PlanAddonType.FertilizationDirective,
  )?.planAddon

  if (ICSIAddons.includes(fertilizationDirectiveAddon?.code)) {
    result.push({
      typeId: SourceGroupTypeEnum.ICSI,
      percentage: ICSIfertilizationCheckPercentage(patientPlan),
      degenOrArrested: detail.icsiFertilizationDegenOrArrested,
      '0pn': detail.icsiFertilization0pn,
      '1pn': detail.icsiFertilization1pn,
      '2pn': detail.icsiFertilization2pn,
      '3pn': detail.icsiFertilization3pn,
    })
  }

  if (fertilizationDirectiveAddon?.code === PlanAddonCode.PICSI) {
    result.push({
      typeId: SourceGroupTypeEnum.PICSI,
      percentage: PICSIfertilizationCheckPercentage(patientPlan),
      degenOrArrested: detail.picsiFertilizationDegenOrArrested,
      '0pn': detail.picsiFertilization0pn,
      '1pn': detail.picsiFertilization1pn,
      '2pn': detail.picsiFertilization2pn,
      '3pn': detail.picsiFertilization3pn,
    })
  }
  return result
}

export const icsiInjectionResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
  patientPlan: PatientPlan,
): IcsiInjectionResponse => {
  const ivfPercentages = patientPlan.detail.fertilisationDirectiveSplitIVFPercentages ?? 0
  const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
    patientPlan,
    PlanAddonType.FertilizationDirective,
  )?.planAddon

  return {
    percentage: 100 - ivfPercentages,
    isSplitEnabled: fertilizationDirectiveAddon?.code !== PlanAddonCode.ICSI,
    split: detail.icsiSplit,
    matureOocytesInjected: detail.icsiMatureOocytesInjected,
    spermPrep: {sources: getSpermSources(patientPlan.spermSources)},
  }
}

export const picsiResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
  spermSources: PatientPlanSpermSource[],
): PicsiResponse => {
  return {
    matureOocytesInjected: detail.picsiMatureOocytesInjected,
    immatureOocytes: detail.picsiImmatureOocytes,
    spermPrep: {sources: getSpermSources(spermSources)},
  }
}

export const postStrippingResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
  day0Date: string,
  spawnedPatientPlanCohort: boolean,
): PostStrippingResponse => {
  return {
    day0Date: calculateDay0Date(day0Date),
    matureOocytes: detail.matureOocytes,
    immatureOocytes: detail.immatureOocytes,
    degenOocytes: detail.degenOocytes,
    abnormalOocytes: detail.abnormalOocytes,
    isCohortSpawned: spawnedPatientPlanCohort,
  }
}

export const calculateDay0Date = (day0Date: string): string => {
  const day1 = dateTimeUtil.toDate(day0Date)
  const addDay = dateTimeUtil.addDays(day1, 1)
  return dateTimeUtil.formatIsoDate(addDay)
}

export const spermWashResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
  unitOptions: IVFUnitOption[],
): SpermWashResponse => {
  return {
    unitOptions: unitOptions.map(({uuid, title}) => ({
      id: uuid,
      title,
    })),
    finalMotility: detail.spermWashFinalMotility,
    initialMotility: detail.spermWashInitialMotility,
    initialConcentration: {
      value: detail.spermWashInitialConcentration,
      unitId: handleOptionalStringValues(detail.spermWashInitialConcentrationUnit?.uuid),
    },
    finalConcentration: {
      value: detail.spermWashFinalConcentration,
      unitId: handleOptionalStringValues(detail.spermWashFinalConcentrationUnit?.uuid),
    },
  }
}

export const matureOocyteGroupPhotoResponse = async (
  detail: PatientPlanCohortIvfTaskDetails,
): Promise<MatureOocyteGroupPhotoResponse> => {
  const fireBaseStorageAdapter = new FirebaseStorageAdapter(
    configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
  )

  const matureOocyteGroupPhotos = await Promise.all(
    detail.matureOocyteGroups?.map(async (groupPhoto) => ({
      id: groupPhoto.uuid,
      title: groupPhoto.title,
      url: await fireBaseStorageAdapter.getSignedUrlToFile(groupPhoto.photoPath),
    })) ?? [],
  )

  return {
    matureOocyteGroupPhotos,
  }
}
export const callPatientResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
): CallPatientTaskResponse => ({
  date: detail.callDate || null,
})

export const journeyWitnessResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
): JourneyWitnessResponse => ({
  witness: handleOptionalStringValues(detail.journeyWitness),
})

export const embryoGroupPhotoResponse = async (
  detail: PatientPlanCohortIvfTaskDetails,
): Promise<EmbryoGroupPhotoResponse> => {
  const fireBaseStorageAdapter = new FirebaseStorageAdapter(
    configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
  )

  const embryoGroupPhotos = await Promise.all(
    detail.embryoGroupPhotos?.map(async (groupPhoto) => ({
      id: groupPhoto.uuid,
      title: groupPhoto.title,
      url: await fireBaseStorageAdapter.getSignedUrlToFile(groupPhoto.photoPath),
    })) ?? [],
  )

  return {
    embryoGroupPhotos,
  }
}

export const inseminationIVFResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
  patientPlan: PatientPlan,
): InseminationIvfResponse => {
  const result = {
    oocytesInseminated: detail.oocytesInseminated,
    percentage: patientPlan.detail.fertilisationDirectiveSplitIVFPercentages,
  }
  const fertilizationDirectiveAddon = getFirstPatientPlanAddonByType(
    patientPlan,
    PlanAddonType.FertilizationDirective,
  )?.planAddon

  if (fertilizationDirectiveAddon?.code === PlanAddonCode.IVF) {
    return {split: 100, ...result}
  } else {
    return {
      split: patientPlan.detail.fertilisationDirectiveSplitIVFPercentages,
      ...result,
    }
  }
}

export const getOocyteQualityRatingOptions = (): OocyteQualityRatingOptions[] => {
  return [
    {
      id: '1',
      title: '+ (Best)',
    },
    {
      id: '2',
      title: '++',
    },
    {
      id: '3',
      title: '+++ (Worst)',
    },
  ]
}

export const getOocyteQualityOptions = (): OocyteQualityOptions[] => {
  return Object.values(OocyteQuality).map((item) => {
    return {
      id: item,
      title: OocyteQualityLabel[item],
    }
  })
}

export const injectionAssessmentResponse = (
  detail: PatientPlanCohortIvfTaskDetails,
): InjectionAssessmentResponse => {
  const isAnomaly = Boolean(detail.oocyteAnomaly)

  return {
    isAnomaly,
    oocyteQualityRatingOptions: getOocyteQualityRatingOptions(),
    oocyteQualityOptions: getOocyteQualityOptions(),
    oocyteQualityRatingId: isAnomaly ? detail.oocyteQuality : null,
    oocyteAssessments: {
      coc: {
        isEnabled: detail.oocyteAssessmentsCocEnabled,
        qualityRating: detail.oocyteAssessmentsCoc,
      },
      ser: {
        isEnabled: detail.oocyteAssessmentsSerEnabled,
        qualityRating: detail.oocyteAssessmentsSer,
      },
      granular: {
        isEnabled: detail.oocyteAssessmentsGranularEnabled,
        qualityRating: detail.oocyteAssessmentsGranular,
      },
      fragPBs: {
        isEnabled: detail.oocyteAssessmentsFragPBsEnabled,
        qualityRating: detail.oocyteAssessmentsFragPBs,
      },
      pvs: {
        isEnabled: detail.oocyteAssessmentsPvsEnabled,
        qualityRating: detail.oocyteAssessmentsPvs,
      },
      pvd: {
        isEnabled: detail.oocyteAssessmentsPvdEnabled,
        qualityRating: detail.oocyteAssessmentsPvd,
      },
      vacuoles: {
        isEnabled: detail.oocyteAssessmentsVacuolesEnabled,
        qualityRating: detail.oocyteAssessmentsVacuoles,
      },
      misshaped: {
        isEnabled: detail.oocyteAssessmentsMishappedEnabled,
        qualityRating: detail.oocyteAssessmentsMishapped,
      },
      abnormalZone: {
        isEnabled: detail.oocyteAssessmentsAbnZoneEnabled,
        qualityRating: detail.oocyteAssessmentsAbnZone,
      },
      abnMembraneBreak: {
        isEnabled: detail.oocyteAssessmentsAbnMembraneBreakEnabled,
        qualityRating: detail.oocyteAssessmentsAbnMembraneBreak,
      },
    },
    oocyteComment: detail.oocyteAssessmentsComment,
  }
}

export const getPatientDetails = (patient: Patient, isPartner?: boolean): IVFPatientDetails => {
  if (!patient) {
    return null
  }
  const contribution = ContributionTitlesMapper[patient.detail?.contribution]
  const patientFullName = getFullName(patient.firstName, patient.lastName)

  return {
    id: patient.uuid,
    identifier: patient.patientIdentifier,
    title: patientFullName,
    contributionTitle: contribution || null,
    alerts: isPartner ? buildProfileAlertResponse(patient.patientProfileAlertsAsPartner) : [],
  }
}

export const getPatientPlan = (
  patientPlan: PatientPlan,
  ivfStatus: IVFLabStatus,
): IVFLABPatientPlan => {
  return {
    id: patientPlan.uuid,
    title: patientPlan.planType.title,
    hasStimSheet: patientPlan.sheets?.some((sheet) => sheet.type === PlanSheetType.Stimulation),
    ivfStatus,
  }
}

export const getSpermSources = (
  spermSources: PatientPlanSpermSource[],
): ContributorSpermSource[] => {
  if (!spermSources.length) {
    return []
  }

  return spermSources.map((item) => {
    let spermType

    switch (item.spermSource) {
      case SpermSourceV2.Donor:
        spermType = null
        break
      case SpermSourceV2.PartnerFresh:
        spermType = item.freshSpermTypeAddon?.title
        break
      case SpermSourceV2.PartnerFrozen:
        spermType = item.frozenSpermTypeAddon?.title
        break
      case SpermSourceV2.FreshPartnerWithFrozenBackup:
        spermType = item.freshWithFrozenBackupSpermTypeAddon?.title
        break
      case SpermSourceV2.NA:
        spermType = SpermSourceV2.NA
        break
    }

    return {
      source: SpermSourceLabel[item.spermSource],
      donorId: item.donorId,
      dateOfArrival: item.dateOfArrival,
      contributorId: item.contributor?.uuid,
      spermType,
    }
  })
}
export const validateDay5CheckTask = async (payload: Day5CheckRequest): Promise<void> => {
  await validatePayload(plainToClass(Day5CheckRequest, payload))
  for (const embryo of payload.embryosExpanded) {
    if (embryo.actionType === IvfEmbryoActions.Freeze) {
      await validatePayload(plainToClass(ExpandedEmbryoDetailsFreeze, embryo.details))
    } else {
      await validatePayload(plainToClass(ExpandedEmbryoDetailsFreshET, embryo.details))
    }
  }
}

export const validateDay7CheckTask = async (payload: Day7CheckRequest): Promise<void> => {
  await validatePayload(plainToClass(Day7CheckRequest, payload))
  for (const embryo of payload.embryosExpanded) {
    if (embryo.actionType === IvfEmbryoActions.Freeze) {
      await validatePayload(plainToClass(ExpandedEmbryoDetailsFreeze, embryo.details))
    } else {
      await validatePayload(plainToClass(ExpandedEmbryoDetailsFreshET, embryo.details))
    }
  }
}

export const getEmbryoIdentifier = (embryoId: string): string => {
  return embryoId ? embryoId : `FreshET`
}

export const getBiopsyId = (embryoId: string): string => {
  return embryoId ? `${configService.get('BIOPSY_ID_PREFIX')}${embryoId}` : `FreshET`
}

export const getAttachments = async (
  embryos: PatientPlanCohortIvfTaskExpandedEmbryo[],
): Promise<FilterAttachmentDTO[]> => {
  const fireBaseStorageAdapter = new FirebaseStorageAdapter(
    configService.get<string>('DEFAULT_STORAGE_BUCKET_NAME'),
  )

  const allAttachments = embryos
    .map((embryo) => embryo.biopsyAttachments.map((item) => item))
    .flat()

  return Promise.all(
    allAttachments.map(async (attachment) => {
      return {
        embryoId: attachment.embryoId,
        id: attachment.uuid,
        url: await fireBaseStorageAdapter.getSignedUrlToFile(attachment.photoPath),
        title: attachment.title,
      }
    }),
  )
}

export const filterAttachments = (
  attachments: FilterAttachmentDTO[],
  embryo: PatientPlanCohortIvfTaskExpandedEmbryo,
): BiopsyAttachments[] => {
  return attachments
    .filter((attachment) => {
      return attachment.embryoId === embryo.id
    })
    .map((item) => {
      return {
        id: item.id,
        url: item.url,
        title: item.title,
      }
    })
}

const getEmbryosExpended = async (
  embryos: PatientPlanCohortIvfTaskExpandedEmbryo[],
): Promise<ExpandedEmbryo[]> => {
  const attachments = await getAttachments(embryos)

  return embryos.map((embryo) => {
    return {
      id: embryo.uuid,
      title: `Embryo ${embryo.embryoNumber}`,
      cryoCardId: handleOptionalStringValues(embryo?.cryoSampleContainer?.cryoInventoryCard?.uuid),
      identifier: getEmbryoIdentifier(embryo?.cryoSampleContainer?.identifier),
      gradeId: embryo.ivfEmbryoGrade.uuid,
      actionType: embryoStateToAction[embryo.state],
      details:
        embryo.state === EmbryoState.Frozen
          ? {
              freezeDate: embryo.cryoSampleContainer.freezeDate,
              tankId: handleOptionalStringValues(
                embryo.cryoSampleContainer.cryoCan?.cryoTank?.uuid,
              ),
              canId: handleOptionalStringValues(embryo.cryoSampleContainer.cryoCan?.uuid),
              caneId: handleOptionalStringValues(embryo.cryoSampleContainer.cryoCane?.uuid),
              freezeWitness: embryo.cryoSampleContainer.freezeWitness,
              comments: embryo.cryoSampleContainer.freezeComment,
              status: embryo.cryoSampleContainer.status,
            }
          : {
              assistedHatching: embryo.assistedHatching,
              physicianId: embryo.physician?.uuid,
            },
      biopsy:
        embryo.biopsyRequired && embryo.state === EmbryoState.Frozen
          ? {
              id: getBiopsyId(embryo?.cryoSampleContainer.identifier),
              attachments: filterAttachments(attachments, embryo),
            }
          : null,
      embryologistId: handleOptionalStringValues(embryo.embryologist?.uuid),
    }
  })
}

export const day5CheckResponsePayload = async ({
  detail,
  embryos,
  grades,
  remainingCount,
  lastEmbryoNumber,
}: {
  detail: PatientPlanCohortIvfTaskDetails
  embryos: PatientPlanCohortIvfTaskExpandedEmbryo[]
  grades: IvfEmbryoGrade[]
  remainingCount: number
  lastEmbryoNumber: number
}): Promise<Day5CheckResponse> => {
  const day3EmbryosMoreThan6Cells = detail.day3EmbryosMoreThan6Cells ?? 0
  const day3EmbryosLessThan6Cells = detail.day3EmbryosLessThan6Cells ?? 0
  const embryosExpanded = await getEmbryosExpended(embryos)

  return {
    remainingEmbryos: remainingCount,
    numberOfEmbryos: day3EmbryosMoreThan6Cells + day3EmbryosLessThan6Cells,
    embryoGradeOptions: grades.map((grade) => {
      return {
        id: grade.uuid,
        title: grade.title,
      }
    }),
    embryosArrested: detail.day5Arrested,
    embryosExpanded: embryosExpanded,
    lastEmbryoNumber,
  }
}

export const day6CheckResponsePayload = async (data: {
  detail: PatientPlanCohortIvfTaskDetails
  embryos: PatientPlanCohortIvfTaskExpandedEmbryo[]
  grades: IvfEmbryoGrade[]
  day5EmbryosCount: number
  remainingCount: number
  lastEmbryoNumber: number
}): Promise<Day6CheckResponse> => {
  const {detail, embryos, grades, day5EmbryosCount, remainingCount, lastEmbryoNumber} = data
  const day3EmbryosMoreThan6Cells = detail.day3EmbryosMoreThan6Cells ?? 0
  const day3EmbryosLessThan6Cells = detail.day3EmbryosLessThan6Cells ?? 0
  const day5EmbryoArrested = detail.day5Arrested ?? 0

  const numberOfEmbryos = day3EmbryosMoreThan6Cells + day3EmbryosLessThan6Cells
  const embryosExpanded = await getEmbryosExpended(embryos)

  return {
    remainingEmbryos: remainingCount,
    numberOfEmbryos,
    lastEmbryoNumber,
    numberOfContinuedEmbryos: numberOfEmbryos - day5EmbryosCount - day5EmbryoArrested,
    embryoGradeOptions: grades.map((grade) => {
      return {
        id: grade.uuid,
        title: grade.title,
      }
    }),
    embryosArrested: detail.day6Arrested,
    embryosExpanded: embryosExpanded,
  }
}

export const day7CheckResponsePayload = async (data: {
  detail: PatientPlanCohortIvfTaskDetails
  embryos: PatientPlanCohortIvfTaskExpandedEmbryo[]
  grades: IvfEmbryoGrade[]
  day5And6EmbryosCount: number
  remainingCount: number
  lastEmbryoNumber: number
}): Promise<Day7CheckResponse> => {
  const {detail, embryos, grades, day5And6EmbryosCount, remainingCount, lastEmbryoNumber} = data
  const day3EmbryosMoreThan6Cells = detail.day3EmbryosMoreThan6Cells ?? 0
  const day3EmbryosLessThan6Cells = detail.day3EmbryosLessThan6Cells ?? 0
  const day5EmbryoArrested = detail.day5Arrested ?? 0
  const day6EmbryoArrested = detail.day6Arrested ?? 0
  const numberOfEmbryos = day3EmbryosMoreThan6Cells + day3EmbryosLessThan6Cells
  const embryosExpanded = await getEmbryosExpended(embryos)

  return {
    remainingEmbryos: remainingCount,
    numberOfEmbryos,
    numberOfContinuedEmbryos:
      numberOfEmbryos - day5And6EmbryosCount - day5EmbryoArrested - day6EmbryoArrested,
    embryosDiscarded: detail.day7Discarded,
    embryoGradeOptions: grades.map((grade) => {
      return {
        id: grade.uuid,
        title: grade.title,
      }
    }),
    //TODO: depreciated field will be removed by TEAMB-12766
    embryosArrested: 0,
    embryosExpanded,
    lastEmbryoNumber,
  }
}

export function getCryoSampleContainerTitle(container: CryoSampleContainer): string {
  const freezeDate = dateTimeUtil.extractDateTz(dateTimeUtil.toDate(container?.freezeDate))

  const parts = [container.identifier]

  if (container?.freezeDate) {
    parts.push(`FZ: ${freezeDate}`)
  }

  return parts.join(' • ')
}

export function callThePatientResponse(
  detail: PatientPlanCohortIvfTaskDetails,
): CallPatientTaskResponse {
  return {
    date: detail.callDate ?? null,
  }
}

export function printLabelResponse(patientPlan: PatientPlan): PrintLabelResponse {
  return {
    name: `${patientPlan.patient.lastName}, ${patientPlan.patient.firstName}`,
    identifier: patientIdentifier(patientPlan.patient),
    dateOfBirth: dateTimeUtil.formatBirthDate(patientPlan.patient?.dateOfBirth),
  }
}

export const findMediaLot = (
  mediaLots: MediaLot[],
  payloadEmbryos: SelectedEmbryo[],
  selectedEmbryo: PatientPlanCohortIvfTaskExpandedEmbryo,
): MediaLot => {
  return mediaLots.find(
    (mediaLot) =>
      mediaLot.uuid === payloadEmbryos.find((embyo) => embyo.id === selectedEmbryo.uuid).mediaLotId,
  )
}

export const findGrade = (
  grades: IvfEmbryoGrade[],
  payloadEmbryos: SelectedEmbryo[],
  selectedEmbryo: PatientPlanCohortIvfTaskExpandedEmbryo,
): IvfEmbryoGrade => {
  return grades.find(
    (grade) =>
      grade.uuid === payloadEmbryos.find((embryo) => embryo.id === selectedEmbryo.uuid).regradeId,
  )
}
