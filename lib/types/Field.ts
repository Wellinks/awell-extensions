export enum FieldType {
  HTML = 'html',
  JSON = 'json',
  STRING = 'string',
  TEXT = 'text',
  NUMERIC = 'numeric',
  BOOLEAN = 'boolean',
}

interface BaseField {
  id: string
  label: string
  description?: string
  required?: boolean
}

export enum StringType {
  EMAIL = 'email',
  TEXT = 'text',
  URL = 'url',
  PHONE = 'phone',
}

type NumericField = BaseField & {
  type: FieldType.NUMERIC
  value?: number
}

type StringField = BaseField & {
  type: FieldType.STRING
  stringType?: StringType
}

type HtmlField = BaseField & {
  type: FieldType.HTML
}

type JsonField = BaseField & {
  type: FieldType.JSON
}

type TextField = BaseField & {
  type: FieldType.TEXT
}

type BooleanField = BaseField & {
  type: FieldType.BOOLEAN
}

export type Field =
  | TextField
  | NumericField
  | StringField
  | HtmlField
  | JsonField
  | BooleanField
