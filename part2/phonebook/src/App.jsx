import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, PersonForm, PersonTable } from './components';

const App = () => {
  const [inputValues, setInputValue] = useState({ name: '', number: '' });
  const [query, setQuery] = useState('');
  const [persons, setPersons] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(({ data }) => setPersons(data));
  }, []);

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
      {!!personsToShow && <PersonTable persons={personsToShow} />}
    </div>
  );
};

export default App;
