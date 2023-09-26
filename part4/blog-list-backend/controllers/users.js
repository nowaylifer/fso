const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const { SALT_ROUNDS } = require('../utils/config');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const savedUser = await User.create({ username, name, passwordHash });
  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
