import { appointmentExample, patientExample } from './constants'

const ElationAPIClientMock = jest.fn().mockImplementation((params) => {
  return {
    getPatient: jest.fn((params) => {
      return { id: 1, ...patientExample, mobile_phone: 'undefined' }
    }),
    createPatient: jest.fn((params) => {
      return { id: 1, ...patientExample }
    }),
    updatePatient: jest.fn((params) => {
      return { id: 1, ...patientExample }
    }),
    createAppointment: jest.fn((params) => {
      return {
        id: 1,
        ...appointmentExample,
        service_location: {
          id: appointmentExample.service_location
        }
      }
    }),
    getAppointment: jest.fn((params) => {
      return {
        id: 1,
        ...appointmentExample,
        service_location: {
          id: appointmentExample.service_location
        }
      }
    }),
  }
})

const { makeAPIClient } = jest.requireActual('../client')

const makeAPIClientMock = jest.fn((args) => {
  makeAPIClient(args)

  return new ElationAPIClientMock(args)
})

export {
  ElationAPIClientMock as ElationAPIClient,
  makeAPIClientMock as makeAPIClient,
}
