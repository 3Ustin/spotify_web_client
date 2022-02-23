import { useState, useEffect} from 'react';
import WebPlayback from './WebPlayBack';

//Acceptable format for props data.
export interface IPlayerUIProps {
    trackName: string,
    albumName: string,
    artistName: string
}
//@ts-ignore
function PlayerUI(props: IPlayerUIProps) {

    //Deconstruction props
    const {
        trackName,
        albumName,
        artistName
    } = props;

    //Displaying to the user props.
    return(
        <div> 
            <div>Name: {trackName}</div>
            <div>Album: {albumName}</div>
            <div>Artist: {artistName}</div>
        </div>
    );
}

export default PlayerUI;