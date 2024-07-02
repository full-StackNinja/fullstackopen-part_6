import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialiseAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialiseAnecdotes());
  }, []);
  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
