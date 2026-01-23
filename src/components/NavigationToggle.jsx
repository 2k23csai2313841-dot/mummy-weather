import React from 'react'
import './NavigationToggle.css'

const NavigationToggle = ({ mode, setMode }) => {
  return (
    <nav className="nav-toggle">
      <div className="toggle-container">
        <button
          className={`toggle-btn ${mode === 'direct' ? 'active' : ''}`}
          onClick={() => setMode('direct')}
        >
          📊 सीधा परिणाम
        </button>
        <button
          className={`toggle-btn ${mode === 'voice' ? 'active' : ''}`}
          onClick={() => setMode('voice')}
        >
          🎤 वॉइस सहायक
        </button>
      </div>
    </nav>
  )
}

export default NavigationToggle
