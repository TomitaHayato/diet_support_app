class WorkoutsController < ApplicationController
  def index
    weight      = params[:weight]&.to_i
    kcal_intake = params[:kcal_intake]&.to_i || 0

    if !weight
      render status: 422 # 体重データが送信されていない場合、422エラーを返す
      return
    end

    workouts_data = Workout.workouts_data(weight:, kcal_intake:) # 全Workout

    render json: {workouts: workouts_data}
  end
end
