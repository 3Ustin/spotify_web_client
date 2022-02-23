import { useState, useEffect} from 'react';
import WebPlayback from './WebPlayBack';

export interface IPlayerUIProps {
    trackName: string,
    albumName: string,
    artistName: string
}

//@ts-ignore
function PlayerUI(props: IPlayerUIProps) {
    //Is this Deconstruction?
    const {
        trackName,
        albumName,
        artistName
    } = props;
    return(
        <div> 
            <div>Name: {trackName}</div>
            <div>Album: {albumName}</div>
            <div>Artist: {artistName}</div>
        </div>
    );
}

export default PlayerUI;