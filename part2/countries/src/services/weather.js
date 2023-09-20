import axios from 'axios';

const appid = `&appid=${import.meta.env.VITE_WHEATHER_API_KEY}`;

const getCityWeather = (cityName, countryCode) => {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}${appid}`)
    .then(({ data }) => data);
};

export default { getCityWeather };
