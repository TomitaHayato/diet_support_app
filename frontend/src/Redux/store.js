import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./Slice/ThemeSlice";
import { intakedCalorieReducer } from "./Slice/intakedCalorieSlice";
import { weightReducer } from "./Slice/WeightSlice";

export const store = configureStore({
  reducer: {
    theme:          themeReducer,
    intakedCalorie: intakedCalorieReducer,
    weight:         weightReducer,
  }
});
