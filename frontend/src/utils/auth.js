import client from "./apiClient";
import Cookies from "js-cookie";

// 認証関連の機能を用意

export function signUp(params) {
  return client.post("/auth", params);
}

export function signIn(params) {
  return client.post("/auth/sign_in", params)
}

export function settingAuthTokenToCookie(res) {
  Cookies.set("_access_token", res.headers["access-token"]);
  Cookies.set("_client"      , res.headers["client"]);
  Cookies.set("_uid"         , res.headers["uid"]);
}

// ログインユーザの情報取得（取得データの形式: { is_login: true, data: current_user }）
export function getUser() {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get("/auth/get_sessions", {
    headers: authTokensInCookie(),
  });
}

export function logout() {
  // tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.delete("/auth/sign_out", {
    headers: authTokensInCookie()
  })
}

// Cookieにアクセストークンが保存されているか確認
export function isAccessTokenInCookie() {
  return Cookies.get("_access_token") && Cookies.get("_client") && Cookies.get("_uid");
}

// リクエストに付与する認証トークンのハッシュ
export function authTokensInCookie() {
  return (
    {
      "access-token": Cookies.get("_access_token"),
      "client":       Cookies.get("_client"),
      "uid":          Cookies.get("_uid"),
    })
}