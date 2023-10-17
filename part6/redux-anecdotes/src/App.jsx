import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteFilter from './components/AnecdoteFilter';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
