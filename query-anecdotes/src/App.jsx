import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const updateVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
  });
  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    updateVoteMutation.mutate(updatedAnecdote);
    dispatch({
      type: 'SET',
      payload: `anecdote '${updatedAnecdote.content}' has been voted`,
    });
    setTimeout(() => {
      dispatch({ type: 'RESET' });
    }, 5000);
  };

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (result.isError) {
    return <h2> anecdote service is unavailable due to server error.</h2>;
  }
  if (result.isLoading) {
    return <div>loading anecdotes...</div>;
  }
  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
