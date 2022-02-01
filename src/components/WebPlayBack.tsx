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
            const token = 'BQAi4KF7wMKgrSzrco_1NjpW64niomc0zqtWzXyvgabhUhR9LbPeEpDR8w7elczLa2D9tZNBo4V39lGktGF0D1kDlOelMATp8AAn5k-FeWkOGQ4yXf6yQ5lxR5C4LCWwEstvpSSQwiFezzDTPFEp8ys_EynvZtXurjU';
            //For instantiating Spotify Player object.
            //@ts-ignore
            const player = new window.Spotify.Player({
                name: 'WebPlayBack SDK',
                getOAuthToken: (cb: (arg:string) => any) => { cb(token); },
                volume: 0.05
            });
            
            player.addListener('ready', ({device_id}: {device_id: string}) => {
                console.log('Ready with Device ID', (device_id));
                //@ts-ignore
                player.getCurrentState().then(state => {
                    updatePlayerInfo(state);
                });
            });

            player.addListener('not_ready', ({device_id}: {device_id: string}) => {
                console.log('Device ID has gone offline', device_id);
            });

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
        console.log("clicked");
    }

    return (
        <div className="WebPlayback">
            { playerinfo && <PlayerUI trackName = {playerinfo.trackName} albumName = {playerinfo.albumName} artistName = {playerinfo.artistName}/> }
            <button onClick={buttonHandler} style={{color:'blue', width:'400px', height:'100px' }}> Click me!</button>
        </div>
        
    );

}

export default WebPlayback