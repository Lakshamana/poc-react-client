export function Search() {
  return (
    <div className='mb-2'>
      <label htmlFor='search'></label>
      <input
        placeholder='Search duckduckgo.com...'
        type='text'
        id='search'
        className='my-2 block w-full rounded-lg focus:ring-0 sm:text-sm border-zinc-300 p-2'
      />
    </div>
  )
}
