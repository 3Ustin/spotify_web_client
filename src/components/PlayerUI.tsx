import { useState, useEffect} from 'react';
import WebPlayback from './WebPlayBack';
//@ts-ignore
function PlayerUI(props: any) {
    return(
        <div> 
            <div>{props.trackName}</div>
            <div>{props.albumName}</div>
            <div>{props.artistName}</div>
        </div>
    );
}

export default PlayerUI;