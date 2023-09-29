import axios from 'axios';
import { API_URL } from '../constants';

const login = ({ username, password }) => {
  return axios
    .post(API_URL + '/login', { username, password })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

export default { login };
