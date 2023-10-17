import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(createAnecdote(content));
    dispatch(notify('Anecdoted added', 10));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="content" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
