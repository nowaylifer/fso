import { createSlice } from '@reduxjs/toolkit';

const initialState = 'ALL';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      const filter = action.payload;
      return filter === '' ? initialState : filter;
    },
  },
});

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
