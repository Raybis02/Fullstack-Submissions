import { useState, useEffect } from 'react';
import axios from 'axios';

const getWeather = async (country, api_key) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`
        )
        return response.data
    } catch (error) {
        console.error('Error fetching weather data:', error)
        return null
    }
}

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await getWeather(country, api_key)
            setWeather(weatherData)
        }
        fetchWeather()
    }, [country, api_key])

    if (!weather) {
        return <div>Loading weather data...</div>
    }

    return (
        <div>
            <h1>Weather in {country.name.common}</h1>
            <div>
                <div>Temperature: {weather.main.temp} °C</div>
                <div>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="pic" />
                </div>
                <div>Wind: {weather.wind.speed} m/s</div>
            </div>
        </div>
    )
}

export default Weather
