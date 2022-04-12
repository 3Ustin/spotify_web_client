import React from 'react'
import { ImageSize, IResultItem } from '../../types/SearchTypes';
import SearchResultImage from './SearchResultImage';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { CardActions } from '@mui/material';

interface ISearchResultItemProps {
  item: IResultItem,
  imageSize?: ImageSize
}

function SearchResultItem(props: ISearchResultItemProps) {
  const { item } = props
  const imageSize = props.imageSize ?? 'md'

  return (
    <Grid item xs={3}>
      <Card elevation={3} className='card'>
          {item.images?.length && <SearchResultImage images={item.images} size={imageSize}></SearchResultImage>}
        <CardContent>
          <Typography variant="h5" component="h2">{item.name}</Typography>
        </CardContent>
        <CardActions>
          {/* With the intent On Putting Links here */}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default SearchResultItem