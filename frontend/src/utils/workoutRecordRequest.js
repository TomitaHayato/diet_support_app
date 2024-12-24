import client from "./apiClient";
import Cookies from "js-cookie";

export function postWorkoutRecord(params) {
  //tokenがない場合は何もしない
  if(!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return;

  return client.post("/workout_records", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    }
  })
}
