export interface NewPhone {
  number: string
  address: string
}

export interface AddPhonePayload {
  phones: NewPhone[]
}

export interface AddPhoneResponse {
  failureCount: number
  successCount: number
}
