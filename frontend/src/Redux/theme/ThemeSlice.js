import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.name = state.name === 'dark' ? 'light' : 'dark';
    },
  }
});

export const { changeTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
