import './style.css'
import BpmCalculator from './components/BpmCalculator'
import KeyMatcher from './components/KeyMatcher'
import TrackOrganizer from './components/TrackOrganizer'
import TrackBpmFinder from './components/TrackBpmFinder'
import logo from './assets/logo.png'

function App() {
  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="DJ Toolkit Logo" className="logo" />
        <h1>DJ Toolkit by <span className="dj-name">Cristian Berrio</span></h1>
      </header>
      <BpmCalculator />
      <KeyMatcher />
      <TrackOrganizer />
      <TrackBpmFinder />
      <footer style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.8rem' }}>
          Powered by <a href="https://getsongbpm.com" target="_blank" rel="noreferrer">getsongbpm.com</a>
      </footer>

    </div>
  )
}

export default App
