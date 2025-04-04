import {DateTimeUtil} from '@libs/common'
import {AuthUserFixture} from './auth.fixture'
import {HistoryUserType} from '@libs/common/enums'
import {patientConsentPackageFixture} from './patient-consent-package.fixture'
import {PatientConsentPackageHistory} from '@libs/data-layer/apps/users/entities/fireorm/patient-consent-package-history.entity'
import {
  ConsentPackageStatus,
  getPatientConsentPackageStatusTitle,
} from '@libs/data-layer/apps/users/enum'

const dateTimeUtil: DateTimeUtil = new DateTimeUtil()

export const patientConsentPackageHistoryFixture: Partial<PatientConsentPackageHistory> = {
  id: '1',
  authUserFullName: 'Apc Staff User',
  authUserId: AuthUserFixture.emailVerified.uid,
  authUserType: HistoryUserType.SystemAdmin,
  patientConsentPackageId: patientConsentPackageFixture.id,
  date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('05-05-2001')),
  changes: [
    {
      propertyName: 'Status',
      from: '-',
      to: getPatientConsentPackageStatusTitle.get(ConsentPackageStatus.Incomplete),
    },
  ],
}

export const patientConsentPackageHistoryForSequenceFixture: Partial<PatientConsentPackageHistory> =
  {
    id: '2',
    authUserFullName: 'Apx Staff User',
    authUserId: AuthUserFixture.emailVerified.uid,
    authUserType: HistoryUserType.Partner,
    patientConsentPackageId: patientConsentPackageFixture.id,
    date: dateTimeUtil.getFirestoreTimeStampFromDate(dateTimeUtil.toDate('06-06-2001')),
    changes: [
      {
        propertyName: 'Status',
        from: '-',
        to: getPatientConsentPackageStatusTitle.get(ConsentPackageStatus.Completed),
      },
    ],
  }
