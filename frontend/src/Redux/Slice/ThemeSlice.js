import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: 'retro'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state) {
      state.name = state.name === 'dark' ? 'retro' : 'dark';
    },
  }
});

export const selectTheme = state => state.theme.name;

export const { changeTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
