import {
  type DataPointDefinition,
  FieldType,
  type Action,
  type Field,
} from '@awell-health/extensions-core'
import { Category } from '@awell-health/extensions-core'
import CalComApi from '../calComApi'
import { type settings } from '../settings'

const fields = {
  bookingId: {
    id: 'bookingId',
    label: 'Booking ID',
    type: FieldType.STRING,
    required: true,
  },
} satisfies Record<string, Field>

const dataPoints = {
  eventTypeId: {
    key: 'eventTypeId',
    valueType: 'string',
  },
  title: {
    key: 'title',
    valueType: 'string',
  },
  description: {
    key: 'description',
    valueType: 'string',
  },
  startTime: {
    key: 'startTime',
    valueType: 'date',
  },
  endTime: {
    key: 'endTime',
    valueType: 'date',
  },
  status: {
    key: 'status',
    valueType: 'string',
  },
  cancelUrl: {
    key: 'cancelUrl',
    valueType: 'string',
  },
  rescheduleUrl: {
    key: 'rescheduleUrl',
    valueType: 'string',
  },
} satisfies Record<string, DataPointDefinition>

export const getBooking: Action<typeof fields, typeof settings> = {
  key: 'getBooking',
  title: 'Get booking',
  description: 'Get Booking and save data in Data Points',
  category: Category.SCHEDULING,
  fields,
  dataPoints,
  previewable: false,
  onActivityCreated: async (payload, onComplete, onError) => {
    const {
      fields: { bookingId },
      settings: { apiKey },
    } = payload
    if (apiKey === undefined || bookingId === undefined) {
      await onError({
        events: [
          {
            date: new Date().toISOString(),
            text: { en: 'Missing apiKey or bookingId' },
          },
        ],
      })
    } else {
      try {
        const calComApi = new CalComApi(apiKey)
        const { booking } = await calComApi.getBooking(bookingId)

        await onComplete({
          data_points: {
            eventTypeId: `${booking.eventTypeId}`,
            title: booking.title,
            description: booking.description,
            startTime: booking.startTime,
            endTime: booking.endTime,
            status: booking.status,
            cancelUrl: `https://app.cal.com/booking/${booking.uid}?cancel=true`,
            rescheduleUrl: `https://app.cal.com/reschedule/${booking.uid}`,
          },
        })
      } catch (error) {
        await onError({
          events: [
            {
              date: new Date().toISOString(),
              text: {
                en: `Error in calDotCom extension -> getBooking action: ${JSON.stringify(
                  error
                )}`,
              },
            },
          ],
        })
      }
    }
  },
}
