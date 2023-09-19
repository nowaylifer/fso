export const Filter = ({ query, onChange }) => (
  <label>
    filter shown with
    <input value={query} onChange={onChange} />
  </label>
);
