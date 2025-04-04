import {
  SemenSpecimenCollectionContainer,
  SemenSpecimenCollectionMethod,
  SemenSpecimenCollectionPurpose,
} from '@libs/data-layer/apps/clinic-test/enums'
import {IsBoolean, IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class FieldWithNote {
  @IsOptional()
  @IsString()
  note?: string
  @IsOptional()
  @IsBoolean()
  isEditable?: boolean
}

export class SmokesSemenCollectionDTO extends FieldWithNote {
  @IsNotEmpty()
  @IsBoolean()
  value: boolean
}

export class SemenCollectionPartnerDTO {
  @IsOptional()
  @IsString()
  firstName?: string
  @IsOptional()
  @IsString()
  lastName?: string
  @IsOptional()
  @IsString()
  dateOfBirth?: string
}

export class SemenCollectionPatientDTO {
  @IsOptional()
  @IsString()
  daysSinceLastEjaculation?: string
  @IsOptional()
  @IsBoolean()
  hadLast60DaysFever?: boolean
  @IsOptional()
  @IsBoolean()
  takingMedications?: boolean
  @IsOptional()
  smokes?: SmokesSemenCollectionDTO
  @IsOptional()
  @IsString()
  dateCollected?: string
  @IsOptional()
  @IsEnum(SemenSpecimenCollectionPurpose)
  collectionPurpose?: SemenSpecimenCollectionPurpose
  @IsOptional()
  @IsEnum(SemenSpecimenCollectionMethod)
  method?: SemenSpecimenCollectionMethod
  @IsOptional()
  @IsEnum(SemenSpecimenCollectionContainer)
  container?: SemenSpecimenCollectionContainer
  @IsOptional()
  @IsBoolean()
  sampleCollected?: boolean
  @IsOptional()
  @IsString()
  otherComments?: string
}

/**
 * Optional for submitting the form
 */
export class CollectionProvider {
  id: string
  title: string
}

export class FormSemenSpecimenCollectionDTO {
  @IsOptional()
  partner?: SemenCollectionPartnerDTO
  @IsDefined()
  patient: SemenCollectionPatientDTO
  @IsOptional()
  provider?: CollectionProvider
}
