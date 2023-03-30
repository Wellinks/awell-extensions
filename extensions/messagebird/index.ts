import { type Extension } from '@/types'
import { AuthorType, Category } from '@/types/marketplace'
import {
  sendWhatsAppMessage,
  sendSms,
  sendTextToSpeechMessage,
} from './v1/actions'
import { settings } from './settings'

export const MessageBird: Extension = {
  key: 'messagebird',
  title: 'MessageBird',
  icon_url: 'https://developers.messagebird.com/img/glyph.svg',
  description:
    'MessageBird is a cloud-based SMS marketing platform designed to help businesses engage with customers across a variety of channels including WhatsApp, voice, live chat and more.',
  category: Category.COMMUNICATION,
  author: {
    authorType: AuthorType.AWELL,
  },
  actions: {
    sendSms,
    sendWhatsAppMessage,
    sendTextToSpeechMessage,
  },
  settings,
}
