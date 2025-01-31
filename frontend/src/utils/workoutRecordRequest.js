import client from "./apiClient";
import Cookies from "js-cookie";
import { isAccessTokenInCookie } from "./auth";

export function postWorkoutRecord(params) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.post("/workout_records", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    }
  })
}

// indexアクションへのGET
export function getWorkoutRecords() {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get("/workout_records", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid"),
    }
  })
}
