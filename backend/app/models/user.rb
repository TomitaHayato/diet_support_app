# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :workout_records   , dependent: :destroy
  has_many :recorded_workouts , through: :workout_records, source: :workout
  has_many :user_workout_likes, dependent: :destroy
  has_many :workouts          , through: :user_workout_likes

  validates :weight, presence: true

  def get_profile
    { id:, name:, weight:, email: }
  end

  def get_today_record
    users_data = workout_records.today_data
    dammy_data = {
      total_time: 0,
      total_burned_calories: 0,
      total_unburned_calories: 0,
      total_intaked_calories: 0
    }

    users_data ? dammy_data : users_data
  end

  def get_complete_weekly_records(target_time)
    users_data = workout_records.weekly_data(target_time)
    # データがない日にちを特定
    missed_dow = %w(日 月 火 水 木 金 土) - users_data.pluck(:dow)
    # データがない曜日の保管用データを作成し、元データと合わせた配列を返す
    full_weekly_data = users_data.to_a + make_dammy_records_array('dow', missed_dow)
    sort_by_dow(full_weekly_data)
  end
 
  def get_complete_monthly_records(target_time)
    users_data = workout_records.monthly_data(target_time)
    # データがない日にちを特定
    missed_date = (1..target_time.end_of_month.day).to_a - users_data.pluck(:date)
    # 保管用データと元データ合わせたデータを配列で返す
    full_monthly_data = users_data.to_a + make_dammy_records_array('date', missed_date)
    full_monthly_data.sort_by { |data| data[:date] }
  end
  
  def get_complete_yearly_records(target_time)
    users_data = workout_records.yearly_data(target_time)
    # データがない月番号を特定
    missed_month = (1..12).to_a - users_data.pluck(:month)
    # 保管用データと元データ合わせたデータを配列で返す
    full_monthly_data = users_data.to_a + make_dammy_records_array('month', missed_month)
    full_monthly_data.sort_by { |data| data[:month] }
  end

  # これまでに取り組んできたworkout名とそのレコー
  def get_records_history(target_time = Time.current, range = nil)
    correct_range = %w(all_week all_month all_year)
    # 取得したい履歴の期間を指定
    target_range_records = correct_range.include?(range) ? 
      workout_records.where(created_at: target_time.send(range)) : workout_records

    target_range_records
      .joins(:workout)
      .where.not(workout_id: nil)
      .group(:workout_id)
      .select("workouts.id, workouts.name, COUNT(*) AS count, SUM(workout_time) as total_time")
      .order(total_time: :desc)
  end

  private

  def make_dammy_records_array(time_unit_key, missed_time_units_array)
    missed_time_units_array.map do |time_unit|
      {
        time_unit_key.to_sym => time_unit,
        total_time: 0,
        total_burned_calories: 0,
        total_unburned_calories: 0,
        total_intaked_calories: 0
      }
    end
  end

  # weekly_dataを曜日順に並べ替える
  def sort_by_dow(weekly_data)
    dow_order = %w(日 月 火 水 木 金 土)
    sorted_data = weekly_data.dup
    # 曜日のindex順
    sorted_data.sort_by { |data| dow_order.index(data[:dow]) }
  end
end
