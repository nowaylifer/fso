const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

morgan.token('body', request => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body);
  }
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find(p => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);

  persons = persons.filter(p => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const { body } = request;

  if (!body.name || !body.number) {
    response.status(400).json({ error: 'missing name or number' });
    return;
  }

  if (persons.find(p => p.name === body.name)) {
    response.status(400).json({ error: 'name must be unique' });
    return;
  }

  const person = { id: Math.floor(Math.random() * 1000), ...body };
  persons = persons.concat(person);
  response.json(person);
});

app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
