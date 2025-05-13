import './style.css'
import BpmCalculator from './components/BpmCalculator'
import KeyMatcher from './components/KeyMatcher'
import TrackOrganizer from './components/TrackOrganizer'
import SpotifyBpmFinder from './components/SpotifyBpmFinder';

import logo from './assets/logo.png'

import { useEffect } from 'react';
import { getAccessToken } from './spotifyAuth'

function App() {
  useEffect(() => {
    getAccessToken()
  }, []);



  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="DJ Toolkit Logo" className="logo" />
        <h1>DJ Toolkit by <span className="dj-name">Cristian Berrio</span></h1>
      </header>
      <BpmCalculator />
      <KeyMatcher />
      <TrackOrganizer />
      <SpotifyBpmFinder />
      
      <footer style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.8rem' }}>
        Powered by <a href="https://developer.spotify.com" target="_blank">Spotify API</a>
      </footer>
    </div>
  );
}

export default App
