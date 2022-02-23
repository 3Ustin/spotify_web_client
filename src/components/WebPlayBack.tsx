import { Console } from 'console';
import { useEffect, useState} from 'react';
import PlayerUI, {IPlayerUIProps} from './PlayerUI';

//In current build put Access Token Manually in (Line 18)
//Look for an issue in Git for authentification for more info.
function WebPlayback(props: any) {
    //state variable for sending through props
    const [playerinfo,setPlayerInfo] = useState<IPlayerUIProps | undefined>();
    
    useEffect(() => {

        //For importing Spotify SDK.
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        //'ts-ignore' is a Bandaid fix see issue on GitHub to create a 'Type Declaration File'.
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQCSKw26P4bJxxAY3uy6NQj03CxtNvKYeBR-5zLtuF2fK3ma9uWsPTQv9dyAE6YzzQgpufb3yvobfapgT9XlSjG33ThCZKly4C3O99OudzNvV2kYwNEgE-SZqHSOyCjgjzCQuZ06CKcP5vwKndlWD9siSaDb_zM9Oac';
            //For instantiating Spotify Player object.
            //@ts-ignore
            const player = new window.Spotify.Player({
                name: 'WebPlayBack SDK',
                getOAuthToken: (cb: (arg:string) => any) => { cb(token); },
                volume: 0.05
            });
            //listener to the player object for instatiating the player info on startup.
            player.addListener('ready', ({device_id}: {device_id: string}) => {
                console.log('Ready with Device ID', (device_id));
                //@ts-ignore
                player.getCurrentState().then(state => {
                    updatePlayerInfo(state);
                });
            });
            //listener to know if Spotify License has been expired
            //NOT IMPLEMENTED YET
                //In this method is where we will put checking spotify for permissions by getting a access token.
            player.addListener('not_ready', ({device_id}: {device_id: string}) => {
                console.log('Device ID has gone offline', device_id);
            });
            //listener to keep player information updated and accurate.
            //@ts-ignore
            player.addListener('player_state_changed', (state) => {
                updatePlayerInfo(state);
            });
            player.connect();
        };
    }, []);

//@ts-ignore
    const updatePlayerInfo = (state) => {
        if (!state) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }
        const updatedPlayerInfo: IPlayerUIProps = {
            trackName : state.track_window.current_track.name,
            albumName : state.track_window.current_track.album.name,
            artistName : state.track_window.current_track.artists[0].name
        }
        setPlayerInfo(updatedPlayerInfo);
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
    //Method for playing and pausing music based on player state.
    const toggle = (event: React.MouseEvent<HTMLElement>) => {
        console.log("toggle clicked")
        //@ts-ignore
        statePlayer.getCurrentState().then(state => {
            if (!state) {
                //@ts-ignore
                statePlayer.togglePlay().then(() => {
                    console.log('player toggled: ' + state);
                });
            
                return;
            }
            //@ts-ignore
            statePlayer.togglePlay().then(() => {
                console.log('player toggled: ' + state);
            });
        });
    }
    //Method for playing next track
    const forward = (event: React.MouseEvent<HTMLElement>) => {
        //@ts-ignore
        statePlayer.nextTrack().then(() => {
            console.log('Skipped to next track!');
        });
    }
    //Method for playing previous track
    const backward = (event: React.MouseEvent<HTMLElement>) => {
        ///@ts-ignore
        statePlayer.previousTrack().then(() => {
            console.log('Set player to Previous track!');
        });
    }

    return (
        <div className="WebPlayback">
            {/* Buttons that allow player controls for user. */}
            <button onClick={backward}>backward</button>
            <button onClick={toggle}>toggle</button>
            <button onClick={forward}>forward</button>
            {/* Displaying the player information to user through PlayerUI component */}
            { playerinfo && <PlayerUI trackName = {playerinfo.trackName} albumName = {playerinfo.albumName} artistName = {playerinfo.artistName}/> }
        </div>
        
    );

}

export default WebPlayback