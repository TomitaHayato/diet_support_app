class UserWorkoutLikesController < ApplicationController
  before_action :authenticate_user! # 未認証ユーザーにstatus: :401を返す

  def create
    workout = Workout.find_by(id: params[:workout_id])

    if workout
      current_user.workouts << workout
      render json: current_user.workouts.ids ,status: 201
    else
      render status: 422
    end
  end

  def destroy
    workout = Workout.find_by(id: params[:id])

    if workout
      current_user.workouts.destroy(workout)
      render json: current_user.workouts.ids
    else
      render status: 422
    end
  end
end
