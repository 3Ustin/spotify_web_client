import { Card, Container, AppBar, Toolbar, Typography } from "@mui/material";

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
        <div style={{top: 0,position: 'fixed',left:'50%'}}> 
            <div>Name: {trackName}</div>
            <div>Album: {albumName}</div>
            <div>Artist: {artistName}</div>
        </div>
    );
}
export default PlayerUI;