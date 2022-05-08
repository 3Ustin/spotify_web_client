import CardMedia from '@mui/material/CardMedia'
import React from 'react'
import { IImage, ImageSize } from '../../types/SearchTypes'

interface ISearchResultImageProps {
  images: IImage[]
  size: ImageSize
}

const indexFromSize: Record<ImageSize, number> = {
  sm: 2,
  md: 1,
  lg: 0
}

// NOTE: This component was put together hackily for the initial pass at displaying
// search results. It assumes that all assets search result items returned by the
// spotify api will have 3 images of consistent sizing. Whether or not this is
// true, we should look in to a more safe way to implement this component
// One idea is to allow for any height/width to be passed in to the component and find
// the image with the closest match in dimensions.
function SearchResultImage(props: ISearchResultImageProps) {
  const { size, images } = props

  const index = indexFromSize[size]
  const imagesLength = images.length
  const image =  imagesLength >= index ? images[imagesLength - 1] : images[index]

  return (
    <CardMedia component='img' height={100} src={image.url}></CardMedia>
  )
}

export default SearchResultImage
