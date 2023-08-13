import { fetch } from '@zaloapi/shared'
import { graphV2BaseURL } from './constant'

export interface UserProfile {
  is_sensitive: boolean
  name: string
  id: string
  error: number
  message: string
  birthday: string
  gender: string
  picture: {
    data?: {
      url?: string
    }
  }
}

export function getProfile(access_token: string, fields = 'id,name,picture') {
  return fetch<UserProfile>('me', {
    baseURL: graphV2BaseURL,
    params: { fields },
    headers: { access_token },
  })
}
