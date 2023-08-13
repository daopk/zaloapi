import FormData from 'form-data'
import { fetch } from '@zaloapi/shared'
import { openapiV2BaseURL } from './constant'
import type { ZaloOAResponse } from './response'

// eslint-disable-next-line n/prefer-global/buffer
type FileType = Blob | File | Buffer

export function uploadImage(access_token: string, file: FileType, filename: string) {
  const data = new FormData()
  data.append('file', file, { filename })

  return fetch<ZaloOAResponse<{ attachment_id: string }>>('upload/image', {
    method: 'POST',
    baseURL: openapiV2BaseURL,
    data,
    headers: { access_token },
  })
}

export function uploadGif(access_token: string, file: FileType, filename: string) {
  const data = new FormData()
  data.append('file', file, { filename })

  return fetch<ZaloOAResponse<{ attachment_id: string }>>('upload/gif', {
    method: 'POST',
    baseURL: openapiV2BaseURL,
    data,
    headers: { access_token },
  })
}

export function uploadFile(access_token: string, file: FileType, filename: string) {
  const data = new FormData()
  data.append('file', file, { filename })

  return fetch<ZaloOAResponse<{ token: string }>>('upload/file', {
    method: 'POST',
    baseURL: openapiV2BaseURL,
    data,
    headers: { access_token },
  })
}
