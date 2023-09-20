import { useState, useRef } from 'react';
import { Search, CountriesList, CountryInfo } from './components';
import countriesService from './services/countries';
import { asyncDebounce } from './debounce';
import { useEffect } from 'react';

const searchCountryDebounced = asyncDebounce(countriesService.search, 300);

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);
  const queryRef = useRef(query);

  const selectedCountry = countries[selectedCountryIndex] ?? null;

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const handleChange = ({ target }) => {
    const value = target.value;
    setQuery(value);

    if (!value) {
      setCountries([]);
      setSelectedCountryIndex(null);
      return;
    }

    searchCountryDebounced(value)
      .then((countries) => {
        if (queryRef.current) {
          setCountries(countries);
          setSelectedCountryIndex(countries.length === 1 ? 0 : null);
        }
      })
      .catch(() => {
        setCountries([]);
        setSelectedCountryIndex(null);
      });
  };

  return (
    <div>
      <Search query={query} onChange={handleChange} />;
      {selectedCountry ? (
        <CountryInfo country={selectedCountry} />
      ) : (
        <CountriesList countries={countries} onSelectCountry={setSelectedCountryIndex} />
      )}
    </div>
  );
};

export default App;
