import crypto  from 'node:crypto';

interface FormField {
  value: string
  errors?: string[]
  touched?: boolean
}

export interface IForm {
  name: FormField
  subname: FormField
  email: FormField
  country: FormField
  topic: FormField
  message: FormField
}

export interface Session{
  id: ReturnType<typeof crypto.randomUUID>
name: string
  subname: string
  email: string
  country: string
  topic: string
  message: string
  status: "pending" | "accepted" | "rejected"
  messageId: number
  createdAt: number
}