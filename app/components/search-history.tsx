import { SearchHistoryProps } from '@/app/types'

export function SearchHistory({ searchHistory, onSelectedItem, error }: SearchHistoryProps) {
  let useInnerComponent = <p className='m-2 text-slate-100'>{ error || 'No past search history' }</p>

  if (searchHistory?.length) {
    useInnerComponent = (
      <ul className='list-outside'>
        {searchHistory.map(item => {
          return (
            <li key={item.hash}>
              <div className='flex flex-col items-start p-2 hover:text-indigo-600'>
                <a href='#' onClick={() => onSelectedItem(item.title)} className='text-md font-bold'>{item.title}</a>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='mr-4 border-2 border-white-100 rounded-lg overflow-x-auto'>
      {useInnerComponent}
    </div>
  )
}
