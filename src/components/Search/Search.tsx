import React, { useCallback, useState } from 'react'
import { ISearchResult } from '../../types/SearchTypes'
import SearchResults from './SearchResults'

function Search() {

  const [searchText, setSearchText] = useState<string>('')
  const [searchResults, setSearchResults] = useState<ISearchResult | undefined>()

  const handleSearchTextChange = useCallback((event) => {
    setSearchText(event.target.value)
  }, [searchText])

  const handleSubmit = useCallback((event) => {
    const getResponse = async () => {
      try {
        // Make a request to the proxy server to route a search request to
        // the spotify API
        const response = await fetch(`/api/v1/search?q=${searchText}`)
        const results = JSON.parse(await response.json()) as ISearchResult
        setSearchResults(results)
      } finally {
        // Reset search text after searching
        setSearchText('')
      }
    }
    getResponse()
    event.preventDefault()
  }, [searchText])

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="search" placeholder="Search for music..." value={searchText} onChange={handleSearchTextChange}></input>
        </form>
      </div>
      <div>
        {searchResults && <SearchResults results={searchResults}></SearchResults>}
      </div>
    </div>
  )
}

export default Search
