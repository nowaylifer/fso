import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      return;
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(({ data }) => setCountry({ data, found: true }))
      .catch(() => setCountry({ found: false }));
  }, [name]);

  return country;
};

const Country = React.memo(({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  console.log(country);

  return (
    <div>
      <h3>{country.data.name.official} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.svg}
        height="100"
        alt={`flag of ${country.data.name.official}`}
      />
    </div>
  );
});

const App = () => {
  const nameInput = useField('text');
  const [query, setQuery] = useState(null);
  const country = useCountry(query);

  const fetch = (e) => {
    e.preventDefault();
    setQuery(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
