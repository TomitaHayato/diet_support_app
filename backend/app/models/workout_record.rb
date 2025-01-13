class WorkoutRecord < ApplicationRecord
  has_many   :workout_tags, dependent: :destroy
  belongs_to :user

  # 指定した週（週の初め・終わりの年月日）のデータを取得(日ごとの合計を取得)
  scope :weekly_data, -> (week_start, week_end){
    where(created_at: week_start..week_end)
      .group(:dow)
      .select("dow, SUM(workout_time) as total_time, SUM(burned_calories) as total_burned_calories, SUM(unburned_calories) as total_unburned_calories, SUM(intaked_calories) as total_intaked_calories")
  }
  # 指定した月のデータを日付毎に取得
  scope :monthly_data, -> (month_start, month_end){
    where(created_at: month_start..month_end)
      .group(:date)
      .select("date, SUM(workout_time) as total_time, SUM(burned_calories) as total_burned_calories, SUM(unburned_calories) as total_unburned_calories, SUM(intaked_calories) as total_intaked_calories")
  }
  # 指定した年のデータを月毎に取得
  scope :yearly_data, -> (year_start, year_end){
    where(created_at: year_start..year_end)
      .group(:month)
      .select("month, SUM(workout_time) as total_time, SUM(burned_calories) as total_burned_calories, SUM(unburned_calories) as total_unburned_calories, SUM(intaked_calories) as total_intaked_calories")
  }
  # その日のデータを取得
  scope :today_data, -> (){
    where(created_at: Time.current.beginning_of_day..Time.current.end_of_day)
      .select("SUM(workout_time) as total_time, SUM(burned_calories) as total_burned_calories, SUM(unburned_calories) as total_unburned_calories, SUM(intaked_calories) as total_intaked_calories")
  }
end
