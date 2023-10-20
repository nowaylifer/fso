import { useAnecdotes } from '../components/AnecdotesProvider';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../components/notify';
import { useField } from '../hooks';

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes();
  const navigate = useNavigate();
  const notify = useNotification();
  const contentField = useField();
  const authorField = useField();
  const infoField = useField();

  const resetForm = () => {
    contentField.reset();
    authorField.reset();
    infoField.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
    });

    navigate('/');
    notify({ message: 'Added new anecdote' });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button>create</button>
        <button type="button" onClick={resetForm}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
