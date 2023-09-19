export const Search = ({ query, onChange }) => (
  <label>
    find countries
    <input value={query} onChange={onChange} />
  </label>
);
