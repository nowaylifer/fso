const supertest = require('supertest');
const app = require('../app');

const testApp = supertest(app);

const fetchBlogs = () => {
  return testApp.get('/api/blogs');
};

const createBlog = (blog, token) => {
  return testApp.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`);
};

const fetchUsers = () => {
  return testApp.get('/api/users');
};

const createUser = (user) => {
  return testApp.post('/api/users').send(user);
};

module.exports = {
  testApp,
  fetchBlogs,
  createBlog,
  fetchUsers,
  createUser,
};
