/* eslint-disable @typescript-eslint/no-var-requires */

import { TestHelpers } from '@awell-health/extensions-core'
import { generateTestPayload } from '@/tests'
import { generateMessage } from '.'
import { ChatOpenAI } from '@langchain/openai'


jest.mock('@langchain/openai', () => {
  const mockInvoke = jest.fn().mockResolvedValue({
    subject: 'Test Subject',
    message: 'This is a test message',
  })

  const mockChain = {
    invoke: mockInvoke,
  }

  const mockPipe = jest.fn().mockReturnValue(mockChain)

  const mockChatOpenAI = jest.fn().mockImplementation(() => ({
    pipe: mockPipe,
  }))

  return {
    ChatOpenAI: mockChatOpenAI,
  }
})


describe('generateMessage - Mocked LLM calls', () => {
  const { onComplete, onError, helpers, extensionAction, clearMocks } =
    TestHelpers.fromAction(generateMessage)

  beforeEach(() => {
    clearMocks()
    jest.clearAllMocks()
  })

  it('should generate a message with additional instructions', async () => {
    const generateMessageWithLLMSpy = jest.spyOn(
      require('./lib/generateMessageWithLLM'),
      'generateMessageWithLLM'
    )
    const payload = generateTestPayload({
      fields: {
        communicationObjective: 'Reminder',
        stakeholder: 'Patient',
        additionalInstructions: 'Be friendly and encouraging',
        language: 'English',
        personalizationInput: 'John Doe',
      },
      settings: {
        openAiApiKey: 'test_key',
      },
    })

    await extensionAction.onEvent({
      payload,
      onComplete,
      onError,
      helpers,
    })

    expect(ChatOpenAI).toHaveBeenCalled()
    
    expect(generateMessageWithLLMSpy).toHaveBeenCalledWith({
      ChatModelGPT4o: expect.any(Object),
      communicationObjective: 'Reminder',
      stakeholder: 'Patient',
      additionalInstructions: 'Be friendly and encouraging',
      language: 'English',
      personalizationInput: 'John Doe',
    })

    expect(onComplete).toHaveBeenCalledWith({
      data_points: {
        subject: 'Test Subject',
        message: 'This is a test message',
      },
    })

    expect(onError).not.toHaveBeenCalled()
  })

  it('should generate a message without additional instructions', async () => {
    const generateMessageWithLLMSpy = jest.spyOn(
      require('./lib/generateMessageWithLLM'),
      'generateMessageWithLLM'
    )
    const payload = generateTestPayload({
      fields: {
        communicationObjective: 'Update clinician on their patient',
        stakeholder: 'Clinician',
        language: 'Bosnian',
      },
      settings: {
        openAiApiKey: 'test_key',
      },
    })

    await extensionAction.onEvent({
      payload,
      onComplete,
      onError,
      helpers,
    })

    expect(ChatOpenAI).toHaveBeenCalled()
    expect(generateMessageWithLLMSpy).toHaveBeenCalledWith({
      ChatModelGPT4o: expect.any(Object),
      communicationObjective: 'Update clinician on their patient',
      stakeholder: 'Clinician',
      additionalInstructions: '',
      language: 'Bosnian',
      personalizationInput: '',
    })

    expect(onComplete).toHaveBeenCalledWith({
      data_points: {
        subject: 'Test Subject',
        message: 'This is a test message',
      },
    })

    expect(onError).not.toHaveBeenCalled()
  })
})
