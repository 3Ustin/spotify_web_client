import React, { useState, useEffect } from 'react';
import player from '../utilities/WebPlayback';

//Props are put in here to pass the Access Token, but Mile's might have a different method.
function WebPlayback(props: any) {
    const [player, setPlayer] = useState(undefined);


    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);
        //Turned this into an any type becuase I think Typescript is 'acting up' here.
        (window as any).onSpotifyWebPlaybackSDKReady = () => {
            //EXPERIMENTING WITH OUT TO USE TYPE SCRIPT
        //window.(onSpotifyWebPlaybackSDKReady: Boolean) = () => {
            //TOKENS will be passed through props unless Mile's says otherwise this is just for testing purposes.
            const token = 'MY ACCESS TOKEN';
            const player = new (window as any).Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb: any) => { cb(token); },
                volume: 0.5
            });
            //Hook call for player object storage.
            setPlayer(player);
            let device_id = Number;
            player.addListener('ready', ({ device_id}) => {
                console.log('Ready with Device ID', (device_id as number));
            });

            player.addListener('not_ready', ({ device_id }) => {
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