import { fetch } from '@zaloapi/shared'
import { openapiV2BaseURL } from './constant'
import type { ZaloOAResponse } from './response'

export interface OAInfo {
  oa_id: string
  name: string
  description: string
  oa_alias?: string
  is_verified: boolean
  /**
   * Loại OA:
   * - 2 - OA Doanh nghiệp
   * - 4 - OA Cơ quan nhà nước
   */
  oa_type: number
  cate_name: string
  num_follower: number
  avatar: string
  cover: string
  package_name: string
  package_valid_through_date?: string
  package_auto_renew_date?: string
  linked_zca?: string
}

export function getOAProfile(access_token: string) {
  return fetch<ZaloOAResponse<OAInfo>>('getoa', {
    baseURL: openapiV2BaseURL,
    headers: { access_token },
  })
}

/**
 * https://developers.zalo.me/docs/official-account/quan-ly/quan-ly-thong-tin-oa/lay-quota-tin-tu-van
 */
export function getOAQuotaMessage(access_token: string) {
  return fetch<ZaloOAResponse<{
    type: string
    remain: number
    total: number
  }>>('quota/message', {
    baseURL: openapiV2BaseURL,
    headers: { access_token },
  })
}
