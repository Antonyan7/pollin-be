import {UserRecord} from 'firebase-admin/auth'
import {AuthMFAfactorTypes} from '@libs/common/enums'
import {AppCheckFixture} from '@libs/common/test/fixtures/app-check.fixture'
import {
  allAuthUserFixtures,
  AuthUser,
  AuthUserFixture,
} from '@libs/common/test/fixtures/auth.fixture'
import {
  staffForCreatePatientAndAppointmentFixture,
  staffForReassignTaskFixture,
  staffForUltrasoundFolliclesFixture,
  staffJourneyFixture,
  stafForUnreadTasksBadgeFixture,
  staffUserFixture,
  staffWithMockedAssignorIdFixture,
} from '@libs/common/test/fixtures/staff.fixture'
import {Staff} from '@libs/data-layer/apps/clinic-tasks/entities/staff.entity'
export const PhoneNumberMFAFirstForUserMock = '11111'
export const PhoneNumberMFASecondForUserMock = '+15554443333'

const mfaUserAuth = (uid: string, email = 'email'): unknown => ({
  uid,
  email,
  emailVerified: true,
  email_verified: true,
  multiFactor: {
    enrolledFactors: [
      {
        factorId: AuthMFAfactorTypes.Phone,
        phoneNumber: PhoneNumberMFAFirstForUserMock,
      },
      {
        factorId: AuthMFAfactorTypes.Phone,
        phoneNumber: PhoneNumberMFASecondForUserMock,
      },
    ],
  },
})

const sessionData = (uid: string, email: string, email_verified = true): unknown => ({
  email,
  email_verified,
  uid,
  user_id: uid,
  iat: 'iat',
  exp: 'exp',
})

const staffAuth = (staff: Partial<Staff>): Partial<AuthUser> => {
  return {
    uid: staff.authUserId,
    staffId: staff.id,
    staffUUID: staff.uuid,
    email: staff.email,
    name: `${staff.firstName} ${staff.lastName}`,
  }
}

/** Function maps mocked uid to staff fixture data */
const getStaffAuthUser = (uid: string): Partial<AuthUser> => {
  switch (uid) {
    case AuthUserFixture.journey.uid:
      return staffAuth(staffJourneyFixture)

    case AuthUserFixture.unreadTasksCount.uid:
      return staffAuth(stafForUnreadTasksBadgeFixture)
    case AuthUserFixture.taskReassign.uid:
      return staffAuth(staffForReassignTaskFixture)
    case AuthUserFixture.ultrasound.uid:
      return staffAuth(staffForUltrasoundFolliclesFixture)
    case AuthUserFixture.createPatientAndAppointmentWeb.uid:
      return staffAuth(staffForCreatePatientAndAppointmentFixture)
    case AuthUserFixture.clinicScheduling.uid:
      return staffAuth(staffJourneyFixture)
    case AuthUserFixture.cart.uid:
      return staffAuth(staffUserFixture)

    default:
      return staffAuth(staffWithMockedAssignorIdFixture)
  }
}

const tokenData = (authUser: Partial<AuthUser>): unknown => ({
  email: authUser.email,
  email_verified: authUser?.email_verified,
  uid: authUser.uid,
  iat: 'iat',
  exp: 'exp',
  staffId: authUser?.staffId,
  staffUUID: authUser?.staffUUID,
  name: authUser?.name,
})

export class FirebaseAuthAdapter {
  async getAuthUserByEmail(email: string): Promise<unknown> {
    // specific cases
    switch (email) {
      case AuthUserFixture.notFoundAuth.email:
        return Promise.reject('Mock: Not Found')

      case AuthUserFixture.emailVerifiedWithoutMFA.email:
        return {
          uid: AuthUserFixture.emailVerifiedWithoutMFA.uid,
          email: AuthUserFixture.emailVerifiedWithoutMFA.email,
          emailVerified: true,
          email_verified: true,
        }
    }

    const authUserByEmail = allAuthUserFixtures.find((authUser) => authUser.email == email)
    if (authUserByEmail) {
      return {
        uid: authUserByEmail.uid,
        email: authUserByEmail.email,
      }
    }
    return null
  }

  async verifyAppCheckToken(token: string): Promise<unknown> {
    // specific cases
    switch (token) {
      case AuthUserFixture.notFoundAuth.idToken:
        return null
    }

    if (token == AppCheckFixture.Invalid) {
      return Promise.reject(`Mock: App checkToken is invalid`)
    }
    return Promise.resolve()
  }

  async verifySessionCookie(sessionCookie: string): Promise<unknown> {
    // specific cases
    switch (sessionCookie) {
      case AuthUserFixture.notFoundAuth.sessionCookie:
        return null
    }

    const authUserBySession = allAuthUserFixtures.find(
      (authUser) => authUser.sessionCookie == sessionCookie,
    )
    if (authUserBySession) {
      return sessionData(authUserBySession.uid, authUserBySession.email)
    }

    return null
  }

  async getAuthUserById(uid: string): Promise<unknown> {
    // specific cases
    switch (uid) {
      case AuthUserFixture.emailNotVerified.uid:
        return {
          uid: AuthUserFixture.emailNotVerified.uid,
          email: AuthUserFixture.emailNotVerified.email,
          emailVerified: false,
          email_verified: false,
        }
      case AuthUserFixture.verifyOtpEmailNotVerified.uid:
        return {
          uid: AuthUserFixture.verifyOtpEmailNotVerified.uid,
          email: AuthUserFixture.verifyOtpEmailNotVerified.email,
          emailVerified: false,
          email_verified: false,
        }
      case AuthUserFixture.emailVerifiedWithoutMFA.uid:
        return {
          uid: AuthUserFixture.emailVerifiedWithoutMFA.uid,
          email: AuthUserFixture.emailVerifiedWithoutMFA.email,
          emailVerified: true,
          email_verified: true,
        }
      case AuthUserFixture.contactInformationAuthUserId.uid:
        return {
          uid: AuthUserFixture.contactInformationAuthUserId.uid,
          email: AuthUserFixture.contactInformationAuthUserId.email,
          emailVerified: true,
          email_verified: true,
          multiFactor: {
            enrolledFactors: [
              {
                factorId:
                  AuthUserFixture.contactInformationAuthUserId.multiFactor.enrolledFactors[0]
                    .factorId,
                phoneNumber:
                  AuthUserFixture.contactInformationAuthUserId.multiFactor.enrolledFactors[0]
                    .phoneNumber,
              },
            ],
          },
        }
      case AuthUserFixture.cartConfirmThreeCases.uid:
        return {
          uid: AuthUserFixture.cartConfirmThreeCases.uid,
          email: AuthUserFixture.cartConfirmThreeCases.email,
          emailVerified: true,
          email_verified: true,
          multiFactor: {
            enrolledFactors: [
              {
                factorId:
                  AuthUserFixture.cartConfirmThreeCases.multiFactor.enrolledFactors[0].factorId,
                phoneNumber:
                  AuthUserFixture.cartConfirmThreeCases.multiFactor.enrolledFactors[0].phoneNumber,
              },
            ],
          },
        }
      case AuthUserFixture.partnerInvitationAccept.uid:
        return {
          uid: AuthUserFixture.partnerInvitationAccept.uid,
          email: AuthUserFixture.partnerInvitationAccept.email,
          emailVerified: true,
          email_verified: true,
          multiFactor: {
            enrolledFactors: [
              {
                factorId:
                  AuthUserFixture.partnerInvitationAccept.multiFactor.enrolledFactors[0].factorId,
                phoneNumber:
                  AuthUserFixture.partnerInvitationAccept.multiFactor.enrolledFactors[0]
                    .phoneNumber,
              },
            ],
          },
        }
      case AuthUserFixture.authEmailNotVerifiedAcuityCrossRegistration.uid:
        return {
          uid: AuthUserFixture.authEmailNotVerifiedAcuityCrossRegistration.uid,
          email: AuthUserFixture.authEmailNotVerifiedAcuityCrossRegistration.email,
          emailVerified: false,
          email_verified: false,
        }
    }

    const authUserByUid = allAuthUserFixtures.find((authUser) => authUser.uid == uid)
    if (authUserByUid) {
      return mfaUserAuth(uid, authUserByUid.email)
    }

    return null
  }

  async updateAuthUserPassword(): Promise<void> {
    Promise.resolve(null)
  }

  async updateAuthUserEmail(): Promise<void> {
    return
  }

  async updateAuthUserPhoneNumber(): Promise<void> {
    return
  }

  async verifyIdToken(idToken: string): Promise<unknown> {
    // specific cases
    switch (idToken) {
      case AuthUserFixture.notFoundAuth.idToken:
        return null
    }

    const authUserByToken = allAuthUserFixtures.find((authUser) => authUser.idToken == idToken)
    if (authUserByToken) {
      return tokenData(authUserByToken)
    }

    return null
  }

  async verifyAuthUserEmail(uid: string): Promise<UserRecord> {
    if (uid === 'verifyAuthUserEmail') {
      return {uid} as UserRecord
    }
  }

  async verifySamlIdentityProviderToken(idToken: string): Promise<unknown> {
    // specific cases
    switch (idToken) {
      case AuthUserFixture.notFoundAuth.idToken:
        return null
    }

    const authUserByToken = allAuthUserFixtures.find((authUser) => authUser.idToken == idToken)
    if (authUserByToken) {
      return tokenData(getStaffAuthUser(authUserByToken.uid))
    }

    return null
  }

  async setNewCustomClaimsForBucket(): Promise<void> {
    return
  }

  async deleteCustomClaimsForBucket(): Promise<void> {
    return
  }

  async createAuthUser(payload: {email: string}): Promise<string> {
    return payload?.email + '_mocked'
  }

  async deleteUser(): Promise<void> {
    return
  }
}
