import { SearchHistoryItem } from './search-history-item'

export type SearchHistoryProps = {
  searchHistory: SearchHistoryItem[]
  error?: string
  onSelectedItem: (item: string) => void
}
