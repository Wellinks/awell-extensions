import { Category, type Action } from '@awell-health/extensions-core'
import { type settings } from '../../settings'
import { fields, dataPoints, FieldsValidationSchema } from './config'
import { validatePayloadAndCreateClient } from '../../helpers'

export const triggerFlow: Action<
  typeof fields,
  typeof settings,
  keyof typeof dataPoints
> = {
  key: 'triggerFlow',
  category: Category.COMMUNICATION,
  title: 'Trigger flow',
  description: 'Trigger a flow in Talkdesk',
  fields,
  previewable: false,
  dataPoints,
  onActivityCreated: async (payload, onComplete, onError): Promise<void> => {
    const { fields: input, client } = await validatePayloadAndCreateClient({
      fieldsSchema: FieldsValidationSchema,
      payload,
    })

    const res = await client.triggerFlow(input)

    await onComplete({
      data_points: {
        interactionId: res.interaction_id,
        flowVersionId: res.flow_version_id,
      },
    })
  },
}
