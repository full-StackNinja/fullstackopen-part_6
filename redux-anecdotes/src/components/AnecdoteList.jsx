import { useDispatch, useSelector } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import PropTypes from 'prop-types';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      const query = new RegExp(state.filter, 'i');
      return state.anecdotes.filter((anecdote) => {
        return anecdote.content.match(query);
      });
    }

    return state.anecdotes;
  });
  const dispatch = useDispatch();

  const addVote = (id) => {
    const votedAnecdote = anecdotes.find((n) => n.id === id);
    const content = votedAnecdote.content;
    dispatch(updateAnecdote(id));
    dispatch(setNotification(`you voted '${content}'`, 3));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => {
            addVote(anecdote.id);
          }}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
