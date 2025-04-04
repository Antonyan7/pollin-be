import {DecodedIdToken} from 'firebase-admin/auth'
import {getAuth, CreateRequest, UserRecord} from 'firebase-admin/auth'
import {StructuredLogger} from '@libs/common'
import * as activityLogs from '@libs/common/enums/activity-logs'
import {handleError} from '@libs/services-common/helpers/error-handling'

class FirebaseAuthAdapter {
  private readonly firebaseAuth = getAuth()

  async verifySessionCookie(sessionCookie: string): Promise<DecodedIdToken> {
    // Don't make Firebase server call for every check
    // Only check for expiry when renewing
    const checkCookiesRevoked = false
    let decodedCookie = null
    try {
      decodedCookie = await this.firebaseAuth.verifySessionCookie(
        sessionCookie,
        checkCookiesRevoked,
      )
    } catch (error) {
      StructuredLogger.error(
        activityLogs.FirebaseAuthAdapterFunctions.VerifySessionCookie,
        activityLogs.FirebaseAuthAdapterActions.VerifySessionCookieFailed,
        error,
      )
      return null
    }
    return decodedCookie
  }

  async createSessionCookie(idToken: string, expiryMinutes: number): Promise<string> {
    const expiresIn = expiryMinutes * 60 * 1000
    let sessionCookie = null
    try {
      sessionCookie = await this.firebaseAuth.createSessionCookie(idToken, {expiresIn})
    } catch (error) {
      StructuredLogger.error(
        activityLogs.FirebaseAuthAdapterFunctions.CreateSessionCookie,
        activityLogs.FirebaseAuthAdapterActions.CreateSessionCookieFailed,
        error,
      )
      return null
    }
    return sessionCookie
  }

  async createAuthUser(props: CreateRequest): Promise<string> {
    try {
      const authUser = await this.firebaseAuth.createUser(props)

      return authUser.uid
    } catch (error) {
      StructuredLogger.error(
        activityLogs.FirebaseAuthAdapterFunctions.CreateAuthUser,
        activityLogs.FirebaseAuthAdapterActions.CreateAuthUserFailed,
        error,
      )
      return null
    }
  }

  async getAuthUserByEmail(email: string): Promise<UserRecord> {
    try {
      return await this.firebaseAuth.getUserByEmail(email)
    } catch (error) {
      StructuredLogger.error(
        activityLogs.FirebaseAuthAdapterFunctions.GetAuthUserByEmail,
        activityLogs.FirebaseAuthAdapterActions.GetAuthUserByEmailFailed,
        error,
      )
      return null
    }
  }

  async getAuthUserById(id: string): Promise<UserRecord> {
    try {
      return await this.firebaseAuth.getUser(id)
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.FirebaseAuthAdapterFunctions.GetAuthUserById,
        eventName: activityLogs.FirebaseAuthAdapterActions.GetAuthUserByIdFailed,
      })
    }
  }

  async updateAuthUserPassword(id: string, password: string): Promise<UserRecord> {
    try {
      return await this.firebaseAuth.updateUser(id, {password})
    } catch (error) {
      handleError(error, {
        functionName: activityLogs.FirebaseAuthAdapterFunctions.UpdateAuthUserPassword,
        eventName: activityLogs.FirebaseAuthAdapterActions.UpdateAuthUserPasswordFailed,
      })
    }
  }
}

export {FirebaseAuthAdapter}
