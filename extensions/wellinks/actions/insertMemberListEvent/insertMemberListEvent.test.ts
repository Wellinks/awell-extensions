import { generateTestPayload } from '../../../../src/tests'
import {
  WellinksClient,
  WellinksClientMockImplementation,
} from '../../__mocks__/wellinksClient'
import { insertMemberListEvent } from './insertMemberListEvent'

jest.mock('../../wellinksClient', () => ({ WellinksClient }))

describe('Insert Member List Event', () => {
  const onComplete = jest.fn()
  const onError = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call onComplete with a true DataPoints when the wellinksClient gets a 201 response', async () => {
    const validPayload = generateTestPayload({
      fields: {
        eventName: 'event-name',
        memberId: 'memberId',
        sourceName: 'source-name',
        sendgridListId: 'sendgrid-list-id',
        originatorName: 'originator-name',
        eventDate: '10-10-2020',
      },
      settings: {
        apiKey: 'apiKey',
        apiUrl: 'test-url',
        selectEventTypeQuestion: '2602707',
        startSendingRemindersQuestions: '3860906',
        memberEventFormId: '281216',
        sendgridApiKey: 'sendgridApiKey',
        sendgridApiUrl: 'sendgridApiUrl',
        platformApiKey: 'platform-key',
        platformApiUrl: 'platform-url',
      },
    })

    WellinksClientMockImplementation.memberListEvent.insert.mockImplementationOnce(
      () => {
        return 201
      }
    )

    await insertMemberListEvent.onActivityCreated(
      validPayload,
      onComplete,
      onError
    )

    expect(onError).not.toBeCalled()
    expect(onComplete).toHaveBeenNthCalledWith(1, {
      data_points: {
        insertSuccessful: 'true',
      },
    })
  })

  test('should call onComplete with a false DataPoint when the wellinksClient gets a non-201 response', async () => {
    const validPayload = generateTestPayload({
      fields: {
        eventName: 'event-name',
        memberId: 'memberId',
        sourceName: 'source-name',
        sendgridListId: 'sendgrid-list-id',
        originatorName: 'originator-name',
        eventDate: '10-10-2020',
      },
      settings: {
        apiKey: 'apiKey',
        apiUrl: 'test-url',
        selectEventTypeQuestion: '2602707',
        startSendingRemindersQuestions: '3860906',
        memberEventFormId: '281216',
        sendgridApiKey: 'sendgridApiKey',
        sendgridApiUrl: 'sendgridApiUrl',
        platformApiKey: 'platform-key',
        platformApiUrl: 'platform-url',
      },
    })

    WellinksClientMockImplementation.memberListEvent.insert.mockImplementationOnce(
      () => {
        return 500
      }
    )

    await insertMemberListEvent.onActivityCreated(
      validPayload,
      onComplete,
      onError
    )

    expect(onComplete).toHaveBeenNthCalledWith(1, {
      data_points: {
        insertSuccessful: 'false',
      },
    })
    expect(onError).not.toBeCalled()
  })

  test('should call onError if any of the arguments are undefined/empty', async () => {
    const invalidPayload = generateTestPayload({
      fields: {
        eventName: 'event-name',
        memberId: undefined,
        sourceName: 'source-name',
        sendgridListId: 'sendgrid-list-id',
        originatorName: 'originator-name',
        eventDate: '10-10-2020',
      },
      settings: {
        apiKey: 'apiKey',
        apiUrl: 'test-url',
        selectEventTypeQuestion: '2602707',
        startSendingRemindersQuestions: '3860906',
        memberEventFormId: '281216',
        sendgridApiKey: 'sendgridApiKey',
        sendgridApiUrl: 'sendgridApiUrl',
        platformApiKey: 'platform-key',
        platformApiUrl: 'platform-url',
      },
    })

    await insertMemberListEvent.onActivityCreated(
      invalidPayload,
      onComplete,
      onError
    )
    expect(onError).toHaveBeenNthCalledWith(1, {
      events: expect.arrayContaining([
        expect.objectContaining({
          error: {
            category: 'SERVER_ERROR',
            message: 'Some or all of the arguments are missing.',
          },
        }),
      ]),
    })
    expect(onComplete).not.toBeCalled()
  })

  test('should call onError if the WellinksClient throws an error', async () => {
    const invalidPayload = generateTestPayload({
      fields: {
        eventName: 'event-name',
        memberId: 'member-id',
        sourceName: 'source-name',
        sendgridListId: 'sendgrid-list-id',
        originatorName: 'originator-name',
        eventDate: '10-10-2020',
      },
      settings: {
        apiKey: 'apiKey',
        apiUrl: 'test-url',
        selectEventTypeQuestion: '2602707',
        startSendingRemindersQuestions: '3860906',
        memberEventFormId: '281216',
        sendgridApiKey: 'sendgridApiKey',
        sendgridApiUrl: 'sendgridApiUrl',
        platformApiKey: 'platform-key',
        platformApiUrl: 'platform-url',
      },
    })
    WellinksClientMockImplementation.memberListEvent.insert.mockImplementationOnce(
      () => {
        throw new Error('AN ERROR HAS OCCURRED')
      }
    )
    await insertMemberListEvent.onActivityCreated(
      invalidPayload,
      onComplete,
      onError
    )
    expect(onError).toHaveBeenNthCalledWith(1, {
      events: expect.arrayContaining([
        expect.objectContaining({
          error: {
            category: 'SERVER_ERROR',
            message:
              'an error occurred while trying to insert a MemberListEvent',
          },
        }),
      ]),
    })
    expect(onComplete).not.toBeCalled()
  })
})
