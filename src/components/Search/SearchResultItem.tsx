import React from 'react'
import { ImageSize, IResultItem } from '../../types/SearchTypes';
import SearchResultImage from './SearchResultImage';

interface ISearchResultItemProps {
  item: IResultItem,
  imageSize?: ImageSize
}

function SearchResultItem(props: ISearchResultItemProps) {
  const { item } = props
  const imageSize = props.imageSize ?? 'md'

  return (
    <div>
      {item.images?.length && <SearchResultImage images={item.images} size={imageSize}></SearchResultImage>}
      <p>{item.name}</p>
    </div>
  )
}

export default SearchResultItem