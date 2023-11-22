import { fetch } from '@zaloapi/shared'
import { businessBaseURL } from './constant'
import type { ZaloOAResponse } from './response'

export interface ZNSTemplateInfo {
  templateId: number
  templateName: string
  status: string
  listParams: {
    name: string
    require: boolean
    type: string
    maxLength: number
    minLength: number
    acceptNull: boolean
  }[]
  timeout: number
  previewUrl: string
  templateQuality: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNDEFINED'
  templateTag: 'OTP' | 'IN_TRANSACTION' | 'POST_TRANSACTION' | 'ACCOUNT_UPDATE' | 'GENERAL_UPDATE' | 'FOLLOW_UP'
  price: string
  applyTemplateQuota: boolean
  templateDailyQuota: string
  templateRemainingQuota: string
}

export type ZNSTemplateInfoResponse = ZaloOAResponse<ZNSTemplateInfo>

export type ZNSMessageTemplateResponse = ZaloOAResponse<{
  msg_id: string
  sent_time: string
  quota?: {
    dailyQuota: string
    remainingQuota: string
  }
}>

export function getZNSTemplateInfo(access_token: string, template_id: string | number) {
  return fetch<ZNSTemplateInfoResponse>('template/info', {
    baseURL: businessBaseURL,
    params: {
      template_id,
    },
    headers: {
      access_token,
    },
  })
}

export function sendZNSTemplateMessage(
  access_token: string,
  phone: string,
  template_id: string | number,
  template_data: Record<string, any> = {},
  tracking_id?: string,
  production = false,
) {
  const body: Record<string, any> = {
    phone,
    template_id: String(template_id),
    template_data,
    tracking_id,
  }

  if (!production)
    body.mode = 'development'

  return fetch<ZNSMessageTemplateResponse>('message/template', {
    baseURL: businessBaseURL,
    method: 'POST',
    data: body,
    headers: { access_token },
  })
}

export function getZNSQuota(access_token: string) {
  return fetch<ZaloOAResponse<{
    dailyQuota: number
    remainingQuota: number
  }>>('message/quota', {
    baseURL: businessBaseURL,
    headers: { access_token },
  })
}

export function getZNSMessageStatus(access_token: string, message_id: string) {
  return fetch<ZaloOAResponse<{
    delivery_time: string
    message: string
    status: number
  }>>('message/status', {
    baseURL: businessBaseURL,
    headers: { access_token },
    params: {
      message_id,
    },
  })
}

export type ZNSMessageTemplateTag = 'OTP' | 'IN_TRANSACTION' | 'POST_TRANSACTION' | 'ACCOUNT_UPDATE' | 'GENERAL_UPDATE' | 'FOLLOW_UP'

export function getZNSMessageTemplateTag(access_token: string) {
  return fetch<ZaloOAResponse<ZNSMessageTemplateTag[]>>('message/template-tag', {
    baseURL: businessBaseURL,
    headers: { access_token },
  })
}

export type ZNSQuality = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNDEFINED'

export type ZNSTemplateListResponse = ZaloOAResponse<{
  templateId: number
  templateName: string
  createdTime: number
  status: 'PENDING_REVIEW' | 'DISABLE' | 'ENABLE' | 'REJECT'
  templateQuality: ZNSQuality
}[]> & {
  metadata: {
    total: number
  }
}

export function getZNSTemplateList(access_token: string, offset: number, limit: number, status?: number) {
  return fetch<ZNSTemplateListResponse>('template/all', {
    baseURL: businessBaseURL,
    headers: { access_token },
    params: {
      offset,
      limit,
      status,
    },
  })
}

export function getZNSSampleData(access_token: string, template_id: string | number) {
  return fetch<ZaloOAResponse<Record<string, any>>>('template/sample-data', {
    baseURL: businessBaseURL,
    headers: { access_token },
    params: {
      template_id,
    },
  })
}

export interface ZNSRating {
  note: string
  rate: number
  submitDate: string
  msgId: string
  feedback: string[]
  trackingId: string
}

/**
 * @param access_token Đoạn mã cần truyền vào để xác minh quyền sử dụng API.
 * @param template_id ID của template cần lấy thông tin.
 * @param from_time Thời điểm bắt đầu của khoảng thời gian cần lấy dữ liệu được gửi lên hệ thống. Lưu ý: Định dạng timestamp (đơn vị: millisecond).
 * @param to_time Thời điểm kết thúc của khoảng thời gian cần lấy dữ liệu được gửi lên hệ thống. Lưu ý: Định dạng timestamp (đơn vị: millisecond).
 * @param offset Vị trí thứ tự của đánh giá đầu tiên được trả về.
 * @param limit Số lượng đánh giá tối đa được trả về.
 */
export function getZNSRating(access_token: string, template_id: string | number, from_time: number, to_time: number, offset: number, limit: number) {
  return fetch<ZaloOAResponse<{
    data: ZNSRating[]
    total: number
  }>>('rating/get', {
    baseURL: businessBaseURL,
    headers: { access_token },
    params: {
      template_id,
      from_time,
      to_time,
      offset,
      limit,
    },
  })
}

export function getZNSQuality(access_token: string) {
  return fetch<ZaloOAResponse<{
    oaCurrentQuality: ZNSQuality
    oa7dayQuality: ZNSQuality
  }>>('quality', {
    baseURL: businessBaseURL,
    headers: { access_token },
  })
}
