import React, { useState } from 'react'
import './Login.css'

const Login = ({ onLoginSuccess }) => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const VALID_ID = '7355022313841'
  const VALID_PASSWORD = 'mummy930'

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      if (id.trim() === VALID_ID && password === VALID_PASSWORD) {
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'logged_in_' + Date.now())
        localStorage.setItem('userId', id)
        onLoginSuccess()
      } else {
        setError('❌ गलत ID या पासवर्ड। कृपया दोबारा कोशिश करें।')
        setId('')
        setPassword('')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🌤️ मौसम सहायक</h1>
        <h2>लॉगिन करें</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="अपनी ID दर्ज करें"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">पासवर्ड</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="पासवर्ड दर्ज करें"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? '⏳ लॉगिन हो रहा है...' : '🔐 लॉगिन करें'}
          </button>
        </form>

        
      </div>
    </div>
  )
}

export default Login
