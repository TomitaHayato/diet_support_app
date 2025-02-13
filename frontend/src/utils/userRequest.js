// Userに関するリクエストを管理
import client from "./apiClient";
import { authTokensInCookie, isAccessTokenInCookie } from "./auth";

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
    { headers: authTokensInCookie()}
  );
}
