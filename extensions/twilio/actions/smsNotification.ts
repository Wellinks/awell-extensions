import twilioSdk from '../twilioSdk'
import { FieldType, StringType, type Action, type Field } from '../../../lib/types'
import { type settings } from '../settings'

const fields = {
  recipient: {
    id: 'recipient',
    label: '"To" phone number',
    type: FieldType.STRING,
    stringType: StringType.PHONE_NUMBER,
    description: 'To what phone number would you like to send a text message?',
    required: true,
  },
  message: {
    id: 'message',
    label: 'Message',
    type: FieldType.TEXT,
    required: true,
  },
} satisfies Record<string, Field>

export const smsNotification: Action<typeof fields, typeof settings> = {
  key: 'smsNotification',
  title: 'SMS via Twilio',
  category: 'Notifications',
  fields,
  onActivityCreated: async (payload, onComplete) => {
    const {
      fields: { message, recipient },
      settings,
    } = payload
    if (recipient === undefined) {
      console.error('Recipient is not defined')
    } else {
      try {
        const client = twilioSdk(settings.accountSid, settings.authToken, {
          region: 'IE1',
          accountSid: settings.accountSid,
        })
        await client.messages.create({
          body: message,
          from: settings.fromNumber,
          to: recipient,
        })
      } catch (err) {
        console.error('Error in twilio extension', err)
      }
    }
    await onComplete()
  },
}
