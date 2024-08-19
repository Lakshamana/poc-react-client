import { SearchHistoryResponse, SearchRequest, SearchResponse } from '@/app/types'

const promisify = <T>(data: T) =>
  new Promise<T>(resolve => {
    setTimeout(() => resolve(data), 3000)
  })

const mockSearchResponse: SearchResponse = {
  total: 30,
  perPage: 5,
  totalPages: 6,
  currentPage: 1,
  data: [
    {
      title: 'Go Beyond Google: The Best Alternative Search Engines for 2024',
      url: 'https://www.pcmag.com/picks/go-beyond-google-best-alternative-search-engines',
    },
    {
      title: '19 Alternative Search Engines To Use in 2024 - Kinsta®',
      url: 'https://kinsta.com/blog/alternative-search-engines/',
    },
    {
      title: 'Search outside the box: How we&#x27;re making Search more ... - The Keyword',
      url: 'https://blog.google/products/search/new-search-technology/',
    },
    {
      title: 'Google I/O 2024: New generative AI experiences in Search - The Keyword',
      url: 'https://blog.google/products/search/generative-ai-google-search-may-2024/',
    },
    {
      title: 'Search On 2022: New technology and updates to Google Search - The Keyword',
      url: 'https://blog.google/products/search/search-on-2022-announcements/',
    },
  ],
  updatedSearchHistory: [
    {
      title: 'new_search',
      hash: '2ee21dbb64b9d0bc69028bc7aadb006fc1c15b925008a9a11aa05296c5837676',
    },
    {
      title: 'node',
      hash: '545ea538461003efdc8c81c244531b003f6f26cfccf6c0073b3239fdedf49446',
    },
  ],
}

const mockSearchHistoryResponse: SearchHistoryResponse = {
  data: [
    {
      title: 'new_search',
      hash: '2ee21dbb64b9d0bc69028bc7aadb006fc1c15b925008a9a11aa05296c5837676',
    },
    {
      title: 'node',
      hash: '545ea538461003efdc8c81c244531b003f6f26cfccf6c0073b3239fdedf49446',
    },
  ]
}

export async function retrieveSearchResults({
  q,
  page = 1,
  perPage = 10,
}: SearchRequest): Promise<SearchResponse> {
  const query = new URLSearchParams({
    q,
    page: String(page),
    perPage: String(perPage),
  })

  let response
  try {
    response = await promisify<SearchResponse>(mockSearchResponse)
  } catch (error) {
    throw new Error('Error retrieving search term results')
  }

  return response
}

export async function retrieveSearchHistory(): Promise<SearchHistoryResponse> {
  let response
  try {
    response = await promisify<SearchHistoryResponse>(mockSearchHistoryResponse)
  } catch (error) {
    throw new Error('Error retrieving search history')
  }

  return response
}
