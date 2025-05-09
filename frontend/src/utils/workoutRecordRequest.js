import client from './apiClient';
import { authTokensInCookie, isAccessTokenInCookie } from './auth';

export function postWorkoutRecord(params, csrfToken) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.post('/workout_records', params, {
    headers: { ...authTokensInCookie(), 'X-CSRF-Token': csrfToken },
    withCredentials: true,
  })
}

// indexアクションへのGET
export function getWorkoutRecords() {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get('/workout_records', {
    headers: authTokensInCookie()
  })
}

// 指定した期間のyearlyデータを取得
export function getYearlyData(yearsAgo) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get('/workout_records_yearly', {
    headers: authTokensInCookie(),
    params: { yearsAgo },
  });
}

// 指定した期間のmonthlyデータを取得
export function getMonthlyData(monthAgo) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get('/workout_records_monthly', {
    headers: authTokensInCookie(),
    params: { monthAgo },
  });
}

// 指定した期間のweeklyデータを取得
export function getWeeklyData(weeksAgo) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get('/workout_records_weekly', {
    headers: authTokensInCookie(),
    params: { weeksAgo },
  });
}
