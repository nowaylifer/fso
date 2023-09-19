export const PersonTable = ({ persons, onDeleteClick }) => (
  <table>
    <tbody>
      {persons.map((p) => (
        <PersonRow key={p.id} person={p} onDeleteClick={onDeleteClick} />
      ))}
    </tbody>
  </table>
);

const PersonRow = ({ person, onDeleteClick }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button onClick={() => onDeleteClick(person)}>delete</button>
    </td>
  </tr>
);
