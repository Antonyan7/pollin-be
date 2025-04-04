import {Injectable} from '@nestjs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {DateTimeUtil, StructuredLogger, NestprojectConfigService} from '@libs/common'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {BadRequestException} from '@libs/services-common/exceptions'
import {PatientDocumentRepository} from '@libs/data-layer/apps/users/repositories/typeorm'
import {DocumentCategory, PatientDocument} from '@libs/data-layer/apps/users/entities/typeorm'
import {generateRevisionId} from '@libs/audit-trail/helpers/audit-trail.helper'
import {PatientAuditTrailService} from '@libs/audit-trail'
import {AuditUserAction} from '@libs/services-common/enums'
import {PatientDocumentType} from '@libs/data-layer/apps/users/enum/patient-document.enum'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities'

@Injectable()
export class PatientDocumentService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly i18nService: I18nLocalizationService,
    private readonly configService: NestprojectConfigService,
    private readonly patientDocumentRepository: PatientDocumentRepository,
    private readonly patientAuditTrailService: PatientAuditTrailService,
  ) {}

  private readonly dateTimeUtil = new DateTimeUtil(
    this.configService.get<string>('DEFAULT_TIME_ZONE'),
  )

  async createPatientDocument(
    data: {
      categoryId: number
      name: string
      url: string
      patientId: number
      patientPlanId?: number
      type: PatientDocumentType
      originalFileName?: string
      categoryType: PatientDocumentType
    },
    staff: Staff,
  ): Promise<PatientDocument> {
    try {
      const {
        name,
        categoryId,
        patientId,
        patientPlanId,
        url,
        type,
        categoryType,
        originalFileName,
      } = data

      const patientDocument = await this.patientDocumentRepository.save({
        name,
        patientId,
        categoryId,
        updatedBy: staff.authUserId,
        updatedByStaffId: staff.id,
        patientPlanId,
        url,
        type,
        originalFileName,
        revisionId: generateRevisionId(this.dateTimeUtil.now()),
      })

      if (type !== categoryType) {
        StructuredLogger.warn(
          activityLogs.DocumentsFunctions.CreatePatientDocument,
          activityLogs.DocumentsActions.MissmatchBetweenDocumentAndCategoryType,
          {
            documentUUID: patientDocument.uuid,
            documentType: type,
            documentCategoryType: categoryType,
          },
        )
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.WRONG_CATEGORY_TYPE_WAS_PASSED),
        )
      }

      await this.patientAuditTrailService.addPatientDocumentAudit(
        patientDocument,
        AuditUserAction.Create,
        staff.authUserId,
      )
      return patientDocument
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.DocumentsFunctions.CreatePatientDocument,
        eventName: activityLogs.DocumentsActions.CreatePatientDocumentFailed,
      })
    }
  }

  async updatePatientDocument(
    data: {
      category: DocumentCategory
      name: string
      patientDocument: PatientDocument
    },
    staff: Staff,
  ): Promise<void> {
    try {
      const {category, name, patientDocument} = data

      const fieldsToUpdate = {
        name,
        categoryId: category.id,
      }

      if (patientDocument.type !== category.type) {
        StructuredLogger.warn(
          activityLogs.DocumentsFunctions.UpdatePatientDocument,
          activityLogs.DocumentsActions.MissmatchBetweenDocumentAndCategoryType,
          {
            documentUUID: patientDocument.uuid,
            documentType: patientDocument.type,
            documentCategoryType: category.type,
          },
        )
        throw new BadRequestException(
          this.i18nService.translate(i18Messages.WRONG_CATEGORY_TYPE_WAS_PASSED),
        )
      }

      await this.patientDocumentRepository.update({id: patientDocument.id}, fieldsToUpdate)
      await this.patientAuditTrailService.addPatientDocumentAudit(
        {...patientDocument, ...fieldsToUpdate},
        AuditUserAction.Update,
        staff.authUserId,
      )
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.DocumentsFunctions.UpdatePatientDocument,
        eventName: activityLogs.DocumentsActions.UpdatePatientDocumentFailed,
      })
    }
  }

  async deletePatientDocument(patientDocument: PatientDocument, staff: Staff): Promise<void> {
    try {
      await this.patientDocumentRepository.softDelete({id: patientDocument.id})
      await this.patientAuditTrailService.addPatientDocumentAudit(
        patientDocument,
        AuditUserAction.Delete,
        staff.authUserId,
      )
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.DocumentsFunctions.DeletePatientDocument,
        eventName: activityLogs.DocumentsActions.DeletePatientDocumentFailed,
      })
    }
  }
}
