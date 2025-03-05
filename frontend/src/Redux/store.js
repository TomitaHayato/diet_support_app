import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./Slice/ThemeSlice";
import { intakedCalorieReducer } from "./Slice/intakedCalorieSlice";
import { weightReducer } from "./Slice/weightSlice";
import { currentUserReducer } from "./Slice/currentUserSlice";
import { workoutRecordsReducer } from "./Slice/workoutRecordsSlice";

const rootReducer = combineReducers({
  theme:          themeReducer,
  intakedCalorie: intakedCalorieReducer,
  weight:         weightReducer,
  currentUser:    currentUserReducer,
  workoutRecords: workoutRecordsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
});

export const storeForTest = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    // 各ステートの初期値
    preloadedState,
  });  
}