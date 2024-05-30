import { generateTestPayload } from '../../../../src/tests'
import { getSdk } from '../../lib/sdk/generated/sdk'
import {
  mockGetSdk,
  mockGetSdkReturn,
} from '../../lib/sdk/generated/__mocks__/sdk'
import { closeChatConversation } from '../closeChatConversation'

jest.mock('../../lib/sdk/generated/sdk')
jest.mock('../../lib/sdk/graphqlClient')

describe('closeChatConversation action', () => {
  const onComplete = jest.fn()

  beforeAll(() => {
    ;(getSdk as jest.Mock).mockImplementation(mockGetSdk)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should close a conversation', async () => {
    await closeChatConversation.onActivityCreated(
      generateTestPayload({
        fields: {
          id: 'conversation-1',
          provider_id: 'provider-1',
        },
        settings: {
          apiKey: 'apiKey',
          apiUrl: 'test-url',
        },
      }),
      onComplete,
      jest.fn()
    )

    expect(mockGetSdkReturn.updateConversation).toHaveBeenCalledWith({
      input: {
        id: 'conversation-1',
        closed_by_id: 'provider-1',
      },
    })
    expect(onComplete).toHaveBeenCalled()
  })
})
