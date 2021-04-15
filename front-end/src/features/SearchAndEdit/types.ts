import { Phone } from 'types'

export interface Filters {
  count?: number
  info?: string
  number?: string
  id?: string
  answeredOn?: string | 'never'
  calledOn?: string | 'never'
  noWeekends?: boolean
  noCall?: boolean
  nonExistent?: boolean
  comments?: string
  territoryId?: string
  any?: boolean
}

export interface SearchResponse {
  phones: Phone[]
  count: number
}
