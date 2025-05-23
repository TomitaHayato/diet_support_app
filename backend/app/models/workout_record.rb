class WorkoutRecord < ApplicationRecord
  belongs_to :user
  belongs_to :workout

  validates :dow  , presence: true
  validates :month, presence: true
  validates :date , presence: true

  # 指定した週（週の初め・終わりの年月日）のデータを取得(日ごとの合計を取得)
  scope :weekly_data, -> (target_time){
    where(created_at: target_time.all_week)
      .group(:dow)
      .select("dow, SUM(workout_time) as total_time, SUM(burned_calories) as total_burned_calories, SUM(intaked_calories) as total_intaked_calories")
  }
  # 指定した月のデータを日付毎に取得
  scope :monthly_data, -> (target_time){
    where(created_at: target_time.all_month)
      .group(:date)
      .select("date, SUM(workout_time) as total_time, SUM(burned_calories) as total_burned_calories, SUM(intaked_calories) as total_intaked_calories")
  }
  # 指定した年のデータを月毎に取得
  scope :yearly_data, -> (target_time){
    where(created_at: target_time.all_year)
      .group(:month)
      .select("month, SUM(workout_time) as total_time, SUM(burned_calories) as total_burned_calories, SUM(intaked_calories) as total_intaked_calories")
  }

  scope :select_records_sum, -> {
    select("
      COALESCE(SUM(workout_time), 0)    AS total_time,
      COALESCE(SUM(burned_calories), 0) AS total_burned_calories")
  }

  def self.weekly_total(target_time)
    where(created_at: target_time.all_week).select_records_sum[0]
  end

  def self.monthly_total(target_time)
    where(created_at: target_time.all_month).select_records_sum[0]
  end

  def self.yearly_total(target_time)
    where(created_at: target_time.all_year).select_records_sum[0]
  end

  # その日のデータを取得
  def self.today_data
    dammy_data = {
      total_time: 0,
      total_burned_calories: 0,
      total_intaked_calories: 0
    }

    return dammy_data if where(created_at: Time.current.all_day).count == 0

    where(created_at: Time.current.all_day)
      .select("
        SUM(workout_time)      as total_time,
        SUM(burned_calories)   as total_burned_calories,
        SUM(intaked_calories)  as total_intaked_calories")
      .first
  end
end
