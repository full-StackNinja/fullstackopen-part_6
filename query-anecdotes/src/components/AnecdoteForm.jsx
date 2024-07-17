import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import {
  NotificationContext,
  useNotificationDispatch,
} from './NotificationContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: queryClient.invalidateQueries({ queryKey: ['notes'] }),
    onError: (error) => {
      console.log('🚀 ~ AnecdoteForm ~ error:', error);

      dispatch({
        type: 'SET',
        payload: error.response.data.error,
      });
      setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 5000);
    },
  });
  const generateId = () => (Math.random() * 100000).toFixed(0);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({
      content,
      id: generateId(),
      votes: 0,
    });
    dispatch({
      type: 'SET',
      payload: `new anecdote '${content}' has been created`,
    });
    setTimeout(() => {
      dispatch({ type: 'RESET' });
    }, 5000);
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
