import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

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
        <AppBar position="fixed" color="primary" sx={{ left: '0', width:'200px', maxheight:'100%',height:'100%' }}>
            <Toolbar sx={{ flexDirection:"column" }}>
                <Container  sx={{padding:'20px', paddingTop:"40px"}}><Typography variant="h5" align="center" sx={{color:'rgb(0, 0, 0)'}}>Name: </Typography><Typography align="center" sx={{color:'rgb(0, 0, 0)'}}>{trackName}</Typography></Container>
                <Container sx={{padding:'20px'}}><Typography variant="h5" align="center" sx={{color:'rgb(0, 0, 0)'}}>Album: </Typography><Typography align="center" sx={{color:'rgb(0, 0, 0)'}}>{albumName}</Typography></Container>
                <Container sx={{padding:'20px'}}><Typography variant="h5" align="center" sx={{color:'rgb(0, 0, 0)'}}>Artist: </Typography><Typography align="center" sx={{color:'rgb(0, 0, 0)'}}>{artistName}</Typography></Container>
            </Toolbar>
        </AppBar>
    );
}
export default PlayerUI;