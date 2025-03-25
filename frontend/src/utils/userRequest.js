// Userに関するリクエストを管理
import client from "./apiClient";
import { authTokensInCookie, isAccessTokenInCookie } from "./auth";
import { putDev } from "./devTool";

//User情報を更新
// params = {:id, :name, :email, :weight}
export function updateUser(params, csrfToken) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) {
    putDev("ログインが必要です");
    return;
  };

  return client.patch(
    `/users/${params.id}`,
    params,
    {
      headers: {...authTokensInCookie(), "X-CSRF-Token": csrfToken},
      withCredentials: true,
    }
  );
}
