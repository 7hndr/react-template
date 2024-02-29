import logo from './images/logo.svg'
import './App.css'

export const App = () => (
  <div className="App">
    <header className="App-header">
      <img
        src={logo}
        className="App-logo"
        alt="logo"
      />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer">
        React docs
      </a>
      {/* partially imperative below */}
      <span className="App-copyright">{`All rights reserved | ${new Date().getFullYear()}`}</span>
    </header>
  </div>
)
