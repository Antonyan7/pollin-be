import {Module} from '@nestjs/common'
import {TypeORMConfiguration} from '@libs/data-layer/configurations/typeorm.config'
import {AppConfigRepository} from '@libs/data-layer/apps/core/repositories/fireorm/app-config.repository'
import {OTPCodeRepository} from '@libs/data-layer/apps/users/repositories/fireorm/otp-codes.repository'
import {BookingIntentRepository} from '@libs/data-layer/apps/scheduling/repositories/fireorm/booking-intent.repository'
import {QuestionnaireIntentRepository} from '@libs/data-layer/apps/questionnaires/repositories/fireorm/questionnaire-intent.repository'
import {CartRepository} from '@libs/data-layer/apps/checkout/repositories/fireorm/cart.repository'
import {CloudTaskRepository} from '@libs/data-layer/apps/users/repositories/fireorm/cloud-task.repository'
import {IcFormRepository} from '@libs/data-layer/apps/users/repositories/fireorm/ic-form.repository'
import {PatientMedicationHistoryRepository} from '@libs/data-layer/apps/medication/repositories/fireorm/patient-medication-history.repository'
import {TestResultHistoryRepository} from './apps/clinic-test/repositories/fireorm'
import {ThyroidProtocolHistoryRepository} from './apps/clinic-test/repositories/fireorm/thyroid-protocol-history.repository'

@Module({
  imports: [TypeORMConfiguration],
  providers: [
    AppConfigRepository,
    OTPCodeRepository,
    BookingIntentRepository,
    QuestionnaireIntentRepository,
    CartRepository,
    IcFormRepository,
    PatientMedicationHistoryRepository,
    CloudTaskRepository,
    TestResultHistoryRepository,
    ThyroidProtocolHistoryRepository,
  ],
  exports: [
    AppConfigRepository,
    OTPCodeRepository,
    BookingIntentRepository,
    QuestionnaireIntentRepository,
    CartRepository,
    IcFormRepository,
    PatientMedicationHistoryRepository,
    CloudTaskRepository,
    TestResultHistoryRepository,
    ThyroidProtocolHistoryRepository,
    TypeORMConfiguration,
  ],
})
export class DataLayerModule {}
