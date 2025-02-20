import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 50,
}

const weightSlice = createSlice({
  name: 'weight',
  initialState,
  reducers: {
    setWeight(state, action) {
      // 数値以外、または0, '0'の場合、何もしない
      if(isNaN(action.payload) || action.payload == 0) return;
      state.value = Number(action.payload);
      return state;
    },
  },
})

export const selectWeight = state => state.weight.value;

export const { setWeight } = weightSlice.actions;
export const weightReducer = weightSlice.reducer;
