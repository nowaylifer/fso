import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const { id } = action.payload;
      return state.map((anec) => (anec.id === id ? action.payload : anec));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnec = await anecdoteService.updateOne(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch(updateAnecdote(updatedAnec));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
