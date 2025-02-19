import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./Slice/ThemeSlice";
import { intakedCalorieReducer } from "./Slice/intakedCalorieSlice";
import { weightReducer } from "./Slice/WeightSlice";
import { currentUserReducer } from "./Slice/currentUserSlice";

export const store = configureStore({
  reducer: {
    theme:          themeReducer,
    intakedCalorie: intakedCalorieReducer,
    weight:         weightReducer,
    currentUser:    currentUserReducer,
  }
});
