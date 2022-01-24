//import SDK
let player;

//initialize player object
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'MY ACCESS TOKEN';
    player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

//console some information that describes that the player's working.
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

}

//export the player object
export default player;
