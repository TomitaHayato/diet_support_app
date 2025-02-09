import client from "./apiClient";
import { authTokensInCookie, isAccessTokenInCookie } from "./auth";

export function postWorkoutRecord(params) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.post("/workout_records", params, {
    headers: authTokensInCookie()
  })
}

// indexアクションへのGET
export function getWorkoutRecords() {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return client.get("/workout_records", {
    headers: authTokensInCookie()
  })
}
