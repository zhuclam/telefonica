export enum Feedback {
  UNANSWERED = 0,
  ANSWERED = 1,
  NON_EXISTENT = 2,
  NO_CALL = 3,
  ANSWERING_MACHINE = 4,
  POSTPONE = 5,
  IGNORE = 6,
}

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

export interface StoragePhone {
  id: Phone['id']
  status: null | Feedback
  phone: Phone['telefono']
  savedOn: number
  restore: OriginalData & {
    lastStatus: null | Feedback
  }
}
