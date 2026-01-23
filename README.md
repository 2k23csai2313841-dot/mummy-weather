# वाराणसी मौसम पूर्वानुमान - Weather Assistant

A modern React + Vite application for weather forecasting in Varanasi with voice assistant capabilities powered by OpenAI and WeatherAPI.

## Features

✨ **Two Modes:**

1. **📊 Direct Results** - Shows hourly weather forecast for the next 2 days
2. **🎤 Voice Assistant** - Ask questions about weather using voice and get AI-powered responses

🔄 **Technologies Used:**

- React 18 with Vite
- WeatherAPI for weather data
- OpenAI API for intelligent voice responses
- Web Speech API for voice recognition
- Modern CSS with animations

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` file and add:

```env
VITE_WEATHER_API_KEY=your_weatherapi_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_LOCATION=Varanasi
```

### Getting API Keys

**WeatherAPI:**

- Go to https://www.weatherapi.com/
- Sign up for free account
- Copy your API key

**OpenAI API:**

- Go to https://platform.openai.com/
- Sign up for account
- Create API key from settings
- **Note:** You'll need a paid account to use the API

### 3. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Main app component
├── App.css                  # Main styles
├── index.css                # Global styles
└── components/
    ├── WeatherForecast.jsx  # Weather display component
    ├── WeatherForecast.css
    ├── VoiceAssistant.jsx   # Voice assistant component
    ├── VoiceAssistant.css
    ├── NavigationToggle.jsx # Mode toggle component
    └── NavigationToggle.css
```

## Usage

### Direct Results Mode

- View hourly weather forecast
- Scroll through hours and days
- Click refresh button to update data
- Rainy conditions highlighted with blue glow

### Voice Assistant Mode

- Click the microphone button to start speaking
- Speak in Hindi or English
- AI assistant responds with weather insights
- Response is automatically spoken out loud
- Weather context is automatically included in queries

## Browser Compatibility

- Chrome/Edge 25+
- Firefox 25+
- Safari 14.1+
- Opera 27+

**Note:** Voice recognition requires HTTPS in production or HTTP on localhost.

## Troubleshooting

**Voice not working?**

- Check browser permissions for microphone
- Ensure you're using Chrome, Firefox, or Edge
- Use HTTPS in production

**API errors?**

- Verify API keys are correct in `.env`
- Check API rate limits
- Ensure VITE\_ prefix for environment variables

**Build issues?**

- Delete `node_modules` and `dist`
- Run `npm install` again
- Clear browser cache

## Future Enhancements

- [ ] Multi-city weather support
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Advanced speech synthesis options
- [ ] Offline mode support
- [ ] PWA capabilities

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue or contact the developer.
