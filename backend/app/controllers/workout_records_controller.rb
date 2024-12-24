class WorkoutRecordsController < ApplicationController
  before_action :authenticate_user! # 未認証ユーザーにstatus: :401を返す

  # 今日、今週、今月、全期間のデータを返す
  def show
  end

  def create
    if current_user.workout_records.create(record_params)
      render status: 200
    else
      render status: 422
    end
  end

  private

  def record_params
    params.require(:workout_record).permit(:workout_time, burned_calories, unburned_calories)
  end
end
