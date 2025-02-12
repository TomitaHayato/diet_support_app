class UserWorkoutLikesController < ApplicationController
  before_action :authenticate_user! # 未認証ユーザーにstatus: :401を返す

  def create
    workout = Workout.find_by(id: params[:workout_id])

    if workout
      current_user.workouts << workout
      render status: 201
    else
      render status: 422
    end
  end

  def destroy
    workout = Workout.find_by(id: params[:workout_id])

    if workout
      current_user.workouts.destroy!(workout)
      render status: 200
    else
      render status: 422
    end
  end
end
