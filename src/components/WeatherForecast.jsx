import React, { useState, useEffect } from 'react'
import './WeatherForecast.css'

const WeatherForecast = ({ weatherData, onRefresh }) => {
  const weekdays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार']
  const months = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']

  if (!weatherData) return null

  const now = new Date()

  return (
    <div className="weather-forecast">
      {weatherData.forecast.forecastday.map((day, dayIndex) => {
        const dateObj = new Date(day.date)
        const isToday = dateObj.toDateString() === now.toDateString()

        const filteredHours = day.hour.filter(h => {
          const hourTime = new Date(h.time)
          return hourTime > now
        })

        if (filteredHours.length === 0) return null

        const isRainExpected = filteredHours.some(h => h.chance_of_rain > 0)

        return (
          <div key={dayIndex} className={`day-block ${isRainExpected ? 'rainy' : ''}`}>
            <div className="date-title">
              {weekdays[dateObj.getDay()]}, {dateObj.getDate()} {months[dateObj.getMonth()]} - {isRainExpected ? '🌧️ वर्षा संभव' : '☀️ वर्षा नहीं'}
            </div>
            <div className="forecast-grid">
              {filteredHours.map((hourData, hourIndex) => {
                const timeObj = new Date(hourData.time)
                const hour = timeObj.getHours()
                const minutes = timeObj.getMinutes().toString().padStart(2, '0')
                const meridian = hour >= 12 ? 'शाम' : 'सुबह'
                const timeFormatted = `${(hour % 12 || 12)}:${minutes} ${meridian}`
                const icon = `https:${hourData.condition.icon}`
                const rainChance = hourData.chance_of_rain

                return (
                  <div key={hourIndex} className="hour-card">
                    <div className="time">{timeFormatted}</div>
                    <img className="icon" src={icon} alt="weather icon" />
                    <div className="rain">💧 {rainChance}% वर्षा संभावना</div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <button className="refresh-btn" onClick={onRefresh}>🔄 रिफ्रेश करें</button>
    </div>
  )
}

export default WeatherForecast
