import { useParams } from 'react-router-dom';
import { useAnecdotes } from '../components/AnecdotesProvider';

export default function AnecdoteDetails() {
  const { id } = useParams();
  const { getById } = useAnecdotes();
  const anecdote = getById(id);

  return (
    <div>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  );
}
