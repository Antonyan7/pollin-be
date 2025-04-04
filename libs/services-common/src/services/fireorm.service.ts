import * as fireorm from 'fireorm'
import {getFirestore} from 'firebase-admin/firestore'
import {FirebaseManager} from '@libs/services-common/services/firebase/firebase.service'

class FireORMService {
  constructor() {
    FirebaseManager.getInstance()
    fireorm.initialize(getFirestore())
  }
}

export {FireORMService}
