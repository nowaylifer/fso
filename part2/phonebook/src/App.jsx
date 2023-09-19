import { useState, useEffect } from 'react';
import { Filter, PersonForm, PersonTable } from './components';
import personsService from './services/persons';

const App = () => {
  const [inputValues, setInputValue] = useState({ name: '', number: '' });
  const [query, setQuery] = useState('');
  const [persons, setPersons] = useState(null);

  useEffect(() => {
    personsService.get().then((persons) => setPersons(persons));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, number } = inputValues;

    const existingPerson = persons.find((p) => p.name === name);

    if (!existingPerson) {
      setInputValue({ name: '', number: '' });
      personsService
        .create({ name, number })
        .then((newPerson) => setPersons([...persons, newPerson]));

      return;
    }

    const shouldUpdate = window.confirm(
      `${name} is already in the phonebook, replace the old number with a new one?`,
    );

    if (shouldUpdate) {
      personsService
        .update(existingPerson.id, { name, number })
        .then((updatedPerson) =>
          setPersons(
            persons.map((p) =>
              p.id === existingPerson.id ? updatedPerson : p,
            ),
          ),
        );
    }
  };

  const handleDeleteClick = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);

    if (shouldDelete) {
      personsService
        .remove(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
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
      {!!personsToShow && (
        <PersonTable
          persons={personsToShow}
          onDeleteClick={handleDeleteClick}
        />
      )}
    </div>
  );
};

export default App;
