import { SearchHistoryItem } from './search-history-item'
import { SearchItem } from './search-item'

export type SearchResponse = {
  perPage: number
  total: number
  totalPages: number
  currentPage: number
  data: SearchItem[]
  updatedSearchHistory: SearchHistoryItem[]
}
