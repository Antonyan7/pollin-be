import {Injectable} from '@nestjs/common'
import {PatientRepository} from '@libs/data-layer/apps/users/repositories/typeorm/patient.repository'
import {BadRequestException, BadRequestWarningException} from '@libs/services-common/exceptions'
import {StructuredLogger, NestprojectConfigService} from '@libs/common'
import * as i18Messages from '@libs/common/i18n/en/message.json'
import {I18nLocalizationService} from '@libs/services-common/services/i18n-localization.service'
import {MDBillingAdapter} from '@libs/common/adapters/md-billing.adapter'
import {StaffRepository} from '@libs/data-layer/apps/clinic-tasks/repositories/typeorm'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {doesLuhnValidationPassing} from '@libs/services-common/helpers/mod-10-validator.helper'
import {getStaffsWithTrimmedAndNotEmptyBillingNumber} from '../helpers/staff.helper'
import {
  cleanAndValidateFormatOhipWithException,
  getInvalidOhipErrorMsg,
  OhipData,
  throwErrorMsgForAlreadyExistOhip,
  getErrorMsgIfResponseFromMdBillingIfWrong,
  validateOhipExistence,
  writeErrorMsgIfBillingNumberHasBadFormat,
} from '@libs/common/helpers/patient-ohip.helper'

// declared to have shorted Logging in service
const logFunc = activityLogs.PatientOhipValidationFunction
const logAct = activityLogs.PatientOhipValidationActions

/**
 * To check already used in our db and by mdBilling
 */
@Injectable()
export class PatientOhipService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly mDBillingAdapter: MDBillingAdapter,
    private readonly patientRepository: PatientRepository,
    private readonly staffRepository: StaffRepository,
    private readonly configService: NestprojectConfigService,

    private readonly i18nService: I18nLocalizationService,
  ) {}
  //TODO TEAMA-8080 - update code after it will be merged

  /**
   * 1. Format OhipNumber into common format: 1234-123-123
   * 2. Do check already used in our db - if exist - throw exception
   * 3. if not used yet by another patient -> Check by MdBilling  - if fail - throw exception based on params below
   *
   * @param showSpecificErrorMsgFromMdBilling - to show eror msg from MdBilling
   * @param allowInvalidByMdBilling - for case when ohip is not valid, if allowInvalidByMdBilling=false; in that case if ohip not valid - it will throw exception,
   *  if allowInvalidByMdBilling=true - it will return isValidBYMdBilling=false with mdBillingErrorMsg which should be written into db by parent methods. Also will not throwException even if mdBillingIsDown
   *
   * @param skipExceptionIfMdBillingIsDown - use it if allowInvalidByMdBilling=false, but you dont need to show error when mdBillingIsDown
   *
   * For debug from dev, and mock we using mod10 algorithm - based on which we return result. Example 1777777119 -> isValid= true.
   * More example numbers we get from http://sqa.fyicenter.com/1000484_Mod_10_Luhn_Algorithm_Checksum_Validator.html#Result
   */
  async clearAndValidateOhipExistenceAndCheckingByMdBilling({
    payloadOhipNumber: ohipNumberWithoutFormatting,
    payloadOhipVersionCode: ohipVersionCodeWithoutFormatting,
    currentPatientAuthUserId,
    allowEmpty = false,
    allowInvalidByMdBilling = false, // invalid by mdBilling and return errorMsg to saveLaterIntoDb
    showSpecificErrorMsgFromMdBilling = false,
    skipExceptionIfMdBillingIsDown = false,
  }: {
    payloadOhipNumber: string //without formatting
    payloadOhipVersionCode: string //without formatting
    currentPatientAuthUserId?: string
    allowEmpty?: boolean
    allowInvalidByMdBilling?: boolean
    showSpecificErrorMsgFromMdBilling?: boolean
    skipExceptionIfMdBillingIsDown?: boolean
  }): Promise<OhipData> {
    //if deleting ohip - we should not throw exception
    if (allowEmpty && !ohipNumberWithoutFormatting && !ohipVersionCodeWithoutFormatting) {
      return {
        cleanOhipCardNumber: null,
        cleanOhipCardVersionCode: null,
        isValidByMdBilling: false, //if number is empty in db - save notValid
        mdBillingErrorMsg: '',
      }
    }

    //for work on BE with ohip - we removing all dashed etc, leaving just digits
    const {cleanOhipCardNumber, cleanOhipCardVersionCode} = cleanAndValidateFormatOhipWithException(
      ohipNumberWithoutFormatting,
      ohipVersionCodeWithoutFormatting,
      this.i18nService,
    )

    await this.validateDoesPatientExistWithTheSameOhip({
      cleanOhipCardNumber,
      currentPatientAuthUserId,
      showSpecificErrorMsgFromMdBilling,
    })

    const {isValidByMdBilling, mdBillingErrorMsg} = await this.validateOhipByMdBilling({
      cleanOhipCardNumber,
      cleanOhipCardVersionCode,
      showSpecificErrorMsgFromMdBilling,
      allowInvalidByMdBilling,
      skipExceptionIfMdBillingIsDown,
    })

    return {
      cleanOhipCardNumber: cleanOhipCardNumber,
      cleanOhipCardVersionCode: cleanOhipCardVersionCode,
      isValidByMdBilling,
      mdBillingErrorMsg,
    }
  }

  private async validateOhipByMdBilling({
    cleanOhipCardNumber,
    cleanOhipCardVersionCode,
    showSpecificErrorMsgFromMdBilling = false,
    allowInvalidByMdBilling,
    skipExceptionIfMdBillingIsDown = false,
  }: {
    cleanOhipCardNumber: string
    cleanOhipCardVersionCode: string
    showSpecificErrorMsgFromMdBilling?: boolean
    allowInvalidByMdBilling?: boolean
    skipExceptionIfMdBillingIsDown?: boolean
  }): Promise<{
    isValidByMdBilling: boolean
    mdBillingErrorMsg: string
  }> {
    const validateOhip = await this.mDBillingAdapter.validateOHIP({
      BillingNumber: await this.getRandomStaffBillingNumber(),
      HealthCardNumber: cleanOhipCardNumber,
      VersionCode: cleanOhipCardVersionCode,
    })

    const {doesMdBillingIsDown, errorMessage} = getErrorMsgIfResponseFromMdBillingIfWrong({
      validateOhip,
      allowInvalidByMdBilling,
      skipExceptionIfMdBillingIsDown,
    })

    if (errorMessage) {
      throw new BadRequestException(errorMessage)
    }

    if (validateOhip?.data?.IsHealthCardValid) {
      return {isValidByMdBilling: true, mdBillingErrorMsg: ''}
    }

    /**
     * BELOW part if ohip NOT valid By MdBilling
     */

    StructuredLogger.info(logFunc.ValidateOhipByMdBilling, logAct.CartIsNotValidByMdBilling, {
      message: 'validateOhip.data?.IsHealthCardValid is false',
    })

    const mdBillingProdEnable = this.configService.getBool('MDBILLING_PROD')
    //for local/dev we allowing ohip numbers by mod10 algorithm
    if (!mdBillingProdEnable) {
      StructuredLogger.info(logFunc.ValidateOhipByMdBilling, logAct.CartIsNotValidByMdBilling, {
        message: 'mdBillingProdEnable is disabled',
      })

      if (doesLuhnValidationPassing(cleanOhipCardNumber)) {
        StructuredLogger.info(logFunc.ValidateOhipByMdBilling, logAct.CartIsNotValidByMdBilling, {
          message: 'Ohip is valid by mod10 for not prod env',
        })
        return {isValidByMdBilling: true, mdBillingErrorMsg: ''} // ohip is valid (emulate that all good for dev env)
      }
    }

    const errorMessages = getInvalidOhipErrorMsg({
      validateOhip,
      showSpecificErrorMsgFromMdBilling,
      allowInvalidByMdBilling,
      i18nService: this.i18nService,
    })

    if (allowInvalidByMdBilling || (skipExceptionIfMdBillingIsDown && doesMdBillingIsDown)) {
      return {isValidByMdBilling: false, mdBillingErrorMsg: errorMessages.errorMsg} //it will be saved into db sa not valid with errorMsg
    }
    StructuredLogger.info(logFunc.ValidateOhipByMdBilling, logAct.CartIsNotValidByMdBilling, {
      message: errorMessages.mdBillingErrors,
      errMsg: errorMessages.errorMsg,
    })
    throw new BadRequestWarningException(errorMessages.errorMsg)
  }

  /**
   *
   * @param cleanOhipCardNumber should be clean without dashes
   */
  private async validateDoesPatientExistWithTheSameOhip({
    cleanOhipCardNumber,
    currentPatientAuthUserId,
    showSpecificErrorMsgFromMdBilling,
  }: {
    cleanOhipCardNumber: string
    currentPatientAuthUserId: string
    showSpecificErrorMsgFromMdBilling?: boolean
  }): Promise<void> {
    const patientsWithOHIP = await this.patientRepository.findByOhipNumberAndAuthUserId(
      cleanOhipCardNumber,
      currentPatientAuthUserId,
    )

    if (!validateOhipExistence(currentPatientAuthUserId, patientsWithOHIP)) {
      throwErrorMsgForAlreadyExistOhip({
        showSpecificErrorMsgFromMdBilling,
        patientsWithOHIP,
        currentPatientAuthUserId,
        i18nService: this.i18nService,
      })
    }
  }

  private async getRandomStaffBillingNumber(): Promise<string> {
    const staffsWithBillingNumber = await this.staffRepository.findWithBillingNumber()

    const cleanStuffs = getStaffsWithTrimmedAndNotEmptyBillingNumber(staffsWithBillingNumber)
    if (!cleanStuffs?.length) {
      StructuredLogger.error(
        logFunc.GetRandomStaffBillingNumber,
        logAct.GetRandomStaffBillingNumberFailed,
        {
          message:
            'There is no any staff with billingNumber For MdBilling which needed to validate OHIP number in MdBilling.',
        },
      )
      throw new BadRequestException(this.i18nService.translate(i18Messages.SOMETHING_WENT_WRONG))
    }

    const randomCleanStuff = cleanStuffs[Math.floor(Math.random() * cleanStuffs.length)]

    writeErrorMsgIfBillingNumberHasBadFormat(randomCleanStuff)

    return randomCleanStuff.billingNumberForMdBilling
  }
}
