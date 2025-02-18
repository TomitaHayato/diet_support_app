import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "../theme/ThemeSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  }
});
