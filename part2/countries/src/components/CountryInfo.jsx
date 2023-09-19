export function CountryInfo({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital.join(', ')}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img style={{ maxWidth: 200 }} src={country.flags.svg} alt={country.flags.alt} />
    </div>
  );
}
