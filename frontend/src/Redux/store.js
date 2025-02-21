import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./Slice/ThemeSlice";
import { intakedCalorieReducer } from "./Slice/intakedCalorieSlice";
import { weightReducer } from "./Slice/weightSlice";
import { currentUserReducer } from "./Slice/currentUserSlice";
import { workoutRecordsReducer } from "./Slice/workoutRecordsSlice";

export const store = configureStore({
  reducer: {
    theme:          themeReducer,
    intakedCalorie: intakedCalorieReducer,
    weight:         weightReducer,
    currentUser:    currentUserReducer,
    workoutRecords: workoutRecordsReducer,
  }
});
