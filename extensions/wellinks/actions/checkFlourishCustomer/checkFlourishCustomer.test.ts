import { generateTestPayload } from '../../../../src/tests'
import {
  WellinksFlourishClientMockImplementation,
  WellinksFlourishClient,
} from '../../__mocks__/wellinksFlourishClient'
import { mockSettings } from '../../__mocks__/settings'
import { checkFlourishCustomer } from './checkFlourishCustomer'
import { ZodError } from 'zod'

jest.mock('../../wellinksFlourishClient', () => ({ WellinksFlourishClient }))

describe('Check Flourish Customer', () => {
  const onComplete = jest.fn()
  const onError = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call onComplete with a true DataPoint when there is a customer with the given identifier', async () => {
    const validPayload = generateTestPayload({
      fields: {
        identifier: 'identifier',
      },
      settings: mockSettings,
    })
    WellinksFlourishClientMockImplementation.user.exists.mockImplementationOnce(
      () => {
        return true
      }
    )
    await checkFlourishCustomer.onActivityCreated(
      validPayload,
      onComplete,
      onError
    )

    expect(onError).not.toBeCalled()
    expect(onComplete).toHaveBeenNthCalledWith(1, {
      data_points: {
        userExists: 'true',
      },
    })
  })

  test('should call onComplete with a false DataPoint when there is a customer with the given identifier', async () => {
    const validPayload = generateTestPayload({
      fields: {
        identifier: 'identifier',
      },
      settings: mockSettings,
    })
    WellinksFlourishClientMockImplementation.user.exists.mockImplementationOnce(
      () => {
        return false
      }
    )
    await checkFlourishCustomer.onActivityCreated(
      validPayload,
      onComplete,
      onError
    )

    expect(onError).not.toBeCalled()
    expect(onComplete).toHaveBeenNthCalledWith(1, {
      data_points: {
        userExists: 'false',
      },
    })
  })

  test('should call onError when the action is not given an identifier', async () => {
    const validPayload = generateTestPayload({
      fields: {
        identifier: undefined,
      },
      settings: mockSettings,
    })
    WellinksFlourishClientMockImplementation.user.exists.mockImplementationOnce(
      () => {
        return true
      }
    )
    await checkFlourishCustomer.onActivityCreated(
      validPayload,
      onComplete,
      onError
    )

    expect(onComplete).not.toBeCalled()
    expect(onError).toHaveBeenNthCalledWith(1, {
      events: expect.arrayContaining([
        expect.objectContaining({
          error: {
            category: 'SERVER_ERROR',
            message: 'Validation error: Required at "fields.identifier"',
          },
        }),
      ]),
    })
  })

  test('should call onError when the Flourish Settings are not set', async () => {
    const validPayload = generateTestPayload({
      fields: {
        identifier: 'identifier',
      },
      settings: {
        ...mockSettings,
        flourishApiKey: undefined,
        flourishApiUrl: undefined,
        flourishClientExtId: undefined,
      },
    })
    WellinksFlourishClientMockImplementation.user.exists.mockImplementationOnce(
      () => {
        return true
      }
    )
    await expect(
      checkFlourishCustomer.onActivityCreated(validPayload, onComplete, onError)
    ).rejects.toThrow(ZodError)

    expect(onComplete).not.toBeCalled()
  })
})
