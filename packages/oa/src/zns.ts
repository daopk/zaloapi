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

export function getZNSTemplateInfo(access_token: string, templateId: string | number) {
  return fetch<ZNSTemplateInfoResponse>('template/info', {
    baseURL: businessBaseURL,
    params: {
      template_id: templateId,
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
