// Userに関するリクエストを管理
import client from "./apiClient";
import Cookies from "js-cookie";
import { isAccessTokenInCookie } from "./auth";

//User情報を更新
// params = {:name, :email, :weight}
export function updateUser(params, userId) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) {
    console.log("ログインし直してください");
    return;
  };

  return client.patch(
    `/users/${userId}`,
    params,
    { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    }}
  );
}
