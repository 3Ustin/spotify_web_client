import React from 'react'
import { ISearchResult } from '../../types/SearchTypes'
import SearchResult from './SearchResult'

interface ISearchResultsProps {
  results: ISearchResult
  deviceId: string
}

function SearchResults(props: ISearchResultsProps) {
  const { results, deviceId } = props

  return (
    <div>
      <SearchResult items={results.albums.items} type='album' deviceId={deviceId}></SearchResult>
      <SearchResult items={results.artists.items} type='artist' deviceId={deviceId}></SearchResult>
      <SearchResult items={results.tracks.items} type='track' deviceId={deviceId}></SearchResult>
    </div>
  )
}

export default SearchResults
