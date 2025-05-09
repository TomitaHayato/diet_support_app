import client from './apiClient';
import Cookies from 'js-cookie';

// 認証関連の機能
export function signUp(params, token) {
  return client.post('/auth', params, {
    withCredentials: true,
    headers: {'X-CSRF-Token': token}
  });
}

export function signIn(params, token) {
  return client.post('/auth/sign_in', params, {
    headers: {'X-CSRF-Token': token},
    withCredentials: true,
  })
}

export function settingAuthTokenToCookie(res) {
  Cookies.set('_access_token', res.headers['access-token']);
  Cookies.set('_client'      , res.headers['client']);
  Cookies.set('_uid'         , res.headers['uid']);
}

// postMessageのevent.dataから認証トークンを取得
export function settingAuthTokenFromMessage(data) {
  if(!data.uid || !data.auth_token || !data.client_id) return false;
  
  Cookies.set('_access_token', data.auth_token);
  Cookies.set('_client'      , data.client_id);
  Cookies.set('_uid'         , data.uid);

  return true;
}

// ログインユーザの情報取得（取得データの形式: { currentUser: Obj, likedList: Array }）
export function getUser() {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get('/get_sessions', {
    headers: authTokensInCookie(),
    withCredentials: true,
  });
}

// 422エラーになる
export function logout(token) {
  // 認証tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.delete('/auth/sign_out', {
    headers: {...authTokensInCookie(), 'X-CSRF-Token': token},
    withCredentials: true,
  })
}

export function removeAuthToken() {
  ['_access_token', '_client', '_uid'].forEach(cookieKey => Cookies.remove(cookieKey));
}

// Cookieにアクセストークンが保存されているか確認
export function isAccessTokenInCookie() {
  return Cookies.get('_access_token') && Cookies.get('_client') && Cookies.get('_uid');
}

// リクエストに付与する認証トークンのハッシュ
export function authTokensInCookie() {
  if(!isAccessTokenInCookie()) return;

  return {
    'access-token': Cookies.get('_access_token'),
    'client':       Cookies.get('_client'),
    'uid':          Cookies.get('_uid'),
  }
}