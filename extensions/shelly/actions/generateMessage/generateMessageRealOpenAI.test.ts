import 'dotenv/config'
import { TestHelpers } from '@awell-health/extensions-core'
import { generateTestPayload } from '@/tests'
import { generateMessage } from '.'


jest.setTimeout(60000) // Increase timeout to 60 seconds for all tests in this file

describe.skip('generateMessage - Real OpenAI calls', () => {
  const { onComplete, onError, helpers, extensionAction, clearMocks } =
    TestHelpers.fromAction(generateMessage)

  beforeEach(() => {
    clearMocks()
  })

  it('should generate a message with additional instructions', async () => {
    const payload = generateTestPayload({
      fields: {
        communicationObjective: 'Remind patient of upcoming appointment',
        stakeholder: 'Patient',
        additionalInstructions: 'Be friendly and encouraging',
        language: 'English',
        personalizationInput: 'Patient Name: John Doe, Appointment Time: 2:00 PM tomorrow',
      },
      settings: {
        openAiApiKey: process.env.OPENAI_API_KEY,
      },
    })

    await extensionAction.onEvent({
      payload,
      onComplete,
      onError,
      helpers,
    })

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        data_points: expect.objectContaining({
          subject: expect.any(String),
          message: expect.any(String),
        }),
      })
    )

    const { subject, message } = onComplete.mock.calls[0][0].data_points

    expect(subject).toContain('Appointment')
    expect(message).toContain('John Doe')
    expect(message).toContain('2:00 PM')
    expect(message).toMatch(/appointment/i)

    expect(onError).not.toHaveBeenCalled()
  })

  it('should generate a message without additional instructions', async () => {
    const payload = generateTestPayload({
      fields: {
        communicationObjective: 'Update clinician on patient progress',
        stakeholder: 'Clinician',
        additionalInstructions: '',
        language: 'English',
        personalizationInput: 'Patient: Jane Smith, Last Visit: 2 weeks ago, Condition: Hypertension',
      },
      settings: {
        openAiApiKey: process.env.OPENAI_API_KEY,
      },
    })

    await extensionAction.onEvent({
      payload,
      onComplete,
      onError,
      helpers,
    })

    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        data_points: expect.objectContaining({
          subject: expect.any(String),
          message: expect.any(String),
        }),
      })
    )

    const { subject, message } = onComplete.mock.calls[0][0].data_points

    expect(subject.toLowerCase()).toContain('update')
    expect(message).toContain('Jane Smith')
    expect(message.toLowerCase()).toContain('hypertension')

    expect(onError).not.toHaveBeenCalled()
  })
})
