import { addDays } from 'date-fns'

export const appointmentsMock = [
  {
    id: 123,
    scheduled_date: addDays(new Date(), 1).toISOString(),
    duration: 60,
    billing_details: null,
    payment: null,
    time_slot_type: 'appointment',
    time_slot_status: null,
    reason: 'PCP: Est. Patient Office',
    mode: 'VIDEO',
    description: '',
    status: {
      status: 'Scheduled',
      room: null,
      status_date: '2023-07-12T20:44:22Z',
      status_detail: null,
    },
    patient: 12345,
    patient_forms: {
      patient_can_receive_forms: true,
      anonymous_url:
        'https://sandbox.elationemr.com/appointments/141701667029082/patient-forms/?key=642301d3930ac1e4d052ff65c093c5f1da1697e6b861a18f43a042b5afca50a1',
      overrides: [],
      short_code: null,
      statuses: [
        {
          id: 316,
          name: 'COVID-19 Screening Form',
          status: 'incomplete',
        },
      ],
      hours_prior: 0,
    },
    physician: 141114870071298,
    practice: 141114865745924,
    instructions: '',
    recurring_event_schedule: null,
    metadata: null,
    created_date: '2023-07-12T20:44:22Z',
    last_modified_date: '2023-07-12T20:44:22Z',
    deleted_date: null,
    service_location: null,
    telehealth_details: '',
  },
]
