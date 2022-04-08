import React from 'react'

/**
 * Component to be displayed when the user is not authenticated
 * 
 * This component displays a link that will trigger the authentication
 * flow using the proxy server
 */
function Login() {
  
  return (
    <div className="App">
      <header className="App-header">
        <a className="btn-spotify" href="/api/v1/auth/login">
          Login with Spotify
        </a>  
      </header>  
    </div>
  )
}

export default Login
