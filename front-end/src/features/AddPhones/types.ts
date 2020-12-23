export interface NewPhone {
  number: string
  info: string
}

export interface AddPhonePayload {
  phones: NewPhone[]
}

export interface AddPhoneResponse {
  failureCount: number
  successCount: number
}
