# ログインユーザーの管理
class Auth::GetSessionsController < ApplicationController
  def index
    login_data = current_user ? 
      {current_user: , liked_workout_ids: current_user.workouts.ids} :
      false

    render json: login_data
  end
end
