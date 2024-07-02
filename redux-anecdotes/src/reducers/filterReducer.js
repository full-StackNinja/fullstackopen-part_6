import { createSlice } from '@reduxjs/toolkit';
const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterAnecdotes(state, action) {
      const query = action.payload;
      return query;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
