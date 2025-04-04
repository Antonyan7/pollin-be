import {ActionHistorySortByFieldEnum} from '@libs/common/enums'
import {IsEnum, IsOptional, IsString} from 'class-validator'
import {SortOrder} from '../helpers/sort.helper'

export class GetHistoryRequestDTO {
  @IsEnum(ActionHistorySortByFieldEnum)
  sortByField: ActionHistorySortByFieldEnum

  @IsEnum(SortOrder)
  sortOrder: SortOrder

  @IsString()
  @IsOptional()
  paginationCursor?: string
}

export enum HistoryLineItemType {
  Plan = 'Plan',
  Patient = 'Patient',
  Text = 'Text',
  Appointment = 'Appointment',
  Consent = 'Consent',
}

export class HistoryItemChangeDTO {
  propertyName: string
  from: string
  to: string
}

export class HistoryEditedByDTO {
  fullName: string
  userType: string | null
}

export class HistoryItemDTO {
  id: string
  editedBy: HistoryEditedByDTO
  date: string
  entityTitle: string
  changes: HistoryItemChangeDTO[]
}

export class HistoryLineItemEntityDTO {
  name: string
  value: string
}

export class HistoryLineItemDTO {
  id: string
  type: HistoryLineItemType
  entity: HistoryLineItemEntityDTO
}

export class GetHistoryResponseDTO {
  title: string
  lineItems: HistoryLineItemDTO[]
  historyItems: HistoryItemDTO[]

  /**@deprecated */
  patient?: {
    id: string
    fullName: string
  }
}
