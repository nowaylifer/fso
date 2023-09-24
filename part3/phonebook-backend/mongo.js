const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const name = process.argv[3];
const number = process.argv[4];

if (name && number) {
  createPerson(name, number);
} else {
  getPeople();
}

async function getPeople() {
  const people = await Person.find({});
  console.log('phonebook:');
  people.forEach((person) => console.log(`${person.name} ${person.number}`));
  mongoose.connection.close();
  process.exit(1);
}

async function createPerson(name, number) {
  try {
    await Person.create({ name, number });
    console.log(`added ${name} number ${number} to phonebook`);
  } catch {
    console.log('something went wrong with adding person');
  }

  mongoose.connection.close();
  process.exit(1);
}
