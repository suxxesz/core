import { TRules } from "@/types/Form/rules.types"

export type Field = {
  value: string
  errors: string[]
  touched: boolean
}
export type FieldName = keyof TRules
export type Rules<T> = Partial<T>

export type Toast = { type: 'success' | 'error'; text: string } | null

export type Fields = { [K in FieldName]: Field }

export interface IFieldProps  {
    label: string
  id: string
  type?: string
  className?: string
  isTextPole?: boolean
  isSelect?: boolean
  value: string
  onChange: (val: string) => void
  onBlur: () => void
  errors?: string[] | string
  touched?: boolean
}