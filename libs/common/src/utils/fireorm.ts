import * as fireorm from 'fireorm'
import {FirebaseAdminProvider} from '@libs/common/utils/firebase'

export function initFireORM(): void {
  // make sure admin sdk is initialized
  const firestore = FirebaseAdminProvider.init().firestore()

  fireorm.initialize(firestore)
}
