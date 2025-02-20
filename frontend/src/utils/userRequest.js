// Userに関するリクエストを管理
import client from "./apiClient";
import { authTokensInCookie, isAccessTokenInCookie } from "./auth";

//User情報を更新
// params = {:id, :name, :email, :weight}
export function updateUser(params) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) {
    console.log("ログインが必要です");
    return;
  };

  return client.patch(
    `/users/${params.id}`,
    params,
    { headers: authTokensInCookie()}
  );
}
