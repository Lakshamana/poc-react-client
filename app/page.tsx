'use client'

import React, { PropsWithRef, useEffect, useRef, useState } from 'react'
import { ResultsTable, SearchHistory, Pagination } from '@/app/components'
import { retrieveSearchHistory, retrieveSearchResults } from './services/retrieve-data'
import Image from 'next/image'
import { ResultsTableProps, SearchHistoryItem, SearchResponse } from './types'

export default function Home() {
  const [search, setSearch] = useState('')
  const [firstSearch, setFirstSearch] = useState(true)
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState(null as SearchResponse | null)
  const [searchHistory, setSearchHistory] = useState([] as SearchHistoryItem[])
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)
  const [searchResultsError, setSearchResultsError] = useState('')
  const [historyError, setHistoryError] = useState('')
  const [forceHidePagination, setForceHidePagination] = useState(false)

  const resultsTableRef = useRef<PropsWithRef<ResultsTableProps>>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      try {
        const response = await retrieveSearchHistory()
        setSearchHistory(response.data)
        setHistoryError('')
      } catch (error: any) {
        setSearchHistory([])
        setHistoryError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [firstSearch])

  async function searchItem({
    search,
    page,
    perPage,
  }: {
    search: string
    page: number
    perPage: number
  }) {
    if (search === '') return

    setLoading(true)
    setFirstSearch(false)

    try {
      const response = await retrieveSearchResults({ q: search, page, perPage })
      setSearchData(response)
      setSearchHistory(response?.updatedSearchHistory)
      setSearch(search)
      setSearchResultsError('')
    } catch (error: any) {
      setSearchData(null)
      setSearchHistory([])
      setSearch('')
      setSearchResultsError(error.message)
    } finally {
      if (resultsTableRef?.current?.cleanSearch) {
        resultsTableRef.current.cleanSearch()
      }

      setLoading(false)
    }
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    setCurrentPage(1)

    searchItem({
      search,
      page: currentPage,
      perPage,
    })
  }

  async function retrieveSearchPage(page: number) {
    setCurrentPage(page)
    searchItem({
      search,
      page,
      perPage,
    })
  }

  return (
    <div className='w-full flex flex-col lg:h-56 sm:h-6'>
      <nav className='flex lg:h-dvh md:h-1/6 sm:h-24 lg:my-16 m-4 md:m-8'>
        <span className='inline-flex mx-auto items-center'>
          <Image width={32} height={32} alt='' src='/duck.svg' className='mr-2' />
          <span className='lg:text-3xl text-base'>DuckDuckGoer</span>
        </span>
      </nav>
      <main className='flex flex-col items-center justify-between lg:px-24 lg:pb-24 md:px-12 px-4'>
        <div className='w-full flex flex-col max-w-5xl items-stretch justify-center font-mono text-sm lg:flex'>
          <div className='w-full mb-2'>
            <form onSubmit={handleSubmit} action='post'>
              <label htmlFor='search'></label>
              <input
                placeholder='Search duckduckgo.com... (hit enter)'
                type='text'
                id='search'
                name='search'
                onFocus={() => setSearch('')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className='my-2 block w-full rounded-lg focus:ring-0 text-black outline-none border-zinc-300 p-2'
              />
              <button className='display-none' type='submit'></button>
            </form>
          </div>
          <div className='flex justify-stretch'>
            <div className='w-1/4'>
              <SearchHistory
                searchHistory={searchHistory}
                onSelectedItem={item => searchItem({ search: item, page: currentPage, perPage })}
                error={historyError}
              ></SearchHistory>
            </div>
            <div className='grow-0 w-3/4'>
              <ResultsTable
                ref={resultsTableRef}
                data={searchData?.data ?? []}
                firstSearch={firstSearch}
                loading={loading}
                error={searchResultsError}
                forceHidePagination={state => setForceHidePagination(state)}
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <Pagination
              hide={!searchData?.data.length || forceHidePagination}
              currentPage={currentPage ?? 1}
              lastPage={searchData?.totalPages ?? 1}
              onSelectedPage={retrieveSearchPage}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
