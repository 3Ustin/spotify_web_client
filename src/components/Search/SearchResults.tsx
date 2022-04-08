import React from 'react'
import { ISearchResult } from '../../types/SearchTypes'
import SearchResult from './SearchResult'

interface ISearchResultsProps {
  results: ISearchResult
}

function SearchResults(props: ISearchResultsProps) {
  const { results } = props

  return (
    <div>
      <SearchResult items={results.albums.items} type='album'></SearchResult>
      <SearchResult items={results.artists.items} type='artist'></SearchResult>
      <SearchResult items={results.tracks.items} type='track'></SearchResult>
    </div>
  )
}

export default SearchResults
