import {
  type DataPointDefinition,
  type Webhook,
} from '@awell-health/extensions-core'

const dataPoints = {
  eventType: {
    key: 'eventType',
    valueType: 'string',
  },
  hello: {
    key: 'webhookDataPoint',
    valueType: 'string',
  },
} satisfies Record<string, DataPointDefinition>

// Payload must be exported so it can be included in the declaration file generated by the build script
export interface Payload {
  eventType: string
  hello: string
}

export const demo: Webhook<keyof typeof dataPoints, Payload> = {
  key: 'demo',
  dataPoints,
  onWebhookReceived: async ({ payload }, onSuccess, onError) => {
    const { eventType, hello } = payload
    await onSuccess({
      data_points: {
        eventType,
        hello,
      },
    })
  },
}

// Unnecessary, but included to help with type inference and consistency
export type Demo = typeof demo
