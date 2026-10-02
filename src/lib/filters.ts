import type { Difficulty, QuestionScope } from '../data/types'

export interface JuryFilters {
  scopes: QuestionScope[]
  difficulties: Difficulty[]
  criterion: string
  status: 'all' | 'new' | 'review' | 'known'
  onlyTricks: boolean
  onlyOfficial: boolean
  search: string
}

export const DEFAULT_FILTERS: JuryFilters = {
  scopes: [1, 2, 0],
  difficulties: [1, 2, 3, 4],
  criterion: '',
  status: 'all',
  onlyTricks: false,
  onlyOfficial: false,
  search: '',
}
