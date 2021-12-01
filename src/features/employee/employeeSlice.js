import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'employee',
  initialState: {
    value: [],
    fetched: false,
  },
  reducers: {
    appendEmployeeStore: (state, action) => {
      state.value.push(action.payload);
    },
    setEmployeeStore: (state, action) => {
      state.value = action.payload;
    },
    setFetched: (state, action) => {
      state.fetched = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { appendEmployeeStore, setEmployeeStore, setFetched } =
  counterSlice.actions;

export default counterSlice.reducer;
