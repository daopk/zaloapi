import { fetch } from '@zaloapi/shared'
import { openapiV3BaseURL } from './constant'
import type { ZaloOAResponse } from './response'

export function getMessageQuota(access_token: string, user_id: string) {
  return fetch<ZaloOAResponse<{
    /**
     * Thời gian tương tác cuối cùng của user với OA (định dạng unix milliseconds)
     */
    last_interaction: string
    cs_reply: {
      /**
       * số lượt gửi tin tư vấn miễn phí còn lại
       */
      remain: number
      /**
       * tổng số lượng gửi tin tư vấn miễn phí
       */
      total: number
    }
    promotion: {
      /**
       * số lượt gửi tin truyền thông còn lại trong ngày
       */
      daily_remain: number
      /**
       * tổng số lượt gửi tin truyền thông trong ngày
       */
      daily_total: number
      /**
       * số lượt gửi tin truyền thông còn lại trong tháng
       */
      monthly_remain: number
      /**
       * tổng số lượt gửi tin truyền thông trong tháng
       */
      monthly_total: number
    }
  }>>('quota/message', {
    method: 'POST',
    baseURL: openapiV3BaseURL,
    data: { user_id },
    headers: { access_token },
  })
}
