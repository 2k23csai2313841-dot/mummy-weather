import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import WeatherForecast from './components/WeatherForecast'
import VoiceAssistant from './components/VoiceAssistant'
import NavigationToggle from './components/NavigationToggle'
import Login from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mode, setMode] = useState('direct') // 'direct' or 'voice'
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY
  const location = import.meta.env.VITE_LOCATION

  // Check if user is already logged in
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (authToken) {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      fetchWeatherData()
    }
  }, [isLoggedIn])

  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=2&aqi=no&alerts=no`
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch weather data')
      const data = await response.json()
      setWeatherData(data)
      setError(null)
    } catch (err) {
      setError('❌ डेटा लोड करने में त्रुटि। कृपया बाद में पुनः प्रयास करें।')
      console.error('Weather API Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!isLoggedIn ? (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <div className="app-container">
          <header className="app-header">
            <h1>🌧️ वाराणसी वर्षा पूर्वानुमान<br />(अगले 2 दिन)</h1>
            <h2>नमस्ते प्रियंका सिंह 🙏🏻</h2>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem('authToken')
                localStorage.removeItem('userId')
                setIsLoggedIn(false)
              }}
            >
              लॉगआउट
            </button>
          </header>

          <NavigationToggle mode={mode} setMode={setMode} />

          <main className="app-main">
            {loading ? (
              <div className="loading">लोड हो रहा है...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <>
                {mode === 'direct' ? (
                  <WeatherForecast
                    weatherData={weatherData}
                    onRefresh={fetchWeatherData}
                  />
                ) : (
                  <VoiceAssistant
                    weatherData={weatherData}
                    location={location}
                  />
                )}
              </>
            )}
          </main>
        </div>
      )}
    </>
  )
}

export default App
