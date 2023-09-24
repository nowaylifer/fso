import { useState, useEffect } from 'react';
import { Filter, PersonForm, PersonTable, Notification } from './components';
import peopleService from './services/people';

const App = () => {
  const [inputValues, setInputValue] = useState({ name: '', number: '' });
  const [query, setQuery] = useState('');
  const [people, setPeople] = useState(null);
  const [notificationOptions, setNotificationOptions] = useState({ message: '' });
  const [isNotificationShown, setIsNotificationShow] = useState(false);

  useEffect(() => {
    peopleService.get().then((persons) => setPeople(persons));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, number } = inputValues;

    const existingPerson = people.find((p) => p.name === name);

    if (!existingPerson) {
      setInputValue({ name: '', number: '' });
      peopleService
        .create({ name, number })
        .then((newPerson) => {
          setPeople([...people, newPerson]);
          setNotificationOptions({
            message: `Added ${newPerson.name}`,
            variant: 'success',
          });
          setIsNotificationShow(true);
        })
        .catch((error) => {
          setNotificationOptions({ message: error.message, variant: 'error' });
          setIsNotificationShow(true);
        });

      return;
    }

    const shouldUpdate = window.confirm(
      `${name} is already in the phonebook, replace the old number with a new one?`,
    );

    if (shouldUpdate) {
      peopleService
        .update(existingPerson.id, { name, number })
        .then((updatedPerson) =>
          setPeople(people.map((p) => (p.id === existingPerson.id ? updatedPerson : p))),
        )
        .catch((error) => {
          setNotificationOptions({ message: error.message, variant: 'error' });
          setIsNotificationShow(true);
        });
    }
  };

  const handleDeleteClick = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);

    if (shouldDelete) {
      peopleService.remove(person.id).then(() => {
        setPeople(people.filter((p) => p.id !== person.id));
        setIsNotificationShow(true);
        setNotificationOptions({
          message: `Deleted ${person.name}`,
          variant: 'success',
        });
      });
    }
  };

  const getInputHandler = (inputName) => {
    return (event) => {
      setInputValue({ ...inputValues, [inputName]: event.target.value });
    };
  };

  const personsToShow = query
    ? people.filter((p) => p.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    : people;

  return (
    <div>
      {isNotificationShown && (
        <Notification setIsShown={setIsNotificationShow} {...notificationOptions} />
      )}
      <h2>Phonebook</h2>
      <Filter onChange={({ target }) => setQuery(target.value)} />
      <PersonForm
        onSubmit={handleFormSubmit}
        inputValues={inputValues}
        getInputHandler={getInputHandler}
      />
      <h2>Numbers</h2>
      {!!personsToShow && <PersonTable persons={personsToShow} onDeleteClick={handleDeleteClick} />}
    </div>
  );
};

export default App;
