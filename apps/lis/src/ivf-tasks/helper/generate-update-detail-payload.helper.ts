import {
  FertilizationCheckRequest,
  IcsiInjectionRequest,
  InjectionAssessmentRequest,
  InseminationIvfRequest,
  MatureOocyteGroupPhotoRequest,
  CallPatientTaskRequest,
  MiiDay1CryoRequest,
  OocyteFreezing,
  OocytesCollectionRequest,
  PicsiRequest,
  PostStrippingRequest,
  SourceGroupTypeEnum,
  JourneyWitnessRequest,
} from '@apps/lis/ivf-tasks/dto/ivf-tasks-request.dto'
import {Day3CheckRequest} from '@apps/lis/ivf-tasks/dto/ivf-tasks-day-request.dto'
import {
  PatientPlanCohortIvfTaskDetails,
  PatientPlanCohortIvfTaskMatureOocyteGroupPhoto,
} from '@libs/data-layer/apps/clinic-ivf/entities'
import {validatePayload} from '@libs/common/helpers'
import {
  checkOptionalBooleanField,
  DateTimeUtil,
  handleNullableNumberValues,
  handleOptionalEnumValues,
  handleOptionalNumberValues,
  handleOptionalStringValues,
  isNull,
  NestprojectConfigService,
} from '@libs/common'
import {plainToClass} from 'class-transformer'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {EmbryoGroupPhotoRequest} from '@apps/lis/ivf-tasks/dto/ivf-task-embryo-group-photo.dto'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

const configService = NestprojectConfigService.getInstance()
const dateTimeUtil = new DateTimeUtil(configService.get<string>('DEFAULT_TIME_ZONE'))

export const getInjectionAssessmentTaskDetailsUpdatePayload = async (
  details: InjectionAssessmentRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(InjectionAssessmentRequest, details))

  const oocyteAnomaly = Boolean(details.isAnomaly)

  return {
    oocyteAnomaly,
    oocyteQuality: oocyteAnomaly ? handleOptionalEnumValues(details.oocyteQualityRatingId) : null,
    oocyteAssessmentsComment: handleOptionalStringValues(details.oocyteComment),
    oocyteAssessmentsCocEnabled: checkOptionalBooleanField(details.oocyteAssessments.coc.isEnabled),
    oocyteAssessmentsCoc: handleNullableNumberValues(details.oocyteAssessments.coc.qualityRating),
    oocyteAssessmentsSerEnabled: checkOptionalBooleanField(details.oocyteAssessments.ser.isEnabled),
    oocyteAssessmentsSer: handleNullableNumberValues(details.oocyteAssessments.ser.qualityRating),
    oocyteAssessmentsGranularEnabled: checkOptionalBooleanField(
      details.oocyteAssessments.granular.isEnabled,
    ),
    oocyteAssessmentsGranular: handleNullableNumberValues(
      details.oocyteAssessments.granular.qualityRating,
    ),
    oocyteAssessmentsFragPBsEnabled: checkOptionalBooleanField(
      details.oocyteAssessments.fragPBs.isEnabled,
    ),
    oocyteAssessmentsFragPBs: handleNullableNumberValues(
      details.oocyteAssessments.fragPBs.qualityRating,
    ),
    oocyteAssessmentsPvsEnabled: checkOptionalBooleanField(details.oocyteAssessments.pvs.isEnabled),
    oocyteAssessmentsPvs: handleNullableNumberValues(details.oocyteAssessments.pvs.qualityRating),
    oocyteAssessmentsPvdEnabled: checkOptionalBooleanField(details.oocyteAssessments.pvd.isEnabled),
    oocyteAssessmentsPvd: handleNullableNumberValues(details.oocyteAssessments.pvd.qualityRating),
    oocyteAssessmentsVacuolesEnabled: checkOptionalBooleanField(
      details.oocyteAssessments.vacuoles.isEnabled,
    ),
    oocyteAssessmentsVacuoles: handleNullableNumberValues(
      details.oocyteAssessments.vacuoles.qualityRating,
    ),
    oocyteAssessmentsMishappedEnabled: checkOptionalBooleanField(
      details.oocyteAssessments.misshaped.isEnabled,
    ),
    oocyteAssessmentsMishapped: handleNullableNumberValues(
      details.oocyteAssessments.misshaped.qualityRating,
    ),
    oocyteAssessmentsAbnZone: handleNullableNumberValues(
      details.oocyteAssessments.abnormalZone.qualityRating,
    ),
    oocyteAssessmentsAbnZoneEnabled: checkOptionalBooleanField(
      details.oocyteAssessments.abnormalZone.isEnabled,
    ),
    oocyteAssessmentsAbnMembraneBreak: handleNullableNumberValues(
      details.oocyteAssessments.abnMembraneBreak.qualityRating,
    ),
    oocyteAssessmentsAbnMembraneBreakEnabled: checkOptionalBooleanField(
      details.oocyteAssessments.abnMembraneBreak.isEnabled,
    ),
  }
}

export const getInseminationIVFTaskDetailsUpdatePayload = async (
  details: InseminationIvfRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(InseminationIvfRequest, details))

  return {
    oocytesInseminated: handleNullableNumberValues(details.oocytesInseminated),
  }
}

export const getPICSIIVFTaskDetailsUpdatePayload = async (
  details: PicsiRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(PicsiRequest, details))
  return {
    picsiMatureOocytesInjected: handleNullableNumberValues(details.matureOocytesInjected),
    picsiImmatureOocytes: handleNullableNumberValues(details.immatureOocytes),
  }
}

export const getIcsiInjectionIVFTaskDetailsUpdatePayload = async (
  details: IcsiInjectionRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(IcsiInjectionRequest, details))

  return {
    icsiSplit: handleNullableNumberValues(details.split),
    icsiMatureOocytesInjected: handleNullableNumberValues(details.matureOocytesInjected),
  }
}

export const getFertilizationCheckIvfUpdatePayload = async (
  details: FertilizationCheckRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(FertilizationCheckRequest, details))
  const detail = details.sourceGroups.find((i) => i.typeId === SourceGroupTypeEnum.IVF)
  if (detail) {
    return {
      ivfFertilization0pn: detail['0pn'],
      ivfFertilization1pn: detail['1pn'],
      ivfFertilization2pn: detail['2pn'],
      ivfFertilization3pn: detail['3pn'],
      ivfFertilizationDegenOrArrested: detail.degenOrArrested,
    }
  }
}

export const getFertilizationCheckIcsiUpdatePayload = async (
  details: FertilizationCheckRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(FertilizationCheckRequest, details))
  const detail = details.sourceGroups.find((i) => i.typeId === SourceGroupTypeEnum.ICSI)
  if (detail) {
    return {
      icsiFertilization0pn: detail['0pn'],
      icsiFertilization1pn: detail['1pn'],
      icsiFertilization2pn: detail['2pn'],
      icsiFertilization3pn: detail['3pn'],
      icsiFertilizationDegenOrArrested: detail.degenOrArrested,
    }
  }
}

export const getFertilizationCheckPIcsiUpdatePayload = async (
  details: FertilizationCheckRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(FertilizationCheckRequest, details))
  const detail = details.sourceGroups.find((i) => i.typeId === SourceGroupTypeEnum.PICSI)
  if (detail) {
    return {
      picsiFertilization0pn: detail['0pn'],
      picsiFertilization1pn: detail['1pn'],
      picsiFertilization2pn: detail['2pn'],
      picsiFertilization3pn: detail['3pn'],
      picsiFertilizationDegenOrArrested: detail.degenOrArrested,
    }
  }
}

export const getMiiDay1CryoTaskDetailsUpdatePayload = async (
  details: MiiDay1CryoRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(MiiDay1CryoRequest, details))

  return {
    matureOocytesToCry: handleNullableNumberValues(details.matureOocytesToCryo),
    oocytesDiscarded: handleNullableNumberValues(details.oocytesDiscarded),
  }
}

export const getDay3CheckTaskDetailsUpdatePayload = async (
  details: Day3CheckRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(Day3CheckRequest, details))
  return {
    day3EmbryosMoreThan6Cells: handleNullableNumberValues(details.embryosMoreThan6Cells),
    day3EmbryosLessThan6Cells: handleNullableNumberValues(details.embryosLessThan6Cells),
    day3EmbryosArrested: isNull(details.embryosArrested) ? null : details.embryosArrested,
    day3EmbryosAverageFrag: handleOptionalEnumValues(details.embryosAverageFrag),
    day3AssistedHatching:
      details.freshTransfer && details.freshTransfer.enabled
        ? checkOptionalBooleanField(details.freshTransfer.assistedHatching)
        : (checkOptionalBooleanField(details.assistedHatching) ?? null),
    day3FreshTransfer: checkOptionalBooleanField(details.freshTransfer?.enabled) || false,
    day3EmbryosToTransfer: details.freshTransfer?.enabled
      ? handleNullableNumberValues(details.freshTransfer?.embryosToTransfer)
      : null,
  }
}

export const getOocytesCollectionUpdatePayload = async (
  details: OocytesCollectionRequest,
  embryologist: Staff,
  physician: Staff,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(OocytesCollectionRequest, details))

  const {oocytesCollected, oocytesWarmed, oocytesSurvived} = details

  return {
    oocytesCollected: handleNullableNumberValues(oocytesCollected),
    oocytesWarmed: handleNullableNumberValues(oocytesWarmed),
    oocytesSurvived: handleNullableNumberValues(oocytesSurvived),
    oocyteCollectionEmbryologistId: handleOptionalNumberValues(embryologist?.id),
    oocyteCollectionPhysicianId: handleOptionalNumberValues(physician?.id),
    totalOocytes: (oocytesWarmed ?? 0) + (oocytesCollected ?? 0),
  }
}

export const getPostStrippingUpdatePayload = async (
  details: PostStrippingRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(PostStrippingRequest, details))

  const {matureOocytes, immatureOocytes, degenOocytes, abnormalOocytes} = details

  return {
    matureOocytes,
    immatureOocytes,
    degenOocytes,
    abnormalOocytes,
  }
}

export const getOocyteFreezingUpdatePayload = async (
  details: OocyteFreezing,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(OocyteFreezing, details))

  const {matureOocytes, immatureOocytes, degenOocytes, abnormalOocytes} = details

  return {
    matureOocytes,
    immatureOocytes,
    degenOocytes,
    abnormalOocytes,
    oocytesDisabled: true,
  }
}
export const getCallPatientTaskDetailsUpdatePayload = async (
  details: CallPatientTaskRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(CallPatientTaskRequest, details))

  return {
    callDate: details.date,
  }
}

export const getOocyteGroupPhotosPayload = async (data: {
  cohortDetails: PatientPlanCohortIvfTaskDetails
  payload: MatureOocyteGroupPhotoRequest
  staff: Staff
  day: number
}): Promise<Partial<PatientPlanCohortIvfTaskMatureOocyteGroupPhoto>[]> => {
  const {cohortDetails, payload, staff, day} = data
  await validatePayload(plainToClass(MatureOocyteGroupPhotoRequest, payload))

  const oldPhotosUUIDs = new Set(cohortDetails.matureOocyteGroups.map(({uuid}) => uuid))

  const {matureOocyteGroupPhotos} = payload

  const newPhotos = matureOocyteGroupPhotos.filter(
    (photo) => !photo.id && !oldPhotosUUIDs.has(photo.id),
  )

  return newPhotos.map(
    (photo): Partial<PatientPlanCohortIvfTaskMatureOocyteGroupPhoto> => ({
      patientPlanCohortIvfTaskDetailsId: cohortDetails.id,
      title: photo.title,
      photoPath: photo.url,
      updatedBy: staff?.authUserId,
      updatedByStaffId: staff?.id,
      patientPlanCohortId: cohortDetails.patientPlanCohortId,
      day,
      revisionId: generateRevisionId(dateTimeUtil.now()),
    }),
  )
}

export const getGroupPhotosPayload = async (data: {
  cohortDetails: PatientPlanCohortIvfTaskDetails
  payload: EmbryoGroupPhotoRequest
  staff: Staff
  day: number
}): Promise<Partial<PatientPlanCohortIvfTaskMatureOocyteGroupPhoto>[]> => {
  const {cohortDetails, payload, staff, day} = data

  await validatePayload(plainToClass(EmbryoGroupPhotoRequest, payload))

  const oldPhotosUUIDs = new Set(cohortDetails.embryoGroupPhotos.map(({uuid}) => uuid))

  const {embryoGroupPhotos} = payload

  const newPhotos = embryoGroupPhotos.filter((photo) => !photo.id && !oldPhotosUUIDs.has(photo.id))

  return newPhotos.map(
    (photo): Partial<PatientPlanCohortIvfTaskMatureOocyteGroupPhoto> => ({
      patientPlanCohortIvfTaskDetailsId: cohortDetails.id,
      title: photo.title,
      photoPath: photo.url,
      updatedBy: staff?.authUserId,
      updatedByStaffId: staff?.id,
      patientPlanCohortId: cohortDetails.patientPlanCohortId,
      day,
      revisionId: generateRevisionId(dateTimeUtil.now()),
    }),
  )
}

export const getJourneyWitnessUpdatePayload = async (
  details: JourneyWitnessRequest,
): Promise<Partial<PatientPlanCohortIvfTaskDetails>> => {
  await validatePayload(plainToClass(JourneyWitnessRequest, details))

  return {
    journeyWitness: handleOptionalStringValues(details.witness),
  }
}

export const getStrawName = (index: number): string => `Straw ${index}`
