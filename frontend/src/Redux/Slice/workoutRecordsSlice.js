/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { putDev } from "../../utils/devTool";
import { getWorkoutRecords, postWorkoutRecord } from "../../utils/workoutRecordRequest";

// レコードデータをapiから取得
export const getWorkoutRecordsThunk = createAsyncThunk(
  'workoutRecords/getWorkoutRecordsThunk',
  async(_unused, {rejectWithValue}) => {
    try{
      const res = await getWorkoutRecords();
      putDev('getWorkoutRecordsのres')
      putDev(res);
      if(!res) return rejectWithValue('Error: データの取得に失敗しました。');

      const todayData   = res.data.todayData;
      const weeklyData  = res.data.weeklyData;
      const monthlyData = res.data.monthlyData;
      const yearlyData  = res.data.yearlyData;
      const historyData = res.data.historyData;

      return { todayData, weeklyData, monthlyData, yearlyData, historyData };
    } catch(e) {
      putDev(e);
  }},
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectWorkoutRecordsStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  }
);

export const createWorkoutRecordThunk = createAsyncThunk(
  'workoutRecords/createWorkoutRecordThunk',
  async(params, {rejectWithValue}) => {
    try{
      const res = await postWorkoutRecord(params);
      putDev('postWorkoutRecordのres');
      putDev(res);
      if(!res) return rejectWithValue('Error: データの取得に失敗しました');

      const todayData   = res.data.todayData;
      const weeklyData  = res.data.weeklyData;
      const monthlyData = res.data.monthlyData;
      const yearlyData  = res.data.yearlyData;
      const historyData = res.data.historyData;
      return { todayData, weeklyData, monthlyData, yearlyData, historyData };
    } catch(e) {
      putDev(e);
    }
  },
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectWorkoutRecordsStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  }
)

const initialState = {
  todayData:   {},
  weeklyData:  [],
  monthlyData: [],
  yearlyData:  [],
  historyData: [],
  status:     'idle',
  error:       null,
}

const workoutRecordsSlice = createSlice({
  name: 'workoutRecords',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // workoutRecordをAPIから取得
      .addCase(getWorkoutRecordsThunk.pending, (state, _action) => {
        state.status = 'pending';
      })
      .addCase(getWorkoutRecordsThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        if(!action.payload) return;

        state.todayData   = action.payload.todayData;
        state.weeklyData  = action.payload.weeklyData;
        state.monthlyData = action.payload.monthlyData;
        state.yearlyData  = action.payload.yearlyData;
        state.historyData = action.payload.historyData;
        putDev('fulfilledのhistory')
        putDev(action.payload.historyData)
      })
      .addCase(getWorkoutRecordsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
      // createWorkoutRecordThunk
      .addCase(createWorkoutRecordThunk.pending, (state, _action) => {
        state.status = 'pending';
      })
      .addCase(createWorkoutRecordThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        if(!action.payload) return;

        state.todayData   = action.payload.todayData;
        state.weeklyData  = action.payload.weeklyData;
        state.monthlyData = action.payload.monthlyData;
        state.yearlyData  = action.payload.yearlyData;
        state.historyData = action.payload.historyData;
      })
      .addCase(createWorkoutRecordThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
  },
});

export const selectTodayData   = state => state.workoutRecords.todayData;
export const selectWeeklyData  = state => state.workoutRecords.weeklyData;
export const selectMonthlyData = state => state.workoutRecords.monthlyData;
export const selectYearlyData  = state => state.workoutRecords.yearlyData;
export const selectHistoryData = state => state.workoutRecords.historyData;
export const selectWorkoutRecordsStatus = state => state.workoutRecords.status;

export const workoutRecordsReducer = workoutRecordsSlice.reducer;