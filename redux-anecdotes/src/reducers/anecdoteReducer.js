import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      const anecdote = action.payload;
      return state.concat(anecdote).sort((a, b) => b.votes - a.votes);
    },
    incrementVote(state, action) {
      const { id, updatedAnecdote } = action.payload;
      return state
        .map((anecdote) => {
          return anecdote.id === id ? updatedAnecdote : anecdote;
        })
        .sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { setAnecdotes, appendAnecdote, incrementVote } =
  anecdoteSlice.actions;

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdoteToChange = anecdotes.find((n) => n.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.updateAnecdote(
      id,
      changedAnecdote,
    );

    dispatch(incrementVote({ id, updatedAnecdote }));
  };
};
export default anecdoteSlice.reducer;
