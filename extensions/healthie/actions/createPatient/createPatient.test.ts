import { generateTestPayload } from '../../../../src/tests'
import { getSdk } from '../../lib/sdk/generated/sdk'
import {
  mockGetSdk,
  mockGetSdkReturn,
} from '../../lib/sdk/generated/__mocks__/sdk'
import { createPatient } from '../createPatient'

jest.mock('../../lib/sdk/generated/sdk')
jest.mock('../../lib/sdk/graphqlClient')

describe('createPatient action', () => {
  const onComplete = jest.fn()

  beforeAll(() => {
    const mockSdk = getSdk as jest.Mock
    mockSdk.mockImplementation(mockGetSdk)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should create a new patient', async () => {
    await createPatient.onActivityCreated!(
      generateTestPayload({
        fields: {
          first_name: 'test',
          last_name: 'test',
          legal_name: undefined,
          email: 'test@test.com',
          phone_number: undefined,
          provider_id: undefined,
          skipped_email: undefined,
          send_invite: undefined,
        },
        settings: {
          apiKey: 'apiKey',
          apiUrl: 'test-url',
        },
      }),
      onComplete,
      jest.fn()
    )

    expect(mockGetSdkReturn.createPatient).toHaveBeenCalled()
    expect(onComplete).toHaveBeenCalledWith({
      data_points: {
        healthiePatientId: 'patient-1',
      },
    })
  })
})
