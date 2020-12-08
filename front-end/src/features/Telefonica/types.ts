export interface Phone {
  answeredOn: null | string
  answeringMachineDate: null | string
  comentarios: string
  commentedOn: null | string
  direccion: string | null
  fulfilledOn: null | string
  id: number
  noCall: boolean
  nonExistent: boolean
  postponedDays: number
  telefono: string
  unansweredCount: number
  unansweredDate: null | string
}

export type OriginalData = Pick<
  Phone,
  | 'answeredOn'
  | 'fulfilledOn'
  | 'noCall'
  | 'nonExistent'
  | 'postponedDays'
  | 'unansweredCount'
  | 'unansweredDate'
>

export interface PhoneResponse {
  original: OriginalData
  phone: Phone
}
