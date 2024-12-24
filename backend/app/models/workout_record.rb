class WorkoutRecord < ApplicationRecord
  belongs_to :user

  # 指定した週（週の初め・終わりの年月日）のデータを取得(日ごとの合計を取得)
  scope :weekly_data, -> (week_start, week_end){
    where(created_at: week_start..week_end)
      .group(:dow)
      .select("dow, SUM(workout_time), SUM(burned_calories), SUM(unburned_calories)")
  }
  # 指定した月のデータを日付毎に取得
  scope :monthly_data, -> (month_start, month_end){
    where(created_at: month_start..month_end)
      .group(:date)
      .select("date, SUM(workout_time), SUM(burned_calories), SUM(unburned_calories)")
  }
end
