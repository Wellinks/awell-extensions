import { isNil } from 'lodash'
import {
  type DataPointDefinition,
  type Webhook,
} from '@awell-health/extensions-core'
import { HEALTHIE_IDENTIFIER, type HealthieWebhookPayload } from '../lib/types'
import { type settings } from '../settings'
import { formatError } from '../lib/sdk/errors'
import { createSdk } from '../lib/sdk/createSdk'
import { webhookPayloadSchema } from '../lib/helpers'

const dataPoints = {
  deletedMessageId: {
    key: 'deletedMessageId',
    valueType: 'string',
  },
} satisfies Record<string, DataPointDefinition>

export const messageDeleted: Webhook<
  keyof typeof dataPoints,
  HealthieWebhookPayload,
  typeof settings
> = {
  key: 'messageDeleted',
  dataPoints,
  onWebhookReceived: async ({ payload, settings }, onSuccess, onError) => {
    try {
      const { sdk } = await createSdk({ settings })

      const validatedPayload = webhookPayloadSchema.parse(payload)
      const deletedMessageId = validatedPayload.resource_id.toString()
  
      const messageResponse = await sdk.getMessage({ id: deletedMessageId })
      const conversationResponse = await sdk.getConversation({ id: messageResponse?.data?.note?.conversation_id })
      const healthiePatientId = conversationResponse?.data?.conversation?.patient_id
      await onSuccess({
        data_points: {
          deletedMessageId,
        },
        ...(!isNil(healthiePatientId) && {
          patient_identifier: {
            system: HEALTHIE_IDENTIFIER,
            value: healthiePatientId,
          }
        }),
      })
    } catch (error) {
      await onError(formatError(error))
    }
  },
}

export type MessageDeleted = typeof messageDeleted
