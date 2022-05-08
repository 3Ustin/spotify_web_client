import React, { useCallback, useState } from 'react'
import { ImageSize, IResultItem } from '../../types/SearchTypes';
import SearchResultImage from './SearchResultImage';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { application } from 'express';

interface ISearchResultItemProps {
  item: IResultItem,
  imageSize?: ImageSize,
  deviceId: string
}

function SearchResultItem(props: ISearchResultItemProps) {
  const { item, deviceId } = props
  const imageSize = props.imageSize ?? 'md'
  const payload = JSON.stringify({
    "context_uri": item.uri,
    "offset": {
      "position": 0
    },
    "position_ms": 0
  });

  const handleSubmit = useCallback((event) => {
    const getResponse = async () => {
      try {
        const response = await fetch(`/api/v1/me/player/play?device_id=${deviceId}`,
                                    { method:'PUT',
                                      body:payload, 
                                      headers:{
                                        'Content-Type': 'application/json'
                                      }
                                    });
      } 
      finally {
        //blocked to put error catches in the future.
      }
    }
    getResponse()
    event.preventDefault()
  }, [item])

  return (
    <Grid item xs={3}>
      <Card elevation={3} className='card'>
          {item.images?.length && <SearchResultImage images={item.images} size={imageSize}></SearchResultImage>}
        <CardContent>
          <Typography variant="h5" component="h2">{item.name}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleSubmit} variant='contained' startIcon={<PlayArrowIcon/>}></Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default SearchResultItem