export function CountriesList({ countries, onSelectCountry }) {
  const isMatchLimit = countries.length > 10;

  if (isMatchLimit) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <ul>
      {countries.map((c, i) => (
        <li key={c.name.official}>
          {c.name.common} <button onClick={() => onSelectCountry(i)}>show</button>
        </li>
      ))}
    </ul>
  );
}
