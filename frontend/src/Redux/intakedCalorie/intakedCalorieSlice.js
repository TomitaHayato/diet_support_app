import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0
}

const intakedCalorieSlice = createSlice({
  name: 'intakedCalorie',
  initialState,
  reducers: {
    // 入力値をセット（数値の場合のみ）
    setValue(state, action) {
      const isInputOK = Number.isFinite(action.payload);
      if(isInputOK) state.value = action.payload
    },
    // 入力値リセット
    resetValue(state) {
      state.value = 0
    },
  }
})

export const { setValue, resetValue } = intakedCalorieSlice.actions;

export const intakedCalorieReducer = intakedCalorieSlice.reducer;
