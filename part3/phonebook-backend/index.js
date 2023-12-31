require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');
const Person = require('./models/person');

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body);
  }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/people', async (request, response) => {
  const people = await Person.find();
  response.json(people);
});

app.get('/api/people/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.delete('/api/people/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post('/api/people', async (request, response, next) => {
  const { body } = request;
  const { name, number } = body;

  try {
    const person = await Person.create({ name, number });
    response.json(person);
  } catch (error) {
    next(error);
  }
});

app.put('/api/people/:id', async (request, response, next) => {
  const { name, number } = request.body;

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    );

    response.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

app.get('/info', async (request, response) => {
  const date = new Date();
  const peopleCount = await Person.countDocuments({});

  response.send(`
  <p>Phonebook has info for ${peopleCount} people</p>
  <p>${date}</p>`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  switch (error.name) {
    case 'CastError': {
      return response.status(400).send({ error: 'malformatted id' });
    }
    case 'ValidationError': {
      return response.status(400).json({ error: error.message });
    }
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
