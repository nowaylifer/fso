import { createContext, useContext, useReducer } from 'react';

const AnecdotesContext = createContext();

const initialState = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1',
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2',
  },
];

const anecdotesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NEW': {
      return state.concat(action.payload);
    }

    case 'VOTE': {
      return state.map((a) =>
        a.id === action.payload ? { ...a, votes: a.votes + 1 } : a
      );
    }
  }
};

export default function AnecdotesProvider({ children }) {
  const [state, dispatch] = useReducer(anecdotesReducer, initialState);

  const addAnecdote = (anecdote) => {
    anecdote.id = String(Math.round(Math.random() * 10000));
    anecdote.votes = anecdote.votes ?? 0;
    dispatch({ type: 'ADD_NEW', payload: anecdote });
  };

  const voteForAnecdote = (id) => {
    dispatch({ type: 'VOTE', payload: id });
  };

  const getById = (id) => {
    return state.find((a) => a.id === id);
  };

  return (
    <AnecdotesContext.Provider
      value={{ anecdotes: state, addAnecdote, voteForAnecdote, getById }}
    >
      {children}
    </AnecdotesContext.Provider>
  );
}

export const useAnecdotes = () => {
  return useContext(AnecdotesContext);
};
