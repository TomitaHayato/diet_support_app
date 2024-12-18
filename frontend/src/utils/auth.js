import client from "./apiClient";
import Cookies from "js-cookie";

// 認証関連の機能を用意

export function signUp(params) {
  return client.post("/auth", params);
}

export function signIn(params) {
  return client.post("/auth/sign_in", params)
}

export function getUser() {
  //tokenがない場合は何もしない
  if(!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return;

  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    },
  });
}
