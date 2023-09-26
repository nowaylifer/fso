/* eslint-disable no-debugger */
const mongoose = require('mongoose');
const Blog = require('../../models/blog');
const { validblogModels, blogWithMissingUrl } = require('../__mocks__/blog-models');
const { fetchBlogs, createBlog, testApp } = require('../test-helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.create(validblogModels);
}, 10000);

test('fetched blog has an id property', async () => {
  const { body } = await fetchBlogs();
  expect(body[0].id).toBeDefined();
});

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await fetchBlogs()
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const { body } = await fetchBlogs();
    expect(body).toHaveLength(validblogModels.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const { body } = await fetchBlogs();
    const titles = body.map((b) => b.title);
    expect(titles).toContain('Canonical string reduction');
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = validblogModels[0];

    await createBlog(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { body: blogsAtEnd } = await fetchBlogs();
    expect(blogsAtEnd).toHaveLength(validblogModels.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain('React patterns');
  });

  test("new blog's likes field defaults to 0 if isn't specified", async () => {
    const newBlog = validblogModels[0];
    delete newBlog.likes;

    const { body } = await createBlog(newBlog);
    expect(body.likes).toBe(0);
  });

  test('fails with status code 400 if data is invalid', async () => {
    await createBlog(blogWithMissingUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deleting a blog', () => {
  test('succeeds with valid id', async () => {
    const { body } = await fetchBlogs();
    const { id } = body[0];
    await testApp.delete(`/api/blogs/${id}`).expect(204);
  });
});

describe('updating a blog', () => {
  test('succeeds with valid data', async () => {
    const { body } = await fetchBlogs();
    const [blog] = body;
    const likesBefore = blog.likes;

    blog.likes += 1;

    const { body: updatedBlog } = await testApp.put(`/api/blogs/${blog.id}`).send(blog).expect(200);

    expect(updatedBlog.likes).toBe(likesBefore + 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
