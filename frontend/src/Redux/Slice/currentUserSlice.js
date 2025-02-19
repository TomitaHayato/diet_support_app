/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, logout, removeAuthToken, settingAuthTokenToCookie, signIn, signUp } from "../../utils/auth";

// ログインユーザーを取得する処理
export const fetchUserThunk = createAsyncThunk('currentUser/fetchUserThunk', async() => {
  try {
    // apiからデータを取得する処理
    const res = await getUser();
    // console.log(res.data);

    if(!res) return;

    const user = res.data.currentUser;
    const likedWorkoutIds = res.data.likedWorkoutIds;

    return { user, likedWorkoutIds }
  } catch(e) {
    console.log(e);
  }
})

// ログイン処理
export const loginThunk = createAsyncThunk('currentUser/loginThunk', async(params) => {
  try {
    // loginリクエスト
    const res = await signIn(params);
    if(!res) return;
    // 認証TokenをCookieに保存
    settingAuthTokenToCookie(res);
    // ログインユーザーの情報を取得
    const resUser = await getUser();
    // console.log(res.data);

    if(!resUser) return;

    const user = resUser.data.currentUser;
    const likedWorkoutIds = resUser.data.likedWorkoutIds;

    return { user, likedWorkoutIds }
  } catch(e) {
    console.log(e)
  }
})

// ログアウト処理
export const logoutThunk = createAsyncThunk('currentUser/logoutThunk', async() => {
  try {
    // logoutリクエスト
    await logout();
    // CookieのToken削除
    removeAuthToken();
    return;
  } catch(e) {
    console.log(e);
  }
});

// 新規登録処理
export const signupThunk = createAsyncThunk('currentUser/signupThunk', async(params) => {
  try {
    const res = await signUp(params);
    if(!res) return;
    settingAuthTokenToCookie(res);
    const user = res.data.data;
    const likedWorkoutIds = []

    return { user, likedWorkoutIds }
  } catch(e) {
    console.log(e);
  }
})

const initialState = {
  user: false,
  likedWorkoutIds: false,
  status: 'idle',
  error: null,
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchuserThunk
      .addCase(fetchUserThunk.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.user = action.payload.user;
        state.likedWorkoutIds = action.payload.likedWorkoutIds;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
      //LoginThunk
      .addCase(loginThunk.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.user = action.payload.user;
        state.likedWorkoutIds = action.payload.likedWorkoutIds;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
      // signupThunk
      .addCase(signupThunk.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.user = action.payload.user;
        state.likedWorkoutIds = action.payload.likedWorkoutIds;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
      // logoutThunk
      .addCase(logoutThunk.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.user = initialState.user;
        state.likedWorkoutIds = initialState.likedWorkoutIds;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
  }
});

export const currentUserReducer = currentUserSlice.reducer;
