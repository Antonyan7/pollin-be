import {Injectable} from '@nestjs/common'
import {StructuredLogger} from '@libs/common'
import {
  PatientConsentPackageRepository,
  PatientQuestionnaireRepository,
  PatientQuestionnaireToQuestionRepository,
} from '@libs/data-layer/apps/users/repositories/typeorm'
import {
  ConsentModuleToQuestion,
  PatientConsentPackage,
  PatientQuestionnaire,
  PatientQuestionnaireToQuestion,
} from '@libs/data-layer/apps/users/entities/typeorm'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'
import {ConsentModuleRelationType} from '@libs/data-layer/apps/users/enum'

const logFunc = activityLogs.ConsentFunctions
const logAct = activityLogs.ConsentActions

@Injectable()
export class ConsentsQuestionnaireService {
  constructor(
    private readonly patientConsentPackageRepository: PatientConsentPackageRepository,
    private readonly patientQuestionnaireRepository: PatientQuestionnaireRepository,
    private readonly patientQuestionnaireToQuestionRepository: PatientQuestionnaireToQuestionRepository,
  ) {}

  /**
   * Creates PatientQuestionnaire with questions based on consentModule.questions
   */
  async createPatientConsentQuestionnaireBySignatures(
    patientConsentPackage: PatientConsentPackage,
    signingPatientIdToRelationTypes: Map<number, ConsentModuleRelationType[]>, //taking relationType and creating PatQuestionnaire similar each to Signatories
  ): Promise<void> {
    try {
      this.logInfo(`Start for patientConsentPackageID: ${patientConsentPackage?.uuid}`)

      const patientConsentPackageWithQuestionnaire =
        await this.patientConsentPackageRepository.findOneWithModulesQuestionnaireById(
          patientConsentPackage.id,
        )

      if (
        !patientConsentPackageWithQuestionnaire.modules.some(
          (module) => module.consentModule.consentModuleToQuestions?.length,
        )
      ) {
        this.logInfo(`Skip. no questions for modules`)
        return
      }

      const consentModuleToQuestionOrderedByModuleAndQuestions =
        this.getConsentModuleToQuestionOrderedByModuleAndQuestions(
          patientConsentPackageWithQuestionnaire,
        )

      const promises = []
      signingPatientIdToRelationTypes.forEach(async (consentModuleRelationTypes, patientId) => {
        const filteredConsentModuleQuestions =
          consentModuleToQuestionOrderedByModuleAndQuestions.filter(
            (consentModuleQuestion) =>
              !consentModuleQuestion.appliesTo ||
              consentModuleRelationTypes.includes(consentModuleQuestion.appliesTo),
          )

        if (!filteredConsentModuleQuestions?.length) {
          this.logInfo(
            `Skip. no questions for modules by appliesTo for current patient, signingPatientId: ${patientId}, patientConsentPackageId: ${patientConsentPackage?.id}`,
          )
          return
        }

        this.logInfo(
          `Creating questionnaire with questions. no questions for modules by appliesTo for current patient, signingPatientId: ${patientId}, patientConsentPackageId: ${patientConsentPackage?.id}`,
        )
        promises.push(
          this.createPatientQuestionnaireAndQuestions(
            patientId,
            patientConsentPackage,
            filteredConsentModuleQuestions,
          ),
        )
      })

      await Promise.all(promises)

      this.logInfo(`success`)
    } catch (error) {
      handleError(error, {
        functionName: logFunc.CreatePatientConsentQuestionnaireBySignatures,
        eventName: logAct.InternalError,
      })
    }
  }

  private async createPatientQuestionnaireAndQuestions(
    patientId: number,
    patientConsentPackage: PatientConsentPackage,
    filteredConsentModuleQuestions: ConsentModuleToQuestion[],
  ): Promise<void> {
    const patientQuestionnaireData: Partial<PatientQuestionnaire> = {
      patientId: patientId,
      patientConsentPackageId: patientConsentPackage.id,
    }
    const createPatientQuestionnaire =
      await this.patientQuestionnaireRepository.save(patientQuestionnaireData)

    const patientQuestionnaireToQuestionDataList: Partial<PatientQuestionnaireToQuestion>[] =
      filteredConsentModuleQuestions.map((consentModuleQuestion, index) => {
        return {
          questionId: consentModuleQuestion.questionId,
          patientQuestionnaireId: createPatientQuestionnaire.id,
          sequence: index + 1,
        }
      })

    await this.patientQuestionnaireToQuestionRepository.save(patientQuestionnaireToQuestionDataList)
  }

  private getConsentModuleToQuestionOrderedByModuleAndQuestions(
    patientConsentPackageWithQuestionnaire: PatientConsentPackage,
  ): ConsentModuleToQuestion[] {
    // 1. First sort modules by their sequence (ascending)
    const modulesSortedBySequence = patientConsentPackageWithQuestionnaire.modules.sort(
      (a, b) => a.sequence - b.sequence, // Changed to ascending order
    )

    // 2. Get questions from each module, maintaining module order,
    //    and sort questions within each module by their sequence
    return modulesSortedBySequence.flatMap((module) =>
      module.consentModule.consentModuleToQuestions.sort((a, b) => a.sequence - b.sequence),
    )
  }

  logInfo(message: string): void {
    StructuredLogger.info(
      logFunc.CreatePatientConsentQuestionnaireBySignatures,
      activityLogs.CommonAction.Info,
      {
        message: `(MethodName: createPatientConsentQuestionnaireBySignatures). ${message}`,
      },
    )
  }
}
