import { useState } from 'react';

const PersonForm = ({ onSubmit, inputValues, getInputHandler }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        name:
        <input value={inputValues.name} onChange={getInputHandler('name')} />
      </label>
    </div>
    <div>
      <label>
        number:
        <input value={inputValues.phone} onChange={getInputHandler('number')} />
      </label>
    </div>
    <button type="submit">add</button>
  </form>
);

const PersonRow = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
);

const PersonTable = ({ persons }) => (
  <table>
    {persons.map((p) => (
      <PersonRow key={p.name} person={p} />
    ))}
  </table>
);

const Filter = ({ query, onChange }) => (
  <label>
    filter shown with
    <input value={query} onChange={onChange} />
  </label>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [inputValues, setInputValue] = useState({ name: '', number: '' });
  const [query, setQuery] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, number } = inputValues;

    if (persons.find((p) => p.name === name)) {
      alert(`${name} is already added to phonebook`);
    } else {
      setPersons([...persons, { name, number }]);
    }
  };

  const getInputHandler = (inputName) => {
    return (event) => {
      setInputValue({ ...inputValues, [inputName]: event.target.value });
    };
  };

  const personsToShow = query
    ? persons.filter((p) =>
        p.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={({ target }) => setQuery(target.value)} />
      <PersonForm
        onSubmit={handleFormSubmit}
        inputValues={inputValues}
        getInputHandler={getInputHandler}
      />
      <h2>Numbers</h2>
      <PersonTable persons={personsToShow} />
    </div>
  );
};

export default App;
