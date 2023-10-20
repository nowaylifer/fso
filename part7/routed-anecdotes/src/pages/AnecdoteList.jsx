import { useAnecdotes } from '../components/AnecdotesProvider';
import { Link } from 'react-router-dom';

const AnecdoteList = () => {
  const { anecdotes } = useAnecdotes();

  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AnecdoteList;
