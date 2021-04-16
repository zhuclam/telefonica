export enum Feedback {
  UNANSWERED = 0,
  ANSWERED = 1,
  NON_EXISTENT = 2,
  NO_CALL = 3,
  ANSWERING_MACHINE = 4,
  POSTPONE = 5,
  IGNORE = 6,
}

export enum CampaignFeedback {
  RUSHED = 7,
}

export type FeedbackExtended = Feedback | CampaignFeedback

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
  noWeekends: boolean
  territoryId: number
  campaignStatus: boolean
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
  status: null | FeedbackExtended
  phone: Phone['phone']
  savedOn: number
  restore: OriginalData & {
    lastStatus: null | FeedbackExtended
  }
}

export interface PhoneOptionsType {
  callOnWeekends: boolean
}

export interface Configurations {
  unansweredMaxAttemps: number
  answeringMachineMaxAttemps: number
  answeringMachinePostponedDays: number
  postponedButtonDays: number
  nonExistentPostponedDays: number
  hiddenButtons: string
  territoryId: number
}

export interface Territory {
  id: number
  name: string
  active: boolean
  /**
   * This should be a boolean, but BE is sending back a 0 | 1 for now, beware
   */
  campaignMode: number
  completed: number
  totalNumbers: number
}
