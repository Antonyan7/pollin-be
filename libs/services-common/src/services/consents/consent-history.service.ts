import {Injectable} from '@nestjs/common'
import {PatientConsentPackageHistoryRepository} from '@libs/data-layer/apps/users/repositories/fireorm/patient-consent-package-history.repository'
import {
  GetHistoryRequestDTO,
  GetHistoryResponseDTO,
  HistoryLineItemType,
} from '@libs/services-common/dto/history.dto'
import {BadRequestException} from '@libs/services-common/exceptions'
import {PatientConsentPackageRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {CONSENT_PACKAGE_NOT_FOUND} from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '../i18n-localization.service'
import {
  DateTimeUtil,
  handleOptionalStringValues,
  NestprojectConfigService,
  StructuredLogger,
} from '@libs/common'
import {compareAndReturnHistoryChange, getItemsDTO} from '@libs/common/helpers'
import {
  AuthUserNameAutomation,
  DefaultValue,
  HistoryUserType,
  HistoryUserTypeTitle,
} from '@libs/common/enums'
import {HistoryLineItemText, HistoryTitleLabel} from '@libs/common/enums'
import {getFullName} from '@libs/common/helpers/patient.helper'
import {Patient, PatientConsentPackage} from '@libs/data-layer/apps/users/entities/typeorm'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'
import {
  ConsentPackageStatus,
  getPatientConsentPackageStatusTitle,
} from '@libs/data-layer/apps/users/enum'
import {ConsentActions, ConsentFunctions} from '@libs/common/enums/active-logs/consent'

@Injectable()
export class ConsentsHistoryService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly patientConsentPackageHistoryRepository: PatientConsentPackageHistoryRepository,
    private readonly patientConsentPackageRepository: PatientConsentPackageRepository,
    private readonly i18nService: I18nLocalizationService,
    private readonly configService: NestprojectConfigService,
  ) {}

  private readonly dateTimeUtil = new DateTimeUtil()

  async getHistory(
    payload: GetHistoryRequestDTO,
    patientConsentPackageUUID: string,
  ): Promise<{data: GetHistoryResponseDTO; cursor: string}> {
    const {paginationCursor, sortByField, sortOrder} = payload

    const patientConsentPackage =
      await this.patientConsentPackageRepository.findOneForHistoryByUUID(patientConsentPackageUUID)
    if (!patientConsentPackage) {
      throw new BadRequestException(this.i18nService.translate(CONSENT_PACKAGE_NOT_FOUND))
    }

    const patientConsentPackageId = patientConsentPackage.id
    const pageSize = this.configService.get<number>('PATIENT_CONSENT_PACKAGE_HISTORY_PAGE_SIZE')

    const {items, nextCursor} =
      await this.patientConsentPackageHistoryRepository.getPaginatedHistory(
        {pageSize, sortByField, sortOrder},
        [{fieldName: 'patientConsentPackageId', value: patientConsentPackageId}],
        paginationCursor,
      )

    const patient = patientConsentPackage.patient

    const lineItems = [
      {
        id: patientConsentPackage.uuid,
        type: HistoryLineItemType.Consent,
        entity: {
          name: HistoryLineItemText.Consent,
          value: patientConsentPackage.title,
        },
      },
      ...(patientConsentPackage.patientPlan
        ? [
            {
              id: patientConsentPackage.patientPlan.uuid,
              type: HistoryLineItemType.Plan,
              entity: {
                name: HistoryLineItemText.Plan,
                value: patientConsentPackage.patientPlan.planType.title,
              },
            },
          ]
        : []),
      {
        id: patient.uuid,
        type: HistoryLineItemType.Patient,
        entity: {
          name: HistoryLineItemText.Patient,
          value: getFullName(patient.firstName, patient.lastName),
        },
      },
    ]

    return {
      data: {
        title: HistoryTitleLabel.Consents,
        lineItems,
        historyItems: items.map((item) => {
          return {
            id: item.id,
            entityTitle: null,
            date: this.dateTimeUtil.formatUTCDateInRFC3339Tz(item.date.toDate()),
            changes: getItemsDTO(item.changes),
            editedBy: {
              fullName: item.authUserFullName ?? DefaultValue.Dash,
              userType: handleOptionalStringValues(HistoryUserTypeTitle[item.authUserType]),
            },
          }
        }),
      },
      cursor: nextCursor,
    }
  }

  async saveStatusHistory(params: {
    patientConsentPackage: PatientConsentPackage
    oldStatus: ConsentPackageStatus
    newStatus: ConsentPackageStatus
    patient?: Patient
    staff?: Staff
  }): Promise<void> {
    const {patientConsentPackage, patient, staff, oldStatus, newStatus} = params

    const {authUserFullName, authUserId, authUserType} = this.getAuthUser(
      patientConsentPackage,
      staff,
      patient,
    )

    const change = compareAndReturnHistoryChange(
      getPatientConsentPackageStatusTitle.get(oldStatus),
      getPatientConsentPackageStatusTitle.get(newStatus),
      {
        propertyName: 'Status',
      },
    )

    if (!change) {
      StructuredLogger.info(ConsentFunctions.SaveStatusHistory, ConsentActions.NoChange, {
        patientConsentPackageId: patientConsentPackage.id,
      })
      return
    }

    await this.patientConsentPackageHistoryRepository.saveMultiple([
      {
        authUserFullName,
        authUserId,
        changes: [change],
        patientConsentPackageId: patientConsentPackage.id,
        updatedBy: authUserId,
        authUserType,
        date: this.dateTimeUtil.now(),
      },
    ])
  }

  private getAuthUser(
    patientConsentPackage: PatientConsentPackage,
    staff: Staff,
    patient: Patient,
  ): {authUserType: HistoryUserType; authUserId: string; authUserFullName: string} {
    if (staff) {
      return {
        authUserType: HistoryUserType.ClinicUser,
        authUserId: staff.authUserId,
        authUserFullName: getFullName(staff.firstName, staff.lastName),
      }
    }

    if (!patient) {
      return {
        authUserType: HistoryUserType.System,
        authUserId: AuthUserNameAutomation,
        authUserFullName: AuthUserNameAutomation,
      }
    }

    const authUserType =
      patientConsentPackage.patientId === patient.id
        ? HistoryUserType.Patient
        : HistoryUserType.Partner

    return {
      authUserType,
      authUserId: patient.authUserId,
      authUserFullName: getFullName(patient.firstName, patient.lastName),
    }
  }
}
