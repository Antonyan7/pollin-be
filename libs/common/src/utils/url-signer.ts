import url from 'url'
import {createHmac} from 'crypto'

/**
 * Convert from 'web safe' base64 to true base64.
 */
function removeWebSafe(safeEncodedString: string): string {
  return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/')
}

/**
 * Convert from true base64 to 'web safe' base64
 */
function makeWebSafe(encodedString: string): string {
  return encodedString.replace(/\+/g, '-').replace(/\//g, '_')
}

/**
 * Takes a base64 code and decodes it.
 */
function decodeBase64Hash(code: string): Buffer {
  return Buffer.from(code, 'base64')
}

/**
 * Takes a key and signs the data with it.
 */
function encodeBase64Hash(key: Buffer, data: string): string {
  return createHmac('sha1', key).update(data).digest('base64')
}

/**
 * Sign a URL using a secret key.
 */
function signUrl(path: string, secret: string): string {
  const uri = new URL(path)

  // /path/api/search?key=1
  const searchPath = uri.pathname + uri.search
  const safeSecret = decodeBase64Hash(removeWebSafe(secret))
  const hashedSignature = makeWebSafe(encodeBase64Hash(safeSecret, searchPath))

  return url.format(uri) + '&signature=' + hashedSignature
}

export {signUrl}
