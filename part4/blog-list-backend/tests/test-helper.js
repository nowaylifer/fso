const supertest = require('supertest');
const app = require('../app');

const testApp = supertest(app);

const fetchBlogs = () => {
  return testApp.get('/api/blogs');
};

const createBlog = (blog) => {
  return testApp.post('/api/blogs').send(blog);
};

module.exports = {
  testApp,
  fetchBlogs,
  createBlog,
};
