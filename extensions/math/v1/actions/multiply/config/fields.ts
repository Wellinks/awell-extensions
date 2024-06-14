import { z, type ZodTypeAny } from 'zod'
import { type Field, FieldType } from '@awell-health/extensions-core'

export const fields = {
  factor_01: {
    id: 'factor_01',
    label: 'Factor',
    description: '',
    required: true,
    type: FieldType.NUMERIC,
  },
  factor_02: {
    id: 'factor_02',
    label: 'Factor',
    description: '',
    required: true,
    type: FieldType.NUMERIC,
  },
  factor_03: {
    id: 'factor_03',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_04: {
    id: 'factor_04',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_05: {
    id: 'factor_05',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_06: {
    id: 'factor_06',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_07: {
    id: 'factor_07',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_08: {
    id: 'factor_08',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_09: {
    id: 'factor_09',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_10: {
    id: 'factor_10',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_11: {
    id: 'factor_11',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_12: {
    id: 'factor_12',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_13: {
    id: 'factor_13',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_14: {
    id: 'factor_14',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_15: {
    id: 'factor_15',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_16: {
    id: 'factor_16',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_17: {
    id: 'factor_17',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_18: {
    id: 'factor_18',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_19: {
    id: 'factor_19',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
  factor_20: {
    id: 'factor_20',
    label: 'Factor',
    description: '',
    required: false,
    type: FieldType.NUMERIC,
  },
} satisfies Record<string, Field>

export const FieldsValidationSchema = z.object({
  factor_01: z.number(),
  factor_02: z.number(),
  factor_03: z.number().optional(),
  factor_04: z.number().optional(),
  factor_05: z.number().optional(),
  factor_06: z.number().optional(),
  factor_07: z.number().optional(),
  factor_08: z.number().optional(),
  factor_09: z.number().optional(),
  factor_10: z.number().optional(),
  factor_11: z.number().optional(),
  factor_12: z.number().optional(),
  factor_13: z.number().optional(),
  factor_14: z.number().optional(),
  factor_15: z.number().optional(),
  factor_16: z.number().optional(),
  factor_17: z.number().optional(),
  factor_18: z.number().optional(),
  factor_19: z.number().optional(),
  factor_20: z.number().optional(),
} satisfies Record<keyof typeof fields, ZodTypeAny>)
