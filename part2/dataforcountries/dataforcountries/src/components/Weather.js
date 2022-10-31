import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])

    const hook = () => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
            .then((response) => {
                setWeather(response.data)
            })
    }
    useEffect(hook, [])

    return (
        <div>
            {weather.main ? (
                <div>
                    <h2>Weather in {capital}</h2>
                    <p>Temperature {weather.main.temp}</p>
                    <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>Wind {weather.wind.speed} m/s</p>
                </div>
            ) : null}
        </div>
    )
} 

export default Weather