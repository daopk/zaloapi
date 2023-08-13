import { fetch } from '@zaloapi/shared'
import { openapiV2BaseURL } from './constant'
import type { ZaloOAResponse } from './response'

export interface UserProfile {
  avatar: string
  avatars: {
    '120': string
    '240': string
  }
  user_gender: number
  user_id: string
  user_id_by_app: string
  is_sensitive: boolean
  display_name: string
  shared_info?: Record<string, any>
  tags_and_notes_info: {
    notes: string[]
    tag_names: string[]
  }
}

export type GetFollowersResponse = ZaloOAResponse<{
  total: number
  followers: {
    user_id: string
  }[]
}>

export interface UpdateFollowerInfoBody {
  user_id: string
  name: string
  phone: string
  address: string
  city_id: number
  district_id: number
}

export function getProfile(access_token: string, user_id: string) {
  const params = { data: JSON.stringify({ user_id }) }

  return fetch<ZaloOAResponse<UserProfile>>('getprofile', {
    baseURL: openapiV2BaseURL,
    params,
    headers: { access_token },
  })
}

export function getFollowers(access_token: string, offset = 0, count = 50, tag_name?: string) {
  const params = { data: JSON.stringify({ offset, count, tag_name }) }
  return fetch<GetFollowersResponse>('getfollowers', {
    baseURL: openapiV2BaseURL,
    params,
    headers: { access_token },
  })
}

export function updateFollowerInfo(access_token: string, data: UpdateFollowerInfoBody) {
  return fetch<ZaloOAResponse<never>>('updatefollowerinfo', {
    baseURL: openapiV2BaseURL,
    method: 'POST',
    data,
    headers: { access_token },
  })
}

export function deleteFollowerInfo(access_token: string, user_id: string) {
  const data = { user_id }
  return fetch<ZaloOAResponse<never>>('deletefollowerinfo', {
    baseURL: openapiV2BaseURL,
    method: 'POST',
    data,
    headers: { access_token },
  })
}
