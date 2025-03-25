import client from "./apiClient";
import { authTokensInCookie, isAccessTokenInCookie } from "./auth";

export function removeWorkoutLiked(workout, csrfToken) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return (
    client.delete(`/user_workout_likes/${workout.id}`, {
      headers: {...authTokensInCookie(), 'X-CSRF-Token': csrfToken},
      withCredentials: true,
    }))
}

export function addWorkoutLiked(workout, csrfToken) {
  //tokenがない場合は何もしない
  if(!isAccessTokenInCookie()) return;

  return (
    client.post(`/workouts/${workout.id}/user_workout_likes`, {}, {
      headers: { ...authTokensInCookie(), "X-CSRF-Token": csrfToken },
      withCredentials: true,
    }))
}
