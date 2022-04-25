import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import "../css/playerInfoDisplay.css"
import React from 'react'

//Acceptable format for props data
export interface IPlayerUIProps {
    trackName: string,
    albumName: string,
    artistName: string
}
function PlayerUI(props: IPlayerUIProps) {
    //Deconstruction props
    const {
        trackName,
        albumName,
        artistName
    } = props;
    //Displaying to the user props
    return(
        <AppBar color='primary' sx={{ left: '0', width:'200px', maxheight:'100%',height:'100%' }}> {/*This inline Css is here because the appbar class is being overwritten by MUI component AppBar*/}
            <Toolbar className='toolbar'>
                <Container className='container'><Typography variant='h5' align='center' >Name: </Typography><Typography align='center' >{trackName}</Typography></Container>
                <Container className='container' ><Typography variant='h5' align='center' >Album: </Typography><Typography align='center' >{albumName}</Typography></Container>
                <Container className='container'><Typography variant='h5' align='center' sx={{color:'rgb(0, 0, 0)'}}>Artist: </Typography><Typography align='center' >{artistName}</Typography></Container>
            </Toolbar>
        </AppBar>
    );
}
export default PlayerUI;