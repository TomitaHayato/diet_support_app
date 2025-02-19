import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

const intakedCalorieSlice = createSlice({
  name: 'intakedCalorie',
  initialState,
  reducers: {
    // 入力値をセット（数値の場合のみ）
    setCalorie(state, action) {
      const isInputOK = !isNaN(action.payload);
      if(isInputOK) state.value = Number(action.payload)
      return state;
    },
    // 入力値リセット
    resetCalorie(state) {
      state.value = 0
    },
  }
})

export const { setCalorie, resetCalorie } = intakedCalorieSlice.actions;

export const intakedCalorieReducer = intakedCalorieSlice.reducer;
