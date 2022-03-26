import { useEffect, useState} from 'react';
import PlayerUI, {IPlayerUIProps} from './PlayerUI';
import UserControls, {IUserControlsProps} from './UserControls';

//In current build put Access Token Manually in (Line 18)
//Look for an issue in Git for authentification for more info.
function WebPlayback(props: any) {
    //state variable for sending through props
    const [playerinfo,setPlayerInfo] = useState<IPlayerUIProps | undefined>();
    const [playerControls, setPlayerControls] = useState<IUserControlsProps | undefined>();
    
    useEffect(() => {

        //For importing Spotify SDK.
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        //'ts-ignore' is a Bandaid fix see issue on GitHub to create a 'Type Declaration File'.
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQDhpW8j_KUBoCY8OEzziNtdXnC7xaRYxlmp9RwgCsfahQgzOoG-KPR6HlMBoXu3jXzH1-8DKsjC55Ichy_iG7kPf8-dis4QYzDGAwlBMdUpfecU3KLLnhCSoNcX8Ysv2BEjmdZ096uEyFRDGZJ4nIr96Y671QE7sGM';
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
                initializePlayerControls(player);
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
//PlayerUI Props interface setup
    const updatePlayerInfo = (state : any) => {
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
//UserControls Props interface setup
    const initializePlayerControls = (player: any) => {
        if (!player) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }
        const updatedPlayerInfo: IUserControlsProps = {
            backward : () => player.previousTrack().then(() => {
                console.log('player toggled');
            }),
            toggle : () => player.togglePlay().then(() => {
                console.log('player toggled');
            }),
            forward : () => player.nextTrack().then(() => {
                console.log('Skipped to next track');
            }),
            volume : (event) => player.setVolume(parseInt(event.target.value)/100).then(() => {
                console.log(parseInt(event.target.value)/100);
            }),
            tenForward : () => {
                player.getCurrentState().then((state:any) => {
                    if (!state) {
                        console.error('User is not playing music through the Web Playback SDK');
                        return;
                    }
                    player.seek(state.position + 10000).then(() => {
                        console.log('Stepped Forward 10s');
                    });
                });
            },
            tenBackward : () => {
                player.getCurrentState().then((state:any) => {
                    if (!state) {
                        console.error('User is not playing music through the Web Playback SDK');
                        return;
                    }
                    player.seek(state.position - 10000).then(() => {
                        console.log('Stepped Backward 10s');
                    });
                });
            }
        }
        setPlayerControls(updatedPlayerInfo);
    }

    return (
        <div className="WebPlayback">
            {/* Buttons that allow player controls for user. */}
            {playerControls && <UserControls backward = {playerControls.backward} toggle = {playerControls.toggle} forward = {playerControls.forward} volume = {playerControls.volume} tenForward = {playerControls.tenForward} tenBackward = {playerControls.tenBackward}/>}
            {/* Displaying the player information to user through PlayerUI component */}
            { playerinfo && <PlayerUI trackName = {playerinfo.trackName} albumName = {playerinfo.albumName} artistName = {playerinfo.artistName}/> }
        </div>
        
    );
}

export default WebPlayback