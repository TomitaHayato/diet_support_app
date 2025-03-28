import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCSRFToken } from "../../utils/csrfTokenRequest";
import { putDev } from "../../utils/devTool";

export const getCsrfTokenThunk = createAsyncThunk(
  'csrfToken/getCsrfTokenThunk',
  async () => {
    const res = await getCSRFToken();
    putDev("csrfToken#indexのres");
    putDev(res.data);
    const token = res.data.csrfToken
    return { token }
  },
)

const initialState = {
  token:  null,
  status: 'idle',
};

const csrfTokenSlice = createSlice({
  name: 'csrfToken',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCsrfTokenThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.token = action.payload.token;
      })
      .addCase(getCsrfTokenThunk.rejected, (state) => {
        state.status = 'failed';
      })
  }
})

export const selectCsrfToken = state => state.csrfToken.token;

export const csrfTokenReducer = csrfTokenSlice.reducer;