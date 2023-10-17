import { sha256 } from 'ohash'

export function generateSignature(appId: string, data: string, timestamp: string, oASecretKey: string) {
  const parts: string[] = [appId, data, timestamp, oASecretKey]

  const hash = sha256(parts.join(''))

  return `mac=${hash}`
}
