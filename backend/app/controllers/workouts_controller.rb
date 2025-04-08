class WorkoutsController < ApplicationController
  def index
    weight      = params[:weight]&.to_i
    kcal_intake = params[:kcal_intake]&.to_i || 0

    if !weight
      head 422 # 体重データが送信されていない場合、422エラーを返す
      return
    end

    workouts_data = Workout.workouts_data(weight:, kcal_intake:) # 全Workout

    render json: {workouts: workouts_data}
  end

  def index_only_id_and_name
    render json: { workouts: Workout.select(:id, :name, :mets) }
  end

  def show
    workout = Workout.find(params[:id])
    weight      = params[:weight]&.to_i
    kcal_intake = params[:kcal_intake]&.to_i || 0

    # 体重データが送信されていない場合、422エラーを返す
    head 422 if !weight

    workout_data = workout.make_workout_data(weight, kcal_intake)

    render json: {workout: workout_data}
  end
end
