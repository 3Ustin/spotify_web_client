import Box from '@mui/material/Box';
import { useRef, useEffect, useState} from 'react';
import PlayerUI, {IPlayerUIProps} from './PlayerUI';
import Search from './Search/Search';
import UserControls, {IUserControlFunctions} from './UserControls';

interface IWebPlaybackProps {
    token: string
}

function WebPlayback(props: IWebPlaybackProps) {
    const { token } = props

    //state variable for sending through props
    const [playerinfo,setPlayerInfo] = useState<IPlayerUIProps | undefined>();
    const [playerControlFunctions, setPlayerControlFuntions] = useState<IUserControlFunctions | undefined>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [deviceId,setDeviceId] = useState<string>();
    const [position, setPosition] = useState<number>(1);
    const [duration, setDuration] = useState<number>(400);
    //MIGHT HAVE TO STORE EVENT DIFFERENTLY
    //const delayedQuery = useRef(_.debounce(q => sendQuery(q), 500)).current;
    
    useEffect(() => {

        //For importing Spotify SDK.
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        //'ts-ignore' is a Bandaid fix see issue on GitHub to create a 'Type Declaration File'.
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            //For instantiating Spotify Player object.
            //@ts-ignore
            const player = new window.Spotify.Player({
                name: 'WebPlayBack SDK',
                getOAuthToken: (cb: (arg:string) => any) => { cb(token); },
                volume: 0.10
            });
            //listener to the player object for instatiating the player info on startup.
            player.addListener('ready', ({device_id}: {device_id: string}) => {
                console.log('Ready with Device ID', (device_id));
                setDeviceId(device_id);
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
                //Process A.2
                
            });
            player.connect();
        };
    }, []);

//PlayerUI Props interface setup
    const updatePlayerInfo = (state : any) => {
        if (!state) {
            setIsPlaying(false);
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }
        
        //PROCESS A.1
            //Get song length in ms
                setDuration(state.track_window.current_track.duration_ms);
            //Get song progress in ms
                setPosition(state.position);
        console.log(state);
        setIsPlaying(!state.paused); //Boolean wether or not current state isPlaying.

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
        const updatedPlayerInfo: IUserControlFunctions = {
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
                console.log('player volume changed');
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
            },
            seek : (position_ms) => {
                player.seek(position_ms).then(() => {
                    console.log(`New Song Position: ${position_ms}`);
                });
            }
        }
        setPlayerControlFuntions(updatedPlayerInfo);
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `
                    "info search search search"
                    "info search search search"
                    "info search search search"
                    "control control control control"
                `
            }}
        >
            <Box sx={{gridArea: 'info'}}>{playerinfo && <PlayerUI trackName = {playerinfo.trackName} albumName = {playerinfo.albumName} artistName = {playerinfo.artistName}/> }</Box>
            <Box sx={{gridArea: 'search'}}>{deviceId && <Search deviceId = {deviceId}/>}</Box>
            <Box sx={{gridArea: 'control'}}>{playerControlFunctions && <UserControls controlFunctions = {playerControlFunctions} isPlaying = {isPlaying} position={position} duration={duration}/>}</Box>
        </Box>
    );
}

export default WebPlayback