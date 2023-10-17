import AnecdoteForm from './components/AnecdoteForm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdotes';
import { useNotification } from './notify/NotificationProvider/NotificationProvider';

const App = () => {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.updateOne,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anec) =>
          anec.id === updatedAnecdote.id ? updatedAnecdote : anec
        )
      );
      notify({
        message: `You've voted for anecdote with id ${updatedAnecdote.id}`,
      });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    refetchOnWindowFocus: false,
  });

  let content;

  switch (result.status) {
    case 'pending': {
      content = <div>loading anecdotes...</div>;
      break;
    }

    case 'error': {
      content = (
        <div>
          anecdote service is not available due to problems with a server
        </div>
      );
      break;
    }

    case 'success': {
      content = result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ));
    }
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <AnecdoteForm />
      {content}
    </div>
  );
};

export default App;
