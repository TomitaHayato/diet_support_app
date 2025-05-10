import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: '',
  isVisible: false,
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      // Toastを表示 (payloadから表示するテキストを受け取る)
      console.log(action.payload)
      state.message   = action.payload
      state.isVisible = true
    },
    hideToast: (state) =>  {
      // Toastを非表示
      state.isVisible = false
      state.message   = ''
    },
  },
});

export const selectToastObj = state => state.toast;

export const { showToast, hideToast } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
