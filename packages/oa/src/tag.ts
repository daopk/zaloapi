import { fetch } from '@zaloapi/shared'
import { openapiV2BaseURL } from './constant'
import type { ZaloOAResponse } from './response'

export function getTagsOfOa(access_token: string) {
  return fetch<ZaloOAResponse<string[]>>('tag/gettagsofoa', {
    baseURL: openapiV2BaseURL,
    headers: { access_token },
  })
}

export function tagFollower(access_token: string, user_id: string, tag_name: string) {
  const data = { user_id, tag_name }
  return fetch<ZaloOAResponse<never>>('tag/tagfollower', {
    method: 'POST',
    data,
    baseURL: openapiV2BaseURL,
    headers: { access_token },
  })
}

export function rmFollowerFromTag(access_token: string, user_id: string, tag_name: string) {
  const data = { user_id, tag_name }
  return fetch<ZaloOAResponse<never>>('tag/rmfollowerfromtag', {
    method: 'POST',
    data,
    baseURL: openapiV2BaseURL,
    headers: { access_token },
  })
}

export function rmTag(access_token: string, tag_name: string) {
  const data = { tag_name }
  return fetch<ZaloOAResponse<never>>('tag/rmtag', {
    method: 'POST',
    data,
    baseURL: openapiV2BaseURL,
    headers: { access_token },
  })
}
