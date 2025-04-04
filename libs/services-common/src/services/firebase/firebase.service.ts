import {Injectable} from '@nestjs/common'

import {getApps, initializeApp, cert} from 'firebase-admin/app'
import {NestprojectConfigService} from '@libs/common/services/config/config-service'

const configService = NestprojectConfigService.getInstance()

@Injectable()
class FirebaseManager {
  private static instance: FirebaseManager = null

  constructor() {
    if (!getApps().length) {
      const serviceAccount = JSON.parse(configService.get('Nestproject_FIREBASE_ADMINSDK_SA'))

      initializeApp({
        credential: cert(serviceAccount),
      })
    }
  }

  static getInstance(): FirebaseManager {
    if (FirebaseManager.instance === null) {
      FirebaseManager.instance = new FirebaseManager()
    }

    return FirebaseManager.instance
  }
}

export {FirebaseManager}
