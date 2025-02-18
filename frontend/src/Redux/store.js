import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./theme/ThemeSlice";
import { intakedCalorieReducer } from "./intakedCalorie/intakedCalorieSlice";

export const store = configureStore({
  reducer: {
    theme:          themeReducer,
    intakedCalorie: intakedCalorieReducer,
  }
});
