import axios from 'axios';
import { API_URL } from '../constants';

const login = (username, password) => {
  axios
    .post(API_URL + '/login', { username, password })
    .then(({ data }) => data)
    .catch((response) => console.log(response));
};

export { login };
