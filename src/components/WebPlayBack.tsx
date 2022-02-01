import { useEffect } from 'react';

//In current build put Access Token Manually in (Line 18)
//Look for an issue in Git for authentification for more info.
function WebPlayback(props: any) {

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
            //@ts-ignore
            //For instantiating Spotify Player object.
            const player = new window.Spotify.Player({
                name: 'WebPlayBack SDK',
                getOAuthToken: (cb: (arg:string) => any) => { cb(token); },
                volume: 0.5
            });

            player.addListener('ready', ({device_id}: {device_id: number}) => {
                console.log('Ready with Device ID', (device_id));
            });

            player.addListener('not_ready', ({device_id}: {device_id: number}) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.connect();

        };
    }, []);

    return (
        <div className="WebPlayback">
        </div>
    );

}
export default WebPlayback