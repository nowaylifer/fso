const blogsRouter = require('express').Router();
const Blog = require('./models/person');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const person = await Blog.create(request.body);
    response.json(person);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
