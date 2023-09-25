const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

blogsRouter.post('/', async (request, response) => {
  const blog = await Blog.create(request.body);
  response.status(201).json(blog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
