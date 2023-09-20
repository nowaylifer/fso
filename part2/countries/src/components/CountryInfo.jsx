import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

export function CountryInfo({ country }) {
  const [weatherData, setWeatherData] = useState(null);
  console.log('render');

  useEffect(() => {
    weatherService.getCityWeather(country.capital[0], country.cca2).then(setWeatherData);
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital.join(', ')}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img style={{ maxWidth: 200 }} src={country.flags.svg} alt={country.flags.alt} />
      {weatherData && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {kelvinToCelsius(weatherData.main.temp)} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather.description}
          />
          <p>
            <b>wind {weatherData.wind.speed} m/s</b>
          </p>
        </div>
      )}
    </div>
  );
}

function kelvinToCelsius(value) {
  return (value - 273.15).toFixed(2);
}
