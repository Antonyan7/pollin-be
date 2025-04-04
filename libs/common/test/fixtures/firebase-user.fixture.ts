import {UserRecord, PhoneMultiFactorInfo} from 'firebase-admin/auth'

export const userRecordFixture: Partial<UserRecord> = {
  email: 'fhealthdev+emailForPatientProfile@gmail.com',
  multiFactor: {
    toJSON: async () => '',
    enrolledFactors: [
      {
        uid: '4fd942c0-8af5-43f9-9a88-000000000000',
        factorId: 'phone',
        displayName: '',
        enrollmentTime: 'Wed, 03 Aug 2022 20:17:51 GMT',
        phoneNumber: '+ 000 000 000 00',
      } as PhoneMultiFactorInfo,
    ],
  },
  phoneNumber: undefined,
  metadata: null,
  disabled: false,
  emailVerified: true,
  providerData: null,
}

export const userEmailVerifiedRecordFixture: Partial<UserRecord> = {
  email: 'fhealthdev+emailVerified@gmail.com',
  multiFactor: {
    toJSON: async () => '',
    enrolledFactors: [
      {
        uid: '4fd942c0-8af5-43f9-9a88-000000000000',
        factorId: 'phone',
        displayName: '',
        enrollmentTime: 'Wed, 03 Aug 2022 20:17:51 GMT',
        phoneNumber: '+14092841029',
      } as PhoneMultiFactorInfo,
    ],
  },
  phoneNumber: undefined,
  metadata: null,
  disabled: false,
  emailVerified: true,
  providerData: null,
}

export const userPatientUpdateRecordFixture: Partial<UserRecord> = {
  email: 'fhealthdev+PatientUpdate@gmail.com',
  multiFactor: {
    toJSON: async () => '',
    enrolledFactors: [
      {
        uid: '55d942c0-8af5-43f9-9a88-000000000000',
        factorId: 'phone',
        displayName: '',
        enrollmentTime: 'Wed, 03 Aug 2022 20:17:51 GMT',
        phoneNumber: '+14092846629',
      } as PhoneMultiFactorInfo,
    ],
  },
  phoneNumber: undefined,
  metadata: null,
  disabled: false,
  emailVerified: true,
  providerData: null,
}
