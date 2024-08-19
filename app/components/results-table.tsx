import { ResultsTableProps } from '@/app/types'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

function editNodeHtml(query: string, callback: (nodes: HTMLElement[]) => void): void {
  callback(Array.from(document.querySelectorAll(query)))
}

const Component = ({
  data,
  firstSearch,
  loading,
  error,
  forceHidePagination,
}: ResultsTableProps, ref: any) => {
  const [search, setSearch] = useState('')

  useImperativeHandle(ref, () => ({
    cleanSearch () {
      setSearch('')
    }
  }))

  let useInnerComponent =
    loading || error ? (
      <>{loading ? 'Loading...' : error || ''}</>
    ) : (
      <>{firstSearch ? 'Try searching for something...' : 'No results found for that search'}</>
    )

  if ((loading || error || (!data.length && !loading)) && !search) {
    return (
      <section className='w-full overflow-x-hidden overflow-y-auto border-2 rounded-lg'>
        <div className='flex flex-row items-center justify-between p-2 border-zinc-300'>
          <div className='flex flex-col items-start'>
            <h3>{useInnerComponent}</h3>
          </div>
        </div>
      </section>
    )
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const node = document.getElementById('results_search') as any
    const currentValue = node?.value ?? ''

    setSearch(currentValue)

    // remove class from previous found nodes
    editNodeHtml('span.found', nodes => {
      nodes.forEach(node => {
        if (node.parentElement) {
          node.parentElement.innerHTML = node.parentElement?.innerText
        }
      })
    })

    // add class for new found nodes
    editNodeHtml('div#find-results p.find, div#find-results h3.find', nodes => {
      nodes
        .filter(node => node.innerText.toLowerCase().includes(currentValue))
        .forEach(
          n =>
            (n.innerHTML = n.innerHTML.replaceAll(
              new RegExp(`(${currentValue})`, 'ig'),
              `<span class="found">$1</span>`,
            )),
        )
    })
  }

  forceHidePagination(false)

  if (search) {
    data = data.filter(
      item => item.title.toLowerCase().includes(search) || item.url.toLowerCase().includes(search),
    )

    const useForceHidePagination = data.length === 0
    forceHidePagination(useForceHidePagination)
  }

  return (
    <section
      id='section-results'
      className='flex flex-col ml-auto overflow-x-hidden overflow-y-auto border-white border-2 rounded-lg'
    >
      <div className='flex'>
        <span className='mx-2 icon-search'></span>
        <label htmlFor='results_search'></label>
        <input
          className='my-2 bg-transparent block w-full rounded-lg focus:ring-0 text-white outline-none p-2'
          placeholder='Filter searches result...'
          name='results_search'
          id='results_search'
          type='text'
          onFocus={() => setSearch('')}
          onChange={handleSearchChange}
          value={search}
        />
      </div>
      <div id='find-results'>
        {data.length ? (
          data.map((item, index) => {
            return (
              <div
                key={index}
                className='flex flex-row list-row items-center justify-between p-4 border-zinc-300'
              >
                <div className='flex flex-col items-start'>
                  <h3 className='text-md font-bold find'>{item.title}</h3>
                  <p className='text-sm text-zinc-500 find'>{item.url}</p>
                </div>
                <div>
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sm hover:text-blue-500'
                  >
                    <span className='icon-open-link'></span>
                  </a>
                </div>
              </div>
            )
          })
        ) : (
          <h3 className='m-2 text-md'>Search ended with no results</h3>
        )}
      </div>
    </section>
  )
}

export const ResultsTable = forwardRef(Component)
