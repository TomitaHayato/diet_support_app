import client from "./apiClient";
import { authTokensInCookie } from "./auth";

export function workoutRequest(paramsInfo) {
  return (
    client.get("/workouts", {
      params:  paramsInfo,
      headers: authTokensInCookie(),
    })
  )
}
