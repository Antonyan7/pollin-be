import {appCheck} from 'firebase-admin'
import crypto from 'crypto'

async function generateAppCheckToken(appId: string): Promise<string> {
  const appCheckToken = await appCheck().createToken(appId)
  return appCheckToken.token
}

function otpGenerator(): string {
  const otpGenerator = crypto.randomInt(0, 1000000)
  return otpGenerator.toString().padStart(6, '0')
}

const FirebaseHelpers = {
  generateAppCheckToken,
  otpGenerator,
}

export default FirebaseHelpers
