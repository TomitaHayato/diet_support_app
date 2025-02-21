/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, logout, removeAuthToken, settingAuthTokenToCookie, signIn, signUp } from "../../utils/auth";
import { updateUser } from "../../utils/userRequest";
import { addWorkoutLiked, removeWorkoutLiked } from "../../utils/UserWorkoutLikesRequest";
import { putDev } from "../../utils/devTool";

// ログインユーザーを取得する処理
export const fetchUserThunk = createAsyncThunk(
  'currentUser/fetchUserThunk',
  async(_unused, {rejectWithValue}) => {
    try {
      // apiからデータを取得する処理
      const res = await getUser();
      putDev('getUser');
      putDev(res);

      if(!res) return rejectWithValue('Error: データの取得に失敗しました。');

      const user = res.data.currentUser;
      const likedWorkoutIds = res.data.likedWorkoutIds;

      return { user, likedWorkoutIds }
    } catch(e) {
      putDev('getUserThunkのerror')
      const errorData = e.request?.data || e.message || e // axiosはe.request.dataまたはe.messageにエラー詳細を返す
      putDev(errorData);
      return rejectWithValue(errorData);
    }
  },
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectCurrentUserStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  }
)

// ログイン処理
export const loginThunk = createAsyncThunk(
  'currentUser/loginThunk',
  async(params, {rejectWithValue}) => {
    try {
      // loginリクエスト
      const res = await signIn(params);
      if(!res) return;
      // 認証TokenをCookieに保存
      settingAuthTokenToCookie(res);
      // ログインユーザーの情報を取得
      const resUser = await getUser();
      putDev('getUser');
      putDev(res.data);

      if(!resUser) return;

      const user = resUser.data.currentUser;
      const likedWorkoutIds = resUser.data.likedWorkoutIds;

      return { user, likedWorkoutIds }
    } catch(e) {
      putDev('loginThunkのerror')
      const errorData = e.request?.data || e.message || e // axiosはe.request.dataまたはe.messageにエラー詳細を返す
      putDev(errorData);
      return rejectWithValue(errorData);
    }
  },
    {
      // pending状態の場合、重複して処理を行わない
      condition(arg, thunkApi) {
        const status = selectCurrentUserStatus(thunkApi.getState());
        if (status === 'pending') {
          putDev('重複リクエストをキャンセルします');
          return false;
        }
      }
    }
)

// ログアウト処理
export const logoutThunk = createAsyncThunk(
  'currentUser/logoutThunk',
  async(_unused, {rejectWithValue}) => {
    try {
      // logoutリクエスト
      await logout();
      // CookieのToken削除
      removeAuthToken();
      return;
    } catch(e) {
      putDev('looutThunkのerror')
      const errorData = e.request?.data || e.message || e // axiosはe.request.dataまたはe.messageにエラー詳細を返す
      putDev(errorData);
      return rejectWithValue(errorData);
    }
  },
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectCurrentUserStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  }
);

// 新規登録処理
export const signupThunk = createAsyncThunk(
  'currentUser/signupThunk',
  async(params, rejectWithValue) => {
    try {
      putDev('signupのparams')
      putDev(params)

      const res = await signUp(params);
      putDev('signUp');
      putDev(res);

      if(!res) return;
      settingAuthTokenToCookie(res);
      const user = res.data.data;
      const likedWorkoutIds = []
      return { user, likedWorkoutIds }
    } catch(e) {
      putDev('signupThunkのerror')
      const errorData = e.request?.data || e.message || e // axiosはe.request.dataまたはe.messageにエラー詳細を返す
      putDev(errorData);
      return rejectWithValue(errorData);
    }
  },
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectCurrentUserStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  }
)

// ユーザープロフィール更新処理
export const updateUserThunk = createAsyncThunk(
  'currentUser/updateUserThunk',
  async(params, {rejectWithValue}) => {
    try{
      putDev('updateUserのparams')
      putDev(params)

      const res = await updateUser(params);
      putDev('updateUser');
      putDev(res);

      if(!res) return;

      return res.data
    } catch(e) {
      putDev('updateUserThunkのerror')
      const errorData = e.request?.data || e.message || e // axiosはe.request.dataまたはe.messageにエラー詳細を返す
      putDev(errorData);
      return rejectWithValue(errorData);
    };
  },
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectCurrentUserStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  },
)

// Workoutお気に入り登録処理
export const addLikedWorkoutIdsThunk = createAsyncThunk(
  'currentUser/addLikedWorkoutIds',
  async(workout, {rejectWithValue}) => {
    try{
      const res = await addWorkoutLiked(workout);
      putDev('addWorkoutLiked')
      putDev(res);

      if(!res) return;
      const newLikedWorkoutIds = res.data
      return newLikedWorkoutIds;
    } catch(e) {
      putDev('お気に入り登録処理のエラー')
      const errorData = e.request?.data || e.message || e // axiosはe.request.dataまたはe.messageにエラー詳細を返す
      putDev(errorData);
      return rejectWithValue(errorData);
    }
  },
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectCurrentUserStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  }
)

export const removeLikedWorkoutIdsThunk = createAsyncThunk(
  'currentUser/removeLikedWorkoutId',
  async(workout, {rejectWithValue}) => {
    try{
      const res = await removeWorkoutLiked(workout);

      putDev('removeWorkoutLiked')
      putDev(res);

      if(!res) return;
      const newLikedWorkoutIds = res.data
      return newLikedWorkoutIds;
    } catch(e) {
      putDev('お気に入り削除処理のエラー')
      const errorData = e.request?.data || e.message || e // axiosはe.request.dataまたはe.messageにエラー詳細を返す
      putDev(errorData);
      return rejectWithValue(errorData);
    }
  },
  {
    // pending状態の場合、重複して処理を行わない
    condition(arg, thunkApi) {
      const status = selectCurrentUserStatus(thunkApi.getState());
      if (status === 'pending') {
        putDev('重複リクエストをキャンセルします');
        return false;
      }
    }
  }
)

const initialState = {
  user: false,
  likedWorkoutIds: [],
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
        if(!action.payload) return;
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
      // updateUserThunk
      .addCase(updateUserThunk.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.user = action.payload;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
      // addLikedWorkoutIdsThunk
      .addCase(addLikedWorkoutIdsThunk.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(addLikedWorkoutIdsThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.likedWorkoutIds = action.payload;
      })
      .addCase(addLikedWorkoutIdsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
      // removeLikedWorkoutIdsThunk
      .addCase(removeLikedWorkoutIdsThunk.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(removeLikedWorkoutIdsThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.likedWorkoutIds = action.payload;
      })
      .addCase(removeLikedWorkoutIdsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unkown Error';
      })
  }
});

export const selectCurrentUser       = state => state.currentUser.user;
export const selectLikedWorkoutIds   = state => state.currentUser.likedWorkoutIds;
export const selectCurrentUserStatus = state => state.currentUser.status

export const currentUserReducer = currentUserSlice.reducer;
