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
  comments: string
  commentedOn: null | string
  info: string | null
  fulfilledOn: null | string
  id: number
  noCall: boolean
  nonExistent: boolean
  postponedDays: number
  phone: string
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
  phone: Phone['phone']
  savedOn: number
  restore: OriginalData & {
    lastStatus: null | Feedback
  }
}
