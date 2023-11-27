import { fetch } from '@zaloapi/shared'
import { openapiV3BaseURL } from './constant'
import type { ZaloOAResponse } from './response'

export interface ZaloOAMediaTemplatePayloadElement {
  media_type: string
  url?: string
  attachment_id?: string
}

export type ZaloOAListTemplatePayloadElementAction = {
  type: 'oa.open.url'
  url: string
} | {
  type: 'oa.query.hide' | 'oa.query.show'
  /**
   * Payload should be a string that starts with #
   */
  payload: string
} | {
  type: 'oa.open.phone'
  payload: {
    phone_code: string
  }
} | {
  type: 'oa.open.sms'
  payload: {
    content: string
    phone_code: string
  }
}

export type ZaloOAButtonTemplatePayloadElement = {
  /**
   * Max length: 100
   */
  title: string
} & (
  | {
    type: 'oa.open.url'
    payload: {
      url: string
    }
  }
  | {
    type: 'oa.query.hide' | 'oa.query.show'
    payload: string
  }
  | {
    type: 'oa.open.phone'
    payload: {
      phone_code: string
    }
  }
  | {
    type: 'oa.open.sms'
    payload: {
      content: string
      phone_code: string
    }
  }
)

export interface ZaloOAListTemplatePayloadElement {
  title: string
  subtitle?: string
  image_url: string
  default_action?: ZaloOAListTemplatePayloadElementAction
}

export interface ZaloOAMediaTemplatePayload {
  template_type: 'media'
  elements: ZaloOAMediaTemplatePayloadElement[]
}

export interface ZaloOAListTemplatePayload {
  template_type: 'list'
  elements: ZaloOAListTemplatePayloadElement[]
}

export interface ZaloOAButtonTemplatePayload {
  template_type?: 'button'
  buttons: ZaloOAButtonTemplatePayloadElement[]
}

export type ZaloOAPromotionTemplatePayloadElement = {
  type: 'banner'
  image_url?: string
  attachment_id?: string
} | {
  type: 'header' | 'text'
  content: string
  align?: 'left' | 'center' | 'right'
} | {
  type: 'table'
  content: ({ key: string; value: string } | { key: 'Trạng thái' | 'Status'; value: string; style?: 'green' | 'blue' | 'yellow' | 'red' | 'grey' })[]
}

export type ZaloOAPromotionTemplatePayloadButton = ZaloOAButtonTemplatePayloadElement & {
  image_icon?: string
}

export interface ZaloOAPromotionTemplatePayload {
  template_type: 'promotion'
  language?: 'VI' | 'EN'
  elements: ZaloOAPromotionTemplatePayloadElement[]
  buttons?: ZaloOAPromotionTemplatePayloadButton[]
}

export type ZaloOATransactionTemplatePayloadElement =
    ZaloOAPromotionTemplatePayloadElement
export type ZaloOATransactionTemplatePayloadButton =
    ZaloOAPromotionTemplatePayloadButton

export interface ZaloOATransactionTemplatePayload {
  template_type:
  | 'transaction_billing'
  | 'transaction_order'
  | 'transaction_reward'
  | 'transaction_contract'
  | 'transaction_booking'
  | 'transaction_membership'
  | 'transaction_event'
  | 'transaction_transation' // typo in Zalo docs, keep it for backward compatibility, will be removed in next major version
  | 'transaction_transaction'
  | 'transaction_account'
  | 'transaction_internal'
  | 'transaction_partnership'
  | 'transaction_education'
  | 'transaction_rating'
  language?: 'VI' | 'EN'
  elements: ZaloOATransactionTemplatePayloadElement[]
  buttons?: ZaloOATransactionTemplatePayloadButton[]
}

export type ZaloOATemplatePayload = ZaloOAMediaTemplatePayload | ZaloOAListTemplatePayload | ZaloOAButtonTemplatePayload

export interface ZaloOATemplateAttachment {
  type: 'template'
  payload: ZaloOATemplatePayload
}

export interface ZaloOAPromotionTemplate {
  type: 'template'
  payload: ZaloOAPromotionTemplatePayload
}

export interface ZaloOATransactionTemplate {
  type: 'template'
  payload: ZaloOATransactionTemplatePayload
}

export interface ZaloOAFileAttachment {
  type: 'file'
  payload: {
    token: string
  }
}

export type ZaloOAAttachment = ZaloOATemplateAttachment | ZaloOAFileAttachment

export type SendMessageResponse = ZaloOAResponse<{
  message_id: string
  user_id: string
}>

export function sendPromotionMessage(access_token: string, user_id: string, attachment: ZaloOAPromotionTemplate) {
  const body = {
    recipient: { user_id },
    message: {
      attachment,
    },
  }

  return fetch<SendMessageResponse>('message/promotion', {
    method: 'POST',
    baseURL: openapiV3BaseURL,
    data: body,
    headers: { access_token },
  })
}

export function sendTransactionMessage(access_token: string, user_id: string, attachment: ZaloOATransactionTemplate) {
  const body = {
    recipient: { user_id },
    message: {
      attachment,
    },
  }

  return fetch<SendMessageResponse>('message/transaction', {
    method: 'POST',
    baseURL: openapiV3BaseURL,
    data: body,
    headers: { access_token },
  })
}

export function sendCSMessage(access_token: string, user_id: string, messageText?: string, attachment?: ZaloOAAttachment, quote_message_id?: string) {
  const body = {
    recipient: { user_id },
    message: {
      text: messageText,
      quote_message_id,
      attachment,
    },
  }

  return fetch<SendMessageResponse>('message/cs', {
    method: 'POST',
    baseURL: openapiV3BaseURL,
    data: body,
    headers: { access_token },
  })
}
