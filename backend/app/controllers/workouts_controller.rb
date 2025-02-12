class WorkoutsController < ApplicationController
  def index
    weight      = params[:weight]&.to_i
    kcal_intake = params[:kcal_intake]&.to_i || 0

    render status: 422 if !weight # 体重データが送信されていない場合、422エラーを返す

    workouts_data     = Workout.workouts_data(weight:, kcal_intake:)      # 全Workout
    liked_workout_ids = current_user ? current_user.workouts&.ids : false # ログインユーザーがいる場合、お気に入り登録しているWorkouts

    render json: {workouts: workouts_data, liked_ids: liked_workout_ids}
  end
end
