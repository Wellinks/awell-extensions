import { generateTestPayload } from '../../../../src/tests'
import { getSdk } from '../../lib/sdk/generated/sdk'
import {
  mockGetSdk,
  mockGetSdkReturn,
} from '../../lib/sdk/generated/__mocks__/sdk'
import { createJournalEntry } from '../createJournalEntry'

jest.mock('../../lib/sdk/generated/sdk')
jest.mock('../../lib/sdk/graphqlClient')

describe('createJournalEntry action', () => {
  const onComplete = jest.fn()

  beforeAll(() => {
    const mock = getSdk as jest.Mock
    mock.mockImplementation(mockGetSdk)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should create a journal entry', async () => {
    await createJournalEntry.onActivityCreated!(
      generateTestPayload({
        fields: {
          id: 'patient-1',
          type: 'MetricEntry',
          percieved_hungriness: 1,
        },
        settings: {
          apiKey: 'apiKey',
          apiUrl: 'test-url',
        },
      }),
      onComplete,
      jest.fn()
    )

    expect(mockGetSdkReturn.createJournalEntry).toHaveBeenCalled()
    expect(onComplete).toHaveBeenCalled()
  })
})
