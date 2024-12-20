// Userに関するリクエストを管理
import client from "./apiClient";
import Cookies from "js-cookie";

//User情報を更新
// params = {:name, :email, :weight}
export function updateUser(params, userId) {
  //tokenがない場合は何もしない
  if(!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return;

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
