const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const User = require('../models/user');

morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body);
  }
});

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case 'CastError': {
      return response.status(400).send({ error: 'malformatted id' });
    }
    case 'ValidationError': {
      return response.status(400).json({ error: error.message });
    }
    case 'JsonWebTokenError': {
      return response.status(401).json({ error: 'invalid token' });
    }
    case 'TokenExpiredError': {
      return response.status(401).json({ error: 'token expired' });
    }
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '');
    request.token = token;
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, JWT_SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
