import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const sortedAnecdotes = anecdotes.slice().sort((a, b) => a.votes - b.votes);

    if (filter === 'ALL') {
      return sortedAnecdotes;
    }

    return sortedAnecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(notify(`You have voted for anecdote with id: ${anecdote.id}`, 10));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
