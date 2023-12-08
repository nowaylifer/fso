import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from "../queries";
import { useEffect, useState } from "react";

const Authors = ({ show }) => {
  const { data } = useQuery(ALL_AUTHORS);
  const [born, setBorn] = useState("");
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);
  const [editAuthor] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [ALL_AUTHORS],
  });

  useEffect(() => {
    if (data) {
      setSelectedAuthorName(data.allAuthors[0].name);
    }
  }, [data]);

  if (!show) {
    return null;
  }

  if (!data) {
    return <div>loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({
      variables: { name: selectedAuthorName, setBornTo: Number(born) },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birth year</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setSelectedAuthorName(e.target.value)}>
          {data.allAuthors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <input
          name="born"
          type="number"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
