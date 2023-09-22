export const PersonForm = ({ onSubmit, inputValues, getInputHandler }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>
        name:
        <input value={inputValues.name} onChange={getInputHandler('name')} />
      </label>
    </div>
    <div>
      <label>
        number:
        <input
          value={inputValues.number}
          onChange={getInputHandler('number')}
        />
      </label>
    </div>
    <button type="submit">add</button>
  </form>
);
