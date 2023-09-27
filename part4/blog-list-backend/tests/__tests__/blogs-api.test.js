const Blog = require('../../models/blog');
const User = require('../../models/user');
const { newValidUser } = require('../__mocks__/user-models');
const { validblogModels, blogWithMissingUrl } = require('../__mocks__/blog-models');
const { createUser, fetchBlogs, createBlog, testApp, disconnectDB } = require('../test-helper');

let token;

beforeAll(async () => {
  await createUser(newValidUser);
  const { username, password } = newValidUser;
  const response = await testApp.post('/api/login').send({ username, password });
  token = response.body.token;
});

afterAll(async () => {
  token = null;
  await User.deleteMany({});
  await disconnectDB();
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.create(validblogModels);
}, 10000);

describe('when there are initially some blogs saved', () => {
  test('fetched blog has an id property', async () => {
    const { body } = await fetchBlogs(token);
    expect(body[0].id).toBeDefined();
  });

  test('blogs are returned as json', async () => {
    await fetchBlogs(token)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const { body } = await fetchBlogs(token);
    expect(body).toHaveLength(validblogModels.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const { body } = await fetchBlogs(token);
    const titles = body.map((b) => b.title);
    expect(titles).toContain('Canonical string reduction');
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = validblogModels[0];

    await createBlog(newBlog, token)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { body: blogsAtEnd } = await fetchBlogs(token);
    expect(blogsAtEnd).toHaveLength(validblogModels.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain('React patterns');
  });

  test("new blog's likes field defaults to 0 if isn't specified", async () => {
    const newBlog = validblogModels[0];
    delete newBlog.likes;

    const { body } = await createBlog(newBlog, token);
    expect(body.likes).toBe(0);
  });

  test('fails with status code 400 if data is invalid', async () => {
    await createBlog(blogWithMissingUrl, token)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deleting a blog', () => {
  test('succeeds with valid id', async () => {
    const { body } = await fetchBlogs(token);
    const { id } = body[0];
    await testApp.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).expect(204);
  });
});

describe('updating a blog', () => {
  test('succeeds with valid data', async () => {
    const { body } = await fetchBlogs(token);
    const [blog] = body;
    const likesBefore = blog.likes;

    blog.likes += 1;

    const { body: updatedBlog } = await testApp
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(200);

    expect(updatedBlog.likes).toBe(likesBefore + 1);
  });
});
