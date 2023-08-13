import { fetch } from '@zaloapi/shared'
import { openapiV2BaseURL } from './constant'
import type { ZaloOAResponse } from './response'

export type GetOAResponse = ZaloOAResponse<{
  oa_id: string
  description: string
  name: string
  avatar: string
  cover: string
  is_verified: boolean
}>

export function getOAProfile(access_token: string) {
  return fetch<GetOAResponse>('getoa', {
    baseURL: openapiV2BaseURL,
    headers: { access_token },
  })
}
