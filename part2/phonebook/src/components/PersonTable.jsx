export const PersonTable = ({ persons }) => (
  <table>
    <tbody>
      {persons.map((p) => (
        <PersonRow key={p.id} person={p} />
      ))}
    </tbody>
  </table>
);

const PersonRow = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
);
