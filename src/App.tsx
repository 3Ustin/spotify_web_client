import React from 'react';
import logo from './logo.svg';
import './App.css';
import WebPlayback from './components/WebPlayBack';
import Counter from './components/Counter'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <WebPlayback/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Counter></Counter>
      </header>
    </div>
  );
}

export default App;
