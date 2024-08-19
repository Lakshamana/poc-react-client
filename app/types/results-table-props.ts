import { SearchItem } from './search-item'

export type ResultsTableProps = {
  data: SearchItem[]
  firstSearch: boolean
  loading: boolean
  error?: string
  forceHidePagination: (shouldForceState: boolean) => void
  cleanSearch?: () => void
}
