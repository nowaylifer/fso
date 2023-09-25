const mongoose = require('mongoose');
const Blog = require('../../models/blog');
const blogModels = require('../__mocks__/blog-models');
const { fetchBlogs, createBlog } = require('../test-helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.create(blogModels);
});

test('fetched blog has an id property', async () => {
  const { body } = await fetchBlogs();
  expect(body[0].id).toBeDefined();
});

describe('when there are initiialy some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await fetchBlogs()
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const { body } = await fetchBlogs();
    expect(body).toHaveLength(blogModels.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const { body } = await fetchBlogs();
    const titles = body.map((b) => b.title);
    expect(titles).toContain('Canonical string reduction');
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = blogModels[0];

    await createBlog(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { body: blogsAtEnd } = await fetchBlogs();
    expect(blogsAtEnd).toHaveLength(blogModels.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain('React patterns');
  });

  test("new blog's likes field defaults to 0 if isn't specified", async () => {
    const newBlog = blogModels[0];
    delete newBlog.likes;

    const { body } = await createBlog(newBlog);
    expect(body.likes).toBe(0);
  });

  test('fails with status code 400 if data is invalid', async () => {
    const newBlog = blogModels[0];
    delete newBlog.url;
    await createBlog(newBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
