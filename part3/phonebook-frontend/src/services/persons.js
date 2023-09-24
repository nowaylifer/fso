import axios from 'axios';

const baseUrl = '/api/people';

const get = (id) => {
  const url = id ? `${baseUrl}/${id}` : baseUrl;
  return axios.get(url).then(({ data }) => data);
};

const create = (personObj) => {
  return axios.post(baseUrl, personObj).then(({ data }) => data);
};

const update = (id, personObj) => {
  return axios.put(`${baseUrl}/${id}`, personObj).then(({ data }) => data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(({ data }) => data);
};

export default { get, create, update, remove };
