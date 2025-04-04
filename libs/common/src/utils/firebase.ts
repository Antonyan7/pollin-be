import {App, cert, getApps, initializeApp} from 'firebase-admin/app'
import {Firestore, getFirestore} from 'firebase-admin/firestore'
import {Timestamp} from 'firebase-admin/firestore'

/**
 * Make sure that firebase app is initialized once
 */
class FirebaseAdminProvider {
  private static instance: FirebaseAdminProvider = null
  private app: App

  constructor(isAudit?: boolean) {
    if (!getApps().length) {
      const serviceAccount = JSON.parse(
        // lint comment to avoid dependency on Nest config
        // eslint-disable-next-line no-process-env
        isAudit ? process.env.Nestproject_AUDIT_FIRESTORE_SA : process.env.Nestproject_FIREBASE_ADMINSDK_SA,
      )

      this.app = initializeApp({
        credential: cert(serviceAccount),
      })
    }
  }

  static init(isAudit?: boolean): FirebaseAdminProvider {
    if (FirebaseAdminProvider.instance === null) {
      FirebaseAdminProvider.instance = new FirebaseAdminProvider(isAudit)
    }

    return FirebaseAdminProvider.instance
  }

  getApp(): App {
    return this.app
  }

  firestore(): Firestore {
    return getFirestore()
  }
}

export {FirebaseAdminProvider}

export {Timestamp}
