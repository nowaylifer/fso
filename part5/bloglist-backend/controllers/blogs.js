const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

const userMiddlewares = [middleware.tokenExtractor, middleware.userExtractor];

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .populate('user')
    .then((blogs) => response.json(blogs));
});

blogsRouter.post('/', userMiddlewares, async (request, response) => {
  const { user } = request;
  const savedBlog = await Blog.create({ ...request.body, user: user._id });

  user.blogs = user.blogs.concat(savedBlog._id);
  user.save();

  response.status(201).json(await savedBlog.populate('user'));
});

blogsRouter.delete('/:id', userMiddlewares, async (request, response) => {
  const { user } = request;
  const blogId = request.params.id;

  await Blog.findByIdAndRemove(blogId);

  user.blogs = user.blogs.filter((id) => id.toJSON() !== blogId);
  user.save();

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;
  delete blog.user;
  delete blog.id;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(await updatedBlog.populate('user'));
});

module.exports = blogsRouter;
