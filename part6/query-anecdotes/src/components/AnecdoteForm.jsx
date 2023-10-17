import { useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../../services/anecdotes';
import { useNotification } from '../notify/NotificationProvider/NotificationProvider';

const AnecdoteForm = () => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
      notify({ message: 'Anecdote created!' });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate(content);
    event.target.anecdote.value = '';
    console.log('new anecdote');
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
