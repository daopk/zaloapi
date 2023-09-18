import { fetch } from '@zaloapi/shared'
import { oauthV4BaseURL } from './constant'

export { getCodeChallenge } from '@zaloapi/shared'

export interface GetAccessTokenBodyFromRefreshToken {
  grant_type: 'refresh_token'
  app_id: string
  refresh_token: string
}

export interface GetAccessTokenBodyFromAuthCode {
  grant_type: 'authorization_code'
  app_id: string
  code: string
  code_verifier?: string
}

export interface GetAccessTokenResponse {
  'access_token': string
  'refresh_token': string
  'expires_in': string
}

export type GetAccessTokenBody = GetAccessTokenBodyFromRefreshToken | GetAccessTokenBodyFromAuthCode

export function getAccessToken(secret_key: string, body: GetAccessTokenBody) {
  return fetch<GetAccessTokenResponse>('access_token', {
    method: 'POST',
    data: new URLSearchParams({ ...body }).toString(),
    baseURL: oauthV4BaseURL,
    headers: { secret_key },
  })
}
