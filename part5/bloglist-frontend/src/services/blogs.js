import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const create = (newBlog, token) => {
  return axios
    .post(baseUrl, newBlog, getAuthHeader(token))
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const update = (updatedBlog, token) => {
  return axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const remove = (id, token) => {
  if (!token) {
    throw new Error('In order to delete blog login first');
  }
  return axios
    .delete(`${baseUrl}/${id}`, getAuthHeader(token))
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

export default { getAll, create, update, remove };
