import Grid from '@mui/material/Grid'
import React from 'react'
import { IResultItem, ResultItemType } from '../../types/SearchTypes'
import SearchResultItem from './SearchResultItem'

interface ISearchResultProps {
  items: IResultItem[]
  type: ResultItemType
}

function SearchResult(props: ISearchResultProps) {
  const { items, type } = props

  let headerMessage
  switch (type) {
    case 'album':
      headerMessage = 'Albums:'
      break
    case 'track':
      headerMessage = 'Tracks:'
      break
    case 'artist':
      headerMessage = 'Artists:'
      break
    default:
      headerMessage = 'Results:'
  }
  
  return (
    <div>
      <h1>{headerMessage}</h1>
      <Grid container spacing={5}>
        {items.map((item) => {
          return (<SearchResultItem key={item.id} item={item}/>)
        })}
      </Grid>
    </div>
  )
}

export default SearchResult
