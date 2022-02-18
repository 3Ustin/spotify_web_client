import { useEffect, useState} from 'react';
import PlayerUI from './PlayerUI';

//In current build put Access Token Manually in (Line 18)
//Look for an issue in Git for authentification for more info.
function WebPlayback(props: any) {
    //two state variables for updating Player Object
    const [statePlayer, setPlayer] = useState();
    const [isPlayerGood,setisPlayerGood] = useState(false);

    //three state variables for sending through props
    const [trackName,setTrackName] = useState();
    const [albumName,setAlbumName] = useState();
    const [artistName,setArtistName] = useState();
    
    useEffect(() => {

        //For importing Spotify SDK.
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        //'ts-ignore' is a Bandaid fix see issue on GitHub to create a 'Type Declaration File'.
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQC8-XcJ14kLmfW963Z33THxXl6NRcvPGeI8IfKnTa5xKN5ip7JrSwhY55mM-QqZpa3JzQhpp7BeHwmS0pVx0OBRXnY4iOUfN_Cv4AL5Eu4GBjXTZnXvwJlzDo7ZqUBLyp6p__QTSFYr1xq-PXA1E_qy8027QzXDxP8';
            //For instantiating Spotify Player object.
            //@ts-ignore
            const player = new window.Spotify.Player({
                name: 'WebPlayBack SDK',
                getOAuthToken: (cb: (arg:string) => any) => { cb(token); },
                volume: 0.5
            });
            
            player.addListener('ready', ({device_id}: {device_id: string}) => {
                console.log('Ready with Device ID', (device_id));
            });

            player.addListener('not_ready', ({device_id}: {device_id: string}) => {
                console.log('Device ID has gone offline', device_id);
            });

            //@ts-ignore
            player.addListener('player_state_changed', ({track_window: { current_track }}) => {
                //setAlbumName(current_track.album.name);
                //setArtistName(current_track.artists[0].name);
                //@ts-ignore
                //setTrackName(current_track.name);
                updateProps(current_track.name,current_track.album.name,current_track.artists[0].name);
            });
            
            //@ts-ignore
            player.connect();

            setPlayer(player);
            setisPlayerGood(true);
        };
    }, []);

    //Why assigning trackName or ablumName to type string does state send error?
    const updateProps = (trackName:any,albumName:any,artistName:any) =>{
        setTrackName(trackName);
        setAlbumName(albumName);
        setArtistName(artistName);
    }

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        //@ts-ignore
        console.log(statePlayer);

        //@ts-ignore
        statePlayer.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }
            
            var current_track = state.track_window.current_track;
            var next_track = state.track_window.next_tracks[0];

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
        });


        //@ts-ignore
        statePlayer.getVolume().then((volume: number)=> {
            let volume_percentage = volume * 100;
            console.log(`The volume of the player is ${volume_percentage}%`);
        });
    }

    return (
        /*
        THIS IS TEST CODE FOR RECIEVING PLAYER INFO THROUGH A BUTTON*/
        <div className="WebPlayback">
            <button onClick={buttonHandler} style={{color:'blue', width:'400px', height:'100px' }}> Click me!</button>
            {isPlayerGood && <PlayerUI trackName = {trackName} albumName = {albumName} artistName = {artistName}/>}
        </div>
        
    );

}
export default WebPlayback