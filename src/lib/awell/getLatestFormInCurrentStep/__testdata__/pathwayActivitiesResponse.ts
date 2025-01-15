import {
  type ActivityPayload,
  type ActivitiesPayload,
} from '@awell-health/awell-sdk'
import { type DeepPartial } from '../../../types'
import { subDays } from 'date-fns'

const today = new Date()
const stepId = 'Xkn5dkyPA5uW'

export const mockCurrentActivityResponse = {
  success: true,
  activity: {
    id: 'X74HeDQ4N0gtdaSEuzF8s',
    status: 'ACTIVE',
    date: today.toISOString(),
    object: {
      id: 'w1EgLnVu5ApP',
      type: 'PLUGIN_ACTION',
    },
    context: {
      step_id: stepId,
    },
  },
} satisfies DeepPartial<ActivityPayload>

export const mockPathwayStepActivitiesResponse = {
  success: true,
  activities: [
    { ...mockCurrentActivityResponse.activity },
    {
      id: 'RhRQqdbrnSptV3twx7QtV',
      status: 'DONE',
      date: subDays(today, 1).toISOString(),
      object: {
        id: 'OGhjJKF5LRmo',
        type: 'FORM',
      },
      context: {
        step_id: stepId,
      },
    },
    {
      id: 'shkMEWqOzHQMsYrGS6yId',
      status: 'DONE',
      date: subDays(today, 2).toISOString(),
      object: {
        id: 'Q3KUacz4qEmn',
        type: 'STEP',
      },
      context: {
        step_id: stepId,
      },
    },
    {
      id: 'f2IjXGjg7YoHZ7lEF0l5j',
      status: 'DONE',
      date: subDays(today, 3).toISOString(),
      object: {
        id: 'Q3KUacz4qEmn',
        type: 'STEP',
      },
      context: {
        step_id: stepId,
      },
    },
  ],
} satisfies DeepPartial<ActivitiesPayload>
