import {
  FieldType,
  NumericIdSchema,
  type Action,
  type DataPointDefinition,
  type Field,
} from '@awell-health/extensions-core'
import { Category } from '@awell-health/extensions-core'
import { type settings } from '../settings'
import { makeAPIClient } from '../client'
import { elationMobilePhoneToE164 } from '../utils/elationMobilePhoneToE164'
import { getLastEmail } from '../utils/getLastEmail'

const fields = {
  patientId: {
    id: 'patientId',
    label: 'Patient ID',
    description: 'The Elation patient ID',
    type: FieldType.NUMERIC,
    required: true,
  },
} satisfies Record<string, Field>

const dataPoints = {
  firstName: {
    key: 'firstName',
    valueType: 'string',
  },
  lastName: {
    key: 'lastName',
    valueType: 'string',
  },
  dob: {
    key: 'dob',
    valueType: 'date',
  },
  sex: {
    key: 'sex',
    valueType: 'string',
  },
  primaryPhysicianId: {
    key: 'primaryPhysicianId',
    valueType: 'number',
  },
  caregiverPracticeId: {
    key: 'caregiverPracticeId',
    valueType: 'number',
  },
  mainPhone: {
    key: 'mainPhone',
    valueType: 'telephone',
  },
  mobilePhone: {
    key: 'mobilePhone',
    valueType: 'telephone',
  },
  email: {
    key: 'email',
    valueType: 'string',
  },
  middleName: {
    key: 'middleName',
    valueType: 'string',
  },
  actualName: {
    key: 'actualName',
    valueType: 'string',
  },
  genderIdentity: {
    key: 'genderIdentity',
    valueType: 'string',
  },
  legalGenderMarker: {
    key: 'legalGenderMarker',
    valueType: 'string',
  },
  pronouns: {
    key: 'pronouns',
    valueType: 'string',
  },
  sexualOrientation: {
    key: 'sexualOrientation',
    valueType: 'string',
  },
  ssn: {
    key: 'ssn',
    valueType: 'string',
  },
  ethnicity: {
    key: 'ethnicity',
    valueType: 'string',
  },
  race: {
    key: 'race',
    valueType: 'string',
  },
  preferredLanguage: {
    key: 'preferredLanguage',
    valueType: 'string',
  },
  notes: {
    key: 'notes',
    valueType: 'string',
  },
  previousFirstName: {
    key: 'previousFirstName',
    valueType: 'string',
  },
  previousLastName: {
    key: 'previousLastName',
    valueType: 'string',
  },
  status: {
    key: 'status',
    valueType: 'string',
  },
  patientObject: {
    key: 'patientObject',
    valueType: 'json',
  },
} satisfies Record<string, DataPointDefinition>

export const getPatient: Action<
  typeof fields,
  typeof settings,
  keyof typeof dataPoints
> = {
  key: 'getPatient',
  category: Category.EHR_INTEGRATIONS,
  title: 'Get Patient',
  description: "Retrieve a patient profile using Elation's patient API.",
  fields,
  previewable: true,
  dataPoints,
  onActivityCreated: async (payload, onComplete, onError): Promise<void> => {
    const patientId = NumericIdSchema.parse(payload.fields.patientId)

    // API Call should produce AuthError or something dif.
    const api = makeAPIClient(payload.settings)
    const patientInfo = await api.getPatient(patientId)

    await onComplete({
      data_points: {
        firstName: patientInfo.first_name,
        lastName: patientInfo.last_name,
        dob: patientInfo.dob,
        sex: patientInfo.sex,
        primaryPhysicianId: String(patientInfo.primary_physician),
        caregiverPracticeId: String(patientInfo.caregiver_practice),
        mainPhone: elationMobilePhoneToE164(
          patientInfo.phones?.find((p) => p.phone_type === 'Main')?.phone
        ),
        mobilePhone: elationMobilePhoneToE164(
          patientInfo.phones?.find((p) => p.phone_type === 'Mobile')?.phone
        ),
        email: getLastEmail(patientInfo.emails),
        middleName: patientInfo.middle_name,
        actualName: patientInfo.actual_name,
        genderIdentity: patientInfo.gender_identity,
        legalGenderMarker: patientInfo.legal_gender_marker,
        pronouns: patientInfo.pronouns,
        sexualOrientation: patientInfo.sexual_orientation,
        ssn: patientInfo.ssn,
        ethnicity: patientInfo.ethnicity,
        race: patientInfo.race,
        preferredLanguage: patientInfo.preferred_language,
        notes: patientInfo.notes,
        previousFirstName: patientInfo.previous_first_name,
        previousLastName: patientInfo.previous_last_name,
        status: patientInfo.patient_status.status,
        patientObject: JSON.stringify(patientInfo),
      },
    })
  },
}
