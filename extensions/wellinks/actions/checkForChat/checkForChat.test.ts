import { getSdk } from "../../gql/wellinksSdk"
import { mockGetSdk, mockGetSdkReturn } from "../../gql/__mocks__/wellinksSdk"
import { checkForChat } from "./checkForChat"

jest.mock('../../gql/wellinksSdk')
jest.mock('../../wellinksGraphqlClient')


describe('the checkForChat action', () => {
    const onComplete = jest.fn()
    const onError = jest.fn()
 
    beforeAll(() => {
        (getSdk as jest.Mock).mockImplementation(mockGetSdk)
        
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    // DEFINE TEST CASE
    test('when given a null data return from the Healthie API', async () => {
        (getSdk as jest.Mock).mockReturnValueOnce(
            {
                ...mockGetSdkReturn,
                getConversationMemberships: mockGetSdkReturn.getConversationMemberships.mockReturnValueOnce({ 
                    data: { 
                        conversationMemberships: null
                    }
                })
            })
        await checkForChat.onActivityCreated(
            {
                pathway: {
                    id: 'pathway-id',
                    definition_id: 'pathway-definition-id'
                },
                activity: {
                    id: 'activity-id'
                },
                patient: { id: 'test-patient' },
                fields: {
                    patientId: 'patientIdTest',
                    coachId: 'coachId',
                    appointmentTime: '2023-08-08'
                },
                settings: {
                    apiKey: 'apiKey',
                    apiUrl: 'test-url',
                    selectEventTypeQuestion: '2602707',
                    startSendingRemindersQuestions: '3860906',
                    memberEventFormId: '281216'
                },
            },
            onComplete,
            onError
        )
        // DO TESTS
        expect(mockGetSdkReturn.getConversationMemberships).toHaveBeenCalled()
        expect(onError).toBeCalledWith({
            events: expect.arrayContaining([
                expect.objectContaining({
                    error: {
                        category: 'SERVER_ERROR',
                        message: 'conversationMemberships returned null or undefined'
                    }
                })
            ])
        })
    })

    // DEFINE TEST CASE
    test('when given a list of conversationMemberships where there is a message sent 24 hours after the appointmentDate returns true', async() => {
        (getSdk as jest.Mock).mockReturnValueOnce(
            {
                ...mockGetSdkReturn,
                getConversationMemberships: mockGetSdkReturn.getConversationMemberships.mockReturnValueOnce({ 
                    data: { 
                        conversationMemberships: [
                            {
                                "convo": {
                                    "last_message_content": "Hi this is a message 24 hours after the appointment date",
                                    "updated_at": "2023-05-30 15:00:00 -0500",
                                    "dietitian_id": "coachId",
                                    "patient_id": "37616"
                                }
                            },
                            {
                                "convo": {
                                    "last_message_content": "\nHi Ash, after talking with you today I thought I’d share this resource with you, http://www.findhelp.org/.\nThis is a helpful way to find housing support in your area. By entering your zip code, you can find local resources. \nLet me know what you learn and what options you are considering. I’m excited to hear more. Talk to you soon.\n",
                                    "updated_at": "2023-05-31 15:41:38 -0500",
                                    "dietitian_id": null,
                                    "patient_id": null
                                }
                            },
                            {
                                "convo": {
                                    "last_message_content": "",
                                    "updated_at": "2023-02-03 09:41:45 -0600",
                                    "dietitian_id": null,
                                    "patient_id": null
                                }
                            }
                        ]
                    }
                })
            }
        )
        
        await checkForChat.onActivityCreated(
            {
                pathway: {
                    id: 'pathway-id',
                    definition_id: 'pathway-definition-id'
                },
                activity: {
                    id: 'activity-id'
                },
                patient: { id: 'test-patient' },
                fields: {
                    patientId: 'patientIdTest',
                    coachId: 'coachId',
                    appointmentTime: '2023-05-28'
                },
                settings: {
                    apiKey: 'apiKey',
                    apiUrl: 'test-url',
                    selectEventTypeQuestion: '2602707',
                    startSendingRemindersQuestions: '3860906',
                    memberEventFormId: '281216'
                },
            },
            onComplete,
            onError
        )
        
        expect(mockGetSdkReturn.getConversationMemberships).toHaveBeenCalled()
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                messageSent: 'true'
            }
        })
    })

    test('when given a list of conversationMemberships where there is not a message sent 24 hours after the appointmentDate returns false', async() => {
        (getSdk as jest.Mock).mockReturnValueOnce(
            {
                ...mockGetSdkReturn,
                getConversationMemberships: mockGetSdkReturn.getConversationMemberships.mockReturnValueOnce({ 
                    data: { 
                        conversationMemberships: [
                            {
                                "convo": {
                                    "last_message_content": "There is no message within 24 hours of the appointment date",
                                    "updated_at": "2023-05-30 15:00:00 -0500",
                                    "dietitian_id": "coachId",
                                    "patient_id": "37616"
                                }
                            },
                            {
                                "convo": {
                                    "last_message_content": "\nHi Ash, after talking with you today I thought I’d share this resource with you, http://www.findhelp.org/.\nThis is a helpful way to find housing support in your area. By entering your zip code, you can find local resources. \nLet me know what you learn and what options you are considering. I’m excited to hear more. Talk to you soon.\n",
                                    "updated_at": "2023-05-31 15:41:38 -0500",
                                    "dietitian_id": null,
                                    "patient_id": null
                                }
                            },
                            {
                                "convo": {
                                    "last_message_content": "",
                                    "updated_at": "2023-02-03 09:41:45 -0600",
                                    "dietitian_id": null,
                                    "patient_id": null
                                }
                            }
                        ]
                    }
                })
            }
        )
        
        await checkForChat.onActivityCreated(
            {
                pathway: {
                    id: 'pathway-id',
                    definition_id: 'pathway-definition-id'
                },
                activity: {
                    id: 'activity-id'
                },
                patient: { id: 'test-patient' },
                fields: {
                    patientId: 'patientIdTest',
                    coachId: 'coachId',
                    appointmentTime: '2023-05-01'
                },
                settings: {
                    apiKey: 'apiKey',
                    apiUrl: 'test-url',
                    selectEventTypeQuestion: '2602707',
                    startSendingRemindersQuestions: '3860906',
                    memberEventFormId: '281216'
                },
            },
            onComplete,
            onError
        )
        
        expect(mockGetSdkReturn.getConversationMemberships).toHaveBeenCalled()
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                messageSent: 'false'
            }
        })
    })
})