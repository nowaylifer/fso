import { useState, useRef } from 'react';
import { Search, CountriesList, CountryInfo } from './components';
import countriesService from './services/countries';
import { asyncDebounce } from './debounce';
import { useEffect } from 'react';

const searchCountryDebounced = asyncDebounce(countriesService.search, 300);

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const handleChange = ({ target }) => {
    const value = target.value;
    setQuery(value);

    if (!value) {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }

    searchCountryDebounced(value)
      .then((countries) => {
        if (queryRef.current) {
          setCountries(countries);
          setSelectedCountry(countries.length === 1 ? countries[0] : null);
        }
      })
      .catch(() => {
        setCountries([]);
        setSelectedCountry(null);
      });
  };

  return (
    <div>
      <Search query={query} onChange={handleChange} />;
      {selectedCountry ? (
        <CountryInfo country={selectedCountry} />
      ) : (
        <CountriesList countries={countries} onSelectCountry={(c) => setSelectedCountry(c)} />
      )}
    </div>
  );
};

export default App;
