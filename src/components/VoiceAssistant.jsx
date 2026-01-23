import React, { useState, useRef } from 'react'
import './VoiceAssistant.css'

const VoiceAssistant = ({ weatherData, location }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const recognitionRef = useRef(null)

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY

  // Initialize Speech Recognition
  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.lang = 'hi-IN'
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onresult = (event) => {
        const transcribed = Array.from(event.results)
          .map(result => result[0].transcript)
          .join(' ')
        setTranscript(transcribed)
        handleVoiceQuery(transcribed)
      }
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    setTranscript('')
    setResponse('')
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const handleVoiceQuery = async (query) => {
    if (!query.trim()) return

    try {
      setLoading(true)

      // Prepare weather context
      const weatherContext = formatWeatherData(weatherData)

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: 'system',
              content: `तुम एक समझदार वॉइस असिस्टेंट हो।
हर उत्तर की शुरुआत "मम्मी," शब्द से करनी है।

मैं तुम्हें मौसम से जुड़ा डेटा दूँगा।
अगर उपयोगकर्ता का सवाल मौसम से संबंधित हो,
तो पहले दिए गए मौसम डेटा में उत्तर खोजने की कोशिश करना।

अगर मौसम से जुड़ा सवाल है लेकिन उसका उत्तर इस डेटा में उपलब्ध नहीं है,
तो अपनी सामान्य जानकारी और समझ के आधार पर उत्तर देना।

अगर उपयोगकर्ता का सवाल मौसम से संबंधित नहीं है,
तो जो भी पूछा गया है उसका छोटा, साफ और सामान्य हिंदी में उत्तर देना।

हर उत्तर बोलने के लिए उपयुक्त हो।
सरल और स्वाभाविक हिंदी भाषा का प्रयोग करो।
अनावश्यक जानकारी, सूची, उदाहरण या शीर्षक मत जोड़ो।
उत्तर 1–2 पंक्तियों में ही दो।


Weather Data:
${weatherContext}
Location: ${location}
`
            },
            {
              role: 'user',
              content: `User Question: ${query}`
            }
          ],
          temperature: 0.7
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from Groq')
      }

      const data = await response.json()
      const assistantResponse = data.choices[0].message.content

      setResponse(assistantResponse)

      // Optional: Speak the response
      speakResponse(assistantResponse)
    } catch (error) {
      console.error('Groq API Error:', error)
      setResponse('⚠️ माफ कीजिए, जवाब देने में समस्या हुई। कृपया बाद में पुनः प्रयास करें।')
    } finally {
      setLoading(false)
    }
  }

  const formatWeatherData = (data) => {
    if (!data) return 'No data available'

    const today = data.forecast.forecastday[0]
    const tomorrow = data.forecast.forecastday[1]

    return `
    Today: High ${today.day.maxtemp_c}°C, Low ${today.day.mintemp_c}°C
    Rain chance: ${today.day.daily_chance_of_rain}%
    Condition: ${today.day.condition.text}

    Tomorrow: High ${tomorrow.day.maxtemp_c}°C, Low ${tomorrow.day.mintemp_c}°C
    Rain chance: ${tomorrow.day.daily_chance_of_rain}%
    Condition: ${tomorrow.day.condition.text}
    `
  }

  const speakResponse = (text) => {
    if ('speechSynthesis' in window && text && text.trim()) {
      // Cancel any ongoing speech
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'hi-IN'
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1

      // Handle speech events
      utterance.onstart = () => {
        console.log('🔊 Playing: ' + text.substring(0, 50))
      }

      utterance.onend = () => {
        console.log('✅ Speech completed')
      }

      utterance.onerror = (event) => {
        console.error('❌ Speech error:', event.error)
      }

      // Delay to ensure browser is ready
      setTimeout(() => {
        speechSynthesis.speak(utterance)
      }, 50)
    }
  }

  return (
    <div className="voice-assistant">
      <div className="voice-section">
        <button
          className={`voice-btn ${isListening ? 'listening' : ''}`}
          onClick={startListening}
          disabled={loading}
        >
          {isListening ? '🎤 सुन रहे हैं...' : '🎤 बोलिए'}
        </button>

        {transcript && (
          <div className="transcript">
            <p><strong>आप:</strong> {transcript}</p>
          </div>
        )}

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>उत्तर तैयार हो रहा है...</p>
          </div>
        )}

        {response && (
          <div className="response-box">
            <p><strong>सहायक:</strong> {response}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VoiceAssistant
