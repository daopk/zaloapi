import type { ZaloOAButtonTemplatePayloadElement, ZaloOAFileAttachment, ZaloOAListTemplatePayloadElement, ZaloOAMediaTemplatePayloadElement, ZaloOAPromotionTemplate, ZaloOAPromotionTemplatePayloadButton, ZaloOAPromotionTemplatePayloadElement, ZaloOATemplateAttachment } from './message'

export function buildStickerTemplate(stickerId: string): ZaloOATemplateAttachment {
  return {
    type: 'template',
    payload: {
      template_type: 'media',
      elements: [
        {
          media_type: 'sticker',
          attachment_id: stickerId,
        },
      ],
    },
  }
}

export function buildImageTemplate(urlOrAttachmentId: string, media_type: 'image' | 'gif' = 'image'): ZaloOATemplateAttachment {
  const element: ZaloOAMediaTemplatePayloadElement = {
    media_type,
  }

  if (/^https?:\/\//.test(urlOrAttachmentId))
    element.url = urlOrAttachmentId
  else
    element.attachment_id = urlOrAttachmentId

  return {
    type: 'template',
    payload: {
      template_type: 'media',
      elements: [element],
    },
  }
}

/**
 * @deprecated V3 does not support this template
 */
export function buildListTemplate(elements: ZaloOAListTemplatePayloadElement[]): ZaloOATemplateAttachment {
  return {
    type: 'template',
    payload: {
      template_type: 'list',
      elements,
    },
  }
}

export function buildButtonTemplate(buttons: ZaloOAButtonTemplatePayloadElement[]): ZaloOATemplateAttachment {
  return {
    type: 'template',
    payload: {
      buttons,
    },
  }
}

export function buildPromotionTemplate(elements: ZaloOAPromotionTemplatePayloadElement[], buttons?: ZaloOAPromotionTemplatePayloadButton[], language: 'VI' | 'EN' = 'VI'): ZaloOAPromotionTemplate {
  return {
    type: 'template',
    payload: {
      template_type: 'promotion',
      language,
      elements,
      buttons,
    },
  }
}

export function buildFileTemplate(fileToken: string): ZaloOAFileAttachment {
  return {
    type: 'file',
    payload: {
      token: fileToken,
    },
  }
}
