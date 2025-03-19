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

export function workoutShowRequest(id, params) {
  return (
    client.get(`/workouts/${id}`, {
      params,
      headers: authTokensInCookie(),
    })
  )
}

export function workoutsIdNamesRequest() {
  return (
    client.get("/workout_names", {
      headers: authTokensInCookie(),
    })
  )
}
