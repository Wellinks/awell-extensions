import { generateTestPayload } from '../../../../src/tests'
import { getSdk } from '../../lib/sdk/generated/sdk'
import {
  mockGetSdk,
  mockGetSdkReturn,
} from '../../lib/sdk/generated/__mocks__/sdk'
import { deleteAppointment } from '../deleteAppointment'

jest.mock('../../lib/sdk/generated/sdk')
jest.mock('../../lib/sdk/graphqlClient')

describe('deleteAppointment action', () => {
  const onComplete = jest.fn()

  beforeAll(() => {
    ;(getSdk as jest.Mock).mockImplementation(mockGetSdk)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should delete an appointment', async () => {
    await deleteAppointment.onActivityCreated!(
      generateTestPayload({
        fields: {
          id: 'appointment-1',
        },
        settings: {
          apiKey: 'apiKey',
          apiUrl: 'test-url',
        },
      }),
      onComplete,
      jest.fn()
    )

    expect(mockGetSdkReturn.deleteAppointment).toHaveBeenCalledWith({
      id: 'appointment-1',
    })
    expect(onComplete).toHaveBeenCalled()
  })
})
