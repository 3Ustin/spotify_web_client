import React, { useEffect, useState } from 'react';
import './App.css';
import WebPlayback from './components/WebPlayBack';
import Login from './components/Login';

function App() {

  const [token, setToken] = useState<string | undefined>(undefined)

  useEffect(() => {

    // Fetch the auth token from the proxy server so we can pass it
    // to the WebPlayback component and use it with the Spotify Web Playback SDK
    async function getToken() {
      const response = await fetch('/api/v1/auth/token')
      const json = await response.json()
      setToken(json.access_token)
    }

    getToken()
  }, [])

  return (
    <>
      { (token === undefined) ? <Login /> : <WebPlayback token={token} />}
    </>
  );
}

export default App;
