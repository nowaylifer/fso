import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1';

const get = (id) => {
  const url = id ? `${baseUrl}/${id}` : baseUrl;
  return axios.get(url).then(({ data }) => data);
};

const search = (query) => {
  return axios.get(`${baseUrl}/name/${query}`).then(({ data }) => data);
};

export default { get, search };
