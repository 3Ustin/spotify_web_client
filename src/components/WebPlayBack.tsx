import { useEffect, useState} from 'react';

//In current build put Access Token Manually in (Line 18)
//Look for an issue in Git for authentification for more info.
function WebPlayback(props: any) {
    var [statePlayer, setPlayer] = useState();
    useEffect(() => {

        //For importing Spotify SDK.
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        //'ts-ignore' is a Bandaid fix see issue on GitHub to create a 'Type Declaration File'.
        // @ts-ignore
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'My Access Token';
            //For instantiating Spotify Player object.
            //@ts-ignore
            const player = new window.Spotify.Player({
                name: 'WebPlayBack SDK',
                getOAuthToken: (cb: (arg:string) => any) => { cb(token); },
                volume: 0.5
            });
            
            //Device ID is returning a string I believe not a number, as miles about this.
            //@ts-ignore
            player.addListener('ready', ({device_id}: {device_id: number}) => {
                console.log('Ready with Device ID', (device_id));
            });
            //@ts-ignore
            player.addListener('not_ready', ({device_id}: {device_id: number}) => {
                console.log('Device ID has gone offline', device_id);
            });
            //@ts-ignore
            player.connect();

            setPlayer({statePlayer: player});
        };
    }, []);

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        //@ts-ignore
        console.log(statePlayer);
        //@ts-ignore
        statePlayer.getVolume().then((volume: number)=> {
            let volume_percentage = volume * 100;
            console.log(`The volume of the player is ${volume_percentage}%`);
        });
    }

    return (
        <div className="WebPlayback">
            <button onClick={buttonHandler} style={{color:'blue', width:'400px', height:'100px' }}> Click me!</button>
        </div>
    );

}
export default WebPlayback