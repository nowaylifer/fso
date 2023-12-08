import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK } from "../queries";
import { ALL_AUTHORS, ALL_BOOKS } from "../queries";

const inititalFormFields = {
  title: "",
  author: "",
  published: "",
  genre: "",
};

const NewBook = ({ show }) => {
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });
  const [genres, setGenres] = useState([]);
  const [formFields, setFormFields] = useState(inititalFormFields);

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    const { genre: _, ...book } = {
      ...formFields,
      published: Number(formFields.published),
      genres,
    };
    addBook({ variables: { book } });
    setFormFields(inititalFormFields);
  };

  const handleChange = (event) => {
    setFormFields((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const addGenre = () => {
    setGenres(genres.concat(formFields.genre));
    setFormFields((prev) => ({ ...prev, genre: "" }));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={formFields.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          author
          <input
            value={formFields.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={formFields.published}
            name="published"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            value={formFields.genre}
            name="genre"
            onChange={handleChange}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
