import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Helmet } from 'react-helmet';

function App() {
  const [time, settime] = useState(new Date().toTimeString())
  setInterval(() => {
    settime(new Date().toTimeString())
  }, 1000);

  console.log(typeof window !== 'undefined' && window.navigator.userAgent)
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. {time}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
