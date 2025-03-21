/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { putDev } from "../../utils/devTool";
import { getMonthlyData, getWeeklyData, getWorkoutRecords, getYearlyData, postWorkoutRecord } from "../../utils/workoutRecordRequest";

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
      return rejectWithValue('Error: データの取得に失敗しました。');
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

// 指定した年のレコードを取得する
export const getYearlyDataThunk = createAsyncThunk('workoutRecords/getYearlyDataThunk',
  async(yearsAgo, {rejectWithValue}) => {
    try{
      const res = await getYearlyData(yearsAgo);
      putDev("getYearlyDataのres")
      putDev(res);
      if(!res.ok) rejectWithValue('Error: データの取得に失敗しました。');
      return res.data;
    } catch(e) {
      putDev('getYearlyDataThunkのエラー');
      putDev(e);
      return rejectWithValue('Error: データの取得に失敗しました。');
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

// 指定した月のレコードを取得する
export const getMonthlyDataThunk = createAsyncThunk('workoutRecords/getMonthlyDataThunk',
  async(monthAgo, {rejectWithValue}) => {
    try{
      const res = await getMonthlyData(monthAgo);
      putDev("getMonthlyDataのres")
      putDev(res);
      if(!res.ok) rejectWithValue('Error: データの取得に失敗しました。');
      return res.data;
    } catch(e) {
      putDev('getMonthlyDataThunkのエラー');
      putDev(e);
      return rejectWithValue('Error: データの取得に失敗しました。');
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

// 指定した週のレコードを取得する
export const getWeeklyDataThunk = createAsyncThunk('workoutRecords/getWeeklyDataThunk',
  async(weeksAgo, {rejectWithValue}) => {
    try{
      const res = await getWeeklyData(weeksAgo);
      putDev("getWeeklyDataのres")
      putDev(res);
      if(!res.ok) rejectWithValue('Error: データの取得に失敗しました。');
      return res.data;
    } catch(e) {
      putDev('getWeeklyDataThunkのエラー');
      putDev(e);
      return rejectWithValue('Error: データの取得に失敗しました。');
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
      return rejectWithValue('Error: データの取得に失敗しました');
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
      })
      .addCase(getWorkoutRecordsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unkown Error';
      })
      // getYearlyDataThunk
      .addCase(getYearlyDataThunk.pending, (state, _action) => {
        state.status = 'pending';
      })
      .addCase(getYearlyDataThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        if(!action.payload) return;
        state.yearlyData = action.payload;
      })
      .addCase(getYearlyDataThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unkown Error';
      })
      // getMonthlyDataThunk
      .addCase(getMonthlyDataThunk.pending, (state, _action) => {
        state.status = 'pending';
      })
      .addCase(getMonthlyDataThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        if(!action.payload) return;
        state.monthlyData = action.payload;
      })
      .addCase(getMonthlyDataThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unkown Error';
      })
      // getYearlyDataThunk
      .addCase(getWeeklyDataThunk.pending, (state, _action) => {
        state.status = 'pending';
      })
      .addCase(getWeeklyDataThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        if(!action.payload) return;
        state.weeklyData = action.payload;
      })
      .addCase(getWeeklyDataThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unkown Error';
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
        state.error = action.error.message || 'Unkown Error';
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