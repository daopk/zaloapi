import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'

// Extracted from https://github.com/tonyxu-io/pkce-generator

export function getCodeChallenge(code_verifier: string) {
  return SHA256(code_verifier).toString(Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}
