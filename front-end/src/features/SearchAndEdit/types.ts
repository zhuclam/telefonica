import { Phone } from 'types'

export interface Filters {
  info?: string
  number?: string
  id?: string
  answeredOn?: string | 'never'
  calledOn?: string | 'never'
  noWeekends?: boolean
  noCall?: boolean
  nonExistent?: boolean
  comments?: string
}

export interface SearchResponse {
  phones: Phone[]
  count: number
}
